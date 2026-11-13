// Grupo de opções de escolha única (rádios em formato de seletor segmentado em pílula)
export default function OptionGroup({ nome, titulo, opcoes, valor, onChange }) {
  return (
    <fieldset>
      <legend className="font-semibold mb-2">{titulo}</legend>
      <div className="inline-flex flex-wrap gap-1 rounded-full bg-nevoa p-1">
        {opcoes.map((opcao) => (
          <label
            key={opcao.valor}
            className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-terra ${
              valor === opcao.valor ? 'bg-floresta text-creme shadow-suave' : 'text-tinta/75 hover:bg-white/80 hover:text-tinta'
            }`}
          >
            <input
              type="radio"
              name={nome}
              value={opcao.valor}
              checked={valor === opcao.valor}
              onChange={() => onChange(opcao.valor)}
              className="sr-only"
            />
            {opcao.rotulo}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
