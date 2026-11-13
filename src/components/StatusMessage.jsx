// Mensagem de retorno após uma ação (salvou, excluiu, deu erro)
export default function StatusMessage({ mensagem }) {
  return (
    <div aria-live="polite">
      {mensagem && (
        <p
          className={`rounded-2xl px-5 py-3 font-semibold flex items-center gap-3 ${
            mensagem.tipo === 'erro' ? 'bg-red-50 text-red-900 border border-red-800/25' : 'bg-salvia/60 text-floresta-escuro'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${mensagem.tipo === 'erro' ? 'bg-red-800' : 'bg-floresta'}`}
            aria-hidden="true"
          />
          {mensagem.texto}
        </p>
      )}
    </div>
  )
}
