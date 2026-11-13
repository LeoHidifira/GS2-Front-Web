import { useCallback, useEffect, useState } from 'react'
import * as regioesService from '../services/regioesService.js'
import { normalizarRegiao, ordenarPorNome, prepararRegiao } from '../utils/regioes.js'
import { mensagemDeErro } from '../utils/erros.js'

// Lista, cria, edita e exclui regiões; controla loading/error (RF08)
export default function useRegioes() {
  const [regioes, setRegioes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [versao, setVersao] = useState(0)

  useEffect(() => {
    let ativo = true
    setLoading(true)
    setError(null)

    regioesService
      .listarRegioes()
      .then((lista) => {
        if (ativo) setRegioes(ordenarPorNome((lista ?? []).map(normalizarRegiao)))
      })
      .catch((erro) => {
        if (ativo) setError(mensagemDeErro(erro, 'carregar as regiões'))
      })
      .finally(() => {
        if (ativo) setLoading(false)
      })

    return () => {
      ativo = false
    }
  }, [versao])

  const recarregar = useCallback(() => setVersao((v) => v + 1), [])

  const criar = useCallback(async (valores) => {
    const nova = normalizarRegiao(await regioesService.criarRegiao(prepararRegiao(valores)))
    setRegioes((atual) => ordenarPorNome([...atual, nova]))
    return nova
  }, [])

  const atualizar = useCallback(async (id, valores) => {
    const editada = normalizarRegiao(await regioesService.atualizarRegiao(id, prepararRegiao(valores)))
    setRegioes((atual) => ordenarPorNome(atual.map((r) => (r.id === editada.id ? editada : r))))
    return editada
  }, [])

  const excluir = useCallback(async (id) => {
    await regioesService.excluirRegiao(id)
    setRegioes((atual) => atual.filter((r) => r.id !== id))
  }, [])

  const regioesAtivas = regioes.filter((r) => r.ativo)

  return { regioes, regioesAtivas, loading, error, recarregar, criar, atualizar, excluir }
}
