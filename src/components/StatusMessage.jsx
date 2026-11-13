// Mensagem de retorno após uma ação (salvou, excluiu, deu erro)
export default function StatusMessage({ mensagem }) {
  return (
    <div aria-live="polite">
      {mensagem && (
        <p
          className={`border-l-4 bg-white px-4 py-3 font-semibold ${
            mensagem.tipo === 'erro' ? 'border-red-800' : 'border-green-700'
          }`}
        >
          {mensagem.texto}
        </p>
      )}
    </div>
  )
}
