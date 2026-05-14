import * as z from 'zod';

export const createUnitOfMeasureSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').trim(),
  abbreviation: z.string().min(1, 'La abreviatura es requerida').trim(),
});

export const updateUnitOfMeasureSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').trim(),
  abbreviation: z.string().min(1, 'La abreviatura es requerida').trim(),
});

export type CreateUnitOfMeasureInput = z.infer<typeof createUnitOfMeasureSchema>;
export type UpdateUnitOfMeasureInput = z.infer<typeof updateUnitOfMeasureSchema>;
