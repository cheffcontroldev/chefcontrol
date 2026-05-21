<p align="center">
  <img src="public/favicon.svg" alt="ChefControl" width="80" height="80" />
</p>

<h1 align="center">🍳 ChefControl</h1>

<p align="center">
  <strong>Restaurant Inventory Management System</strong>
  <br />
  A modern, multi-tenant SPA for managing inventory, tracking stock movements, monitoring expiration dates, and generating reports.
</p>

<p align="center">
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white" alt="React 19" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white" alt="TypeScript 6" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white" alt="Vite 8" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Supabase-2.105-3FCF8E?logo=supabase&logoColor=white" alt="Supabase" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/TanStack_Query-5.100-FF4154?logo=reactquery&logoColor=white" alt="TanStack Query" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Zustand-5.0-brown?logo=zustand" alt="Zustand" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Zod-4.4-3E67B1?logo=zod&logoColor=white" alt="Zod" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/DaisyUI-5.5-5A0EF8?logo=daisyui&logoColor=white" alt="DaisyUI" /></a>
  <br />
  <a href="#-getting-started"><img src="https://img.shields.io/badge/pnpm-10.x-F69220?logo=pnpm&logoColor=white" alt="pnpm" /></a>
  <a href="#-scripts"><img src="https://img.shields.io/badge/ESLint-10.2-4B32C3?logo=eslint&logoColor=white" alt="ESLint" /></a>
  <a href="#-scripts"><img src="https://img.shields.io/badge/Prettier-3.8-F7B93E?logo=prettier&logoColor=white" alt="Prettier" /></a>
  <a href="https://github.com/alexcoronell/cheffcontrol/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="License" /></a>
</p>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [📜 Scripts](#-scripts)
- [🧩 Feature Modules](#-feature-modules)
- [🗄️ Data Flow](#️-data-flow)
- [🔐 Authentication & Authorization](#-authentication--authorization)
- [📊 Inventory Management](#-inventory-management)
- [⚡ Alerts System](#-alerts-system)
- [📈 Reports](#-reports)
- [🎨 UI / Theming](#-ui--theming)
- [📏 Coding Standards](#-coding-standards)
- [🔧 Configuration Reference](#-configuration-reference)
- [🤝 Contributing](#-contributing)

---

## ✨ Features

| Area | Capabilities |
|------|-------------|
| **🔐 Authentication** | Email/password sign-up, sign-in, first-time registration flow with automatic restaurant + admin user creation |
| **🥘 Products** | Full CRUD with categories, units of measure, SKU codes, minimum stock thresholds, and soft-delete |
| **📦 Lots** | Lot tracking with expiration dates, quantity management, and FIFO consumption |
| **📥 Inventory Movements** | Entry (stock increase + lot creation), Exit (FIFO lot consumption), and Cancellation (with cascade support) |
| **⚠️ Alerts** | Configurable expiration-day threshold, expiring lots list, low-stock detection with colour-coded notifications |
| **📊 Reports** | Current inventory with lot breakdown, movement history with filters, CSV/Excel/PDF export |
| **👥 Multi-tenancy** | Restaurant-scoped data — every query is filtered by `restaurant_id` |
| **👤 Role-based Access** | Three roles: `Administrador` (full access), `Almacén` (inventory), `Cocinero` (read-only) |
| **🎨 Theming** | DaisyUI "retro" theme (default) with automatic "dark" mode via `prefers-color-scheme` |

---

## 🏗️ Architecture

ChefControl follows **Clean Architecture** principles adapted for a React SPA. The dependency flow is strictly unidirectional:

```
┌─────────────────────────────────────────┐
│  4. UI (Components)                     │
│     Only render. Receive props.          │
│     Never import supabase/client.ts.     │
├─────────────────────────────────────────┤
│  3. Hooks (Orchestration Layer)          │
│     Form state + validation + API calls  │
│     Never import supabase/client.ts.     │
├─────────────────────────────────────────┤
│  2. API (features/[x]/api.ts)           │
│     Single source of truth for DB access │
│     Returns domain types (camelCase).    │
├─────────────────────────────────────────┤
│  1. Infrastructure                      │
│     supabase/client.ts, Zustand stores   │
└─────────────────────────────────────────┘
```

### Dependency Rules

| Layer | Can import from | Cannot import from |
|-------|----------------|-------------------|
| **Component** | Hooks, shared/components, shared/lib | `supabase/client.ts`, cross-feature `api.ts` |
| **Hook** | Same-feature API, stores, shared/lib | Components, `supabase/client.ts` |
| **API** | `supabase/client.ts`, shared/types | Components, hooks, stores |
| **Store** | `supabase/client.ts` (auth only) | Components |

### State Management Strategy

| Type | Tool | Location |
|------|------|----------|
| **Server/API data** | TanStack React Query | Custom hooks (`useProducts`, `useMovements`, etc.) |
| **Global UI state** | Zustand | `stores/uiStore.ts` (page title, alerts, form modes) |
| **Auth state** | Zustand + `persist` middleware | `stores/authStore.ts` (persisted to localStorage) |
| **Delete confirmations** | Zustand | `stores/deleteStore.ts` (decoupled confirm flow) |
| **Persistent filters** | URL search params | Report pages (`?from=&to=&productId=`) |
| **Form state** | React Hook Form | Local to each form component |

---

## 🛠️ Tech Stack

### Core

| Technology | Version | Purpose |
|-----------|---------|---------|
| [![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)](https://react.dev) | ^19.2.5 | UI framework with hooks and concurrent features |
| [![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org) | ~6.0.2 | Type-safe development with strict mode |
| [![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white)](https://vite.dev) | ^8.0.10 | Build tool and dev server with HMR |

### Frontend & Styling

| Technology | Version | Purpose |
|-----------|---------|---------|
| [![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com) | ^4.3.0 | Utility-first CSS framework (Vite plugin) |
| [![DaisyUI](https://img.shields.io/badge/-DaisyUI-5A0EF8?logo=daisyui&logoColor=white)](https://daisyui.com) | ^5.5.19 | Tailwind component library with themes |
| [![Lucide](https://img.shields.io/badge/-Lucide_React-F56565?logo=lucide&logoColor=white)](https://lucide.dev) | ^1.14.0 | Icon library |

### State & Data Management

| Technology | Version | Purpose |
|-----------|---------|---------|
| [![TanStack Query](https://img.shields.io/badge/-TanStack_Query-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query) | ^5.100.9 | Server state management, caching, mutations |
| [![Zustand](https://img.shields.io/badge/-Zustand-443E38)](https://zustand-demo.pmnd.rs) | ^5.0.13 | Lightweight global state with persist middleware |
| [![Zod](https://img.shields.io/badge/-Zod-3E67B1?logo=zod&logoColor=white)](https://zod.dev) | ^4.4.3 | Schema validation for forms and API boundaries |

### Backend & Infrastructure

| Technology | Version | Purpose |
|-----------|---------|---------|
| [![Supabase](https://img.shields.io/badge/-Supabase-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com) | ^2.105.4 | BaaS: Authentication, PostgreSQL database, RPC functions |
| [![React Hook Form](https://img.shields.io/badge/-React_Hook_Form-EC5990?logo=reacthookform&logoColor=white)](https://react-hook-form.com) | ^7.75.0 | Performant form handling with Zod resolver |

### Routing

| Technology | Version | Purpose |
|-----------|---------|---------|
| [![Wouter](https://img.shields.io/badge/-Wouter-1976D2)](https://github.com/molefrog/wouter) | ^3.9.0 | Minimalist hash-free routing (~2KB) |

### Development Tooling

| Technology | Version | Purpose |
|-----------|---------|---------|
| [![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?logo=eslint&logoColor=white)](https://eslint.org) | ^10.2.1 | Linting with TypeScript, React Hooks, React Refresh, and TanStack Query plugins |
| [![Prettier](https://img.shields.io/badge/-Prettier-F7B93E?logo=prettier&logoColor=white)](https://prettier.io) | ^3.8.3 | Opinionated code formatter |
| [![Husky](https://img.shields.io/badge/-Husky-000000)](https://typicode.github.io/husky) | ^9.1.7 | Git hooks manager (pre-commit → lint-staged) |
| [![lint-staged](https://img.shields.io/badge/-lint--staged-222222)](https://github.com/okonet/lint-staged) | ^17.0.4 | Run linters on staged files |
| [![pnpm](https://img.shields.io/badge/-pnpm-F69220?logo=pnpm&logoColor=white)](https://pnpm.io) | 10.x | Fast, disk-efficient package manager |

---

## 📁 Project Structure

```
chefcontrol/
├── .editorconfig              # Editor settings (UTF-8, LF, 2-space indent)
├── .env                       # Environment variables (gitignored)
├── .gitignore                 # Git ignore rules
├── .husky/pre-commit          # Pre-commit hook: pnpx lint-staged
├── .prettierrc                # Prettier configuration
├── .prettierignore            # Prettier ignore rules
├── eslint.config.js           # ESLint flat config (ESLint 10+)
├── GUIDELINES.md              # Development standards & architecture rules
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
├── pnpm-lock.yaml             # Dependency lockfile
├── pnpm-workspace.yaml        # pnpm workspace config
├── tsconfig.json              # TypeScript project references
├── tsconfig.app.json          # TypeScript config for src/ (ES2023, DOM, bundler)
├── tsconfig.node.json         # TypeScript config for vite.config.ts
├── vite.config.ts             # Vite config (React plugin, Tailwind, @ alias)
├── public/
│   └── favicon.svg            # App favicon
└── src/
    ├── main.tsx               # Entry point: React Query provider + StrictMode
    ├── App.tsx                # Root component: route definitions
    ├── index.css              # Tailwind v4 imports + DaisyUI theme config
    │
    ├── supabase/
    │   └── client.ts          # Supabase client singleton (VITE_SUPABASE_* env vars)
    │
    ├── stores/                # Zustand global stores
    │   ├── authStore.ts       # Auth state (persisted to localStorage)
    │   ├── uiStore.ts         # UI state (page title, alerts, form modes)
    │   └── deleteStore.ts     # Decoupled delete confirmation flow
    │
    ├── shared/                # Shared UI kit
    │   ├── components/        # 18 reusable components (FormModal, Input, Sidebar, etc.)
    │   ├── guards/            # AuthGuard — route protection wrapper
    │   ├── hooks/             # useAuthGuard, useFormActions, usePageTitle
    │   ├── utils/             # dataHelpers.ts (date formatting utilities)
    │   ├── types.ts           # Role, AlertType, FormMode
    │   ├── enums.ts           # ROLE constant array
    │   └── formOptions.ts     # Role options for select dropdowns
    │
    ├── features/              # Domain feature modules
    │   ├── auth/              # Authentication (sign-up, sign-in, registration)
    │   ├── alerts/            # Alert configuration, expiring lots, low stock
    │   ├── categories/        # Product categories CRUD
    │   ├── dashboard/         # Dashboard widgets and summaries
    │   ├── inventory/         # Movement entry/exit/cancel and listing
    │   ├── lots/              # Lot tracking and expiration management
    │   ├── products/          # Product CRUD with category/UoM relations
    │   ├── reports/           # Inventory, movement, and export reports
    │   ├── restaurant/        # Restaurant profile management
    │   ├── settings/          # Settings navigation menu
    │   ├── unitsOfMeasure/    # Units of measure CRUD
    │   └── users/             # User profile and password management
    │
    └── pages/                 # 22 route page components
        ├── LoginPage.tsx
        ├── RegisterPage.tsx
        ├── CompleteRegistrationPage.tsx
        ├── DashboardPage.tsx
        ├── InventoryPage.tsx
        ├── ProductsPage.tsx
        ├── CategoriesPage.tsx
        ├── UnitsOfMeasurePage.tsx
        ├── LotsPage.tsx
        ├── MovementFormEntryPage.tsx
        ├── MovementFormExitPage.tsx
        ├── MovementsPage.tsx
        ├── AlertsPage.tsx
        ├── AlertsConfigurationPage.tsx
        ├── AlertsExpiringLotsPage.tsx
        ├── AlertsLowStockPage.tsx
        ├── ReportsPage.tsx
        ├── InventoryReportPage.tsx
        ├── MovementReportPage.tsx
        ├── SettingsPage.tsx
        ├── UsersPage.tsx
        └── RestaurantPage.tsx
```

### Feature Module Convention

Every feature module follows a consistent internal structure:

```
features/[name]/
├── types.ts              # Domain types + raw API response types
├── api.ts                # Supabase query/mutation functions
├── schemas.ts            # Zod validation schemas
├── mappers/              # snake_case → camelCase data mapping
│   └── [name]Mapper.ts
├── hooks/                # TanStack Query hooks + mutation hooks
│   ├── use[Entity].ts
│   ├── useCreate[Entity].ts
│   └── ...
├── components/           # Presentational components
│   ├── [Entity]List.tsx
│   ├── [Entity]Form.tsx
│   └── ...
└── store/                # Optional Zustand store (for entities needing local state)
    └── [Entity]Store.ts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20.x
- **pnpm** >= 9.x (install via `corepack enable && corepack prepare pnpm@latest --activate`)
- A **Supabase** project (self-hosted or cloud)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/alexcoronell/cheffcontrol.git
cd cheffcontrol

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials:
#   VITE_SUPABASE_URL=https://your-project.supabase.co
#   VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key

# 4. Start the development server
pnpm dev
```

The app will be available at `http://localhost:5173`.

### Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/publishable key (safe for client-side) |

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Vite dev server with HMR |
| `pnpm build` | Type-check (`tsc -b`) then production build (`vite build`) |
| `pnpm preview` | Preview production build locally |
| `pnpm lint` | Run ESLint across all files |
| `pnpm lint:fix` | Run ESLint with auto-fix |
| `pnpm format` | Format all source files with Prettier |
| `pnpm format:check` | Check formatting without writing |
| `pnpm prepare` | Install Husky git hooks (runs automatically on `pnpm install`) |

---

## 🧩 Feature Modules

### 🔐 `features/auth/`
Complete authentication flow: sign-up, email/password sign-in, first-time registration (creates restaurant + admin user via `create_restaurant_and_user` RPC), session persistence, and sign-out. The `signIn` function performs a three-step query: auth session → `users` table → `restaurants` table, throwing descriptive errors like `INCOMPLETE_REGISTRATION` and `Usuario desactivado`.

### 🥘 `features/products/`
Full product lifecycle with CRUD operations, soft-delete (`is_deleted`), and related entities (category, unit of measure). Enforces minimum stock thresholds that feed the low-stock alert system.

### 📦 `features/lots/`
Lot tracking with expiration dates. Each lot tracks initial and current quantity. Lots are consumed in FIFO (First-In-First-Out) order by exit movements.

### 📥 `features/inventory/`
Movement management with three operation types:
- **Entry**: Creates a movement record + a new lot via the `register_entry` RPC
- **Exit**: Consumes stock from available lots (FIFO) via the `register_exit` RPC, tracking which lots were consumed
- **Cancel**: Two-phase cancellation — first attempts non-cascade (fails if dependent movements exist), then offers cascade mode to cancel the movement and all dependents

### ⚠️ `features/alerts/`
Alert configuration with configurable expiration day threshold. Dedicated pages for expiring lots (colour-coded: red = expired, orange = expiring soon) and low-stock products (blue). The `AlertBanner` component in the navbar shows a badge with total alert count and a dropdown with categorized alerts.

### 📊 `features/reports/`
Four report types:
- **Current Inventory**: Products with lot-level breakdown, stock vs. minimum comparison, deficit calculation
- **Movement History**: Filterable by date range, product, and movement type
- **Expiration Report**: Lots grouped by expiration status
- **Low Stock Report**: Historical low-stock view

### 🏪 `features/restaurant/`
Restaurant profile management — update name, address, phone, and email.

### 👤 `features/users/`
User profile display, name update, and password change (via Supabase Auth `updateUser`).

---

## 🗄️ Data Flow

### Request/Response Pipeline

```
User Action → Component → Hook → api.ts → Supabase Client → Supabase API
                  ↑                                         ↓
              Mapper (camelCase) ←──── Response ───── Mapper (snake_case)
```

### Data Mapping Pattern

All Supabase queries return `snake_case` column names. Each feature has a mapper that transforms responses into `camelCase` domain types consumed by the UI:

```typescript
// API response → Domain model
export function responseToProduct(data: ResponseProduct): Product {
  return {
    id: data.id,
    name: data.name,
    stockMinimum: data.stock_minimum,  // snake_case → camelCase
    // ...
  };
}

// Domain model → API request
export function productToRequest(input: CreateProductInput): Record<string, unknown> {
  return {
    name: input.name,
    stock_minimum: input.stockMinimum,  // camelCase → snake_case
    // ...
  };
}
```

### TanStack Query Integration

Server data is fetched via custom hooks that wrap TanStack Query:

```typescript
// features/products/hooks/useProducts.ts
export function useProducts() {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['products', restaurantId],
    queryFn: () => getProducts(restaurantId!),
    enabled: !!restaurantId,  // Wait until auth is ready
  });
}
```

Mutations invalidate related queries on success:

```typescript
const mutation = useMutation({
  mutationFn: (input) => createProduct(input, restaurantId),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['products'] });
    queryClient.invalidateQueries({ queryKey: ['count-products'] });
    setShowAlertMessage('success', 'Producto creado exitosamente');
  },
});
```

---

## 🔐 Authentication & Authorization

### Auth Flow

```
Sign Up → Complete Registration (create restaurant + admin) → Sign In → Dashboard
                │                                                         │
                └── Redirect if no `users` row ───────────────────────────┘
```

### Route Protection

The `AuthGuard` component wraps all routes and implements three categories:

| Route Type | Examples | Behavior |
|-----------|----------|----------|
| **Public** | `/ingresar`, `/registrarse` | No auth required |
| **Semi-protected** | `/completar-registro` | Requires auth session but not DB user record |
| **Protected** | All other routes | Requires full auth (session + DB user + restaurant) |

Unauthenticated users on protected routes are redirected to `/ingresar`. Authenticated users without a restaurant record are redirected to `/completar-registro`.

### Multi-tenancy

Every database query is filtered by `restaurant_id`, which is extracted from the authenticated user's session. This provides defense-in-depth alongside Supabase Row-Level Security (RLS).

### Role-based Access

| Role | Permissions |
|------|-------------|
| `Administrador` | Full system access — manage products, inventory, users, settings |
| `Almacén` | Inventory management — products, movements, lots |
| `Cocinero` | Read-only access — view inventory and alerts |

---

## 📊 Inventory Management

### FIFO Lot Consumption

When an exit movement is registered, the system consumes lots in FIFO order (oldest expiration date first) via the `register_exit` RPC. The response includes which lots were consumed and by how much.

### Movement Cancellation

Cancelling a movement is a two-phase process:
1. **Phase 1** (`cascade: false`): Attempts to cancel. Fails if downstream movements depend on this movement.
2. **Phase 2** (`cascade: true`): Cancels the movement **and** all dependent movements. The UI shows a confirmation dialog listing the dependencies before proceeding.

---

## ⚡ Alerts System

### Expiration Alerts
- Configurable threshold (default: 3 days)
- Products expiring within the threshold appear in the alerts dropdown
- Colour-coded: **red** = expired, **orange** = expiring within threshold

### Low Stock Alerts
- Products whose current stock falls below `stock_minimum` are flagged
- The `get_low_stock` RPC returns deficit calculations
- Blue-themed notification in the alerts dropdown

The `AlertBanner` component in the navbar provides a dropdown with categorized alerts and auto-closes when clicking outside.

---

## 📈 Reports

### Available Reports

| Report | Description |
|--------|-------------|
| **Current Inventory** | Full inventory snapshot with lot-level detail, minimum stock comparison, and deficit calculation |
| **Movement History** | Filterable by date range, product, and movement type (entry/exit) |
| **Expiration Report** | Lots grouped by expiration status with days remaining |
| **Low Stock Report** | Historical view of products below minimum stock |

### Export
Reports can be exported in **CSV**, **Excel**, or **PDF** format via the `ExportButton` component.

---

## 🎨 UI / Theming

### Theme Configuration

Defined in `src/index.css`:

```css
@import 'tailwindcss';
@plugin "daisyui" {
  themes:
    retro --default,
    dark --prefersdark;
}
```

- **Default theme**: DaisyUI "retro" (warm, paper-like aesthetic)
- **Dark mode**: Automatically activated via `prefers-color-scheme: dark`

### Component Library

The `shared/components/` directory contains **18 reusable components** used across all features:

| Component | Purpose |
|-----------|---------|
| `Input`, `Select`, `TextArea` | Form controls with consistent styling |
| `FormModal`, `FormModalButtons`, `FormModalUserRestaurant` | Modal CRUD forms |
| `DetailModal` | Read-only detail view in a modal |
| `ModalConfirmDelete` | Global delete confirmation dialog |
| `TableHeaderActions`, `TableColumnActions` | Table action buttons |
| `Sidebar`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuGroup`, `SidebarNavBar` | Navigation shell |
| `BigMenuItem` | Landing page navigation cards |
| `Layout`, `InitialLayout` | Page layout wrappers |
| `Alert` | Global toast notification |

---

## 📏 Coding Standards

The project enforces strict coding standards defined in [`GUIDELINES.md`](./GUIDELINES.md):

- **SOLID Principles** applied to React components and hooks
- **Clean Architecture** with unidirectional dependency flow
- **Strict TypeScript** — zero implicit `any`, exhaustive type definitions
- **Conventional commits** — `type(scope): description` format
- **Pre-commit hooks** via Husky + lint-staged (ESLint + Prettier on staged files)
- **Comprehensive JSDoc** — all exported functions, components, hooks, and types are documented (100% coverage)

---

## 🔧 Configuration Reference

### TypeScript Configuration

| File | Target | Relevant Options |
|------|--------|-----------------|
| `tsconfig.app.json` | `src/` (app code) | `ES2023`, `DOM`, `react-jsx`, `@/*` path alias, `noUnusedLocals`, `noUnusedParameters` |
| `tsconfig.node.json` | `vite.config.ts` | `ES2023`, `Node.js` types, `bundler` module resolution |

### ESLint Configuration (flat config)

| Plugin | Purpose |
|--------|---------|
| `@eslint/js` | Recommended JS rules |
| `typescript-eslint` | Recommended TypeScript rules |
| `eslint-plugin-react-hooks` | React Hooks rules of hooks |
| `eslint-plugin-react-refresh` | HMR-safe export validation |
| `@tanstack/eslint-plugin-query` | TanStack Query best practices |
| `eslint-config-prettier` | Disables rules that conflict with Prettier |

### Prettier Configuration

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

---

## 🤝 Contributing

1. Create a branch from `master`: `git checkout -b feat/your-feature`
2. Make changes following the [coding standards](#-coding-standards)
3. Commit using conventional commits: `git commit -m "feat(scope): description"`
4. Push and open a Pull Request against `master`

### Commit Format

```
type(scope): description

Types: feat, fix, docs, refactor, chore, style, perf, test, build, ci, revert
Scope: feature module or area (e.g., products, inventory, auth, shared)
```

---

<p align="center">
  Built with ❤️ using React, TypeScript, and Supabase
  <br />
  <a href="https://github.com/alexcoronell/cheffcontrol">GitHub</a>
</p>
