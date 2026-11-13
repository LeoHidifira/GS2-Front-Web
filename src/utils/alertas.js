import { NIVEIS } from '../constants/riscos.js'
import { formatarHora, formatarTemperatura } from './formatos.js'
import { leituraEhValida } from './leituras.js'
import { calcularNivelDeRisco, compararNiveis, nivelEhAltoOuMais } from './risco.js'

export const INTERVALO_MINIMO_MS = 3 * 60 * 60 * 1000

// As duas leituras mais recentes: a da última hora cheia e a atual (RN02).
// Leituras inválidas ou com mais de 1 hora são descartadas (RN06).
export function montarLeituras(clima, agora = Date.now()) {
  const anterior = clima.horas.filter((h) => h.horario < clima.atual.horario).at(-1)
  return [anterior, clima.atual]
    .filter((leitura) => leituraEhValida(leitura, agora))
    .map((leitura) => ({ ...leitura, ...calcularNivelDeRisco(leitura.temperatura, leitura.umidade) }))
}

// Até que horas o risco continua Alto ou Extremo, pela previsão hora a hora de hoje.
// Devolve o horário em que o risco cai, ou null se ele seguir alto até o fim do dia.
export function calcularFimDoRisco(horas, agora = Date.now()) {
  const inicioDaHora = agora - (agora % (60 * 60 * 1000))
  const proximas = horas.filter((h) => h.horario >= inicioDaHora)
  for (const hora of proximas) {
    const { nivel } = calcularNivelDeRisco(hora.temperatura, hora.umidade)
    if (!nivelEhAltoOuMais(nivel)) return hora.horario
  }
  return null
}

// RN02: alerta só depois de duas leituras seguidas em Alto ou Extremo (ou no nível mínimo escolhido).
// RN03: no máximo um alerta a cada 3 horas por região, a não ser que o risco suba.
export function avaliarAlerta({ leituras, ultimoAlerta, nivelMinimo = 'alto', agora = Date.now() }) {
  if (leituras.length < 2) return null
  const minimo = compararNiveis(nivelMinimo, 'alto') > 0 ? nivelMinimo : 'alto'
  const atingiuMinimo = leituras.every((l) => compararNiveis(l.nivel, minimo) >= 0)
  if (!atingiuMinimo) return null

  const atual = leituras.at(-1)
  const passouIntervalo = !ultimoAlerta || agora - ultimoAlerta.em >= INTERVALO_MINIMO_MS
  const riscoSubiu = ultimoAlerta && compararNiveis(atual.nivel, ultimoAlerta.nivel) > 0
  const novo = passouIntervalo || riscoSubiu

  return {
    nivel: atual.nivel,
    sensacao: atual.sensacao,
    umidade: atual.umidade,
    novo,
    emitidoEm: novo ? agora : ultimoAlerta.em,
  }
}

// Monta o alerta completo de uma região, com os textos no tom de voz da Solara
export function avaliarRegiao(regiao, clima, { nivelMinimo, ultimoAlerta, agora = Date.now() }) {
  const alerta = avaliarAlerta({ leituras: montarLeituras(clima, agora), ultimoAlerta, nivelMinimo, agora })
  if (!alerta) return null

  const fim = calcularFimDoRisco(clima.horas, agora)
  const ate = fim ? `até ${formatarHora(fim)}` : 'até o fim do dia'
  const info = NIVEIS[alerta.nivel]

  return {
    ...alerta,
    regiaoId: regiao.id,
    regiaoNome: regiao.nome,
    ate,
    titulo: `Calor ${info.nome.toLowerCase()} em ${regiao.nome} ${ate}. Veja onde se refrescar.`,
    motivo: `Sensação térmica de ${formatarTemperatura(alerta.sensacao)} com umidade de ${Math.round(
      alerta.umidade,
    )}%. As duas últimas leituras ficaram em nível ${info.rotulo}.`,
  }
}
