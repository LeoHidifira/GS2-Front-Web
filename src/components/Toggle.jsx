// Chave liga/desliga acessível. O estado também aparece escrito.
export default function Toggle({ id, rotulo, descricao, ligado, onAlternar }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <span id={`${id}-rotulo`} className="font-semibold block">
          {rotulo}
        </span>
        {descricao && (
          <span id={`${id}-descricao`} className="text-sm text-tinta/70">
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
        className="shrink-0 flex items-center gap-2 font-medium rounded-full"
      >
        <span className="w-20 text-right text-sm">{ligado ? 'Ligado' : 'Desligado'}</span>
        <span aria-hidden="true" className={`w-12 h-7 rounded-full p-1 transition-colors ${ligado ? 'bg-floresta' : 'bg-tinta/25'}`}>
          <span className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${ligado ? 'translate-x-5' : ''}`} />
        </span>
      </button>
    </div>
  )
}
