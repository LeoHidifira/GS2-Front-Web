import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import FilterChips from '../components/FilterChips.jsx'
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
      <h1 className="font-titulo text-3xl md:text-4xl font-bold">Onde me refrescar</h1>

      <div className="mt-5 grid gap-6 md:grid-cols-[17rem_1fr] md:gap-10">
        <aside className="space-y-5 md:sticky md:top-20 md:self-start">
          <div className="text-sm">
            <p>
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
            <p className="text-marinho/70">Sua localização não fica salva.</p>
            {localizacao.erro && (
              <p role="status" className="mt-1 font-semibold">
                {localizacao.erro}
              </p>
            )}
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

        <section aria-labelledby="titulo-lista">
          {loading && <Loader texto="Procurando pontos de apoio..." />}
          {error && <ErrorMessage mensagem={error} onTentarDeNovo={recarregar} />}
          {!loading && !error && pontosFiltrados.length === 0 && (
            <EmptyState titulo="Nenhum ponto com esses filtros." descricao="Tire um filtro ou aumente a distância." />
          )}
          {!loading && !error && pontosFiltrados.length > 0 && (
            <>
              <h2 id="titulo-lista" className="text-sm text-marinho/75 pb-2 border-b-2 border-marinho">
                {pontosFiltrados.length === 1 ? '1 ponto' : `${pontosFiltrados.length} pontos`}, do mais perto ao mais longe
              </h2>
              <ul className="divide-y divide-marinho/15">
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
            </>
          )}
        </section>
      </div>
    </div>
  )
}
