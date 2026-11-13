// Grupo de opções de escolha única (rádios em formato de seletor segmentado)
export default function OptionGroup({ nome, titulo, opcoes, valor, onChange }) {
  return (
    <fieldset>
      <legend className="font-semibold mb-2">{titulo}</legend>
      <div className="inline-flex flex-wrap border border-marinho/30 rounded-md overflow-hidden">
        {opcoes.map((opcao, i) => (
          <label
            key={opcao.valor}
            className={`cursor-pointer px-4 py-2 font-semibold has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-sol-escuro has-[:focus-visible]:-outline-offset-2 ${
              i > 0 ? 'border-l border-marinho/30' : ''
            } ${valor === opcao.valor ? 'bg-marinho text-creme' : 'bg-white hover:bg-areia'}`}
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
