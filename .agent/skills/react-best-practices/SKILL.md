---
name: react-best-practices
description: React 19 + Next.js (App Router) otimizacao de performance para o . Re-renders, bundle, Server Actions, Server/Client components.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# React 19 + Next.js (App Router) Performance —

> **Stack real:** React 19 + Next.js 15 (App Router) + TypeScript strict + TailwindCSS v4 + IndexedDB

---

## 🎯 Quick Decision Tree

```text
🐌 Slow initial load?
  → Server Components (default)
  → Bundle: @next/bundle-analyzer
  → Otimização de imagens: next/image
  → Fontes otimizadas: next/font

🔄 Excessive re-renders?
  → Mova estado para a folha da árvore (Client Components abaixo na árvore)
  → Context decomposition (Apenas onde indispensável)
  → useMemo / useCallback / React.memo

🏗️ Data fetching issues?
  → Server Components fetching (async components)
  → Server Actions para mutação
  → Para Client: React Query ou SWR (ou Fetch direto se trivial)

📦 Large bundle?
  → Mantenha pacotes pesados no Server Component
  → import dynamic() do Next.js para Client Components grandes
```

---

## 1. Server vs Client Components (App Router Boundary)

```tsx
// ❌ ERRADO — 'use client' no topo da hierarquia, transformando tudo em Client Component
'use client'
import HeavyChart from 'heavy-chart-lib'

export default function Dashboard() { ... }

// ✅ CORRETO — 'use client' apenas nas folhas ("Leaves") que precisam de interatividade
// page.tsx (Server Component, sem 'use client')
import ChartWrapper from './ChartWrapper' // ChartWrapper tem 'use client'

export default function Dashboard() {
  return <ChartWrapper data={fetchDataFromServer()} />
}
```

---

## 2. Dynamic Imports (`next/dynamic`)

```tsx
// ❌ ERRADO — importação estática de módulo pesado apenas para Client
import { RelatoriosChart } from "@/components/RelatoriosChart";

// ✅ CORRETO — lazy loading em Client Components via Next.js
import dynamic from "next/dynamic";

const RelatoriosChart = dynamic(() => import("@/components/RelatoriosChart"), {
  ssr: false, // Dependendo da biblioteca (e.g. D3, Recharts) às vezes é necessário
  loading: () => <p>Carregando gráfico...</p>,
});
```

---

## 3. Memoization — React 19 Compiler vs Manual

> **Nota:** Se o React Compiler não estiver ativo configurado, continue usando manual. Assumindo Next.js padrão:

```typescript
// ✅ USE useMemo — cálculo financeiro pesado
const totalRevenue = useMemo(
  () =>
    proposals
      .filter((p) => p.status === "won")
      .reduce((sum, p) => sum + p.value, 0),
  [proposals],
);

// ❌ NÃO USE — operações triviais (mais custo que benefício)
const count = useMemo(() => items.length, [items]); // ERRADO
```

---

## 4. Otimização Específica do Next.js

```tsx
// ❌ ERRADO — tags img nativas
<img src="/logo.png" alt="Logo" />

// ✅ CORRETO — Next.js Image Component
import Image from 'next/image';
<Image src="/logo.png" alt="Logo" width={100} height={50} priority />

// ❌ ERRADO — tag a nativa para rotas internas
<a href="/dashboard">Dashboard</a>

// ✅ CORRETO — Next.js Link
import Link from 'next/link';
<Link href="/dashboard">Dashboard</Link>
```

---

## 5. IndexedDB — Padrões do Projeto (Client-Side)

```typescript
// ATENÇÃO: IndexedDB NÃO FUNCIONA no Server Component do Next.js
// src/services/ é a única camada que acessa IndexedDB, apenas no Client.

// ❌ ERRADO — Tentar acessar no render do Server Component
export default async function Page() {
  const data = await indexedDB.open("nexus"); // VAI QUEBRAR NO BUILD
}

// ✅ CORRETO — Usar Client Component via useEffect ou tRPC/React Query no Client
("use client");
useEffect(() => {
  projectService.getAll().then(setProjects);
}, []);
```

---

## 6. Performance Checklist (antes de PR)

**Crítico:**

- [ ] O componente máximo possível é Server Component (sem `'use client'`)
- [ ] A mutação usa Server Actions (se for banco de dados nativo) ou hooks seguros.
- [ ] `<a>` e `<img>` substituídos por `<Link>` e `<Image>`

**Alto:**

- [ ] Contextos separados por domínio e injetados abaixo na árvore
- [ ] Client Components interativos e pesados usam `dynamic()`

**Médio:**

- [ ] Next Font (`next/font/google` ou `local`) aplicado globalmente em vez de `@import` no CSS.

---

## Anti-Patterns — Específicos

| ❌ Não                            | ✅ Faça                        |
| --------------------------------- | ------------------------------ |
| `'use client'` em `page.tsx`/raiz | Mova p/ a "folha" da árvore    |
| Buscar dados no `useEffect` (SSR) | Buscar no Server Component     |
| Acesso a IndexedDB no Server      | Apenas no Client (`useEffect`) |
| `<a>` para lins internos          | `<Link href="...">`            |
| Tag `<img>` nativa                | `<Image src="...">`            |
