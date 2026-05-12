import * as z from 'zod';

export const signUpSchema = z
  .object({
    restaurantName: z
      .string()
      .min(1, 'El nombre del restaurante es requerido')
      .max(100, 'El nombre del restaurante no puede exceder 100 caracteres'),

    adminName: z
      .string()
      .min(1, 'El nombre del administrador es requerido')
      .max(100, 'El nombre del administrador no puede exceder 100 caracteres'),

    email: z.string().email('Correo electrónico inválido'),

    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),

    confirmPassword: z.string().min(1, 'La contraseña es requerida'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export const signInSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

export const recoverPasswordSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type RecoverPasswordInput = z.infer<typeof recoverPasswordSchema>;
