import { useState } from 'react'
import Button from './Button.jsx'
import FormField from './FormField.jsx'

const VAZIO = { nome: '', bairro: '', latitude: '', longitude: '', ativo: true }

// Formulário de região. A validação vem da página (regra de negócio fica fora do componente).
export default function RegionForm({ valoresIniciais, validar, onSalvar, onCancelar, salvando }) {
  const [valores, setValores] = useState({ ...VAZIO, ...valoresIniciais })
  const [erros, setErros] = useState({})
  const editando = Boolean(valoresIniciais?.id)

  function alterar(campo, valor) {
    setValores((atual) => ({ ...atual, [campo]: valor }))
    setErros((atual) => ({ ...atual, [campo]: undefined }))
  }

  function enviar(evento) {
    evento.preventDefault()
    const novosErros = validar(valores)
    setErros(novosErros)
    if (Object.keys(novosErros).length === 0) onSalvar(valores)
  }

  return (
    <form onSubmit={enviar} noValidate className="bg-areia rounded-2xl p-5 space-y-4">
      <h2 className="text-xl font-bold">{editando ? 'Editar região' : 'Nova região'}</h2>

      <FormField id="regiao-nome" rotulo="Nome da região" erro={erros.nome}>
        {(props) => <input {...props} type="text" value={valores.nome} onChange={(e) => alterar('nome', e.target.value)} />}
      </FormField>

      <FormField id="regiao-bairro" rotulo="Bairro" erro={erros.bairro}>
        {(props) => <input {...props} type="text" value={valores.bairro} onChange={(e) => alterar('bairro', e.target.value)} />}
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField id="regiao-latitude" rotulo="Latitude" erro={erros.latitude} dica="Exemplo: -23.6719">
          {(props) => (
            <input {...props} type="text" inputMode="decimal" value={valores.latitude} onChange={(e) => alterar('latitude', e.target.value)} />
          )}
        </FormField>
        <FormField id="regiao-longitude" rotulo="Longitude" erro={erros.longitude} dica="Exemplo: -46.7794">
          {(props) => (
            <input {...props} type="text" inputMode="decimal" value={valores.longitude} onChange={(e) => alterar('longitude', e.target.value)} />
          )}
        </FormField>
      </div>

      <label className="flex items-center gap-3 font-semibold">
        <input type="checkbox" className="w-5 h-5 accent-marinho" checked={valores.ativo} onChange={(e) => alterar('ativo', e.target.checked)} />
        Região ativa (aparece para o cidadão)
      </label>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={salvando}>
          {salvando ? 'Salvando...' : editando ? 'Salvar alterações' : 'Cadastrar região'}
        </Button>
        {onCancelar && (
          <Button variante="secundario" onClick={onCancelar}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  )
}
