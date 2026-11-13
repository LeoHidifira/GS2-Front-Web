# Solara Web Platform — contexto e instruções

> Arquivo de contexto para o Claude Code. Vale para o repositório da aplicação web da Solara, que é **uma única aplicação React** usada em duas disciplinas da Global Solution 2026.2 da FIAP: **Front-end Design** e **Web Development**.
>
> Antes de escrever qualquer código, leia este arquivo inteiro. Os requisitos da seção 3 vêm do PDF oficial do desafio e **todos são obrigatórios**.

---

## 1. O projeto

A **Solara** é uma startup fictícia do tema **CitizenTech** (Engenharia de Software, 1º ano). A ideia é uma plataforma web pensada para o celular, que avisa quando o calor fica perigoso em São Paulo e mostra onde encontrar sombra e água por perto.

- **Problema:** nos dias de calor extremo, idosos e trabalhadores de rua de São Paulo passam horas expostos sem saber onde há sombra e água por perto, e quase nunca recebem um aviso antes de passar mal.
- **Público:** Cidadões e trabalhadores de rua (entregadores, ambulantes).
- **Foco:** cidade de São Paulo. O piloto previsto é no Capão Redondo.
- **Contexto:** o verão 2026/27 começa com um El Niño muito forte, e a previsão é de mais ondas de calor em SP.
- **Slogan:** "Tecnologia inteligente para proteger vidas". A logo usa "Tecnologia que protege"; a equipe precisa escolher um dos dois.

---

## 2. Objetivos das duas disciplinas (texto do PDF)

Desenvolver uma aplicação web funcional sobre o tema da GS 2026.2, aplicando o que foi estudado em Front-end e Web Development. Para isso, a aplicação precisa:

- ser feita em **React com Next.js ou Vite**;
- usar **Tailwind CSS**;
- demonstrar **componentização, React Hooks e Custom Hooks**;
- **separar** a lógica de negócio, o acesso aos dados e a camada visual;
- **consumir uma API externa com operações completas de CRUD**;
- aplicar **boas práticas** de desenvolvimento e de versionamento.

---

## 3. Requisitos obrigatórios (checklist)

Os entregáveis são os mesmos nas duas disciplinas. Marque cada item antes de entregar.

### 3.1 Código
- [ ] **React:** Next.js **ou** Vite. Decisão deste projeto: **Vite + React** (ver seção 5).
- [ ] **Estilização:** Tailwind CSS em toda a aplicação.
- [ ] **Componentização:** **no mínimo 8 componentes React**, organizados e reutilizáveis.
- [ ] **React Hooks:** usar **obrigatoriamente `useState` e `useEffect`**.
- [ ] **Custom Hooks:** **no mínimo 2 hooks personalizados**, para separar a lógica de negócio e o gerenciamento de estado da camada visual.
- [ ] **Separação de responsabilidades:** a lógica de negócio e o acesso aos dados ficam **fora** dos componentes de apresentação.
- [ ] **API externa com CRUD:** consumir uma API externa e implementar **criação, consulta, atualização e exclusão** de registros.
- [ ] **Funcionalidades:** recursos funcionais ligados ao tema da GS. **Uma interface apenas estática não é aceita.**
- [ ] **Versionamento:** Git com **no mínimo 15 commits significativos**, mostrando a evolução do desenvolvimento.
- [ ] **AI.md** na **raiz do projeto**, conforme a seção 3.3.

### 3.2 O que enviar no Teams (em cada uma das duas disciplinas)
A entrega é a **mesma aplicação**, mas precisa ser enviada **separadamente** para os professores de cada disciplina. Só **um integrante** da equipe faz o envio.

- [ ] Link do **repositório GitHub privado**, atualizado e com o histórico de commits disponível.
- [ ] **Arquivo ZIP** do projeto, com os arquivos necessários para analisar e executar a aplicação (sem `node_modules`).
- [ ] **README.md** com a descrição do projeto, os pré-requisitos e as instruções de instalação e execução.
- [ ] **Link do deploy** do projeto (pedido explicitamente em Front-end Design; enviar também em Web Development).
- [ ] **AI.md** documentando o uso de IA.
- [ ] Dar aos professores **acesso de escrita** ao repositório privado e confirmar que todos conseguem acessá-lo.
- [ ] Enviar o link do repositório **e** o ZIP, mesmo com o código no GitHub.

**Prazo:** 19/11/2026, às 23h55, pelo Teams ou Portal do Aluno, na tarefa de cada disciplina.
**Equipe:** até 5 alunos da mesma turma. A equipe e a CitizenTech são as mesmas em todas as disciplinas.

### 3.3 Conteúdo obrigatório do AI.md
O arquivo precisa mostrar, de forma transparente, como a IA foi usada:
1. **Ferramentas utilizadas:** nome de cada ferramenta de IA e para que foi usada.
2. **Interações realizadas:** exemplos representativos dos prompts enviados e das respostas obtidas.
3. **Aplicação no projeto:** funcionalidades, componentes ou trechos de código criados, sugeridos ou modificados com ajuda da IA.
4. **Validação das respostas:** como o grupo verificou, testou e ajustou o que a IA gerou.
5. **Análise crítica:** reflexão curta sobre benefícios, limitações e dificuldades no uso da IA.

O AI.md precisa refletir as **interações reais** do grupo. Se nenhuma IA tiver sido usada, isso precisa estar escrito no arquivo.

> **Instrução para o Claude Code:** sempre que você criar ou alterar uma funcionalidade relevante, acrescente uma entrada curta no `AI.md` (data, pedido do aluno, o que foi gerado e quais arquivos mudaram). A validação e a análise crítica quem escreve é a equipe. Deixe essas partes como tópicos para eles preencherem e não invente testes que não aconteceram.

---

## 4. Funcionalidades da Solara (escopo do app)

### 4.1 Requisitos funcionais
| ID | Requisito | Prioridade | Onde aparece |
|---|---|---|---|
| RF01 | Mostrar o nível de risco de calor da região | Essencial | Início |
| RF02 | Mostrar no mapa/lista os pontos de apoio (sombra, água, banheiro) | Essencial | Mapa |
| RF03 | Filtrar pontos por recurso e distância | Importante | Mapa |
| RF04 | Mostrar alerta quando o risco chegar a Alto ou Extremo | Essencial | Alertas |
| RF05 | Escolher bairros para acompanhar e ligar/desligar alertas | Importante | Meus bairros |
| RF06 | Mostrar orientações de proteção para cada nível | Essencial | Início / Alertas |
| RF07 | Mostrar o histórico de temperatura de cada região | Desejável | Histórico |
| RF08 | **CRUD de regiões monitoradas** | Essencial | Painel |
| RF09 | **CRUD de pontos de apoio** | Essencial | Painel |
| RF10 | Buscar dados de clima em API externa | Essencial | Serviço |
| RF11 | Calcular o risco com temperatura e umidade | Essencial | Lógica de negócio |
| RF12 | Permitir que o cidadão avise que um ponto fechou | Desejável | Detalhe do ponto |

### 4.2 Regras de negócio
| ID | Regra |
|---|---|
| RN01 | Risco pela **sensação térmica** (índice de calor): **Baixo** até 27 °C · **Atenção** de 27 a 32 °C · **Alto** de 32 a 39 °C · **Extremo** acima de 39 °C |
| RN02 | O alerta só aparece depois de **duas leituras seguidas** em Alto ou Extremo |
| RN03 | No máximo **um alerta a cada 3 horas** por região, a não ser que o risco suba |
| RN04 | Ponto de apoio só é publicado com **endereço, horário e pelo menos um recurso** |
| RN05 | **Três avisos de "fechado" em 24 h** deixam o ponto como "a confirmar" |
| RN06 | Leitura abaixo de −5 °C, acima de 60 °C ou com mais de 1 hora é descartada |

### 4.3 Requisitos não funcionais
- **Mobile first:** pensado para celular, mas funcionando no desktop (o painel do administrador é usado no desktop).
- **Acessibilidade:** contraste mínimo de 4,5:1, foco visível, `alt` em imagens, `label` em todos os campos e risco **sempre escrito**, nunca indicado só por cor.
- **Usabilidade:** o risco aparece na tela inicial sem rolar a página.
- **Privacidade:** sem login para o cidadão; a localização não é salva.

### 4.4 Fora do escopo
Atendimento médico (só mostrar o 192 do SAMU), rota passo a passo (o botão "Como chegar" abre o Google Maps com o endereço), dados de saúde e envio real de SMS ou WhatsApp.

---

## 5. Arquitetura

### 5.1 Stack
- **Vite + React** (JavaScript ou TypeScript; a equipe decide e mantém a escolha).
- **Tailwind CSS**.
- **React Router** para as páginas.
- Requisições com `fetch` (ou axios), **sempre dentro de `services/`**.
- Deploy na **Vercel** (ou Netlify).

### 5.2 APIs externas
A API de clima é só de leitura e **não atende o CRUD**. Por isso o app usa duas APIs:

| API | Uso | Operações |
|---|---|---|
| **MockAPI.io** (ou JSON Server publicado, Supabase, Firebase) | Recursos `regioes`, `pontos` e `avisos` | **GET, POST, PUT, DELETE**: é aqui que o CRUD obrigatório acontece |
| **Open-Meteo** (`api.open-meteo.com/v1/forecast`, sem chave) | Temperatura, umidade e sensação térmica atuais e o histórico por latitude/longitude | GET |

- A URL base da API de CRUD fica em `.env` (`VITE_API_URL`). Crie um `.env.example` e **não versione o `.env`**.
- Trate os estados de **carregando**, **erro** e **lista vazia** em todas as telas que buscam dados.

### 5.3 Estrutura de pastas
```
src/
  components/      # componentes de apresentação (só recebem props e renderizam)
  pages/           # páginas/rotas, que juntam hooks e componentes
  hooks/           # custom hooks (estado + lógica)
  services/        # acesso a dados: chamadas às APIs, nada de JSX
  utils/           # regras de negócio puras (ex.: cálculo do risco)
  constants/       # níveis de risco, textos, cores
  App.jsx
  main.jsx
```

**Regra de ouro:** componente **não chama `fetch`** e **não calcula risco**. O caminho é sempre `services/` → `hooks/` → `pages/` → `components/`.

### 5.4 Custom hooks (mínimo 2; planejados 4)
| Hook | Responsabilidade | Usa |
|---|---|---|
| `useRegioes` | Lista, cria, edita e exclui regiões; controla `loading`/`error` | `useState`, `useEffect`, `regioesService` |
| `usePontosDeApoio` | CRUD de pontos, filtros por recurso e distância, aviso de "fechado" | `useState`, `useEffect`, `pontosService` |
| `useClima` | Busca o clima atual e o histórico de uma região na Open-Meteo | `useState`, `useEffect`, `climaService` |
| `useNivelDeRisco` | Converte temperatura + umidade em nível, texto, cor e orientações | `utils/risco.js` |

### 5.5 Componentes (mínimo 8; planejados)
`Header`, `BottomNav`, `RiskCard`, `RiskBadge`, `AlertBanner`, `TipsList`, `SupportPointCard`, `FilterChips`, `TemperatureChart`, `RegionForm`, `SupportPointForm`, `DataTable`, `ConfirmDialog`, `EmptyState`, `Loader`, `Button`.

### 5.6 Lógica de negócio central
Uma única função em `utils/risco.js`, reaproveitada em todo o app:
```js
// Recebe temperatura (°C) e umidade (%), devolve a sensação térmica e o nível (RN01).
// Usar o índice de calor da NOAA (fórmula de Rothfusz) ou a sensação térmica
// já devolvida pela Open-Meteo (apparent_temperature).
export function calcularNivelDeRisco(temperatura, umidade) { /* ... */ }
// níveis: 'baixo' | 'atencao' | 'alto' | 'extremo'
```

---

## 6. Telas (baseadas no protótipo de média fidelidade)

| Rota | Tela | Conteúdo | RF |
|---|---|---|---|
| `/` | Início | Bairro atual, temperatura e sensação, `RiskCard` com o horário da atualização, botão "Onde me refrescar" e três dicas | RF01, RF06 |
| `/alertas` | Alertas | Aviso de risco ("Risco ALTO até 17h"), motivo do alerta, botão para o mapa e link `tel:192` | RF04, RF06 |
| `/mapa` | Mapa / pontos de apoio | Filtros Água · Sombra · Banheiro, lista dos pontos mais próximos (mapa com Leaflet é opcional) | RF02, RF03 |
| `/pontos/:id` | Detalhe do ponto | Endereço, horário, "Aberto agora", recursos com ícone + texto, "Como chegar" e "Está fechado? Avise aqui" | RF02, RF12 |
| `/historico/:regiaoId` | Histórico | Gráfico de barras com a máxima dos últimos 7 dias, com os dias Alto destacados e escritos | RF07 |
| `/bairros` | Meus bairros | Bairros acompanhados (salvos no `localStorage`), chave de alerta, nível mínimo e tamanho da letra | RF05 |
| `/painel/regioes` | Painel – Regiões | Tabela + formulário: **criar, listar, editar, excluir** | RF08 |
| `/painel/pontos` | Painel – Pontos de apoio | Tabela + formulário: **criar, listar, editar, excluir**; "Publicar" bloqueado se faltar campo (RN04) | RF09 |

No celular, a navegação inferior fica fixa: **Início · Mapa · Alertas · Bairros**. O painel fica em `/painel`, com menu lateral no desktop.

---

## 7. Identidade visual e tom de voz

### 7.1 Design tokens (configurar no Tailwind)
| Token | Cor | Uso |
|---|---|---|
| `floresta` | `#1F3D2F` | Botões primários, cartão de destaque, navegação ativa |
| `floresta-escuro` | `#142A20` | Hover dos botões, rodapé |
| `musgo` | `#3E6B50` | Ícones de apoio |
| `salvia` | `#C8D7C4` | Faixas de aviso suave, barras do gráfico |
| `nevoa` | `#E6EAE1` | Fundo de pílulas e chips |
| `creme` | `#F4F2EC` | Fundo |
| `tinta` | `#17221C` | Texto principal |
| `terra` | `#8A5A3B` | Palavra em destaque nos títulos, foco |

Estilo: cartões de vidro fosco (utilitário `vidro`), cantos bem arredondados, navegação em pílula e botões com bolinha de seta. No celular, navegação inferior flutuante com o botão "Refrescar" redondo no meio.

Cores dos níveis (sempre com o nome escrito ao lado): Baixo verde `#D4E5CC` · Atenção amarelo `#F6E2A4` · Alto laranja `#F5C6A0` · Extremo vermelho `#E8A298`, todas com texto `#17221C`.

Fontes: **Fraunces** nos títulos e **Outfit** no texto (Google Fonts). Texto base de pelo menos 16 px, com opção de aumentar.

Logo: `public/logo-solara.png` (versão sem as bordas brancas).

### 7.2 Tom de voz
Frases curtas, verbo no começo, sem termos técnicos e sem alarmismo. Só o nível de risco vai em caixa-alta.

| Evitar | Usar |
|---|---|
| "ALERTA: índice de calor crítico detectado" | "Calor alto no Capão Redondo até 17h. Veja onde se refrescar." |
| "Visualizar pontos de apoio" | "Onde me refrescar" |
| "Nenhum risco identificado" | "Dia tranquilo por aqui. Mesmo assim, leve água." |
| "Reportar inconsistência" | "Está fechado? Avise aqui" |
| "Erro de conexão (timeout)" | "Sem internet agora. Mostrando os dados das 10h40." |
| "Erro: campo obrigatório" | "Falta o horário para publicar." |

---

## 8. Dados

```
Regiao        { id, nome, bairro, latitude, longitude, ativo }
PontoDeApoio  { id, nome, endereco, regiaoId, latitude, longitude, horario,
                recursos: ["agua","sombra","banheiro"],
                situacao: "rascunho" | "publicado" | "a_confirmar" }
AvisoFechado  { id, pontoId, criadoEm }
```

Dados de exemplo fictícios: regiões Capão Redondo, Campo Limpo, Centro, Pinheiros e Paraisópolis (com latitude e longitude reais dos bairros); pontos com nomes como "UBS Vila Nova", "Praça da Matriz" e "Biblioteca do bairro" e endereço "Rua Exemplo, 120".

---

## 9. Versionamento (mínimo 15 commits significativos)

Commits pequenos, em português, no imperativo, cada um com uma mudança real. Plano sugerido:

1. `Cria projeto com Vite e React`
2. `Configura Tailwind e tokens de cor da Solara`
3. `Adiciona rotas e layout com navegação inferior`
4. `Cria componentes Header, BottomNav e Button`
5. `Implementa cálculo do nível de risco (RN01)`
6. `Cria serviço e hook de clima com Open-Meteo`
7. `Monta tela inicial com RiskCard e dicas`
8. `Cria serviço de regiões na API de CRUD`
9. `Implementa CRUD de regiões no painel`
10. `Cria serviço e hook de pontos de apoio`
11. `Implementa CRUD de pontos de apoio com validação (RN04)`
12. `Adiciona lista de pontos com filtros por recurso`
13. `Cria tela de detalhe e aviso de ponto fechado (RN05)`
14. `Adiciona tela de alertas e regras de envio (RN02, RN03)`
15. `Cria histórico com gráfico de 7 dias`
16. `Adiciona Meus bairros com localStorage`
17. `Melhora acessibilidade e estados de carregamento e erro`
18. `Escreve README e AI.md`
19. `Configura deploy na Vercel`

> **Instrução para o Claude Code:** não faça commits enormes que juntam várias etapas. Sugira mensagens de commit seguindo o plano acima.

---

## 10. README.md (estrutura mínima exigida)
1. Nome e descrição do projeto (problema, público, solução).
2. Integrantes (nome completo e RM).
3. Tecnologias usadas.
4. **Pré-requisitos** (Node.js LTS, npm).
5. **Instalação e execução** (`git clone`, `npm install`, criar o `.env` a partir do `.env.example`, `npm run dev`).
6. APIs usadas e como configurar.
7. Funcionalidades e rotas.
8. Link do deploy.
9. Estrutura de pastas.

---

## 11. Convenções para o Claude Code
- Interface, textos e mensagens em **português do Brasil**.
- Componentes em PascalCase, hooks começando com `use`, serviços terminando com `Service`.
- Componentes de apresentação **sem** `fetch` e **sem** regra de negócio.
- Todo formulário tem validação e mensagem de erro clara (tom de voz da seção 7.2).
- Antes de excluir, peça confirmação com `ConfirmDialog`.
- Nunca deixe a aplicação só com dados estáticos: as listas vêm da API.
- Não invente requisitos fora deste arquivo sem avisar a equipe.

## 12. Pendências da equipe
- [ ] Nomes, RMs e turma no README.
- [ ] Criar o projeto na MockAPI (ou alternativa) e preencher o `VITE_API_URL`.
- [ ] Dar acesso de escrita aos professores das duas disciplinas no GitHub.
- [ ] Preencher a validação e a análise crítica no AI.md.
- [ ] Gerar o ZIP sem `node_modules` e enviar nas duas tarefas do Teams até 19/11, às 23h55.
