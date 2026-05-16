import * as z from 'zod';

export const createMovementSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  productId: z.string().min(1, 'El producto es requerido'),
  quantity: z.number().min(1, 'La cantidad mínima requerida es 1'),
  movementDate: z
    .date()
    .min(new Date(), 'La fecha de movimiento debe ser mayor o igual a la fecha actual'),
  expirationDate: z
    .date()
    .min(new Date(), 'La fecha de vencimiento debe ser mayor o igual a la fecha actual'),
  reason: z.string().min(1, 'La razón del movimiento es requerida'),
});

export type CreateMovementInput = z.infer<typeof createMovementSchema>;
