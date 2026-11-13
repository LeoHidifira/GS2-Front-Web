import Icone from './Icone.jsx'

// Grupo de botões de filtro. Cada botão informa se está ligado (aria-pressed).
export default function FilterChips({ titulo, opcoes, estaAtivo, onSelecionar }) {
  return (
    <fieldset>
      <legend className="sobrescrito text-tinta/60 mb-3">{titulo}</legend>
      <div className="flex flex-wrap gap-2">
        {opcoes.map((opcao) => {
          const ativo = estaAtivo(opcao.valor)
          return (
            <button
              key={String(opcao.valor)}
              type="button"
              aria-pressed={ativo}
              onClick={() => onSelecionar(opcao.valor)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
                ativo
                  ? 'bg-floresta text-creme border-floresta shadow-suave'
                  : 'bg-white/70 text-tinta border-tinta/10 hover:border-tinta/30 hover:bg-white'
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
