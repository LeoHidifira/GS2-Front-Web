import { NIVEIS } from '../constants/riscos.js'

// Gráfico de barras com a máxima de cada dia. Dias Alto ou Extremo ficam em verde escuro e escritos (RF07).
// Cada barra é um item de lista com o texto completo, então leitores de tela leem tudo.
export default function TemperatureChart({ titulo, dias }) {
  const maior = Math.max(...dias.map((d) => d.valor), 1)
  const menor = Math.min(...dias.map((d) => d.valor), 0)
  const base = Math.max(menor - 5, 0)

  return (
    <figure className="vidro shadow-suave rounded-[2rem] p-5 md:p-8">
      <figcaption className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <span className="text-lg font-semibold">{titulo}</span>
        <span className="flex items-center gap-4 text-sm text-tinta/70" aria-hidden="true">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-salvia" /> Baixo ou Atenção
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-floresta" /> Alto ou Extremo
          </span>
        </span>
      </figcaption>
      <ol className="flex items-end gap-2 md:gap-4 h-64 md:h-80" aria-label={titulo}>
        {dias.map((dia) => {
          const altura = Math.max(((dia.valor - base) / (maior - base)) * 100, 8)
          const info = NIVEIS[dia.nivel]
          return (
            <li key={dia.chave} className="flex-1 h-full flex flex-col justify-end items-center gap-2 min-w-0">
              <span
                className={`text-xs md:text-sm font-semibold tabular-nums whitespace-nowrap ${
                  dia.destaque ? 'rounded-lg bg-floresta text-creme px-1.5 py-1 md:px-2' : ''
                }`}
              >
                {dia.valorFormatado}
              </span>
              <div
                className={`w-full max-w-14 rounded-xl md:rounded-2xl ${dia.destaque ? 'bg-floresta' : 'bg-salvia'}`}
                style={{ height: `${altura}%` }}
                aria-hidden="true"
              />
              <span className="sr-only">
                {dia.rotulo}: risco {info.rotulo}
              </span>
            </li>
          )
        })}
      </ol>
      <ol className="flex gap-2 md:gap-4 mt-3" aria-hidden="true">
        {dias.map((dia) => (
          <li key={dia.chave} className="flex-1 min-w-0 text-center">
            <span className="block text-xs leading-tight text-tinta/75">{dia.rotulo}</span>
            <span className={`block text-[0.7rem] mt-0.5 ${dia.destaque ? 'font-bold text-floresta-escuro' : 'text-tinta/55'}`}>
              {NIVEIS[dia.nivel].rotulo}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  )
}
