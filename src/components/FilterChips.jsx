import Icone from './Icone.jsx'

// Grupo de botões de filtro. Cada botão informa se está ligado (aria-pressed).
export default function FilterChips({ titulo, opcoes, estaAtivo, onSelecionar }) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold mb-2">{titulo}</legend>
      <div className="flex flex-wrap gap-2">
        {opcoes.map((opcao) => {
          const ativo = estaAtivo(opcao.valor)
          return (
            <button
              key={String(opcao.valor)}
              type="button"
              aria-pressed={ativo}
              onClick={() => onSelecionar(opcao.valor)}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold border transition-colors ${
                ativo ? 'bg-marinho text-creme border-marinho' : 'bg-white text-marinho border-marinho/25 hover:border-marinho'
              }`}
            >
              {opcao.icone && <Icone nome={opcao.icone} className="w-4 h-4" />}
              {opcao.rotulo}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
