// Orientações de proteção para o nível de risco (RF06)
export default function TipsList({ titulo = 'Como se proteger', dicas }) {
  return (
    <section aria-labelledby="titulo-dicas" className="border-t border-marinho/15 pt-4">
      <h2 id="titulo-dicas" className="font-semibold">
        {titulo}
      </h2>
      <ul className="mt-2 divide-y divide-marinho/10">
        {dicas.map((dica) => (
          <li key={dica} className="py-2.5 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[1.15rem] before:w-2 before:h-0.5 before:bg-sol-escuro">
            {dica}
          </li>
        ))}
      </ul>
    </section>
  )
}
