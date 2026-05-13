import { supabase } from '@/supabase/client';

import type { CreateUserInput, UpdateUserInput, UpdatePasswordInput } from './types';

export async function getUsers() {
  const { data, error } = await supabase.from('users').select('*');
  if (error) throw new Error(error.message);
  return data;
}

export async function getUser(id: string) {
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createUser(input: CreateUserInput, restaurantId: string) {
  const { name, email, password, role } = input;

  const { data: dataAuth, error: errorAuth } = await supabase.auth.signUp({ email, password });

  if (errorAuth) throw new Error(errorAuth.message);

  const newUser = {
    name,
    role,
    restaurant_id: restaurantId,
    auth_id: dataAuth.user.id,
    isActive: true,
  };

  const { data, error } = await supabase.from('users').insert(newUser);

  if (error) throw new Error(error.message);

  return data;
}

export const updateMyUser = async (id: string, input: UpdateUserInput) => {
  const user = await getUser(id);
  if (!user) throw new Error('Usuario no encontrado');

  if (input.email) {
    const { error: errorAuth } = await supabase.auth.updateUser({ email: input.email });
    if (errorAuth) throw new Error(errorAuth.message);
  }
  const { data, error } = await supabase.from('users').update(input).eq('id', id).single();

  if (error) throw new Error(error.message);

  return data;
};

export const updateMyPassword = async (password: UpdatePasswordInput['password']) => {
  const { error: errorAuth } = await supabase.auth.updateUser({ password });
  if (errorAuth) throw new Error(errorAuth.message);
};
