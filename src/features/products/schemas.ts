import * as z from 'zod';

/**
 * Zod validation schema for creating a product.
 *
 * - `name`: required
 * - `description`: optional
 * - `skuCode`: required
 * - `stockMinimum`: >= 0
 * - `isActive`: defaults to `true`
 * - `unitOfMeasureId`: required
 * - `categoryId`: required
 */
export const createProductSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  skuCode: z.string().min(1, 'El código SKU es requerido'),
  stockMinimum: z.number().min(0, 'El stock mínimo debe ser mayor o igual a 0'),
  isActive: z.boolean().default(true),
  unitOfMeasureId: z.string().min(1, 'La unidad de medida es requerida'),
  categoryId: z.string().min(1, 'La categoría es requerida'),
});

/**
 * Zod validation schema for updating a product.
 *
 * All fields except `isActive` are required for the form (it resets with the
 * current value), but the underlying API call only sends provided fields.
 */
export const updateProductSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  skuCode: z.string().min(1, 'El código SKU es requerido'),
  stockMinimum: z.number().min(0, 'El stock mínimo debe ser mayor o igual a 0'),
  isActive: z.boolean().optional(),
  unitOfMeasureId: z.string().min(1, 'La unidad de medida es requerida'),
  categoryId: z.string().min(1, 'La categoría es requerida'),
});

/** Inferred type from {@link createProductSchema}. */
export type CreateProductInput = z.infer<typeof createProductSchema>;
/** Inferred type from {@link updateProductSchema}. */
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
