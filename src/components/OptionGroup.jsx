// Grupo de opções de escolha única (botões de rádio estilizados)
export default function OptionGroup({ nome, titulo, opcoes, valor, onChange }) {
  return (
    <fieldset>
      <legend className="font-semibold mb-2">{titulo}</legend>
      <div className="flex flex-wrap gap-2">
        {opcoes.map((opcao) => (
          <label
            key={opcao.valor}
            className={`cursor-pointer rounded-full px-4 py-2 font-semibold border has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-sol-escuro ${
              valor === opcao.valor ? 'bg-marinho text-creme border-marinho' : 'bg-white border-marinho/30'
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
