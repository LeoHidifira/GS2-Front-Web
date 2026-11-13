import { useEffect } from 'react'

// Muda o título da aba a cada tela, o que ajuda quem usa leitor de tela a saber onde está
export default function useTituloDaPagina(titulo) {
  useEffect(() => {
    document.title = titulo ? `${titulo} · Solara` : 'Solara'
  }, [titulo])
}
