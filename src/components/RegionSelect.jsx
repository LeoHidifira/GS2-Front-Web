// Campo para escolher o bairro
export default function RegionSelect({ id = 'bairro', rotulo = 'Seu bairro', regioes, valor, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor={id} className="font-semibold shrink-0">
        {rotulo}
      </label>
      <select
        id={id}
        value={valor ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 min-w-0 bg-white border border-marinho/30 rounded-xl px-3 py-2"
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
