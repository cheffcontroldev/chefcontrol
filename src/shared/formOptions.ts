/**
 * Array of valid user role names.
 * @description Serves as the single source of truth for available roles.
 * ⚠️ Note: Using Object.entries() on an array produces numeric keys ("0", "1", "2")
 * rather than semantic keys — this may not be suitable for all use cases.
 * @see roleOptions for the derived Record format
 */
export const Roles = ['Administrador', 'Almacén', 'Cocinero'] as const;

/**
 * Role options formatted as a Record for use in Select components.
 * @description Converts the Roles array into a Record<string, string> for
 * dropdown options. Keys are numeric strings from array indices.
 *
 * @example
 * roleOptions // { "0": "Administrador", "1": "Almacén", "2": "Cocinero" }
 */
export const roleOptions = Object.entries(Roles).reduce(
  (acc, [key, value]) => {
    acc[key] = value;
    return acc;
  },
  {} as Record<string, string>
);
