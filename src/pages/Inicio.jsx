import AlertBanner from '../components/AlertBanner.jsx'
import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
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

  if (carregandoRegioes) return <Loader texto="Carregando seu bairro..." />
  if (erroRegioes) return <ErrorMessage mensagem={erroRegioes} onTentarDeNovo={recarregar} />
  if (!regiao) {
    return <EmptyState titulo="Nenhum bairro cadastrado ainda." descricao="Os bairros aparecem aqui assim que forem cadastrados no painel." />
  }

  return (
    <div className="space-y-4">
      <RegionSelect regioes={regioesAtivas} valor={regiao.id} onChange={(id) => atualizar('bairroAtualId', id)} />

      {alerta && (
        <AlertBanner
          compacto
          nivel={alerta.nivel}
          classeFundo={NIVEIS[alerta.nivel].classeFundo}
          titulo={alerta.titulo}
          ate={alerta.ate}
        />
      )}

      {aviso && (
        <p role="status" className="bg-areia rounded-xl px-4 py-2 text-sm font-semibold">
          {aviso}
        </p>
      )}

      {carregandoClima && !clima && <Loader texto="Buscando o clima agora..." />}
      {erroClima && <ErrorMessage mensagem={erroClima} onTentarDeNovo={recarregarClima} />}

      {clima && risco && (
        <>
          <RiskCard
            bairro={regiao.nome}
            temperatura={formatarTemperatura(clima.atual.temperatura)}
            sensacao={formatarTemperatura(risco.sensacao)}
            umidade={`${Math.round(clima.atual.umidade)}%`}
            nivel={risco.nivel}
            classeFundo={risco.classeFundo}
            mensagem={risco.mensagem}
            atualizadoEm={formatarHora(clima.atual.horario)}
          />
          <Button para="/mapa" variante="primario" tamanho="grande" largura>
            Onde me refrescar
          </Button>
          <TipsList dicas={risco.dicas} />
          <p className="text-center">
            <Button para={`/historico/${regiao.id}`} variante="texto">
              Ver o calor dos últimos 7 dias
            </Button>
          </p>
        </>
      )}
    </div>
  )
}
