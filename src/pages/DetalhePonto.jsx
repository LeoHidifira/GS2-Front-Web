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
import useTituloDaPagina from '../hooks/useTituloDaPagina.js'

// Detalhe do ponto de apoio e aviso de "fechado" (RF02, RF12)
export default function DetalhePonto() {
  const { id } = useParams()
  const { ponto, loading, error, recarregar, avisarFechado, enviandoAviso } = usePontoDeApoio(id)
  const [avisoEnviado, setAvisoEnviado] = useState(false)
  const [mensagem, setMensagem] = useState(null)
  useTituloDaPagina(ponto?.nome ?? 'Ponto de apoio')

  async function enviarAviso() {
    setMensagem(null)
    try {
      await avisarFechado()
      setAvisoEnviado(true)
      setMensagem({ tipo: 'sucesso', texto: 'Aviso recebido. Obrigado!' })
    } catch (erro) {
      setMensagem({ tipo: 'erro', texto: mensagemDeErro(erro, 'enviar seu aviso') })
    }
  }

  const voltar = (
    <Button para="/mapa" variante="texto" tamanho="pequeno">
      <Icone nome="voltar" className="w-4 h-4" />
      Pontos de apoio
    </Button>
  )

  if (loading) return <Loader />
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
    <div>
      {voltar}
      <h1 className="mt-2 font-titulo text-3xl md:text-4xl font-bold">{ponto.nome}</h1>
      <p className="mt-1 text-lg text-marinho/85">{ponto.endereco}</p>

      {ponto.situacao === 'a_confirmar' && (
        <p className="mt-4 border-l-4 border-amber-500 bg-white px-4 py-2 font-semibold">
          Pode estar fechado. Algumas pessoas avisaram e estamos conferindo.
        </p>
      )}

      <div className="mt-6 grid gap-8 md:grid-cols-[3fr_2fr] md:gap-10">
        <div>
          <dl className="divide-y divide-marinho/15 border-y border-marinho/15">
            <div className="py-4 grid grid-cols-[7rem_1fr] gap-3">
              <dt className="text-marinho/75">Horário</dt>
              <dd className="text-lg">
                {aberto === true && <strong className="text-green-800">Aberto agora · </strong>}
                {aberto === false && <strong className="text-red-800">Fechado agora · </strong>}
                {formatarHorario(ponto.horario)}
              </dd>
            </div>
            <div className="py-4 grid grid-cols-[7rem_1fr] gap-3">
              <dt className="text-marinho/75">Tem aqui</dt>
              <dd>
                <ResourceList recursos={ponto.recursos} tamanho="grande" />
              </dd>
            </div>
          </dl>
          <Button href={linkMapa} target="_blank" rel="noopener noreferrer" tamanho="grande" largura className="mt-5">
            Como chegar
            <span className="sr-only">(abre o Google Maps em outra aba)</span>
            <Icone nome="rota" />
          </Button>
        </div>

        <section aria-labelledby="titulo-aviso" className="md:border-l md:border-marinho/15 md:pl-8">
          <h2 id="titulo-aviso" className="font-semibold text-lg">
            Está fechado? Avise aqui
          </h2>
          <p className="mt-1 text-marinho/85">Se você chegou e o lugar estava fechado, avise. A gente confere.</p>
          <Button variante="secundario" className="mt-3" onClick={enviarAviso} disabled={enviandoAviso || avisoEnviado}>
            {enviandoAviso ? 'Enviando...' : avisoEnviado ? 'Aviso enviado' : 'Avisar que está fechado'}
          </Button>
          <div className="mt-3">
            <StatusMessage mensagem={mensagem} />
          </div>
        </section>
      </div>
    </div>
  )
}
