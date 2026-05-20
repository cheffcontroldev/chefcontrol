import type { ExpiringLot, responseExpiringLot } from '../types';

export const responseToExpingLot = (response: responseExpiringLot): ExpiringLot => {
  return {
    currentQuantity: response.current_quantity,
    daysRemaining: response.days_remaining,
    expirationDate: response.expiration_date,
    lotId: response.lot_id,
    productName: response.product_name,
  };
};

export const responseToExpingLots = (response: responseExpiringLot[]): ExpiringLot[] => {
  return response.map(responseToExpingLot);
};
