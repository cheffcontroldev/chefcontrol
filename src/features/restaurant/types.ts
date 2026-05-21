/**
 * Restaurant model used in the UI (camelCase).
 */
export interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  createdAt: string;
  isActive: boolean;
}

/**
 * Raw shape of a restaurant row as returned by the Supabase client.
 * Uses `snake_case` column names.
 */
export interface ResponseRestaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  created_at: string;
  is_active: boolean;
}

/**
 * Input shape for updating restaurant details.
 * All fields are optional — only provided fields are sent to the DB.
 */
export interface UpdateRestaurant {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
}
