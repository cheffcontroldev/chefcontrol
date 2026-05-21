import type { ResponseProduct } from '../products/mappers/productMapper';

/** Movement direction: entry (stock increase) or exit (stock decrease). */
export type TypeMovement = 'entry' | 'exit';

/** Movement model used in the UI. */
export interface Movement {
  id: string;
  productId: string;
  type: 'entry' | 'exit';
  quantity: number;
  movementDate: Date;
  reason: string;
  notes?: string;
  isCancelled: boolean;
  canceledAt?: Date;
  product: ResponseProduct;
}

/** Input for creating an entry movement (stock increase + lot creation). */
export interface CreateEntryMovement {
  productId: string;
  quantity: number;
  expirationDate: string;
  provider: string;
  notes?: string;
}

/** Input for creating an exit movement (stock decrease). */
export interface CreateExitMovement {
  productId: string;
  quantity: number;
  reason: string;
  notes?: string;
}

/** Result returned after a successful entry. */
export interface EntryResult {
  success: boolean;
  movementId: string;
  lotId: string;
}

/** Result returned after a successful exit. */
export interface ExitResult {
  success: boolean;
  movementId: string;
  consumedLots: string[];
}

/** Raw shape of a movement row returned by Supabase. */
export interface ResponseMovement {
  id: string;
  product_id: string;
  type: TypeMovement;
  quantity: number;
  movement_date: Date;
  expiration_date: Date;
  reason: string;
  notes?: string;
  is_cancelled: boolean;
  canceled_at?: Date;
  products: ResponseProduct;
}

/** Shape expected by the `register_entry` RPC. */
export interface RequestMovementEntry {
  p_product_id: string;
  p_user_id: string;
  p_restaurant_id: string;
  p_provider: string;
  p_quantity: number;
  p_expiration_date: string;
  p_notes: string;
}

/** Shape expected by the `register_exit` RPC. */
export interface RequestMovementExit {
  p_product_id: string;
  p_user_id: string;
  p_restaurant_id: string;
  p_quantity: number;
  p_reason: string;
  p_notes: string;
}

/** Raw result shape returned by `register_entry` RPC. */
export interface ResponseEntryResult {
  success: boolean;
  movement_id: string;
  lot_id: string;
}

/** Raw result shape returned by `register_exit` RPC. */
export interface ResponseExitResult {
  success: boolean;
  movement_id: string;
  consumed_lots: string[];
}
