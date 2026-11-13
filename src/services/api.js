import { ErroDeApi, requisitar } from './http.js'

// API de CRUD (MockAPI.io em produção, json-server no desenvolvimento).
// A URL base vem do .env (VITE_API_URL).
const URL_BASE = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '')

function urlDoRecurso(recurso, id) {
  if (!URL_BASE) {
    throw new ErroDeApi('A variável VITE_API_URL não foi configurada no arquivo .env.')
  }
  return id === undefined ? `${URL_BASE}/${recurso}` : `${URL_BASE}/${recurso}/${encodeURIComponent(id)}`
}

// Cria um serviço com as quatro operações de CRUD para um recurso
export function criarServicoCrud(recurso) {
  return {
    listar: () => requisitar(urlDoRecurso(recurso)),
    buscar: (id) => requisitar(urlDoRecurso(recurso, id)),
    criar: (dados) => requisitar(urlDoRecurso(recurso), { metodo: 'POST', corpo: dados }),
    atualizar: (id, dados) => requisitar(urlDoRecurso(recurso, id), { metodo: 'PUT', corpo: dados }),
    excluir: (id) => requisitar(urlDoRecurso(recurso, id), { metodo: 'DELETE' }),
  }
}
