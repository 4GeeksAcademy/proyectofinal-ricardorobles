# Progress — TrackFlow Tech

_Última actualización: 2026-10-21_

## Estado actual

| Entregable | Rama | Estado |
|---|---|---|
| Elección de empresa (`COMPANY-CHOICE.md`) | `main` | ✅ Hecho |
| Hito 1 — Sitio web público (`uis/website`) | `hito-1-website` | 🟡 PR #1 abierto, pendiente de aprobación y merge |
| Infraestructura de agentes (banco de memoria, `AGENTS.md`, `.agents/`) | `feature/agent-memory-bank` | 🟡 En revisión (este PR) |

## Qué funciona

- Landing de TrackFlow con los tres servicios, cobertura EE. UU./España y Schema.org.
- Formulario de solicitud de información con validación en tiempo real (12 campos según el briefing del Hito 1).
- Banco de memoria, reglas y skill `update-memory-bank` para trabajar con agentes de código.

## Próximos pasos

1. Aprobación y merge de PR #1 (Hito 1) y del PR de infraestructura de agentes.
2. Esperar el briefing del siguiente hito y registrarlo aquí antes de crear código.
3. Primera app nueva irá en la carpeta ya mapeada (`uis/backoffice` o `services/`), no en una carpeta inventada.

## Problemas y pendientes

- Nombre del CEO inconsistente en los briefings (ver `projectbrief.md`). Pendiente de confirmar.
- Esta rama sale de `main`, que todavía no incluye `uis/website`. No hay conflicto: los archivos no se cruzan.

## Historial

- **2026-10-21** — Infraestructura de agentes: `BRIEFING.md`, `memory-bank/`, `AGENTS.md`, regla de estructura del monorepo, regla de dominio y skill `update-memory-bank`.
- **2026-10-21** — Hito 1 entregado (PR #1).
- **2026-10-14** — Inicio del Hito 1.
