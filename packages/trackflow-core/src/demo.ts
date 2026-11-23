// =============================================================
// Demo y verificación del Hito 2  →  npm run demo
// Cada línea compara el resultado de una función con el valor esperado:
//   ✅ correcto   ❌ distinto (muestra los dos valores)   ⏳ todavía es un TODO
// Los valores esperados se calcularon a mano a partir de las reglas del briefing.
// =============================================================
import type { Carrier, Product, Shipment } from "./types/models";
import { allShipments, sampleCarriers, sampleProducts, sampleShipment } from "./data/sample-data";
import {
  filterLowStockProducts,
  filterProductsByCategory,
  filterProductsByWarehouse,
  sortCarriersByReliability,
  sortProductsByStock,
} from "./utils/collections";
import { binarySearchProductByWeight, findProductBySKU, findShipmentById } from "./utils/search";
import {
  calculateAverageShipmentDistance,
  calculateShippingCost,
  calculateTotalInventoryValue,
  canHandleShipment,
  countProductsByCategory,
  findTopCarriers,
  groupShipmentsByStatus,
  scoreCarrierForShipment,
  selectBestCarrier,
} from "./utils/transformations";
import { validateCarrier, validateProduct, validateShipment } from "./utils/validations";

let passed = 0;
let failed = 0;
let pending = 0;

function check(label: string, run: () => unknown, expected: unknown): void {
  try {
    const actual = run();
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
      passed++;
      console.log(`  ✅ ${label}`);
    } else {
      failed++;
      console.log(`  ❌ ${label}`);
      console.log(`       esperado: ${JSON.stringify(expected)}`);
      console.log(`       obtenido: ${JSON.stringify(actual)}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.startsWith("TODO")) {
      pending++;
      console.log(`  ⏳ ${label}  (${message})`);
    } else {
      failed++;
      console.log(`  💥 ${label}  → error: ${message}`);
    }
  }
}

// Helpers para comparar solo lo importante (los identificadores)
const skus = (products: Product[]): string[] => products.map((p) => p.sku);
const carrierIds = (carriers: Carrier[]): string[] => carriers.map((c) => c.id);
const ids = (shipments: Shipment[]): string[] => shipments.map((s) => s.id);

const [ups, seur, dhl] = sampleCarriers;
const laptop = sampleProducts[1];
const shoes = sampleProducts[0];
const shoesShipment = allShipments[1]; // SH-2024-8822, Standard, 2 unidades, 190 km

console.log("\n📦 Colecciones");
check("filtrar por almacén Los Angeles", () => skus(filterProductsByWarehouse(sampleProducts, "Los Angeles")), ["SHOE-BLK-42", "PERFUME-COCO-50"]);
check("filtrar por categoría Electronics", () => skus(filterProductsByCategory(sampleProducts, "Electronics")), ["LAPTOP-DELL-15"]);
check("filtrar categoría sin productos (Home) → []", () => skus(filterProductsByCategory(sampleProducts, "Home")), []);
check("stock bajo (stock <= mínimo)", () => skus(filterLowStockProducts(sampleProducts)), ["LAPTOP-DELL-15"]);
check("ordenar por stock asc", () => skus(sortProductsByStock(sampleProducts, "asc")), ["LAPTOP-DELL-15", "SHOE-BLK-42", "PERFUME-COCO-50"]);
check("ordenar por stock desc", () => skus(sortProductsByStock(sampleProducts, "desc")), ["PERFUME-COCO-50", "SHOE-BLK-42", "LAPTOP-DELL-15"]);
check("ordenar NO muta el array original", () => { sortProductsByStock(sampleProducts, "asc"); return skus(sampleProducts); }, ["SHOE-BLK-42", "LAPTOP-DELL-15", "PERFUME-COCO-50"]);
check("transportistas por confiabilidad desc", () => carrierIds(sortCarriersByReliability(sampleCarriers, "desc")), ["CAR-DHL", "CAR-SEUR", "CAR-UPS"]);
check("transportistas por confiabilidad asc", () => carrierIds(sortCarriersByReliability(sampleCarriers, "asc")), ["CAR-UPS", "CAR-SEUR", "CAR-DHL"]);
check("ordenar transportistas NO muta el original", () => { sortCarriersByReliability(sampleCarriers, "desc"); return carrierIds(sampleCarriers); }, ["CAR-UPS", "CAR-SEUR", "CAR-DHL"]);

console.log("\n🔎 Búsquedas");
check("SKU sin distinguir mayúsculas", () => findProductBySKU(sampleProducts, "shoe-blk-42")?.sku, "SHOE-BLK-42");
check("SKU inexistente → null", () => findProductBySKU(sampleProducts, "NOPE-000"), null);
check("envío por id", () => findShipmentById(allShipments, "SH-2024-8823")?.id, "SH-2024-8823");
check("envío inexistente → null", () => findShipmentById(allShipments, "SH-0000"), null);
check("envío en array vacío → null", () => findShipmentById([], "SH-2024-8821"), null);
const byWeight = [...sampleProducts].sort((a, b) => a.weightKg - b.weightKg); // [0.3, 0.8, 2.3]
check("binaria: peso 0.8 → índice 1", () => binarySearchProductByWeight(byWeight, 0.8), 1);
check("binaria: peso 0.3 → índice 0 (primero)", () => binarySearchProductByWeight(byWeight, 0.3), 0);
check("binaria: peso 2.3 → índice 2 (último)", () => binarySearchProductByWeight(byWeight, 2.3), 2);
check("binaria: peso inexistente → -1", () => binarySearchProductByWeight(byWeight, 5), -1);
check("binaria: array vacío → -1", () => binarySearchProductByWeight([], 1), -1);

console.log("\n🚚 Costos y transportistas (envío de ejemplo: laptop a Madrid, Express)");
check("costo UPS", () => calculateShippingCost(sampleShipment, laptop, ups), 30.89);
check("costo SEUR", () => calculateShippingCost(sampleShipment, laptop, seur), 46.22);
check("costo DHL", () => calculateShippingCost(sampleShipment, laptop, dhl), 63.18);
check("costo Standard sin recargo (zapatillas x2 con UPS)", () => calculateShippingCost(shoesShipment, shoes, ups), 16.42);
check("puntaje UPS (no opera en España)", () => scoreCarrierForShipment(ups, sampleShipment, laptop), 76.4);
check("puntaje SEUR", () => scoreCarrierForShipment(seur, sampleShipment, laptop), 97.6);
check("puntaje DHL", () => scoreCarrierForShipment(dhl, sampleShipment, laptop), 98.5);
check("UPS NO puede hacer el envío", () => canHandleShipment(ups, sampleShipment, laptop), false);
check("SEUR sí puede hacer el envío", () => canHandleShipment(seur, sampleShipment, laptop), true);
check("mejor transportista → SEUR (no UPS)", () => {
  const best = selectBestCarrier(sampleCarriers, sampleShipment, laptop);
  return best ? { carrier: best.carrier.id, score: best.score, cost: best.cost } : null;
}, { carrier: "CAR-SEUR", score: 97.6, cost: 46.22 });
check("sin transportistas → null", () => selectBestCarrier([], sampleShipment, laptop), null);
check("solo UPS para España → null", () => selectBestCarrier([ups], sampleShipment, laptop), null);

console.log("\n📊 Reportes");
check("conteo por categoría (incluye las que tienen 0)", () => countProductsByCategory(sampleProducts), { Fashion: 1, Electronics: 1, Cosmetics: 1, Home: 0, Other: 0 });
check("valor total del inventario", () => calculateTotalInventoryValue(sampleProducts), 16975);
check("valor total con [] → 0", () => calculateTotalInventoryValue([]), 0);
check("distancia promedio", () => calculateAverageShipmentDistance(allShipments), 311);
check("distancia promedio con [] → 0 (no NaN)", () => calculateAverageShipmentDistance([]), 0);
check("agrupar por estado", () => {
  const groups = groupShipmentsByStatus(allShipments);
  return { Pending: ids(groups.Pending), Assigned: ids(groups.Assigned), "In transit": ids(groups["In transit"]), Delivered: ids(groups.Delivered), Failed: ids(groups.Failed) };
}, { Pending: ["SH-2024-8821"], Assigned: [], "In transit": ["SH-2024-8823"], Delivered: ["SH-2024-8822", "SH-2024-8824"], Failed: ["SH-2024-8825"] });
check("top 2 transportistas (empate → alfabético)", () => findTopCarriers(allShipments, 2), [{ carrier: "SEUR", count: 2 }, { carrier: "DHL Express", count: 1 }]);
check("top 5 cuando solo hay 3", () => findTopCarriers(allShipments, 5), [{ carrier: "SEUR", count: 2 }, { carrier: "DHL Express", count: 1 }, { carrier: "UPS", count: 1 }]);
check("top con [] → []", () => findTopCarriers([], 3), []);

console.log("\n🛡️ Validaciones");
check("producto válido", () => validateProduct(shoes), { valid: true, errors: [] });
check("producto inválido → 5 errores", () => {
  const bad: Product = { ...shoes, sku: "   ", weightKg: 0, dimensions: { lengthCm: 35, widthCm: 22, heightCm: 250 }, stockQuantity: -1, unitCostUSD: 0 };
  const result = validateProduct(bad);
  return { valid: result.valid, errorCount: result.errors.length };
}, { valid: false, errorCount: 5 });
check("envío válido", () => validateShipment(sampleShipment), { valid: true, errors: [] });
check("envío inválido → 3 errores", () => {
  const bad: Shipment = { ...sampleShipment, quantity: 0, declaredValueUSD: -5, destination: { ...sampleShipment.destination, distanceKm: -1 } };
  const result = validateShipment(bad);
  return { valid: result.valid, errorCount: result.errors.length };
}, { valid: false, errorCount: 3 });
check("transportista válido", () => validateCarrier(dhl), { valid: true, errors: [] });
check("transportista inválido → 4 errores", () => {
  const bad: Carrier = { ...dhl, baseRateUSD: -1, avgDeliveryDays: 0, onTimeRate: 120, operatesIn: [] };
  const result = validateCarrier(bad);
  return { valid: result.valid, errorCount: result.errors.length };
}, { valid: false, errorCount: 4 });

console.log(`\nResultado: ✅ ${passed}   ❌ ${failed}   ⏳ ${pending} pendientes\n`);
