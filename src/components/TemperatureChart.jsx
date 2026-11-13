import { NIVEIS } from '../constants/riscos.js'

// Gráfico de barras com a máxima de cada dia. Dias Alto ou Extremo ficam destacados e escritos (RF07).
// Cada barra é um item de lista com o texto completo, então leitores de tela leem tudo.
export default function TemperatureChart({ titulo, dias }) {
  const maior = Math.max(...dias.map((d) => d.valor), 1)
  const menor = Math.min(...dias.map((d) => d.valor), 0)
  const base = Math.max(menor - 5, 0)

  return (
    <figure>
      <figcaption className="font-semibold mb-4">{titulo}</figcaption>
      <ol className="flex items-end gap-1.5 md:gap-3 h-64 md:h-80 border-b-2 border-marinho" aria-label={titulo}>
        {dias.map((dia) => {
          const altura = Math.max(((dia.valor - base) / (maior - base)) * 100, 8)
          const info = NIVEIS[dia.nivel]
          return (
            <li key={dia.chave} className="flex-1 h-full flex flex-col justify-end items-center gap-1 min-w-0">
              <span className="font-semibold text-sm tabular-nums">{dia.valorFormatado}</span>
              <div
                className={`w-full ${dia.destaque ? `${info.classeFundo} border-2 border-b-0 border-marinho` : 'bg-marinho/15'}`}
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
      <ol className="flex gap-1.5 md:gap-3 mt-2" aria-hidden="true">
        {dias.map((dia) => (
          <li key={dia.chave} className="flex-1 min-w-0 text-center">
            <span className="block text-xs leading-tight">{dia.rotulo}</span>
            <span className={`block text-[0.7rem] mt-0.5 ${dia.destaque ? 'font-bold' : 'text-marinho/60'}`}>
              {NIVEIS[dia.nivel].rotulo}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  )
}
