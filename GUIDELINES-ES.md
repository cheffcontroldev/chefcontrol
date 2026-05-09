# ChefControl — Normas y Reglas de Desarrollo

> Aplicables a todo el código del proyecto ChefControl.
> Stack: React + TypeScript + Vite + Tailwind CSS + shadcn/ui + TanStack Query + Zustand + Supabase

---

## 1. Principios SOLID (Aplicados a React)

| Principio | Regla concreta en ChefControl |
|---|---|
| **S — Single Responsibility** | Un componente = una razón para cambiar. Si un formulario crece más de 150 líneas, separar en sub-componentes. Un hook no debe manejar UI + API + validación simultáneamente. |
| **O — Open/Closed** | Extender comportamiento sin modificar código existente. Ej: un botón de acción se extiende vía props, no copiando y pegando el componente para cada caso. |
| **L — Liskov Substitution** | Los componentes hijos deben poder reemplazar al padre sin romper la UI. Ej: un `Button` especializado (`SubmitButton`) debe aceptar todas las props del `Button` base. |
| **I — Interface Segregation** | No pedir props que no usas. Un componente que solo muestra texto no debe recibir todo el objeto `Producto`, solo `name` y `stock`. |
| **D — Dependency Inversion** | Los componentes dependen de abstracciones, no de implementaciones. Ej: el hook `useProducts` no importa `supabase` directamente; usa `features/products/api.ts`. |

---

## 2. Clean Architecture (Aplicada a Features)

### Estructura de dependencias

```
┌─────────────────────────────────────────┐
│  4. UI (Components)                     │
│     Solo pintan. Reciben props.         │
│     No saben de Supabase.               │
├─────────────────────────────────────────┤
│  3. Hooks                               │
│     Orquestan: form state + validación  │
│     + llamada a api.ts.                 │
│     No importan supabase client.        │
├─────────────────────────────────────────┤
│  2. API (features/[x]/api.ts)           │
│     Único lugar que habla con Supabase. │
│     Retorna tipos del dominio.          │
├─────────────────────────────────────────┤
│  1. Supabase Client                     │
│     Infraestructura. No tocar directo.  │
└─────────────────────────────────────────┘
```

### Reglas de dependencia

| Nivel | Puede importar de | NO puede importar de |
|---|---|---|
| **Componente** | Hooks, shared/components, shared/lib | `supabase/client.ts`, `features/otro/api.ts` |
| **Hook** | API del mismo feature, stores, shared/lib | Componentes, `supabase/client.ts` directo |
| **API** | `supabase/client.ts`, shared/types | Componentes, hooks, stores |
| **Store (Zustand)** | `supabase/client.ts` solo para init de auth | Componentes |

---

## 3. Buenas Prácticas Específicas

### A. Nomenclatura

| Elemento | Convención | Ejemplo |
|---|---|---|
| Componentes | PascalCase | `ProductCard.tsx` |
| Hooks | camelCase, prefijo `use` | `useProducts.ts` |
| Funciones API | camelCase, verbo + entidad | `createProduct`, `getLowStock` |
| Tipos/Interfaces | PascalCase, sufijo opcional | `Product`, `MovementInput` |
| Archivos de tipos | `types.ts` dentro del feature | `features/products/types.ts` |
| Booleanos | Prefijo `is`, `has`, `should` | `isActive`, `hasStock` |

### B. Manejo de Estado

| Regla | Ejemplo |
|---|---|
| Estado local primero | `useState` para formularios, toggles, filtros temporales. |
| Zustand solo para global | Sidebar, auth, toasts. No para datos de la API. |
| TanStack Query para servidor | Todo lo que viene de Supabase vive en Query. No en Zustand. |
| URL para filtros persistentes | Reportes con rango de fecha: `?from=2026-05-01&to=2026-05-09`. |

### C. Llamadas a API

| Regla | Justificación |
|---|---|
| Nunca `supabase.from()` en un componente | Siempre a través de `features/[x]/api.ts`. |
| Nunca mutar datos en un `useEffect` | Las mutaciones se disparan por acción del usuario (click, submit). |
| Invalidar cache tras mutación | `queryClient.invalidateQueries()` después de crear/editar/eliminar. |
| Manejar estados de carga y error | Todo `useQuery`/`useMutation` debe contemplar `isLoading`/`isError`. |

### D. Seguridad y Multi-tenant

| Regla | Justificación |
|---|---|
| Siempre filtrar por `restaurante_id` en frontend | Defensa en profundidad, aunque RLS exista. |
| Nunca confiar en el frontend para validar negocio | El backend (RPC/RLS) tiene la última palabra. |
| No exponer `service_role_key` | Nunca en variables de entorno del cliente. |

### E. Componentes

| Regla | Justificación |
|---|---|
| Props destructuradas | `function ProductCard({ name, stock }: Props)` |
| Evitar `any` | TypeScript estricto. Si no sabés el tipo, definilo. |
| Componentes puros cuando sea posible | Misma entrada = misma salida. Fáciles de testear. |
| Extraer early returns | Evitar anidación profunda de `if`. |

---

## 4. Reglas de Oro (Checklist antes de commit)

- [ ] El componente tiene una sola responsabilidad.
- [ ] No hay lógica de API directa en el JSX.
- [ ] Los tipos están definidos (cero `any` implícitos).
- [ ] La mutación invalida la cache de TanStack Query.
- [ ] El nombre del hook describe qué hace.
- [ ] No hay `console.log` de debug.
- [ ] ESLint y Prettier pasan sin errores.
- [ ] El commit describe qué y por qué, no solo "fix".

---

## 5. Excepciones Permitidas (MVP)

| Situación | Excepción |
|---|---|
| Tests unitarios | No obligatorios en el MVP. Solo si hay lógica crítica (FEFO). |
| Documentación interna | No JSDoc exhaustivo. Nombres descriptivos suficientes. |
| Over-engineering | Si una feature necesita 2 líneas de código, no crees 3 archivos. |

---

*Documento generado para el proyecto ChefControl. Última actualización: 2026-05-09*
