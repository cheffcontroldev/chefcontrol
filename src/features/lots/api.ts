import { supabase } from '@/supabase/client';

import type { Lot } from './types';

import { responseToLots } from './mappers/lotMapper';

const TABLE = 'lots';

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
