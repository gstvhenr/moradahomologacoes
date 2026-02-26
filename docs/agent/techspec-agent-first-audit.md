# TechSpec: Primeira Auditoria Agent-First Readiness

> **Agente**: `agent-first-architect`
> **Data**: 2026-02-24
> **Modo**: APENAS ESPECIFICAÇÃO TÉCNICA (TechSpec) — SEM CÓDIGO

---

## Contexto

O `agent-first-architect` foi criado na sessão anterior com toda a infraestrutura de memória persistente (handoff, decisions, lessons-learned, research). Esta é a **primeira rodada de auditoria real** das 12 dimensões de agent-first readiness, conforme definido no agente.

### Pesquisa Realizada

**Fonte**: 3 queries via `search_web` (Perplexity indisponível — 401)

Principais achados:

| Achado                                             | Fonte                            | Impacto                                                       |
| -------------------------------------------------- | -------------------------------- | ------------------------------------------------------------- |
| Context Engineering > Prompt Engineering           | IBM, Anthropic, múltiplas fontes | ARCHITECTURE.md é o arquivo mais importante para autonomia    |
| Layered Memory (STM + LTM + Shared)                | IBM, mem0.ai, Redis              | Já implementado ✅ (handoff + decisions + lessons + research) |
| A2A Protocol (Google, 2025)                        | deeplearning.ai                  | Não aplicável ainda (projeto único)                           |
| MCP como padrão de integração de tools             | Cisco, dev.to                    | Já implementado ✅                                            |
| Task Completion Rate como métrica de autonomia     | machinelearningmastery.com       | Adotar como KPI para benchmarks                               |
| Human Intervention Rate                            | plainenglish.io                  | Adotar como KPI secundário                                    |
| "Docs desatualizados são piores que docs ausentes" | research.md existente            | Reforça urgência do ARCHITECTURE.md                           |
| Multi-agent orchestration patterns                 | LangChain, onabout.ai            | Já temos 16 agentes com orquestrador ✅                       |

---

## Audit Scorecard — 12 Dimensões

| #   | Dimensão                   | Status     | Evidência                                      | Ação          |
| --- | -------------------------- | ---------- | ---------------------------------------------- | ------------- |
| 1   | **Legibilidade para IA**   | ❌ FAIL    | ARCHITECTURE.md não existe                     | P0: Criar     |
| 2   | **Continuidade**           | ✅ PASS    | handoff.md com YAML estruturado                | Manter        |
| 3   | **Verificação automática** | ✅ PASS    | `npm run lint && npm run build`                | Manter        |
| 4   | **Memória de falhas**      | ✅ PASS    | lessons-learned.md (2 níveis)                  | Manter        |
| 5   | **Decisões rastreáveis**   | ✅ PASS    | decisions.md com 2 ADRs                        | Manter        |
| 6   | **Pesquisa registrada**    | ✅ PASS    | research.md com 3 entradas                     | Atualizar     |
| 7   | **Workflows cobertos**     | ⚠️ PARTIAL | 20+ workflows existem, freshness desconhecida  | P1: Auditar   |
| 8   | **Skills atualizadas**     | ⚠️ PARTIAL | 16 skills existem, última revisão desconhecida | P1: Auditar   |
| 9   | **Agentes especializados** | ✅ PASS    | 16 agentes com domains claros                  | Manter        |
| 10  | **Contratos explícitos**   | ⚠️ PARTIAL | types-contracts.md não localizado em docs/     | P2: Verificar |
| 11  | **Cenários de referência** | ❌ FAIL    | Nenhum benchmark executado                     | P1: Executar  |
| 12  | **Onboarding zero**        | ❌ FAIL    | Sem ARCHITECTURE.md, onboarding quebrado       | P0: Criar     |

**Score**: 6/12 PASS | 3/12 PARTIAL | 3/12 FAIL

---

## Proposed Changes

### P0 — Crítico (Bloqueia Autonomia LLM)

---

#### [NEW] [ARCHITECTURE.md](file:///c:/Users/gustavo.geraldo/Documents/08.%20gerenciador-de-homologacao/ARCHITECTURE.md)

Arquivo de arquitetura do projeto, legível para IA, na **raiz** do projeto.

**Conteúdo mínimo**:

- Stack técnico (React 19 + Next.js 15 App Router + TS strict + TailwindCSS 4)
- Estrutura de diretórios com propósito de cada pasta
- Camadas arquiteturais (UI → Services → Storage)
- Convenções de nomenclatura
- Gate de verificação canônico
- Ponteiro para agents-index.md e docs/

**Critério de sucesso**: Uma LLM nova entende a arquitetura em < 5 min de leitura.

---

#### [NEW] [CONTEXT.md](file:///c:/Users/gustavo.geraldo/Documents/08.%20gerenciador-de-homologacao/CONTEXT.md)

Quick-start para onboarding de agentes. Referenciado nas regras `nexusarqui.md` mas inexistente.

**Conteúdo mínimo**:

- Nome do projeto e propósito (ERP de gerenciamento de homologação)
- Estado atual (offline-first, IndexedDB/SQLite)
- Próximos passos estratégicos (link para NEXT.md quando criado)
- Arquivos essenciais para ler primeiro (Boot Sequence)

---

#### [NEW] [NEXT.md](file:///c:/Users/gustavo.geraldo/Documents/08.%20gerenciador-de-homologacao/NEXT.md)

Backlog priorizado de próximos passos. Referenciado nas regras `nexusarqui.md` mas inexistente.

**Conteúdo mínimo**:

- Tarefas pendentes (extraídas do handoff.md + próximos passos)
- Decisões a tomar
- Débitos técnicos conhecidos

---

### P1 — Alto (Melhora Autonomia Significativamente)

---

#### [NEW] [AGENTS.md](file:///c:/Users/gustavo.geraldo/Documents/08.%20gerenciador-de-homologacao/AGENTS.md)

Contrato canônico de agentes na raiz. Referenciado em `nexusarqui.md` mas inexistente.

**Conteúdo**:

- Gate de verificação canônico (`npm run lint && npm run build`)
- Regras globais de todos os agentes
- Ponteiro para `.agent/agents/agents-index.md` (detalhes)

> **Nota**: NÃO duplicar o conteúdo de agents-index.md. Apenas referenciar.

---

#### [MODIFY] [research.md](file:///c:/Users/gustavo.geraldo/Documents/08.%20gerenciador-de-homologacao/docs/agent/research.md)

Adicionar achados desta rodada de pesquisa (3 queries via search_web).

---

#### Auditoria de Skills (análise — sem modificação)

Verificar data de última atualização e relevância de cada skill em `.agent/skills/`.
Resultado registrado em handoff.md para ação futura.

---

#### Benchmark Nível 1 — Primeira Medição

Executar os 2 cenários Nível 1 definidos no agente:

1. **Bug fix simples**: Simular erro de lint e medir se resolve sem interação
2. **Adicionar campo**: Adicionar campo a type e propagar para fixtures

Métricas a coletar:

- Task Completion Rate (TCR)
- Human Intervention Rate (HIR)

> **Nota**: Estes benchmarks serão **planejados** agora e **executados** em rodada futura via `/enhance`.

---

### P2 — Médio (Mantém Qualidade)

---

#### Auditoria de Workflows (análise — sem modificação)

Verificar cobertura e freshness dos 20+ workflows em `.agent/workflows/`.

---

#### Verificação de Contratos (análise — sem modificação)

Localizar e verificar se `types-contracts.md` ou equivalente existe em `docs/data-contracts/`.

---

## 🗺️ Mapa de Impacto — Arquivos Afetados

| Arquivo                   | Ação                                          | Prioridade  |
| ------------------------- | --------------------------------------------- | ----------- |
| `ARCHITECTURE.md` (raiz)  | [NEW] Criar                                   | P0          |
| `CONTEXT.md` (raiz)       | [NEW] Criar                                   | P0          |
| `NEXT.md` (raiz)          | [NEW] Criar                                   | P0          |
| `AGENTS.md` (raiz)        | [NEW] Criar                                   | P1          |
| `docs/agent/research.md`  | [MODIFY] Adicionar achados                    | P1          |
| `.agent/state/handoff.md` | [MODIFY] Atualizar com resultado da auditoria | Obrigatório |

**Total**: 4 arquivos novos + 2 modificados = **6 pontos de contato**

> ⚠️ **Nenhum arquivo de negócio (`src/`) será alterado.** Escopo limitado a infraestrutura agent-first.

---

## Dependências

- **Nenhuma nova dependência** de `package.json`
- **Nenhuma ferramenta nova** necessária
- **Perplexity MCP**: Indisponível (401) — documentado em lessons-learned

---

## Verificação

### Gate Canônico

```bash
npm run lint && npm run build
```

### Validações Adicionais

- [ ] Markdown estruturalmente correto (sem erros de formatação)
- [ ] handoff.md segue formato YAML esperado
- [ ] Nenhum arquivo fora do escopo alterado
- [ ] research.md atualizado com achados desta rodada
- [ ] Todos os 4 novos arquivos existem e são legíveis

---

## Estimativa

| Fase                                | Esforço              |
| ----------------------------------- | -------------------- |
| P0 (ARCHITECTURE + CONTEXT + NEXT)  | 1 rodada de execução |
| P1 (AGENTS + research + auditorias) | 1 rodada de execução |
| P2 (workflows + contracts check)    | 1 rodada de análise  |
| **Total**                           | **~3 rodadas**       |

---

## Próximos Passos

```text
[OK] TechSpec mapeada: techspec-agent-first-audit.md

### 🗺️ Pontos de Contato Identificados:
- ARCHITECTURE.md [NEW]
- CONTEXT.md [NEW]
- NEXT.md [NEW]
- AGENTS.md [NEW]
- docs/agent/research.md [MODIFY]
- .agent/state/handoff.md [MODIFY]
- (Total de 6 arquivos mapeados)

Próximos passos:
- Revise as assinaturas arquiteturais mapeadas no plano.
- Acione `/enhance` (com ou sem o slug) para iniciarmos a execução, arquivo por arquivo.
```
