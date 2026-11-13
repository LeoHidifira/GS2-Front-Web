import { useCallback, useEffect, useMemo, useState } from 'react'
import * as pontosService from '../services/pontosService.js'
import { mensagemDeErro } from '../utils/erros.js'
import { filtrarPontos, normalizarPonto, prepararPonto } from '../utils/pontos.js'

const FILTROS_INICIAIS = { recursos: [], distanciaMaxKm: null }

// CRUD de pontos, filtros por recurso e distância (RF02, RF03, RF09)
export default function usePontosDeApoio({ origem = null } = {}) {
  const [pontos, setPontos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [versao, setVersao] = useState(0)
  const [filtros, setFiltros] = useState(FILTROS_INICIAIS)

  useEffect(() => {
    let ativo = true
    setLoading(true)
    setError(null)

    pontosService
      .listarPontos()
      .then((lista) => {
        if (ativo) setPontos((lista ?? []).map(normalizarPonto))
      })
      .catch((erro) => {
        if (ativo) setError(mensagemDeErro(erro, 'carregar os pontos de apoio'))
      })
      .finally(() => {
        if (ativo) setLoading(false)
      })

    return () => {
      ativo = false
    }
  }, [versao])

  const recarregar = useCallback(() => setVersao((v) => v + 1), [])

  const criar = useCallback(async (valores, situacao) => {
    const novo = normalizarPonto(await pontosService.criarPonto(prepararPonto(valores, situacao)))
    setPontos((atual) => [...atual, novo])
    return novo
  }, [])

  const atualizar = useCallback(async (ponto, valores, situacao) => {
    const dados = prepararPonto(valores, situacao, ponto.avisosFechado)
    const editado = normalizarPonto(await pontosService.atualizarPonto(ponto.id, dados))
    setPontos((atual) => atual.map((p) => (p.id === editado.id ? editado : p)))
    return editado
  }, [])

  const excluir = useCallback(async (id) => {
    await pontosService.excluirPonto(id)
    setPontos((atual) => atual.filter((p) => p.id !== id))
  }, [])

  const alternarRecurso = useCallback((recurso) => {
    setFiltros((atual) => ({
      ...atual,
      recursos: atual.recursos.includes(recurso)
        ? atual.recursos.filter((r) => r !== recurso)
        : [...atual.recursos, recurso],
    }))
  }, [])

  const definirDistancia = useCallback((distanciaMaxKm) => {
    setFiltros((atual) => ({ ...atual, distanciaMaxKm }))
  }, [])

  const latitude = origem?.latitude
  const longitude = origem?.longitude
  const pontosFiltrados = useMemo(
    () => filtrarPontos(pontos, filtros, latitude === undefined ? null : { latitude, longitude }),
    [pontos, filtros, latitude, longitude],
  )

  return {
    pontos,
    pontosFiltrados,
    filtros,
    alternarRecurso,
    definirDistancia,
    loading,
    error,
    recarregar,
    criar,
    atualizar,
    excluir,
  }
}
