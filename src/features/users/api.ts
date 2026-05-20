import { supabase } from '@/supabase/client';

import type { UpdateMyUserInput, UpdateMyPasswordInput } from './types';

export async function getUser(id: string) {
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  console.log(data);
  return data;
}

export async function getMyUserId(authId: string) {
  const { data, error } = await supabase.from('users').select('id').eq('auth_id', authId).single();
  if (error) throw new Error(error.message);
  return data.id;
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
