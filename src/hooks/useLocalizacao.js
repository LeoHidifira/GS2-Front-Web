import { useCallback, useState } from 'react'

// Pega a localização do aparelho só quando a pessoa pede. A posição fica só na memória (nunca é salva).
export default function useLocalizacao() {
  const [posicao, setPosicao] = useState(null)
  const [buscando, setBuscando] = useState(false)
  const [erro, setErro] = useState(null)

  const pedirLocalizacao = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setErro('Este aparelho não informa a localização. Usamos o centro do bairro.')
      return
    }
    setBuscando(true)
    setErro(null)
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosicao({ latitude: coords.latitude, longitude: coords.longitude })
        setBuscando(false)
      },
      () => {
        setErro('Não deu para pegar sua localização. Usamos o centro do bairro.')
        setBuscando(false)
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 5 * 60 * 1000 },
    )
  }, [])

  const esquecerLocalizacao = useCallback(() => setPosicao(null), [])

  return { posicao, buscando, erro, pedirLocalizacao, esquecerLocalizacao }
}
