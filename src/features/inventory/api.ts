import { supabase } from '@/supabase/client';

import { responseToMovement, responseToMovements } from './mappers/movementMapper';

const TABLE = 'movements';

export async function getMovements(restaurantId: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*, products(*)')
    .eq('restaurant_id', restaurantId)
    .order('movement_date', { ascending: false });

  if (error) throw new Error(error.message);

  return responseToMovements(data);
}

export async function getMovement(id: string) {
  const { data, error } = await supabase.from(TABLE).select('*, products(*)').eq('id', id).single();
  if (error) throw new Error(error.message);
  return responseToMovement(data);
}
