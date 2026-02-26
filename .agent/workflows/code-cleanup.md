---
description: Limpeza incremental de código. Auditoria, eliminação de dead code, melhoria de nomenclatura e governança sem refactor big-bang.
---

# Workflow - Code Cleanup

// turbo-all

## Pré-flight (obrigatório)

1. Ler `CONTEXT.md`, `AGENTS.md`, `ARCHITECTURE.md`, `NEXT.md`.
2. Ler `.agent/state/handoff.md` e `docs/agent/lessons-learned.md`.
3. Rodar baseline: `npm run lint && npm run build`.
4. Verificar `git status` — registrar se worktree está sujo.

## Regras de Escopo

- **3-5 arquivos** por mudança (salvo justificativa).
- Uma mudança verificável por sessão.
- Sem novas dependências sem aprovação.
- Sem alterar configs sensíveis (`tsconfig*`, `next.config.ts`, `eslint.config.*`) sem justificativa e gate verde.
- Sem modificar regra de negócio — apenas estrutura/legibilidade.

## Execução

1. Isolar a intenção: tipo de limpeza (nomenclatura, dead code, acoplamento, layout, contratos).
2. Escolher **1 hot spot** por sessão.
3. Aplicar refactor incremental mecânico.
4. Atualizar imports/exports residuais no mesmo diff.
5. Se houver mudança estrutural, registrar em `docs/agent/decisions.md`.

## Checklist de Revisão

- [ ] Sem imports/exports residuais
- [ ] Sem `as any` novo
- [ ] Sem código morto (funções não usadas, imports desnecessários)
- [ ] Sem `console.log` de debug
- [ ] Sem TODO/FIXME abandonado
- [ ] Nenhuma mudança estrutural sem registro em decisions.md

## Gate Final (Definition of Done)

```bash
npm run lint && npm run build
```

- Gate verde obrigatório.
- `NEXT.md` atualizado.
- Se mudou interface/contrato: `docs/data-contracts/types-contracts.md` atualizado.
- Se houve falha: registrar em `docs/agent/lessons-learned.md`.

## Princípios de Limpeza

> Referência completa: skill `clean-code`

- Código óbvio e direto > truques "inteligentes"
- Nomes descritivos: `calculateMonthlyBalance` não `utils2`
- Zero magic strings — usar constantes nomeadas
- Funções curtas com poucos ramos de decisão
- Coesão alta por arquivo (Single Responsibility)
- Sem dependência circular
