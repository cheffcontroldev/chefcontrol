import { supabase } from '@/supabase/client';

import type { Lot } from './types';

import { responseToLots } from './mappers/lotMapper';

const TABLE = 'lots';

/** Get the total count of lots with positive stock for a restaurant. */
export async function getCountLots(restaurantId: string): Promise<number> {
  const { count, error } = await supabase
    .from(TABLE)
    .select('*', { count: 'exact', head: true })
    .eq('restaurant_id', restaurantId)
    .gt('current_quantity', 0);
  if (error) throw new Error(error.message);
  return count || 0;
}

/**
 * Get lots for a restaurant.
 *
 * By default only lots with `current_quantity > 0` are returned. Pass
 * `includeZeroStock = true` to include exhausted lots. Results are ordered
 * by `current_quantity` descending, then `expiration_date` ascending.
 *
 * Each lot includes the related product + unit-of-measure via a Supabase join.
 */
export async function getLots(restaurantId: string, includeZeroStock = false): Promise<Lot[]> {
  let query = supabase
    .from(TABLE)
    .select('*, products:products(*, units_of_measure(*))')
    .eq('restaurant_id', restaurantId);

  if (!includeZeroStock) {
    query = query.gt('current_quantity', 0);
  }

  const { data, error } = await query
    .order('current_quantity', { ascending: false })
    .order('expiration_date', { ascending: true });

  if (error) throw new Error(error.message);
  return responseToLots(data);
}
