import type { ExpiringLot, ResponseExpiringLot, LowStock, ResponseLowStock } from '../types';

export const responseToExpingLot = (response: ResponseExpiringLot): ExpiringLot => {
  return {
    currentQuantity: response.current_quantity,
    daysRemaining: response.days_remaining,
    expirationDate: response.expiration_date,
    lotId: response.lot_id,
    productName: response.product_name,
  };
};

export const responseToExpingLots = (response: ResponseExpiringLot[]): ExpiringLot[] => {
  return response.map(responseToExpingLot);
};

export const responseToLowStock = (response: ResponseLowStock): LowStock => {
  return {
    id: response.id,
    productName: response.name,
    stockMinimun: response.stock_minimum,
    currentStock: response.current_stock,
    deficit: response.deficit,
    unitName: response.unit_name,
    unitAbbreviation: response.unit_abbreviation,
  };
};

export const responseToLowStocks = (response: ResponseLowStock[]): LowStock[] => {
  return response.map(responseToLowStock);
};
