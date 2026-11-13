import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loader from '../components/Loader.jsx'
import OptionGroup from '../components/OptionGroup.jsx'
import Toggle from '../components/Toggle.jsx'
import { NIVEIS, NIVEIS_DE_ALERTA } from '../constants/riscos.js'
import usePreferencias from '../hooks/usePreferencias.jsx'
import useRegioes from '../hooks/useRegioes.js'

const opcoesNivel = NIVEIS_DE_ALERTA.map((id) => ({ valor: id, rotulo: `${NIVEIS[id].rotulo} ou mais` }))
const opcoesFonte = [
  { valor: 'normal', rotulo: 'Normal' },
  { valor: 'grande', rotulo: 'Grande' },
  { valor: 'muito-grande', rotulo: 'Muito grande' },
]

// Bairros acompanhados, alertas, nível mínimo e tamanho da letra (RF05). Tudo fica só neste aparelho.
export default function MeusBairros() {
  const { preferencias, atualizar } = usePreferencias()
  const { regioesAtivas, loading, error, recarregar } = useRegioes()

  function alternarBairro(id) {
    const seguidos = preferencias.bairrosSeguidos
    atualizar('bairrosSeguidos', seguidos.includes(id) ? seguidos.filter((b) => b !== id) : [...seguidos, id])
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Meus bairros</h1>
        <p className="mt-1">Escolha onde você mora, trabalha ou passa o dia.</p>
      </div>

      <section aria-labelledby="titulo-bairros" className="bg-areia rounded-2xl p-5">
        <h2 id="titulo-bairros" className="text-lg font-bold mb-3">
          Bairros que eu acompanho
        </h2>
        {loading && <Loader texto="Carregando bairros..." />}
        {error && <ErrorMessage mensagem={error} onTentarDeNovo={recarregar} />}
        {!loading && !error && regioesAtivas.length === 0 && <EmptyState titulo="Nenhum bairro disponível ainda." />}
        {!loading && !error && regioesAtivas.length > 0 && (
          <ul className="space-y-2">
            {regioesAtivas.map((regiao) => (
              <li key={regiao.id}>
                <label className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-marinho"
                    checked={preferencias.bairrosSeguidos.includes(regiao.id)}
                    onChange={() => alternarBairro(regiao.id)}
                  />
                  <span className="font-semibold">{regiao.nome}</span>
                  <span className="text-sm text-marinho/75">{regiao.bairro}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="titulo-alertas" className="bg-areia rounded-2xl p-5 space-y-5">
        <h2 id="titulo-alertas" className="text-lg font-bold">
          Alertas
        </h2>
        <Toggle
          id="alertas-ligados"
          rotulo="Receber alertas de calor"
          descricao="Os avisos aparecem na tela Alertas e no Início."
          ligado={preferencias.alertasLigados}
          onAlternar={(valor) => atualizar('alertasLigados', valor)}
        />
        {preferencias.alertasLigados && (
          <OptionGroup
            nome="nivel-minimo"
            titulo="Avisar a partir do risco"
            opcoes={opcoesNivel}
            valor={preferencias.nivelMinimo}
            onChange={(valor) => atualizar('nivelMinimo', valor)}
          />
        )}
      </section>

      <section aria-labelledby="titulo-leitura" className="bg-areia rounded-2xl p-5">
        <h2 id="titulo-leitura" className="text-lg font-bold mb-3">
          Leitura
        </h2>
        <OptionGroup
          nome="tamanho-fonte"
          titulo="Tamanho da letra"
          opcoes={opcoesFonte}
          valor={preferencias.tamanhoFonte}
          onChange={(valor) => atualizar('tamanhoFonte', valor)}
        />
      </section>

      <p className="text-sm text-marinho/80">
        Suas escolhas ficam salvas só neste aparelho. A Solara não pede login e não guarda sua localização.
      </p>

      <p>
        <Button para="/painel" variante="texto" tamanho="pequeno">
          Área do administrador
        </Button>
      </p>
    </div>
  )
}
