---
description: Fluxo padrão de execução de tarefas. Sequência canônica do Boot ao Handoff.
---

# Default Task Flow

// turbo-all

1. Ler `CONTEXT.md`, `AGENTS.md`, `ARCHITECTURE.md`, `NEXT.md`, `.agent/state/handoff.md`.
2. Ler `.agent/lessons-learned.md` e `docs/agent/lessons-learned.md`.
3. Rodar baseline e gates definidos em `AGENTS.md` (`npm run lint && npm run build`).
4. Implementar em small diff (1 behavior por mudança).
5. Rodar gate canônico: `npm run lint && npm run build`.
6. Se falhar, inspecionar saída do gate, aplicar fix mínimo e reexecutar.
7. Atualizar `NEXT.md` e `docs/agent/decisions.md` se mudança for estrutural.
8. Registrar evidências (comandos executados + resultados objetivos).
9. Se algum erro foi corrigido, registrar em `docs/agent/lessons-learned.md`.
