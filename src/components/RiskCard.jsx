import RiskBadge from './RiskBadge.jsx'

// Cartão principal com temperatura, sensação térmica e nível de risco (RF01)
export default function RiskCard({ bairro, temperatura, sensacao, umidade, nivel, classeFundo, mensagem, atualizadoEm }) {
  return (
    <section aria-labelledby="titulo-risco" className={`rounded-3xl p-5 border border-marinho/10 ${classeFundo}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Agora em</p>
          <h1 id="titulo-risco" className="text-2xl font-bold leading-tight">
            {bairro}
          </h1>
        </div>
        <RiskBadge nivel={nivel} tamanho="grande" />
      </div>

      <div className="mt-4 flex items-end gap-4">
        <p className="font-titulo text-6xl font-bold leading-none">
          {temperatura}
          <span className="sr-only"> de temperatura</span>
        </p>
        <dl className="pb-1">
          <div className="flex gap-1">
            <dt>Sensação:</dt>
            <dd className="font-bold">{sensacao}</dd>
          </div>
          <div className="flex gap-1">
            <dt>Umidade:</dt>
            <dd className="font-bold">{umidade}</dd>
          </div>
        </dl>
      </div>

      <p className="mt-4 text-lg font-semibold">{mensagem}</p>
      <p className="mt-2 text-sm">Atualizado às {atualizadoEm}</p>
    </section>
  )
}
