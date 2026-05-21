// features/reports/types.ts
import type { Product } from '@/features/products/types';
import type { UnitOfMeasure } from '@/features/unitsOfMeasure/types';

/* ──────────────── Report Filters ──────────────── */

/** Filter parameters shared across report endpoints. */
export interface ReportFilter {
  fromDate?: string; // ISO date: '2026-05-01'
  toDate?: string; // ISO date: '2026-05-31'
  productId?: string;
  type?: 'entry' | 'exit';
}

/* ──────────────── Current Inventory Report ──────────────── */

/** A product with its lot breakdown for the current-inventory report. */
export interface InventoryReportItem {
  productId: string;
  productName: string;
  categoryName: string | null;
  unitOfMeasure: UnitOfMeasure;
  stockMinimum: number;
  currentStock: number;
  deficit: number;
  lots: InventoryLotItem[];
}

/** A single lot within an inventory report item. */
export interface InventoryLotItem {
  lotId: string;
  expirationDate: string;
  currentQuantity: number;
  initialQuantity: number;
  daysRemaining: number;
  isExpired: boolean;
}

/* ──────────────── Movement Report ──────────────── */

/** A single movement in the movement report. */
export interface MovementReportItem {
  movementId: string;
  movementDate: string;
  type: 'entry' | 'exit';
  product: Product;
  quantity: number;
  reason: string;
  notes: string | null;
  isCancelled: boolean;
  cancelledAt: string | null;
  consumedLots?: MovementDetailItem[];
}

/** Detail about lots consumed by an exit movement. */
export interface MovementDetailItem {
  lotId: string;
  quantity: number;
  expirationDate: string;
}

/* ──────────────── Expiration Report ──────────────── */

/** A lot that appears in the expiration report. */
export interface ExpirationReportItem {
  lotId: string;
  productName: string;
  expirationDate: string;
  currentQuantity: number;
  daysRemaining: number;
  isExpired: boolean;
}

/* ──────────────── Low Stock Report (Historical) ──────────────── */

/** A product that appears in the low-stock report. */
export interface LowStockReportItem {
  productId: string;
  productName: string;
  stockMinimum: number;
  currentStock: number;
  deficit: number;
}

/* ──────────────── Export Types ──────────────── */

/** Supported export file formats. */
export type ExportFormat = 'csv' | 'excel' | 'pdf';

/** Options for the export utility. */
export interface ExportOptions {
  format: ExportFormat;
  filename: string;
  data: unknown[];
}

/* ──────────────── Raw API Response Types ──────────────── */

/** @hidden */
export interface ResponseLot {
  id: string;
  expiration_date: string;
  current_quantity: number;
  initial_quantity: number;
  is_active: boolean;
}

/** @hidden */
export interface ResponseCategory {
  name: string;
}

/** @hidden */
export interface ResponseProductWithLots {
  id: string;
  name: string;
  stock_minimum: number;
  categories: ResponseCategory | null;
  units_of_measure: UnitOfMeasure;
  lots: ResponseLot[];
}

/** @hidden */
export interface ResponseMovement {
  id: string;
  movement_date: string;
  type: 'entry' | 'exit';
  quantity: number;
  reason: string;
  notes: string | null;
  is_cancelled: boolean;
  cancelled_at: string | null;
  products: Product;
}

/** @hidden */
export interface ResponseExpiringLot {
  lot_id: string;
  product_name: string;
  expiration_date: string;
  current_quantity: number;
  days_remaining: number;
}

/** @hidden */
export interface ResponseLowStockItem {
  product_id: string;
  name: string;
  stock_minimum: number;
  current_stock: number;
  deficit: number;
}

/** @hidden */
export interface ResponseMovementDetail {
  quantity: number;
  lots: {
    id: string;
    expiration_date: string;
  } | null;
}
