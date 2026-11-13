import { useState } from 'react'
import { LISTA_RECURSOS } from '../constants/recursos.js'
import Button from './Button.jsx'
import Icone from './Icone.jsx'
import FormField from './FormField.jsx'

const VAZIO = { nome: '', endereco: '', regiaoId: '', latitude: '', longitude: '', horario: '', recursos: [] }

// Formulário de ponto de apoio. A validação (RN04) vem da página pela prop "validar".
export default function SupportPointForm({ valoresIniciais, regioes, validar, onSalvar, onCancelar, salvando }) {
  const [valores, setValores] = useState({ ...VAZIO, ...valoresIniciais })
  const [erros, setErros] = useState({})
  const editando = Boolean(valoresIniciais?.id)
  const { faltasParaPublicar, podePublicar } = validar(valores)

  function alterar(campo, valor) {
    setValores((atual) => ({ ...atual, [campo]: valor }))
    setErros((atual) => ({ ...atual, [campo]: undefined }))
  }

  function alternarRecurso(recurso) {
    alterar(
      'recursos',
      valores.recursos.includes(recurso) ? valores.recursos.filter((r) => r !== recurso) : [...valores.recursos, recurso],
    )
  }

  function usarCoordenadasDaRegiao() {
    const regiao = regioes.find((r) => r.id === valores.regiaoId)
    if (!regiao) return
    setValores((atual) => ({ ...atual, latitude: String(regiao.latitude), longitude: String(regiao.longitude) }))
    setErros((atual) => ({ ...atual, latitude: undefined, longitude: undefined }))
  }

  function salvar(situacao) {
    const resultado = validar(valores)
    setErros(resultado.erros)
    if (Object.keys(resultado.erros).length > 0) return
    if (situacao === 'publicado' && !resultado.podePublicar) return
    onSalvar(valores, situacao)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        salvar('publicado')
      }}
      noValidate
      className="vidro shadow-suave rounded-[2rem] p-6 md:p-7 space-y-5"
    >
      <h2 className="font-titulo text-2xl">{editando ? 'Editar ponto de apoio' : 'Novo ponto de apoio'}</h2>

      <FormField id="ponto-nome" rotulo="Nome do ponto" erro={erros.nome}>
        {(props) => <input {...props} type="text" value={valores.nome} onChange={(e) => alterar('nome', e.target.value)} />}
      </FormField>

      <FormField id="ponto-endereco" rotulo="Endereço" erro={erros.endereco} dica="Exemplo: Rua Exemplo, 120 - Capão Redondo">
        {(props) => (
          <input {...props} type="text" value={valores.endereco} onChange={(e) => alterar('endereco', e.target.value)} />
        )}
      </FormField>

      <FormField id="ponto-regiao" rotulo="Região" erro={erros.regiaoId}>
        {(props) => (
          <select {...props} value={valores.regiaoId} onChange={(e) => alterar('regiaoId', e.target.value)}>
            <option value="">Escolha a região</option>
            {regioes.map((regiao) => (
              <option key={regiao.id} value={regiao.id}>
                {regiao.nome}
              </option>
            ))}
          </select>
        )}
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField id="ponto-latitude" rotulo="Latitude" erro={erros.latitude}>
          {(props) => (
            <input {...props} type="text" inputMode="decimal" value={valores.latitude} onChange={(e) => alterar('latitude', e.target.value)} />
          )}
        </FormField>
        <FormField id="ponto-longitude" rotulo="Longitude" erro={erros.longitude}>
          {(props) => (
            <input {...props} type="text" inputMode="decimal" value={valores.longitude} onChange={(e) => alterar('longitude', e.target.value)} />
          )}
        </FormField>
      </div>
      <Button variante="secundario" tamanho="pequeno" onClick={usarCoordenadasDaRegiao} disabled={!valores.regiaoId}>
        Usar coordenadas da região
      </Button>

      <FormField id="ponto-horario" rotulo="Horário de funcionamento" erro={erros.horario} dica="Exemplo: 08:00-18:00 ou 24h">
        {(props) => <input {...props} type="text" value={valores.horario} onChange={(e) => alterar('horario', e.target.value)} />}
      </FormField>

      <fieldset>
        <legend className="font-semibold mb-2">Recursos oferecidos</legend>
        <div className="flex flex-wrap gap-4">
          {LISTA_RECURSOS.map((recurso) => (
            <label key={recurso.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-5 h-5 accent-floresta"
                checked={valores.recursos.includes(recurso.id)}
                onChange={() => alternarRecurso(recurso.id)}
              />
              <Icone nome={recurso.icone} className="w-5 h-5 text-musgo" />
              {recurso.nome}
            </label>
          ))}
        </div>
      </fieldset>

      <div aria-live="polite">
        {!podePublicar && faltasParaPublicar.length > 0 && (
          <ul className="rounded-2xl bg-risco-atencao/70 px-4 py-3 space-y-1 text-sm font-semibold">
            {faltasParaPublicar.map((falta) => (
              <li key={falta.campo}>{falta.texto}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={salvando || !podePublicar}>
          {salvando ? 'Salvando...' : 'Publicar'}
        </Button>
        <Button variante="secundario" onClick={() => salvar('rascunho')} disabled={salvando}>
          Salvar como rascunho
        </Button>
        {onCancelar && (
          <Button variante="texto" onClick={onCancelar}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  )
}
