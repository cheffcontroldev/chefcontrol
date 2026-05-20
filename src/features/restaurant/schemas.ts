import * as z from 'zod';

export const updateRestaurantSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Correo electrónico inválido'),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export type UpdateRestaurantInput = z.infer<typeof updateRestaurantSchema>;
