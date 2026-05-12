import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'wouter';
import Input from '@/shared/components/Input';
import { signUpSchema, type SignUpInput } from '../schemas';
import { useSignUp } from '../hooks/useSignUp';

export default function RegisterForm() {
  const { mutate, isPending, error } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: SignUpInput) => {
    mutate(data);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <form
        className="space-y-3 w-full max-w-[500px]"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          placeholder="Nombre del Restaurante"
          {...register('restaurantName')}
          errorMessage={errors.restaurantName?.message}
        />
        <Input
          type="text"
          placeholder="Nombre del Administrador"
          {...register('adminName')}
          errorMessage={errors.adminName?.message}
        />

        <Input
          type="email"
          placeholder="Email"
          {...register('email')}
          errorMessage={errors.email?.message}
        />

        <Input
          type="password"
          placeholder="Contraseña"
          {...register('password')}
          errorMessage={errors.password?.message}
        />

        <Input
          type="password"
          placeholder="Confirmar Contraseña"
          {...register('confirmPassword')}
          errorMessage={errors.confirmPassword?.message}
        />

        {error && <div className="text-error text-sm text-center">{error.message}</div>}

        <div className="flex flex-col justify-center items-center gap-2 py-1">
          <button type="submit" className="btn btn-success" disabled={isPending}>
            {isPending ? 'Registrando...' : 'Registrarse'}
          </button>
          <p className="text-xs opacity-70">
            ¿Ya tienes una cuenta?{' '}
            <Link className="link" href="/login">
              Inicia sesión
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
