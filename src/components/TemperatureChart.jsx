import { NIVEIS } from '../constants/riscos.js'

// Gráfico de barras com a máxima de cada dia. Dias Alto ou Extremo ficam destacados e escritos (RF07).
// Cada barra é um item de lista com o texto completo, então leitores de tela leem tudo.
export default function TemperatureChart({ titulo, dias }) {
  const maior = Math.max(...dias.map((d) => d.valor), 1)
  const menor = Math.min(...dias.map((d) => d.valor), 0)
  const base = Math.max(menor - 5, 0)

  return (
    <figure className="bg-white border border-areia rounded-2xl p-4">
      <figcaption className="font-bold mb-4">{titulo}</figcaption>
      <ol className="flex items-end gap-2 h-64" aria-label={titulo}>
        {dias.map((dia) => {
          const altura = Math.max(((dia.valor - base) / (maior - base)) * 100, 8)
          const info = NIVEIS[dia.nivel]
          return (
            <li key={dia.chave} className="flex-1 h-full flex flex-col justify-end items-center gap-1 min-w-0">
              <div className="flex-1 w-full flex flex-col justify-end items-center gap-1">
                <span className="font-bold text-sm">{dia.valorFormatado}</span>
                <div
                  className={`w-full rounded-t-lg border border-marinho/20 ${dia.destaque ? info.classeFundo : 'bg-areia'}`}
                  style={{ height: `${altura}%` }}
                  aria-hidden="true"
                />
              </div>
              <span className="text-xs text-center leading-tight">{dia.rotulo}</span>
              <span className={`text-[0.65rem] font-bold uppercase ${dia.destaque ? '' : 'text-marinho/70'}`}>
                {info.rotulo}
              </span>
            </li>
          )
        })}
      </ol>
    </figure>
  )
}
