import { supabase } from '@/supabase/client';

import type { CreateProductInput, UpdateProductInput } from './types';

import { responseToProduct, responseToProducts, productToRequest } from './mappers/productMapper';

const TABLE = 'products';

/** Get the total count of non-deleted products for a restaurant. */
export async function getCountProducts(restaurantId: string): Promise<number> {
  const { count, error } = await supabase
    .from(TABLE)
    .select('*', { count: 'exact', head: true })
    .eq('restaurant_id', restaurantId)
    .eq('is_deleted', false);
  if (error) throw new Error(error.message);
  return count || 0;
}

/**
 * Get all non-deleted products for a restaurant, including the related
 * unit-of-measure and category via Supabase joins.
 */
export async function getProducts(restaurantId: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*, units_of_measure(*), categories(*)')
    .eq('restaurant_id', restaurantId)
    .eq('is_deleted', false)
    .order('name', { ascending: true });

  if (error) throw new Error(error.message);

  return responseToProducts(data);
}

/** Get a single product by ID (only if not soft-deleted), with joins. */
export async function getProduct(id: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*, units_of_measure(*), categories(*)')
    .eq('id', id)
    .eq('is_deleted', false)
    .single();
  if (error) throw new Error(error.message);
  return responseToProduct(data);
}

/** Create a new product for the given restaurant. */
export async function createProduct(input: CreateProductInput, restaurantId: string) {
  const dto = productToRequest(input);

  const { data, error } = await supabase
    .from(TABLE)
    .insert({ ...dto, restaurant_id: restaurantId });

  if (error) throw new Error(error.message);

  return data;
}

/** Update an existing product. */
export const updateProduct = async (id: string, input: UpdateProductInput) => {
  const dto = productToRequest(input);

  const { data, error } = await supabase.from(TABLE).update(dto).eq('id', id).single();

  if (error) throw new Error(error.message);

  return data;
};

/** Soft-delete a product by setting `is_deleted = true`. */
export const deleteProduct = async (id: string) => {
  const dto = { is_deleted: true };
  const { data, error } = await supabase.from(TABLE).update(dto).eq('id', id).single();

  if (error) throw new Error(error.message);

  return data;
};
