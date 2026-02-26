---
description: Display agent and project status. Progress tracking and status board.
---

# /status - Exibir Status do Projeto

$ARGUMENTS

---

## Task

Exibir status atual do projeto e dos agentes em atividade.

### O que Exibir

1. **Info do Projeto**
   - Nome, stack, tamanho
   - Domínios detectados em `src/services/`

2. **Status dos Gates**
   - Último resultado conhecido de `npm run lint && npm run build`
   - Cobertura de testes

3. **Tarefas Ativas**
   - Arquivo de plano aberto (`{task-slug}.md`)
   - Próximos itens de `NEXT.md`

4. **Status do Preview**
   - Servidor em `http://localhost:5173`
   - Health check

---

## Exemplo de Output

```text
=== Status —  ===

📁 Projeto:  (Beta)
🏷️ Stack: React 19 · Next.js · TypeScript 5.8 · TailwindCSS 4.4
💾 Storage: IndexedDB (src/services/)

🔧 Domínios detectados:
   • Projetos       (src/services/projectService.ts)
   • Propostas      (src/services/proposalService.ts)
   • Clientes       (src/services/clientService.ts)
   • Financeiro     (src/services/financialService.ts)

✅ Gates:
   • npm run lint && npm run build → Último: PENDENTE (rode para atualizar)
   • Cobertura: ≥ 60% (gate configurado)

📄 Plano Ativo: (nenhum)
📋 NEXT.md: 3 itens pendentes

=== Preview ===
🌐 http://localhost:5173
💚 npm run dev para iniciar
```

---

## Técnico

Status usa os scripts:

```bash
# Info do projeto (stack, domínios, arquivos)
python .agent/scripts/session_manager.py info

# Status do preview
python .agent/scripts/auto_preview.py status
```

Ou via npm:

```bash
npm run lint && npm run build   # Gates completos
npm run dev      # Iniciar preview
```

---

## Exemplos de Uso

```text
/status
/status gates
/status preview
```
