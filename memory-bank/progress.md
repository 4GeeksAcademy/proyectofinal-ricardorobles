# Progress — TrackFlow Tech

_Última actualización: 2026-11-04_

## Estado actual

| Entregable | Rama | Estado |
|---|---|---|
| Elección de empresa (`COMPANY-CHOICE.md`) | `main` | ✅ Hecho |
| Hito 1 — Sitio web público (`uis/website`) | `main` (desde `hito-1-website`) | ✅ PR #1 aprobado y mergeado |
| Infraestructura de agentes (banco de memoria, `AGENTS.md`, `.agents/`) | `main` (desde `feature/agent-memory-bank`) | ✅ PR #2 aprobado y mergeado |
| Hito 2 — Lógica de dominio en TypeScript (`packages/trackflow-core`) | `feature/domain-models` | 🟡 En desarrollo: modelos y estructura listos; funciones en progreso |

## Qué funciona

- Landing de TrackFlow con los tres servicios, cobertura EE. UU./España y Schema.org.
- Formulario de solicitud de información con validación en tiempo real (12 campos según el briefing del Hito 1).
- Banco de memoria, reglas y skill `update-memory-bank` para trabajar con agentes de código.
- `packages/trackflow-core`: interfaces del briefing del Hito 2 (`Product`, `Shipment`, `Carrier`, `InventoryMovement`), datos de ejemplo y script de verificación (`npm run demo`). `npm run typecheck` pasa sin errores.

## Próximos pasos

1. Implementar las funciones pendientes de `packages/trackflow-core/src/utils/` (validaciones → colecciones → búsquedas → transformaciones) hasta que `npm run demo` quede en verde.
2. (Opcional) Página `index.html` con Tailwind para probar las funciones manualmente.
3. Abrir el PR `feature/domain-models` → `main` con lo implementado, los desafíos y las decisiones (ver README del paquete).
4. PR aprobado → merge a `main` antes de empezar el siguiente hito.

## Problemas y pendientes

- Nombre del CEO inconsistente en los briefings (ver `projectbrief.md`). Pendiente de confirmar.
- Briefing del Hito 2: con la regla literal de `selectBestCarrier` (puntaje ≥ 50 y el más barato), UPS gana un envío a España aunque no opera allí. Se resolvió con restricciones duras (`canHandleShipment`); conviene confirmarlo con la responsable (Ana Whitfield) o el mentor.

## Historial

- **2026-11-04** — Hito 2 iniciado: briefing en `02-programming-fundamentals/`, paquete `packages/trackflow-core` con modelos, estructura y verificación.
- **2026-11-04** — PR #1 (Hito 1) y PR #2 (infraestructura de agentes) aprobados y mergeados a `main`.
- **2026-10-21** — Infraestructura de agentes: `BRIEFING.md`, `memory-bank/`, `AGENTS.md`, regla de estructura del monorepo, regla de dominio y skill `update-memory-bank`.
- **2026-10-21** — Hito 1 entregado (PR #1).
- **2026-10-14** — Inicio del Hito 1.
