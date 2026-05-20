import { supabase } from '@/supabase/client';

import { responseToExpingLots, responseToLowStocks } from './mappers/alertMapper';

export const getExpiringLots = async (restaurantId: string, days: number = 3) => {
  const { data, error } = await supabase.rpc('get_expiring_lots', {
    p_restaurant_id: restaurantId,
    p_days: days,
  });
  if (error) throw error;
  return responseToExpingLots(data);
};

export const getLowStock = async (restaurantId: string) => {
  const { data, error } = await supabase.rpc('get_low_stock', {
    p_restaurant_id: restaurantId,
  });
  if (error) throw error;
  return responseToLowStocks(data);
};
