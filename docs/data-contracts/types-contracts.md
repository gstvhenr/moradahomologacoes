# types-contracts.md — Contratos de Dados

> Documentação de tipos e interfaces do domínio. Fonte de verdade: `src/types/index.ts`.

---

## Entidades do Domínio

### HomologationTask

Representa uma tarefa de homologação/cadastro de um cliente.

```typescript
interface HomologationTask {
  id: string; // UUID gerado via crypto.randomUUID()
  clientName: string; // Nome do cliente/empresa
  status: HomologationStatus; // Status atual do processo
  deadline: string; // Data limite (ISO 8601, ex: "2026-03-10")
  followUpDate: string; // Data de follow-up
  checklist: ChecklistItem[]; // Itens de checklist documentais
  history: Interaction[]; // Histórico de interações/timeline
  notes: string; // Notas livres do operador
  priority: TaskPriority; // Prioridade: low | medium | high (default: medium)
}
```

**Persistência**: localStorage, chave `homologation-tasks`.

---

### CarrierDocument

Documento da transportadora (contrato, certidões, apólices).

```typescript
interface CarrierDocument {
  id: string; // UUID
  name: string; // Nome do documento
  category: string; // Categoria: Societário | Fiscal | Trabalhista | Operacional | Seguros | Outros
  expirationDate: string; // Data de validade (ISO 8601, vazio se não expira)
  status: DocumentStatus; // Valid | Expired | Pending
  notes: string; // Observações
}
```

**Persistência**: localStorage, chave `carrier-documents`.

---

### ChecklistItem

Item individual do checklist de uma homologação.

```typescript
interface ChecklistItem {
  id: string; // UUID
  title: string; // Título do item (ex: "Enviar Contrato Social")
  status: ChecklistStatus; // Status do item
  responsible: string; // Setor/responsável (ex: "Comercial", "Fiscal")
  subtasks?: Subtask[]; // Sub-tarefas opcionais
}
```

---

### Subtask

Sub-tarefa de um item de checklist.

```typescript
interface Subtask {
  id: string;
  title: string;
  status: ChecklistStatus;
}
```

---

### Interaction

Registro de histórico/timeline de uma homologação.

```typescript
interface Interaction {
  id: string;
  date: string; // ISO 8601 com timestamp
  description: string; // Descrição da interação
}
```

---

## Enums / Union Types

### HomologationStatus

```typescript
type HomologationStatus =
  | "Not Started"
  | "In Progress"
  | "Waiting on Client"
  | "Approved"
  | "Rejected";
```

**Fluxo**: `Not Started → In Progress → Waiting on Client → Approved | Rejected`

### TaskPriority

```typescript
type TaskPriority = "low" | "medium" | "high";
```

**Default**: `'medium'` (atribuído automaticamente na criação)

### ChecklistStatus

```typescript
type ChecklistStatus =
  | "NotStarted"
  | "Pending"
  | "Sent"
  | "WaitingOtherSector"
  | "Done";
```

**Fluxo**: `NotStarted → Pending → Sent → WaitingOtherSector → Done`

### DocumentStatus

```typescript
type DocumentStatus = "Valid" | "Expired" | "Pending";
```

---

## Regras de Contrato

1. **Todo novo tipo** deve ser adicionado em `src/types/index.ts` E documentado aqui.
2. **Mudanças de shape** devem atualizar este arquivo, fixtures (`src/lib/mockData.ts`), e os componentes consumidores.
3. **IDs** são sempre `string` via `crypto.randomUUID()`.
4. **Datas** são sempre `string` em formato ISO 8601.
5. **Sem valores nulos**: usar string vazia `''` em vez de `null` para campos opcionais.
