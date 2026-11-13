import * as storageService from './storageService.js'

// Guarda neste aparelho o último alerta emitido por região, para aplicar a regra das 3 horas (RN03)
export function lerUltimoAlerta(regiaoId) {
  return storageService.ler(`alerta:${regiaoId}`)
}

export function salvarUltimoAlerta(regiaoId, alerta) {
  storageService.salvar(`alerta:${regiaoId}`, { nivel: alerta.nivel, em: alerta.emitidoEm })
}
