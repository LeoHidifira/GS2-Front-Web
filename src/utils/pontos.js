import { RECURSOS } from '../constants/recursos.js'

const UM_DIA_MS = 24 * 60 * 60 * 1000
export const AVISOS_PARA_A_CONFIRMAR = 3
const FORMATO_HORARIO = /^([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)$/

// Garante tipos corretos, mesmo que a API devolva números como texto
export function normalizarPonto(ponto) {
  return {
    ...ponto,
    id: String(ponto.id),
    regiaoId: ponto.regiaoId === undefined || ponto.regiaoId === null ? '' : String(ponto.regiaoId),
    latitude: Number(ponto.latitude),
    longitude: Number(ponto.longitude),
    horario: ponto.horario ?? '',
    recursos: Array.isArray(ponto.recursos) ? ponto.recursos.filter((r) => RECURSOS[r]) : [],
    situacao: ponto.situacao ?? 'rascunho',
    avisosFechado: Array.isArray(ponto.avisosFechado) ? ponto.avisosFechado : [],
  }
}

export function horarioEhValido(horario) {
  const texto = horario.trim()
  return texto.toLowerCase() === '24h' || FORMATO_HORARIO.test(texto)
}

// Validação do formulário de ponto. Rascunho só precisa de nome e região.
// RN04: para publicar precisa de endereço, horário e pelo menos um recurso.
export function validarPonto(valores) {
  const erros = {}
  if (!valores.nome?.trim()) erros.nome = 'Falta o nome do ponto.'
  if (!valores.regiaoId) erros.regiaoId = 'Escolha a região do ponto.'

  const latitude = Number(String(valores.latitude).replace(',', '.'))
  const longitude = Number(String(valores.longitude).replace(',', '.'))
  if (String(valores.latitude).trim() === '' || !Number.isFinite(latitude)) {
    erros.latitude = 'Falta a latitude. Exemplo: -23.6702'
  }
  if (String(valores.longitude).trim() === '' || !Number.isFinite(longitude)) {
    erros.longitude = 'Falta a longitude. Exemplo: -46.7771'
  }
  if (valores.horario?.trim() && !horarioEhValido(valores.horario)) {
    erros.horario = 'Use o formato 08:00-18:00 ou escreva 24h.'
  }

  const faltasParaPublicar = []
  if (!valores.endereco?.trim()) faltasParaPublicar.push({ campo: 'endereco', texto: 'Falta o endereço para publicar.' })
  if (!valores.horario?.trim()) faltasParaPublicar.push({ campo: 'horario', texto: 'Falta o horário para publicar.' })
  if (!valores.recursos?.length) {
    faltasParaPublicar.push({ campo: 'recursos', texto: 'Marque pelo menos um recurso para publicar.' })
  }

  return { erros, faltasParaPublicar, podePublicar: faltasParaPublicar.length === 0 && Object.keys(erros).length === 0 }
}

// Prepara os valores do formulário para enviar à API
export function prepararPonto(valores, situacao, avisosAtuais = []) {
  return {
    nome: valores.nome.trim(),
    endereco: valores.endereco.trim(),
    regiaoId: String(valores.regiaoId),
    latitude: Number(String(valores.latitude).replace(',', '.')),
    longitude: Number(String(valores.longitude).replace(',', '.')),
    horario: valores.horario.trim(),
    recursos: valores.recursos,
    situacao,
    // Ao publicar, o administrador confirmou o ponto: os avisos de "fechado" são zerados
    avisosFechado: situacao === 'publicado' ? [] : avisosAtuais,
  }
}

export function avisosNasUltimas24h(ponto, agora = Date.now()) {
  return ponto.avisosFechado.filter((data) => agora - new Date(data).getTime() < UM_DIA_MS)
}

// RN05: três avisos de "fechado" em 24 h deixam o ponto como "a confirmar"
export function registrarAvisoFechado(ponto, agora = Date.now()) {
  const avisos = [...avisosNasUltimas24h(ponto, agora), new Date(agora).toISOString()]
  const situacao =
    ponto.situacao === 'publicado' && avisos.length >= AVISOS_PARA_A_CONFIRMAR ? 'a_confirmar' : ponto.situacao
  return { ...ponto, avisosFechado: avisos, situacao }
}

// Hora e minuto atuais em São Paulo, sem depender do fuso do aparelho
function minutosAgoraEmSaoPaulo(agora) {
  const partes = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: 'America/Sao_Paulo',
  }).formatToParts(new Date(agora))
  const valor = (tipo) => Number(partes.find((p) => p.type === tipo).value)
  return valor('hour') * 60 + valor('minute')
}

// Diz se o ponto está aberto agora. Devolve null quando o horário não foi informado.
export function estaAbertoAgora(horario, agora = Date.now()) {
  if (!horario?.trim()) return null
  if (horario.trim().toLowerCase() === '24h') return true
  const partes = horario.trim().match(FORMATO_HORARIO)
  if (!partes) return null

  const abre = Number(partes[1]) * 60 + Number(partes[2])
  const fecha = Number(partes[3]) * 60 + Number(partes[4])
  const minutos = minutosAgoraEmSaoPaulo(agora)
  // Horário que passa da meia-noite (ex.: 18:00-02:00)
  return abre <= fecha ? minutos >= abre && minutos < fecha : minutos >= abre || minutos < fecha
}

export function formatarHorario(horario) {
  if (!horario?.trim()) return 'Horário não informado'
  if (horario.trim().toLowerCase() === '24h') return '24 horas'
  const partes = horario.trim().match(FORMATO_HORARIO)
  if (!partes) return horario
  const hora = (h, m) => (m === '00' ? `${Number(h)}h` : `${Number(h)}h${m}`)
  return `${hora(partes[1], partes[2])} às ${hora(partes[3], partes[4])}`
}

// Distância em linha reta (fórmula de Haversine), em km
export function calcularDistanciaKm(origem, destino) {
  const raio = 6371
  const rad = (graus) => (graus * Math.PI) / 180
  const dLat = rad(destino.latitude - origem.latitude)
  const dLon = rad(destino.longitude - origem.longitude)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(origem.latitude)) * Math.cos(rad(destino.latitude)) * Math.sin(dLon / 2) ** 2
  return 2 * raio * Math.asin(Math.sqrt(a))
}

// Só pontos publicados ou "a confirmar" aparecem para o cidadão
export function pontoEhVisivel(ponto) {
  return ponto.situacao === 'publicado' || ponto.situacao === 'a_confirmar'
}

// RF03: filtra por recurso (todos os marcados) e distância, e ordena do mais perto ao mais longe
export function filtrarPontos(pontos, { recursos = [], distanciaMaxKm = null }, origem) {
  return pontos
    .filter(pontoEhVisivel)
    .map((ponto) => ({
      ...ponto,
      distanciaKm:
        origem && Number.isFinite(ponto.latitude) && Number.isFinite(ponto.longitude)
          ? calcularDistanciaKm(origem, ponto)
          : null,
    }))
    .filter((ponto) => recursos.every((r) => ponto.recursos.includes(r)))
    .filter((ponto) => distanciaMaxKm === null || (ponto.distanciaKm !== null && ponto.distanciaKm <= distanciaMaxKm))
    .sort((a, b) => (a.distanciaKm ?? Infinity) - (b.distanciaKm ?? Infinity))
}
