# NEXT.md — Backlog Priorizado

> Próximos passos concretos para o projeto. Atualizado: 2026-02-24.

---

## Em Progresso

- [ ] Executar benchmarks Nível 1 — cenários 1.1 e 1.2 (ver `docs/agent/benchmarks.md`)

## Curto Prazo (Infraestrutura Agent-First)

- [ ] Refatorar `code-cleanup-v1.md` (310 linhas, referências desatualizadas, renomear para `code-cleanup.md`)
- [ ] Executar benchmarks Nível 2 e 3 após baseline estabelecido

## Médio Prazo (Evolução Técnica)

- [ ] Extrair lógica de negócio de `src/app/page.tsx` para camada de services
- [ ] Implementar persistência robusta (IndexedDB ou SQLite) para substituir localStorage
- [ ] Adicionar testes unitários para componentes principais

## Débitos Técnicos Conhecidos

| Débito                                              | Arquivo(s)                  | Severidade |
| --------------------------------------------------- | --------------------------- | ---------- |
| Toda lógica de estado no `page.tsx` (God Component) | `src/page.tsx` (275 linhas) | Alta       |
| `as any` em status de documento                     | `src/page.tsx:70,257`       | Média      |
| Dados mock hardcoded como seed                      | `lib/mockData.ts`           | Baixa      |
| Sem camada de services separada                     | —                           | Alta       |
| useLocalStorage sem tratamento de erro de parsing   | `lib/useLocalStorage.ts`    | Média      |

## Decisões Pendentes

- Migrar de localStorage para IndexedDB ou SQLite?
- Separar componente page.tsx em múltiplos componentes menores?
- Adicionar funcionalidade de documentos na sidebar (atualmente sem acesso direto)?
