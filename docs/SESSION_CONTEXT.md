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
