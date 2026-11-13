import { useState } from 'react'
import { useParams } from 'react-router'
import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Icone from '../components/Icone.jsx'
import Loader from '../components/Loader.jsx'
import ResourceList from '../components/ResourceList.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import usePontoDeApoio from '../hooks/usePontoDeApoio.js'
import { mensagemDeErro } from '../utils/erros.js'
import { estaAbertoAgora, formatarHorario, pontoEhVisivel } from '../utils/pontos.js'

// Detalhe do ponto de apoio e aviso de "fechado" (RF02, RF12)
export default function DetalhePonto() {
  const { id } = useParams()
  const { ponto, loading, error, recarregar, avisarFechado, enviandoAviso } = usePontoDeApoio(id)
  const [avisoEnviado, setAvisoEnviado] = useState(false)
  const [mensagem, setMensagem] = useState(null)

  async function enviarAviso() {
    setMensagem(null)
    try {
      await avisarFechado()
      setAvisoEnviado(true)
      setMensagem({ tipo: 'sucesso', texto: 'Obrigado por avisar! Vamos conferir este ponto.' })
    } catch (erro) {
      setMensagem({ tipo: 'erro', texto: mensagemDeErro(erro, 'enviar seu aviso') })
    }
  }

  const voltar = (
    <Button para="/mapa" variante="texto" tamanho="pequeno" className="-ml-3">
      <Icone nome="voltar" className="w-5 h-5" />
      Voltar para a lista
    </Button>
  )

  if (loading) return <Loader texto="Carregando ponto de apoio..." />
  if (error) {
    return (
      <div className="space-y-4">
        {voltar}
        <ErrorMessage mensagem={error} onTentarDeNovo={recarregar} />
      </div>
    )
  }
  if (!ponto || !pontoEhVisivel(ponto)) {
    return (
      <div className="space-y-4">
        {voltar}
        <EmptyState titulo="Este ponto não está disponível." descricao="Veja outros pontos de apoio por perto." />
      </div>
    )
  }

  const aberto = estaAbertoAgora(ponto.horario)
  const linkMapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${ponto.endereco}, São Paulo - SP`)}`

  return (
    <div className="space-y-5">
      {voltar}

      <div>
        <h1 className="text-3xl font-bold">{ponto.nome}</h1>
        <p className="mt-1 text-lg">{ponto.endereco}</p>
      </div>

      {ponto.situacao === 'a_confirmar' && (
        <p className="bg-risco-atencao rounded-xl px-4 py-3 font-semibold">
          A confirmar: algumas pessoas avisaram que este ponto pode estar fechado.
        </p>
      )}

      <dl className="bg-areia rounded-2xl p-5 space-y-4">
        <div>
          <dt className="font-semibold">Horário</dt>
          <dd className="text-lg">
            {aberto === true && <strong className="text-green-900">Aberto agora · </strong>}
            {aberto === false && <strong className="text-red-900">Fechado agora · </strong>}
            {formatarHorario(ponto.horario)}
          </dd>
        </div>
        <div>
          <dt className="font-semibold mb-2">O que tem aqui</dt>
          <dd>
            <ResourceList recursos={ponto.recursos} tamanho="grande" />
          </dd>
        </div>
      </dl>

      <Button href={linkMapa} target="_blank" rel="noopener noreferrer" tamanho="grande" largura>
        <Icone nome="rota" />
        Como chegar
        <span className="sr-only">(abre o Google Maps em outra aba)</span>
      </Button>

      <section aria-labelledby="titulo-aviso" className="border-2 border-dashed border-marinho/25 rounded-2xl p-5">
        <h2 id="titulo-aviso" className="text-lg font-bold">
          Está fechado? Avise aqui
        </h2>
        <p className="mt-1">Seu aviso ajuda outras pessoas a não perderem a viagem.</p>
        <Button variante="secundario" className="mt-3" onClick={enviarAviso} disabled={enviandoAviso || avisoEnviado}>
          {enviandoAviso ? 'Enviando...' : avisoEnviado ? 'Aviso enviado' : 'Avisar que está fechado'}
        </Button>
        <div className="mt-3">
          <StatusMessage mensagem={mensagem} />
        </div>
      </section>
    </div>
  )
}
