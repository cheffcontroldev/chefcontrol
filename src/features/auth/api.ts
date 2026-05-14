import { supabase } from '@/supabase/client';
import type { AuthSignUpInput, SignInInput, CompleteRegistrationInput, AuthUser } from './types';

export async function signUp(input: AuthSignUpInput): Promise<{ userId: string; email: string }> {
  const { email, password } = input;
  const { data, error } = await supabase.auth.signUp({ email, password });

  console.log('ERROR =======> ', error);
  if (error) throw new Error(error.message);
  if (!data.user) throw new Error('No se pudo crear el usuario');

  return { userId: data.user.id, email: data.user.email! };
}

export async function checkUserExists(authId: string): Promise<boolean> {
  const { data, error } = await supabase.from('users').select('id').eq('auth_id', authId).single();

  return !error && !!data;
}

export async function completeRegistration(input: CompleteRegistrationInput): Promise<void> {
  const { data, error } = await supabase.rpc('create_restaurant_and_user', {
    p_auth_id: input.authId,
    p_restaurant_name: input.restaurantName,
    p_admin_name: input.adminName,
    p_admin_email: input.email,
    p_restaurant_address: input.restaurantAddress || null,
    p_restaurant_phone: input.restaurantPhone || null,
  });

  if (error) throw new Error(error.message);

  const result = data as { success: boolean; error?: string };
  if (!result.success) {
    throw new Error(result.error ?? 'Error al crear restaurante');
  }
}

export async function signIn(input: SignInInput): Promise<AuthUser> {
  // 1. Login con Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });

  if (authError || !authData.user) {
    throw new Error(authError?.message ?? 'Credenciales inválidas');
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('id, name, email, role, restaurant_id, isActive')
    .eq('auth_id', authData.user.id)
    .single();

  if (userError || !userData) {
    throw new Error('INCOMPLETE_REGISTRATION');
  }

  if (!userData.isActive) {
    throw new Error('Usuario desactivado');
  }

  // 3. Consultar restaurante

  const { data: restaurantData, error: restaurantError } = await supabase
    .from('restaurants')
    .select('id, name, address, phone, email')
    .eq('id', userData.restaurant_id)
    .single();

  if (restaurantError || !restaurantData) {
    throw new Error('Restaurante no encontrado');
  }

  const authUser: AuthUser = {
    id: userData.id,
    authId: authData.user.id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
    restaurantId: userData.restaurant_id,
    restaurantName: restaurantData.name,
    restaurantAddress: restaurantData.address,
    restaurantPhone: restaurantData.phone,
    isActive: userData.isActive,
  };

  return authUser;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return null;
  }

  // Consultar users

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('id, name, email, role, restaurant_id, isActive')
    .eq('auth_id', session.user.id)
    .single();

  if (userError || !userData) {
    return null;
  }

  // Consultar restaurante

  const { data: restaurantData, error: restaurantError } = await supabase
    .from('restaurants')
    .select('id, name, address, phone, email')
    .eq('id', userData.restaurant_id)
    .single();

  if (restaurantError || !restaurantData) {
    return null;
  }

  const authUser: AuthUser = {
    id: userData.id,
    authId: session.user.id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
    restaurantId: userData.restaurant_id,
    restaurantName: restaurantData.name,
    restaurantAddress: restaurantData.address,
    restaurantPhone: restaurantData.phone,
    isActive: userData.isActive,
  };

  return authUser;
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
