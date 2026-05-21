/**
 * Known user roles within the application.
 *
 * - `'Administrador'`: full access, can manage users and settings
 * - `'Almacén'`: warehouse / inventory management
 * - `'Cocinero'`: kitchen / production view
 */
export type Role = 'Administrador' | 'Almacén' | 'Cocinero';

/** Input payload for {@link ../api#signUp | signUp}. */
export interface AuthSignUpInput {
  email: string;
  password: string;
}

/** Input payload for {@link ../api#signIn | signIn}. */
export interface SignInInput {
  email: string;
  password: string;
}

/**
 * Data required to finish the first-time registration flow.
 * Sent to the `create_restaurant_and_user` database RPC.
 */
export interface CompleteRegistrationInput {
  /** Supabase auth user UUID returned after sign-up */
  authId: string;
  /** Email used during sign-up */
  email: string;
  /** Display name for the new restaurant */
  restaurantName: string;
  /** Optional restaurant address */
  restaurantAddress?: string;
  /** Optional restaurant phone number */
  restaurantPhone?: string;
  /** Name of the admin user */
  adminName: string;
}

/**
 * Full user record returned after a successful login.
 * Combines data from `auth.users`, the `users` table, and the `restaurants` table.
 */
export interface AuthUser {
  /** Primary key from the `users` table */
  id: string;
  /** UUID from `auth.users` */
  authId: string;
  /** User display name */
  name: string;
  /** User email address */
  email: string;
  /** Application role */
  role: Role;
  /** FK to the `restaurants` table */
  restaurantId: string;
  /** Restaurant display name */
  restaurantName: string;
  /** Optional restaurant address */
  restaurantAddress?: string;
  /** Optional restaurant phone */
  restaurantPhone?: string;
  /** Whether the user account is active */
  isActive: boolean;
}
