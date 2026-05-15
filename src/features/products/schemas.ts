import * as z from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  skuCode: z.string().min(1, 'El código SKU es requerido'),
  stockMinimum: z.number().min(0, 'El stock mínimo debe ser mayor o igual a 0'),
  isActive: z.boolean().default(true),
  unitOfMeasureId: z.string().min(1, 'La unidad de medida es requerida'),
  categoryId: z.string().min(1, 'La categoría es requerida'),
});

export const updateProductSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  skuCode: z.string().min(1, 'El código SKU es requerido'),
  stockMinimum: z.number().min(0, 'El stock mínimo debe ser mayor o igual a 0'),
  isActive: z.boolean().optional(),
  unitOfMeasureId: z.string().min(1, 'La unidad de medida es requerida'),
  categoryId: z.string().min(1, 'La categoría es requerida'),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
