// =============================================================
// Validaciones de negocio: revisar los datos ANTES de procesarlos
// Patrón: se juntan TODOS los errores (no se corta en el primero),
// para que quien carga los datos los corrija de una sola vez.
// =============================================================
import type { Carrier, Product, Shipment, ValidationResult } from "../types/models";

// ✅ RESUELTA (ejemplo)
// Reglas del briefing para Shipment: quantity > 0, declaredValueUSD > 0, distanceKm >= 0.
export function validateShipment(shipment: Shipment): ValidationResult {
  const errors: string[] = [];

  if (shipment.quantity <= 0) {
    errors.push("quantity debe ser mayor que 0");
  }
  if (shipment.declaredValueUSD <= 0) {
    errors.push("declaredValueUSD debe ser mayor que 0");
  }
  if (shipment.destination.distanceKm < 0) {
    errors.push("destination.distanceKm debe ser mayor o igual a 0");
  }

  // valid se DERIVA de errors: así nunca pueden contradecirse.
  return { valid: errors.length === 0, errors };
}

// TODO 15: reglas de Product (sección "Reglas de Validación" del briefing):
//   - sku no vacío            → pista: product.sku.trim() === "" (un SKU de puros espacios también es vacío)
//   - weightKg > 0 y <= 100
//   - cada dimensión (lengthCm, widthCm, heightCm) > 0 y <= 200
//   - stockQuantity >= 0
//   - minStockThreshold >= 0
//   - unitCostUSD > 0
// Mismo patrón que validateShipment. Un mensaje claro por regla rota.
export function validateProduct(product: Product): ValidationResult {
  const errors: string[] = [];

  if (product.sku.trim() === "") {
    errors.push("sku no debe estar vacío");
  }
  // La regla dice "> 0 y <= 100": el error es lo contrario, "<= 0 o > 100".
  if (product.weightKg <= 0 || product.weightKg > 100) {
    errors.push("weightKg debe ser mayor que 0 y menor o igual a 100");
  }
  for (const [name, value] of Object.entries(product.dimensions)) {
    if (value <= 0 || value > 200) {
      errors.push(`dimensions.${name} debe ser mayor que 0 y menor o igual a 200`);
    }
  }
  if (product.stockQuantity < 0) {
    errors.push("stockQuantity debe ser mayor o igual a 0");
  }
  if (product.minStockThreshold < 0) {
    errors.push("minStockThreshold debe ser mayor o igual a 0");
  }
  if (product.unitCostUSD <= 0) {
    errors.push("unitCostUSD debe ser mayor que 0");
  }

  return { valid: errors.length === 0, errors };
}

// TODO 16: reglas de Carrier:
//   - baseRateUSD, ratePerKgUSD, ratePerKmUSD >= 0
//   - avgDeliveryDays > 0
//   - onTimeRate entre 0 y 100 (ambos incluidos)
//   - maxWeightKg > 0
//   - operatesIn con al menos 1 país
export function validateCarrier(carrier: Carrier): ValidationResult {
  const errors: string[] = [];

  const rates = {
    baseRateUSD: carrier.baseRateUSD,
    ratePerKgUSD: carrier.ratePerKgUSD,
    ratePerKmUSD: carrier.ratePerKmUSD,
  };
  for (const [name, value] of Object.entries(rates)) {
    if (value < 0) {
      errors.push(`${name} debe ser mayor o igual a 0`);
    }
  }
  if (carrier.avgDeliveryDays <= 0) {
    errors.push("avgDeliveryDays debe ser mayor que 0");
  }
  if (carrier.onTimeRate < 0 || carrier.onTimeRate > 100) {
    errors.push("onTimeRate debe estar entre 0 y 100");
  }
  if (carrier.maxWeightKg <= 0) {
    errors.push("maxWeightKg debe ser mayor que 0");
  }
  if (carrier.operatesIn.length === 0) {
    errors.push("operatesIn debe contener al menos 1 país");
  }

  return { valid: errors.length === 0, errors };
}
