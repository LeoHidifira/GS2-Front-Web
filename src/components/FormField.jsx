// Campo de formulário com label, dica e mensagem de erro ligados ao input
export default function FormField({ id, rotulo, erro, dica, children }) {
  const idErro = `${id}-erro`
  const idDica = `${id}-dica`
  const descricao = [dica && idDica, erro && idErro].filter(Boolean).join(' ') || undefined

  return (
    <div>
      <label htmlFor={id} className="block font-semibold mb-1">
        {rotulo}
      </label>
      {children({
        id,
        'aria-invalid': erro ? true : undefined,
        'aria-describedby': descricao,
        className: `w-full bg-white border rounded-xl px-3 py-2 ${erro ? 'border-red-800' : 'border-marinho/30'}`,
      })}
      {dica && (
        <p id={idDica} className="text-sm text-marinho/75 mt-1">
          {dica}
        </p>
      )}
      {erro && (
        <p id={idErro} className="text-sm text-red-800 font-semibold mt-1">
          {erro}
        </p>
      )}
    </div>
  )
}
