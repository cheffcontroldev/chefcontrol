// features/reports/types.ts
import type { Product } from '@/features/products/types';
import type { UnitOfMeasure } from '@/features/unitsOfMeasure/types';

/* ──────────────── Report Filters ──────────────── */

export interface ReportFilter {
  fromDate?: string; // ISO date: '2026-05-01'
  toDate?: string; // ISO date: '2026-05-31'
  productId?: string;
  type?: 'entry' | 'exit';
}

/* ──────────────── Current Inventory Report ──────────────── */

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

export interface InventoryLotItem {
  lotId: string;
  expirationDate: string;
  currentQuantity: number;
  initialQuantity: number;
  daysRemaining: number;
  isExpired: boolean;
}

/* ──────────────── Movement Report ──────────────── */

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

export interface MovementDetailItem {
  lotId: string;
  quantity: number;
  expirationDate: string;
}

/* ──────────────── Expiration Report ──────────────── */

export interface ExpirationReportItem {
  lotId: string;
  productName: string;
  expirationDate: string;
  currentQuantity: number;
  daysRemaining: number;
  isExpired: boolean;
}

/* ──────────────── Low Stock Report (Historical) ──────────────── */

export interface LowStockReportItem {
  productId: string;
  productName: string;
  stockMinimum: number;
  currentStock: number;
  deficit: number;
}
/* ──────────────── Export Types ──────────────── */

export type ExportFormat = 'csv' | 'excel' | 'pdf';

export interface ExportOptions {
  format: ExportFormat;
  filename: string;
  data: unknown[];
}

export interface ResponseLot {
  id: string;
  expiration_date: string;
  current_quantity: number;
  initial_quantity: number;
  is_active: boolean;
}

export interface ResponseCategory {
  name: string;
}

export interface ResponseProductWithLots {
  id: string;
  name: string;
  stock_minimum: number;
  categories: ResponseCategory | null;
  units_of_measure: UnitOfMeasure;
  lots: ResponseLot[];
}

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

export interface ResponseExpiringLot {
  lot_id: string;
  product_name: string;
  expiration_date: string;
  current_quantity: number;
  days_remaining: number;
}

export interface ResponseLowStockItem {
  product_id: string;
  name: string;
  stock_minimum: number;
  current_stock: number;
  deficit: number;
}

export interface ResponseMovementDetail {
  quantity: number;
  lots: {
    id: string;
    expiration_date: string;
  } | null;
}
