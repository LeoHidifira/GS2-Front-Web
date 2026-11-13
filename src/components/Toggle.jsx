// Chave liga/desliga acessível. O estado também aparece escrito.
export default function Toggle({ id, rotulo, descricao, ligado, onAlternar }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <span id={`${id}-rotulo`} className="font-semibold block">
          {rotulo}
        </span>
        {descricao && (
          <span id={`${id}-descricao`} className="text-sm text-marinho/80">
            {descricao}
          </span>
        )}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={ligado}
        aria-labelledby={`${id}-rotulo`}
        aria-describedby={descricao ? `${id}-descricao` : undefined}
        onClick={() => onAlternar(!ligado)}
        className="shrink-0 flex items-center gap-2 font-semibold"
      >
        <span
          aria-hidden="true"
          className={`w-11 h-7 rounded-full p-1 transition-colors ${ligado ? 'bg-marinho' : 'bg-marinho/30'}`}
        >
          <span className={`block w-5 h-5 rounded-full bg-creme transition-transform ${ligado ? 'translate-x-5' : ''}`} />
        </span>
        <span className="w-20 text-left">{ligado ? 'Ligado' : 'Desligado'}</span>
      </button>
    </div>
  )
}
