# Lessons Learned — Agent-First

> Registro de falhas reais e prevenções específicas do sistema agent-first.
> Formato obrigatório: Sintoma → Causa → Reprodução → Correção → Prevenção.

## Protocolo

- Quando um erro é encontrado e corrigido, documentar aqui.
- Quando o mesmo padrão se repetir 3+ vezes, promover a regra permanente.
- Ler este arquivo no Boot Sequence de toda execução do agent-first-architect.

---

## Entradas

### [2026-02-24] — [BUILD] — Next.js App Router Directory Structure Não Configurada

**Sintoma**: `npm run build` falha com `Couldn't find any 'pages' or 'app' directory`.
**Causa provável**: `src/layout.tsx`, `src/page.tsx` e `src/globals.css` estão diretamente em `src/` em vez de `src/app/`. Next.js 15 App Router exige que esses arquivos estejam em `src/app/` ou `app/`.
**Como reproduzir**: Executar `npm run build`.
**Correção**: Mover os 3 arquivos de `src/` para `src/app/` e ajustar imports relativos.
**Prevenção**: Ao configurar Next.js App Router, sempre verificar que `layout.tsx` está dentro de `app/` ou `src/app/`. Adicionar verificação no Boot Sequence.

---

### [2026-02-24] — [RESEARCH] — Perplexity API Indisponível (401)

**Sintoma**: Chamadas ao MCP Perplexity Ask (deep_research e search) retornam erro 401 (auth error).
**Causa provável**: Token de API expirado ou não configurado no ambiente atual.
**Como reproduzir**: Invocar `mcp_perplexity-ask_search` ou `mcp_perplexity-ask_deep_research`.
**Correção**: Usar `search_web` como fallback para pesquisa externa.
**Prevenção**: Sempre verificar disponibilidade do Perplexity no Boot Sequence. Documentar limitação no handoff. Ter fallback definido no protocolo de pesquisa.

---

## Nunca Repetir

| Padrão                              | Prevenção                                                     |
| ----------------------------------- | ------------------------------------------------------------- |
| Pesquisar sem registrar resultados  | Sempre atualizar research.md (mesmo sem achados úteis)        |
| Esquecer o handoff ao fim da rodada | Checklist de qualidade obrigatório antes de finalizar         |
| Depender do chat para continuidade  | Toda informação relevante vai para handoff.md                 |
| Aplicar prática nova sem validação  | Sequential Thinking obrigatório antes de mudanças estruturais |

---

> **Formato para novas entradas**:
>
> ### [DATA] — [CATEGORIA] — [TÍTULO CURTO]
>
> **Sintoma**: [O que aconteceu visivelmente]
> **Causa provável**: [Por que aconteceu]
> **Como reproduzir**: [Passos para reproduzir]
> **Correção**: [O que foi feito para resolver]
> **Prevenção**: [Teste/regra/script/guardrail para evitar recorrência]
