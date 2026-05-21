import { supabase } from '@/supabase/client';

import type { CreateUnitOfMeasureInput, UpdateUnitOfMeasureInput } from './types';

import { responseToUnitOfMeasure, responseToUnitOfMeasures } from './mappers/unitOfMeasureMapper';

const TABLE = 'units_of_measure';

/** Get all non-deleted units of measure for a restaurant. */
export async function getUnitsOfMeasure(restaurantId: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('restaurant_id', restaurantId)
    .eq('is_deleted', false);
  if (error) throw new Error(error.message);
  return responseToUnitOfMeasures(data);
}

/** Get a single unit of measure by ID (only if not soft-deleted). */
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

/** Create a new unit of measure for the given restaurant. */
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

/** Update an existing unit of measure. */
export const updateUnitOfMeasure = async (id: string, input: UpdateUnitOfMeasureInput) => {
  const { data, error } = await supabase.from(TABLE).update(input).eq('id', id).single();

  if (error) throw new Error(error.message);

  return data;
};

/** Soft-delete a unit of measure by setting `is_deleted = true`. */
export const deleteUnitOfMeasure = async (id: string) => {
  const dto = { is_deleted: true };
  const { data, error } = await supabase.from(TABLE).update(dto).eq('id', id).single();

  if (error) throw new Error(error.message);

  return data;
};
