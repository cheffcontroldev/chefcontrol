import { supabase } from '@/supabase/client';

import type { Restaurant, UpdateRestaurant } from './types';

import { responseToRestaurant } from './mappers/restaurantMapper';

/**
 * Fetch a restaurant by its UUID.
 *
 * @param restaurantId - The restaurant's primary key
 * @returns A camelCase {@link Restaurant} object
 */
export const getRestaurant = async (restaurantId: string): Promise<Restaurant> => {
  const { data: restaurant, error } = await supabase
    .from('restaurants')
    .select()
    .eq('id', restaurantId)
    .single();
  if (error) throw error;
  return responseToRestaurant(restaurant);
};

/**
 * Update a restaurant's details. Only the provided fields are sent (partial
 * update via Supabase).
 *
 * @param restaurantId - The restaurant's primary key
 * @param data - Partial fields to update
 * @returns `true` on success
 */
export const updateRestaurant = async (restaurantId: string, data: UpdateRestaurant) => {
  const { error } = await supabase.from('restaurants').update(data).eq('id', restaurantId);
  if (error) throw error;
  return true;
};
