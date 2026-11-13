import AlertBanner from '../components/AlertBanner.jsx'
import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Icone from '../components/Icone.jsx'
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

  return (
    <div>
      <p className="sobrescrito text-tinta/60">Seus bairros</p>
      <h1 className="mt-3 text-4xl md:text-6xl font-light leading-[1.05] tracking-tight">Alertas</h1>
      {acompanhadas.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {acompanhadas.map((r) => (
            <span key={r.id} className="rounded-full bg-white/70 border border-tinta/10 px-3.5 py-1.5 text-sm font-medium">
              {r.nome}
            </span>
          ))}
          <Button para="/bairros" variante="texto" tamanho="pequeno" className="ml-1">
            mudar
          </Button>
        </div>
      )}

      <div className="mt-8 space-y-8">
        {carregandoRegioes && <Loader />}
        {erroRegioes && <ErrorMessage mensagem={erroRegioes} onTentarDeNovo={recarregarRegioes} />}

        {!carregandoRegioes && !erroRegioes && !preferencias.alertasLigados && (
          <EmptyState titulo="Seus alertas estão desligados." descricao="Ligue para saber quando o calor ficar perigoso." icone="alerta">
            <Button para="/bairros" seta>
              Ligar alertas
            </Button>
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
                <div key={alerta.regiaoId} className="grid gap-6 lg:grid-cols-[7fr_5fr] lg:gap-8">
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

        <a
          href={`tel:${TELEFONE_SAMU}`}
          className="group flex items-center gap-4 rounded-[1.75rem] bg-floresta text-creme px-5 py-4 hover:bg-floresta-escuro transition-colors"
        >
          <span className="grid place-items-center shrink-0 w-12 h-12 rounded-2xl bg-creme/10">
            <Icone nome="telefone" className="w-5 h-5" />
          </span>
          <span className="flex-1">
            <span className="block font-semibold">Tontura, enjoo ou dor de cabeça forte?</span>
            <span className="block text-sm text-creme/75">Ligue {TELEFONE_SAMU} (SAMU)</span>
          </span>
          <Icone nome="abrir" className="w-5 h-5 shrink-0" />
        </a>
      </div>
    </div>
  )
}
