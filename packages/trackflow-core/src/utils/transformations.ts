// =============================================================
// Costos, scoring de transportistas, agregaciones y reportes
// =============================================================
import type {
  Carrier,
  CarrierSelection,
  CarrierUsage,
  Product,
  ProductCategory,
  Shipment,
  ShipmentPriority,
  ShipmentStatus,
} from "../types/models";

// Redondea a 2 decimales. Se usa en varias funciones: una sola función, una sola responsabilidad.
export function roundTo2(value: number): number {
  return Math.round(value * 100) / 100;
}

// Recargo por prioridad del briefing. Un Record obliga a TypeScript a exigir
// las 3 prioridades: si mañana se agrega una cuarta, esto deja de compilar
// hasta que alguien defina su recargo.
const PRIORITY_SURCHARGE: Record<ShipmentPriority, number> = {
  Standard: 0,
  Express: 0.3,
  "Same-day": 0.6,
};

// ✅ RESUELTA (ejemplo)
// Decisión: el recargo se aplica sobre el subtotal (base + peso + distancia).
// Envío de ejemplo con UPS: (5 + 2.3 * 1.2 * 1 + 320 * 0.05) * 1.3 = 30.89
export function calculateShippingCost(shipment: Shipment, product: Product, carrier: Carrier): number {
  const baseCost = carrier.baseRateUSD;
  const weightCost = product.weightKg * carrier.ratePerKgUSD * shipment.quantity;
  const distanceCost = shipment.destination.distanceKm * carrier.ratePerKmUSD;
  const subtotal = baseCost + weightCost + distanceCost;
  const surcharge = PRIORITY_SURCHARGE[shipment.priority];
  return roundTo2(subtotal * (1 + surcharge));
}

// TODO 7: puntaje 0-100 de un transportista para un envío. Suma de 5 criterios:
//   - Opera en el país de destino ............ +20  (pista: carrier.operatesIn.includes(...))
//   - Aguanta el peso total .................. +20  (peso total = product.weightKg * shipment.quantity)
//   - Acepta la prioridad del envío .......... +15
//   - Frágil: +15 si el producto NO es frágil, o si lo es y el transportista maneja frágiles
//   - Confiabilidad .......................... onTimeRate * 0.3
// Devuelve roundTo2(total).
// Sugerencia: let score = 0; y un if por criterio. Es legible y fácil de revisar contra el briefing.
export function scoreCarrierForShipment(carrier: Carrier, shipment: Shipment, product: Product): number {
  throw new Error("TODO: scoreCarrierForShipment");
}

// TODO 8 (decisión acordada con el negocio): RESTRICCIONES DURAS.
// Devuelve true solo si el transportista PUEDE hacer el envío:
//   opera en el país Y aguanta el peso Y acepta la prioridad Y (no es frágil O maneja frágiles).
// Por qué existe: con la regla literal del briefing (puntaje >= 50 y el más barato),
// UPS gana un envío a Madrid aunque no opera en España.
// Pista: son las mismas 4 condiciones del TODO 7, unidas con &&.
export function canHandleShipment(carrier: Carrier, shipment: Shipment, product: Product): boolean {
  throw new Error("TODO: canHandleShipment");
}

// TODO 9: elegir el mejor transportista.
//   1. Quedarse con los que pasan canHandleShipment Y tienen puntaje >= 50.
//   2. Entre ellos, el de MENOR costo. Si empatan en costo, el de MAYOR puntaje.
//   3. Devolver { carrier, score, cost }, o null si no queda ninguno (incluye carriers = []).
// Pista: puedes recorrerlos con un for, calcular score y cost de cada uno,
// y guardar en una variable `best: CarrierSelection | null` el mejor visto hasta ahora.
export function selectBestCarrier(carriers: Carrier[], shipment: Shipment, product: Product): CarrierSelection | null {
  throw new Error("TODO: selectBestCarrier");
}

// TODO 10: conteo por categoría, con TODAS las categorías aunque tengan 0.
// Pista: parte de un objeto con las 5 claves en 0 y suma 1 por cada producto:
//   const counts: Record<ProductCategory, number> = { Fashion: 0, Electronics: 0, ... };
export function countProductsByCategory(products: Product[]): Record<ProductCategory, number> {
  throw new Error("TODO: countProductsByCategory");
}

// TODO 11: valor total del inventario = suma de (stockQuantity * unitCostUSD). roundTo2.
// Pista: reduce((total, product) => total + ..., 0). El 0 inicial hace que [] devuelva 0.
export function calculateTotalInventoryValue(products: Product[]): number {
  throw new Error("TODO: calculateTotalInventoryValue");
}

// TODO 12: distancia promedio de los envíos (destination.distanceKm). roundTo2.
// ⚠️ Caso límite: con [] la división da 0 / 0 = NaN. Decisión: devolver 0.
export function calculateAverageShipmentDistance(shipments: Shipment[]): number {
  throw new Error("TODO: calculateAverageShipmentDistance");
}

// TODO 13: agrupar envíos por estado, con TODOS los estados aunque queden en [].
// Pista: mismo patrón que el TODO 10, pero cada clave parte con [] y haces push.
export function groupShipmentsByStatus(shipments: Shipment[]): Record<ShipmentStatus, Shipment[]> {
  throw new Error("TODO: groupShipmentsByStatus");
}

// TODO 14: los N transportistas más usados.
//   1. Ignorar envíos con carrier === null.
//   2. Contar cuántos envíos tiene cada transportista.
//   3. Ordenar por conteo descendente; si empatan, por nombre alfabético (a.carrier.localeCompare(b.carrier)).
//   4. Devolver solo los primeros topN → slice(0, topN).
// Pista: para contar sin saber de antemano los nombres, usa un Record<string, number>
// o un Map<string, number>, y después conviértelo en un array de { carrier, count }.
export function findTopCarriers(shipments: Shipment[], topN: number): CarrierUsage[] {
  throw new Error("TODO: findTopCarriers");
}
