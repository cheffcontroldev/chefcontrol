import { supabase } from '@/supabase/client';

import { responseToExpingLots, responseToLowStocks } from './mappers/alertMapper';

/** Get the alert configuration (expiration alert days) for a restaurant. */
export async function getAlertConfig(restaurantId: string) {
  const { data, error } = await supabase
    .from('alert_config')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/** Update the expiration alert threshold (in days) for a restaurant. */
export async function updateAlertConfig(restaurantId: string, days: number) {
  const { data, error } = await supabase
    .from('alert_config')
    .update({ expiration_alert_days: days })
    .eq('restaurant_id', restaurantId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/** Get lots expiring within the given number of days. */
export const getExpiringLots = async (restaurantId: string, days: number = 3) => {
  const { data, error } = await supabase.rpc('get_expiring_lots', {
    p_restaurant_id: restaurantId,
    p_days: days,
  });
  if (error) throw error;
  return responseToExpingLots(data);
};

/** Get products that have fallen below their minimum stock threshold. */
export const getLowStock = async (restaurantId: string) => {
  const { data, error } = await supabase.rpc('get_low_stock', {
    p_restaurant_id: restaurantId,
  });
  if (error) throw error;
  return responseToLowStocks(data);
};
