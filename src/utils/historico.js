import { calcularNivelDeRisco, nivelEhAltoOuMais, nivelPorSensacao } from './risco.js'
import { TEMPERATURA_MAXIMA, TEMPERATURA_MINIMA } from './leituras.js'

// Agrupa as leituras hora a hora por dia: máxima, maior sensação térmica e nível do dia
export function resumirPorDia(horas) {
  const porDia = new Map()

  for (const hora of horas) {
    const { temperatura, umidade } = hora
    // RN06: leituras fora da faixa possível são descartadas
    if (!Number.isFinite(temperatura) || !Number.isFinite(umidade)) continue
    if (temperatura < TEMPERATURA_MINIMA || temperatura > TEMPERATURA_MAXIMA) continue

    const { sensacao } = calcularNivelDeRisco(temperatura, umidade)
    const dia = porDia.get(hora.dia) ?? { dia: hora.dia, maxima: -Infinity, sensacaoMaxima: -Infinity }
    dia.maxima = Math.max(dia.maxima, temperatura)
    dia.sensacaoMaxima = Math.max(dia.sensacaoMaxima, sensacao)
    porDia.set(hora.dia, dia)
  }

  return [...porDia.values()].map((dia) => {
    const nivel = nivelPorSensacao(dia.sensacaoMaxima)
    return { ...dia, nivel, destaque: nivelEhAltoOuMais(nivel) }
  })
}
