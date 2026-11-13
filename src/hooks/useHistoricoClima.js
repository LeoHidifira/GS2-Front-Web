import { useCallback, useEffect, useState } from 'react'
import * as climaService from '../services/climaService.js'
import { resumirPorDia } from '../utils/historico.js'

// Busca as leituras dos últimos 7 dias e resume em máxima e nível por dia (RF07)
export default function useHistoricoClima(regiao) {
  const [dias, setDias] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [versao, setVersao] = useState(0)

  const latitude = regiao?.latitude
  const longitude = regiao?.longitude

  useEffect(() => {
    if (latitude === undefined || longitude === undefined) return

    let ativo = true
    setLoading(true)
    setError(null)

    climaService
      .buscarHistorico(latitude, longitude)
      .then((horas) => {
        if (ativo) setDias(resumirPorDia(horas))
      })
      .catch(() => {
        if (ativo) setError('Não deu para carregar o histórico agora. Confira sua internet.')
      })
      .finally(() => {
        if (ativo) setLoading(false)
      })

    return () => {
      ativo = false
    }
  }, [latitude, longitude, versao])

  const recarregar = useCallback(() => setVersao((v) => v + 1), [])

  return { dias, loading, error, recarregar }
}
