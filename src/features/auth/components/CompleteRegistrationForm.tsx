import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { supabase } from '@/supabase/client';
import Input from '@/shared/components/Input';
import { completeRegistrationSchema, type CompleteRegistrationFormInput } from '../schemas';
import { useCompleteRegistration } from '../hooks/useCompleteRegistration';

/**
 * Form that finishes the first-time registration for users who signed up but
 * have no restaurant / user record yet.
 *
 * On mount it checks the current Supabase session. If there is no session the
 * user is redirected to the login page. Otherwise it extracts `authId` and
 * `email` from the session and renders a form for restaurant details.
 *
 * While the session is being resolved a full-screen loading spinner is shown.
 */
export default function CompleteRegistrationForm() {
  const [authId, setAuthId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [, navigate] = useLocation();

  const { mutate, isPending } = useCompleteRegistration(authId ?? '', email ?? '');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompleteRegistrationFormInput>({
    resolver: zodResolver(completeRegistrationSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        navigate('/ingresar');
        return;
      }

      setAuthId(session.user.id);
      setEmail(session.user.email ?? '');
    };

    getSession();
  }, [navigate]);

  const onSubmit = (data: CompleteRegistrationFormInput) => {
    if (!authId || !email) return;
    mutate(data);
  };

  if (!authId || !email) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full">
      <form
        className="space-y-3 w-full max-w-[500px]"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-xl font-bold text-center mb-4">Completa tu registro</h2>
        <p className="text-sm opacity-70 text-center mb-6">
          No encontramos tu restaurante. Por favor completa los datos.
        </p>

        <Input
          type="text"
          placeholder="Nombre del Restaurante"
          {...register('restaurantName')}
          errorMessage={errors.restaurantName?.message}
        />
        <Input
          type="text"
          placeholder="Dirección (opcional)"
          {...register('restaurantAddress')}
          errorMessage={errors.restaurantAddress?.message}
        />
        <Input
          type="text"
          placeholder="Teléfono (opcional)"
          {...register('restaurantPhone')}
          errorMessage={errors.restaurantPhone?.message}
        />
        <Input
          type="text"
          placeholder="Tu nombre"
          {...register('adminName')}
          errorMessage={errors.adminName?.message}
        />

        <div className="flex flex-col justify-center items-center gap-2 py-1">
          <button type="submit" className="btn btn-success" disabled={isPending}>
            {isPending ? 'Creando...' : 'Completar Registro'}
          </button>
        </div>
      </form>
    </div>
  );
}
