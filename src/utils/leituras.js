// RN06: leitura abaixo de −5 °C, acima de 60 °C ou com mais de 1 hora é descartada
export const TEMPERATURA_MINIMA = -5
export const TEMPERATURA_MAXIMA = 60
export const IDADE_MAXIMA_MS = 60 * 60 * 1000

// Uma leitura tem { temperatura, umidade, horario (timestamp em ms) }
export function leituraEhValida(leitura, agora = Date.now()) {
  if (!leitura) return false
  const { temperatura, umidade, horario } = leitura
  if (!Number.isFinite(temperatura) || !Number.isFinite(umidade) || !Number.isFinite(horario)) return false
  if (temperatura < TEMPERATURA_MINIMA || temperatura > TEMPERATURA_MAXIMA) return false
  if (agora - horario > IDADE_MAXIMA_MS) return false
  return true
}
