import { supabase } from '@/supabase/client';

import type { UpdateMyPasswordInput } from './types';
import type { User } from './types';
import type { UpdateUserInput } from './schemas';

/**
 * Fetch the currently authenticated user's profile from `supabase.auth`.
 *
 * @returns A {@link User} object. Note that the `role` is hardcoded as
 *   `'Administrador'` — the actual DB role is not queried.
 */
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

/**
 * Update the current user's display name via Supabase Auth
 * (`user_metadata.display_name`).
 */
export const updateMyUser = async (input: UpdateUserInput) => {
  const { data, error } = await supabase.auth.updateUser({
    email: input.email,
    data: { display_name: input.name, email: input.email },
  });

  if (error) throw new Error(error.message);

  return data;
};

/**
 * Update the current user's password via Supabase Auth.
 *
 * Receives only the password string (the full input object is destructured at
 * the hook level).
 */
export const updateMyPassword = async (password: UpdateMyPasswordInput['password']) => {
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw new Error(error.message);
};
