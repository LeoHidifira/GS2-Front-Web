import Icone from './Icone.jsx'

// Condição atual e nível de risco do bairro (RF01): cartão verde com a temperatura em destaque
export default function RiskCard({ temperatura, sensacao, umidade, rotuloNivel, classeFundo, mensagem, atualizadoEm }) {
  return (
    <section
      aria-labelledby="titulo-risco"
      className="relative overflow-hidden rounded-[2rem] bg-floresta text-creme p-6 md:p-8 shadow-suave"
    >
      {/* Círculos decorativos ao fundo */}
      <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 w-72 h-72 rounded-full border border-creme/10" />
      <span aria-hidden="true" className="pointer-events-none absolute -right-4 -top-8 w-48 h-48 rounded-full bg-musgo/40 blur-2xl" />

      <div className="relative flex items-center justify-between gap-3">
        <h2 id="titulo-risco" className="inline-flex items-center gap-2 text-creme/85 font-medium">
          <span className="grid place-items-center w-8 h-8 rounded-full bg-creme/10">
            <Icone nome="termometro" className="w-4 h-4" />
          </span>
          Calor agora
        </h2>
        <p className="text-sm text-creme/70">Atualizado às {atualizadoEm}</p>
      </div>

      <div className="relative mt-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <p className="font-titulo text-7xl md:text-8xl font-light leading-none tracking-tight tabular-nums">
          {temperatura}
          <span className="sr-only"> de temperatura</span>
        </p>
        <p className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-semibold text-tinta ${classeFundo}`}>
          <span className="w-2 h-2 rounded-full bg-tinta" aria-hidden="true" />
          Risco {rotuloNivel}
        </p>
      </div>

      <p className="relative mt-4 text-lg text-creme/90 max-w-md">{mensagem}</p>

      <dl className="relative mt-6 grid grid-cols-2 rounded-2xl bg-creme/10 divide-x divide-creme/15">
        <div className="px-4 py-3">
          <dt className="text-sm text-creme/70">Sensação</dt>
          <dd className="font-titulo text-2xl tabular-nums">{sensacao}</dd>
        </div>
        <div className="px-4 py-3">
          <dt className="text-sm text-creme/70">Umidade</dt>
          <dd className="font-titulo text-2xl tabular-nums">{umidade}</dd>
        </div>
      </dl>
    </section>
  )
}
