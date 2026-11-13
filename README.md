# Solara

> Tecnologia inteligente para proteger vidas

Aplicação web da **Solara**, desenvolvida para a Global Solution 2026.2 da FIAP (Engenharia de Software, 1º ano), tema **CitizenTech**, nas disciplinas **Front-end Design** e **Web Development**.

## 1. Sobre o projeto

**Problema:** nos dias de calor extremo, idosos e trabalhadores de rua de São Paulo passam horas expostos sem saber onde há sombra e água por perto, e quase nunca recebem um aviso antes de passar mal.

**Público:** cidadãos e trabalhadores de rua (entregadores, ambulantes) da cidade de São Paulo. O piloto previsto é no Capão Redondo.

**Solução:** uma plataforma web pensada para o celular que:

- mostra o **nível de risco de calor** do bairro (Baixo, Atenção, Alto ou Extremo), calculado com temperatura e umidade;
- **avisa** quando o risco chega a Alto ou Extremo;
- lista **pontos de apoio** com sombra, água e banheiro, filtrando por recurso e distância;
- deixa o cidadão **avisar quando um ponto fechou**;
- tem um **painel administrativo** com CRUD de regiões e de pontos de apoio.

## 2. Integrantes

| Nome completo | RM |
|---|---|
| _preencher_ | _preencher_ |
| _preencher_ | _preencher_ |
| _preencher_ | _preencher_ |

Turma: _preencher_

## 3. Tecnologias

- [React 19](https://react.dev/) com [Vite](https://vite.dev/) (JavaScript)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- `fetch` nativo (todas as chamadas ficam em `src/services/`)
- [MockAPI.io](https://mockapi.io/) (CRUD) e [Open-Meteo](https://open-meteo.com/) (clima)
- [json-server](https://github.com/typicode/json-server) para desenvolver localmente
- Deploy na [Vercel](https://vercel.com/)

## 4. Pré-requisitos

- [Node.js](https://nodejs.org/) LTS (20 ou mais recente)
- npm (já vem com o Node.js)
- Git

## 5. Instalação e execução

```bash
git clone <URL-DO-REPOSITORIO>
cd <pasta-do-projeto>
npm install
cp .env.example .env      # no Windows (PowerShell): Copy-Item .env.example .env
```

### Opção A: API local (json-server)

O `.env.example` já aponta para `http://localhost:3001`. Abra **dois terminais**:

```bash
npm run api   # terminal 1: API de CRUD local com os dados de exemplo
npm run dev   # terminal 2: aplicação em http://localhost:5173
```

O `npm run api` cria um `db.json` a partir de `dados-exemplo.json` na primeira vez. Para voltar aos dados originais, apague o `db.json`.

### Opção B: MockAPI (usada no deploy)

1. Crie um projeto em [mockapi.io](https://mockapi.io/).
2. Crie dois recursos, **`regioes`** e **`pontos`**, com estes campos (o `id` a MockAPI cria sozinha). Se a MockAPI gerar registros falsos automaticamente, apague-os:
   - `regioes`: `nome` (String), `bairro` (String), `latitude` (Number), `longitude` (Number), `ativo` (Boolean)
   - `pontos`: `nome`, `endereco`, `regiaoId`, `horario`, `situacao` (String), `latitude`, `longitude` (Number), `recursos`, `avisosFechado` (Array/Object)
3. No `.env`, troque `VITE_API_URL` pela URL do projeto, por exemplo `https://SEU-ID.mockapi.io/api/v1`.
4. Rode `npm run popular-api` **uma vez** para enviar os dados de exemplo.
5. Rode `npm run dev`.

### Outros comandos

```bash
npm run build     # gera a versão de produção em dist/
npm run preview   # serve a versão de produção localmente
```

## 6. APIs usadas

| API | Uso | Operações |
|---|---|---|
| **MockAPI.io** (`VITE_API_URL`) | Recursos `regioes` e `pontos` | GET, POST, PUT, DELETE |
| **Open-Meteo** (`api.open-meteo.com/v1/forecast`, sem chave) | Temperatura e umidade atuais, previsão hora a hora e histórico de 7 dias | GET |

O plano grátis da MockAPI permite poucos recursos por projeto. Por isso os avisos de "ponto fechado" (`AvisoFechado`) ficam dentro de cada ponto, no campo `avisosFechado` (lista de datas), em vez de ficarem num terceiro recurso. A regra RN05 continua a mesma.

## 7. Funcionalidades e rotas

| Rota | Tela | O que faz |
|---|---|---|
| `/` | Início | Bairro, temperatura, sensação térmica, nível de risco, horário da atualização, botão "Onde me refrescar" e três dicas |
| `/alertas` | Alertas | Aviso de risco Alto/Extremo ("até 17h"), motivo do alerta, dicas, botão para o mapa e `tel:192` |
| `/mapa` | Onde me refrescar | Pontos de apoio mais próximos, com filtros por recurso (Água, Sombra, Banheiro) e distância |
| `/pontos/:id` | Detalhe do ponto | Endereço, horário, "Aberto agora", recursos, "Como chegar" (Google Maps) e "Está fechado? Avise aqui" |
| `/historico/:regiaoId` | Histórico | Gráfico com a máxima dos últimos 7 dias; dias Alto/Extremo destacados e escritos |
| `/bairros` | Meus bairros | Bairros acompanhados, liga/desliga alertas, nível mínimo e tamanho da letra (salvos no navegador) |
| `/painel/regioes` | Painel: Regiões | Criar, listar, editar e excluir regiões |
| `/painel/pontos` | Painel: Pontos de apoio | Criar, listar, editar e excluir pontos; "Publicar" bloqueado se faltar endereço, horário ou recurso |

### Regras de negócio implementadas

| Regra | Onde |
|---|---|
| RN01: nível pela sensação térmica (índice de calor da NOAA) | `src/utils/risco.js` |
| RN02: alerta só depois de duas leituras seguidas em Alto/Extremo | `src/utils/alertas.js` |
| RN03: no máximo um alerta a cada 3 h por região, a não ser que o risco suba | `src/utils/alertas.js` |
| RN04: publicar só com endereço, horário e pelo menos um recurso | `src/utils/pontos.js` |
| RN05: três avisos de "fechado" em 24 h deixam o ponto "a confirmar" | `src/utils/pontos.js` |
| RN06: leituras abaixo de −5 °C, acima de 60 °C ou com mais de 1 h são descartadas | `src/utils/leituras.js` |

## 8. Deploy

Link do deploy: _preencher após publicar na Vercel_

Para publicar na Vercel: importe o repositório, mantenha o preset **Vite** e cadastre a variável de ambiente `VITE_API_URL` com a URL da MockAPI. O `vercel.json` já redireciona as rotas do React Router para o `index.html`.

## 9. Estrutura de pastas

```
├── public/              # logo e arquivos estáticos
├── scripts/             # scripts de apoio (API local e carga de dados)
├── src/
│   ├── components/      # componentes de apresentação (só recebem props e renderizam)
│   ├── constants/       # níveis de risco, recursos, textos
│   ├── hooks/           # custom hooks (estado + lógica)
│   ├── layouts/         # layout do cidadão e do painel
│   ├── pages/           # telas, que juntam hooks e componentes
│   │   └── painel/      # telas do administrador
│   ├── services/        # acesso a dados: chamadas às APIs e ao localStorage, sem JSX
│   ├── utils/           # regras de negócio puras (risco, alertas, pontos)
│   ├── App.jsx          # rotas
│   ├── index.css        # Tailwind e design tokens
│   └── main.jsx
├── dados-exemplo.json   # dados fictícios de regiões e pontos
├── .env.example
├── AI.md                # registro do uso de IA
└── PRD.md               # requisitos do projeto
```

Fluxo dos dados: `services/` → `hooks/` → `pages/` → `components/`. Componentes não chamam `fetch` e não calculam risco.

### Custom hooks

`useRegioes`, `usePontosDeApoio`, `usePontoDeApoio`, `useClima`, `useHistoricoClima`, `useNivelDeRisco`, `useAlertas`, `useAlertaDaRegiao`, `useLocalizacao`, `usePreferencias`, `useTituloDaPagina`.

### Componentes

`Header`, `BottomNav`, `Button`, `Icone`, `Loader`, `EmptyState`, `ErrorMessage`, `StatusMessage`, `RiskCard`, `RiskBadge`, `AlertBanner`, `TipsList`, `RegionSelect`, `SupportPointCard`, `ResourceList`, `SituationBadge`, `FilterChips`, `TemperatureChart`, `RegionForm`, `SupportPointForm`, `FormField`, `DataTable`, `ConfirmDialog`, `Toggle`, `OptionGroup`, `ScrollToTop`.

## Privacidade

O cidadão não faz login. A localização só é usada quando a pessoa toca em "Usar minha localização" e nunca é salva. As preferências ficam só no navegador do aparelho.

Fora do escopo: atendimento médico (o app só mostra o 192 do SAMU), rota passo a passo (o "Como chegar" abre o Google Maps) e envio real de SMS ou WhatsApp.
