// Orientações de proteção para o nível de risco (RF06)
export default function TipsList({ titulo = 'Como se proteger', dicas }) {
  return (
    <section aria-labelledby="titulo-dicas" className="bg-areia rounded-2xl p-5">
      <h2 id="titulo-dicas" className="text-lg font-bold">
        {titulo}
      </h2>
      <ol className="mt-3 space-y-2">
        {dicas.map((dica, i) => (
          <li key={dica} className="flex gap-3">
            <span
              className="shrink-0 w-7 h-7 rounded-full bg-marinho text-creme flex items-center justify-center text-sm font-bold"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <span className="pt-0.5">{dica}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
