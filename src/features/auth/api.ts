import { supabase } from '../../supabase/client';
import type { SignUpInput, SignInInput, AuthUser } from './types';

async function signUp(input: SignUpInput): Promise<void> {
  const { email, password, restaurantName, adminName } = input;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        restaurantName,
        adminName,
      },
    },
  });
  if (error) throw new Error(error.message);
  if (!data.user) throw new Error('No se pudo crear el usuario');
}

async function signIn(input: SignInInput): Promise<AuthUser> {
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });

  if (authError || !authData.user) {
    throw new Error(authError?.message ?? 'Credenciales inválidas');
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('id, name, email, role, restaurant_id, is_active')
    .eq('auth_id', authData.user.id)
    .single();

  if (userError || !userData) {
    throw new Error('Usuario no encontrado en el sistema');
  }

  if (!userData.is_active) {
    throw new Error('Usuario desactivado');
  }

  return {
    id: userData.id,
    authId: authData.user.id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
    restaurantId: userData.restaurant_id,
    isActive: userData.is_active,
  };
}

async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

async function getCurrentUser(): Promise<AuthUser | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) return null;

  const { data: userData } = await supabase
    .from('users')
    .select('id, name, email, role, restaurant_id, is_active')
    .eq('auth_id', session.user.id)
    .single();

  if (!userData) return null;

  return {
    id: userData.id,
    authId: session.user.id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
    restaurantId: userData.restaurant_id,
    isActive: userData.is_active,
  };
}

export { signUp, signIn, signOut, getCurrentUser };
