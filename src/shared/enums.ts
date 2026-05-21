/**
 * Available user roles as a const array.
 * @description Used for runtime validation and select options.
 * - 'Administrador': Full system access
 * - 'Almacén': Inventory and warehouse management
 * - 'Cocinero': Kitchen staff (read-only inventory)
 */
export const ROLE = ['Administrador', 'Almacén', 'Cocinero'] as const;

/**
 * Union type of all valid user roles.
 * @description Derives the Role type from the ROLE const array,
 * ensuring type safety and a single source of truth.
 */
export type Role = (typeof ROLE)[number];
