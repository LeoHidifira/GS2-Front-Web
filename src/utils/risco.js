import { LIMITES_SENSACAO, ORDEM_NIVEIS } from '../constants/riscos.js'

const paraFahrenheit = (c) => (c * 9) / 5 + 32
const paraCelsius = (f) => ((f - 32) * 5) / 9

// Índice de calor da NOAA (fórmula de Rothfusz com os ajustes oficiais).
// Recebe temperatura em °C e umidade relativa em %, devolve a sensação térmica em °C.
export function calcularIndiceDeCalor(temperatura, umidade) {
  const t = paraFahrenheit(temperatura)
  const ur = umidade

  // Abaixo de ~80 °F a NOAA usa a fórmula simplificada de Steadman
  const simples = 0.5 * (t + 61 + (t - 68) * 1.2 + ur * 0.094)
  if ((simples + t) / 2 < 80) {
    return paraCelsius(simples)
  }

  let indice =
    -42.379 +
    2.04901523 * t +
    10.14333127 * ur -
    0.22475541 * t * ur -
    0.00683783 * t * t -
    0.05481717 * ur * ur +
    0.00122874 * t * t * ur +
    0.00085282 * t * ur * ur -
    0.00000199 * t * t * ur * ur

  if (ur < 13 && t >= 80 && t <= 112) {
    indice -= ((13 - ur) / 4) * Math.sqrt((17 - Math.abs(t - 95)) / 17)
  } else if (ur > 85 && t >= 80 && t <= 87) {
    indice += ((ur - 85) / 10) * ((87 - t) / 5)
  }

  return paraCelsius(indice)
}

// RN01: Baixo até 27 °C, Atenção de 27 a 32 °C, Alto de 32 a 39 °C, Extremo acima de 39 °C
export function nivelPorSensacao(sensacao) {
  if (sensacao <= LIMITES_SENSACAO.baixo) return 'baixo'
  if (sensacao <= LIMITES_SENSACAO.atencao) return 'atencao'
  if (sensacao <= LIMITES_SENSACAO.alto) return 'alto'
  return 'extremo'
}

// Recebe temperatura (°C) e umidade (%), devolve a sensação térmica e o nível (RN01).
// níveis: 'baixo' | 'atencao' | 'alto' | 'extremo'
export function calcularNivelDeRisco(temperatura, umidade) {
  const sensacao = Math.round(calcularIndiceDeCalor(temperatura, umidade) * 10) / 10
  return { sensacao, nivel: nivelPorSensacao(sensacao) }
}

// Compara dois níveis: positivo quando "a" é mais grave que "b"
export function compararNiveis(a, b) {
  return ORDEM_NIVEIS.indexOf(a) - ORDEM_NIVEIS.indexOf(b)
}

export function nivelEhAltoOuMais(nivel) {
  return compararNiveis(nivel, 'alto') >= 0
}
