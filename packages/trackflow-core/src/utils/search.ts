// =============================================================
// Búsquedas: lineal (array desordenado) y binaria (array ordenado)
// =============================================================
import type { Product, Shipment } from "../types/models";

// ✅ RESUELTA (ejemplo)
// Búsqueda lineal: revisa uno por uno hasta encontrarlo → O(n).
// El briefing pide comparar el SKU sin distinguir mayúsculas,
// así que normalizamos los DOS lados con toUpperCase().
// Si no lo encuentra, devuelve null (no undefined): es lo que pide la firma.
export function findProductBySKU(products: Product[], sku: string): Product | null {
  const target = sku.trim().toUpperCase();
  for (const product of products) {
    if (product.sku.toUpperCase() === target) {
      return product;
    }
  }
  return null;
}

// TODO 5: búsqueda lineal de un envío por id (comparación exacta).
// Pista: misma estructura que la de arriba, sin normalizar mayúsculas.
export function findShipmentById(shipments: Shipment[], id: string): Shipment | null {
  throw new Error("TODO: findShipmentById");
}

// TODO 6: búsqueda binaria por peso. El array YA viene ordenado por weightKg ascendente.
// Devuelve el ÍNDICE del producto con ese peso, o -1 si no existe.
// Pistas:
//   - Dos punteros: let low = 0; let high = sortedProducts.length - 1;
//   - Mientras low <= high: mira el del medio → const mid = Math.floor((low + high) / 2);
//   - Si el peso del medio es el buscado → return mid.
//   - Si es MENOR que el buscado, el objetivo está a la derecha → low = mid + 1.
//   - Si es MAYOR, está a la izquierda → high = mid - 1.
//   - Si el ciclo termina sin encontrarlo → return -1.
// Cada vuelta descarta la MITAD del array → O(log n). Con 2.000 productos son ~11 vueltas, no 2.000.
export function binarySearchProductByWeight(sortedProducts: Product[], targetWeight: number): number {
  throw new Error("TODO: binarySearchProductByWeight");
}
