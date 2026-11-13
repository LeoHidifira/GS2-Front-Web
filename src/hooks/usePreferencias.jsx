import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import * as storageService from '../services/storageService.js'

// Preferências do cidadão, salvas só neste aparelho (sem login). A localização nunca é salva.
const PADRAO = {
  bairroAtualId: null,
  bairrosSeguidos: [],
  alertasLigados: true,
  nivelMinimo: 'alto',
  tamanhoFonte: 'normal',
}

const PreferenciasContext = createContext(null)

export function PreferenciasProvider({ children }) {
  const [preferencias, setPreferencias] = useState(() => ({
    ...PADRAO,
    ...storageService.ler('preferencias', {}),
  }))

  useEffect(() => {
    storageService.salvar('preferencias', preferencias)
  }, [preferencias])

  // Aplica o tamanho da letra escolhido em todo o app
  useEffect(() => {
    document.documentElement.dataset.fonte = preferencias.tamanhoFonte
  }, [preferencias.tamanhoFonte])

  const atualizar = useCallback((campo, valor) => {
    setPreferencias((atual) => ({ ...atual, [campo]: valor }))
  }, [])

  return <PreferenciasContext.Provider value={{ preferencias, atualizar }}>{children}</PreferenciasContext.Provider>
}

export default function usePreferencias() {
  const contexto = useContext(PreferenciasContext)
  if (!contexto) throw new Error('usePreferencias precisa estar dentro de PreferenciasProvider')
  return contexto
}
