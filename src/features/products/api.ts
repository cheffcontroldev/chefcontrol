import { supabase } from '@/supabase/client';

import type { CreateProductInput, UpdateProductInput } from './types';

import { responseToProduct, responseToProducts, productToRequest } from './mappers/productMapper';

const TABLE = 'products';

export async function getProducts(restaurantId: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*, units_of_measure(*), categories(*)')
    .eq('restaurant_id', restaurantId)
    .eq('is_deleted', false);

  if (error) throw new Error(error.message);

  return responseToProducts(data);
}

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

export async function createProduct(input: CreateProductInput, restaurantId: string) {
  const dto = productToRequest(input);

  const { data, error } = await supabase
    .from(TABLE)
    .insert({ ...dto, restaurant_id: restaurantId });

  if (error) throw new Error(error.message);

  return data;
}

export const updateProduct = async (id: string, input: UpdateProductInput) => {
  const dto = productToRequest(input);

  const { data, error } = await supabase.from(TABLE).update(dto).eq('id', id).single();

  if (error) throw new Error(error.message);

  return data;
};

export const deleteProduct = async (id: string) => {
  const dto = { is_deleted: true };
  const { data, error } = await supabase.from(TABLE).update(dto).eq('id', id).single();

  if (error) throw new Error(error.message);

  return data;
};
