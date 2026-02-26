# Benchmark de Autonomia Agent-First

> Cenários de referência para medir a capacidade do sistema de agent-first development.
> Atualizado: 2026-02-24

---

## Metodologia

### Métricas

| Métrica                 | Sigla | Definição                             |
| ----------------------- | ----- | ------------------------------------- |
| Task Completion Rate    | TCR   | % de tarefas concluídas sem falha     |
| Human Intervention Rate | HIR   | Nº de intervenções humanas por tarefa |
| Time to Complete        | TTC   | Tempo total da tarefa                 |
| Gate Pass Rate          | GPR   | % de gates verdes na 1ª tentativa     |

### Regras de Execução

1. Cada benchmark deve ser executado em **sessão nova** (sem contexto do chat)
2. O agente deve usar apenas o Boot Sequence para se orientar
3. Intervenção humana = qualquer prompt do usuário que não seja "prossiga"
4. Gate = `npm run lint && npm run build`

---

## Nível 1 — Básico

### Cenário 1.1 - Bug Fix Simples

**Objetivo**: Dado um erro de lint, localizá-lo e corrigi-lo sem interação humana.

| Item              | Detalhe                                                              |
| ----------------- | -------------------------------------------------------------------- |
| **Setup**         | Introduzir um erro de lint (ex: variável não usada) em um componente |
| **Input**         | "Corrija o erro de lint no projeto"                                  |
| **Critério PASS** | Erro corrigido + `npm run lint && npm run build` verde               |
| **Critério FAIL** | Agente pede ajuda ou não corrige em 3 tentativas                     |
| **TCR esperado**  | 100%                                                                 |
| **HIR esperado**  | 0                                                                    |

### Cenário 1.2 - Adicionar Campo a Type

**Objetivo**: Adicionar um campo a um type existente e propagar para fixtures + contracts.

| Item              | Detalhe                                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Setup**         | Nenhum (usar estado atual do projeto)                                                                                            |
| **Input**         | "Adicione o campo `priority: 'low' \| 'medium' \| 'high'` ao tipo `HomologationTask` e propague para mockData e types-contracts" |
| **Critério PASS** | Campo adicionado em `src/types/index.ts` + `src/lib/mockData.ts` + `docs/data-contracts/types-contracts.md` + gate verde         |
| **Critério FAIL** | Propagação incompleta ou gate vermelho                                                                                           |
| **TCR esperado**  | 100%                                                                                                                             |
| **HIR esperado**  | 0                                                                                                                                |

---

## Nível 2 — Intermediário

### Cenário 2.1 - Criar Componente a Partir de Descrição

**Objetivo**: Dado um design descrito em texto, criar um componente React completo.

| Item              | Detalhe                                                                               |
| ----------------- | ------------------------------------------------------------------------------------- |
| **Input**         | "Crie um componente `StatusFilter` que filtre homologações por status com checkboxes" |
| **Critério PASS** | Componente funcional + tipado + estilizado com TailwindCSS + gate verde               |
| **Critério FAIL** | Erros de tipo, sem estilização, ou gate vermelho                                      |
| **TCR esperado**  | 90%+                                                                                  |
| **HIR esperado**  | ≤1                                                                                    |

### Cenário 2.2 - Refactoring Guiado

**Objetivo**: Extrair lógica duplicada em hook customizado.

| Item              | Detalhe                                                                                |
| ----------------- | -------------------------------------------------------------------------------------- |
| **Input**         | "Extraia a lógica de criação de tarefa e documento de `page.tsx` para hooks dedicados" |
| **Critério PASS** | Hooks extraídos + page.tsx simplificado + sem regressão + gate verde                   |
| **Critério FAIL** | Lógica incorreta ou regressão visual                                                   |
| **TCR esperado**  | 85%+                                                                                   |
| **HIR esperado**  | ≤2                                                                                     |

---

## Nível 3 — Avançado

### Cenário 3.1 - Feature End-to-End

**Objetivo**: Receber um PRD, gerar TechSpec, implementar service + UI + testes, passar gates.

| Item              | Detalhe                                                                             |
| ----------------- | ----------------------------------------------------------------------------------- |
| **Input**         | PRD: "Adicionar funcionalidade de exportar homologações como CSV"                   |
| **Critério PASS** | TechSpec gerado + service implementado + UI com botão + teste unitário + gate verde |
| **Critério FAIL** | Qualquer etapa incompleta                                                           |
| **TCR esperado**  | 70%+                                                                                |
| **HIR esperado**  | ≤3                                                                                  |

---

## Baseline Atual

| Cenário              | Status           | TCR | HIR | Notas                 |
| -------------------- | ---------------- | --- | --- | --------------------- |
| 1.1 Bug Fix          | ⏳ Não executado | —   | —   | Infraestrutura pronta |
| 1.2 Adicionar Campo  | ⏳ Não executado | —   | —   | Infraestrutura pronta |
| 2.1 Criar Componente | ⏳ Não executado | —   | —   | —                     |
| 2.2 Refactoring      | ⏳ Não executado | —   | —   | —                     |
| 3.1 Feature E2E      | ⏳ Não executado | —   | —   | —                     |

---

## Log de Execuções

### Execução 1 — 2026-02-24

| Cenário             | Resultado | TCR  | HIR | TTC   | Notas                                                                                                                                                                        |
| ------------------- | --------- | ---- | --- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.2 Adicionar Campo | **PASS**  | 100% | 0   | ~3min | Campo `priority: TaskPriority` adicionado a `src/types/index.ts`, propagado para `src/lib/mockData.ts`, `src/lib/useHomologationTasks.ts`, `types-contracts.md`. Gate verde. |

> Cenário 1.1 não executado: requer sessão nova com lint error pré-introduzido.

```text
Formato:
- Data: YYYY-MM-DD
- Cenário: X.X
- Resultado: PASS/FAIL
- TCR: X%
- HIR: N
- TTC: Xmin
- Notas: ...
```
