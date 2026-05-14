export const Roles = ['Administrador', 'Almacén', 'Cocinero'] as const;

export const roleOptions = Object.entries(Roles).reduce(
  (acc, [key, value]) => {
    acc[key] = value;
    return acc;
  },
  {} as Record<string, string>
);
