# Project Brief — TrackFlow Tech

> Fuente de verdad del negocio: [`BRIEFING.md`](../BRIEFING.md). Este archivo lo resume para el agente; si hay conflicto, manda `BRIEFING.md`.

## La empresa

**TrackFlow** es un operador logístico (3PL) de última milla y gestión de almacenes, fundado en 2009 en Los Ángeles.

- Opera en **dos mercados**: Estados Unidos (almacén en Los Ángeles) y España (almacén en Zaragoza).
- ~130 empleados, ~9 M€ de facturación anual.
- **Clientes:** marcas de e-commerce (B2B) que tercerizan su logística. Contratos **anuales**: la renovación depende de que la marca sienta que su operación funciona bien.
- **Destinatarios:** consumidores finales (B2C) que reciben o devuelven paquetes.

### Qué vende TrackFlow (la cadena de valor)

```text
pedido de la marca → almacenaje → picking y empaque → transportista → entrega
                                                                   ↘ devolución → inspección → reacondicionar / desechar
```

Tres servicios: **gestión de almacenes**, **última milla** y **logística inversa** (devoluciones: 18–25 % del volumen según cliente y país).

## El problema que resolvemos

TrackFlow tiene buenos clientes y un equipo operativo capaz, pero **no tiene la infraestructura para operar dos países a escala**:

| Área (responsable) | Dolor principal | Qué necesita |
|---|---|---|
| Almacén (Ana Whitfield) | Dos sistemas distintos, sin inventario global; pedidos por email transcritos a mano | API de inventario unificada, ingesta de pedidos, dashboard, alertas de stock |
| Última milla (Carlos Vega) | 8 transportistas gestionados a mano; sin datos de rendimiento | Motor de selección de transportista, tracking unificado, portal público, dashboard |
| Logística inversa (Sofía Ramos) | Cada devolución se revisa a mano; inspección subjetiva | Aprobación automática por reglas de cliente, recogida automatizada, inspección por imagen con IA |
| Experiencia del Cliente (Valentina Cruz) | 15 agentes, 80 % de consultas repetitivas, sin tickets ni base de conocimiento | Agente de primera línea, RAG, tickets, sentimiento |
| Comercial (Miguel Torres) | Sin CRM; informes mensuales manuales; sin alerta de riesgo de renovación | CRM, informes automáticos, salud de cliente, alertas a 90/30 días |
| Personas (Rafael Sanz) | Onboarding y accesos manuales; dos marcos laborales sin sistema | Onboarding con comprobaciones, portal RR. HH., agente de políticas |
| Tecnología (Andrés Kim, CTO) | Arquitectura en mosaico, sin telemetría; fallos se conocen por WhatsApp | Telemetría, pipeline de datos, alertas, ops automatizadas |
| Dirección (CEO) | Informe semanal armado a mano, datos con 1–2 días de retraso | Dashboard ejecutivo, informe automático lunes 7:00, asistente en lenguaje natural |

## Objetivos del proyecto

Somos la unidad interna **TrackFlow Tech**. Construimos, hito a hito y en **un solo monorepo**, los sistemas que piden esas áreas:

1. **Hito 1 — Sitio web público** (`uis/website`): presentar los tres servicios y capturar leads calificados para Comercial. ✅ Entregado (PR #1).
2. **Infraestructura de agentes** (este hito): banco de memoria, reglas y skills para que los agentes de código trabajen con contexto.
3. **Siguientes hitos**: backoffice (`uis/backoffice`), API centralizada (`services/`), datos, RAG, agentes, workflows y tiempo real.

## Interés del desarrollador (prioridad de dominio)

Según `COMPANY-CHOICE.md`: salud de cliente en el CRM, agente de CX, y sobre todo **inspección de devoluciones por imagen con IA** con detección de patrones por marca.

## Gaps y ambigüedades conocidas del briefing

- El nombre del CEO no es consistente: "Thomas Harry" y "Thomas Espinoza" en `BRIEFING.md`; "Daniel Espinoza" en el `CONTEXT.es.md` de la plantilla. **No inventar**: referirse a él como "el CEO" hasta confirmarlo.
- `CONTEXT.es.md` es una versión anterior del briefing (no incluye el área de Personas). Para decisiones, usar `BRIEFING.md`.
- Idioma: el soporte ES + EN es opcional pero recomendado; el idioma base del proyecto es **español**.
