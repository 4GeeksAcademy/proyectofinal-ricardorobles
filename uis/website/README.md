# TrackFlow — Sitio web público (Hito 1)

Primera presencia web de TrackFlow: una landing page y un formulario de **solicitud de información** para marcas de e-commerce que quieren tercerizar su logística en Estados Unidos y/o España.

## Archivos

| Archivo | Qué contiene |
|---|---|
| `index.html` | Landing: header, hero, servicios, cobertura, por qué TrackFlow, contacto y footer |
| `application.html` | Formulario de solicitud de información |
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

Definidos en `01-web-fundamentals/trackflow-BRIEFING.md`.

| ID / name | Tipo | Regla | Obligatorio |
|---|---|---|---|
| `companyName` | text | Mínimo 2 caracteres | Sí |
| `contactPerson` | text | Al menos 2 palabras (nombre y apellido) | Sí |
| `email` | email | Formato válido (`@` y dominio) | Sí |
| `phone` | tel | Empieza con `+` y código de país | Sí |
| `website` | url | Si se completa, empieza con `http://` o `https://` | No |
| `country` | select (`US`, `ES`, `BOTH`, `OTHER`) | Elegir una opción | Sí |
| `productType` | select (`fashion`, `electronics`, `cosmetics`, `food`, `other`) | Elegir una opción | Sí |
| `shippingVolume` | select (`0-100`, `101-500`, `501-2000`, `2000+`, `unsure`) | Elegir una opción. Con `0-100` se muestra una advertencia (no bloquea) | Sí |
| `services` | checkbox (`warehousing`, `last-mile`, `reverse-logistics`) | Al menos uno | Sí |
| `currentProvider` | radio (`yes`, `no`, `evaluating`) | Elegir una opción | Sí |
| `comments` | textarea | Máximo 500 caracteres, con contador visible | No |
| `privacy` | checkbox | Debe estar marcado | Sí |

El envío es simulado: no hay backend, así que con datos válidos se muestra el mensaje de éxito.
