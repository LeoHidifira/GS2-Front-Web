import EmptyState from '../components/EmptyState.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loader from '../components/Loader.jsx'
import OptionGroup from '../components/OptionGroup.jsx'
import Toggle from '../components/Toggle.jsx'
import { NIVEIS, NIVEIS_DE_ALERTA } from '../constants/riscos.js'
import usePreferencias from '../hooks/usePreferencias.jsx'
import useRegioes from '../hooks/useRegioes.js'
import useTituloDaPagina from '../hooks/useTituloDaPagina.js'

const opcoesNivel = NIVEIS_DE_ALERTA.map((id) => ({ valor: id, rotulo: `${NIVEIS[id].rotulo} ou mais` }))
const opcoesFonte = [
  { valor: 'normal', rotulo: 'Normal' },
  { valor: 'grande', rotulo: 'Grande' },
  { valor: 'muito-grande', rotulo: 'Muito grande' },
]

// Bairros acompanhados, alertas, nível mínimo e tamanho da letra (RF05). Tudo fica só neste aparelho.
export default function MeusBairros() {
  useTituloDaPagina('Meus bairros')
  const { preferencias, atualizar } = usePreferencias()
  const { regioesAtivas, loading, error, recarregar } = useRegioes()

  function alternarBairro(id) {
    const seguidos = preferencias.bairrosSeguidos
    atualizar('bairrosSeguidos', seguidos.includes(id) ? seguidos.filter((b) => b !== id) : [...seguidos, id])
  }

  return (
    <div>
      <h1 className="font-titulo text-3xl md:text-4xl font-bold">Meus bairros</h1>
      <p className="mt-1 text-marinho/80">Onde você mora, trabalha ou passa o dia.</p>

      <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">
        <section aria-labelledby="titulo-bairros">
          <h2 id="titulo-bairros" className="font-semibold pb-2 border-b-2 border-marinho">
            Bairros acompanhados
          </h2>
          {loading && <Loader />}
          {error && <ErrorMessage mensagem={error} onTentarDeNovo={recarregar} />}
          {!loading && !error && regioesAtivas.length === 0 && <EmptyState titulo="Nenhum bairro disponível ainda." />}
          {!loading && !error && regioesAtivas.length > 0 && (
            <ul className="divide-y divide-marinho/15">
              {regioesAtivas.map((regiao) => (
                <li key={regiao.id}>
                  <label className="flex items-center gap-3 py-3 cursor-pointer hover:bg-white -mx-2 px-2">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-marinho"
                      checked={preferencias.bairrosSeguidos.includes(regiao.id)}
                      onChange={() => alternarBairro(regiao.id)}
                    />
                    <span className="font-semibold">{regiao.nome}</span>
                    {regiao.bairro !== regiao.nome && <span className="text-sm text-marinho/70">{regiao.bairro}</span>}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="space-y-8">
          <section aria-labelledby="titulo-alertas" className="space-y-5">
            <h2 id="titulo-alertas" className="font-semibold pb-2 border-b-2 border-marinho">
              Alertas
            </h2>
            <Toggle
              id="alertas-ligados"
              rotulo="Receber alertas de calor"
              descricao="Aparecem no Início e na tela Alertas."
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

          <section aria-labelledby="titulo-leitura">
            <h2 id="titulo-leitura" className="font-semibold pb-2 border-b-2 border-marinho mb-4">
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

          <p className="text-sm text-marinho/75 border-t border-marinho/15 pt-4">
            Suas escolhas ficam só neste aparelho. A Solara não pede login e não guarda sua localização.
          </p>
        </div>
      </div>
    </div>
  )
}
