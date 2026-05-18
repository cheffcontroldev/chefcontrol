import type { CreateExitMovement } from '../schemas';
import type {
  Movement,
  EntryResult,
  CreateEntryMovement,
  ResponseMovement,
  RequestMovementEntry,
  ResponseEntryResult,
  RequestMovementExit,
  ResponseExitResult,
  ExitResult,
} from '../types';

export const responseToMovement = (response: ResponseMovement): Movement => {
  return {
    id: response.id,
    productId: response.product_id,
    type: response.type,
    quantity: response.quantity,
    movementDate: response.movement_date,
    reason: response.reason,
    notes: response.notes,
    isCancelled: response.is_cancelled,
    canceledAt: response.canceled_at,
    product: response.products,
  };
};

export const responseToMovements = (responses: ResponseMovement[]): Movement[] => {
  return responses.map(responseToMovement);
};

export const movementEntryToRequest = (
  entry: CreateEntryMovement,
  restaurantId: string,
  userId: string
): RequestMovementEntry => {
  return {
    p_product_id: entry.productId,
    p_user_id: userId,
    p_restaurant_id: restaurantId,
    p_provider: entry.provider || '',
    p_expiration_date: entry.expirationDate,
    p_quantity: entry.quantity,
    p_notes: entry.notes || '',
  };
};

export const responseToEntryResult = (response: ResponseEntryResult): EntryResult => {
  return {
    success: response.success,
    movementId: response.movement_id,
    lotId: response.lot_id,
  };
};

export const movementExitToRequest = (
  exit: CreateExitMovement,
  restaurantId: string,
  userId: string
): RequestMovementExit => {
  return {
    p_product_id: exit.productId,
    p_user_id: userId,
    p_restaurant_id: restaurantId,
    p_quantity: exit.quantity,
    p_reason: exit.reason,
    p_notes: exit.notes || '',
  };
};

export const responseToExitResult = (response: ResponseExitResult): ExitResult => {
  return {
    success: response.success,
    movementId: response.movement_id,
    consumedLots: response.consumed_lots || [],
  };
};
