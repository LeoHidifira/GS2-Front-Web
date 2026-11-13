import AlertBanner from '../components/AlertBanner.jsx'
import Button from '../components/Button.jsx'
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
    <div className="space-y-5">
      <h1 className="sr-only">Calor no seu bairro</h1>
      <RegionSelect regioes={regioesAtivas} valor={regiao.id} onChange={(id) => atualizar('bairroAtualId', id)} />

      {alerta && (
        <AlertBanner compacto nivel={alerta.nivel} classeFundo={NIVEIS[alerta.nivel].classeFundo} titulo={alerta.titulo} />
      )}

      {aviso && (
        <p role="status" className="border-l-4 border-amber-500 bg-white px-4 py-2 text-sm font-semibold">
          {aviso}
        </p>
      )}

      {carregandoClima && !clima && <Loader texto="Buscando o clima..." />}
      {erroClima && <ErrorMessage mensagem={erroClima} onTentarDeNovo={recarregarClima} />}

      {clima && risco && (
        <div className="grid gap-6 md:grid-cols-[3fr_2fr] md:gap-10">
          <div className="space-y-5">
            <RiskCard
              temperatura={formatarTemperatura(clima.atual.temperatura)}
              sensacao={formatarTemperatura(risco.sensacao)}
              umidade={`${Math.round(clima.atual.umidade)}%`}
              rotuloNivel={risco.rotulo}
              classeFundo={risco.classeFundo}
              mensagem={risco.mensagem}
              atualizadoEm={formatarHora(clima.atual.horario)}
            />
            <Button para="/mapa" tamanho="grande" largura>
              Onde me refrescar
              <Icone nome="rota" />
            </Button>
          </div>

          <div className="space-y-5">
            <TipsList dicas={risco.dicas} />
            <nav aria-label="Mais informações" className="border-t border-marinho/15 pt-4 flex flex-col items-start gap-1">
              <Button para={`/historico/${regiao.id}`} variante="texto">
                Ver os últimos 7 dias em {regiao.nome}
              </Button>
              <Button href={`tel:${TELEFONE_SAMU}`} variante="texto">
                Passou mal? Ligue {TELEFONE_SAMU} (SAMU)
              </Button>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
