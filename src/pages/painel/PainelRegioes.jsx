import { useCallback, useState } from 'react'
import Button from '../../components/Button.jsx'
import ConfirmDialog from '../../components/ConfirmDialog.jsx'
import DataTable from '../../components/DataTable.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import ErrorMessage from '../../components/ErrorMessage.jsx'
import Loader from '../../components/Loader.jsx'
import RegionForm from '../../components/RegionForm.jsx'
import StatusMessage from '../../components/StatusMessage.jsx'
import useRegioes from '../../hooks/useRegioes.js'
import { mensagemDeErro } from '../../utils/erros.js'
import { validarRegiao } from '../../utils/regioes.js'
import useTituloDaPagina from '../../hooks/useTituloDaPagina.js'

const colunas = [
  { chave: 'nome', titulo: 'Região' },
  { chave: 'bairro', titulo: 'Bairro' },
  {
    chave: 'coordenadas',
    titulo: 'Latitude, longitude',
    render: (r) => `${r.latitude.toFixed(4)}, ${r.longitude.toFixed(4)}`,
  },
  { chave: 'ativo', titulo: 'Situação', render: (r) => (r.ativo ? 'Ativa' : 'Inativa') },
]

// Painel – CRUD de regiões monitoradas (RF08)
export default function PainelRegioes() {
  useTituloDaPagina('Painel · Regiões')
  const { regioes, loading, error, recarregar, criar, atualizar, excluir } = useRegioes()
  const [editando, setEditando] = useState(null) // null = formulário fechado; {} = nova região
  const [salvando, setSalvando] = useState(false)
  const [paraExcluir, setParaExcluir] = useState(null)
  const [excluindo, setExcluindo] = useState(false)
  const [mensagem, setMensagem] = useState(null)

  async function salvar(valores) {
    setSalvando(true)
    setMensagem(null)
    try {
      if (editando?.id) {
        await atualizar(editando.id, valores)
        setMensagem({ tipo: 'sucesso', texto: `Região ${valores.nome} atualizada.` })
      } else {
        await criar(valores)
        setMensagem({ tipo: 'sucesso', texto: `Região ${valores.nome} cadastrada.` })
      }
      setEditando(null)
    } catch (erro) {
      setMensagem({ tipo: 'erro', texto: mensagemDeErro(erro, 'salvar a região') })
    } finally {
      setSalvando(false)
    }
  }

  async function confirmarExclusao() {
    setExcluindo(true)
    try {
      await excluir(paraExcluir.id)
      setMensagem({ tipo: 'sucesso', texto: `Região ${paraExcluir.nome} excluída.` })
      if (editando?.id === paraExcluir.id) setEditando(null)
    } catch (erro) {
      setMensagem({ tipo: 'erro', texto: mensagemDeErro(erro, 'excluir a região') })
    } finally {
      setExcluindo(false)
      setParaExcluir(null)
    }
  }

  const cancelarExclusao = useCallback(() => setParaExcluir(null), [])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="sobrescrito text-tinta/60">Painel</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-light tracking-tight">Regiões <em className="text-terra">monitoradas</em></h1>
        </div>
        {!editando && (
          <Button onClick={() => setEditando({})} seta>
            Nova região
          </Button>
        )}
      </div>

      <StatusMessage mensagem={mensagem} />

      <div className={editando ? 'grid gap-6 lg:grid-cols-[1fr_26rem] lg:items-start' : ''}>
        <div className="min-w-0 space-y-4">
          {loading && <Loader texto="Carregando regiões..." />}
          {error && <ErrorMessage mensagem={error} onTentarDeNovo={recarregar} />}
          {!loading && !error && regioes.length === 0 && (
            <EmptyState titulo="Nenhuma região cadastrada." descricao="Cadastre a primeira região para começar." />
          )}
          {!loading && !error && regioes.length > 0 && (
            <DataTable
              legenda="Regiões monitoradas"
              colunas={colunas}
              linhas={regioes}
              acoes={(regiao) => (
                <>
                  <Button tamanho="pequeno" variante="secundario" onClick={() => setEditando(regiao)} aria-label={`Editar ${regiao.nome}`}>
                    Editar
                  </Button>
                  <Button tamanho="pequeno" variante="perigo" onClick={() => setParaExcluir(regiao)} aria-label={`Excluir ${regiao.nome}`}>
                    Excluir
                  </Button>
                </>
              )}
            />
          )}
        </div>
        {editando && (
          <div className="order-first lg:order-last lg:sticky lg:top-28">
            <RegionForm
              key={editando.id ?? 'nova'}
              valoresIniciais={editando}
              validar={validarRegiao}
              onSalvar={salvar}
              onCancelar={() => setEditando(null)}
              salvando={salvando}
            />
          </div>
        )}
      </div>

      <ConfirmDialog
        aberto={Boolean(paraExcluir)}
        titulo="Excluir região?"
        mensagem={`A região ${paraExcluir?.nome ?? ''} vai sair da lista. Os pontos de apoio dela continuam cadastrados.`}
        onConfirmar={confirmarExclusao}
        onCancelar={cancelarExclusao}
        ocupado={excluindo}
      />
    </div>
  )
}
