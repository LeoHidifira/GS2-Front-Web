import { Link } from 'react-router'
import AlertBanner from '../components/AlertBanner.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Icone from '../components/Icone.jsx'
import Loader from '../components/Loader.jsx'
import RegionSelect from '../components/RegionSelect.jsx'
import RiskCard from '../components/RiskCard.jsx'
import TipsList from '../components/TipsList.jsx'
import useAlertaDaRegiao from '../hooks/useAlertaDaRegiao.js'
import useClima from '../hooks/useClima.js'
import useNivelDeRisco from '../hooks/useNivelDeRisco.js'
import usePreferencias from '../hooks/usePreferencias.jsx'
import useRegioes from '../hooks/useRegioes.js'
import { NIVEIS } from '../constants/riscos.js'
import { TELEFONE_SAMU } from '../constants/textos.js'
import { escolherRegiaoAtual } from '../utils/regioes.js'
import { formatarHora, formatarTemperatura } from '../utils/formatos.js'
import useTituloDaPagina from '../hooks/useTituloDaPagina.js'

// Atalho redondo, como os botões de ação de um app de serviço
function Atalho({ para, href, icone, rotulo }) {
  const classes = 'group flex flex-col items-center gap-2 text-sm font-medium text-center rounded-2xl'
  const conteudo = (
    <>
      <span className="grid place-items-center w-16 h-16 md:w-[4.5rem] md:h-[4.5rem] rounded-[1.4rem] vidro shadow-suave group-hover:bg-white transition-colors">
        <Icone nome={icone} className="w-6 h-6" />
      </span>
      {rotulo}
    </>
  )
  return (
    <li>
      {para ? (
        <Link to={para} className={classes}>
          {conteudo}
        </Link>
      ) : (
        <a href={href} className={classes}>
          {conteudo}
        </a>
      )}
    </li>
  )
}

// Tela inicial: risco de calor do bairro, sem precisar rolar a página (RF01, RF06)
export default function Inicio() {
  useTituloDaPagina('Início')
  const { regioesAtivas, loading: carregandoRegioes, error: erroRegioes, recarregar } = useRegioes()
  const { preferencias, atualizar } = usePreferencias()
  const regiao = escolherRegiaoAtual(regioesAtivas, preferencias.bairroAtualId)
  const { clima, loading: carregandoClima, error: erroClima, aviso, recarregar: recarregarClima } = useClima(regiao)
  const risco = useNivelDeRisco(clima?.atual.temperatura, clima?.atual.umidade)
  const alerta = useAlertaDaRegiao(regiao, clima, {
    ligado: preferencias.alertasLigados,
    nivelMinimo: preferencias.nivelMinimo,
  })

  if (carregandoRegioes) return <Loader />
  if (erroRegioes) return <ErrorMessage mensagem={erroRegioes} onTentarDeNovo={recarregar} />
  if (!regiao) {
    return <EmptyState titulo="Nenhum bairro cadastrado ainda." descricao="Os bairros aparecem aqui depois de cadastrados no painel." />
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <header>
        <p className="sobrescrito text-tinta/60">
          Calor agora <span aria-hidden="true">—</span> São Paulo
        </p>
        <h1 className="mt-3 text-4xl md:text-6xl font-light leading-[1.05] tracking-tight">Como está o calor em</h1>
        <div className="mt-1">
          <RegionSelect regioes={regioesAtivas} valor={regiao.id} onChange={(id) => atualizar('bairroAtualId', id)} />
        </div>
      </header>

      {alerta && (
        <AlertBanner compacto nivel={alerta.nivel} classeFundo={NIVEIS[alerta.nivel].classeFundo} titulo={alerta.titulo} />
      )}

      {aviso && (
        <p role="status" className="rounded-2xl bg-risco-atencao/70 px-5 py-3 text-sm font-semibold">
          {aviso}
        </p>
      )}

      {carregandoClima && !clima && <Loader texto="Buscando o clima..." />}
      {erroClima && <ErrorMessage mensagem={erroClima} onTentarDeNovo={recarregarClima} />}

      {clima && risco && (
        <div className="grid gap-6 lg:grid-cols-[7fr_5fr] lg:gap-8">
          <div className="space-y-6">
            <RiskCard
              temperatura={formatarTemperatura(clima.atual.temperatura)}
              sensacao={formatarTemperatura(risco.sensacao)}
              umidade={`${Math.round(clima.atual.umidade)}%`}
              rotuloNivel={risco.rotulo}
              classeFundo={risco.classeFundo}
              mensagem={risco.mensagem}
              atualizadoEm={formatarHora(clima.atual.horario)}
            />

            <nav aria-label="Atalhos">
              <ul className="grid grid-cols-4 gap-2">
                <Atalho para="/mapa" icone="mapa" rotulo="Refrescar" />
                <Atalho para={`/historico/${regiao.id}`} icone="grafico" rotulo="7 dias" />
                <Atalho para="/alertas" icone="alerta" rotulo="Alertas" />
                <Atalho href={`tel:${TELEFONE_SAMU}`} icone="telefone" rotulo={`SAMU ${TELEFONE_SAMU}`} />
              </ul>
            </nav>
          </div>

          <div className="space-y-6">
            <TipsList dicas={risco.dicas} />

            <Link
              to="/mapa"
              className="group flex items-center gap-4 rounded-[1.75rem] bg-salvia/60 hover:bg-salvia px-5 py-4 transition-colors"
            >
              <span className="grid place-items-center shrink-0 w-12 h-12 rounded-2xl bg-white/60 text-musgo">
                <Icone nome="folha" className="w-6 h-6" />
              </span>
              <span className="flex-1">
                <span className="block font-semibold">Sombra e água por perto</span>
                <span className="block text-sm text-tinta/75">Veja os pontos de apoio perto de {regiao.nome}.</span>
              </span>
              <Icone nome="abrir" className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
