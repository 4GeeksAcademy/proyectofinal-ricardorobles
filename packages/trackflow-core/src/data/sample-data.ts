// =============================================================
// Datos de ejemplo
// - sampleProducts, sampleCarriers y sampleShipment: copiados del briefing.
// - extraShipments: DATOS DE PRUEBA adicionales (no son del briefing), para
//   poder probar agrupaciones, promedios y rankings con más de un envío.
// =============================================================
import type { Carrier, Product, Shipment } from "../types/models";

export const sampleProducts: Product[] = [
  {
    sku: "SHOE-BLK-42",
    name: "Zapatillas Negras Running - Talla 42",
    category: "Fashion",
    weightKg: 0.8,
    dimensions: { lengthCm: 35, widthCm: 22, heightCm: 12 },
    warehouse: "Los Angeles",
    stockQuantity: 45,
    minStockThreshold: 20,
    unitCostUSD: 35.0,
    isFragile: false,
    status: "Active",
  },
  {
    sku: "LAPTOP-DELL-15",
    name: "Laptop Dell 15 pulgadas",
    category: "Electronics",
    weightKg: 2.3,
    dimensions: { lengthCm: 40, widthCm: 28, heightCm: 3 },
    warehouse: "Zaragoza",
    stockQuantity: 8,
    minStockThreshold: 10,
    unitCostUSD: 650.0,
    isFragile: true,
    status: "Low stock",
  },
  {
    sku: "PERFUME-COCO-50",
    name: "Perfume Coco 50ml",
    category: "Cosmetics",
    weightKg: 0.3,
    dimensions: { lengthCm: 12, widthCm: 8, heightCm: 15 },
    warehouse: "Los Angeles",
    stockQuantity: 120,
    minStockThreshold: 30,
    unitCostUSD: 85.0,
    isFragile: true,
    status: "Active",
  },
];

export const sampleCarriers: Carrier[] = [
  {
    id: "CAR-UPS",
    name: "UPS",
    operatesIn: ["United States"],
    baseRateUSD: 5.0,
    ratePerKgUSD: 1.2,
    ratePerKmUSD: 0.05,
    avgDeliveryDays: 3,
    onTimeRate: 88,
    maxWeightKg: 30,
    handlesFragile: true,
    acceptsPriority: ["Standard", "Express"],
  },
  {
    id: "CAR-SEUR",
    name: "SEUR",
    operatesIn: ["Spain"],
    baseRateUSD: 6.5,
    ratePerKgUSD: 1.5,
    ratePerKmUSD: 0.08,
    avgDeliveryDays: 2,
    onTimeRate: 92,
    maxWeightKg: 25,
    handlesFragile: true,
    acceptsPriority: ["Standard", "Express", "Same-day"],
  },
  {
    id: "CAR-DHL",
    name: "DHL Express",
    operatesIn: ["United States", "Spain"],
    baseRateUSD: 12.0,
    ratePerKgUSD: 2.0,
    ratePerKmUSD: 0.1,
    avgDeliveryDays: 1,
    onTimeRate: 95,
    maxWeightKg: 50,
    handlesFragile: true,
    acceptsPriority: ["Express", "Same-day"],
  },
];

export const sampleShipment: Shipment = {
  id: "SH-2024-8821",
  sku: "LAPTOP-DELL-15",
  quantity: 1,
  origin: "Zaragoza",
  destination: {
    city: "Madrid",
    country: "Spain",
    postalCode: "28001",
    distanceKm: 320,
  },
  priority: "Express",
  declaredValueUSD: 650.0,
  carrier: null,
  status: "Pending",
  createdAt: new Date("2024-03-15"),
};

// Datos de prueba adicionales (no vienen del briefing)
export const extraShipments: Shipment[] = [
  {
    id: "SH-2024-8822",
    sku: "SHOE-BLK-42",
    quantity: 2,
    origin: "Los Angeles",
    destination: { city: "San Diego", country: "United States", postalCode: "92101", distanceKm: 190 },
    priority: "Standard",
    declaredValueUSD: 70.0,
    carrier: "UPS",
    status: "Delivered",
    createdAt: new Date("2024-03-16"),
  },
  {
    id: "SH-2024-8823",
    sku: "PERFUME-COCO-50",
    quantity: 3,
    origin: "Los Angeles",
    destination: { city: "Las Vegas", country: "United States", postalCode: "89101", distanceKm: 435 },
    priority: "Express",
    declaredValueUSD: 255.0,
    carrier: "DHL Express",
    status: "In transit",
    createdAt: new Date("2024-03-17"),
  },
  {
    id: "SH-2024-8824",
    sku: "LAPTOP-DELL-15",
    quantity: 1,
    origin: "Zaragoza",
    destination: { city: "Barcelona", country: "Spain", postalCode: "08001", distanceKm: 300 },
    priority: "Standard",
    declaredValueUSD: 650.0,
    carrier: "SEUR",
    status: "Delivered",
    createdAt: new Date("2024-03-18"),
  },
  {
    id: "SH-2024-8825",
    sku: "LAPTOP-DELL-15",
    quantity: 2,
    origin: "Zaragoza",
    destination: { city: "Valencia", country: "Spain", postalCode: "46001", distanceKm: 310 },
    priority: "Same-day",
    declaredValueUSD: 1300.0,
    carrier: "SEUR",
    status: "Failed",
    createdAt: new Date("2024-03-19"),
  },
];

// Todos los envíos juntos: el del briefing + los de prueba
export const allShipments: Shipment[] = [sampleShipment, ...extraShipments];
