---
name: update-memory-bank
description: Actualiza el banco de memoria (memory-bank/) para que refleje el trabajo hecho en la sesión. Úsala en el paso 5 del flujo de commit de AGENTS.md y al cerrar cualquier sesión de trabajo.
---

# Skill: update-memory-bank

## Objetivo

Dejar `memory-bank/` fiel al estado real del repositorio después del trabajo de la sesión, para que la próxima sesión del agente empiece con el contexto correcto.

Una sola cosa: **sincronizar el banco de memoria con lo que cambió**. No escribe código de producto ni modifica otros archivos.

## Inputs

| Input | De dónde sale |
|---|---|
| Lista de archivos cambiados | `git status --short` y `git diff --stat main...HEAD` |
| Rama actual | `git branch --show-current` |
| Resumen de lo hecho en la sesión | La conversación con el desarrollador |
| Decisiones técnicas nuevas, si las hubo | Lo que el desarrollador aprobó en la sesión |
| Fecha de hoy | `date +%F` |

## Pasos

1. Lee los tres archivos de `memory-bank/` completos.
2. En `progress.md`:
   - Cambia la línea `_Última actualización: AAAA-MM-DD_` por la fecha de hoy.
   - Actualiza la tabla **Estado actual** (entregable, rama, estado) con la rama de la sesión.
   - Mueve a **Qué funciona** lo que quedó funcionando y verificado.
   - Reescribe **Próximos pasos** según lo que queda.
   - Agrega a **Problemas y pendientes** lo que quedó abierto.
   - Agrega una línea al inicio de **Historial**: `- **AAAA-MM-DD** — <qué se hizo, en una frase>`.
3. En `techContext.md`, **solo si hubo una decisión nueva aprobada** (librería, carpeta, puerto, convención): agrégala a "Decisiones tomadas" o actualiza la tabla de rutas.
4. **No modifiques `projectbrief.md`**: si el negocio cambió, avisa al desarrollador.
5. Muestra el `git diff memory-bank/` al desarrollador.

## Output esperado

- `memory-bank/progress.md` modificado (y `techContext.md` solo si aplica).
- Un resumen de 2 a 4 líneas para el desarrollador con qué cambió en el banco de memoria.

## Criterios de aceptación (verificables)

Cada criterio se responde con sí o no:

- [ ] `git diff --name-only -- memory-bank/` incluye `memory-bank/progress.md`.
- [ ] `grep "Última actualización: $(date +%F)" memory-bank/progress.md` devuelve una línea.
- [ ] La primera entrada de **Historial** tiene la fecha de hoy.
- [ ] Toda ruta de carpeta o archivo nombrada en las secciones nuevas existe en el repo (`ls <ruta>` no falla), o está marcada explícitamente como "Aún no existe".
- [ ] `git diff --name-only -- memory-bank/projectbrief.md` no devuelve nada.
- [ ] `git diff --check -- memory-bank/` no reporta errores.

Si algún criterio falla, corrígelo antes de devolver el control. Si no puedes, informa cuál falló y por qué.
