const FUSO = 'America/Sao_Paulo'

// 14:40 -> "14h40"; 17:00 -> "17h"
export function formatarHora(timestamp) {
  const partes = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: FUSO,
  }).formatToParts(new Date(timestamp))
  const hora = Number(partes.find((p) => p.type === 'hour').value)
  const minuto = partes.find((p) => p.type === 'minute').value
  return minuto === '00' ? `${hora}h` : `${hora}h${minuto}`
}

export function formatarTemperatura(valor) {
  return `${Math.round(valor)} °C`
}

// "2026-11-13" -> "qui., 13/11"
export function formatarDia(diaIso) {
  const [ano, mes, dia] = diaIso.split('-').map(Number)
  const data = new Date(Date.UTC(ano, mes - 1, dia, 12))
  const semana = new Intl.DateTimeFormat('pt-BR', { weekday: 'short', timeZone: 'UTC' }).format(data)
  return `${semana} ${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}`
}

export function formatarDistancia(km) {
  if (!Number.isFinite(km)) return ''
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1).replace('.', ',')} km`
}
