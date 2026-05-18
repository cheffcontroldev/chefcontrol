import { supabase } from '@/supabase/client';

import {
  responseToMovement,
  responseToMovements,
  responseToEntryResult,
  movementEntryToRequest,
  responseToExitResult,
  movementExitToRequest,
} from './mappers/movementMapper';

import type {
  CreateEntryMovement,
  CreateExitMovement,
  RequestMovementEntry,
  RequestMovementExit,
} from './types';

const TABLE = 'movements';

export async function getMovements(restaurantId: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*, products(*)')
    .eq('restaurant_id', restaurantId)
    .order('movement_date', { ascending: false });

  if (error) throw new Error(error.message);

  return responseToMovements(data);
}

export async function getMovement(id: string) {
  const { data, error } = await supabase.from(TABLE).select('*, products(*)').eq('id', id).single();
  if (error) throw new Error(error.message);
  return responseToMovement(data);
}

export async function createMovementEntry(
  input: CreateEntryMovement,
  restaurantId: string,
  userId: string
) {
  const request: RequestMovementEntry = movementEntryToRequest(input, restaurantId, userId);

  const { data, error } = await supabase.rpc('register_entry', request);

  if (error) throw new Error(error.message);

  return responseToEntryResult(data);
}

export async function createMovementExit(input: CreateExitMovement, userId: string) {
  const request: RequestMovementExit = movementExitToRequest(input, userId);

  const { data, error } = await supabase.rpc('register_exit', request);

  if (error) throw new Error(error.message);

  return responseToExitResult(data);
}
