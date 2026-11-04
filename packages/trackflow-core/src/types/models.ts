// =============================================================
// Modelos de dominio de TrackFlow (Hito 2)
// Fuente: 02-programming-fundamentals/trackflow-BRIEFING.md
// Los nombres de entidades y campos deben coincidir EXACTAMENTE con el briefing.
// =============================================================

// ---------- Tipos de valores cerrados (uniones de literales) ----------

export type ProductCategory = "Fashion" | "Electronics" | "Cosmetics" | "Home" | "Other";
export type WarehouseLocation = "Los Angeles" | "Zaragoza";
export type ProductStatus = "Active" | "Low stock" | "Out of stock" | "Discontinued";

export type Country = "United States" | "Spain";
export type ShipmentPriority = "Standard" | "Express" | "Same-day";
export type ShipmentStatus = "Pending" | "Assigned" | "In transit" | "Delivered" | "Failed";

export type MovementType = "Inbound" | "Outbound" | "Transfer" | "Adjustment";

export type SortOrder = "asc" | "desc";

// ---------- Producto ----------

export interface Dimensions {
  lengthCm: number;
  widthCm: number;
  heightCm: number;
}

export interface Product {
  sku: string; // Stock Keeping Unit (ej: "SHOE-BLK-42")
  name: string;
  category: ProductCategory;
  weightKg: number;
  dimensions: Dimensions;
  warehouse: WarehouseLocation;
  stockQuantity: number;
  minStockThreshold: number; // stock mínimo antes de alerta
  unitCostUSD: number;
  isFragile: boolean;
  status: ProductStatus;
}

// ---------- Envío ----------

export interface Destination {
  city: string;
  country: Country;
  postalCode: string;
  distanceKm: number; // distancia desde el almacén de origen
}

export interface Shipment {
  id: string; // ej: "SH-2024-8821"
  sku: string;
  quantity: number;
  origin: WarehouseLocation;
  destination: Destination;
  priority: ShipmentPriority;
  declaredValueUSD: number;
  carrier: string | null; // null si aún no tiene transportista asignado
  status: ShipmentStatus;
  createdAt: Date;
}

// ---------- Transportista ----------

export interface Carrier {
  id: string; // ej: "CAR-UPS"
  name: string;
  operatesIn: Country[];
  baseRateUSD: number;
  ratePerKgUSD: number;
  ratePerKmUSD: number;
  avgDeliveryDays: number;
  onTimeRate: number; // 0-100
  maxWeightKg: number;
  handlesFragile: boolean;
  acceptsPriority: ShipmentPriority[];
}

// ---------- Movimiento de inventario ----------

export interface InventoryMovement {
  id: string;
  sku: string;
  warehouse: WarehouseLocation;
  type: MovementType;
  quantity: number;
  reason: string;
  timestamp: Date;
}

// ---------- Tipos de retorno de las funciones ----------
// El briefing los escribe "en línea" ({ valid, errors }); aquí les damos nombre
// para no repetirlos en cada función.

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface CarrierSelection {
  carrier: Carrier;
  score: number;
  cost: number;
}

export interface CarrierUsage {
  carrier: string;
  count: number;
}
