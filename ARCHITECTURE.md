# ARCHITECTURE.md — Gerenciador de Homologação (H-Manager)

> Documento de referência arquitetural para LLMs e agentes. Atualizado: 2026-02-24.

---

## Visão Geral

**H-Manager** é um ERP local de gerenciamento de homologações de transportadoras. Controla o ciclo de vida burocrático-comercial de cadastro de clientes, incluindo checklists de documentação, acompanhamento de status e gestão de documentos da transportadora.

**Modo**: Offline-first. Estritamente local, sem APIs externas ou backend.

---

## Stack Técnico

| Camada          | Tecnologia                                | Versão  |
| --------------- | ----------------------------------------- | ------- |
| Framework       | Next.js (App Router)                      | 15.4.x  |
| UI              | React                                     | 19.2.x  |
| Linguagem       | TypeScript (strict)                       | 5.9.x   |
| Estilização     | TailwindCSS                               | 4.1.x   |
| Animações       | Motion (framer-motion)                    | 12.x    |
| Ícones          | Lucide React                              | 0.553.x |
| Utilitários CSS | clsx + tailwind-merge (via `cn()`)        | —       |
| Formulários     | @hookform/resolvers + CVA                 | —       |
| Testes          | Vitest + Testing Library                  | 4.x     |
| Persistência    | localStorage (via `useLocalStorage` hook) | —       |

---

## Estrutura de Diretórios

```text
/
├── src/                    # Todo código de aplicação
│   ├── app/                       # App Router entry
│   │   ├── layout.tsx             # Root layout + metadata
│   │   ├── page.tsx               # Página principal (composição)
│   │   └── globals.css            # TailwindCSS imports
│   ├── components/                # Componentes React
│   │   ├── Sidebar.tsx            # Sidebar com navegação e theme toggle
│   │   ├── HomologationsView.tsx  # Kanban board (4 colunas de status)
│   │   ├── HomologationsListView.tsx  # Lista tabular de homologações
│   │   ├── HomologationDetail.tsx # Detalhe/edição (modal)
│   │   ├── DocumentsView.tsx      # Gestão de documentos
│   │   ├── Modal.tsx              # Modal genérico
│   │   ├── NewTaskModal.tsx       # Modal criação de homologação
│   │   ├── NewDocumentModal.tsx   # Modal criação de documento
│   │   └── ui.tsx                 # Primitivos UI (Button, Input, etc.)
│   ├── lib/                       # Hooks de domínio e utilitários
│   │   ├── mockData.ts            # Dados seed
│   │   ├── useLocalStorage.ts     # Persistência em localStorage
│   │   ├── useHomologationTasks.ts    # Hook: CRUD tarefas
│   │   ├── useCarrierDocuments.ts     # Hook: CRUD documentos
│   │   ├── useThemeToggle.ts          # Hook: tema dark/light
│   │   └── utils.ts               # cn(), formatDate()
│   ├── hooks/                     # Hooks genéricos
│   │   └── use-mobile.ts          # Detecção mobile
│   └── types/                     # Tipos TypeScript do domínio
│       └── index.ts               # HomologationTask, CarrierDocument, etc.
├── docs/                   # Documentação
│   ├── agent/                     # Memória do agent-first-architect
│   │   ├── benchmarks.md          # Cenários de benchmark
│   │   ├── decisions.md           # ADRs
│   │   ├── lessons-learned.md     # Falhas e prevenções
│   │   └── research.md            # Pesquisa externa
│   └── data-contracts/            # Contratos de dados
│       └── types-contracts.md     # Documentação de tipos
├── .agent/                 # Infraestrutura de agentes AI
│   ├── agents/                    # 16 agentes especializados
│   ├── skills/                    # 16 skills técnicas
│   ├── workflows/                 # 25 slash commands
│   └── state/                     # handoff.md
└── Configs raiz
    ├── package.json               # Scripts: dev, build, lint, test
    ├── tsconfig.json              # TS strict, @/* → src/*
    ├── eslint.config.mjs          # ESLint flat config
    ├── next.config.ts             # Next.js configuration
    ├── postcss.config.mjs         # PostCSS + TailwindCSS
    └── vitest.config.mts          # Vitest + jsdom
```

---

## Camadas Arquiteturais

```text
┌─────────────────────────────────────────┐
│  UI Layer (src/components/)             │
│  React components + TailwindCSS         │
├─────────────────────────────────────────┤
│  State Layer (src/app/page.tsx)         │
│  Composição via hooks extraídos         │
├─────────────────────────────────────────┤
│  Domain Layer (src/lib/)               │
│  Hooks de domínio + useLocalStorage     │
├─────────────────────────────────────────┤
│  Types Layer (src/types/)              │
│  Interfaces e type aliases do domínio   │
└─────────────────────────────────────────┘
```

> **Nota**: Não existe camada de services separada atualmente. Lógica de negócio está nos hooks de domínio (`src/lib/`). Persistência é via `localStorage`.

---

## Domínio Principal

### Entidades

| Tipo               | Descrição                                  | Localização          |
| ------------------ | ------------------------------------------ | -------------------- |
| `HomologationTask` | Tarefa de homologação de um cliente        | `src/types/index.ts` |
| `CarrierDocument`  | Documento da transportadora                | `src/types/index.ts` |
| `ChecklistItem`    | Item de checklist com status e responsável | `src/types/index.ts` |
| `Subtask`          | Sub-tarefa de um item de checklist         | `src/types/index.ts` |
| `Interaction`      | Registro de histórico/timeline             | `src/types/index.ts` |

### Status Flows

```text
HomologationStatus: Not Started → In Progress → Waiting on Client → Approved | Rejected
ChecklistStatus:    NotStarted → Pending → Sent → WaitingOtherSector → Done
DocumentStatus:     Pending → Valid → Expired
```

---

## Convenções

### Nomenclatura

- **Componentes**: PascalCase (ex: `HomologationsView.tsx`)
- **Hooks**: camelCase com prefixo `use` (ex: `useLocalStorage.ts`)
- **Tipos**: PascalCase (ex: `HomologationTask`)
- **Utilitários**: camelCase (ex: `formatDate`)

### Estilização

- Usar `cn()` de `src/lib/utils.ts` para merge de classes TailwindCSS
- Dark mode via classe `dark` no `<html>` (toggle manual)
- Design tokens via TailwindCSS (não usar cores hardcoded)

### Persistência

- **Mecanismo**: `useLocalStorage` hook (serializa/deserializa JSON)
- **Chaves**: `homologation-tasks`, `carrier-documents`, `theme`

---

## Gate de Verificação

```bash
npm run lint && npm run build
```

Scripts disponíveis:

| Script          | Comando                 | Propósito                   |
| --------------- | ----------------------- | --------------------------- |
| `dev`           | `next dev`              | Servidor de desenvolvimento |
| `build`         | `next build`            | Build de produção           |
| `lint`          | `eslint .`              | Linting                     |
| `test`          | `vitest`                | Testes unitários (watch)    |
| `test:coverage` | `vitest run --coverage` | Cobertura de testes         |

---

## Referências

- **Agentes**: `.agent/agents/agents-index.md`
- **Memória**: `.agent/state/handoff.md`, `docs/agent/`
- **Contexto rápido**: `CONTEXT.md`
- **Próximos passos**: `NEXT.md`
