import { useEffect, useRef } from 'react'
import Button from './Button.jsx'

// Caixa de confirmação acessível, usada antes de excluir
export default function ConfirmDialog({ aberto, titulo, mensagem, textoConfirmar = 'Excluir', onConfirmar, onCancelar, ocupado }) {
  const botaoCancelar = useRef(null)

  useEffect(() => {
    if (!aberto) return
    const focoAnterior = document.activeElement
    botaoCancelar.current?.focus()

    function aoTeclar(evento) {
      if (evento.key === 'Escape') onCancelar()
    }
    document.addEventListener('keydown', aoTeclar)
    return () => {
      document.removeEventListener('keydown', aoTeclar)
      focoAnterior?.focus?.()
    }
  }, [aberto, onCancelar])

  if (!aberto) return null

  return (
    <div className="fixed inset-0 z-40 bg-floresta-escuro/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onCancelar}>
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirmacao-titulo"
        aria-describedby="confirmacao-mensagem"
        className="bg-creme rounded-[2rem] p-7 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="confirmacao-titulo" className="font-titulo text-2xl">
          {titulo}
        </h2>
        <p id="confirmacao-mensagem" className="mt-2 text-tinta/80">
          {mensagem}
        </p>
        <div className="mt-7 flex flex-wrap justify-end gap-3">
          <Button ref={botaoCancelar} variante="secundario" onClick={onCancelar} disabled={ocupado}>
            Cancelar
          </Button>
          <Button variante="perigo" onClick={onConfirmar} disabled={ocupado}>
            {ocupado ? 'Excluindo...' : textoConfirmar}
          </Button>
        </div>
      </div>
    </div>
  )
}
