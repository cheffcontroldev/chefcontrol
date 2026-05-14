import { supabase } from '@/supabase/client';

import type { CreateUserInput, UpdateMyUserInput, UpdateMyPasswordInput } from './types';

export async function getUsers(restaurantId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('restaurant_id', restaurantId);
  if (error) throw new Error(error.message);
  return data;
}

export async function getUser(id: string) {
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
}

export async function getMyUserId(authId: string) {
  const { data, error } = await supabase.from('users').select('id').eq('auth_id', authId).single();
  if (error) throw new Error(error.message);
  return data.id;
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

export const updateMyUser = async (authId: string, input: UpdateMyUserInput) => {
  if (input.email) {
    const { error: errorAuth } = await supabase.auth.updateUser({ email: input.email });
    if (errorAuth) throw new Error(errorAuth.message);
  }
  const { data, error } = await supabase.from('users').update(input).eq('auth_id', authId).single();

  if (error) throw new Error(error.message);

  return data;
};

export const updateMyPassword = async (password: UpdateMyPasswordInput['password']) => {
  const { error: errorAuth } = await supabase.auth.updateUser({ password });
  if (errorAuth) throw new Error(errorAuth.message);
};
