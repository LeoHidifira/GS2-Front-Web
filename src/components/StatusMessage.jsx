// Mensagem de retorno após uma ação (salvou, excluiu, deu erro)
export default function StatusMessage({ mensagem }) {
  return (
    <div aria-live="polite" className="min-h-0">
      {mensagem && (
        <p
          className={`rounded-xl px-4 py-3 font-semibold ${
            mensagem.tipo === 'erro' ? 'bg-risco-extremo/60' : 'bg-risco-baixo'
          }`}
        >
          {mensagem.texto}
        </p>
      )}
    </div>
  )
}
