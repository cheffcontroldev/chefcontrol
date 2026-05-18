import { supabase } from '@/supabase/client';

import type { Lot } from './types';

import { responseToLot, responseToLots } from './mappers/lotMapper';

const TABLE = 'lots';

export async function getLots(restaurantId: string): Promise<Lot[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*, products(*)')
    .eq('restaurant_id', restaurantId)
    .order('current_quantity', { ascending: false })
    .order('expiration_date', { ascending: true });
  if (error) throw new Error(error.message);
  return responseToLots(data);
}

export async function getLot(id: string): Promise<Lot> {
  const { data, error } = await supabase.from(TABLE).select('*, products(*)').eq('id', id).single();
  if (error) throw new Error(error.message);
  return responseToLot(data);
}
