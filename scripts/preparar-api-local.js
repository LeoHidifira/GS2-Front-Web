// Cria o db.json do json-server a partir dos dados de exemplo, se ele ainda não existir.
// O db.json não é versionado porque o json-server grava nele a cada alteração.
import { copyFileSync, existsSync } from 'node:fs'

if (!existsSync('db.json')) {
  copyFileSync('dados-exemplo.json', 'db.json')
  console.log('db.json criado a partir de dados-exemplo.json')
}
