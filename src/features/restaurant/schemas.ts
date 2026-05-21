import * as z from 'zod';

/**
 * Zod validation schema for the restaurant update form.
 *
 * - `name`: required
 * - `email`: must be a valid email
 * - `phone`: optional
 * - `address`: optional
 */
export const updateRestaurantSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Correo electrónico inválido'),
  phone: z.string().optional(),
  address: z.string().optional(),
});

/** Inferred type from {@link updateRestaurantSchema}. */
export type UpdateRestaurantInput = z.infer<typeof updateRestaurantSchema>;
