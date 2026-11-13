# Uso de IA no projeto Solara

Neste arquivo a equipe registra, de forma transparente, como usamos inteligência artificial no desenvolvimento da Solara: o que pedimos, o que decidimos e como conferimos o resultado.

## 1. Ferramentas utilizadas

| Ferramenta | Como a equipe usou |
|---|---|
| **Claude Code** (modelo Claude Opus 5.5, da Anthropic) | Usamos como assistente de programação. Passamos o nosso `PRD.md`, definimos as decisões em aberto e pedimos a geração do código (componentes, hooks, serviços e regras de negócio), testes no navegador e commits por etapa. Depois revisamos e pedimos ajustes. |
| _outras ferramentas, se houver (preencher)_ | |

## 2. Interações realizadas

Exemplos representativos das conversas que tivemos com a IA.

### 2.1 Ponto de partida: o PRD da equipe (13/11/2026)

Escrevemos o `PRD.md` com o problema, o público, as telas, as regras de negócio (RN01 a RN06) e a arquitetura. Pedimos que a IA seguisse esse documento e **perguntasse antes de decidir qualquer ponto que não estivesse claro**:

> Claude, leia o arquivo PRD.md, e execute o projeto, caso algo nao tenha ficado claro, me pergunte antes de tomar qualquer decisões

A IA levantou os pontos em aberto e a equipe decidiu cada um:

| Ponto em aberto | Decisão da equipe |
|---|---|
| JavaScript ou TypeScript | **JavaScript**, para manter o projeto simples para todos do grupo |
| Slogan | **"Tecnologia inteligente para proteger vidas"** |
| Quem faz os commits | A IA faz um commit por etapa, seguindo o plano de versionamento do PRD |

### 2.2 Escolha da API de CRUD (13/11/2026)

Pedimos que a IA pesquisasse a melhor API para o CRUD. Ela encontrou um problema: o plano grátis da MockAPI permite poucos recursos por projeto, e o nosso PRD previa 3 (`regioes`, `pontos` e `avisos`). Ela comparou com alternativas como o Supabase, que pausa o projeto grátis depois de 7 dias sem uso, o que poderia derrubar o deploy na correção.

**Nossa decisão:** usar a **MockAPI com 2 recursos** (`regioes` e `pontos`) e guardar os avisos de "fechado" dentro de cada ponto (`avisosFechado`). Depois **criamos o projeto na MockAPI**, configuramos o `.env` e pedimos à IA que conferisse a conexão e o CRUD.

Também perguntamos se a MockAPI era mesmo necessária. Entendemos que a API local (json-server) serve para desenvolver, mas não atende o requisito de API externa nem funciona no deploy. Por isso **mantivemos a MockAPI**.

### 2.3 Revisão visual: "menos cara de IA" (13/11/2026)

Depois de ver a primeira versão rodando, **achamos que a interface parecia genérica, "feita por IA"**, e pedimos uma revisão:

> Quero que você faça uma revisão visual completa do site para remover aquela aparência genérica de projetos feitos por IA.

> Busque um design mais natural, profissional e autêntico, como se tivesse sido desenvolvido por um designer experiente.

> Evite clichês visuais como gradientes exagerados, excesso de sombras, cards arredondados em tudo, ícones genéricos e layouts muito padronizados.

> Trabalhe melhor a tipografia, as cores, os espaçamentos, a hierarquia visual e a composição dos elementos.

> Quero uma interface moderna, bonita e com personalidade própria, sem exageros e sem parecer um template pronto.

> Analise o projeto e faça as alterações diretamente no código, preservando todas as funcionalidades existentes.

A IA apontou os sinais que davam essa impressão (cartões beges arredondados em tudo, emojis como ícones, selos em "pílula", coluna estreita no computador) e ofereceu três direções.

**Nossa decisão:** estilo **"app de serviço"** (temperatura em destaque, faixa de risco, divisórias no lugar de cartões, ícones desenhados), aplicado também aos **textos**, ao **layout de computador** e ao **painel do administrador**.


## 3. Aplicação no projeto

O que foi feito com ajuda da IA, a partir dos nossos pedidos e decisões.

| Data | O que pedimos | O que a IA gerou | Arquivos |
|---|---|---|---|
| 13/11/2026 | Base do projeto conforme o PRD | Projeto Vite + React, Tailwind com os tokens de cor e fontes que definimos, logo recortada sem bordas brancas | `package.json`, `vite.config.js`, `index.html`, `src/index.css`, `public/logo-solara.png` |
| 13/11/2026 | Rotas e layout das telas do PRD | Rotas do app e do painel, navegação inferior no celular e menu lateral no painel | `src/App.jsx`, `src/layouts/*` |
| 13/11/2026 | Componentes base | `Header`, `BottomNav`, `Button`, `Icone`, `Loader`, `EmptyState`, `ErrorMessage` | `src/components/*` |
| 13/11/2026 | Cálculo do risco (RN01, RN06) | Índice de calor da NOAA (fórmula de Rothfusz), que o PRD indicava, níveis de risco e validação das leituras | `src/utils/risco.js`, `src/utils/leituras.js`, `src/constants/riscos.js`, `src/hooks/useNivelDeRisco.js` |
| 13/11/2026 | Clima pela Open-Meteo (RF10) | Serviço de clima, cache para quando falta internet, hooks `useClima` e `useHistoricoClima` | `src/services/climaService.js`, `src/services/http.js`, `src/services/storageService.js`, `src/hooks/useClima.js`, `src/hooks/useHistoricoClima.js`, `src/utils/historico.js` |
| 13/11/2026 | Serviço de regiões | Cliente de CRUD, serviço e hook de regiões, dados de exemplo e API local para desenvolvimento | `src/services/api.js`, `src/services/regioesService.js`, `src/hooks/useRegioes.js`, `src/utils/regioes.js`, `dados-exemplo.json`, `.env.example` |
| 13/11/2026 | Tela inicial (RF01, RF06) | Risco do bairro, dicas e preferências compartilhadas | `src/pages/Inicio.jsx`, `src/hooks/usePreferencias.jsx`, `src/components/*` |
| 13/11/2026 | CRUD de regiões (RF08) | Tabela, formulário com validação e confirmação antes de excluir | `src/pages/painel/PainelRegioes.jsx`, `src/components/DataTable.jsx`, `RegionForm.jsx`, `ConfirmDialog.jsx`, `FormField.jsx` |
| 13/11/2026 | Pontos de apoio (RF09, RN04) | CRUD com "Publicar" bloqueado quando falta endereço, horário ou recurso | `src/services/pontosService.js`, `src/hooks/usePontosDeApoio.js`, `src/utils/pontos.js`, `src/pages/painel/PainelPontos.jsx`, `src/components/SupportPointForm.jsx` |
| 13/11/2026 | Lista e filtros (RF02, RF03) | Pontos mais próximos, filtros por recurso e distância, localização que não fica salva | `src/pages/Mapa.jsx`, `src/hooks/useLocalizacao.js`, `src/components/FilterChips.jsx`, `SupportPointCard.jsx` |
| 13/11/2026 | Detalhe e aviso de fechado (RF12, RN05) | Tela de detalhe, "Como chegar" e aviso de "fechado" | `src/pages/DetalhePonto.jsx`, `src/hooks/usePontoDeApoio.js` |
| 13/11/2026 | Alertas (RF04, RN02, RN03) | Regras de alerta, horário até quando o risco continua alto e aviso na tela | `src/utils/alertas.js`, `src/services/alertasService.js`, `src/hooks/useAlertas.js`, `src/hooks/useAlertaDaRegiao.js`, `src/pages/Alertas.jsx`, `src/components/AlertBanner.jsx` |
| 13/11/2026 | Histórico (RF07) | Gráfico de barras dos últimos 7 dias | `src/pages/Historico.jsx`, `src/components/TemperatureChart.jsx` |
| 13/11/2026 | Meus bairros (RF05) | Bairros acompanhados, alertas, nível mínimo e tamanho da letra | `src/pages/MeusBairros.jsx`, `src/components/Toggle.jsx`, `OptionGroup.jsx` |
| 13/11/2026 | Acessibilidade | Título da aba por tela, volta ao topo ao trocar de tela, página 404 | `src/hooks/useTituloDaPagina.js`, `src/components/ScrollToTop.jsx`, `src/pages/NaoEncontrada.jsx` |
| 13/11/2026 | Carga de dados na MockAPI | Script que envia os dados de exemplo para a API | `scripts/popular-api.js` |
| 13/11/2026 | Documentação e deploy | README, rascunho deste AI.md e configuração da Vercel | `README.md`, `AI.md`, `vercel.json` |
| 13/11/2026 | Ligar o app à nossa MockAPI | Conferência da URL que configuramos, carga dos dados e teste de criar, editar e excluir | só o `.env` (não versionado) |
| 13/11/2026 | Revisão visual que pedimos | Ícones desenhados no lugar de emojis, divisórias no lugar de cartões, temperatura em destaque, rodapé com slogan e SAMU, duas colunas no computador, formulário ao lado da tabela no painel e textos mais curtos | `src/components/*`, `src/pages/*`, `src/layouts/*`, `src/constants/recursos.js` |

