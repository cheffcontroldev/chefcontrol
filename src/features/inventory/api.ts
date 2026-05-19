/* eslint-disable @typescript-eslint/no-explicit-any */
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
  TypeMovement,
} from './types';

const TABLE = 'movements';

export async function getMovements(restaurantId: string, filter: TypeMovement | null = null) {
  let query = supabase
    .from(TABLE)
    .select('*, products:products(*, units_of_measure(*))')
    .eq('restaurant_id', restaurantId);

  if (filter) {
    query = query.eq('type', filter);
  }

  const { data, error } = await query.order('movement_date', { ascending: false });

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

export async function createMovementExit(
  input: CreateExitMovement,
  restaurantId: string,
  userId: string
) {
  const request: RequestMovementExit = movementExitToRequest(input, restaurantId, userId);

  const { data, error } = await supabase.rpc('register_exit', request);

  if (error) throw new Error(error.message);

  if (data.error) {
    if (data.error === 'Insufficient stock') {
      throw new Error('No hay suficiente stock para realizar este movimiento');
    }
    throw new Error(data.error);
  }

  return responseToExitResult(data);
}

export async function cancelMovement(movementId: string, userId: string, cascade: boolean = false) {
  const { data, error } = await supabase.rpc('cancel_movement', {
    p_movement_id: movementId,
    p_user_id: userId,
    p_cascade: cascade,
  });

  if (error) throw new Error(error.message);

  // Si tiene dependencias y no pidió cascada
  if (!data.success && data.has_dependencies) {
    const err = new Error(data.error);
    (err as any).dependencies = data.dependencies;
    (err as any).hasDependencies = true;
    throw err;
  }

  if (!data.success) throw new Error(data.error);

  return data;
}
