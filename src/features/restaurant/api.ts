import { supabase } from '@/supabase/client';

import type { Restaurant, UpdateRestaurant } from './types';

import { responseToRestaurant } from './mappers/restaurantMapper';

export const getRestaurant = async (restaurantId: string): Promise<Restaurant> => {
  const { data: restaurant, error } = await supabase
    .from('restaurants')
    .select()
    .eq('id', restaurantId)
    .single();
  if (error) throw error;
  return responseToRestaurant(restaurant);
};

export const updateRestaurant = async (restaurantId: string, data: UpdateRestaurant) => {
  const { error } = await supabase.from('restaurants').update(data).eq('id', restaurantId);
  if (error) throw error;
  return true;
};
