import { useCallback, useEffect, useMemo, useState } from 'react'
import * as alertasService from '../services/alertasService.js'
import * as climaService from '../services/climaService.js'
import { avaliarRegiao } from '../utils/alertas.js'

// Busca o clima das regiões acompanhadas e aplica as regras de alerta (RF04, RN02, RN03)
export default function useAlertas(regioes, { ligado = true, nivelMinimo = 'alto' } = {}) {
  const [alertas, setAlertas] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [versao, setVersao] = useState(0)

  // Chave estável para não refazer a busca a cada render
  const chave = useMemo(() => regioes.map((r) => `${r.id}:${r.latitude}:${r.longitude}`).join('|'), [regioes])

  useEffect(() => {
    if (!ligado || regioes.length === 0) {
      setAlertas([])
      return
    }

    let ativo = true
    setLoading(true)
    setError(null)

    Promise.allSettled(regioes.map((r) => climaService.buscarClimaAtual(r.latitude, r.longitude)))
      .then((resultados) => {
        if (!ativo) return
        const encontrados = []
        resultados.forEach((resultado, i) => {
          if (resultado.status !== 'fulfilled') return
          const regiao = regioes[i]
          const alerta = avaliarRegiao(regiao, resultado.value, {
            nivelMinimo,
            ultimoAlerta: alertasService.lerUltimoAlerta(regiao.id),
          })
          if (!alerta) return
          if (alerta.novo) alertasService.salvarUltimoAlerta(regiao.id, alerta)
          encontrados.push(alerta)
        })
        if (resultados.every((r) => r.status === 'rejected')) {
          setError('Sem internet agora. Não deu para conferir os alertas.')
        }
        setAlertas(encontrados)
      })
      .finally(() => {
        if (ativo) setLoading(false)
      })

    return () => {
      ativo = false
    }
    // "regioes" está representado por "chave"
  }, [chave, ligado, nivelMinimo, versao])

  const recarregar = useCallback(() => setVersao((v) => v + 1), [])

  return { alertas, loading, error, recarregar }
}
