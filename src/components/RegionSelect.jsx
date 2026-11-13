// Campo para escolher o bairro, com cara de título
export default function RegionSelect({ id = 'bairro', rotulo = 'Bairro', regioes, valor, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-marinho/75">
        {rotulo}
      </label>
      <select
        id={id}
        value={valor ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="font-titulo text-2xl md:text-3xl font-bold bg-transparent border-b-2 border-marinho/25 hover:border-marinho pr-8 py-0.5 rounded-none cursor-pointer max-w-full"
      >
        {regioes.map((regiao) => (
          <option key={regiao.id} value={regiao.id}>
            {regiao.nome}
          </option>
        ))}
      </select>
    </div>
  )
}
