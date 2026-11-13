import { useCallback, useEffect, useState } from 'react'
import * as climaService from '../services/climaService.js'
import { leituraEhValida } from '../utils/leituras.js'
import { formatarHora } from '../utils/formatos.js'

const ATUALIZAR_A_CADA_MS = 15 * 60 * 1000

// Busca o clima atual de uma região na Open-Meteo.
// Sem internet, mostra o último dado salvo, desde que ele ainda seja válido (RN06).
export default function useClima(regiao) {
  const [clima, setClima] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [aviso, setAviso] = useState(null)
  const [versao, setVersao] = useState(0)

  const latitude = regiao?.latitude
  const longitude = regiao?.longitude
  const regiaoId = regiao?.id

  useEffect(() => {
    if (regiaoId === undefined || latitude === undefined || longitude === undefined) return

    let ativo = true
    setLoading(true)
    setError(null)
    setAviso(null)

    climaService
      .buscarClimaAtual(latitude, longitude)
      .then((dados) => {
        if (!ativo) return
        if (!leituraEhValida(dados.atual)) {
          setClima(null)
          setError('A leitura de clima veio fora do normal e foi descartada. Tente de novo em instantes.')
          return
        }
        setClima(dados)
        climaService.salvarCache(regiaoId, dados)
      })
      .catch(() => {
        if (!ativo) return
        const cache = climaService.lerCache(regiaoId)
        if (cache && leituraEhValida(cache.atual)) {
          setClima(cache)
          setAviso(`Sem internet agora. Mostrando os dados das ${formatarHora(cache.atual.horario)}.`)
        } else {
          setClima(null)
          setError('Sem internet agora. Não há dados recentes para mostrar.')
        }
      })
      .finally(() => {
        if (ativo) setLoading(false)
      })

    return () => {
      ativo = false
    }
  }, [regiaoId, latitude, longitude, versao])

  // Atualiza sozinho a cada 15 minutos enquanto a tela estiver aberta
  useEffect(() => {
    const intervalo = setInterval(() => setVersao((v) => v + 1), ATUALIZAR_A_CADA_MS)
    return () => clearInterval(intervalo)
  }, [])

  const recarregar = useCallback(() => setVersao((v) => v + 1), [])

  return { clima, loading, error, aviso, recarregar }
}
