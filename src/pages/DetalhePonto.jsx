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
    <Button para="/mapa" variante="secundario" tamanho="pequeno">
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
        <EmptyState titulo="Este ponto não está disponível." descricao="Veja outros pontos de apoio por perto." icone="mapa" />
      </div>
    )
  }

  const aberto = estaAbertoAgora(ponto.horario)
  const linkMapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${ponto.endereco}, São Paulo - SP`)}`

  return (
    <div>
      {voltar}
      <p className="mt-6 sobrescrito text-tinta/60">Ponto de apoio</p>
      <h1 className="mt-3 text-4xl md:text-6xl font-light leading-[1.05] tracking-tight">{ponto.nome}</h1>
      <p className="mt-3 text-lg text-tinta/75">{ponto.endereco}</p>

      {ponto.situacao === 'a_confirmar' && (
        <p className="mt-5 rounded-2xl bg-risco-atencao/70 px-5 py-3 font-semibold">
          Pode estar fechado. Algumas pessoas avisaram e estamos conferindo.
        </p>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-[7fr_5fr] lg:gap-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-floresta text-creme p-6 md:p-8 shadow-suave">
          <span aria-hidden="true" className="pointer-events-none absolute -right-16 -bottom-20 w-72 h-72 rounded-full border border-creme/10" />
          <dl className="relative divide-y divide-creme/15">
            <div className="pb-5 grid grid-cols-[6.5rem_1fr] gap-3 items-baseline">
              <dt className="text-creme/70">Horário</dt>
              <dd className="text-lg">
                {aberto === true && <strong className="text-[#BFE3C4]">Aberto agora · </strong>}
                {aberto === false && <strong className="text-[#F3B7AE]">Fechado agora · </strong>}
                {formatarHorario(ponto.horario)}
              </dd>
            </div>
            <div className="pt-5 grid grid-cols-[6.5rem_1fr] gap-3 items-center">
              <dt className="text-creme/70">Tem aqui</dt>
              <dd>
                <ResourceList recursos={ponto.recursos} tamanho="grande" />
              </dd>
            </div>
          </dl>
          <Button href={linkMapa} target="_blank" rel="noopener noreferrer" variante="claro" tamanho="grande" largura seta className="relative mt-8">
            Como chegar
            <span className="sr-only">(abre o Google Maps em outra aba)</span>
          </Button>
        </div>

        <section aria-labelledby="titulo-aviso" className="vidro shadow-suave rounded-[2rem] p-6 md:p-7">
          <span className="grid place-items-center w-11 h-11 rounded-2xl bg-nevoa text-musgo">
            <Icone nome="alerta" className="w-5 h-5" />
          </span>
          <h2 id="titulo-aviso" className="mt-4 font-semibold text-lg">
            Está fechado? Avise aqui
          </h2>
          <p className="mt-1 text-tinta/75">Se você chegou e o lugar estava fechado, avise. A gente confere.</p>
          <Button variante="secundario" className="mt-5" onClick={enviarAviso} disabled={enviandoAviso || avisoEnviado}>
            {enviandoAviso ? 'Enviando...' : avisoEnviado ? 'Aviso enviado' : 'Avisar que está fechado'}
          </Button>
          <div className="mt-4">
            <StatusMessage mensagem={mensagem} />
          </div>
        </section>
      </div>
    </div>
  )
}
