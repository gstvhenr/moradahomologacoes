# CONTEXT.md — Quick Start para Agentes

> Leia este arquivo primeiro. Ele fornece o contexto mínimo para começar a trabalhar.

---

## O que é este projeto

**H-Manager** (Gerenciador de Homologação) — ERP local para controle operacional de burocracia comercial e homologação de transportadoras. Gerencia o ciclo completo de cadastro de clientes, incluindo checklists documentais, rastreamento de status e documentos da empresa.

## Estado atual

- **Versão**: 0.1.0 (MVP)
- **Modo**: Offline-first, estritamente local
- **Persistência**: `localStorage` (via hook `useLocalStorage`)
- **Stack**: Next.js 15 + React 19 + TypeScript strict + TailwindCSS 4
- **Testes**: Vitest + Testing Library (cobertura inicial)
- **Infraestrutura AI**: 16 agentes, 16 skills, 20+ workflows

## Arquivos essenciais (Boot Sequence)

| Ordem | Arquivo                         | Propósito                          |
| ----- | ------------------------------- | ---------------------------------- |
| 1     | `CONTEXT.md`                    | Este arquivo — orientação rápida   |
| 2     | `ARCHITECTURE.md`               | Estrutura, stack, camadas, domínio |
| 3     | `.agent/state/handoff.md`       | Onde a última sessão parou         |
| 4     | `docs/agent/lessons-learned.md` | Erros passados — não repetir       |
| 5     | `docs/agent/decisions.md`       | Decisões arquiteturais vigentes    |
| 6     | `.agent/agents/agents-index.md` | Índice de agentes disponíveis      |

## Gate de verificação

```bash
npm run lint && npm run build
```

## Links rápidos

- **Próximos passos**: [NEXT.md](NEXT.md)
- **Arquitetura completa**: [ARCHITECTURE.md](ARCHITECTURE.md)
- **Agentes**: [agents-index.md](.agent/agents/agents-index.md)
- **TechSpec audit**: [techspec-agent-first-audit.md](docs/agent/techspec-agent-first-audit.md)
