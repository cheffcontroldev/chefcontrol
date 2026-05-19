import type { ResponseProduct } from '../products/mappers/productMapper';

export type TypeMovement = 'entry' | 'exit';

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

export interface CreateEntryMovement {
  productId: string;
  quantity: number;
  expirationDate: string;
  provider: string;
  notes?: string;
}

export interface CreateExitMovement {
  productId: string;
  quantity: number;
  reason: string;
  notes?: string;
}

export interface EntryResult {
  success: boolean;
  movementId: string;
  lotId: string;
}

export interface ExitResult {
  success: boolean;
  movementId: string;
  consumedLots: string[];
}

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
  products: Product;
}

export interface RequestMovementEntry {
  p_product_id: string;
  p_user_id: string;
  p_restaurant_id: string;
  p_provider: string;
  p_quantity: number;
  p_expiration_date: string;
  p_notes: string;
}

export interface RequestMovementExit {
  p_product_id: string;
  p_user_id: string;
  p_restaurant_id: string;
  p_quantity: number;
  p_reason: string;
  p_notes: string;
}

export interface ResponseEntryResult {
  success: boolean;
  movement_id: string;
  lot_id: string;
}

export interface ResponseExitResult {
  success: boolean;
  movement_id: string;
  consumed_lots: string[];
}
