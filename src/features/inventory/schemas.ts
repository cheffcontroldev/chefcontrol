import * as z from 'zod';

import { isTodayOrFuture } from '@/shared/utils/dataHelpers';

/**
 * Zod validation schema for creating an entry movement.
 *
 * - `productId`: required
 * - `provider`: required
 * - `quantity`: >= 1
 * - `expirationDate`: must be today or in the future (validated via
 *   `isTodayOrFuture`)
 * - `notes`: optional
 */
export const createMovementEntrySchema = z.object({
  productId: z.string().min(1, 'El producto es requerido'),
  provider: z.string().min(1, 'El proveedor es requerido'),
  quantity: z.number().min(1, 'La cantidad mínima requerida es 1'),
  expirationDate: z
    .string()
    .min(1, 'La fecha de vencimiento es requerida')
    .refine(isTodayOrFuture, 'La fecha de vencimiento debe ser mayor o igual a la fecha actual'),
  notes: z.string().optional(),
});

/**
 * Zod validation schema for creating an exit movement.
 *
 * - `productId`: required
 * - `quantity`: must be positive
 * - `reason`: required
 * - `notes`: optional
 */
export const createMovementExitSchema = z.object({
  productId: z.string().min(1, 'El producto es requerido'),
  quantity: z.number().positive(),
  reason: z.string().min(1, 'El motivo es requerido'),
  notes: z.string().optional(),
});

/** Inferred type from {@link createMovementEntrySchema}. */
export type CreateEntryMovement = z.infer<typeof createMovementEntrySchema>;
/** Inferred type from {@link createMovementExitSchema}. */
export type CreateExitMovement = z.infer<typeof createMovementExitSchema>;
