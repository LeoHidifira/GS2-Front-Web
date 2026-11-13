// Condição atual e nível de risco do bairro (RF01): temperatura em destaque e faixa de risco
export default function RiskCard({ temperatura, sensacao, umidade, rotuloNivel, classeFundo, mensagem, atualizadoEm }) {
  return (
    <section aria-labelledby="titulo-risco">
      <h2 id="titulo-risco" className="sr-only">
        Calor agora
      </h2>
      <div className="flex items-end justify-between gap-4 pb-4">
        <p className="font-titulo text-7xl md:text-8xl font-bold leading-none tracking-tight tabular-nums">
          {temperatura}
          <span className="sr-only"> de temperatura</span>
        </p>
        <dl className="text-right text-marinho/85 pb-1 leading-relaxed">
          <div>
            <dt className="inline">Sensação </dt>
            <dd className="inline font-semibold text-marinho">{sensacao}</dd>
          </div>
          <div>
            <dt className="inline">Umidade </dt>
            <dd className="inline font-semibold text-marinho">{umidade}</dd>
          </div>
          <div className="text-sm">
            <dt className="inline">Atualizado às </dt>
            <dd className="inline">{atualizadoEm}</dd>
          </div>
        </dl>
      </div>

      <div className={`-mx-4 md:mx-0 px-4 py-4 border-y-2 md:border-2 border-marinho/80 ${classeFundo}`}>
        <p className="font-titulo text-2xl font-bold">Risco {rotuloNivel}</p>
        <p className="mt-1 text-lg">{mensagem}</p>
      </div>
    </section>
  )
}
