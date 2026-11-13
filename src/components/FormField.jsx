// Campo de formulário com label, dica e mensagem de erro ligados ao input
export default function FormField({ id, rotulo, erro, dica, children }) {
  const idErro = `${id}-erro`
  const idDica = `${id}-dica`
  const descricao = [dica && idDica, erro && idErro].filter(Boolean).join(' ') || undefined

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold mb-1.5">
        {rotulo}
      </label>
      {children({
        id,
        'aria-invalid': erro ? true : undefined,
        'aria-describedby': descricao,
        className: `w-full rounded-xl bg-creme/70 border px-4 py-2.5 transition-colors focus:bg-white ${
          erro ? 'border-red-800 border-2' : 'border-tinta/15 hover:border-tinta/35'
        }`,
      })}
      {dica && (
        <p id={idDica} className="text-sm text-tinta/65 mt-1">
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
