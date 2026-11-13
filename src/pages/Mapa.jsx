import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import FilterChips from '../components/FilterChips.jsx'
import Icone from '../components/Icone.jsx'
import Loader from '../components/Loader.jsx'
import SupportPointCard from '../components/SupportPointCard.jsx'
import { LISTA_RECURSOS, OPCOES_DISTANCIA } from '../constants/recursos.js'
import useLocalizacao from '../hooks/useLocalizacao.js'
import usePontosDeApoio from '../hooks/usePontosDeApoio.js'
import usePreferencias from '../hooks/usePreferencias.jsx'
import useRegioes from '../hooks/useRegioes.js'
import { formatarDistancia } from '../utils/formatos.js'
import { estaAbertoAgora, formatarHorario } from '../utils/pontos.js'
import { escolherRegiaoAtual } from '../utils/regioes.js'
import useTituloDaPagina from '../hooks/useTituloDaPagina.js'

const opcoesRecursos = LISTA_RECURSOS.map((r) => ({ valor: r.id, rotulo: r.nome, icone: r.icone }))

// Pontos de apoio mais próximos, com filtros por recurso e distância (RF02, RF03)
export default function Mapa() {
  useTituloDaPagina('Onde me refrescar')
  const { preferencias } = usePreferencias()
  const { regioesAtivas } = useRegioes()
  const regiao = escolherRegiaoAtual(regioesAtivas, preferencias.bairroAtualId)
  const localizacao = useLocalizacao()
  const origem = localizacao.posicao ?? regiao

  const { pontosFiltrados, filtros, alternarRecurso, definirDistancia, loading, error, recarregar } =
    usePontosDeApoio({ origem })

  return (
    <div>
      <p className="sobrescrito text-tinta/60">
        Sombra <span aria-hidden="true">—</span> Água <span aria-hidden="true">—</span> Banheiro
      </p>
      <h1 className="mt-3 text-4xl md:text-6xl font-light leading-[1.05] tracking-tight">
        Onde me <em className="text-terra">refrescar</em>
      </h1>

      <div className="mt-8 grid gap-6 md:grid-cols-[19rem_1fr] md:gap-8">
        <aside className="md:sticky md:top-28 md:self-start vidro shadow-suave rounded-[2rem] p-5 md:p-6 space-y-6">
          <div className="flex items-start gap-3">
            <span className="grid place-items-center shrink-0 w-10 h-10 rounded-full bg-floresta text-creme">
              <Icone nome="localizacao" className="w-5 h-5" />
            </span>
            <div className="text-sm">
              <p className="font-medium">
                {localizacao.posicao
                  ? 'Distância a partir de onde você está.'
                  : regiao
                    ? `Distância a partir do centro de ${regiao.nome}.`
                    : 'Pontos de apoio da cidade.'}
              </p>
              {localizacao.posicao ? (
                <Button variante="texto" tamanho="pequeno" onClick={localizacao.esquecerLocalizacao}>
                  Usar o centro do bairro
                </Button>
              ) : (
                <Button variante="texto" tamanho="pequeno" onClick={localizacao.pedirLocalizacao} disabled={localizacao.buscando}>
                  {localizacao.buscando ? 'Buscando sua localização...' : 'Usar minha localização'}
                </Button>
              )}
              <p className="text-tinta/65">Sua localização não fica salva.</p>
              {localizacao.erro && (
                <p role="status" className="mt-1 font-semibold">
                  {localizacao.erro}
                </p>
              )}
            </div>
          </div>

          <FilterChips
            titulo="Preciso de"
            opcoes={opcoesRecursos}
            estaAtivo={(valor) => filtros.recursos.includes(valor)}
            onSelecionar={alternarRecurso}
          />
          <FilterChips
            titulo="Distância"
            opcoes={OPCOES_DISTANCIA}
            estaAtivo={(valor) => filtros.distanciaMaxKm === valor}
            onSelecionar={definirDistancia}
          />
        </aside>

        <section aria-labelledby="titulo-lista" className="min-w-0">
          {loading && <Loader texto="Procurando pontos de apoio..." />}
          {error && <ErrorMessage mensagem={error} onTentarDeNovo={recarregar} />}
          {!loading && !error && pontosFiltrados.length === 0 && (
            <EmptyState titulo="Nenhum ponto com esses filtros." descricao="Tire um filtro ou aumente a distância." icone="mapa" />
          )}
          {!loading && !error && pontosFiltrados.length > 0 && (
            <div className="vidro shadow-suave rounded-[2rem] p-2 md:p-3">
              <h2 id="titulo-lista" className="flex items-baseline justify-between gap-3 px-3 pt-3 pb-2">
                <span className="text-lg font-semibold">
                  {pontosFiltrados.length === 1 ? '1 ponto de apoio' : `${pontosFiltrados.length} pontos de apoio`}
                </span>
                <span className="text-sm text-tinta/65">do mais perto ao mais longe</span>
              </h2>
              <ul className="divide-y divide-tinta/[0.07]">
                {pontosFiltrados.map((ponto) => (
                  <li key={ponto.id}>
                    <SupportPointCard
                      id={ponto.id}
                      nome={ponto.nome}
                      endereco={ponto.endereco}
                      distancia={formatarDistancia(ponto.distanciaKm)}
                      horario={formatarHorario(ponto.horario)}
                      aberto={estaAbertoAgora(ponto.horario)}
                      aConfirmar={ponto.situacao === 'a_confirmar'}
                      recursos={ponto.recursos}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
