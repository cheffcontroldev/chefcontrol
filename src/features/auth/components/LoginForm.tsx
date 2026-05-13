import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'wouter';
import Input from '@/shared/components/Input';
import { signInSchema, type SignInInput } from '../schemas';
import { useSignIn } from '../hooks/useSignIn';

export default function LoginForm() {
  const { mutate, isPending } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: SignInInput) => {
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

        <div className="flex flex-col justify-center items-center gap-2 py-1">
          <button type="submit" className="btn btn-success" disabled={isPending}>
            {isPending ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
          <p className="text-xs opacity-70">
            ¿No tienes una cuenta?{' '}
            <Link className="link" href="/registrarse">
              Regístrate
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
