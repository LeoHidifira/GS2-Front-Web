import EmptyState from '../components/EmptyState.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Icone from '../components/Icone.jsx'
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

// Título de cada cartão, com ícone
function TituloCartao({ id, icone, children }) {
  return (
    <h2 id={id} className="flex items-center gap-3 text-lg font-semibold">
      <span className="grid place-items-center w-10 h-10 rounded-2xl bg-floresta text-creme">
        <Icone nome={icone} className="w-5 h-5" />
      </span>
      {children}
    </h2>
  )
}

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
      <p className="sobrescrito text-tinta/60">Preferências</p>
      <h1 className="mt-3 text-4xl md:text-6xl font-light leading-[1.05] tracking-tight">
        Meus <em className="text-terra">bairros</em>
      </h1>
      <p className="mt-3 text-lg text-tinta/75">Onde você mora, trabalha ou passa o dia.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8 lg:items-start">
        <section aria-labelledby="titulo-bairros" className="vidro shadow-suave rounded-[2rem] p-5 md:p-7">
          <TituloCartao id="titulo-bairros" icone="bairros">
            Bairros acompanhados
          </TituloCartao>
          <div className="mt-4">
            {loading && <Loader />}
            {error && <ErrorMessage mensagem={error} onTentarDeNovo={recarregar} />}
            {!loading && !error && regioesAtivas.length === 0 && <EmptyState titulo="Nenhum bairro disponível ainda." />}
            {!loading && !error && regioesAtivas.length > 0 && (
              <ul className="space-y-2">
                {regioesAtivas.map((regiao) => {
                  const seguido = preferencias.bairrosSeguidos.includes(regiao.id)
                  return (
                    <li key={regiao.id}>
                      <label
                        className={`flex items-center gap-3 rounded-2xl px-4 py-3 cursor-pointer border transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-terra ${
                          seguido ? 'bg-salvia/50 border-salvia' : 'bg-white/50 border-tinta/[0.07] hover:bg-white'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="w-5 h-5 accent-floresta"
                          checked={seguido}
                          onChange={() => alternarBairro(regiao.id)}
                        />
                        <span className="font-semibold">{regiao.nome}</span>
                        {regiao.bairro !== regiao.nome && <span className="text-sm text-tinta/65">{regiao.bairro}</span>}
                      </label>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </section>

        <div className="space-y-6">
          <section aria-labelledby="titulo-alertas" className="vidro shadow-suave rounded-[2rem] p-5 md:p-7 space-y-5">
            <TituloCartao id="titulo-alertas" icone="alerta">
              Alertas
            </TituloCartao>
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

          <section aria-labelledby="titulo-leitura" className="vidro shadow-suave rounded-[2rem] p-5 md:p-7 space-y-5">
            <TituloCartao id="titulo-leitura" icone="letra">
              Leitura
            </TituloCartao>
            <OptionGroup
              nome="tamanho-fonte"
              titulo="Tamanho da letra"
              opcoes={opcoesFonte}
              valor={preferencias.tamanhoFonte}
              onChange={(valor) => atualizar('tamanhoFonte', valor)}
            />
          </section>

          <p className="flex items-start gap-3 rounded-[1.75rem] bg-salvia/50 px-5 py-4 text-sm">
            <Icone nome="folha" className="w-5 h-5 shrink-0 text-musgo" />
            Suas escolhas ficam só neste aparelho. A Solara não pede login e não guarda sua localização.
          </p>
        </div>
      </div>
    </div>
  )
}
