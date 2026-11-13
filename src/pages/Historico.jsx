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
    <div className="space-y-5 max-w-4xl">
      <Button para="/" variante="texto" tamanho="pequeno">
        <Icone nome="voltar" className="w-4 h-4" />
        Início
      </Button>

      {carregandoRegioes && <Loader />}
      {erroRegioes && <ErrorMessage mensagem={erroRegioes} onTentarDeNovo={recarregarRegioes} />}
      {!carregandoRegioes && !erroRegioes && !regiao && (
        <EmptyState titulo="Não encontramos essa região." descricao="Escolha um bairro na tela inicial." />
      )}

      {regiao && (
        <>
          <div>
            <h1 className="font-titulo text-3xl md:text-4xl font-bold">Últimos 7 dias em {regiao.nome}</h1>
            {!loading && !error && dias.length > 0 && (
              <p className="mt-1 text-lg">
                {diasAltos === 0
                  ? 'Nenhum dia com risco ALTO nesta semana.'
                  : diasAltos === 1
                    ? '1 dia com risco ALTO ou EXTREMO nesta semana.'
                    : `${diasAltos} dias com risco ALTO ou EXTREMO nesta semana.`}
              </p>
            )}
          </div>

          {loading && <Loader texto="Buscando o histórico..." />}
          {error && <ErrorMessage mensagem={error} onTentarDeNovo={recarregar} />}
          {!loading && !error && dias.length === 0 && <EmptyState titulo="Ainda não há dados para esta região." />}
          {!loading && !error && dias.length > 0 && (
            <>
              <TemperatureChart titulo="Temperatura máxima de cada dia" dias={dadosGrafico} />
              <p className="text-sm text-marinho/75">
                O nível do dia vem da maior sensação térmica (temperatura e umidade). Dados: Open-Meteo.
              </p>
            </>
          )}
        </>
      )}
    </div>
  )
}
