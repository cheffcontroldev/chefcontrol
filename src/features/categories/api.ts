import { supabase } from '@/supabase/client';

import type { CreateCategoryInput, UpdateCategoryInput } from './types';

import { responseToCategory, responseToCategories } from './mappers/categoryMapper';

const TABLE = 'categories';

/** Get the total count of non-deleted categories for a restaurant. */
export async function getCountCategories(restaurantId: string) {
  const { count, error } = await supabase
    .from(TABLE)
    .select('*', { count: 'exact', head: true })
    .eq('restaurant_id', restaurantId)
    .eq('is_deleted', false);
  if (error) throw new Error(error.message);
  return count || 0;
}

/** Get all non-deleted categories for a restaurant, ordered by name. */
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

/** Get a single category by ID (only if not soft-deleted). */
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

/** Create a new category for the given restaurant. */
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

/** Update an existing category's name and/or description. */
export const updateCategory = async (id: string, input: UpdateCategoryInput) => {
  const { data, error } = await supabase.from(TABLE).update(input).eq('id', id).single();

  if (error) throw new Error(error.message);

  return data;
};

/** Soft-delete a category by setting `is_deleted = true`. */
export const deleteCategory = async (id: string) => {
  const dto = { is_deleted: true };
  const { data, error } = await supabase.from(TABLE).update(dto).eq('id', id).single();

  if (error) throw new Error(error.message);

  return data;
};
