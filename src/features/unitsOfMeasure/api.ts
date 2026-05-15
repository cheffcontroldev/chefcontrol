import { supabase } from '@/supabase/client';

import type { CreateUnitOfMeasureInput, UpdateUnitOfMeasureInput } from './types';

import { responseToUnitOfMeasure, responseToUnitOfMeasures } from './mappers/unitOfMeasureMapper';

const TABLE = 'units_of_measure';

export async function getUnitsOfMeasure(restaurantId: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('restaurant_id', restaurantId)
    .eq('is_deleted', false);
  if (error) throw new Error(error.message);
  return responseToUnitOfMeasures(data);
}

export async function getUnitOfMeasure(id: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .eq('is_deleted', false)
    .single();
  if (error) throw new Error(error.message);
  return responseToUnitOfMeasure(data);
}

export async function createUnitOfMeasure(input: CreateUnitOfMeasureInput, restaurantId: string) {
  const { name, abbreviation } = input;

  const newUnitOfMeasure = {
    name,
    abbreviation,
    restaurant_id: restaurantId,
  };

  const { data, error } = await supabase.from(TABLE).insert(newUnitOfMeasure);

  if (error) throw new Error(error.message);

  return data;
}

export const updateUnitOfMeasure = async (id: string, input: UpdateUnitOfMeasureInput) => {
  const { data, error } = await supabase.from(TABLE).update(input).eq('id', id).single();

  if (error) throw new Error(error.message);

  return data;
};

export const deleteUnitOfMeasure = async (id: string) => {
  const dto = { is_deleted: true };
  const { data, error } = await supabase.from(TABLE).update(dto).eq('id', id).single();

  if (error) throw new Error(error.message);

  return data;
};
