# Decisões Arquiteturais — Agent-First

> Registro de decisões arquiteturais e de fluxo do sistema agent-first.
> Formato: Contexto → Alternativas → Critério → Escolha → Consequências.

---

## DEC-001: Estrutura de Memória Persistente (2026-02-24)

**Contexto**: LLMs perdem todo o contexto ao fechar o programa ou iniciar nova conversa. Sem memória persistente, cada sessão começa do zero, repetindo erros e desfazendo progresso.

**Alternativas analisadas**:

1. **Arquivo único de estado** (.agent/state.md) — simples mas sem separação de concerns
2. **Banco de dados SQLite** — robusto mas overhead para metadata de agentes
3. **Arquivos separados por tipo** (handoff + decisions + lessons + research) — boa separação, fácil de ler para LLMs

**Critério**: Maximizar legibilidade para LLMs + minimizar overhead + permitir rotação de entries.

**Escolha**: Opção 3 — Arquivos separados por tipo de memória.

**Consequências**:

- (+) Cada arquivo tem propósito claro e formato específico
- (+) LLMs podem ler seletivamente (boot sequence otimizado)
- (+) Rotação fácil no handoff.md (manter apenas 10 últimas)
- (-) Manutenção de 4 arquivos em vez de 1
- (-) Possível drift entre arquivos (mitigado pelo checklist de qualidade)

---

## DEC-002: Agent como Meta-Agente (2026-02-24)

**Contexto**: Precisamos de um mecanismo que evolua continuamente o projeto para agent-first. Deve ser um agente que melhora os outros agentes.

**Alternativas analisadas**:

1. **Workflow personalizado** (/agent-first) — limitado a passos fixos
2. **Regra no GEMINI.md** — não tem identidade/persona
3. **Agente dedicado** (agent-first-architect) — persona, skills, boot sequence, memória própria

**Critério**: Maximizar capacidade de evolução contínua + manter o padrão existente de agentes.

**Escolha**: Opção 3 — Agente dedicado com workflow complementar.

**Consequências**:

- (+) Segue o padrão dos 15 agentes existentes
- (+) Pode ser invocado via routing automático ou slash command
- (+) Tem persona clara e anti-patterns definidos
- (-) Mais um agente para manter (mitigado: ele se auto-mantém)

---

> **Formato para novas decisões**:
>
> ## DEC-XXX: [Título] (YYYY-MM-DD)
>
> **Contexto**: [Por que essa decisão é necessária]
> **Alternativas analisadas**: [Lista numerada]
> **Critério**: [Como avaliamos]
> **Escolha**: [Qual alternativa + justificativa]
> **Consequências**: [Positivas (+) e negativas (-)]
