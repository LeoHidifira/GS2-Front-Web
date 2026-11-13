import { requisitar } from './http.js'
import * as storageService from './storageService.js'

// Open-Meteo: API pública de clima, sem chave. Só leitura.
const URL_OPEN_METEO = 'https://api.open-meteo.com/v1/forecast'
const FUSO = 'America/Sao_Paulo'

// A Open-Meteo devolve horários locais ("2026-11-13T14:30") e o deslocamento do fuso.
// Converte para timestamp (ms) para não depender do fuso do aparelho.
function paraTimestamp(horarioLocal, deslocamentoSegundos) {
  const [data, hora = '00:00'] = horarioLocal.split('T')
  const [ano, mes, dia] = data.split('-').map(Number)
  const [h, m] = hora.split(':').map(Number)
  return Date.UTC(ano, mes - 1, dia, h, m) - deslocamentoSegundos * 1000
}

function montarUrl(latitude, longitude, parametros) {
  const busca = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    timezone: FUSO,
    ...parametros,
  })
  return `${URL_OPEN_METEO}?${busca}`
}

function normalizarHoras(hourly, deslocamento) {
  return hourly.time.map((horario, i) => ({
    horario: paraTimestamp(horario, deslocamento),
    dia: horario.slice(0, 10),
    temperatura: hourly.temperature_2m[i],
    umidade: hourly.relative_humidity_2m[i],
  }))
}

// Clima atual + previsão hora a hora de hoje
export async function buscarClimaAtual(latitude, longitude) {
  const url = montarUrl(latitude, longitude, {
    current: 'temperature_2m,relative_humidity_2m',
    hourly: 'temperature_2m,relative_humidity_2m',
    forecast_days: '1',
  })
  const dados = await requisitar(url)
  const deslocamento = dados.utc_offset_seconds ?? 0

  return {
    atual: {
      temperatura: dados.current.temperature_2m,
      umidade: dados.current.relative_humidity_2m,
      horario: paraTimestamp(dados.current.time, deslocamento),
    },
    horas: normalizarHoras(dados.hourly, deslocamento),
  }
}

// Leituras hora a hora dos últimos 7 dias (6 dias anteriores + hoje)
export async function buscarHistorico(latitude, longitude) {
  const url = montarUrl(latitude, longitude, {
    hourly: 'temperature_2m,relative_humidity_2m',
    past_days: '6',
    forecast_days: '1',
  })
  const dados = await requisitar(url)
  return normalizarHoras(dados.hourly, dados.utc_offset_seconds ?? 0)
}

// Cache do último clima de cada região, para mostrar algo quando faltar internet
export function salvarCache(regiaoId, clima) {
  storageService.salvar(`clima:${regiaoId}`, clima)
}

export function lerCache(regiaoId) {
  return storageService.ler(`clima:${regiaoId}`)
}
