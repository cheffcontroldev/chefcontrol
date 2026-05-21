import type { Role } from '../auth/types';

/**
 * Simplified user profile returned from `supabase.auth.getUser()`.
 *
 * NOTE: the `role` field is currently hardcoded as `'Administrador'` in the
 * API layer — it does NOT reflect the actual DB role.
 */
export interface User {
  /** UUID from `auth.users` */
  id: string;
  /** User display name (from `user_metadata.display_name`) */
  name: string;
  /** User email address */
  email: string;
  /** Application role (currently always `'Administrador'`) */
  role: Role;
  /** ISO timestamp of when the auth user was created */
  createdAt: string;
}

/** Input for updating the current user's display name. */
export interface UpdateMyUserInput {
  name?: string;
  email?: string;
}

/** Input for updating the current user's password. */
export interface UpdateMyPasswordInput {
  password: string;
  confirmPassword: string;
}
