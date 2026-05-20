/* ──────────────── Mappers ──────────────── */

import type {
  ExpirationReportItem,
  InventoryLotItem,
  InventoryReportItem,
  LowStockReportItem,
  MovementDetailItem,
  MovementReportItem,
  ResponseExpiringLot,
  ResponseLot,
  ResponseLowStockItem,
  ResponseMovement,
  ResponseMovementDetail,
  ResponseProductWithLots,
} from '../types';

export function mapLotToDomain(lot: ResponseLot): InventoryLotItem {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expirationDate = new Date(lot.expiration_date);
  expirationDate.setHours(0, 0, 0, 0);

  const daysRemaining = Math.ceil(
    (expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return {
    lotId: lot.id,
    expirationDate: lot.expiration_date,
    currentQuantity: Number(lot.current_quantity),
    initialQuantity: Number(lot.initial_quantity),
    daysRemaining,
    isExpired: daysRemaining < 0,
  };
}

export function mapProductToInventoryItem(product: ResponseProductWithLots): InventoryReportItem {
  const lots = product.lots || [];
  const currentStock = lots.reduce(
    (sum: number, lot: ResponseLot) => sum + (lot.current_quantity || 0),
    0
  );

  return {
    productId: product.id,
    productName: product.name,
    categoryName: product.categories?.name || null,
    unitOfMeasure: product.units_of_measure,
    stockMinimum: Number(product.stock_minimum),
    currentStock,
    deficit: Number(product.stock_minimum) - currentStock,
    lots: lots.map(mapLotToDomain),
  };
}

export function mapMovementToDomain(movement: ResponseMovement): MovementReportItem {
  return {
    movementId: movement.id,
    movementDate: movement.movement_date,
    type: movement.type,
    product: movement.products,
    quantity: Number(movement.quantity),
    reason: movement.reason,
    notes: movement.notes,
    userName: movement.users?.name || '—',
    isCancelled: movement.is_cancelled,
    cancelledAt: movement.cancelled_at,
  };
}

export function mapExpiringLotToDomain(item: ResponseExpiringLot): ExpirationReportItem {
  return {
    lotId: item.lot_id,
    productName: item.product_name,
    expirationDate: item.expiration_date,
    currentQuantity: Number(item.current_quantity),
    daysRemaining: item.days_remaining,
    isExpired: item.days_remaining < 0,
  };
}

export function mapLowStockToDomain(item: ResponseLowStockItem): LowStockReportItem {
  return {
    productId: item.product_id,
    productName: item.name,
    stockMinimum: Number(item.stock_minimum),
    currentStock: Number(item.current_stock),
    deficit: Number(item.deficit),
  };
}

export function mapMovementDetailToDomain(detail: ResponseMovementDetail): MovementDetailItem {
  return {
    lotId: detail.lots?.id || '',
    quantity: Number(detail.quantity),
    expirationDate: detail.lots?.expiration_date || '',
  };
}
