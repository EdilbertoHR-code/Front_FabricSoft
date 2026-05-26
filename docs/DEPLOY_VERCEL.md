# Guía de deployment en Vercel — FabriSoft

> Monorepo con frontend (Vite/React) y backend (Express/Node) en el mismo repo de GitHub.
> Se crean **dos proyectos separados** en Vercel: uno para cada uno.
> Despliega primero el backend, luego el frontend.

---

## Antes de empezar

- Tener acceso a [vercel.com](https://vercel.com) con tu cuenta
- El repo ya estar pusheado a GitHub
- Tener a la mano tu archivo `Backend/.env` con todas las variables

---

## PASO 1 — Backend

### 1.1 Crear el proyecto

1. En Vercel → **Add New Project**
2. Importa el repo de GitHub (FabriSoft)
3. En **Configure Project**, expande la sección **Root Directory**
4. Escribe: `Backend`
5. Deja los demás campos así:
   - Framework Preset: `Other`
   - Build Command: *(vacío)*
   - Output Directory: *(vacío)*
   - Install Command: `npm install`

### 1.2 Variables de entorno del backend

Antes de dar Deploy, agrega cada variable en **Environment Variables**.
Marca todas como **Production** (y también Preview si lo usas).

| Variable | Descripción |
|---|---|
| `MONGO_URI` | URI completa de MongoDB Atlas (`mongodb+srv://...`) |
| `CLERK_SECRET_KEY` | Clave secreta de Clerk (`sk_live_...`) |
| `CLERK_WEBHOOK_SECRET` | Secret del webhook de Clerk (`whsec_...`) |
| `RESEND_API_KEY` | API key de Resend para emails |
| `EMAIL_FROM` | Remitente de emails, ej: `FABRIC <hola@tudominio.com>` |
| `FRONTEND_URL` | URL del frontend en Vercel — **la llenas después del Paso 2** |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Email de la service account de Google Calendar |
| `GOOGLE_PRIVATE_KEY` | Clave privada de Google (el contenido completo del campo `private_key` del JSON, incluyendo `-----BEGIN...`) |
| `GOOGLE_CALENDAR_ID` | ID del calendario de Google (`...@group.calendar.google.com`) |
| `GOOGLE_CALENDAR_TIMEZONE` | Zona horaria, ej: `America/Mexico_City` |
| `DEEPL_API_KEY` | API key de DeepL para traducción (opcional si no se usa) |
| `NDA_APE_PLAZAS_PDF_URL` | URL pública del PDF del NDA (opcional) |
| `OPENAI_API_KEY` | API key de OpenAI para el agente IA (opcional) |
| `ANTHROPIC_API_KEY` | API key de Anthropic/Claude (opcional) |
| `GROK_API_KEY` | API key de Grok/xAI (opcional) |

> `PORT` **no se agrega** — Vercel lo asigna automáticamente.

### 1.3 Hacer deploy

1. Clic en **Deploy**
2. Espera a que termine (1-2 min)
3. Copia la URL que te da, ej: `https://fabricsoft-backend.vercel.app`
4. Prueba que funciona visitando: `https://fabricsoft-backend.vercel.app/health`
   - Debes ver: `{ "ok": true, "status": "healthy", "database": "MongoDB Atlas" }`

---

## PASO 2 — Frontend

### 2.1 Crear el proyecto

1. En Vercel → **Add New Project**
2. Importa el **mismo repo** de GitHub
3. En **Configure Project**:
   - **Root Directory**: *(vacío — déjalo en blanco, es la raíz)*
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

> Si el proyecto usa `pnpm`, el install command es `pnpm install` y el build es `pnpm run build`.

### 2.2 Variables de entorno del frontend

| Variable | Valor |
|---|---|
| `VITE_API_URL` | URL del backend del Paso 1 + `/api`, ej: `https://fabricsoft-backend.vercel.app/api` |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clave pública de Clerk (`pk_live_...`) |

### 2.3 Hacer deploy

1. Clic en **Deploy**
2. Copia la URL del frontend, ej: `https://fabricsoft.vercel.app`

---

## PASO 3 — Conectar frontend ↔ backend

### 3.1 Actualizar FRONTEND_URL en el backend

1. Ve al proyecto del **backend** en Vercel
2. Settings → **Environment Variables**
3. Edita `FRONTEND_URL` y pon la URL del frontend: `https://fabricsoft.vercel.app`
4. Ve a **Deployments** → los tres puntos del último deploy → **Redeploy**

### 3.2 Actualizar el webhook de Clerk

En el dashboard de Clerk:
1. Ve a **Webhooks**
2. El endpoint del webhook debe apuntar a: `https://fabricsoft-backend.vercel.app/api/auth/webhook`
3. Si ya tenías uno con ngrok o localhost, actualízalo

---

## PASO 4 — Verificación final

Comprueba que todo funciona de extremo a extremo:

- [ ] `GET https://tu-backend.vercel.app/health` devuelve `ok: true`
- [ ] El frontend carga en su URL de Vercel
- [ ] Navegar a una ruta directa (ej: `/aplicar`) no da 404
- [ ] El login con Clerk funciona
- [ ] Enviar un formulario (ej: Rescue Assessment) llega a MongoDB y envía email

---

## Problemas comunes

| Síntoma | Causa probable | Solución |
|---|---|---|
| Backend da `CORS bloqueado` | `FRONTEND_URL` incorrecta o con trailing slash | Revisarla en env vars del backend y Redeploy |
| Frontend da 404 en rutas directas | Falta el `vercel.json` en la raíz | Ya está creado en el repo — verificar que se subió |
| `MONGO_URI no está definida` | La env var no se guardó bien | Verificar en Settings → Env Vars del backend |
| Google Calendar no funciona | `GOOGLE_PRIVATE_KEY` truncada | Copiar el valor completo incluyendo los saltos de línea (`\n`) |
| Emails no llegan | `RESEND_API_KEY` incorrecta o `EMAIL_FROM` con dominio no verificado | Verificar dominio en Resend dashboard |

---

## Notas

- Cada `git push` a `main` dispara un redeploy automático en Vercel para ambos proyectos.
- Las variables de entorno **nunca** se commitean al repo — solo se configuran en el dashboard de Vercel.
- El backend corre como **Serverless Functions** en Vercel, no como servidor persistente. Las conexiones a MongoDB usan el pool de Mongoose, que funciona bien en este modelo.
