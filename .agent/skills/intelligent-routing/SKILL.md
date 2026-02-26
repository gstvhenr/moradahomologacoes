---
name: intelligent-routing
description: Selecao automatica de agente e roteamento inteligente de tarefas para . Analisa pedidos do usuario e seleciona automaticamente o(s) melhor(es) agente(s) especialista(s).
version: 1.0.0
---

# Intelligent Agent Routing —

**Purpose**: Analisar cada request e rotear para o agente mais adequado automaticamente.

## Agentes Disponíveis (14 ativos)

| Agente                   | Domínio                        | Gatilhos                                  |
| ------------------------ | ------------------------------ | ----------------------------------------- |
| `orchestrator`           | Coordenação multi-domínio      | "comprehensive", "multi-perspective"      |
| `frontend-specialist`    | React, componentes, UI         | "component", "react", "css", "tailwind"   |
| `backend-specialist`     | Services, IndexedDB            | "service", "storage", "indexeddb", "data" |
| `database-architect`     | Schema IndexedDB               | "schema", "store", "migration"            |
| `test-engineer`          | Next.jsst, fixtures, cobertura | "test", "coverage", "Next.jsst"           |
| `qa-automation-engineer` | Playwright, E2E                | "playwright", "e2e", "smoke"              |
| `debugger`               | Bugs runtime, TS errors        | "error", "bug", "not working"             |
| `performance-optimizer`  | Re-renders, bundle Next.js     | "slow", "optimize", "re-render"           |
| `security-auditor`       | XSS, OWASP, dados financeiros  | "security", "vulnerability", "xss"        |
| `devops-engineer`        | Gates, verify, CI              | "deploy", "ci", "verify", "build"         |
| `code-archaeologist`     | Refatorações legado            | "refactor", "legacy", "cleanup"           |
| `explorer-agent`         | Auditoria de codebase          | "explore", "audit", "map", "overview"     |
| `project-planner`        | Planos de feature              | "plan", "roadmap", "task-slug"            |
| `documentation-writer`   | JSDoc, ADRs, NEXT.md           | "docs", "jsdoc", "adr", "readme"          |

---

## Agent Selection Matrix

| User Intent       | Keywords                                          | Selected Agent(s)        | Auto-invoke? |
| ----------------- | ------------------------------------------------- | ------------------------ | ------------ |
| **UI Component**  | "button", "card", "layout", "style", "componente" | `frontend-specialist`    | ✅ YES       |
| **Service/Logic** | "service", "storage", "indexeddb", "data layer"   | `backend-specialist`     | ✅ YES       |
| **Bug Fix**       | "error", "bug", "not working", "quebrado"         | `debugger`               | ✅ YES       |
| **Test**          | "test", "coverage", "unit", "Next.jsst"           | `test-engineer`          | ✅ YES       |
| **E2E**           | "playwright", "e2e", "smoke", "fluxo"             | `qa-automation-engineer` | ✅ YES       |
| **Performance**   | "slow", "optimize", "re-render", "bundle"         | `performance-optimizer`  | ✅ YES       |
| **Security**      | "security", "xss", "vulnerability"                | `security-auditor`       | ✅ YES       |
| **Deploy/Gates**  | "verify", "ci", "build", "deploy"                 | `devops-engineer`        | ✅ YES       |
| **Refactor**      | "refactor", "cleanup", "legado"                   | `code-archaeologist`     | ✅ YES       |
| **Planning**      | "plan", "feature", "roadmap"                      | `project-planner`        | ⚠️ ASK FIRST |
| **Multi-domain**  | 2+ domínios detectados                            | `orchestrator`           | ⚠️ ASK FIRST |

---

## Complexity Assessment

| Level        | Criteria                              | Action                              |
| ------------ | ------------------------------------- | ----------------------------------- |
| **SIMPLE**   | 1 arquivo, 1 domínio claro            | Auto-invoke agente direto           |
| **MODERATE** | 2-3 arquivos, max 2 domínios          | Auto-invoke agentes sequencialmente |
| **COMPLEX**  | Multi-domínio, decisões arquiteturais | `orchestrator` → Socratic Gate      |

---

## Response Format (OBRIGATÓRIO)

```markdown
🤖 **Applying knowledge of `@[agent-name]`...**

[Continue com resposta especializada]
```

---

## Regras

1. **Análise silenciosa** — não anuncie "estou analisando"
2. **Informe o agente** — usuário deve ver qual expertise é aplicada
3. **Não bypassa o Socratic Gate** — tasks complexas sempre pedem esclarecimento
4. **Override explícito** — se usuário menciona `@agente`, use-o
