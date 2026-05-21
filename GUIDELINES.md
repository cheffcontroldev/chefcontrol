# ChefControl — Development Guidelines and Rules

> Applicable to all project code.
> Stack: React + TypeScript + Vite + Tailwind CSS + TanStack Query + Zustand + Supabase

---

## 1. SOLID Principles (Applied to React)

| Principle | Concrete Rule in ChefControl |
|---|---|
| **S — Single Responsibility** | One component = one reason to change. If a form grows beyond 150 lines, split into sub-components. A hook must not handle UI + API + validation simultaneously. |
| **O — Open/Closed** | Extend behavior without modifying existing code. E.g., an action button extends via props, not by copy-pasting the component for each case. |
| **L — Liskov Substitution** | Child components must be able to replace the parent without breaking the UI. E.g., a specialized `SubmitButton` must accept all props of the base `Button`. |
| **I — Interface Segregation** | Do not request props you do not use. A component that only displays text should not receive the entire `Product` object, only `name` and `stock`. |
| **D — Dependency Inversion** | Components depend on abstractions, not implementations. E.g., the `useProducts` hook does not import `supabase` directly; it uses `features/products/api.ts`. |

---

## 2. Clean Architecture (Applied to Features)

### Dependency Structure

```
┌─────────────────────────────────────────┐
│  4. UI (Components)                     │
│     Only render. Receive props.         │
│     Do not know about Supabase.         │
├─────────────────────────────────────────┤
│  3. Hooks                               │
│     Orchestrate: form state + validation│
│     + call to api.ts.                   │
│     Do not import supabase client.      │
├─────────────────────────────────────────┤
│  2. API (features/[x]/api.ts)           │
│     Single place that talks to Supabase.│
│     Returns domain types.               │
├─────────────────────────────────────────┤
│  1. Supabase Client                     │
│     Infrastructure. Do not touch direct.│
└─────────────────────────────────────────┘
```

### Dependency Rules

| Level | Can import from | CANNOT import from |
|---|---|---|
| **Component** | Hooks, shared/components, shared/lib | `supabase/client.ts`, `features/other/api.ts` |
| **Hook** | Same-feature API, stores, shared/lib | Components, `supabase/client.ts` directly |
| **API** | `supabase/client.ts`, shared/types | Components, hooks, stores |
| **Store (Zustand)** | `supabase/client.ts` only for auth init | Components |

---

## 3. Specific Best Practices

### A. Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Components | PascalCase | `ProductCard.tsx` |
| Hooks | camelCase, `use` prefix | `useProducts.ts` |
| API functions | camelCase, verb + entity | `createProduct`, `getLowStock` |
| Types/Interfaces | PascalCase, optional suffix | `Product`, `MovementInput` |
| Type files | `types.ts` inside the feature | `features/products/types.ts` |
| Booleans | `is`, `has`, `should` prefix | `isActive`, `hasStock` |

### B. State Management

| Rule | Example |
|---|---|
| Local state first | `useState` for forms, toggles, temporary filters. |
| Zustand only for global | Sidebar, auth, toasts. Not for API data. |
| TanStack Query for server | Everything from Supabase lives in Query. Not in Zustand. |
| URL for persistent filters | Reports with date range: `?from=2026-05-01&to=2026-05-09`. |

### C. API Calls

| Rule | Rationale |
|---|---|
| Never `supabase.from()` in a component | Always through `features/[x]/api.ts`. |
| Never mutate data in a `useEffect` | Mutations trigger from user action (click, submit). |
| Invalidate cache after mutation | `queryClient.invalidateQueries()` after create/edit/delete. |
| Handle loading and error states | Every `useQuery`/`useMutation` must handle `isLoading`/`isError`. |

### D. Security and Multi-tenancy

| Rule | Rationale |
|---|---|
| Always filter by `restaurante_id` in frontend | Defense in depth, even if RLS exists. |
| Never trust the frontend for business validation | The backend (RPC/RLS) has the final word. |
| Do not expose `service_role_key` | Never in client-side environment variables. |

### E. Components

| Rule | Rationale |
|---|---|
| Destructured props | `function ProductCard({ name, stock }: Props)` |
| Avoid `any` | Strict TypeScript. If you don't know the type, define it. |
| Pure components when possible | Same input = same output. Easy to test. |
| Extract early returns | Avoid deep `if` nesting. |

---

## 4. Golden Rules (Pre-commit Checklist)

- [ ] The component has a single responsibility.
- [ ] No direct API logic in JSX.
- [ ] Types are defined (zero implicit `any`).
- [ ] Mutation invalidates TanStack Query cache.
- [ ] Hook name describes what it does.
- [ ] No debug `console.log`.
- [ ] JSDoc is added for every exported function, component, hook, and type.
- [ ] ESLint and Prettier pass without errors.
- [ ] Commit describes what and why, not just "fix".

---

## 5. Allowed Exceptions (MVP)

| Situation | Exception |
|---|---|
| Unit tests | Not mandatory in MVP. Only for critical logic (FEFO). |
| Over-engineering | If a feature needs 2 lines of code, do not create 3 files. |

---

*Document generated for the ChefControl project. Last updated: 2026-05-20*
