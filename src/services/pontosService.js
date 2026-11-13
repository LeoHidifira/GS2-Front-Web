import { criarServicoCrud } from './api.js'

// PontoDeApoio { id, nome, endereco, regiaoId, latitude, longitude, horario,
//                recursos: ["agua","sombra","banheiro"],
//                situacao: "rascunho" | "publicado" | "a_confirmar",
//                avisosFechado: [datas ISO] }
// Os avisos de "fechado" ficam dentro do ponto porque o plano grátis da MockAPI
// permite poucos recursos por projeto.
const crud = criarServicoCrud('pontos')

export const listarPontos = crud.listar
export const buscarPonto = crud.buscar
export const criarPonto = crud.criar
export const atualizarPonto = crud.atualizar
export const excluirPonto = crud.excluir
