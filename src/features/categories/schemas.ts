import * as z from 'zod';

/**
 * Zod validation schema for creating a category.
 *
 * - `name`: required, trimmed
 * - `description`: optional
 */
export const createCategorySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').trim(),
  description: z.string().optional(),
});

/**
 * Zod validation schema for updating a category.
 *
 * - `name`: required, trimmed
 * - `description`: optional
 */
export const updateCategorySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').trim(),
  description: z.string().optional(),
});

/** Inferred type from {@link createCategorySchema}. */
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
/** Inferred type from {@link updateCategorySchema}. */
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
