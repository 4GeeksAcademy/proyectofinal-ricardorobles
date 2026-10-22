# AGENTS.md — Protocolo para agentes de código

Este repositorio es el monorepo de **TrackFlow Tech** (proyecto transversal de 4Geeks AI Engineering). Cualquier agente de código (Claude Code, Cursor, Copilot, Codex…) que trabaje aquí **debe** seguir este protocolo.

## 1. Al iniciar cada sesión: qué leer

Lee en este orden, antes de proponer o escribir código:

1. [`memory-bank/projectbrief.md`](./memory-bank/projectbrief.md) — la empresa, el problema y los objetivos.
2. [`memory-bank/techContext.md`](./memory-bank/techContext.md) — dónde vive cada cosa, stack, decisiones y restricciones.
3. [`memory-bank/progress.md`](./memory-bank/progress.md) — estado actual y próximos pasos.
4. [`.agents/rules/`](./.agents/rules/) — todas las reglas. Cada una indica su alcance de aplicación.
5. [`BRIEFING.md`](./BRIEFING.md) y, si la tarea es de un hito concreto, su briefing (ej. `01-web-fundamentals/trackflow-BRIEFING.md`).
6. El `README.md` de la carpeta donde vas a trabajar.

Skills disponibles en [`.agents/skills/`](./.agents/skills/):

- `update-memory-bank` — actualizar el banco de memoria al cerrar trabajo. **Obligatoria** en el paso 5 del flujo de commit.

Si algo del banco de memoria contradice el código o el briefing, **detente y pregunta** al desarrollador; no elijas tú cuál es la verdad.

## 2. Flujo obligatorio antes de cada commit

Sigue los pasos **en orden**. Si uno falla, no avances al siguiente.

1. **Rama correcta.** Ejecuta `git branch --show-current`. Nunca se commitea en `main`. La rama debe describir el trabajo (`hito-N-…` o `feature/…`).
2. **Alcance del diff.** Ejecuta `git status` y `git diff --stat`. Cada archivo cambiado debe pertenecer a la tarea pedida y vivir en la carpeta que corresponde según `.agents/rules/monorepo-structure.md`. Si aparece un archivo protegido (sección 3) o uno ajeno a la tarea, detente y avisa.
3. **Verificación técnica.** Ejecuta `git diff --check` (sin espacios sobrantes ni conflictos) y la verificación del área tocada:
   - `uis/website`: servir con `npx http-server uis/website -p 3000` y comprobar que la página carga sin errores en consola y que el formulario valida.
   - Otras apps: sus tests o linters, según su README.
   - Solo Markdown: comprobar que los enlaces relativos apuntan a archivos que existen.
4. **Coherencia con el negocio.** Comprueba que nombres, campos, servicios y textos coinciden con `BRIEFING.md` y el briefing del hito. Nada inventado sobre TrackFlow.
5. **Banco de memoria.** Ejecuta la skill `.agents/skills/update-memory-bank/SKILL.md` y cumple sus criterios de aceptación.
6. **Confirmación humana.** Muestra al desarrollador la lista de archivos y el mensaje de commit propuesto (Conventional Commits, en español: `feat(website): …`, `docs(memory-bank): …`). **Espera su aprobación explícita** antes de ejecutar `git commit`.

## 3. Archivos y carpetas que NO se modifican sin confirmación explícita

| Ruta | Por qué |
|---|---|
| `BRIEFING.md`, `00-general-contexts/`, `01-web-fundamentals/` y futuros `NN-*/` | Briefings oficiales del curso: son la fuente de verdad, no se editan |
| `CONTEXT.md`, `CONTEXT.es.md`, `COMPANY-CHOICE.md` | Contexto de empresa y elección del estudiante |
| `README.md` / `README.es.md` de la raíz y de cada carpeta de la plantilla | Guía de la plantilla |
| `.devcontainer/`, `.github/` | Entorno y CI compartidos |
| `AGENTS.md`, `.agents/` | El propio protocolo; cambiarlo es una decisión del equipo |
| `memory-bank/projectbrief.md` | Solo cambia si cambia el negocio; `progress.md` y `techContext.md` sí se actualizan con normalidad |
| `.env` y cualquier archivo con secretos | Nunca se leen en voz alta ni se commitean |

Tampoco borres, renombres ni muevas archivos existentes sin confirmación.

## 4. Cuándo detenerse y preguntar

- La tarea implica una **decisión de producto** no registrada en `techContext.md` (nueva librería, nuevo framework, nueva carpeta de primer nivel, cambio de idioma base).
- El briefing es ambiguo o contradictorio (ver "Gaps" en `projectbrief.md`).
- La tarea pide tocar algo de la sección 3.
