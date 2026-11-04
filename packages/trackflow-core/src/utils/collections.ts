// =============================================================
// Operaciones de colecciones: filtrar y ordenar arrays
// Regla del hito: NUNCA mutar el array que llega por parámetro.
// =============================================================
import type { Carrier, Product, ProductCategory, SortOrder, WarehouseLocation } from "../types/models";

// ✅ RESUELTA (ejemplo)
// filter() crea un array NUEVO con los elementos que cumplen la condición:
// el original queda intacto, por eso ya es una función pura.
// Con un array vacío devuelve [] sin hacer nada especial.
export function filterProductsByWarehouse(products: Product[], warehouse: WarehouseLocation): Product[] {
  return products.filter((product) => product.warehouse === warehouse);
}

// TODO 1: productos de la categoría indicada.
// Pista: es la misma forma que la función de arriba, cambiando el campo.
export function filterProductsByCategory(products: Product[], category: ProductCategory): Product[] {
  throw new Error("TODO: filterProductsByCategory");
}

// TODO 2: productos con stock bajo → stockQuantity <= minStockThreshold.
// Pista: compara dos campos del MISMO producto. Usa los números, no el campo `status`.
export function filterLowStockProducts(products: Product[]): Product[] {
  throw new Error("TODO: filterLowStockProducts");
}

// TODO 3: ordenar por stockQuantity, "asc" (menor a mayor) o "desc".
// ⚠️ OJO: sort() SÍ muta el array original. Primero copia: [...products]
// Pista: el comparador (a, b) => número negativo pone `a` antes; positivo pone `b` antes.
//        a.stockQuantity - b.stockQuantity → ascendente.
export function sortProductsByStock(products: Product[], order: SortOrder): Product[] {
  throw new Error("TODO: sortProductsByStock");
}

// TODO 4: ordenar transportistas por onTimeRate, "asc" o "desc". Sin mutar.
// Pista: es la misma idea que el TODO 3 con otro tipo y otro campo.
export function sortCarriersByReliability(carriers: Carrier[], order: SortOrder): Carrier[] {
  throw new Error("TODO: sortCarriersByReliability");
}
