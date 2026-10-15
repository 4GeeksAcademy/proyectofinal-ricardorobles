# TrackFlow — Sitio web público (Hito 1)

Primera presencia web de TrackFlow: una landing page y un formulario de **solicitud de propuesta comercial** para marcas de e-commerce que quieren tercerizar su logística en Estados Unidos y/o España.

## Archivos

| Archivo | Qué contiene |
|---|---|
| `index.html` | Landing: header y navegación, hero, servicios, ventajas, llamado a la acción y footer de contacto |
| `application.html` | Formulario de solicitud de propuesta |
| `validation.js` | Validación en tiempo real y al enviar |
| `assets/` | Logotipo e ilustración del hero (SVG) |

Estilos: solo Tailwind CSS v4 por CDN. No hay `styles.css` porque no hace falta CSS personalizado.

## Cómo ejecutarlo

Desde la raíz del monorepo:

```bash
npx http-server uis/website -p 3000 -a 0.0.0.0
```

Abre http://localhost:3000

## Campos del formulario

Derivados de `CONTEXT.md`: TrackFlow opera en EE. UU. y España, con almacenes en Los Ángeles y Zaragoza, y ofrece almacenaje, preparación de pedidos, última milla y devoluciones.

| Fieldset | ID / name | Tipo | Regla |
|---|---|---|---|
| Tu empresa | `brandName` | text | Obligatorio |
| | `website` | url | Obligatorio, empieza con `http://` o `https://` |
| | `country` | select (`US`, `ES`, `BOTH`) | Obligatorio |
| Datos de contacto | `contactName` | text | Obligatorio, mínimo 3 caracteres |
| | `contactRole` | text | Obligatorio |
| | `email` | email | Obligatorio, formato válido |
| | `phone` | tel | Obligatorio. `US`: `+1` + 10 dígitos · `ES`: `+34` + 9 dígitos que empiezan por 6–9 · `BOTH`: cualquiera de los dos |
| Tu operación | `monthlyOrders` | number | Obligatorio, entero, mínimo 100 pedidos/mes |
| | `returnRate` | number | Obligatorio, entre 0 y 100 (%) |
| | `warehouse` | select (`LAX`, `ZAZ`, `BOTH`) | Obligatorio |
| | `startDate` | date | Obligatoria, posterior a hoy |
| | `services` | checkbox (`storage`, `fulfillment`, `last-mile`, `returns`) | Al menos uno |
| Mensaje | `message` | textarea | Opcional, máximo 500 caracteres |

El envío es simulado: no hay backend, así que con datos válidos se muestra un mensaje de éxito.
