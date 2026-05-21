import * as z from 'zod';

/**
 * Zod validation schema for creating a unit of measure.
 *
 * - `name`: required, trimmed
 * - `abbreviation`: required, trimmed
 */
export const createUnitOfMeasureSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').trim(),
  abbreviation: z.string().min(1, 'La abreviatura es requerida').trim(),
});

/**
 * Zod validation schema for updating a unit of measure.
 *
 * - `name`: required, trimmed
 * - `abbreviation`: required, trimmed
 */
export const updateUnitOfMeasureSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').trim(),
  abbreviation: z.string().min(1, 'La abreviatura es requerida').trim(),
});

/** Inferred type from {@link createUnitOfMeasureSchema}. */
export type CreateUnitOfMeasureInput = z.infer<typeof createUnitOfMeasureSchema>;
/** Inferred type from {@link updateUnitOfMeasureSchema}. */
export type UpdateUnitOfMeasureInput = z.infer<typeof updateUnitOfMeasureSchema>;
