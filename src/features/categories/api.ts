import { supabase } from '@/supabase/client';

import type { CreateCategoryInput, UpdateCategoryInput } from './types';

import { responseToCategory, responseToCategories } from './mappers/categoryMapper';

const TABLE = 'categories';

export async function getCategories(restaurantId: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('restaurant_id', restaurantId)
    .eq('is_deleted', false)
    .order('name', { ascending: true });
  if (error) throw new Error(error.message);
  return responseToCategories(data);
}

export async function getCategory(id: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .eq('is_deleted', false)
    .single();
  if (error) throw new Error(error.message);
  return responseToCategory(data);
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

export const deleteCategory = async (id: string) => {
  const dto = { is_deleted: true };
  const { data, error } = await supabase.from(TABLE).update(dto).eq('id', id).single();

  if (error) throw new Error(error.message);

  return data;
};
