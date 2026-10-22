# Tech Context — TrackFlow Tech

## Monorepo: dónde vive cada cosa

Basado en la plantilla de 4Geeks. **No se crean árboles paralelos**: antes de crear una carpeta, lee el `README.md` de la carpeta destino.

| Ruta | Qué va aquí | Estado |
|---|---|---|
| `uis/website/` | Sitio web público de TrackFlow (vista de entrada en `/`) | Existe desde el Hito 1 (rama `hito-1-website`, PR #1) |
| `uis/backoffice/` | App interna de la empresa: layout propio, separada del sitio público; vista de entrada en `/` | Aún no existe |
| `services/` | Backend: **una sola API FastAPI centralizada** con routers por dominio (inventario, tracking, devoluciones…). Workers aparte solo si hace falta | Aún no existe |
| `agents/` | Agentes de IA **del producto** (ej. agente de CX). Empezar desde `agents/_template/` | Vacío |
| `skills/` | Skills **del producto** para esos agentes | Solo plantilla |
| `data/`, `mcps/`, `workflows/`, `packages/`, `shared/`, `docs/`, `infra/`, `scripts/`, `internal/` | Según su README | Vacías |

### `.agents/` no es `agents/`

- **`.agents/`** (con punto) configura **a la herramienta de desarrollo** (Claude Code, Cursor, Copilot…): reglas y skills que le enseñan a trabajar en este repo.
- **`agents/`** y **`skills/`** (sin punto) son **código de producto**: los agentes que TrackFlow usará.

## Stack actual

- **Website (Hito 1):** HTML5 semántico + **Tailwind CSS v4 por CDN** + JavaScript vanilla (`validation.js`). Sin build, sin framework, sin backend: el envío del formulario es simulado.
- Ejecutar en local: `npx http-server uis/website -p 3000 -a 0.0.0.0`
- SEO: metadatos y Schema.org en `index.html`.

## Stack previsto (según la plantilla y el devcontainer)

- **Backend:** Python + FastAPI, dependencias con `uv`.
- **JS/TS:** pnpm (vía Corepack). Tipos compartidos en `packages/shared` (`@repo/shared-types`).
- **Automatización:** n8n (puerto 5678).
- **Puertos reservados:** 3000 (frontends), 8000 (API), 5678 (n8n).
- **Orquestación local:** `docker-compose.yml` en la raíz cuando exista más de un servicio.

## Decisiones tomadas

1. **Idioma base: español** en contenido y documentación. El inglés es una mejora opcional.
2. **El website se mantiene sin build** (Tailwind por CDN) mientras no haya una razón concreta para cambiarlo.
3. **Una sola API** en `services/` en vez de microservicios desde el inicio (recomendación de la plantilla).
4. **El briefing manda:** campos, servicios, áreas y nombres salen de `BRIEFING.md` y de los briefings por hito (`01-web-fundamentals/…`). No se inventan datos de la empresa.
5. **Flujo con PR:** cada hito en su rama, PR contra `main`. PR aprobado → merge a `main` antes de empezar la siguiente rama.

## Restricciones

- Nunca commitear secretos (`.env`, API keys, tokens). Usar `.env.example` cuando se necesiten variables.
- Datos personales (PII): solo datos de ejemplo ficticios en `data/raw/`.
- Briefings y contexto de empresa son **de solo lectura** para el agente (ver `AGENTS.md`).
- El código de producto vive solo en las carpetas mapeadas arriba; nada de código suelto en la raíz.
