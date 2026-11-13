import { useEffect, useMemo } from 'react'
import * as alertasService from '../services/alertasService.js'
import { avaliarRegiao } from '../utils/alertas.js'

// Avalia o alerta de uma região a partir do clima que a tela já carregou (sem nova busca)
export default function useAlertaDaRegiao(regiao, clima, { ligado = true, nivelMinimo = 'alto' } = {}) {
  const alerta = useMemo(() => {
    if (!ligado || !regiao || !clima) return null
    return avaliarRegiao(regiao, clima, {
      nivelMinimo,
      ultimoAlerta: alertasService.lerUltimoAlerta(regiao.id),
    })
  }, [regiao, clima, ligado, nivelMinimo])

  useEffect(() => {
    if (alerta?.novo) alertasService.salvarUltimoAlerta(alerta.regiaoId, alerta)
  }, [alerta])

  return alerta
}
