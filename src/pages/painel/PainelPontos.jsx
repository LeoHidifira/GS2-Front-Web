import { useCallback, useState } from 'react'
import Button from '../../components/Button.jsx'
import ConfirmDialog from '../../components/ConfirmDialog.jsx'
import DataTable from '../../components/DataTable.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import ErrorMessage from '../../components/ErrorMessage.jsx'
import Loader from '../../components/Loader.jsx'
import ResourceList from '../../components/ResourceList.jsx'
import SituationBadge from '../../components/SituationBadge.jsx'
import StatusMessage from '../../components/StatusMessage.jsx'
import SupportPointForm from '../../components/SupportPointForm.jsx'
import usePontosDeApoio from '../../hooks/usePontosDeApoio.js'
import useRegioes from '../../hooks/useRegioes.js'
import { mensagemDeErro } from '../../utils/erros.js'
import { avisosNasUltimas24h, validarPonto } from '../../utils/pontos.js'
import useTituloDaPagina from '../../hooks/useTituloDaPagina.js'

// Painel – CRUD de pontos de apoio (RF09). "Publicar" só libera com os dados da RN04.
export default function PainelPontos() {
  useTituloDaPagina('Painel · Pontos de apoio')
  const { pontos, loading, error, recarregar, criar, atualizar, excluir } = usePontosDeApoio()
  const { regioes, loading: carregandoRegioes } = useRegioes()
  const [editando, setEditando] = useState(null) // null = formulário fechado; {} = novo ponto
  const [salvando, setSalvando] = useState(false)
  const [paraExcluir, setParaExcluir] = useState(null)
  const [excluindo, setExcluindo] = useState(false)
  const [mensagem, setMensagem] = useState(null)

  const nomeDaRegiao = (id) => regioes.find((r) => r.id === id)?.nome ?? 'Região removida'

  const colunas = [
    { chave: 'nome', titulo: 'Ponto' },
    { chave: 'regiao', titulo: 'Região', render: (p) => nomeDaRegiao(p.regiaoId) },
    { chave: 'situacao', titulo: 'Situação', render: (p) => <SituationBadge situacao={p.situacao} /> },
    { chave: 'recursos', titulo: 'Recursos', render: (p) => <ResourceList recursos={p.recursos} /> },
    { chave: 'avisos', titulo: 'Avisos (24 h)', render: (p) => avisosNasUltimas24h(p).length },
  ]

  async function salvar(valores, situacao) {
    setSalvando(true)
    setMensagem(null)
    const acao = situacao === 'publicado' ? 'publicado' : 'salvo como rascunho'
    try {
      if (editando?.id) {
        await atualizar(editando, valores, situacao)
      } else {
        await criar(valores, situacao)
      }
      setMensagem({ tipo: 'sucesso', texto: `Ponto ${valores.nome.trim()} ${acao}.` })
      setEditando(null)
    } catch (erro) {
      setMensagem({ tipo: 'erro', texto: mensagemDeErro(erro, 'salvar o ponto') })
    } finally {
      setSalvando(false)
    }
  }

  async function confirmarExclusao() {
    setExcluindo(true)
    try {
      await excluir(paraExcluir.id)
      setMensagem({ tipo: 'sucesso', texto: `Ponto ${paraExcluir.nome} excluído.` })
      if (editando?.id === paraExcluir.id) setEditando(null)
    } catch (erro) {
      setMensagem({ tipo: 'erro', texto: mensagemDeErro(erro, 'excluir o ponto') })
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
          <h1 className="mt-2 text-4xl md:text-5xl font-light tracking-tight">Pontos de apoio</h1>
        </div>
        {!editando && (
          <Button onClick={() => setEditando({})} disabled={carregandoRegioes} seta>
            Novo ponto
          </Button>
        )}
      </div>

      <StatusMessage mensagem={mensagem} />

      <div className={editando ? 'grid gap-6 lg:grid-cols-[1fr_26rem] lg:items-start' : ''}>
        <div className="min-w-0 space-y-4">
          {loading && <Loader texto="Carregando pontos de apoio..." />}
          {error && <ErrorMessage mensagem={error} onTentarDeNovo={recarregar} />}
          {!loading && !error && pontos.length === 0 && (
            <EmptyState titulo="Nenhum ponto cadastrado." descricao="Cadastre o primeiro ponto de apoio." />
          )}
          {!loading && !error && pontos.length > 0 && (
            <DataTable
              legenda="Pontos de apoio"
              colunas={colunas}
              linhas={pontos}
              acoes={(ponto) => (
                <>
                  <Button tamanho="pequeno" variante="secundario" onClick={() => setEditando(ponto)} aria-label={`Editar ${ponto.nome}`}>
                    Editar
                  </Button>
                  <Button tamanho="pequeno" variante="perigo" onClick={() => setParaExcluir(ponto)} aria-label={`Excluir ${ponto.nome}`}>
                    Excluir
                  </Button>
                </>
              )}
            />
          )}
        </div>
        {editando && (
          <div className="order-first lg:order-last lg:sticky lg:top-28">
            <SupportPointForm
              key={editando.id ?? 'novo'}
              valoresIniciais={
                editando.id
                  ? { ...editando, latitude: String(editando.latitude), longitude: String(editando.longitude) }
                  : {}
              }
              regioes={regioes}
              validar={validarPonto}
              onSalvar={salvar}
              onCancelar={() => setEditando(null)}
              salvando={salvando}
            />
          </div>
        )}
      </div>

      <ConfirmDialog
        aberto={Boolean(paraExcluir)}
        titulo="Excluir ponto de apoio?"
        mensagem={`O ponto ${paraExcluir?.nome ?? ''} vai sair do mapa e da lista. Não dá para desfazer.`}
        onConfirmar={confirmarExclusao}
        onCancelar={cancelarExclusao}
        ocupado={excluindo}
      />
    </div>
  )
}
