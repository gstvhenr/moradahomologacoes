---
description: Invocar o agent-first-architect para auditar e evoluir a infraestrutura agent-first do projeto. Mede autonomia, atualiza memória, pesquisa práticas recentes.
---

# /agent-first — Evolução Agent-First

$ARGUMENTS

---

## Propósito

Invocar o `agent-first-architect` para uma rodada de evolução do modelo agent-first. Cada invocação executa o ciclo TPAC-H completo: auditoria, pesquisa, planejamento, execução, verificação e handoff.

---

## 🔴 Regras Críticas

1. **BOOT SEQUENCE OBRIGATÓRIO**: O agente DEVE ler `.agent/state/handoff.md` antes de qualquer ação.
2. **SEQUENTIAL THINKING OBRIGATÓRIO**: Usar `mcp_sequential-thinking` antes de mudanças estruturais.
3. **PESQUISA EXTERNA**: Tentar Perplexity Ask primeiro. Se indisponível, usar `search_web`. Registrar em `docs/agent/research.md`.
4. **HANDOFF OBRIGATÓRIO**: Ao finalizar, atualizar `.agent/state/handoff.md` com bloco YAML estruturado.
5. **ESCOPO**: Apenas infraestrutura de agentes (`.agent/`, `docs/agent/`, workflows, skills). NÃO modificar código de negócio.

---

## Task

Usar o agente `agent-first-architect` com este contexto:

```text
CONTEXTO:
- Agente: agent-first-architect
- Modo: Auditoria e Evolução Agent-First
- Data: [data vigente]
- Request: $ARGUMENTS (ou "auditoria completa" se vazio)

INSTRUÇÕES:
1. Executar Boot Sequence (ler handoff → lessons → decisions → research)
2. Avaliar as 12 dimensões de agent-first readiness
3. Identificar a dimensão com maior gap
4. Usar Sequential Thinking para planejar melhoria
5. Executar melhoria incremental
6. Rodar gate: npm run lint && npm run build
7. Atualizar handoff.md + docs relevantes
```

---

## Output Esperado

| Entregável               | Localização                              |
| ------------------------ | ---------------------------------------- |
| Handoff atualizado       | `.agent/state/handoff.md`                |
| Decisões (se houver)     | `docs/agent/decisions.md`                |
| Lições (se houver falha) | `docs/agent/lessons-learned.md`          |
| Pesquisa (se houver)     | `docs/agent/research.md`                 |
| Gate evidence            | Terminal (npm run lint && npm run build) |

---

## Exemplos de Uso

```text
/agent-first
/agent-first auditar dimensão de continuidade
/agent-first pesquisar práticas recentes de vibe coding
/agent-first melhorar cenários de referência
/agent-first revisar workflows existentes para agent-first readiness
```
