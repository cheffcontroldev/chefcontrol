import * as z from 'zod';

export const signInSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

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

export const completeRegistrationSchema = z.object({
  restaurantName: z.string().min(1).max(100),
  restaurantAddress: z.string().optional(),
  restaurantPhone: z.string().optional(),
  adminName: z.string().min(1).max(100),
});

export type CompleteRegistrationFormInput = z.infer<typeof completeRegistrationSchema>;

export interface CompleteRegistrationInput extends CompleteRegistrationFormInput {
  authId: string;
  email: string;
}

export type SignInInput = z.infer<typeof signInSchema>;
export type AuthSignUpInput = z.infer<typeof authSignUpSchema>;
