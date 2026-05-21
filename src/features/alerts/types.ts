/** A lot that is expiring within the configured threshold. */
export interface ExpiringLot {
  currentQuantity: number;
  daysRemaining: number;
  expirationDate: string;
  lotId: string;
  productName: string;
}

/** Raw shape of an expiring-lot row returned by the RPC. */
export interface ResponseExpiringLot {
  current_quantity: number;
  days_remaining: 2;
  expiration_date: string;
  lot_id: string;
  product_name: string;
}

/** A product that has fallen below its minimum stock threshold. */
export interface LowStock {
  id: string;
  productName: string;
  stockMinimun: string;
  currentStock: number;
  deficit: number;
  unitName: string;
  unitAbbreviation: string;
}

/** Raw shape of a low-stock row returned by the RPC. */
export interface ResponseLowStock {
  id: string;
  name: string;
  stock_minimum: string;
  current_stock: number;
  deficit: number;
  unit_name: string;
  unit_abbreviation: string;
}
