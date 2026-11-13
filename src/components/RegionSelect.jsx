import Icone from './Icone.jsx'

// Campo para escolher o bairro, com cara de título em serifa
export default function RegionSelect({ id = 'bairro', rotulo = 'Bairro', regioes, valor, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {rotulo}
      </label>
      <div className="relative inline-flex max-w-full items-center">
        <select
          id={id}
          value={valor ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none font-titulo italic text-terra text-4xl md:text-6xl font-light bg-transparent border-b-2 border-terra/30 hover:border-terra pr-12 pb-1 rounded-none cursor-pointer max-w-full truncate"
        >
          {regioes.map((regiao) => (
            <option key={regiao.id} value={regiao.id} className="font-sans not-italic text-base text-tinta">
              {regiao.nome}
            </option>
          ))}
        </select>
        <Icone nome="abrir" className="pointer-events-none absolute right-1 w-6 h-6 md:w-8 md:h-8 text-terra rotate-90" />
      </div>
    </div>
  )
}
