import { useParams } from 'react-router'
import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Icone from '../components/Icone.jsx'
import Loader from '../components/Loader.jsx'
import TemperatureChart from '../components/TemperatureChart.jsx'
import useHistoricoClima from '../hooks/useHistoricoClima.js'
import useRegioes from '../hooks/useRegioes.js'
import { formatarDia, formatarTemperatura } from '../utils/formatos.js'
import useTituloDaPagina from '../hooks/useTituloDaPagina.js'

// Histórico de temperatura dos últimos 7 dias de uma região (RF07)
export default function Historico() {
  const { regiaoId } = useParams()
  const { regioes, loading: carregandoRegioes, error: erroRegioes, recarregar: recarregarRegioes } = useRegioes()
  const regiao = regioes.find((r) => r.id === regiaoId)
  const { dias, loading, error, recarregar } = useHistoricoClima(regiao)
  useTituloDaPagina(regiao ? `Histórico de ${regiao.nome}` : 'Histórico')

  const diasAltos = dias.filter((d) => d.destaque).length
  const dadosGrafico = dias.map((dia) => ({
    chave: dia.dia,
    valor: dia.maxima,
    valorFormatado: formatarTemperatura(dia.maxima),
    rotulo: formatarDia(dia.dia),
    nivel: dia.nivel,
    destaque: dia.destaque,
  }))

  return (
    <div className="space-y-5">
      <Button para="/" variante="texto" tamanho="pequeno" className="-ml-3">
        <Icone nome="voltar" className="w-5 h-5" />
        Voltar ao início
      </Button>

      {carregandoRegioes && <Loader texto="Carregando região..." />}
      {erroRegioes && <ErrorMessage mensagem={erroRegioes} onTentarDeNovo={recarregarRegioes} />}
      {!carregandoRegioes && !erroRegioes && !regiao && (
        <EmptyState titulo="Não encontramos essa região." descricao="Escolha um bairro na tela inicial." />
      )}

      {regiao && (
        <>
          <div>
            <h1 className="text-3xl font-bold">Calor em {regiao.nome}</h1>
            <p className="mt-1">Temperatura máxima dos últimos 7 dias.</p>
          </div>

          {loading && <Loader texto="Buscando o histórico..." />}
          {error && <ErrorMessage mensagem={error} onTentarDeNovo={recarregar} />}
          {!loading && !error && dias.length === 0 && <EmptyState titulo="Ainda não há dados para esta região." />}
          {!loading && !error && dias.length > 0 && (
            <>
              <p className="bg-areia rounded-xl px-4 py-3 font-semibold">
                {diasAltos === 0
                  ? 'Nenhum dia com risco ALTO nesta semana.'
                  : diasAltos === 1
                    ? '1 dia com risco ALTO ou EXTREMO nesta semana.'
                    : `${diasAltos} dias com risco ALTO ou EXTREMO nesta semana.`}
              </p>
              <TemperatureChart titulo={`Máxima por dia em ${regiao.nome}`} dias={dadosGrafico} />
              <p className="text-sm text-marinho/80">
                O nível de cada dia usa a maior sensação térmica do dia (temperatura + umidade). Dados: Open-Meteo.
              </p>
            </>
          )}
        </>
      )}
    </div>
  )
}
