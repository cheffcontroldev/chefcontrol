import { supabase } from '@/supabase/client';

import type { Lot } from './types';

import { responseToLots } from './mappers/lotMapper';

const TABLE = 'lots';

export async function getLots(restaurantId: string): Promise<Lot[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*, products:products(*, units_of_measure(*))')
    .eq('restaurant_id', restaurantId)
    .order('current_quantity', { ascending: false })
    .order('expiration_date', { ascending: true });
  if (error) throw new Error(error.message);
  console.log(data);
  return responseToLots(data);
}
