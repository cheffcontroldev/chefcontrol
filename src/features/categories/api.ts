import { supabase } from '@/supabase/client';

import type { CreateCategoryInput, UpdateCategoryInput } from './types';

const TABLE = 'categories';

export async function getCategories(restaurantId: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('restaurant_id', restaurantId)
    .eq('is_deleted', false);
  if (error) throw new Error(error.message);
  return data;
}

export async function getCategory(id: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .eq('is_deleted', false)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createCategory(input: CreateCategoryInput, restaurantId: string) {
  const { name, description } = input;

  const newCategory = {
    name,
    description,
    restaurant_id: restaurantId,
  };

  const { data, error } = await supabase.from(TABLE).insert(newCategory);

  if (error) throw new Error(error.message);

  return data;
}

export const updateCategory = async (id: string, input: UpdateCategoryInput) => {
  const { data, error } = await supabase.from(TABLE).update(input).eq('id', id).single();

  if (error) throw new Error(error.message);

  return data;
};
