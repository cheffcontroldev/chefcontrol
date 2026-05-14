import * as z from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  skuCode: z.string().min(1, 'El código SKU es requerido'),
  unitOfMeasureId: z.string().min(1, 'La unidad de medida es requerida'),
  stockMinimum: z.number().min(0, 'El stock mínimo debe ser mayor o igual a 0'),
  isActive: z.boolean(),
  categoryId: z.string().optional(),
});

export const UpdateProductSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  skuCode: z.string().min(1, 'El código SKU es requerido'),
  unitOfMeasureId: z.string().min(1, 'La unidad de medida es requerida'),
  stockMinimum: z.number().min(0, 'El stock mínimo debe ser mayor o igual a 0'),
  isActive: z.boolean(),
  categoryId: z.string().optional(),
});
