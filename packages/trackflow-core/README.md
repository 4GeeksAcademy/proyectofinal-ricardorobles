# @repo/trackflow-core

Lógica de dominio de TrackFlow en TypeScript: modelos de inventario, envíos y transportistas, búsquedas, cálculo de costos, selección de transportista, reportes y validaciones de negocio.

**Briefing:** [`02-programming-fundamentals/trackflow-BRIEFING.md`](../../02-programming-fundamentals/trackflow-BRIEFING.md) (Hito 2: Fundamentos de Programación).

## Por qué es un paquete

Es código reutilizable que no tiene interfaz propia. El backoffice (`uis/backoffice/`) y los servicios (`services/`) van a usar estas mismas funciones, así que vive en `packages/`, como indica la guía del monorepo.

## Cómo ejecutarlo

```bash
cd packages/trackflow-core
npm install
npm run typecheck   # valida los tipos (equivale a npx tsc --noEmit)
npm run demo        # ejecuta las funciones con los datos de ejemplo y compara con los valores esperados
```

## Estructura

```
src/
├── types/
│   └── models.ts           # Interfaces y tipos del briefing
├── utils/
│   ├── collections.ts      # Filtros y ordenamientos (sin mutar)
│   ├── search.ts           # Búsqueda lineal y binaria
│   ├── transformations.ts  # Costos, scoring, selección de transportista y reportes
│   └── validations.ts      # Validaciones de negocio
├── data/
│   └── sample-data.ts      # Datos del briefing + envíos de prueba adicionales
└── demo.ts                 # Verificación de cada función
```

## Decisiones tomadas donde el briefing no las define

| Tema | Decisión | Motivo |
|---|---|---|
| `selectBestCarrier` | Antes de comparar costos se descartan los transportistas que **no pueden** hacer el envío (`canHandleShipment`): no operan en el país, no aguantan el peso, no aceptan la prioridad o no manejan frágiles | Con la regla literal (puntaje ≥ 50 y el más barato), UPS gana un envío a Madrid aunque no opera en España |
| Empate de costo en `selectBestCarrier` | Gana el de mayor puntaje | A igual precio, se prefiere el más adecuado |
| Recargo por prioridad | Se aplica sobre el subtotal (base + peso + distancia) | Interpretación más directa del briefing |
| `calculateAverageShipmentDistance([])` | Devuelve `0` | Evita `NaN` (0 / 0) |
| Conteos y agrupaciones | Incluyen todas las claves, aunque queden en 0 o `[]` | Lo exige el tipo `Record<...>` y simplifica los reportes |
| Empate en `findTopCarriers` | Orden alfabético por nombre | Resultado estable y predecible |
| Stock bajo | Se calcula con `stockQuantity <= minStockThreshold`, no con `status` | Los números son la fuente de verdad; `status` puede quedar desactualizado |
| `findShipmentById` | Comparación exacta | El briefing pide no distinguir mayúsculas solo para el SKU |
