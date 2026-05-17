import * as z from 'zod';

export const createMovementEntrySchema = z.object({
  productId: z.string().min(1, 'El producto es requerido'),
  provider: z.string().min(1, 'El proveedor es requerido'),
  quantity: z.number().min(1, 'La cantidad mínima requerida es 1'),
  expirationDate: z
    .string()
    .min(1, 'La fecha de vencimiento es requerida')
    .refine((date) => {
      const selected = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected > today;
    }, 'La fecha de vencimiento debe ser mayor o igual a la fecha actual'),
  notes: z.string().optional(),
});

export const createMovementExitSchema = z.object({
  productId: z.string().min(1, 'El producto es requerido'),
  quantity: z.number().positive(),
  reason: z.string().min(1, 'El motivo es requerido'),
  notes: z.string().optional(),
});

export type CreateEntryMovement = z.infer<typeof createMovementEntrySchema>;
export type CreateExitMovement = z.infer<typeof createMovementExitSchema>;
