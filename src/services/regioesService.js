import { criarServicoCrud } from './api.js'

// Regiao { id, nome, bairro, latitude, longitude, ativo }
const crud = criarServicoCrud('regioes')

export const listarRegioes = crud.listar
export const buscarRegiao = crud.buscar
export const criarRegiao = crud.criar
export const atualizarRegiao = crud.atualizar
export const excluirRegiao = crud.excluir
