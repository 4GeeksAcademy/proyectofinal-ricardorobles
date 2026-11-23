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
  const totalWeight = product.weightKg * shipment.quantity;
  let score = 0;

  if (carrier.operatesIn.includes(shipment.destination.country)) {
    score += 20;
  }
  if (totalWeight <= carrier.maxWeightKg) {
    score += 20;
  }
  if (carrier.acceptsPriority.includes(shipment.priority)) {
    score += 15;
  }
  if (!product.isFragile || carrier.handlesFragile) {
    score += 15;
  }
  score += carrier.onTimeRate * 0.3;

  return roundTo2(score);
}

// TODO 8 (decisión acordada con el negocio): RESTRICCIONES DURAS.
// Devuelve true solo si el transportista PUEDE hacer el envío:
//   opera en el país Y aguanta el peso Y acepta la prioridad Y (no es frágil O maneja frágiles).
// Por qué existe: con la regla literal del briefing (puntaje >= 50 y el más barato),
// UPS gana un envío a Madrid aunque no opera en España.
// Pista: son las mismas 4 condiciones del TODO 7, unidas con &&.
export function canHandleShipment(carrier: Carrier, shipment: Shipment, product: Product): boolean {
  const totalWeight = product.weightKg * shipment.quantity;
  return (
    carrier.operatesIn.includes(shipment.destination.country) &&
    totalWeight <= carrier.maxWeightKg &&
    carrier.acceptsPriority.includes(shipment.priority) &&
    (!product.isFragile || carrier.handlesFragile)
  );
}

// TODO 9: elegir el mejor transportista.
//   1. Quedarse con los que pasan canHandleShipment Y tienen puntaje >= 50.
//   2. Entre ellos, el de MENOR costo. Si empatan en costo, el de MAYOR puntaje.
//   3. Devolver { carrier, score, cost }, o null si no queda ninguno (incluye carriers = []).
// Pista: puedes recorrerlos con un for, calcular score y cost de cada uno,
// y guardar en una variable `best: CarrierSelection | null` el mejor visto hasta ahora.
export function selectBestCarrier(carriers: Carrier[], shipment: Shipment, product: Product): CarrierSelection | null {
  let best: CarrierSelection | null = null;

  for (const carrier of carriers) {
    if (!canHandleShipment(carrier, shipment, product)) {
      continue; // restricción dura: si no puede hacer el envío, ni se compara
    }
    const score = scoreCarrierForShipment(carrier, shipment, product);
    if (score < 50) {
      continue;
    }
    const cost = calculateShippingCost(shipment, product, carrier);

    const isCheaper = best === null || cost < best.cost;
    const tieButBetterScore = best !== null && cost === best.cost && score > best.score;
    if (isCheaper || tieButBetterScore) {
      best = { carrier, score, cost };
    }
  }

  return best;
}

// TODO 10: conteo por categoría, con TODAS las categorías aunque tengan 0.
// Pista: parte de un objeto con las 5 claves en 0 y suma 1 por cada producto:
//   const counts: Record<ProductCategory, number> = { Fashion: 0, Electronics: 0, ... };
export function countProductsByCategory(products: Product[]): Record<ProductCategory, number> {
  const counts: Record<ProductCategory, number> = {
    Fashion: 0,
    Electronics: 0,
    Cosmetics: 0,
    Home: 0,
    Other: 0,
  };
  for (const product of products) {
    counts[product.category] += 1;
  }
  return counts;
}

// TODO 11: valor total del inventario = suma de (stockQuantity * unitCostUSD). roundTo2.
// Pista: reduce((total, product) => total + ..., 0). El 0 inicial hace que [] devuelva 0.
export function calculateTotalInventoryValue(products: Product[]): number {
  const total = products.reduce((sum, product) => sum + product.stockQuantity * product.unitCostUSD, 0);
  return roundTo2(total);
}

// TODO 12: distancia promedio de los envíos (destination.distanceKm). roundTo2.
// ⚠️ Caso límite: con [] la división da 0 / 0 = NaN. Decisión: devolver 0.
export function calculateAverageShipmentDistance(shipments: Shipment[]): number {
  if (shipments.length === 0) {
    return 0; // evita 0 / 0 = NaN
  }
  const totalDistance = shipments.reduce((sum, shipment) => sum + shipment.destination.distanceKm, 0);
  return roundTo2(totalDistance / shipments.length);
}

// TODO 13: agrupar envíos por estado, con TODOS los estados aunque queden en [].
// Pista: mismo patrón que el TODO 10, pero cada clave parte con [] y haces push.
export function groupShipmentsByStatus(shipments: Shipment[]): Record<ShipmentStatus, Shipment[]> {
  const groups: Record<ShipmentStatus, Shipment[]> = {
    Pending: [],
    Assigned: [],
    "In transit": [],
    Delivered: [],
    Failed: [],
  };
  for (const shipment of shipments) {
    groups[shipment.status].push(shipment);
  }
  return groups;
}

// TODO 14: los N transportistas más usados.
//   1. Ignorar envíos con carrier === null.
//   2. Contar cuántos envíos tiene cada transportista.
//   3. Ordenar por conteo descendente; si empatan, por nombre alfabético (a.carrier.localeCompare(b.carrier)).
//   4. Devolver solo los primeros topN → slice(0, topN).
// Pista: para contar sin saber de antemano los nombres, usa un Record<string, number>
// o un Map<string, number>, y después conviértelo en un array de { carrier, count }.
export function findTopCarriers(shipments: Shipment[], topN: number): CarrierUsage[] {
  const counts: Record<string, number> = {};

  for (const shipment of shipments) {
    if (shipment.carrier === null) {
      continue;
    }
    counts[shipment.carrier] = (counts[shipment.carrier] ?? 0) + 1;
  }

  return Object.entries(counts)
    .map(([carrier, count]) => ({ carrier, count }))
    .sort((a, b) => b.count - a.count || a.carrier.localeCompare(b.carrier))
    .slice(0, topN);
}
