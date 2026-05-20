import { supabase } from '@/supabase/client';

import type { UpdateMyPasswordInput } from './types';
import type { User } from './types';
import type { UpdateUserInput } from './schemas';

export async function getUser(): Promise<User> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  if (!user) throw new Error('Usuario no autenticado');

  return {
    id: user.id,
    email: user.email || '',
    name: user.user_metadata?.display_name || '',
    role: 'Administrador',
    createdAt: user.created_at,
  };
}

export const updateMyUser = async (input: UpdateUserInput) => {
  const { data, error } = await supabase.auth.updateUser({
    data: { display_name: input.name },
  });

  if (error) throw new Error(error.message);

  return data;
};

export const updateMyPassword = async (password: UpdateMyPasswordInput['password']) => {
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw new Error(error.message);
};
