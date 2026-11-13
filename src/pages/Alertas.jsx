import AlertBanner from '../components/AlertBanner.jsx'
import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loader from '../components/Loader.jsx'
import TipsList from '../components/TipsList.jsx'
import { NIVEIS } from '../constants/riscos.js'
import { TELEFONE_SAMU } from '../constants/textos.js'
import useAlertas from '../hooks/useAlertas.js'
import usePreferencias from '../hooks/usePreferencias.jsx'
import useRegioes from '../hooks/useRegioes.js'
import { formatarHora } from '../utils/formatos.js'
import { escolherRegiaoAtual } from '../utils/regioes.js'
import useTituloDaPagina from '../hooks/useTituloDaPagina.js'

// Alertas de calor dos bairros acompanhados (RF04, RF06)
export default function Alertas() {
  useTituloDaPagina('Alertas')
  const { preferencias } = usePreferencias()
  const { regioesAtivas, loading: carregandoRegioes, error: erroRegioes, recarregar: recarregarRegioes } = useRegioes()

  const seguidas = regioesAtivas.filter((r) => preferencias.bairrosSeguidos.includes(r.id))
  const atual = escolherRegiaoAtual(regioesAtivas, preferencias.bairroAtualId)
  const acompanhadas = seguidas.length > 0 ? seguidas : atual ? [atual] : []

  const { alertas, loading, error, recarregar } = useAlertas(acompanhadas, {
    ligado: preferencias.alertasLigados,
    nivelMinimo: preferencias.nivelMinimo,
  })

  const nomes = acompanhadas.map((r) => r.nome).join(', ')

  return (
    <div>
      <h1 className="font-titulo text-3xl md:text-4xl font-bold">Alertas</h1>
      {acompanhadas.length > 0 && (
        <p className="mt-1 text-marinho/80">
          {nomes} ·{' '}
          <Button para="/bairros" variante="texto" tamanho="pequeno">
            mudar
          </Button>
        </p>
      )}

      <div className="mt-6 space-y-8">
        {carregandoRegioes && <Loader />}
        {erroRegioes && <ErrorMessage mensagem={erroRegioes} onTentarDeNovo={recarregarRegioes} />}

        {!carregandoRegioes && !erroRegioes && !preferencias.alertasLigados && (
          <EmptyState titulo="Seus alertas estão desligados." descricao="Ligue para saber quando o calor ficar perigoso.">
            <Button para="/bairros">Ligar alertas</Button>
          </EmptyState>
        )}

        {preferencias.alertasLigados && (
          <>
            {loading && <Loader texto="Conferindo o calor nos seus bairros..." />}
            {error && <ErrorMessage mensagem={error} onTentarDeNovo={recarregar} />}
            {!loading && !error && !carregandoRegioes && alertas.length === 0 && acompanhadas.length > 0 && (
              <EmptyState
                titulo="Dia tranquilo por aqui. Mesmo assim, leve água."
                descricao={`Você recebe aviso quando o risco chegar a ${NIVEIS[preferencias.nivelMinimo].rotulo} ou mais.`}
              />
            )}
            {!loading &&
              alertas.map((alerta) => (
                <div key={alerta.regiaoId} className="grid gap-6 md:grid-cols-[3fr_2fr] md:gap-10">
                  <AlertBanner
                    nivel={alerta.nivel}
                    classeFundo={NIVEIS[alerta.nivel].classeFundo}
                    titulo={alerta.titulo}
                    ate={alerta.ate}
                    motivo={alerta.motivo}
                    emitidoEm={formatarHora(alerta.emitidoEm)}
                  />
                  <TipsList titulo={`O que fazer em ${alerta.regiaoNome}`} dicas={NIVEIS[alerta.nivel].dicas} />
                </div>
              ))}
          </>
        )}

        <p className="border-t border-marinho/15 pt-4">
          Tontura, enjoo ou dor de cabeça forte?{' '}
          <a href={`tel:${TELEFONE_SAMU}`} className="font-semibold underline underline-offset-4">
            Ligue {TELEFONE_SAMU} (SAMU)
          </a>
        </p>
      </div>
    </div>
  )
}
