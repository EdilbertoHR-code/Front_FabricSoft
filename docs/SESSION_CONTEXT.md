# SESSION CONTEXT — FabriSoft Frontend
Actualizado: 2026-05-21 · Sesión 5 (Estandarización y Renombrado de Componentes del Home)

---

## 1. Identificacion del Proyecto

- **Nombre:** fabricsoft.com.mx
- **Descripcion:** Sitio web gatekeeper de autoridad tecnica para FABRIC Oracle Critical Engineering
- **Repositorio:** https://github.com/Tiboryeah/FabricSoftPage.git
- **Equipo A:** Edilberto (Edi) + Gerardo · Supervision Julio Alvarez (Founder)
- **Demo intermedia:** jueves 21 de mayo · Demo final: lunes 25 de mayo · Standup: 11:00 AM

---

## 2. Stack Tecnologico Oficial

| Capa | Tecnologia | Version | Notas |
|------|-----------|---------|-------|
| Framework | Next.js | 15 · App Router | SSG, ISR, API Routes, Server Actions |
| UI | React | 19 | Server Components por defecto |
| Tipado | TypeScript | 5.x strict | Sin `any` implicitos |
| Estilos | Tailwind CSS | 3.x | tokens en `tailwind.config.ts` |
| Animaciones | Framer Motion | 11.x | Solo microinteracciones aprobadas |
| IA Streaming | Vercel AI SDK | 4.x | `useChat` hook |
| Auth | Clerk | 5.x | Panel `/admin/*`, roles, 2FA |
| Fuentes | next/font | built-in | FOUT zero, carga en build time |
| Imagenes | next/image | built-in | WebP auto, lazy loading, CLS = 0 |

> NOTA: El proyecto actualmente corre con Next.js 16.2.6 y Tailwind v4 (instalado antes
> de leer este doc). Se debe migrar al stack del doc (Next.js 15 + Tailwind 3.x) o
> confirmar con el equipo si Next.js 16 es aceptable. Tailwind v4 cambia la configuracion.

### Servicios de Backend / Integraciones

| Servicio | Rol | Costo mes 1 |
|----------|-----|-------------|
| Sanity CMS | Contenido editable: casos, papers, FSOs, metricas, slots | Gratis |
| MongoDB Atlas | Leads, diagnosticos, TCO, bookings, logs | Gratis 512MB |
| Resend | Emails transaccionales | Gratis 3000/mes |
| HubSpot CRM | Registro de leads | Gratis |
| Calendly | Booking Office Hours | Premium (confirmar) |
| Anthropic API | Claude Sonnet - modelo primario agente IA | Variable por uso |
| OpenAI API | Fallback 1 + embeddings RAG | Variable por uso |
| Grok API | Fallback 2 del agente | Variable por uso |
| Clerk | Auth panel admin | Hobby tier |
| Cloudflare Turnstile | CAPTCHA invisible | Gratis |
| Plausible Analytics | Analitica privacy-first | USD 9/mes |
| Sentry | Monitoreo de errores | Gratis |
| Vercel Pro | Hosting + Edge Functions + ISR | Variable |

---

## 3. Tokens de Diseno (No Negociables)

### Colores

| Variable CSS | Valor | Uso |
|-------------|-------|-----|
| `--bg-base` | `#0A0A0A` | Fondo base |
| `--bg-panel` | `#131313` | Paneles, cards, navbar |
| `--bg-elevated` | `#1A1A1A` | Elementos elevados |
| `--border` | `#252525` | Bordes sutiles |
| `--border-strong` | `#353535` | Hover y focus |
| `--text-primary` | `#F5F5F5` | Titulares y cuerpo |
| `--text-secondary` | `#8A8A8A` | Labels y metainfo |
| `--text-tertiary` | `#5A5A5A` | Placeholders y hints |
| `--accent` | `#C9A96E` | CTAs, labels, acentos |
| `--accent-2` | `#A07845` | Hover de acento |
| `--danger` | `#B85450` | Criterios de rechazo o alerta |

### Tipografia

| Variable | Fuente | Pesos | Uso |
|---------|--------|-------|-----|
| `--font-serif` / `var(--serif)` | Cormorant Garamond | 300, 400, 500, 600 | Titulares h1-h4 |
| `--font-sans` / `var(--sans)` | Inter | 300, 400, 500 | Cuerpo general |
| `--font-mono` / `var(--mono)` | JetBrains Mono | 400, 500 | Labels, codigo, monoespaciado |

### Restricciones Visuales (Prohibido)

- Azul saturado, gradientes evidentes, glassmorphism, fotos de stock
- Font Awesome, Roboto, Arial como fuente principal de titulares
- Parallax, scroll-jacking, animaciones excesivas
- Partículas, typewriters, o efectos que eliminen la "quietud" requerida por el Brief2.
- `border-radius` > 4px en componentes

---

## 4. Arquitectura de Componentes (Objetivo Final según ESTRUCTURA_HOME_FINAL.md)

El sitio se divide rígidamente en: **12 Secciones de Home** (narrativa inmersiva sin formularios largos) y **14 Páginas Satélite** (herramientas/wizards accesibles desde el Footer).

```
fabricsoft/ (frontend/)
├── app/
│   ├── page.tsx               # Home — Únicamente 12 secciones (Hero, Optimizador, Doctrina, Casos, etc.)
│   ├── layout.tsx             # Root layout, metadata y fuentes
│   ├── globals.css            # Variables CSS
│   ├── herramientas/          # Páginas Satélite del Footer
│   │   ├── doctrine-generator/page.tsx
│   │   ├── tco/page.tsx
│   │   ├── readiness/page.tsx
│   │   ├── roadmap/page.tsx
│   │   └── ai-diagnostic/page.tsx
│   ├── casos/                 # Páginas de autoridad
│   │   └── ape-plazas/audit-trail/page.tsx
│   ├── criterios/page.tsx     # The Apply Reverse
│   ├── transparencia/page.tsx
│   ├── servicios/post-mortem/page.tsx
│   ├── eventos/roundtable/page.tsx
│   ├── office-hours/page.tsx
│   ├── admin/                 # Panel privado con Clerk
│   └── api/                   # Endpoints, Server Actions y agente IA
├── components/
│   ├── layout/
│   │   ├── header.tsx         
│   │   └── footer.tsx         # Contiene links a todas las páginas satélite
│   ├── sections/              # Componentes de las 12 secciones del Home
│   └── forms/                 # Formularios de los wizards (TCO, Readiness, etc.)
└── middleware.ts               # Proteccion de /admin/*
```

---

## 5. Estado Actual — Lo Que Esta Hecho vs Brief2.md

### Home (Las 12 secciones mandatorias)
| Sección | Estado | Tarea Pendiente |
|---------|--------|-----------------|
| 01. Hero / Manifiesto | 🟢 Hecho (parcial) | Quitar partículas y typewriters para asegurar "quietud". |
| --. Tesis/Puente | 🔴 Faltante | Crear bloque exacto del 73% de fallas. |
| 02. Optimizador OCI | 🔴 Faltante | Crear bloque de 3 pasos (ahora es solo CTA). |
| 03. Doctrina (Preview) | 🟢 Hecho | `s06-doctrina.tsx` / `DoctrinaModal.tsx`. |
| 04. Caso Ancla | 🟢 Hecho | APE Plazas existe en `s07-casos.tsx`. |
| 05. Industrias Focales | 🟢 Hecho | `s08-industrias.tsx`. |
| 06. FABRIC OS | 🟢 Hecho | `s09-fabric-os.tsx`. |
| 07. Lifecycle | 🟢 Hecho | `s10-lifecycle.tsx`. |
| 08. Referencias Disponibles | 🔴 Faltante | Crear sección para invitar a hablar bajo NDA. |
| 09. Transparencia | 🟢 Hecho | `s13-transparencia.tsx`. Validar que solo muestre datos reales. |
| 10. Investigación | 🟢 Hecho | `s14-investigacion.tsx`. |
| 11. Founder + Wait List | 🟢 Hecho | `s15-founder.tsx` y Criterios Evaluados. |
| 12. Footer | 🟢 Hecho | `footerPublic.tsx`. Faltan los links a las nuevas páginas. |

### Footer (Las 14 páginas independientes/herramientas)
- Actualmente ninguna está implementada como ruta independiente con su respectiva lógica (TCO Comparator, Doctrine Generator, Readiness Score, etc.). El AI Diagnostic existe como componente (`ChatIa`) pero necesita moverse o adaptarse.

---

## 6. Lógica de los Wizards y Lead Magnets (Brief2.md)

* **Rescue Assessment:** Filtra proyectos fallidos, da score de severidad, requiere email.
* **ERP TCO / Cloud Cost Comparator:** Cálculos estimativos de 5-10 años mostrando ahorro vs Oracle, pre-cualifica clientes de SAP/AWS.
* **Readiness Score:** 15 preguntas con output 0-100 para evaluar madurez.
* **Doctrine Generator:** 6 preguntas para generar PDF de cláusulas contractuales.
* **FABRIC Migration Roadmap:** PDF con plan técnico a 30-180 días basado en respuestas.

---

## 7. Reglas de Negocio Criticas

- **Filtro de emails:** rechaza gmail, hotmail, yahoo, outlook, icloud, live, msn — TANTO cliente como servidor.
- **Filtro revenue:** < USD 50M no se registra como lead calificado, se redirige a Wait List sin mensaje explicito de rechazo.
- **Capacidad maxima:** 12 proyectos simultaneos (configurable desde admin). Al llegar al limite, CTAs cambian a "Lista de Espera".
- **Office Hours:** maximo 4 slots mensuales configurables.
- **Panel admin:** solo accesible con correos @fabricsoft.com.mx + 2FA via Clerk.
- **Metricas:** prohibido hardcodear NPS, SLA o casos que no sean reales.
- **Agente IA:** Kill Switch ante consultas fuera de Oracle. Fallback: Claude → OpenAI → Grok.

---

## 8. Estrategia de Render por Pagina

| Pagina | Estrategia |
|--------|-----------|
| `/` | Static Generation |
| `/casos/ape-plazas`, `/transparencia` | ISR revalidate 3600s |
| Herramientas (`/herramientas/*`) | Client-side (wizards interactivos) |
| `/aplicar`, `/office-hours` | Static + Server Action |
| `/admin/*` | Server-side + Clerk middleware |

---

## 9. Metricas de Rendimiento Objetivo

| Metrica | Umbral |
|---------|--------|
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility/SEO | 95+ / 100 |
| LCP | < 1.5s |
| CLS | < 0.05 |

---

## 10. Archivos Clave de Referencia

| Archivo | Ubicacion | Descripcion |
|---------|-----------|-------------|
| `CHECKLIST_BRIEF2.md` | Raíz | Tracking de avance contra el brief. |
| `ESTRUCTURA_HOME_FINAL.md` | `documentacion/` | Definición maestra de qué va en Home vs Footer. |
| `Brief2.md` | `documentacion/` | Fuente de verdad de copywriting y estrategia. |

---

## 11. Convenciones de Codigo

- TypeScript strict, sin `any` implicitos.
- Validacion Zod server-side.
- Sin emojis en ningun archivo.
- `border-radius` maximo 4px. Animaciones < 400ms.
- Nombres de archivos en kebab-case, componentes React en PascalCase.

---

## 12. Logros de la Sesión Actual (Sesión 5)

* **Estandarización y Renombrado de Componentes del Home**:
  * Se renombraron todos los archivos del Home en [home](file:///c:/Users/esteb/Documents/FabriSoft/src/pages/public/home/) a una nomenclatura uniforme en formato `sXX-name.tsx` (usando `git mv` para conservar el historial).
  * Se actualizaron los nombres de las funciones exportadas dentro de cada archivo (`S01Hero`, `S02Optimizador`, `S03TcoCalculator`, `S04TcoWaitlist`, `S05AnalisisFallas`, `S06Doctrina`, `S06bFixedPrice`, `S12bCriterios`) para coincidir con sus archivos.
  * Se actualizaron todas las importaciones y la estructura de renderizado en [home.tsx](file:///c:/Users/esteb/Documents/FabriSoft/src/pages/public/home/home.tsx).
  * Se eliminó el archivo vacío redundante `CloudTcoWaitlistSection.tsx`.
* **Diseño Responsivo Completo**: Se ajustó todo el maquetado CSS en [maquetado-dossier.css](file:///c:/Users/esteb/Documents/FabriSoft/src/maquetado-dossier.css) para resoluciones desde 320px hasta PC.
* **Verificación de Compilación**: Proyecto compilado de forma limpia (`npm run build`).

## 13. Próxima Sesión — Por Donde Continuar

**Prioridad 1: Ajustar los Contenidos Restantes del Hero (`s01-hero.tsx`)**
1. Remover animaciones y efectos excesivos: partículas (`BackgroundParticles`), carrusel mecanografiado (`TypewriterCarousel`), y desactivar animaciones complejas del globo terrestre (`PremiumGlobe`).
2. Ajustar textos del Hero: badge superior a "ORACLE CRITICAL ENGINEERING" en color champán (`#C9A96E`), título principal, y añadir el párrafo con la promesa de acompañamiento hasta el primer cierre contable.
3. Apuntar el CTA secundario a `/#diagnostico`.

**Prioridad 2: Maquetar el Bloque Tesis/Puente y la Sección Optimizador OCI**
1. Maquetar el Bloque Tesis/Puente (bloque del 73% de fallas).
2. Crear e integrar el bloque del Optimizador OCI (Diagrama de 3 pasos) en `s02-optimizador.tsx`.

**Prioridad 3: Construir el Ecosistema del Footer**
1. Enrutar `footerPublic.tsx` hacia las 14 páginas satélite.
2. Comenzar la maquetación de los Wizards (TCO Comparator, Readiness Score, Doctrine Generator).
3. Mover/Adaptar el componente `ChatIa` hacia su ruta dedicada `/herramientas/ai-diagnostic`.

---

## 14. Actualización de Sesión — Casos y PDFs bajo NDA

- Brief2 tiene prioridad sobre brief1 para la sección de casos.
- Regla editorial activa: no inventar métricas, fechas, quotes, documentos ni resultados. Si el brief no lo contiene o no está autorizado por CEO/cliente, debe mostrarse como pendiente.
- `s07-casos.tsx` queda como sección boutique/dossier, no como tabla: métricas en bloques editoriales, CTAs apilados y sin columnas que desborden.
- APE Plazas puede mostrar los datos específicos de Brief2:
  - Go-live planeado: 06 abril 2026.
  - Go-live ejecutado: 06 abril 2026.
  - Primer cierre planeado: abril 2026.
  - Primer cierre ejecutado: 30 abril 2026.
  - Acta de transición: en firma mayo 2026.
- APE Plazas puede ofrecer `Solicitar PDF bajo NDA`, porque Brief2 menciona paper formal 4-6 páginas y evidencias PDF bajo NDA, sujeto a autorización de cliente y validación legal.
- Aplazo permanece como caso real mencionado por Brief2, pero sin métricas, PDF, quote, fechas ni evidencia descargable hasta validación explícita del CEO y autorización del cliente.
- El audit trail puede mostrar solicitudes de PDF bajo NDA para APE Plazas: acta de go-live, reporte FABRIC y acta de transición. No debe habilitar descarga pública directa.

## 16. Sesión 22 mayo 2026 — Auditoría completa de alineación con Brief2

### Resumen de cambios
Se auditaron y corrigieron todas las secciones del home contra Brief2 (prioridad) y brief1. Regla aplicada en toda la sesión: **jamás inventar métricas, números, quotes ni contenido no autorizado por el brief o el CEO**.

### Cambios por sección
- **S09 FABRIC OS**: Quitado CTA "Explorar FABRIC OS completo" — enlace circular sin destino.
- **S11 Office Hours**: Botón "Reservar conversación" restaurado a modal `data-interaction="office-hours"` (InteractionManager). No navega a `/office-hours` hasta que exista el embed de Calendly.
- **S12 Referencias**: Botón "Iniciar evaluación" ahora dispara modal `data-interaction="reference"`. Nota de rotación dinámica de ejecutivos agregada al código (BACKEND TODO).
- **S12b Criterios**: Banner de métricas (`02` proyectos, `47` solicitudes) reemplazado por `—` hasta conectar DB. Diseño del banner mejorado.
- **S13 Transparencia**: Sección home correcta. TransparenciaPage corregida — quitadas métricas inventadas (`< 4h`, `100% Fixed-Price`, conteo agregado). Solo se publican datos verificables de APE Plazas + métricas del equipo según Brief2.
- **S14 Investigación**: Botón "Reservar lugar" del Benchmark Index ahora tiene modal boutique propio (`data-interaction="benchmark"`) con form de email corporativo gateado.
- **S15 Founder**: Quitado emoji ⏳ del countdown (viola regla sin emojis). Quitado bloque "Founder Line" (no viene en el brief). Números del store vienen en tiempo real.
- **Footer**: Corregidos links rotos. `FABRIC AI Diagnostic` → `/#fabric-ai`. `Optimizador OCI` → `/#diagnostico` → luego `/#fabric-ai`. Email `julio@fabricsoft.com.mx` restaurado.
- **Hero**: CTA "Auditoría OCI gratuita" apunta a `/#fabric-ai` (s05 análisis de fallas).
- **InteractionManager**: Montado en `home.tsx` — todos los modales ahora funcionan.
- **SectionNavigator**: Corregido `id="diagnostico"` → `id="fabric-ai"`.

### Limpieza de archivos no usados
Eliminados: `parte1_edi_v1.bak.tsx`, `parte7.home.tsx`, `s02-optimizador-oci.tsx`, `s07b-rescue-assessment.tsx`, `RetroGrid.tsx`.

### BackButton
Componente `src/components/BackButton.tsx` creado y agregado a todas las páginas satélite. Usa `navigate(-1)` — regresa exactamente a la sección del home donde estaba el usuario.

### Footer en páginas satélite
Footer grande aparece en todas las páginas. Quitado copyright bar hardcodeado duplicado. Quitado `minHeight: 100vh` de páginas satélite (causaba espacio negro entre contenido y footer).

### IDs disponibles en el home (mapa actualizado)
| ID | Sección |
|----|---------|
| `inicio` | S01 Hero |
| `optimizador` | S02 RescueCounter |
| `puente` | S02b Puente |
| `tco` | S03 TCO Calculator |
| `cloud-tco` | S04 TCO Waitlist |
| `fabric-ai` | S05 Análisis Fallas / AI Diagnostic |
| `doctrina` | S06 Doctrina |
| `fixed-price` | S06b Fixed Price |
| `s07` | S07 Casos |
| `s08` | S08 Industrias |
| `s09` | S09 FABRIC OS |
| `s10` | S10 Lifecycle |
| `s11` | S11 Office Hours |
| `s12` | S12 Referencias |
| `criterios` | S12b Criterios |
| `s13` | S13 Transparencia |
| `s14` | S14 Investigación |
| `s15` | S15 Founder + Waitlist |

### Pendiente para siguiente sesión
- Conectar números del store a DB real (proyectos activos, solicitudes evaluadas, lista de espera).
- Implementar Calendly en `/office-hours` cuando llegue el backend.
- Rotación dinámica de referencias ejecutivas (BACKEND TODO en s12-referencias.tsx).
- Auditar secciones S01 Hero y S02 Optimizador contra brief (partículas, typewriter, párrafo 73%).

## 15. Actualización de Sesión — Revisión Editorial Home

- Se revisó la sección S09 FABRIC OS contra Brief2.
- El bloque principal de FABRIC OS está alineado con Brief2: cuatro capas expandibles (Doctrina de entrega, FSOs paquetizados, Frameworks aplicados, Agentes IA propios).
- Se ajustó el encabezado del catálogo FSO en `s09-fabric-os.tsx` para usar lenguaje más fiel a Brief2:
  - De `Catálogo FSO · Pipeline privado 2026` a `FSO Engine · Soluciones paquetizadas`.
  - De `Seis soluciones nombradas. Cada una, validable.` a `IP nombrada y reutilizable. Cada FSO, validable.`
- Motivo: Brief2 define FSO Engine como el conjunto de Fabric Solution Objects, soluciones paquetizadas reutilizables e IP nombrada/vendible.
- Se corrigió el CTA `Explorar FABRIC OS completo` para apuntar al bloque público `#fso-engine` dentro de la misma sección, en lugar de enviar a `#aplicar`.
- Motivo: FABRIC OS es contenido público en Home; el CTA del brief debe explorar el sistema, no iniciar admisión.

---

## 17. Sesión 24 mayo 2026 — Backend s14 + Infraestructura API

### Resumen de cambios

Se auditó qué secciones del home capturan datos y cuáles necesitan backend. Se construyó el backend completo para **s14 Investigación (Papers)** con buenas prácticas. Se corrigieron errores de arranque del backend y se estableció la infraestructura base de API para el frontend.

### Stack real confirmado (corrige SESSION_CONTEXT secciones 2 y 8)

El proyecto **no usa Next.js**. El stack real es:

| Capa | Tecnología |
|------|-----------|
| Frontend | Vite 6 + React 19 + TypeScript + Tailwind CSS v4 |
| Routing | React Router v7 |
| Auth (público) | Clerk |
| Auth (admin) | sessionStorage + password + `x-admin-key` header |
| Backend | Express.js en `Backend/` (puerto 4000) |
| DB | MongoDB Atlas (Mongoose) |
| Package manager | pnpm (workspaces) |

### Infraestructura creada

- **`Backend/.env`** — configurado con MONGO_URI, CLERK_*, ADMIN_API_KEY (`fabric_admin_2026`)
- **`Backend/middleware/admin.middleware.js`** — valida header `x-admin-key` para rutas `/admin/*`
- **`src/config/api.ts`** — corregido puerto fallback (8080→4000), agregado `adminApi` con header `x-admin-key`
- **`.env.local`** (raíz, gitignored) — `VITE_API_URL` y `VITE_ADMIN_API_KEY`

### Backend s14 Papers — archivos nuevos

| Archivo | Descripción |
|---------|-------------|
| `Backend/models/model.paperAccess.js` | Schema PaperAccess (paperId, email, cargo, empresa, ipAddress, status, emailSent) con índice anti-spam 24h |
| `Backend/models/model.benchmarkAccess.js` | Schema BenchmarkAccess (nombre, empresa, email, status) con unique email |
| `Backend/controllers/papers.controller.js` | `solicitar`, `benchmarkEarlyAccess`, `listarAccesos`, `listarBenchmark`, `actualizarStatus` |
| `Backend/components/papers.component.js` | Router: POST /solicitar, POST /benchmark, GET+PATCH /admin/* |
| `Backend/routers/app.routers.js` | Corregido bug: rutas se importaban pero nunca se montaban con `router.use()` |

### Frontend s14 — cambios

| Archivo | Cambio |
|---------|--------|
| `src/components/InteractionManager.tsx` | Botones paper + benchmark ahora llaman API real. Loading state + error display |
| `src/pages/admin/AdminPapers.tsx` | Página nueva: tabla papers con filtros + tabla benchmark early access. Acciones: marcar enviado / bloquear |
| `src/pages/admin/AdminLayout.tsx` | Papers agregado al NAV |
| `src/routers/AppRouter.tsx` | Ruta `/admin/papers` agregada con lazy import |

### Estado backend por sección (s07–s15)

| Sección | Captura datos | Estado backend | Pendiente |
|---------|--------------|----------------|-----------|
| **S07 Casos** | Email gate PDF bajo NDA (APE Plazas) | 🔴 Sin backend | `POST /api/leads/nda` — guardar solicitud PDF + validar email corporativo |
| **S08 Industrias** | No | ✅ N/A | — |
| **S09 FABRIC OS** | No (CTA apunta a #fso-engine interno) | ✅ N/A | — |
| **S10 Lifecycle** | No | ✅ N/A | — |
| **S11 Office Hours** | Modal gate C-level + USD 50M+ | 🔴 Sin backend | `POST /api/office-hours/book` — guardar booking + validar criterios + redirect Calendly |
| **S12 Referencias** | Email gate "hablar bajo NDA" | 🔴 Sin backend | `POST /api/referencias/contacto` — capturar interés ejecutivo |
| **S12b Criterios** | — (números `—` hardcodeados) | 🔴 Sin backend | `GET /api/stats` — proyectos activos, solicitudes evaluadas para el store |
| **S13 Transparencia** | No (solo muestra datos) | ✅ N/A | — |
| **S14 Investigación** | Papers gate + Benchmark early access | ✅ **Completado** | TODO: Resend para entrega automática de PDFs |
| **S15 Founder / Waitlist** | Waitlist + capacidad slots | 🔴 Sin backend | `GET/PUT /api/capacidad` — persistir slots/waitlist en DB (actualmente in-memory en FabricContext) |

## 18. Sesión 24 mayo 2026 (cont.) — Google Calendar + Office Hours backend completo

### Resumen de cambios

Se conectó Google Calendar API (Service Account) al backend de Office Hours. El flujo de disponibilidad es ahora completamente real: el calendario de Julio determina qué slots están bloqueados.

### Archivos nuevos/modificados

| Archivo | Cambio |
|---------|--------|
| `Backend/services/calendar.service.js` | Nuevo. Consulta Google Calendar freebusy API. Mapea periodos ocupados a slots de 30 min (TZ: America/Mexico_City). |
| `Backend/controllers/officeHours.controller.js` | +`disponibilidadMes`, +`disponibilidadDia`. Ambos fallback silencioso si Calendar no responde. |
| `Backend/components/officeHours.component.js` | +`GET /disponibilidad/mes`, +`GET /disponibilidad/dia` |
| `Backend/index.js` | `require("dotenv").config()` movido a línea 1 (fix crítico: Resend crasheaba porque se instanciaba antes de cargar .env) |
| `src/components/InteractionManager.tsx` | Slots dinámicos desde API (`/office-hours/disponibilidad/dia`). Días siguientes calculados en runtime. |
| `src/pages/public/home/s11-office-hours.tsx` | Calendario dinámico completo: navega meses, colorea días con slots disponibles via `/office-hours/disponibilidad/mes`. |

### Credenciales Google Calendar (.env, nunca en git)

```
GOOGLE_CALENDAR_ID=escomsmile@gmail.com          # cambiar por calendario real de Julio
GOOGLE_SERVICE_ACCOUNT_EMAIL=fabric-calendar@oval-botany-497322-i4.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_TIMEZONE=America/Mexico_City
```

Para cambiar al calendario de Julio: actualizar `GOOGLE_CALENDAR_ID` y compartir ese calendario con `fabric-calendar@oval-botany-497322-i4.iam.gserviceaccount.com` (solo lectura).

### Verificación exitosa

```
GET /api/office-hours/disponibilidad/dia?date=2026-05-27
→ {"ok":true,"data":[{"time":"09:00","taken":false},...]}   ← 10 slots disponibles
```

Booking completo funcional: usuario reserva → se guarda en MongoDB con status `pendiente`.

### Pendiente: email de confirmación al confirmar desde admin

🔴 **PENDIENTE — implementar en próximo chat**

Cuando admin cambia status a `confirmado` en `PATCH /api/office-hours/admin/:id/status`, debe enviarse email al usuario. Ver sección 19.

## 19. PENDIENTE — Email de confirmación de Office Hours

🔴 **No implementado. Iniciar aquí en próximo chat.**

### Flujo acordado

```
Admin panel → click "Confirmar"
  → PATCH /api/office-hours/admin/:id/status  { status: "confirmado" }
  → controller detecta status === "confirmado"
  → fire-and-forget: sendConfirmacionOfficeHours(booking)
  → actualiza booking.emailEnviado = true/false según resultado
  → admin ve en tabla si email llegó o no
```

### Patrón correcto (no bloquea la respuesta HTTP)

```js
if (status === 'confirmado') {
  sendConfirmacionOfficeHours(booking)
    .then(() => Booking.findByIdAndUpdate(id, { emailEnviado: true }))
    .catch(err => {
      console.error('Email confirmación OH falló:', err.message);
      // emailEnviado queda false — visible en admin panel
    });
}
```

### Archivos a tocar

1. `Backend/models/model.officeHoursBooking.js` — agregar `emailEnviado: { type: Boolean, default: false }`
2. `Backend/controllers/officeHours.controller.js` — `actualizarStatus`: agregar bloque fire-and-forget arriba
3. `Backend/services/email.service.js` — agregar `templateOfficeHoursConfirmacion` + `exports.sendConfirmacionOfficeHours`
4. Admin panel (frontend) — mostrar columna o indicador `emailEnviado` en tabla de bookings

### Datos disponibles en el booking

`nombre`, `empresa`, `email`, `dia` (YYYY-MM-DD), `slot` (HH:MM). Formatear `dia` como "martes 26 de mayo de 2026" en el template.

---

### Pendiente para siguiente sesión

**Prioridad 1 — /aplicar (leads críticos)**
- `POST /api/leads` — guardar submissions del wizard de 5 pasos en MongoDB (actualmente `setSubmitted(true)` sin API call — datos se pierden)
- `POST /api/leads/tco` — guardar submissions del Cloud TCO Modal
- Modelo: Lead (empresa, revenue, stack, email, cargo, score calificación, origen)

**Prioridad 2 — Capacidad y store (S15)**
- `GET/PUT /api/capacidad` — persistir en DB los slots disponibles y lista de espera que hoy viven en FabricContext (in-memory)
- `GET /api/stats` — endpoint para S12b (proyectos activos, solicitudes evaluadas)

**Prioridad 3 — Office Hours (S11)**
- `POST /api/office-hours/book` — gate: validar email corporativo + revenue ≥ USD 50M, si pasa → redirect Calendly
- AdminOfficeHours (actualmente usa FabricContext in-memory) → conectar a DB

**Prioridad 4 — S07 NDA PDF gate**
- `POST /api/leads/nda` — email gate para PDF bajo NDA de APE Plazas

**Prioridad 5 — Email delivery**
- Integrar Resend en `papers.controller.js` (hay TODO en ~línea 55) para entrega automática de PDFs al cambiar status → `enviado`

### Bugs / deuda técnica conocida

- `AdminLeads`, `AdminOfficeHours`, `AdminMetricas`, `AdminCapacidad` — todos usan FabricContext (in-memory). Al reiniciar el server pierden datos. Necesitan endpoints reales.
- `formData.nombre` se envía como `cargo` al endpoint de papers — la UI dice "nombre" pero el brief pide cargo. Revisar si se debe agregar campo separado o renombrar el label.
- Backend `POST /api/leads` para el diagnóstico de 14 pasos (S05 Análisis de Fallas) también está sin implementar.

---

## 20. SesiÃ³n 24 mayo 2026 (cont.) â€” Office Hours email + Clerk admin

### Resumen de cambios

Se implementÃ³ el email de confirmaciÃ³n para Office Hours al cambiar una reserva a `confirmado` desde admin. TambiÃ©n se corrigiÃ³ el flujo de acceso admin con Clerk, eliminando la mezcla entre Clerk y el login local antiguo por `sessionStorage`.

### Office Hours email â€” completado

| Archivo | Cambio |
|---------|--------|
| `Backend/models/model.officeHoursBooking.js` | Agregado `emailEnviado: { type: Boolean, default: false }`. |
| `Backend/controllers/officeHours.controller.js` | `actualizarStatus` dispara `sendConfirmacionOfficeHours(booking)` en fire-and-forget al confirmar. Si Resend responde bien, marca `emailEnviado: true`; si falla, queda `false`. |
| `Backend/services/email.service.js` | Agregado `templateOfficeHoursConfirmacion`, `formatOfficeHoursDate`, escape HTML y `exports.sendConfirmacionOfficeHours`. |
| `src/pages/admin/AdminOfficeHours.tsx` | Muestra indicador `Email ok` / `Email pendiente` en la fila y en el panel lateral. Refresca la tabla 2.5s despuÃ©s de confirmar para recoger el resultado async. |

### VerificaciÃ³n realizada

```
node --check Backend/controllers/officeHours.controller.js
node --check Backend/services/email.service.js
```

Ambos OK. Se verificÃ³ tambiÃ©n el formato de fecha:

```
2026-05-26 -> martes 26 de mayo de 2026
```

### Clerk / Admin â€” corregido

Problema detectado: el admin mezclaba dos modelos de autenticaciÃ³n:
- `AppRouter.tsx` protegÃ­a `/admin/*` con Clerk.
- `AdminLayout.tsx` ademÃ¡s exigÃ­a `sessionStorage.fabric_admin` y redirigÃ­a a `/admin/login`.
- `/admin/login` no estaba montado en `AppRouter.tsx`.
- `VerificarAcceso.tsx` redirigÃ­a admins a `/Admin` con mayÃºscula, ruta inexistente.
- Backend/Mongo usa rol `admin` en minÃºscula, mientras el frontend esperaba `Admin`.

Cambios aplicados:

| Archivo | Cambio |
|---------|--------|
| `src/routers/AppRouter.tsx` | `/admin/*` queda protegido por `ProtectorRoles`. `/admin/login` redirige a `/acceso` como compatibilidad. |
| `src/pages/admin/AdminLayout.tsx` | Quitada validaciÃ³n de `sessionStorage.fabric_admin`. Logout ahora usa `signOut()` de Clerk. Sidebar muestra nombre real del usuario Clerk. |
| `src/auth/ProtecteRoles.tsx` | Si no hay sesiÃ³n, redirige a `/acceso`. Normaliza roles a minÃºsculas y acepta `publicMetadata.rol` o `publicMetadata.role`. |
| `src/auth/VerificarAcceso.tsx` | Admin ahora redirige a `/admin`. Acepta `admin` y `superadmin` normalizados. |
| `.env.local` | Agregado `VITE_CLERK_PUBLISHABLE_KEY`. Vite no lee `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`. |

### Variables necesarias

Frontend (`.env.local`, gitignored):

```
VITE_API_URL=http://localhost:4000/api
VITE_ADMIN_API_KEY=fabric_admin_2026
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

Backend (`Backend/.env`, gitignored):

```
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
ADMIN_API_KEY=fabric_admin_2026
```

El usuario admin debe tener en Clerk public metadata:

```
{ "rol": "admin" }
```

Tambien se acepta:

```
{ "role": "admin" }
```

### Pendiente inmediato al retomar

1. Reiniciar Vite para que lea `VITE_CLERK_PUBLISHABLE_KEY`.
2. Probar flujo: `/admin` -> `/acceso` -> login Clerk -> `/verificar-acceso` -> `/admin`.
3. Probar confirmar Office Hours desde admin y verificar que `emailEnviado` pase a `true`.
4. Si el admin no entra, revisar en Clerk que el usuario tenga `publicMetadata.rol = "admin"` y que backend `/api/auth/login` responda `{ rol: "admin", status: "activo" }`.
5. Por seguridad, rotar secretos expuestos en chat antes de producciÃ³n o repositorio compartido: `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SECRET`, `MONGO_URI`, `RESEND_API_KEY`, private key de Google.

### Estado de build

`npm run build` sigue fallando por errores preexistentes no relacionados con esta sesiÃ³n:

```
src/pages/public/home/s06-doctrina.tsx
- Link importado sin uso
- isModalOpen / setIsModalOpen sin uso

src/pages/public/home/s15-founder.tsx
- Incompatibilidad de tipos alrededor de SlotStatus
- Acceso a `.status` sobre una uniÃ³n que incluye strings
```

## 21. Sesion 24 mayo 2026 (cont.) - S15 Founder / capacidad

### Resumen

Se completo S15 conectando la seccion Founder/Waitlist con backend real de capacidad y stats. Tambien se corrigio la migracion del documento historico de capacidad en MongoDB.

### Cambios aplicados

| Archivo | Cambio |
|---------|--------|
| `src/pages/public/home/s15-founder.tsx` | Normaliza slots del backend (`disponible`, `activo`, `reservado`) al formato del store (`libre`, `activo`, `reservado`). Consume `/api/capacidad` y `/api/stats`. Usa `enListaEspera` real para waitlist. |
| `Backend/models/model.capacidad.js` | `admissionQuarters` ahora es arreglo de objetos con `quarter`, `status`, `label`, `description`, `deadline`. `deadlineQ3` default queda en ISO: `2026-07-30T23:59:59-06:00`. |
| `Backend/controllers/capacidad.controller.js` | Migra `deadlineQ3` viejo (`30 jun 2026`) a ISO con `updateOne(..., runValidators: false)` para no revalidar documentos historicos. |
| `src/pages/public/home/s06-doctrina.tsx` | Limpieza minima para build: eliminado `Link` y estado modal no usados. |

### Verificacion realizada

```
GET /api/capacidad -> ok true
deadlineQ3 -> 2026-07-30T23:59:59-06:00
npm.cmd run build -> OK
```

Nota: la primera corrida de build dentro del sandbox fallo por permisos de Vite al leer `vite.config.ts`; al correrlo fuera del sandbox compilo correctamente.

## 22. Sesion 24 mayo 2026 (cont.) - S12 Referencias dinamicas

### Resumen

Se completo el backend de S12 Referencias Disponibles. La seccion ya no depende solo de un array hardcodeado: lee un catalogo publico desde MongoDB y mantiene fallback local si la API no responde.

### Cambios aplicados

| Archivo | Cambio |
|---------|--------|
| `backend/models/model.referencia.js` | Nuevo singleton `ReferenciasConfig` con `rotationWeeks` y referencias default. |
| `backend/controllers/referencias.controller.js` | Nuevo controlador: listado publico, listado admin, actualizacion y reset a defaults. |
| `backend/components/referencias.component.js` | Nuevo router: `GET /api/referencias`, `GET/PUT /api/referencias/admin`, `POST /api/referencias/admin/reset`. |
| `backend/routers/app.routers.js` | Montada ruta `/referencias`. |
| `src/pages/public/home/s12-referencias.tsx` | Ahora consume `/api/referencias`; fallback local si falla API. |
| `src/pages/admin/AdminReferencias.tsx` | Nueva pagina admin para editar referencias, idiomas, visibilidad y semanas de rotacion. |
| `src/pages/admin/AdminLayout.tsx` | Agregado nav `Referencias`. |
| `src/routers/AppRouter.tsx` | Agregada ruta `/admin/referencias`. |

### Verificacion realizada

```
GET /api/referencias -> ok true, 5 referencias default
GET /api/referencias/admin -> ok true con x-admin-key
npm.cmd run build -> OK
```

Pendiente opcional: implementar rotacion automatica real por fecha usando `rotationWeeks`; por ahora el admin controla manualmente `disponible`.

## 23. Sesión 24 mayo 2026 (cont.) — S13 Transparencia backend completo

### Resumen

Se implementó el backend específico para S13 Transparencia con arquitectura "transparencia editable pero con candados". El modelo separado de `/api/metricas` elimina el riesgo de publicar defaults peligrosos como `nps: 72`.

### Archivos nuevos

| Archivo | Descripción |
|---------|-------------|
| `backend/models/model.transparencia.js` | Singleton con tres sub-arrays: `publicadas`, `proximas`, `compromisos`. Defaults replican el contenido editorial previo. |
| `backend/controllers/transparencia.controller.js` | `listarPublico`, `listarAdmin`, `actualizar`, `restaurarDefaults`. Sanitización completa de inputs. |
| `backend/components/transparencia.component.js` | Router: `GET /api/transparencia`, `GET/PUT/POST /api/transparencia/admin`. |
| `src/pages/admin/AdminTransparencia.tsx` | Panel admin con 3 pestañas: Publicadas / Próximas / Compromisos. |

### Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `backend/routers/app.routers.js` | Montada ruta `/transparencia`. |
| `src/pages/public/home/s13-transparencia.tsx` | Consume `GET /api/transparencia`. Fallback al array editorial si API no responde. |
| `src/pages/public/transparencia/TransparenciaPage.tsx` | Consume `GET /api/transparencia`. Fallback idéntico al contenido hardcodeado anterior. |
| `src/pages/admin/AdminLayout.tsx` | Agregado nav `Transparencia`. |
| `src/routers/AppRouter.tsx` | Agregada ruta `/admin/transparencia`. |

### Regla de publicación (candado doble)

```
visible === true && verified === true  →  aparece en público
visible === true && verified === false →  oculto (pendiente de verificación)
visible === false                      →  oculto
```

El campo `verified` es el gate editorial crítico. En el admin panel aparece como checkbox diferenciado en color acento (#C9A96E). Sin él, ninguna métrica sale al público aunque esté "visible".

### Verificación

```
node --check backend/models/model.transparencia.js     → OK
node --check backend/controllers/transparencia.controller.js → OK
node --check backend/components/transparencia.component.js   → OK
npm.cmd run build → OK (sin errores ni warnings nuevos)
```

### Estado de S13 en tabla de secciones

| Sección | Estado backend |
|---------|---------------|
| **S13 Transparencia** | ✅ **Completado** — `GET /api/transparencia` + `/admin` |

### Ajuste S12 FOMO - rotacion semanal

Regla acordada: no inventar mas referencias. El catalogo autorizado mantiene 5 referencias, pero el home solo muestra 3 por semana para generar escasez real.

Cambios:
- `backend/models/model.referencia.js`: agregado `publicLimit`, default `3`; `rotationWeeks` default `1`.
- `backend/controllers/referencias.controller.js`: `GET /api/referencias` filtra referencias disponibles y devuelve una ventana circular de 3 segun semana actual.
- `src/pages/admin/AdminReferencias.tsx`: admin puede ver/editar `publicLimit`; DB quedo actualizada a `rotationWeeks: 1`, `publicLimit: 3`.
- `src/pages/public/home/s12-referencias.tsx`: copy actualizado a ventana semanal limitada.

Verificacion:
```
GET /api/referencias -> 3 referencias visibles, publicLimit 3, totalDisponibles 5, rotationWeeks 1
npm.cmd run build -> OK
```

## 25. Sesión 24 mayo 2026 (cont.) — S11 calendario fixes + modal mejoras + Fabric Score

### Resumen

Se corrigieron 7 problemas del calendario de Office Hours (S11), se mejoró el modal de reserva, se enriqueció el formulario de referencias, se agregó filtro de source en AdminLeads, y se corrigió el Fabric Score para leads de referencia.

### Bugs corregidos en S11 calendario

| Bug | Causa | Fix |
|-----|-------|-----|
| Lunes con todos los slots ocupados | `TODAY_ISO` usaba UTC → después de 19:00 CDMX devolvía el día siguiente | `localDateISO()` con `getFullYear/Month/Date` locales |
| Días pasados clickeables | Sin clase `past` ni guard en CSS | Clase `past` en `buildCalendarGrid`; `cursor: default` en CSS |
| Navegación hacia atrás ilimitada | Sin límite inferior en `prevMonth` | Guard `isAtMin` (mes actual) y `isAtMax` (mes actual + 1) |
| Días disponibles en ámbar | `.cal-day.slot` usaba `var(--accent)` | Cambiado a `var(--text-primary)` (blanco) |
| Fines de semana sin gris | Sin clase CSS diferenciada | `.cal-day.muted` con `opacity: 0.35; cursor: default` |
| Días llenos aún clickeables | `getMonthAvailability` ignoraba reservas en DB | Controller pre-consulta DB, construye `dbByDay` map, lo pasa al service |
| Días sin slots futuros ambiguos | Sin clase visual | `.cal-day.active` con `opacity: 0.55; cursor: default` (gris) |

### Modal de reserva — mejoras

| Mejora | Detalle |
|--------|---------|
| Click en día del calendario pre-selecciona fecha en modal | `data-date` attribute en cada celda; InteractionManager lee atributo y hace `setSelectedDay(clickedDate)` |
| `selectedDay` cambió de índice numérico a ISO string | Evita desfase cuando `days` cambia. `useState<string>(() => getWorkDaysUntilEndOfNextMonth()[0])` — inicialización directa sin referencia a `days` |
| Selector de días muestra resto del mes + mes siguiente | `getWorkDaysUntilEndOfNextMonth()` genera días hábiles hasta fin del mes siguiente |
| Paginación semanal (5 días visibles) | Estado `weekOffset`; `useEffect` auto-salta a la semana del día seleccionado cuando llega desde el calendario |
| Quitado botón izquierdo "RESERVAR CONVERSACIÓN" | Solo queda el CTA debajo del calendario y el `nda-seal` |

### Formulario de referencia enriquecido

Antes solo pedía nombre + empresa + email. Ahora incluye:
- **cargo** (select: CFO / CTO / CIO / Director Transformación / VP Finance / VP Technology)
- **revenue** (select: rangos USD 50M–1B+)
- **iniciativa Oracle** (textarea, mínimo 10 caracteres)

Backend `solicitarReferencia` actualizado para validar y guardar los tres campos nuevos.

### AdminLeads — filtro por source

Agregados botones de filtro: **Todos / aplicar / referencia / chat**. El estado `sourceFilter` cruza con el filtro existente de status/industria.

### Fabric Score — fix para leads de referencia

`calcScore()` solo se llamaba en el flujo `solicitar`. Los leads de `solicitarReferencia` quedaban con `score: 0`. Fix: se llama `calcScore({ revenue, iniciativa })` antes de `Lead.create` en `solicitarReferencia`.

**Qué mide el Fabric Score (0–95):**
- Revenue de la empresa (máx 35 pts)
- Industria calificada: financiero / inmobiliario / logística (25 pts)
- Plazo de decisión (máx 25 pts — solo aplica al flujo `aplicar`)
- Longitud de la descripción de iniciativa (máx 10 pts)

Referencias no tienen `industria` ni `plazo` en su formulario, por lo que su score máximo es 45 pts.

### Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `src/pages/public/home/s11-office-hours.tsx` | `buildCalendarGrid`: clase `past`, guards navegación, `data-date` en celdas |
| `src/maquetado-dossier.css` | Clases `.slot`, `.muted`, `.past`, `.active`, `.legend-swatch.full` |
| `src/components/InteractionManager.tsx` | `localDateISO`, `getWorkDaysUntilEndOfNextMonth`, `selectedDay` como ISO, `weekOffset`, paginación semanal, formulario referencia ampliado |
| `Backend/services/calendar.service.js` | `getMonthAvailability` acepta `dbByDay` map |
| `Backend/controllers/officeHours.controller.js` | `disponibilidadMes` consulta DB primero, pasa `dbByDay` al service |
| `Backend/controllers/leads.controller.js` | `solicitarReferencia` calcula `score`; acepta `cargo`, `revenue`, `iniciativa` |
| `src/pages/admin/AdminLeads.tsx` | Filtro por `source` (Todos / aplicar / referencia / chat) |

### Pendiente para siguiente sesión

- Frontend de Research Letters (página pública `/research-letters`)
- `GET /api/stats` — endpoint real para S12b store
- `POST /api/leads` — wizard de 5 pasos todavía no llama API
- AdminLogs: conectar a DB real

---

## 24. Sesión 24 mayo 2026 (cont.) — Papers PDF por email + Research Letters backend completo

### Resumen

Se completó el backend de S14 Papers (entrega automática de PDF por email), se construyó el backend completo de Research Letters con cupo configurable, y se aclaró el estado de AdminLogs.

### Papers — PDF por email (Resend)

PDFs se almacenan en `Backend/assets/papers/paper-XX.pdf` (nombrado exactamente así).

| Archivo | Cambio |
|---------|--------|
| `Backend/services/email.service.js` | Agregado `templatePaperEntrega`, `PAPER_TITLES`, `exports.sendPaperEntrega` (lee PDF con `fs.readFileSync`, adjunta via Resend `attachments`). También `sendResearchLetterConfirmacion` y `sendResearchLetterBienvenida`. |
| `Backend/controllers/papers.controller.js` | `actualizarStatus`: guard 409 si PDF no existe antes de guardar en DB. Al cambiar a `enviado` dispara `sendPaperEntrega` en fire-and-forget. |
| `Backend/assets/papers/.gitkeep` | Directorio para PDFs. Convención: `paper-01.pdf`, `paper-02.pdf`, `paper-03.pdf`. |

### Research Letters — backend completo

Spec del brief: análisis quincenal para CFOs/CTOs, empresa ≥ USD 50M, cargo C-level/Director, iniciativa Oracle activa o planeada. Cupo configurable con toggle de desactivar.

| Archivo | Descripción |
|---------|-------------|
| `Backend/models/model.researchLetterSuscriptor.js` | Schema suscriptor: email, nombre, empresa, cargo, revenueAprox, iniciativaOracle, industria, ipAddress, status (pendiente/aprobado/rechazado). |
| `Backend/models/model.researchLetterConfig.js` | Singleton con `cupoActivo`, `cupoMaximo` (default 50), `admisionAbierta`. Método `getSingleton()`. |
| `Backend/controllers/researchLetters.controller.js` | `solicitar` (gate email corporativo + admision + cupo + dedup), `listar`, `actualizarStatus`, `getConfig`, `actualizarConfig`. |
| `Backend/components/researchLetters.component.js` | `POST /solicitar` (público), `GET/PUT /admin`, `GET/PUT /admin/config`, `PATCH /admin/:id/status` (todos protegidos con requireAdminKey excepto solicitar). |
| `Backend/routers/app.routers.js` | Montada ruta `/research-letters`. |
| `src/pages/admin/AdminResearchLetters.tsx` | Panel admin: toggle admisión abierta/cerrada, toggle cupo activo/sin límite, input cupo máximo, stats (total/aprobados/pendientes), filtros, tabla con acciones Aprobar/Pendiente/Rechazar. |
| `src/pages/admin/AdminLayout.tsx` | Agregado nav `Research Letters`. |
| `src/routers/AppRouter.tsx` | Agregada ruta `/admin/research-letters` con lazy import. |

### Bug crítico resuelto — adminApi vs api

`AdminResearchLetters.tsx` importaba `api` en vez de `adminApi` → requests sin header `x-admin-key` → middleware devolvía 401 → `catch` mostraba "Error cargando datos.".

Regla: **todas las páginas admin deben usar `adminApi`** de `src/config/api.ts`, no `api`. `api` no tiene el header `x-admin-key`.

### AdminLogs — estado actual

**100% hardcodeado.** Datos estáticos en array `LOGS`. No existe backend (`/api/logs`), ni modelo, ni ningún controller escribe logs. Para hacerlo real se necesita:
1. Modelo `Log` (timestamp, action, author, category, status)
2. Cada controller llama `Log.create(...)` al mutar datos
3. `GET /admin/logs` paginado
4. Frontend lee API en vez del array estático

Pendiente como tarea futura.

### Estado consolidado por sección

| Sección | Estado backend |
|---------|---------------|
| **S14 Papers** | ✅ **Completado** — solicitud + entrega PDF por email (Resend) |
| **Research Letters** | ✅ **Completado** — registro + cupo configurable + aprobación con email bienvenida |
| **AdminLogs** | 🔴 Hardcodeado — ningún controller escribe logs todavía |

### Pendiente próxima sesión

- Frontend de Research Letters (página pública `/research-letters` con form de registro)
- AdminLogs: conectar a DB real
- `POST /api/leads` — wizard de 5 pasos en `/aplicar` todavía no llama API (datos se pierden)
- `GET /api/stats` — endpoint real para S12b store (proyectos activos, solicitudes evaluadas)
