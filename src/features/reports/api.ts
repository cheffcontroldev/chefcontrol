// features/reports/api.ts
import { supabase } from '@/supabase/client';

import type {
  InventoryReportItem,
  MovementReportItem,
  ExpirationReportItem,
  LowStockReportItem,
  ReportFilter,
  MovementDetailItem,
  ResponseMovement,
  ResponseProductWithLots,
  ResponseExpiringLot,
  ResponseLowStockItem,
  ResponseMovementDetail,
} from './types';

import {
  mapExpiringLotToDomain,
  mapLowStockToDomain,
  mapMovementDetailToDomain,
  mapMovementToDomain,
  mapProductToInventoryItem,
} from './mappers/reportMapper';

/* ──────────────── API: Current Inventory ──────────────── */

export async function getInventoryReport(restaurantId: string): Promise<InventoryReportItem[]> {
  const { data, error } = await supabase
    .from('products')
    .select(
      `
      id,
      name,
      stock_minimum,
      categories(name),
      units_of_measure(*),
      lots!inner(id, expiration_date, current_quantity, initial_quantity, is_active)
    `
    )
    .eq('restaurant_id', restaurantId)
    .eq('is_active', true)
    .eq('lots.is_active', true)
    .order('name');

  if (error) throw new Error(error.message);

  return ((data as unknown as ResponseProductWithLots[]) || []).map(mapProductToInventoryItem);
}

/* ──────────────── API: Movements by Period ──────────────── */

export async function getMovementReport(
  restaurantId: string,
  filter: ReportFilter
): Promise<MovementReportItem[]> {
  let query = supabase
    .from('movements')
    .select(
      `
      id,
      movement_date,
      type,
      quantity,
      reason,
      notes,
      is_cancelled,
      cancelled_at,
      products(*, units_of_measure(*)),
      users(name)
    `
    )
    .eq('restaurant_id', restaurantId)
    .order('movement_date', { ascending: false });

  // Apply filters
  if (filter.fromDate) {
    query = query.gte('movement_date', `${filter.fromDate}T00:00:00`);
  }
  if (filter.toDate) {
    query = query.lte('movement_date', `${filter.toDate}T23:59:59`);
  }
  if (filter.productId) {
    query = query.eq('product_id', filter.productId);
  }
  if (filter.type) {
    query = query.eq('type', filter.type);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return ((data as unknown as ResponseMovement[]) || []).map(mapMovementToDomain);
}

/* ──────────────── API: Expiring Lots ──────────────── */

export async function getExpirationReport(
  restaurantId: string,
  days: number = 7
): Promise<ExpirationReportItem[]> {
  const { data, error } = await supabase.rpc('get_expiring_lots', {
    p_restaurant_id: restaurantId,
    p_days: days,
  });

  if (error) throw new Error(error.message);

  return ((data as unknown as ResponseExpiringLot[]) || []).map(mapExpiringLotToDomain);
}

/* ──────────────── API: Low Stock ──────────────── */

export async function getLowStockReport(restaurantId: string): Promise<LowStockReportItem[]> {
  const { data, error } = await supabase.rpc('get_low_stock', {
    p_restaurant_id: restaurantId,
  });

  if (error) throw new Error(error.message);

  return ((data as unknown as ResponseLowStockItem[]) || []).map(mapLowStockToDomain);
}

/* ──────────────── API: Movement Details (for exits) ──────────────── */

export async function getMovementDetails(movementId: string): Promise<MovementDetailItem[]> {
  const { data, error } = await supabase
    .from('movement_details')
    .select(
      `
      quantity,
      lots(id, expiration_date)
    `
    )
    .eq('movement_id', movementId);

  if (error) throw new Error(error.message);

  return ((data as unknown as ResponseMovementDetail[]) || []).map(mapMovementDetailToDomain);
}
