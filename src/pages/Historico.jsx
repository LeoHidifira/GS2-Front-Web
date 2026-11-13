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
    <div className="space-y-6 max-w-5xl">
      <Button para="/" variante="secundario" tamanho="pequeno">
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
            <p className="sobrescrito text-tinta/60">Histórico</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-light leading-[1.05] tracking-tight">
              Últimos 7 dias em <em className="text-terra">{regiao.nome}</em>
            </h1>
          </div>

          {!loading && !error && dias.length > 0 && (
            <div className="flex items-center gap-4 rounded-[1.75rem] bg-salvia/60 px-5 py-4">
              <span className="grid place-items-center shrink-0 w-12 h-12 rounded-2xl bg-white/60 text-musgo">
                <Icone nome={diasAltos === 0 ? 'folha' : 'sol'} className="w-6 h-6" />
              </span>
              <p className="text-lg font-semibold">
                {diasAltos === 0
                  ? 'Nenhum dia com risco ALTO nesta semana.'
                  : diasAltos === 1
                    ? '1 dia com risco ALTO ou EXTREMO nesta semana.'
                    : `${diasAltos} dias com risco ALTO ou EXTREMO nesta semana.`}
              </p>
            </div>
          )}

          {loading && <Loader texto="Buscando o histórico..." />}
          {error && <ErrorMessage mensagem={error} onTentarDeNovo={recarregar} />}
          {!loading && !error && dias.length === 0 && <EmptyState titulo="Ainda não há dados para esta região." />}
          {!loading && !error && dias.length > 0 && (
            <>
              <TemperatureChart titulo="Temperatura máxima de cada dia" dias={dadosGrafico} />
              <p className="text-sm text-tinta/65">
                O nível do dia vem da maior sensação térmica (temperatura e umidade). Dados: Open-Meteo.
              </p>
            </>
          )}
        </>
      )}
    </div>
  )
}
