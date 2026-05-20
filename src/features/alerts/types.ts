export interface ExpiringLot {
  currentQuantity: number;
  daysRemaining: number;
  expirationDate: string;
  lotId: string;
  productName: string;
}

export interface responseExpiringLot {
  current_quantity: number;
  days_remaining: 2;
  expiration_date: string;
  lot_id: string;
  product_name: string;
}
