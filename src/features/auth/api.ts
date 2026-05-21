import { supabase } from '@/supabase/client';
import type { AuthSignUpInput, SignInInput, CompleteRegistrationInput, AuthUser } from './types';

/**
 * Create a new Supabase Auth user.
 *
 * After calling this the user must either confirm their email or go through the
 * {@link completeRegistration | complete registration flow}.
 *
 * @returns The new auth user's UUID and email.
 */
export async function signUp(input: AuthSignUpInput): Promise<{ userId: string; email: string }> {
  const { email, password } = input;
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw new Error(error.message);
  if (!data.user) throw new Error('No se pudo crear el usuario');

  return { userId: data.user.id, email: data.user.email! };
}

/**
 * Check whether a user record with the given auth UUID already exists in the
 * `users` table. Used to determine if the user needs to complete registration.
 */
export async function checkUserExists(authId: string): Promise<boolean> {
  const { data, error } = await supabase.from('users').select('id').eq('auth_id', authId).single();

  return !error && !!data;
}

/**
 * Execute the `create_restaurant_and_user` database RPC to finish the
 * first-time registration flow.
 *
 * This creates both a restaurant record and the admin user in a single
 * transaction.
 */
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

/**
 * Authenticate with email + password and return the full {@link AuthUser}
 * profile.
 *
 * The function performs three sequential queries:
 * 1. `supabase.auth.signInWithPassword`
 * 2. `users` table lookup by `auth_id`
 * 3. `restaurants` table lookup
 *
 * @throws `'INCOMPLETE_REGISTRATION'` when the auth user exists but has no
 *   corresponding `users` row.
 * @throws `'Usuario desactivado'` when the user account is inactive.
 * @throws `'Restaurante no encontrado'` when the user's restaurant is missing.
 */
export async function signIn(input: SignInInput): Promise<AuthUser> {
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
    throw new Error('INCOMPLETE_REGISTRATION');
  }

  if (!userData.is_active) {
    throw new Error('Usuario desactivado');
  }

  const { data: restaurantData, error: restaurantError } = await supabase
    .from('restaurants')
    .select('id, name, address, phone, email, is_active')
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
    isActive: userData.is_active,
  };

  return authUser;
}

/**
 * Retrieve the currently authenticated user's full profile.
 *
 * Checks the current Supabase session and, if valid, fetches the corresponding
 * `users` + `restaurants` rows. Returns `null` when there is no session or the
 * DB records are missing.
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return null;
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('id, name, email, role, restaurant_id, is_active')
    .eq('auth_id', session.user.id)
    .single();

  if (userError || !userData) {
    return null;
  }

  const { data: restaurantData, error: restaurantError } = await supabase
    .from('restaurants')
    .select('id, name, address, phone, email, is_active')
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
    isActive: userData.is_active,
  };

  return authUser;
}

/** Sign the current user out of Supabase Auth. */
export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
