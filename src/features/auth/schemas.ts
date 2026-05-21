import * as z from 'zod';

/**
 * Zod validation schema for the login form.
 *
 * - `email`: must be a valid email address
 * - `password`: required, minimum 1 character
 */
export const signInSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

/**
 * Zod validation schema for the registration form.
 *
 * - `email`: valid email
 * - `password`: minimum 8 characters
 * - `confirmPassword`: must match `password`
 *
 * Uses `.refine()` to enforce matching passwords.
 */
export const authSignUpSchema = z
  .object({
    email: z.string().email('Correo electrónico inválido'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: z.string().min(1, 'La contraseña es requerida'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

/**
 * Zod validation schema for the first-time restaurant registration form.
 *
 * - `restaurantName`: required, max 100 chars
 * - `restaurantAddress`: optional
 * - `restaurantPhone`: optional
 * - `adminName`: required, max 100 chars
 */
export const completeRegistrationSchema = z.object({
  restaurantName: z.string().min(1).max(100),
  restaurantAddress: z.string().optional(),
  restaurantPhone: z.string().optional(),
  adminName: z.string().min(1).max(100),
});

/** Inferred type from {@link completeRegistrationSchema}. */
export type CompleteRegistrationFormInput = z.infer<typeof completeRegistrationSchema>;

/**
 * Extends the form input with runtime data that comes from the URL params /
 * session rather than the form itself.
 */
export interface CompleteRegistrationInput extends CompleteRegistrationFormInput {
  /** Supabase auth user UUID */
  authId: string;
  /** Email used during sign-up */
  email: string;
}

/** Inferred type from {@link signInSchema}. */
export type SignInInput = z.infer<typeof signInSchema>;

/** Inferred type from {@link authSignUpSchema}. */
export type AuthSignUpInput = z.infer<typeof authSignUpSchema>;
