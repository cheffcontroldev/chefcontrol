<p align="center">
  <img src="public/favicon.svg" alt="ChefControl" width="80" height="80" />
</p>

<h1 align="center">🍳 ChefControl</h1>

<p align="center">
  <strong>Sistema de Gestión de Inventario para Restaurantes</strong>
  <br />
  Una SPA moderna y multiinquilino para administrar inventarios, rastrear movimientos de stock, monitorear fechas de vencimiento y generar reportes.
</p>

<p align="center">
  <a href="#-stack-tecnológico"><img src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white" alt="React 19" /></a>
  <a href="#-stack-tecnológico"><img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white" alt="TypeScript 6" /></a>
  <a href="#-stack-tecnológico"><img src="https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white" alt="Vite 8" /></a>
  <a href="#-stack-tecnológico"><img src="https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" /></a>
  <a href="#-stack-tecnológico"><img src="https://img.shields.io/badge/Supabase-2.105-3FCF8E?logo=supabase&logoColor=white" alt="Supabase" /></a>
  <a href="#-stack-tecnológico"><img src="https://img.shields.io/badge/TanStack_Query-5.100-FF4154?logo=reactquery&logoColor=white" alt="TanStack Query" /></a>
  <a href="#-stack-tecnológico"><img src="https://img.shields.io/badge/Zustand-5.0-brown?logo=zustand" alt="Zustand" /></a>
  <a href="#-stack-tecnológico"><img src="https://img.shields.io/badge/Zod-4.4-3E67B1?logo=zod&logoColor=white" alt="Zod" /></a>
  <a href="#-stack-tecnológico"><img src="https://img.shields.io/badge/DaisyUI-5.5-5A0EF8?logo=daisyui&logoColor=white" alt="DaisyUI" /></a>
  <br />
  <a href="#-primeros-pasos"><img src="https://img.shields.io/badge/pnpm-10.x-F69220?logo=pnpm&logoColor=white" alt="pnpm" /></a>
  <a href="#-scripts"><img src="https://img.shields.io/badge/ESLint-10.2-4B32C3?logo=eslint&logoColor=white" alt="ESLint" /></a>
  <a href="#-scripts"><img src="https://img.shields.io/badge/Prettier-3.8-F7B93E?logo=prettier&logoColor=white" alt="Prettier" /></a>
  <a href="https://github.com/alexcoronell/cheffcontrol/blob/master/LICENSE"><img src="https://img.shields.io/badge/licencia-MIT-blue" alt="Licencia MIT" /></a>
</p>

---

## 📋 Tabla de Contenidos

- [✨ Funcionalidades](#-funcionalidades)
- [🏗️ Arquitectura](#️-arquitectura)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🚀 Primeros Pasos](#-primeros-pasos)
- [📜 Scripts](#-scripts)
- [🧩 Módulos de Funcionalidades](#-módulos-de-funcionalidades)
- [🗄️ Flujo de Datos](#️-flujo-de-datos)
- [🔐 Autenticación y Autorización](#-autenticación-y-autorización)
- [📊 Gestión de Inventario](#-gestión-de-inventario)
- [⚡ Sistema de Alertas](#-sistema-de-alertas)
- [📈 Reportes](#-reportes)
- [🎨 UI / Temas](#-ui--temas)
- [📏 Estándares de Código](#-estándares-de-código)
- [🔧 Referencia de Configuración](#-referencia-de-configuración)
- [🤝 Contribuir](#-contribuir)

---

## ✨ Funcionalidades

| Área | Capacidades |
|------|-------------|
| **🔐 Autenticación** | Registro e inicio de sesión con email/contraseña, flujo de registro inicial con creación automática de restaurante + usuario administrador |
| **🥘 Productos** | CRUD completo con categorías, unidades de medida, códigos SKU, stock mínimo y borrado lógico |
| **📦 Lotes** | Trazabilidad de lotes con fechas de vencimiento, gestión de cantidades y consumo FIFO |
| **📥 Movimientos de Inventario** | Entrada (aumento de stock + creación de lote), Salida (consumo FIFO) y Cancelación (con soporte en cascada) |
| **⚠️ Alertas** | Umbral de vencimiento configurable, lista de lotes por vencer, detección de bajo stock con notificaciones codificadas por color |
| **📊 Reportes** | Inventario actual con desglose por lote, historial de movimientos con filtros, exportación a CSV/Excel/PDF |
| **👥 Multiinquilino** | Datos exclusivos por restaurante — cada consulta se filtra por `restaurant_id` |
| **👤 Acceso por Roles** | Tres roles: `Administrador` (acceso total), `Almacén` (gestión de inventario), `Cocinero` (solo lectura) |
| **🎨 Temas** | Tema "retro" de DaisyUI (predeterminado) con modo oscuro automático vía `prefers-color-scheme` |

---

## 🏗️ Arquitectura

ChefControl sigue los principios de **Arquitectura Limpia** adaptados para una SPA en React. El flujo de dependencias es estrictamente unidireccional:

```
┌─────────────────────────────────────────┐
│  4. UI (Componentes)                    │
│     Solo renderizan. Reciben props.      │
│     Nunca importan supabase/client.ts.   │
├─────────────────────────────────────────┤
│  3. Hooks (Capa de Orquestación)        │
│     Estado del formulario + validación   │
│     + llamadas a api.ts.                │
│     Nunca importan supabase/client.ts.   │
├─────────────────────────────────────────┤
│  2. API (features/[x]/api.ts)           │
│     Única fuente de verdad para la DB.   │
│     Retorna tipos de dominio (camelCase).│
├─────────────────────────────────────────┤
│  1. Infraestructura                     │
│     supabase/client.ts, stores Zustand   │
└─────────────────────────────────────────┘
```

### Reglas de Dependencia

| Capa | Puede importar de | NO puede importar de |
|------|-------------------|----------------------|
| **Componente** | Hooks, shared/components, shared/lib | `supabase/client.ts`, `api.ts` de otros features |
| **Hook** | API del mismo feature, stores, shared/lib | Componentes, `supabase/client.ts` |
| **API** | `supabase/client.ts`, shared/types | Componentes, hooks, stores |
| **Store** | `supabase/client.ts` (solo auth) | Componentes |

### Estrategia de Manejo de Estado

| Tipo | Herramienta | Ubicación |
|------|-------------|-----------|
| **Datos del servidor/API** | TanStack React Query | Hooks personalizados (`useProducts`, `useMovements`, etc.) |
| **Estado global de UI** | Zustand | `stores/uiStore.ts` (título de página, alertas, modos de formulario) |
| **Estado de autenticación** | Zustand + middleware `persist` | `stores/authStore.ts` (persistido en localStorage) |
| **Confirmaciones de borrado** | Zustand | `stores/deleteStore.ts` (flujo desacoplado de confirmación) |
| **Filtros persistentes** | Parámetros de URL | Páginas de reportes (`?from=&to=&productId=`) |
| **Estado de formularios** | React Hook Form | Local en cada componente de formulario |

---

## 🛠️ Stack Tecnológico

### Core

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| [![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)](https://react.dev) | ^19.2.5 | Framework de UI con hooks y características concurrentes |
| [![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org) | ~6.0.2 | Desarrollo tipado con modo estricto |
| [![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white)](https://vite.dev) | ^8.0.10 | Herramienta de build y servidor de desarrollo con HMR |

### Frontend y Estilos

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| [![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com) | ^4.3.0 | Framework CSS utilitario (plugin de Vite) |
| [![DaisyUI](https://img.shields.io/badge/-DaisyUI-5A0EF8?logo=daisyui&logoColor=white)](https://daisyui.com) | ^5.5.19 | Librería de componentes para Tailwind con temas |
| [![Lucide](https://img.shields.io/badge/-Lucide_React-F56565?logo=lucide&logoColor=white)](https://lucide.dev) | ^1.14.0 | Librería de íconos |

### Estado y Datos

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| [![TanStack Query](https://img.shields.io/badge/-TanStack_Query-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query) | ^5.100.9 | Manejo de estado del servidor, caché y mutaciones |
| [![Zustand](https://img.shields.io/badge/-Zustand-443E38)](https://zustand-demo.pmnd.rs) | ^5.0.13 | Estado global liviano con middleware de persistencia |
| [![Zod](https://img.shields.io/badge/-Zod-3E67B1?logo=zod&logoColor=white)](https://zod.dev) | ^4.4.3 | Validación de esquemas para formularios y fronteras de API |

### Backend e Infraestructura

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| [![Supabase](https://img.shields.io/badge/-Supabase-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com) | ^2.105.4 | BaaS: Autenticación, base de datos PostgreSQL, funciones RPC |
| [![React Hook Form](https://img.shields.io/badge/-React_Hook_Form-EC5990?logo=reacthookform&logoColor=white)](https://react-hook-form.com) | ^7.75.0 | Manejo performante de formularios con resolvedor de Zod |

### Routing

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| [![Wouter](https://img.shields.io/badge/-Wouter-1976D2)](https://github.com/molefrog/wouter) | ^3.9.0 | Routing minimalista sin hash (~2KB) |

### Herramientas de Desarrollo

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| [![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?logo=eslint&logoColor=white)](https://eslint.org) | ^10.2.1 | Linting con plugins de TypeScript, React Hooks, React Refresh y TanStack Query |
| [![Prettier](https://img.shields.io/badge/-Prettier-F7B93E?logo=prettier&logoColor=white)](https://prettier.io) | ^3.8.3 | Formateador de código opinado |
| [![Husky](https://img.shields.io/badge/-Husky-000000)](https://typicode.github.io/husky) | ^9.1.7 | Manejador de git hooks (pre-commit → lint-staged) |
| [![lint-staged](https://img.shields.io/badge/-lint--staged-222222)](https://github.com/okonet/lint-staged) | ^17.0.4 | Ejecuta linters solo en archivos staged |
| [![pnpm](https://img.shields.io/badge/-pnpm-F69220?logo=pnpm&logoColor=white)](https://pnpm.io) | 10.x | Manejador de paquetes rápido y eficiente en disco |

---

## 📁 Estructura del Proyecto

```
chefcontrol/
├── .editorconfig              # Configuración del editor (UTF-8, LF, indentación 2 espacios)
├── .env                       # Variables de entorno (gitignorado)
├── .gitignore                 # Reglas de ignorado de Git
├── .husky/pre-commit          # Hook pre-commit: pnpx lint-staged
├── .prettierrc                # Configuración de Prettier
├── .prettierignore            # Reglas de ignorado de Prettier
├── eslint.config.js           # Configuración plana de ESLint (ESLint 10+)
├── GUIDELINES.md              # Estándares de desarrollo y reglas de arquitectura
├── index.html                 # Punto de entrada HTML
├── package.json               # Dependencias y scripts
├── pnpm-lock.yaml             # Archivo de bloqueo de dependencias
├── pnpm-workspace.yaml        # Configuración del workspace de pnpm
├── tsconfig.json              # Referencias de proyectos de TypeScript
├── tsconfig.app.json          # Configuración de TS para src/ (ES2023, DOM, bundler)
├── tsconfig.node.json         # Configuración de TS para vite.config.ts
├── vite.config.ts             # Configuración de Vite (plugin React, Tailwind, alias @)
├── public/
│   └── favicon.svg            # Favicon de la aplicación
└── src/
    ├── main.tsx               # Punto de entrada: provider de React Query + StrictMode
    ├── App.tsx                # Componente raíz: definición de rutas
    ├── index.css              # Imports de Tailwind v4 + configuración de tema DaisyUI
    │
    ├── supabase/
    │   └── client.ts          # Singleton del cliente Supabase (vars de entorno VITE_SUPABASE_*)
    │
    ├── stores/                # Stores globales de Zustand
    │   ├── authStore.ts       # Estado de autenticación (persistido en localStorage)
    │   ├── uiStore.ts         # Estado de UI (título de página, alertas, modos de formulario)
    │   └── deleteStore.ts     # Flujo desacoplado de confirmación de borrado
    │
    ├── shared/                # Kit de UI compartido
    │   ├── components/        # 18 componentes reutilizables (FormModal, Input, Sidebar, etc.)
    │   ├── guards/            # AuthGuard — envoltorio de protección de rutas
    │   ├── hooks/             # useAuthGuard, useFormActions, usePageTitle
    │   ├── utils/             # dataHelpers.ts (utilidades de formato de fechas)
    │   ├── types.ts           # Role, AlertType, FormMode
    │   ├── enums.ts           # Arreglo constante ROLE
    │   └── formOptions.ts     # Opciones de roles para selects
    │
    ├── features/              # Módulos de funcionalidades de dominio
    │   ├── auth/              # Autenticación (registro, inicio de sesión, registro completo)
    │   ├── alerts/            # Configuración de alertas, lotes por vencer, bajo stock
    │   ├── categories/        # CRUD de categorías de productos
    │   ├── dashboard/         # Widgets y resúmenes del tablero principal
    │   ├── inventory/         # Movimientos de entrada/salida/cancelación y listado
    │   ├── lots/              # Trazabilidad de lotes y gestión de vencimientos
    │   ├── products/          # CRUD de productos con relaciones de categoría/UoM
    │   ├── reports/           # Reportes de inventario, movimientos y exportación
    │   ├── restaurant/        # Gestión del perfil del restaurante
    │   ├── settings/          # Menú de navegación de configuración
    │   ├── unitsOfMeasure/    # CRUD de unidades de medida
    │   └── users/             # Perfil de usuario y gestión de contraseña
    │
    └── pages/                 # 22 componentes de página por ruta
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

### Convención de Módulos de Funcionalidad

Cada módulo de funcionalidad sigue una estructura interna consistente:

```
features/[nombre]/
├── types.ts              # Tipos de dominio + tipos de respuesta cruda de la API
├── api.ts                # Funciones de consulta/mutación a Supabase
├── schemas.ts            # Esquemas de validación con Zod
├── mappers/              # Mapeo snake_case → camelCase
│   └── [nombre]Mapper.ts
├── hooks/                # Hooks de TanStack Query + hooks de mutación
│   ├── use[Entidad].ts
│   ├── useCreate[Entidad].ts
│   └── ...
├── components/           # Componentes de presentación
│   ├── [Entidad]List.tsx
│   ├── [Entidad]Form.tsx
│   └── ...
└── store/                # Store opcional de Zustand (para entidades que necesitan estado local)
    └── [Entidad]Store.ts
```

---

## 🚀 Primeros Pasos

### Requisitos Previos

- **Node.js** >= 20.x
- **pnpm** >= 9.x (instalar con `corepack enable && corepack prepare pnpm@latest --activate`)
- Un proyecto de **Supabase** (auto-gestionado o en la nube)

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/alexcoronell/cheffcontrol.git
cd cheffcontrol

# 2. Instalar dependencias
pnpm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con las credenciales de Supabase:
#   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
#   VITE_SUPABASE_PUBLISHABLE_KEY=tu-llave-anon

# 4. Iniciar el servidor de desarrollo
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`.

### Variables de Entorno

| Variable | Descripción |
|----------|-------------|
| `VITE_SUPABASE_URL` | URL del proyecto de Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Llave anónima/pública de Supabase (segura para el lado del cliente) |

---

## 📜 Scripts

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia el servidor de desarrollo de Vite con HMR |
| `pnpm build` | Verifica tipos (`tsc -b`) y luego compila para producción (`vite build`) |
| `pnpm preview` | Previsualiza la compilación de producción localmente |
| `pnpm lint` | Ejecuta ESLint en todos los archivos |
| `pnpm lint:fix` | Ejecuta ESLint con corrección automática |
| `pnpm format` | Formatea todos los archivos fuente con Prettier |
| `pnpm format:check` | Verifica el formato sin escribir cambios |
| `pnpm prepare` | Instala los hooks de Husky (se ejecuta automáticamente al hacer `pnpm install`) |

---

## 🧩 Módulos de Funcionalidades

### 🔐 `features/auth/`
Flujo completo de autenticación: registro, inicio de sesión con email/contraseña, registro inicial (crea restaurante + usuario administrador vía el RPC `create_restaurant_and_user`), persistencia de sesión y cierre de sesión. La función `signIn` realiza una consulta de tres pasos: sesión de auth → tabla `users` → tabla `restaurants`, lanzando errores descriptivos como `INCOMPLETE_REGISTRATION` y `Usuario desactivado`.

### 🥘 `features/products/`
Ciclo de vida completo de productos con operaciones CRUD, borrado lógico (`is_deleted`) y entidades relacionadas (categoría, unidad de medida). Implementa umbrales de stock mínimo que alimentan el sistema de alertas de bajo stock.

### 📦 `features/lots/`
Trazabilidad de lotes con fechas de vencimiento. Cada lote registra la cantidad inicial y la cantidad actual. Los lotes se consumen en orden FIFO (First-In, First-Out) por los movimientos de salida.

### 📥 `features/inventory/`
Gestión de movimientos con tres tipos de operación:
- **Entrada**: Crea un registro de movimiento + un nuevo lote vía el RPC `register_entry`
- **Salida**: Consume stock de los lotes disponibles (FIFO) vía el RPC `register_exit`, rastreando qué lotes se consumieron
- **Cancelación**: Proceso de dos fases — primero intenta sin cascada (falla si hay movimientos dependientes), luego ofrece modo cascada para cancelar el movimiento y todos sus dependientes

### ⚠️ `features/alerts/`
Configuración de alertas con umbral de vencimiento configurable. Páginas dedicadas para lotes por vencer (codificadas por color: rojo = vencido, naranja = por vencer pronto) y productos con bajo stock (azul). El componente `AlertBanner` en la barra de navegación muestra un badge con el conteo total de alertas y un desplegable con alertas categorizadas.

### 📊 `features/reports/`
Cuatro tipos de reportes:
- **Inventario Actual**: Productos con desglose por lote, comparación de stock vs. mínimo, cálculo de déficit
- **Historial de Movimientos**: Filtrable por rango de fechas, producto y tipo de movimiento
- **Reporte de Vencimientos**: Lotes agrupados por estado de vencimiento
- **Reporte de Bajo Stock**: Vista histórica de productos por debajo del stock mínimo

### 🏪 `features/restaurant/`
Gestión del perfil del restaurante — actualizar nombre, dirección, teléfono y correo electrónico.

### 👤 `features/users/`
Visualización del perfil de usuario, actualización de nombre y cambio de contraseña (vía Supabase Auth `updateUser`).

---

## 🗄️ Flujo de Datos

### Pipeline de Solicitud/Respuesta

```
Acción del Usuario → Componente → Hook → api.ts → Cliente Supabase → API de Supabase
                         ↑                                         ↓
                    Mapper (camelCase) ←─── Respuesta ──── Mapper (snake_case)
```

### Patrón de Mapeo de Datos

Todas las consultas a Supabase devuelven nombres de columna en `snake_case`. Cada funcionalidad tiene un mapper que transforma las respuestas a tipos de dominio en `camelCase` para la UI:

```typescript
// Respuesta de API → Modelo de dominio
export function responseToProduct(data: ResponseProduct): Product {
  return {
    id: data.id,
    name: data.name,
    stockMinimum: data.stock_minimum,  // snake_case → camelCase
    // ...
  };
}

// Modelo de dominio → Solicitud de API
export function productToRequest(input: CreateProductInput): Record<string, unknown> {
  return {
    name: input.name,
    stock_minimum: input.stockMinimum,  // camelCase → snake_case
    // ...
  };
}
```

### Integración con TanStack Query

Los datos del servidor se obtienen mediante hooks personalizados que envuelven a TanStack Query:

```typescript
// features/products/hooks/useProducts.ts
export function useProducts() {
  const { user } = useAuthStore();
  const restaurantId = user?.restaurantId;

  return useQuery({
    queryKey: ['products', restaurantId],
    queryFn: () => getProducts(restaurantId!),
    enabled: !!restaurantId,  // Espera a que la autenticación esté lista
  });
}
```

Las mutaciones invalidan las consultas relacionadas al completarse exitosamente:

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

## 🔐 Autenticación y Autorización

### Flujo de Autenticación

```
Registrarse → Completar Registro (crear restaurante + admin) → Iniciar Sesión → Dashboard
                    │                                                         │
                    └── Redirigir si no hay fila en `users` ─────────────────┘
```

### Protección de Rutas

El componente `AuthGuard` envuelve todas las rutas e implementa tres categorías:

| Tipo de Ruta | Ejemplos | Comportamiento |
|-------------|----------|----------------|
| **Pública** | `/ingresar`, `/registrarse` | No requiere autenticación |
| **Semi-protegida** | `/completar-registro` | Requiere sesión de auth pero no registro en DB |
| **Protegida** | Todas las demás | Requiere autenticación completa (sesión + usuario en DB + restaurante) |

Los usuarios no autenticados en rutas protegidas son redirigidos a `/ingresar`. Los usuarios autenticados sin registro de restaurante son redirigidos a `/completar-registro`.

### Multiinquilino

Cada consulta a la base de datos se filtra por `restaurant_id`, que se extrae de la sesión del usuario autenticado. Esto proporciona defensa en profundidad junto con la seguridad a nivel de fila (RLS) de Supabase.

### Acceso por Roles

| Rol | Permisos |
|-----|----------|
| `Administrador` | Acceso completo al sistema — gestiona productos, inventario, usuarios, configuración |
| `Almacén` | Gestión de inventario — productos, movimientos, lotes |
| `Cocinero` | Acceso de solo lectura — ver inventario y alertas |

---

## 📊 Gestión de Inventario

### Consumo FIFO de Lotes

Cuando se registra un movimiento de salida, el sistema consume los lotes en orden FIFO (primero el de fecha de vencimiento más antigua) a través del RPC `register_exit`. La respuesta incluye qué lotes se consumieron y en qué cantidad.

### Cancelación de Movimientos

Cancelar un movimiento es un proceso de dos fases:
1. **Fase 1** (`cascade: false`): Intenta cancelar. Falla si hay movimientos posteriores que dependen de este.
2. **Fase 2** (`cascade: true`): Cancela el movimiento **y** todos los movimientos dependientes. La UI muestra un diálogo de confirmación listando las dependencias antes de proceder.

---

## ⚡ Sistema de Alertas

### Alertas de Vencimiento
- Umbral configurable (predeterminado: 3 días)
- Los productos que vencen dentro del umbral aparecen en el desplegable de alertas
- Codificadas por color: **rojo** = vencido, **naranja** = vence dentro del umbral

### Alertas de Bajo Stock
- Los productos cuyo stock actual cae por debajo de `stock_minimum` se marcan
- El RPC `get_low_stock` devuelve cálculos de déficit
- Notificación de tema azul en el desplegable de alertas

El componente `AlertBanner` en la barra de navegación proporciona un desplegable con alertas categorizadas y se cierra automáticamente al hacer clic fuera de él.

---

## 📈 Reportes

### Reportes Disponibles

| Reporte | Descripción |
|---------|-------------|
| **Inventario Actual** | Instantánea completa del inventario con detalle por lote, comparación con stock mínimo y cálculo de déficit |
| **Historial de Movimientos** | Filtrable por rango de fechas, producto y tipo de movimiento (entrada/salida) |
| **Reporte de Vencimientos** | Lotes agrupados por estado de vencimiento con días restantes |
| **Reporte de Bajo Stock** | Vista histórica de productos por debajo del stock mínimo |

### Exportación

Los reportes pueden exportarse en formato **CSV**, **Excel** o **PDF** a través del componente `ExportButton`.

---

## 🎨 UI / Temas

### Configuración de Temas

Definida en `src/index.css`:

```css
@import 'tailwindcss';
@plugin "daisyui" {
  themes:
    retro --default,
    dark --prefersdark;
}
```

- **Tema predeterminado**: "retro" de DaisyUI (estética cálida, similar al papel)
- **Modo oscuro**: Se activa automáticamente vía `prefers-color-scheme: dark`

### Librería de Componentes

El directorio `shared/components/` contiene **18 componentes reutilizables** usados en todas las funcionalidades:

| Componente | Propósito |
|-----------|-----------|
| `Input`, `Select`, `TextArea` | Controles de formulario con estilo consistente |
| `FormModal`, `FormModalButtons`, `FormModalUserRestaurant` | Formularios modales CRUD |
| `DetailModal` | Vista de solo lectura en modal |
| `ModalConfirmDelete` | Diálogo global de confirmación de borrado |
| `TableHeaderActions`, `TableColumnActions` | Botones de acción en tablas |
| `Sidebar`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuGroup`, `SidebarNavBar` | Esqueleto de navegación |
| `BigMenuItem` | Tarjetas de navegación de páginas de inicio |
| `Layout`, `InitialLayout` | Wrappers de diseño de página |
| `Alert` | Notificación global tipo toast |

---

## 📏 Estándares de Código

El proyecto aplica estándares de código estrictos definidos en [`GUIDELINES.md`](./GUIDELINES.md):

- **Principios SOLID** aplicados a componentes y hooks de React
- **Arquitectura Limpia** con flujo de dependencias unidireccional
- **TypeScript estricto** — cero `any` implícitos, definiciones de tipos exhaustivas
- **Commits convencionales** — formato `type(scope): description`
- **Hooks pre-commit** vía Husky + lint-staged (ESLint + Prettier en archivos staged)
- **JSDoc exhaustivo** — todas las funciones, componentes, hooks y tipos exportados están documentados (100% de cobertura)

---

## 🔧 Referencia de Configuración

### Configuración de TypeScript

| Archivo | Objetivo | Opciones relevantes |
|---------|----------|---------------------|
| `tsconfig.app.json` | `src/` (código de la app) | `ES2023`, `DOM`, `react-jsx`, alias `@/*`, `noUnusedLocals`, `noUnusedParameters` |
| `tsconfig.node.json` | `vite.config.ts` | `ES2023`, tipos `Node.js`, resolución de módulos `bundler` |

### Configuración de ESLint (config plana)

| Plugin | Propósito |
|--------|-----------|
| `@eslint/js` | Reglas recomendadas de JS |
| `typescript-eslint` | Reglas recomendadas de TypeScript |
| `eslint-plugin-react-hooks` | Reglas de hooks de React |
| `eslint-plugin-react-refresh` | Validación de exportaciones compatibles con HMR |
| `@tanstack/eslint-plugin-query` | Buenas prácticas de TanStack Query |
| `eslint-config-prettier` | Desactiva reglas que entran en conflicto con Prettier |

### Configuración de Prettier

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

## 🤝 Contribuir

1. Crea una rama desde `master`: `git checkout -b feat/tu-funcionalidad`
2. Realiza los cambios siguiendo los [estándares de código](#-estándares-de-código)
3. Haz commit usando commits convencionales: `git commit -m "feat(scope): description"`
4. Sube los cambios y abre un Pull Request contra `master`

### Formato de Commit

```
type(scope): description

Types: feat, fix, docs, refactor, chore, style, perf, test, build, ci, revert
Scope: módulo o área de la funcionalidad (ej. products, inventory, auth, shared)
```

---

<p align="center">
  Hecho con ❤️ usando React, TypeScript y Supabase
  <br />
  <a href="https://github.com/alexcoronell/cheffcontrol">GitHub</a>
</p>
