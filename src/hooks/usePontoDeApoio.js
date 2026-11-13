import { useCallback, useEffect, useState } from 'react'
import * as pontosService from '../services/pontosService.js'
import { mensagemDeErro } from '../utils/erros.js'
import { normalizarPonto, registrarAvisoFechado } from '../utils/pontos.js'

// Um ponto de apoio e o aviso de "fechado" do cidadão (RF12, RN05)
export default function usePontoDeApoio(id) {
  const [ponto, setPonto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [versao, setVersao] = useState(0)
  const [enviandoAviso, setEnviandoAviso] = useState(false)

  useEffect(() => {
    let ativo = true
    setLoading(true)
    setError(null)

    pontosService
      .buscarPonto(id)
      .then((dados) => {
        if (ativo) setPonto(normalizarPonto(dados))
      })
      .catch((erro) => {
        if (ativo) setError(mensagemDeErro(erro, 'carregar este ponto'))
      })
      .finally(() => {
        if (ativo) setLoading(false)
      })

    return () => {
      ativo = false
    }
  }, [id, versao])

  const recarregar = useCallback(() => setVersao((v) => v + 1), [])

  // Busca a versão mais recente antes de somar o aviso, para não perder avisos de outras pessoas
  const avisarFechado = useCallback(async () => {
    setEnviandoAviso(true)
    try {
      const atual = normalizarPonto(await pontosService.buscarPonto(id))
      const atualizado = registrarAvisoFechado(atual)
      const salvo = normalizarPonto(await pontosService.atualizarPonto(id, atualizado))
      setPonto(salvo)
      return salvo
    } finally {
      setEnviandoAviso(false)
    }
  }, [id])

  return { ponto, loading, error, recarregar, avisarFechado, enviandoAviso }
}
