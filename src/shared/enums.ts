export const ROLE = ['Administrador', 'Almacén', 'Cocinero'] as const;

export type Role = (typeof ROLE)[number];
