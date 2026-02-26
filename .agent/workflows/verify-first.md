---
description: Fluxo verify-first — implementar, verificar, corrigir, repetir até gate verde.
---

# Workflow - Verify First

// turbo-all

1. Entender escopo da mudança.
2. Implementar em small diff.
3. Rodar gate canônico: `npm run lint && npm run build`.
4. Se falhar, ler saída do gate e identificar o erro.
5. Aplicar fix mínimo para o gate que falhou.
6. Reexecutar gate e repetir passos 4-5 até verde.
7. Rodar CI gate antes do handoff final.
8. Se um erro foi corrigido, registrar em `docs/agent/lessons-learned.md`.
9. Se o mesmo padrão aparecer 3+ vezes, propor promoção a regra em MEMORY rules.
10. Atualizar `NEXT.md` e `docs/agent/decisions.md` se mudança for estrutural.
