import { supabase } from '@/supabase/client';

import type { CreateProductInput, UpdateProductInput } from './types';

const TABLE = 'products';

export async function getProducts(restaurantId: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*, units_of_measure(*), categories(*)')
    .eq('restaurant_id', restaurantId);
  if (error) throw new Error(error.message);
  return data;
}

export async function getProduct(id: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*, units_of_measure(*), categories(*)')
    .eq('id', id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createProduct(input: CreateProductInput, restaurantId: string) {
  const { name, description, skuCode, unitOfMeasureId, stockMinimum, categoryId } = input;

  const newProduct = {
    name,
    description,
    skuCode,
    unitOfMeasureId,
    stockMinimum,
    categoryId,
    isActive: true,
    restaurant_id: restaurantId,
  };

  const { data, error } = await supabase.from(TABLE).insert(newProduct);

  if (error) throw new Error(error.message);

  return data;
}

export const updateProduct = async (id: string, input: UpdateProductInput) => {
  const { data, error } = await supabase.from(TABLE).update(input).eq('id', id).single();

  if (error) throw new Error(error.message);

  return data;
};

export const deleteProduct = async (id: string) => {
  const dto = { is_deleted: true };
  const { data, error } = await supabase.from(TABLE).update(dto).eq('id', id).single();

  if (error) throw new Error(error.message);

  return data;
};
