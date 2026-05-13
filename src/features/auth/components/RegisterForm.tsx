import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'wouter';
import Input from '@/shared/components/Input';
import { authSignUpSchema, type AuthSignUpInput } from '../schemas';
import { useSignUp } from '../hooks/useSignUp';

export default function RegisterForm() {
  const { mutate, isPending, error } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSignUpInput>({
    resolver: zodResolver(authSignUpSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: AuthSignUpInput) => {
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
