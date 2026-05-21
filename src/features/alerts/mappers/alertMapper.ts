import type { ExpiringLot, ResponseExpiringLot, LowStock, ResponseLowStock } from '../types';

/** Convert a single Supabase expiring-lot row to the UI model. */
export const responseToExpingLot = (response: ResponseExpiringLot): ExpiringLot => {
  return {
    currentQuantity: response.current_quantity,
    daysRemaining: response.days_remaining,
    expirationDate: response.expiration_date,
    lotId: response.lot_id,
    productName: response.product_name,
  };
};

/** Convert an array of Supabase expiring-lot rows to the UI model. */
export const responseToExpingLots = (response: ResponseExpiringLot[]): ExpiringLot[] => {
  return response.map(responseToExpingLot);
};

/** Convert a single Supabase low-stock row to the UI model. */
export const responseToLowStock = (response: ResponseLowStock): LowStock => {
  return {
    id: response.id,
    productName: response.name,
    stockMinimun: Number(response.stock_minimum),
    currentStock: response.current_stock,
    deficit: response.deficit,
    unitName: response.unit_name,
    unitAbbreviation: response.unit_abbreviation,
  };
};

/** Convert an array of Supabase low-stock rows to the UI model. */
export const responseToLowStocks = (response: ResponseLowStock[]): LowStock[] => {
  return response.map(responseToLowStock);
};
