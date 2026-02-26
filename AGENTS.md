# AGENTS.md — Contrato Canônico de Agentes

> Regras obrigatórias para TODOS os agentes que operam neste projeto.

---

## Gate de Verificação (Obrigatório)

```bash
npm run lint && npm run build
```

**Nenhuma tarefa é considerada completa sem gate verde.**

## Regras Globais

1. **Não modificar sem entender**: Ler `ARCHITECTURE.md` e `CONTEXT.md` antes de qualquer mudança.
2. **Sem novas dependências** sem aprovação explícita do usuário.
3. **Sem big-bang refactors**: Mudanças incrementais e reversíveis.
4. **Código limpo**: Seguir as regras de `clean-code` skill (sem comentários óbvios, nomes descritivos).
5. **TypeScript strict**: Sem `any`, sem `@ts-ignore`, sem cast inseguro.
6. **Escopo respeitado**: Não expandir além do solicitado. Registrar extras em `NEXT.md`.

## Estrutura de Agentes

Detalhes completos em [agents-index.md](.agent/agents/agents-index.md).

| Categoria          | Qtd | Exemplos                                                                           |
| ------------------ | --- | ---------------------------------------------------------------------------------- |
| Core / Arquitetura | 5   | orchestrator, project-planner, explorer, agent-first-architect, code-archaeologist |
| Desenvolvimento    | 3   | frontend-specialist, backend-specialist, database-architect                        |
| Qualidade          | 4   | test-engineer, qa-automation, debugger, performance-optimizer                      |
| Segurança          | 1   | security-auditor                                                                   |
| Operações          | 1   | devops-engineer                                                                    |
| Documentação       | 1   | documentation-writer                                                               |

## Persistência de Contexto

| Arquivo                         | Propósito                  | Atualização                       |
| ------------------------------- | -------------------------- | --------------------------------- |
| `.agent/state/handoff.md`       | Continuidade entre sessões | Obrigatória ao fim de cada rodada |
| `docs/agent/decisions.md`       | Decisões arquiteturais     | Quando houver decisão relevante   |
| `docs/agent/lessons-learned.md` | Registro de falhas         | Quando houver falha ou risco      |
| `docs/agent/research.md`        | Pesquisa externa           | Quando houver pesquisa            |

## Como Começar

1. Ler `CONTEXT.md` (orientação rápida)
2. Ler `ARCHITECTURE.md` (estrutura e domínio)
3. Ler `.agent/state/handoff.md` (onde parou a última sessão)
4. Verificar `NEXT.md` (próximos passos priorizados)
5. Executar gate: `npm run lint && npm run build`
