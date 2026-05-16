import type { Movement, TypeMovement } from '../types';
import type { Product } from '@/features/products/types';

interface ResponseMovement {
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
  product: Product;
}

export const responseToMovement = (response: ResponseMovement): Movement => {
  return {
    id: response.id,
    productId: response.product_id,
    type: response.type,
    quantity: response.quantity,
    movementDate: response.movement_date,
    expirationDate: response.expiration_date,
    reason: response.reason,
    notes: response.notes,
    isCancelled: response.is_cancelled,
    canceledAt: response.canceled_at,
    product: response.product,
  };
};

export const responseToMovements = (responses: ResponseMovement[]): Movement[] => {
  return responses.map(responseToMovement);
};
