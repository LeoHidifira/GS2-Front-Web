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

const opcoesRecursos = LISTA_RECURSOS.map((r) => ({ valor: r.id, rotulo: r.nome, icone: r.icone }))

// Pontos de apoio mais próximos, com filtros por recurso e distância (RF02, RF03)
export default function Mapa() {
  const { preferencias } = usePreferencias()
  const { regioesAtivas } = useRegioes()
  const regiao = escolherRegiaoAtual(regioesAtivas, preferencias.bairroAtualId)
  const localizacao = useLocalizacao()
  const origem = localizacao.posicao ?? regiao

  const { pontosFiltrados, filtros, alternarRecurso, definirDistancia, loading, error, recarregar } =
    usePontosDeApoio({ origem })

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold">Onde me refrescar</h1>
        <p className="mt-1">
          {localizacao.posicao
            ? 'Distâncias a partir de onde você está.'
            : regiao
              ? `Distâncias a partir do centro de ${regiao.nome}.`
              : 'Pontos de apoio da cidade.'}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          {localizacao.posicao ? (
            <Button variante="texto" tamanho="pequeno" onClick={localizacao.esquecerLocalizacao}>
              Usar o centro do bairro
            </Button>
          ) : (
            <Button variante="secundario" tamanho="pequeno" onClick={localizacao.pedirLocalizacao} disabled={localizacao.buscando}>
              {localizacao.buscando ? 'Buscando sua localização...' : 'Usar minha localização'}
            </Button>
          )}
          <span className="text-sm text-marinho/75">Sua localização não é salva.</span>
        </div>
        {localizacao.erro && (
          <p role="status" className="mt-2 text-sm font-semibold">
            {localizacao.erro}
          </p>
        )}
      </div>

      <div className="space-y-4 bg-areia rounded-2xl p-4">
        <FilterChips
          titulo="O que você precisa?"
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
      </div>

      {loading && <Loader texto="Procurando pontos de apoio..." />}
      {error && <ErrorMessage mensagem={error} onTentarDeNovo={recarregar} />}
      {!loading && !error && pontosFiltrados.length === 0 && (
        <EmptyState
          titulo="Nenhum ponto encontrado com esses filtros."
          descricao="Tire um filtro ou aumente a distância."
        />
      )}
      {!loading && !error && pontosFiltrados.length > 0 && (
        <section aria-labelledby="titulo-lista">
          <h2 id="titulo-lista" className="text-lg font-bold mb-3">
            {pontosFiltrados.length === 1 ? '1 ponto encontrado' : `${pontosFiltrados.length} pontos encontrados`}
          </h2>
          <ul className="space-y-3">
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
        </section>
      )}
    </div>
  )
}
