import Icone from './Icone.jsx'

const icones = ['agua', 'sombra', 'sol']

// Orientações de proteção para o nível de risco (RF06), em lista com ícones
export default function TipsList({ titulo = 'Como se proteger', dicas }) {
  return (
    <section aria-labelledby="titulo-dicas" className="vidro shadow-suave rounded-[1.75rem] p-5 md:p-6">
      <h2 id="titulo-dicas" className="text-lg font-semibold">
        {titulo}
      </h2>
      <ul className="mt-3 divide-y divide-tinta/[0.07]">
        {dicas.map((dica, i) => (
          <li key={dica} className="flex items-center gap-4 py-3">
            <span className="grid place-items-center shrink-0 w-11 h-11 rounded-2xl bg-floresta text-creme">
              <Icone nome={icones[i % icones.length]} className="w-5 h-5" />
            </span>
            <span>{dica}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
