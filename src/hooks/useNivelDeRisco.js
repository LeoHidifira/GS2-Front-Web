import { useMemo } from 'react'
import { NIVEIS } from '../constants/riscos.js'
import { calcularNivelDeRisco } from '../utils/risco.js'

// Converte temperatura + umidade em nível, texto, cor e orientações (RF06, RF11)
export default function useNivelDeRisco(temperatura, umidade) {
  return useMemo(() => {
    if (!Number.isFinite(temperatura) || !Number.isFinite(umidade)) {
      return null
    }
    const { sensacao, nivel } = calcularNivelDeRisco(temperatura, umidade)
    return { sensacao, nivel, ...NIVEIS[nivel] }
  }, [temperatura, umidade])
}
