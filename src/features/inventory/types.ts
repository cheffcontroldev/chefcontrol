import type { Product } from '../products/types';

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
  product: Product;
}

export interface CreateEntryMovement {
  productId: string;
  quantity: number;
  expirationDate: Date;
  notes?: string;
}

export interface EntryResult {
  success: boolean;
  movementId: string;
  lotId: string;
}
