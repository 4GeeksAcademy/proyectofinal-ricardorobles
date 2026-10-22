# Regla: dominio y copy de TrackFlow

**Alcance de aplicación:** por patrón. Se activa cuando la tarea toca contenido visible para usuarios o datos del negocio: `uis/**/*.html`, `uis/**/*.js`, `uis/**/*.ts*`, `services/**`, `data/**` y cualquier prompt de `agents/**`.

## Qué exige

1. **Los datos de la empresa salen del briefing.** Nombres de áreas y responsables, los tres servicios (gestión de almacenes, última milla, logística inversa), los dos mercados (EE. UU./Los Ángeles y España/Zaragoza) y las cifras (~130 empleados, ~9 M€, 18–25 % de devoluciones) se toman de `BRIEFING.md`. No inventes clientes, precios, certificaciones ni testimonios.
2. **Los campos y valores de formularios o APIs salen del briefing del hito.** Si el briefing define `id`, `name` o valores de un `select`, se respetan tal cual (ej. `shippingVolume`: `0-100`, `101-500`, `501-2000`, `2000+`, `unsure`).
3. **Usa el vocabulario del negocio** de forma consistente: *marca* o *cliente* (B2B), *destinatario* o *consumidor final* (B2C), *transportista*, *devolución*, *SKU*, *picking*.
4. **Idioma base: español.** Si se agrega inglés, es una versión adicional completa, no textos mezclados.
5. **Si el briefing no dice algo, no lo supongas:** pregunta o márcalo como pendiente en `memory-bank/progress.md`.

## Cómo verificarla

- Cada dato de empresa nuevo en el diff se puede encontrar en `BRIEFING.md` o en el briefing del hito (`grep -n "<dato>" BRIEFING.md 0*/*.md`).
- Los `id`/`name` de formularios coinciden con la tabla de campos del briefing del hito.
