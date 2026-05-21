import * as z from 'zod';

import { ROLE } from '@/shared/enums';

/**
 * Zod validation schema for creating a new user (admin flow).
 *
 * - `name`: required
 * - `email`: must be a valid email
 * - `password`: minimum 8 characters
 * - `role`: must be one of the values in `ROLE` enum
 */
export const createUserSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  role: z.enum(ROLE, {
    message: 'El rol es requerido',
  }),
});

/**
 * Zod validation schema for updating the current user's display name.
 *
 * - `name`: required
 */
export const updateUserSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
});

/**
 * Zod validation schema for updating the password.
 *
 * - `password`: minimum 6 characters
 * - `confirmPassword`: must match `password`
 *
 * Uses `.refine()` to enforce matching passwords.
 *
 * NOTE: minimum length (6) differs from the sign-up schema (8).
 */
export const updatePasswordSchema = z
  .object({
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

/** Inferred type from {@link createUserSchema}. */
export type CreateUserInput = z.infer<typeof createUserSchema>;
/** Inferred type from {@link updateUserSchema}. */
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
/** Inferred type from {@link updatePasswordSchema}. */
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
