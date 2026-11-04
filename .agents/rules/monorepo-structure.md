# Regla: estructura del monorepo

**Alcance de aplicación:** siempre activa. Aplica a cualquier tarea que cree, mueva o renombre archivos o carpetas.

## Qué exige

1. **El código de producto solo vive en las carpetas que ya mapea la plantilla.** No se crean árboles paralelos (`frontend/`, `backend/`, `web/`, `api/` en la raíz, `apps/`, `src/` sueltos, etc.).

   | Si construyes… | Va en… |
   |---|---|
   | El sitio público de TrackFlow (ruta `/`, marca y copy según `BRIEFING.md`) | `uis/website/` |
   | La app interna (layout propio, separada del sitio público, entrada en `/`) | `uis/backoffice/` |
   | Una API, endpoint o worker | `services/` (una sola app FastAPI con routers por dominio) |
   | Un agente de IA del producto | `agents/<nombre>/`, partiendo de `agents/_template/` |
   | Una skill para los agentes del producto | `skills/<nombre>/` |
   | Datos, pipelines, evaluación | `data/raw`, `data/pipelines`, `data/process`, `data/eval` |

2. **Antes de crear una carpeta nueva**, lee el `README.md` de la carpeta padre y sigue sus instrucciones.
3. **Cada app, servicio o agente nuevo lleva su propio `README.md`**: qué es, cómo se ejecuta y de qué briefing sale.
4. **No confundas `.agents/` con `agents/`.** `.agents/` configura al agente de desarrollo (reglas y skills de trabajo); `agents/` y `skills/` son código del producto TrackFlow. Nunca pongas código de producto en `.agents/`.
5. **Nada de código suelto en la raíz.** En la raíz solo viven archivos de configuración global (`AGENTS.md`, `BRIEFING.md`, `docker-compose.yml`, READMEs, etc.).

## Cómo verificarla

```bash
# No debe listar carpetas de primer nivel fuera de las de la plantilla
ls -d */ | grep -vE '^(00-general-contexts|01-web-fundamentals|[0-9]{2}-[a-z-]+|agents|data|docs|infra|internal|mcps|memory-bank|packages|scripts|services|shared|skills|uis|workflows)/$'
```

Si el comando devuelve algo, hay una carpeta que no corresponde: detente y pregunta.
