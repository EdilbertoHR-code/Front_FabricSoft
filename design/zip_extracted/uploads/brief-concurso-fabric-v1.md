# BRIEF EJECUTIVO — CONCURSO DE DESARROLLO

## FABRICSOFT.COM.MX V1.0

**De:** Julio Alvarez, Founder & CEO · FABRIC
**Para:** Equipo A (Edi, Gerardo) · Equipo B (Cristopher, Antonio)
**Fecha:** 19 mayo 2026
**Plazo entrega:** 25 mayo 2026 (8 días)

---

## 1. CONTEXTO Y MISIÓN

El **25 de mayo 2026** publicamos el caso de éxito **APE Plazas**, primer go-live exitoso de FABRIC bajo nueva doctrina. Esto generará tráfico ejecutivo significativo al sitio.

**fabricsoft.com.mx no existe hoy.** Necesitamos construirlo en 8 días con calidad **premium nivel boutique** — comparable a sitios como Bain & Company, Sequoia Capital, Linear, Anthropic, Vercel.

Este NO es un sitio corporativo común. Es un activo estratégico de marca que debe:
- Atraer prospectos C-level (CFO, CIO, CTO) de empresas USD 50M-500M+
- Generar leads pre-calificados via lead magnets funcionales
- Comunicar autoridad y selectividad (no urgencia de venta)
- Soportar pricing premium (proyectos USD 150K - 2M)
- Convertirse en referencia visual del sector Oracle en Mexico y LATAM

---

## 2. REGLAS DEL CONCURSO

### Criterios de evaluación (peso ponderado):

| Criterio | Peso |
|---|---|
| Fidelidad visual al diseño aprobado | 25% |
| Performance (Lighthouse 95+) | 15% |
| Calidad de código (legible, mantenible, documentado) | 15% |
| Funcionalidad de lead magnets | 15% |
| Mobile responsive impecable | 10% |
| SEO técnico optimizado | 10% |
| Accesibilidad WCAG 2.1 AA | 5% |
| Originalidad en detalles de implementación | 5% |

### Reglas:
- **Stack obligatorio:** Next.js 15 + React + TypeScript + Tailwind CSS
- **Hosting:** Vercel
- **CMS:** Sanity
- **Deploy:** Cada equipo tendrá su propio subdominio de staging o pueden tener su propio dominio en vercel demo:
  - Equipo A: `equipoa.fabricsoft.com.mx`
  - Equipo B: `equipob.fabricsoft.com.mx`
- **Git:** Repositorio separado por equipo, código privado
- **Daily standup:** 11:00 AM con Julio (15 minutos)
- **Demo intermedia:** jueves 21 mayo ante Julio
- **Demo final:** Lunes 25 mayo

---

## 3. POSICIONAMIENTO ESTRATÉGICO

### Categoría
**Oracle Critical Engineering**

### Promesa única
"No entregamos en go-live. Entregamos cuando tu primer ciclo crítico opera en producción."

### Cliente ideal
- CFO + CTO de empresa con revenue USD 50M-500M+
- Industrias: Servicios Financieros, Inmobiliario/Centros Comerciales, Logística

### Enemigo
La implementación Oracle que termina en go-live y abandona al cliente.

### Prioridades comerciales
1. **Rescate de implementaciones Oracle Fusion fallidas** (Prioridad 1)
2. **Migración desde SAP / EBS / JDE / PS a Fusion**
3. **Greenfield Oracle Fusion**

---

## 4. SISTEMA DE DISEÑO (NO NEGOCIABLE)

### Paleta de colores

```css
--bg-base:        #0A0A0A   /* Negro casi puro */
--bg-panel:       #131313   /* Paneles */
--bg-elevated:    #1a1a1a   /* Elementos elevados */
--border:         #252525   /* Bordes sutiles */
--border-strong:  #353535   /* Bordes fuertes */
--text-primary:   #F5F5F5   /* Texto principal */
--text-secondary: #8A8A8A   /* Texto secundario */
--text-tertiary:  #5A5A5A   /* Texto terciario */
--accent:         #C9A96E   /* Champagne / oro envejecido */
--accent-2:       #A07845   /* Bronce */
--danger:         #B85450   /* Para "rechazos" únicamente */
```

### Tipografía

| Uso | Familia | Tamaños |
|---|---|---|
| Titulares grandes | **Cormorant Garamond** (Google Fonts) | 48-88px |
| Subtítulos | Cormorant Garamond | 32-56px |
| Cuerpo de texto | **Inter** (Google Fonts) | 17-18px |
| UI / código / labels | **JetBrains Mono** (Google Fonts) | 11-14px |

### PROHIBIDO en el diseño:
- ❌ Cualquier azul saturado tipo SaaS B2B (#3B82F6, #2563EB, etc.)
- ❌ Verdes o rojos brillantes (excepto rojo apagado #B85450 para "rechazos")
- ❌ Gradientes visibles
- ❌ Glassmorphism o neumorphism
- ❌ Animaciones complejas o parallax
- ❌ Stock photos
- ❌ Iconos genéricos tipo Font Awesome
- ❌ Roboto, Arial, fuentes genéricas
- ❌ Bordes redondeados grandes (max 0-4px)

### Layout
- Grid: 12 columnas, gutter 24-32px
- Max width: 1280px
- Espaciado: múltiplos de 8 (8, 16, 24, 40, 64, 96, 160px)
- Padding vertical secciones: mínimo 160px desktop / 96px mobile
- Mobile breakpoint: 968px

### Movimiento permitido (sutil)
- Fade-in al scroll (200ms ease-out)
- Hover sutil en CTAs (línea cruza 300ms, color shift)
- Pulse muy sutil en indicadores live
- Cero parallax, cero scroll-jacking

---

## 5. ESTRUCTURA DE LA HOME — 16 SECCIONES

Ver la **maqueta HTML adjunta** (`fabricsoft-home-v1-final.html`) como referencia visual definitiva. Esta maqueta es la guía. Refinarla en calidad y detalles. NO reinterpretar conceptualmente.

| # | Sección | Estado V1 |
|---|---|---|
| S01 | Hero con manifiesto | Funcional |
| - | Rescue Counter (cifras de rescates) | Funcional |
| S02 | ERP TCO Comparator (lead magnet) | **FUNCIONAL** |
| S03 | Cloud Cost Comparator (lead magnet) | "Próximamente Q3 2026" |
| S04 | FABRIC AI Migration Consultant | UI estática "Próximamente Q3 2026" |
| S05 | Oracle Fusion Rescue Assessment (lead magnet) | **FUNCIONAL** |
| S06 | Doctrina (5 compromisos) | Funcional |
| - | The Guarantee (banner contractual) | Funcional |
| S07 | Casos Ancla APE Plazas + Aplazo | Funcional |
| S08 | Industrias focales (3) | Funcional |
| S09 | FABRIC OS con FSOs nombrados | Funcional |
| S10 | Lifecycle (5 fases) | Funcional |
| S11 | FABRIC Office Hours (FOMO) | **FUNCIONAL con Calendly** |
| S12 | Referencias Disponibles | Funcional |
| - | Criterios de Evaluación | Funcional |
| S13 | Transparencia Honesta (3 niveles) | Funcional |
| S14 | Investigación (3 papers descargables) | **FUNCIONAL con gating** |
| S15 | Julio + Wait List + Calendario + Founder Line | **FUNCIONAL** |
| S16 | Footer | Funcional |

---

## 6. PÁGINAS INTERNAS

### Páginas a desarrollar completas en V1:

| Ruta | Descripción | Prioridad |
|---|---|---|
| `/` | Home (16 secciones) | **CRÍTICA** |
| `/doctrina` | Las 5 doctrinas expandidas | Alta |
| `/casos` | Listado de casos | Alta |
| `/casos/ape-plazas` | Caso ancla completo (paper) | **CRÍTICA** |
| `/casos/aplazo` | Caso ancla completo | Alta |
| `/industrias` | 3 verticales detallados | Media |
| `/fabric-os` | FABRIC OS y FSOs detallados | Media |
| `/transparencia` | Métricas honestas + metodología | Alta |
| `/modelos` | Modelos de compromiso (Fixed-Price / Success-Fee) | Media |
| `/referencias` | Listado completo de referencias | Alta |
| `/criterios` | Criterios admisión y rechazo | Media |
| `/diagnostico` | Form completo de 12 preguntas | **CRÍTICA** |
| `/comparator/erp` | Wizard de 8 preguntas | **CRÍTICA** |
| `/aplicar` | Wait List form completo | **CRÍTICA** |
| `/office-hours` | Calendly integrado + criterios | Alta |

### Páginas con landing "Próximamente Q3-Q4 2026":

Estas páginas deben existir con diseño premium pero contenido "coming soon":

- `/doctrina/generator` — Doctrine Generator
- `/comparator/cloud` — Cloud Cost Comparator
- `/roadmap` — Migration Roadmap Wizard
- `/benchmark` — FABRIC Benchmark Index
- `/rfp-template` — RFP Template descargable
- `/readiness` — Oracle Readiness Score
- `/post-mortem` — Post-Mortem Privado (servicio pagado)
- `/investigacion` — Papers descargables (con 3 disponibles)
- `/roundtable` — Confidential Roundtable

Cada página "Próximamente" debe:
- Explicar qué es
- Indicar fecha de lanzamiento
- Capturar email para notificación
- Mantener estética premium del resto del sitio

---

## 7. COMPONENTES TÉCNICOS A DESARROLLAR

### 7.1 LEAD MAGNET: Oracle Fusion Rescue Assessment (`/diagnostico`)

**Función:** Form de 12 preguntas para empresas con Oracle Fusion implementado pero con problemas.

**Preguntas obligatorias del wizard:**

1. ¿Hace cuánto está implementado tu Oracle Fusion?
   - Menos de 3 meses / 3-6 meses / 6-12 meses / Más de 1 año

2. ¿Cuántos días toma tu cierre contable mensual actualmente?
   - Menos de 5 / 5-10 / 10-15 / Más de 15

3. ¿Cuántos reportes ejecutivos se generan FUERA del ERP actualmente?
   - 0 / 1-3 / 4-7 / Más de 7

4. ¿Cuál es el % aproximado de usuarios clave que realmente usan el sistema?
   - >90% / 70-90% / 50-70% / <50%

5. ¿Cuántas incidencias críticas tienes abiertas?
   - 0 / 1-3 / 4-7 / Más de 7

6. ¿Cuál es el estado de la consultora que implementó?
   - Sigue activa / Soporte limitado / No responde / No aplica

7. ¿Tienes patrocinio ejecutivo activo del proyecto?
   - CFO + CTO / CFO o CTO / Solo IT / Sin patrocinio

8. ¿Cuál es el módulo con más problemas?
   - Financials / Procurement / SCM / HCM / Reporting

9. Industria
   - Servicios Financieros / Inmobiliario / Logística / Otro

10. Revenue aproximado de tu empresa
    - < USD 50M / 50-250M / 250-500M / > 500M

11. Plazo deseado para remediar la situación
    - Inmediato (<3 meses) / Corto (3-6) / Medio (6-12) / No definido

12. Datos de contacto (todos obligatorios)
    - Nombre completo
    - Cargo (validar C-level)
    - Empresa
    - Email corporativo (validar dominio NO sea gmail/hotmail)
    - Teléfono (opcional)

**Comportamiento esperado:**
- Wizard secuencial, una pregunta por pantalla
- Progress bar visible
- Validación de campo a campo
- Captura en backend (Sanity o base de datos)
- Email automático al usuario confirmando recepción
- Notificación a equipo FABRIC (Slack + email)
- Promesa: respuesta humana en 5 días hábiles
- Score interno calculado automáticamente: bajo/medio/alto/crítico

### 7.2 LEAD MAGNET: ERP TCO Comparator (`/comparator/erp`)

**Función:** Wizard que calcula comparativo TCO entre ERP actual del cliente y Oracle Fusion.

**Preguntas del wizard (8):**

1. ¿Qué ERP usas hoy?
   - SAP S/4 HANA / SAP ECC / Oracle EBS R12 / Oracle JDE / Oracle PeopleSoft / Microsoft Dynamics 365 / NetSuite / Otro

2. Número de usuarios totales del ERP
   - Slider de 10 a 5,000

3. Costo anual aproximado en licencias del ERP actual (USD)
   - Slider de $10,000 a $5,000,000

4. Costo anual aproximado en infraestructura (USD)
   - Slider de $0 a $2,000,000

5. Costo anual aproximado en soporte/consultoría (USD)
   - Slider de $0 a $3,000,000

6. Volumen aproximado de transacciones mensuales
   - <10K / 10K-100K / 100K-1M / >1M

7. Industria
   - Las 3 focales + otras

8. Datos de contacto para análisis personalizado
   - Empresa, Cargo, Email corporativo

**Cálculo en pantalla (live):**

El cálculo debe ejecutarse en tiempo real conforme avanza el wizard. La lógica:

```javascript
// Pseudocódigo del cálculo
const calculateTCO = (data) => {
  const benchmarks = {
    'SAP S/4 HANA':   { savings: 0.30, breakeven: 18 },
    'SAP ECC':        { savings: 0.35, breakeven: 16 },
    'Oracle EBS R12': { savings: 0.25, breakeven: 14 },
    'Oracle JDE':     { savings: 0.20, breakeven: 12 },
    'Oracle PS':      { savings: 0.22, breakeven: 14 },
    'Dynamics 365':   { savings: 0.28, breakeven: 18 },
    'NetSuite':       { savings: 0.15, breakeven: 20 },
    'Otro':           { savings: 0.30, breakeven: 18 }
  };
  
  const totalAnnualCost = data.licenseCost + data.infraCost + data.supportCost;
  const benchmark = benchmarks[data.erp];
  const annualSavings = totalAnnualCost * benchmark.savings;
  
  return {
    currentTCO5y: totalAnnualCost * 5,
    currentTCO10y: totalAnnualCost * 10,
    oracleTCO5y: (totalAnnualCost - annualSavings) * 5,
    oracleTCO10y: (totalAnnualCost - annualSavings) * 10,
    savings5y: annualSavings * 5,
    savings10y: annualSavings * 10,
    breakeven: benchmark.breakeven,
    percentReduction: benchmark.savings * 100
  };
};
```

**Output visual:**
- Tabla comparativa actual vs Oracle Fusion
- Gráfico simple de ahorro acumulado (5 y 10 años)
- CTA principal: "Solicitar análisis con mis datos reales"
- Generación de PDF descargable con los resultados (opcional V1)

### 7.3 WAIT LIST FORM (`/aplicar`)

**Campos obligatorios:**

1. Nombre completo
2. Cargo (dropdown: CFO / CIO / CTO / Director Transformación / CEO / Otro)
3. Empresa
4. Revenue anual aproximado (dropdown con rangos)
5. Industria (las 3 focales + otra)
6. Email corporativo (validación contra gmail/hotmail)
7. Teléfono (opcional)
8. Tipo de iniciativa (Rescate / Migración / Greenfield / Evaluación)
9. Plazo de decisión (1-3m / 3-6m / 6-12m / Sin plazo)
10. Patrocinio ejecutivo confirmado (Sí/Negociando/No)

**Counter dinámico desde CMS:**
- "Proyectos activos: 9"
- "En lista de espera: 7"
- "Próxima ventana: Q3 2026"

Estos números deben ser editables desde Sanity sin tocar código.

### 7.4 OFFICE HOURS BOOKING (`/office-hours`)

**Integración con Calendly o sistema custom:**

- Máximo 4 slots/mes visibles (rolling)
- Validación previa de criterios:
  - Empresa USD 50M+ (declaración del usuario)
  - Cargo C-level
  - Iniciativa Oracle activa
- Si no cumple criterios, redirigir a "Solicitar lugar en Wait List"
- Si cumple, mostrar Calendly inline
- Email de confirmación con preparación pre-meeting

### 7.5 PAPERS DESCARGABLES (`/investigacion`)

**3 papers en V1, sistema de gating:**

- Paper 01: "Por qué fallan los go-live de Oracle Fusion"
- Paper 02: "IA aplicada a cierre contable en Fusion Cloud"
- Paper 03: "Modelo de entrega en primer ciclo crítico"

**Form de descarga:**
- Email corporativo (validar dominio)
- Empresa
- Cargo
- Acepta términos

**Comportamiento:**
- Validación instantánea
- Envío de PDF por email (no descarga directa)
- Tracking de descargas en backend
- Tag automático en CRM

### 7.6 FOUNDER LINE (`/`)

- Email visible: `julio@fabricsoft.com.mx`
- Configurar redirección a inbox de Julio
- Auto-respuesta profesional confirmando recepción
- Validación interna: si email entrante no parece de empresa USD 1M+, redirigir a Wait List

---

## 8. ARQUITECTURA TÉCNICA RECOMENDADA

### Stack obligatorio

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  FRONTEND                                               │
│  ────────                                               │
│  · Next.js 15 (App Router)                              │
│  · React 19                                             │
│  · TypeScript (strict mode)                             │
│  · Tailwind CSS (con design tokens custom)              │
│  · Framer Motion (SOLO para fade-ins sutiles)           │
│                                                         │
│  CMS                                                    │
│  ───                                                    │
│  · Sanity (CMS principal)                               │
│  · Esquemas: Cases, Papers, FSOs, Métricas,             │
│    Industries, Office Hours slots                       │
│                                                         │
│  BACKEND / API                                          │
│  ─────────────                                          │
│  · Next.js API Routes / Server Actions                  │
│  · Validación: Zod                                      │
│  · ORM (si necesario): Prisma o Drizzle                 │
│                                                         │
│  BASE DE DATOS                                          │
│  ─────────────                                          │
│  · Supabase PostgreSQL (gratuito, escalable)            │
│    o Vercel Postgres                                    │
│  · Tablas: leads, applications, paper_downloads,        │
│    diagnostic_responses, comparator_results,            │
│    office_hours_bookings                                │
│                                                         │
│  EMAIL                                                  │
│  ─────                                                  │
│  · Resend.com (transactional emails)                    │
│  · Templates: confirmaciones, follow-ups, notifs        │
│                                                         │
│  HOSTING                                                │
│  ───────                                                │
│  · Vercel (Pro plan)                                    │
│  · Edge Functions para forms                            │
│  · ISR para páginas con contenido CMS                   │
│                                                         │
│  CRM / NOTIFICACIONES                                   │
│  ───────────────────                                    │
│  · HubSpot Free CRM (integración API)                   │
│    Cada lead se crea automáticamente                    │
│  · Webhook a Slack interno FABRIC                       │
│                                                         │
│  CALENDARIO                                             │
│  ─────────                                              │
│  · Calendly embedded (Premium plan)                     │
│  · Webhook para tracking de bookings                    │
│                                                         │
│  ANALYTICS                                              │
│  ─────────                                              │
│  · Plausible Analytics (privacy-first)                  │
│  · NO Google Analytics                                  │
│  · Eventos custom: lead capture, paper download,        │
│    diagnostic completed, etc.                           │
│                                                         │
│  ASSETS / IMÁGENES                                      │
│  ──────────────                                         │
│  · Vercel Image Optimization                            │
│  · Cloudinary para PDFs (papers) o Vercel Blob          │
│                                                         │
│  DOMINIO / DNS                                          │
│  ─────────────                                          │
│  · fabricsoft.com.mx (Julio ya lo tiene)                │
│  · DNS via Cloudflare (gratuito, mejor que GoDaddy)     │
│  · SSL automático Vercel                                │
│                                                         │
│  MONITORING                                             │
│  ──────────                                             │
│  · Sentry (errors tracking)                             │
│  · Vercel Analytics (Web Vitals)                        │
│  · UptimeRobot (uptime monitoring gratuito)             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Estructura de directorios recomendada

```
fabricsoft/
├── app/
│   ├── layout.tsx                  # Root layout con metadata
│   ├── page.tsx                    # Home con 16 secciones
│   ├── globals.css                 # Design tokens + base styles
│   │
│   ├── doctrina/
│   │   ├── page.tsx
│   │   └── generator/page.tsx
│   │
│   ├── casos/
│   │   ├── page.tsx
│   │   ├── ape-plazas/page.tsx
│   │   └── aplazo/page.tsx
│   │
│   ├── industrias/page.tsx
│   ├── fabric-os/page.tsx
│   ├── transparencia/page.tsx
│   ├── modelos/page.tsx
│   ├── referencias/page.tsx
│   ├── criterios/page.tsx
│   │
│   ├── diagnostico/
│   │   ├── page.tsx                # Form de 12 preguntas
│   │   └── components/
│   │
│   ├── comparator/
│   │   ├── erp/page.tsx            # Wizard TCO
│   │   └── cloud/page.tsx          # Próximamente
│   │
│   ├── office-hours/page.tsx
│   ├── investigacion/page.tsx
│   ├── aplicar/page.tsx
│   │
│   └── api/
│       ├── diagnostic/route.ts
│       ├── comparator/route.ts
│       ├── waitlist/route.ts
│       ├── paper-download/route.ts
│       ├── office-hours/route.ts
│       └── founder-line/route.ts
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   └── SectionMarker.tsx       # Solo en dev
│   │
│   ├── sections/
│   │   ├── Hero.tsx                # S01
│   │   ├── RescueCounter.tsx
│   │   ├── ERPComparator.tsx       # S02
│   │   ├── CloudComparator.tsx     # S03
│   │   ├── AIConsultant.tsx        # S04
│   │   ├── RescueAssessment.tsx    # S05
│   │   ├── Doctrina.tsx            # S06
│   │   ├── Guarantee.tsx
│   │   ├── Casos.tsx               # S07
│   │   ├── Industrias.tsx          # S08
│   │   ├── FabricOS.tsx            # S09
│   │   ├── Lifecycle.tsx           # S10
│   │   ├── OfficeHours.tsx         # S11
│   │   ├── References.tsx          # S12
│   │   ├── Criterios.tsx
│   │   ├── Transparency.tsx        # S13
│   │   ├── Research.tsx            # S14
│   │   ├── Founder.tsx             # S15
│   │   └── Footer.tsx              # S16
│   │
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Label.tsx
│   │   ├── TerminalDot.tsx
│   │   └── ...
│   │
│   ├── forms/
│   │   ├── DiagnosticWizard.tsx
│   │   ├── ComparatorWizard.tsx
│   │   ├── WaitListForm.tsx
│   │   └── PaperGate.tsx
│   │
│   └── shared/
│       ├── PreviewCard.tsx
│       └── ...
│
├── lib/
│   ├── sanity.ts                   # Sanity client
│   ├── resend.ts                   # Email client
│   ├── hubspot.ts                  # CRM integration
│   ├── calendly.ts                 # Calendly integration
│   ├── analytics.ts                # Plausible
│   ├── validators.ts               # Zod schemas
│   └── tco-calculator.ts           # Lógica de cálculo TCO
│
├── content/
│   ├── doctrina.json
│   ├── casos/
│   ├── papers/
│   └── industries.json
│
├── public/
│   ├── fonts/                      # Si no usan Google Fonts CDN
│   ├── papers/                     # PDFs descargables
│   └── favicon.ico
│
├── styles/
│   └── design-tokens.css           # Variables CSS
│
├── tailwind.config.ts              # Configuración Tailwind
├── next.config.js
├── tsconfig.json
├── package.json
├── .env.local                      # Variables de entorno
└── README.md                       # Documentación
```

### Variables de entorno requeridas

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@fabricsoft.com.mx
RESEND_REPLY_TO=contacto@fabricsoft.com.mx

# Base de datos
DATABASE_URL=
DIRECT_URL=

# HubSpot
HUBSPOT_API_KEY=

# Calendly
CALENDLY_API_KEY=
CALENDLY_WEBHOOK_SECRET=

# Plausible
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=fabricsoft.com.mx

# Slack notifications
SLACK_WEBHOOK_URL=

# Sentry
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=
```

---

## 9. ESQUEMAS DE SANITY (CMS)

Estructura mínima de schemas:

### `case.ts` (Casos)
```typescript
{
  name: 'case',
  fields: [
    { name: 'title', type: 'string', required: true },
    { name: 'slug', type: 'slug', required: true },
    { name: 'tag', type: 'string' },  // "Caso Ancla · Abril 2026"
    { name: 'subtitle', type: 'text' },
    { name: 'industry', type: 'string' },
    { name: 'metrics', type: 'array', of: [
      { type: 'object', fields: [
        { name: 'label', type: 'string' },
        { name: 'value', type: 'string' },
        { name: 'verified', type: 'boolean' }
      ]}
    ]},
    { name: 'quote', type: 'text' },
    { name: 'fullPaper', type: 'file', accept: 'application/pdf' },
    { name: 'proofOfWork', type: 'array', of: [{ type: 'string' }] },
    { name: 'publishedAt', type: 'datetime' }
  ]
}
```

### `paper.ts` (Papers de investigación)
```typescript
{
  name: 'paper',
  fields: [
    { name: 'number', type: 'string' },  // "01", "02"
    { name: 'tag', type: 'string' },     // "Research Note"
    { name: 'title', type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'pdf', type: 'file', accept: 'application/pdf' },
    { name: 'pages', type: 'number' },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'available', type: 'boolean', initialValue: true }
  ]
}
```

### `fso.ts` (FSOs)
```typescript
{
  name: 'fso',
  fields: [
    { name: 'code', type: 'string' },     // "FSO-01"
    { name: 'name', type: 'string' },     // "Rapid GL Close"
    { name: 'description', type: 'text' },
    { name: 'industry', type: 'string' },
    { name: 'status', type: 'string', options: { list: ['concept', 'building', 'available'] }},
    { name: 'validatedIn', type: 'string' }  // "APE Plazas"
  ]
}
```

### `metrics.ts` (Métricas del Rescue Counter y Transparency)
```typescript
{
  name: 'siteMetrics',
  fields: [
    { name: 'rescueCount', type: 'number' },
    { name: 'hoursSaved', type: 'number' },
    { name: 'reportsEliminated', type: 'number' },
    { name: 'closesStabilized', type: 'number' },
    { name: 'activeProjects', type: 'number' },
    { name: 'waitListCount', type: 'number' },
    { name: 'nextWindow', type: 'string' },  // "Q3 2026"
    { name: 'lastUpdated', type: 'datetime' }
  ]
}
```

### `officeHoursSlot.ts`
```typescript
{
  name: 'officeHoursSlot',
  fields: [
    { name: 'date', type: 'datetime' },
    { name: 'totalSlots', type: 'number', initialValue: 4 },
    { name: 'bookedSlots', type: 'number', initialValue: 0 },
    { name: 'calendlyUrl', type: 'url' }
  ]
}
```

---

## 10. CRITERIOS DE PERFORMANCE OBLIGATORIOS

### Lighthouse scores mínimos:
- **Performance:** 95+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 100

### Core Web Vitals:
- **LCP** (Largest Contentful Paint): < 1.5s
- **FID** (First Input Delay): < 50ms
- **CLS** (Cumulative Layout Shift): < 0.05
- **TTFB** (Time to First Byte): < 200ms

### Optimizaciones obligatorias:
- Fonts vía `next/font` con `display: 'swap'`
- Imágenes via `next/image` con lazy loading
- Static generation donde sea posible
- Edge functions para forms
- Compresión gzip + brotli
- HTTP/3 (automático en Vercel)

---

## 11. SEO Y METADATA

### Meta tags obligatorios por página:

```html
<!-- Home -->
<title>FABRIC · Oracle Critical Engineering · México</title>
<meta name="description" content="No entregamos en go-live. Entregamos cuando tu primer ciclo crítico opera en producción. Boutique Oracle Fusion para empresas USD 50M+.">

<!-- Open Graph -->
<meta property="og:title" content="FABRIC · Oracle Critical Engineering">
<meta property="og:description" content="Rescate de Fusion fallidos. Migración SAP/EBS/JDE a Oracle. Doctrina contractual.">
<meta property="og:image" content="https://fabricsoft.com.mx/og-image.jpg">
<meta property="og:url" content="https://fabricsoft.com.mx">
<meta property="og:type" content="website">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="FABRIC · Oracle Critical Engineering">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="https://fabricsoft.com.mx/twitter-image.jpg">
```

### Open Graph image (1200x630):
- Fondo negro #0A0A0A
- Logo FABRIC en serif grande
- Tagline "Oracle Critical Engineering"
- Acento champagne #C9A96E
- El diseñador debe crear esta imagen

### Sitemap.xml y robots.txt obligatorios.

### Schema.org structured data:

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "FABRIC",
  "description": "Oracle Critical Engineering — Boutique de implementación, rescate y migración Oracle Fusion Cloud",
  "url": "https://fabricsoft.com.mx",
  "logo": "https://fabricsoft.com.mx/logo.png",
  "founder": {
    "@type": "Person",
    "name": "Julio Alvarez"
  },
  "areaServed": ["MX", "US"],
  "knowsAbout": ["Oracle Fusion Cloud", "Oracle EBS", "Oracle JDE", "Oracle PeopleSoft", "ERP Implementation", "ERP Migration"]
}
```

---

## 12. SEGURIDAD Y CUMPLIMIENTO

### Obligatorio:
- HTTPS forzado (Vercel automático)
- Headers de seguridad (CSP, HSTS, X-Frame-Options)
- Rate limiting en forms (anti-bot)
- Validación server-side de todos los forms (Zod)
- Sanitización de inputs
- CAPTCHA invisible (Turnstile de Cloudflare) en forms
- GDPR / LFPDPPP compliance:
  - Aviso de privacidad accesible desde footer
  - Consentimiento explícito en forms
  - No tracking sin consentimiento (Plausible no requiere, pero docs sí)

### Anti-spam para forms:
- Honeypot field
- Time-based validation (no submits en <2 segundos)
- Email domain validation (no gmail, hotmail, yahoo)
- Rate limit por IP

---

## 13. EMAILS TRANSACCIONALES (RESEND)

### Templates a desarrollar:

#### 1. Confirmación de Diagnóstico recibido
```
Asunto: Hemos recibido tu solicitud de diagnóstico · FABRIC

Hola [nombre],

Hemos recibido tu solicitud de diagnóstico de proyecto Oracle Fusion.

Un consultor senior de FABRIC revisará tu caso y te contactará en 
los próximos 5 días hábiles con:

· Patrones de fracaso identificados
· Estimación de complejidad de rescate
· Plan de remediación accionable
· Costos y plazos estimados

Para acceder a referencias antes de la conversación, considera 
nuestro programa de Office Hours: fabricsoft.com.mx/office-hours

Julio Alvarez
Founder · FABRIC
Oracle Critical Engineering
```

#### 2. Confirmación de Wait List
#### 3. Confirmación de descarga de paper
#### 4. Confirmación de Office Hours booking
#### 5. Notificación interna a equipo FABRIC (cada lead)

Todos los templates deben mantener tono Atelier: directo, sin emojis, sin exclamaciones.

---

## 14. CRONOGRAMA DE EJECUCIÓN (8 DÍAS)

### Día 1 — Lunes 18 mayo
**Kick-off · 9:00 AM**
- Reunión inicial con Julio (1 hora)
- Cada equipo recibe brief + maqueta + acceso a repositorio
- Setup proyecto Next.js
- Setup Vercel + dominio staging
- Setup Sanity proyect
- Setup Supabase database
- Confirmar stack y dependencias

**Entregable día 1:**
- Repo creado con boilerplate
- Vercel staging URL funcional
- Sanity Studio accesible

### Día 2 — Martes 19 mayo
- Diseño de sistema en código (design tokens, tipografía, componentes base)
- Estructura de páginas
- Componentes UI base (Button, Label, etc.)

**Entregable día 2:**
- Sistema de diseño implementado
- 3 componentes UI reutilizables funcionando

### Día 3 — Miércoles 20 mayo
- Home: S01 Hero + Rescue Counter + S02 ERP Comparator
- Layout general + Nav + Footer
- Schemas Sanity completos

**Entregable día 3:**
- Hero funcional
- ERP Comparator wizard funcional (mínimo 50%)
- Nav y Footer

### Día 4 — Jueves 21 mayo
- Home: S03 Cloud Comparator + S04 AI Consultant + S05 Rescue Assessment + S06 Doctrina
- Rescue Assessment form funcional
- Integración Resend para emails

**Entregable día 4:**
- 6 secciones de Home funcionales
- Diagnostic form enviando emails

### Día 5 — Viernes 22 mayo · 🔴 DEMO INTERMEDIA
**Demo 4:00 PM con Julio**
- Home: S07 Casos + S08 Industrias + S09 FABRIC OS + S10 Lifecycle
- Páginas internas /casos/ape-plazas iniciada
- Feedback de Julio incorporado

**Entregable día 5:**
- 10 secciones de Home funcionales
- Demo en vivo de lead magnets

### Día 6 — Sábado 23 mayo
- Home: S11 Office Hours + S12 Referencias + Criterios + S13 Transparencia
- Integración Calendly
- Páginas internas: /doctrina, /casos, /industrias, /transparencia

**Entregable día 6:**
- 13 secciones de Home funcionales
- 4 páginas internas funcionales

### Día 7 — Domingo 24 mayo
- Home: S14 Investigación + S15 Julio + Wait List + Founder Line + S16 Footer
- Páginas /aplicar, /office-hours, /referencias completas
- Sistema de papers con gating

**Entregable día 7:**
- Home completa 100%
- 7 páginas internas funcionales

### Día 8 — Lunes 25 mayo
- Páginas "Próximamente"
- Mobile responsive impecable
- QA cross-browser
- Performance optimization
- SEO técnico (sitemap, robots, schemas)

**Entregable día 8:**
- Sitio completo en staging
- Lighthouse 95+ en todas las páginas
- Mobile testing OK

**Demo 4:00 PM con Julio**
- Cada equipo presenta su sitio (30 minutos)
- QA cruzado entre equipos
- Julio toma notas para evaluación

**Entregable día 8:**
- Sitio listo para producción
- Documentación técnica completa
- Video walkthrough de 5 min

- Julio anuncia equipo ganador (mediodía)
- Equipo ganador hace ajustes finales
- Setup DNS final fabricsoft.com.mx → Vercel
- Pre-launch checklist

- Activación pública
- Publicación caso APE Plazas
- Post LinkedIn de Julio

---

## 15. CHECKLIST DE GO-LIVE (PRE-LAUNCH)

### Funcional
- [ ] Todas las 16 secciones de home funcionan
- [ ] Todas las páginas internas accesibles
- [ ] Form de Diagnóstico enviando emails
- [ ] ERP Comparator calculando correctamente
- [ ] Wait List form capturando leads
- [ ] Calendly integration funcionando
- [ ] Papers descargables con gating
- [ ] Founder line email funcional
- [ ] Todos los enlaces internos funcionan
- [ ] No hay 404s

### Performance
- [ ] Lighthouse Performance: 95+
- [ ] Lighthouse Accessibility: 95+
- [ ] Lighthouse Best Practices: 95+
- [ ] Lighthouse SEO: 100
- [ ] LCP < 1.5s
- [ ] CLS < 0.05

### SEO
- [ ] Meta tags en todas las páginas
- [ ] Open Graph image creada y configurada
- [ ] Sitemap.xml generado
- [ ] Robots.txt configurado
- [ ] Schema.org structured data
- [ ] Canonical URLs

### Mobile
- [ ] Responsive en iPhone (Safari)
- [ ] Responsive en Android (Chrome)
- [ ] Tablet (iPad)
- [ ] Touch targets 44px+
- [ ] No horizontal scroll

### Cross-browser
- [ ] Chrome (Mac/Windows)
- [ ] Safari (Mac/iOS)
- [ ] Firefox
- [ ] Edge

### Seguridad
- [ ] HTTPS forzado
- [ ] Headers de seguridad configurados
- [ ] Rate limiting en forms
- [ ] CAPTCHA invisible activo
- [ ] No keys expuestas en cliente
- [ ] Aviso de privacidad accesible

### Analytics
- [ ] Plausible Analytics configurado
- [ ] Eventos custom tracking
- [ ] Sentry capturando errores
- [ ] UptimeRobot monitoring

### Email
- [ ] Resend configurado
- [ ] Templates revisados por Julio
- [ ] DKIM/SPF configurados
- [ ] Test emails enviados

### CMS
- [ ] Sanity Studio accesible
- [ ] Schemas funcionando
- [ ] Contenido inicial cargado:
  - 2 casos (APE Plazas + Aplazo)
  - 3 papers
  - 6 FSOs
  - 3 industrias
  - Métricas del Rescue Counter
  - Slots de Office Hours
- [ ] Documentación de uso para Julio

### Legal
- [ ] Aviso de privacidad publicado
- [ ] Términos y condiciones
- [ ] Cookie consent (si aplica)
- [ ] Cumplimiento LFPDPPP

### DNS y dominio
- [ ] fabricsoft.com.mx apuntando a Vercel
- [ ] SSL activo
- [ ] www redirect configurado
- [ ] Email MX records (Resend)

### Backup
- [ ] Git repo en producción
- [ ] Backup de base de datos configurado
- [ ] Vercel deploy preview funcionando

---

## 16. ENTREGABLES FINALES DEL EQUIPO GANADOR

1. **Código fuente completo en Git**
   - Repository privado en GitHub/GitLab
   - README.md con setup instructions
   - .env.example con todas las variables
   - Branches: main, develop

2. **Documentación técnica**
   - Arquitectura del sistema
   - Decisiones técnicas tomadas
   - Guía de mantenimiento
   - Cómo agregar/editar contenido en Sanity
   - Cómo deploy a producción

3. **Acceso a todos los servicios**
   - Vercel (con Julio como admin)
   - Sanity (con Julio como admin)
   - Supabase (con Julio como admin)
   - Resend (con Julio como admin)
   - HubSpot (configurado)
   - Plausible (configurado)
   - Sentry (configurado)
   - Cloudflare DNS (configurado)
   - Calendly (configurado)

4. **Video walkthrough**
   - 10-15 minutos
   - Tour de la página
   - Explicación de componentes clave
   - Cómo editar contenido en Sanity

5. **Handover meeting**
   - 1 hora con Julio
   - Q&A
   - Capacitación básica

---

## 17. COMPONENTES OBLIGATORIOS DEL SITIO

Lista exhaustiva de componentes que debe tener el sitio:

### Layout
- [x] Navigation bar con scroll behavior
- [x] Footer con 4 columnas + bottom bar
- [x] Mobile menu (hamburger)
- [x] Skip-to-content link (accesibilidad)

### Hero (S01)
- [x] Label superior
- [x] Titular principal (H1)
- [x] Sub-manifiesto (3 párrafos)
- [x] Tags de prioridades
- [x] 2 CTAs (primary + secondary)
- [x] Scroll indicator

### Rescue Counter
- [x] Label
- [x] Número grande (02)
- [x] 3 sub-métricas
- [x] Disclaimer

### Lead Magnets (S02, S03, S05)
- [x] Container con borde acentuado
- [x] Grid 2 columnas (texto + preview)
- [x] Lista de features
- [x] Preview card con datos mock
- [x] CTA primario
- [x] Meta info

### AI Consultant (S04)
- [x] Terminal header con dots
- [x] Status indicator (live)
- [x] Cuerpo terminal con líneas
- [x] Scenarios chips clicables
- [x] CTA

### Doctrina (S06)
- [x] Header centrado
- [x] 5 items numerados
- [x] Hover effect (padding shift)
- [x] Validation badges

### The Guarantee
- [x] Banner con borde acentuado
- [x] Quote grande
- [x] Source attribution

### Casos (S07)
- [x] Grid 2 columnas
- [x] Caso card con tag, título, subtitle
- [x] Tabla de datos verificables
- [x] Quote
- [x] 2 CTAs por caso

### Industrias (S08)
- [x] Grid 3 columnas
- [x] Border separators
- [x] Hover effect

### FABRIC OS (S09)
- [x] Diagrama de 4 capas
- [x] Hover effects con border slide
- [x] Lista de 6 FSOs en grid

### Lifecycle (S10)
- [x] Flow horizontal de 5 pasos
- [x] Highlight de "Stabilize"
- [x] Badge "La diferencia FABRIC"

### Office Hours (S11)
- [x] Box con corner accents
- [x] Grid criterios + fechas
- [x] Date slots con disponibilidad
- [x] CTA primario

### Referencias (S12)
- [x] Lista numerada
- [x] Status indicator
- [x] Hover effect

### Criterios
- [x] Grid 2 columnas (admit/reject)
- [x] Border acentuado por bloque
- [x] Listas con marks

### Transparencia (S13)
- [x] Grid 3 columnas
- [x] Bloques con label, title, content
- [x] Quote en tercer bloque

### Investigación (S14)
- [x] Grid 3 papers
- [x] Banner de Benchmark Index

### Founder + Wait List (S15)
- [x] Grid foto + bio
- [x] Wait List box con stats
- [x] Calendario de admisión
- [x] Founder Line con email destacado

### Footer (S16)
- [x] Logo + tagline
- [x] Contact info
- [x] 4 columnas de links
- [x] Bottom bar con copyright

---

## 18. PUNTOS DE CONTACTO DURANTE EL DESARROLLO

### Julio Alvarez (decisión final)
- **Email:** julio.alvarez@fabricsoft.com.mx
- **WhatsApp:** 5554356244
- **Disponibilidad:** 11-12 AM y 5-6 PM hábiles

### Daily standups
- **Hora:** 11:00 AM
- **Duración:** 15 minutos
- **Formato:** Slack call o Google Meet
- **Asistentes:** Julio + Equipo A + Equipo B + Agustin

### Acceso a recursos
Julio compartirá en privado:
- Acceso a Sanity (claves de proyecto)
- Acceso a Vercel
- Diseños finales en Figma (si los hay)
- Logo FABRIC en SVG/PNG
- Foto editorial de Julio (post-sesión)
- Papers de Investigación en PDF
- Casos completos de APE Plazas y Aplazo

---

## 19. ARCHIVOS ADJUNTOS

Este brief viene acompañado de:

1. **`fabricsoft-home-v1-final.html`** — Maqueta HTML completa con las 16 secciones. Esta es la GUÍA VISUAL DEFINITIVA. Refinar y mejorar, NO reinterpretar.

2. **Logo FABRIC** — Pendiente entrega por Julio.

3. **Foto editorial de Julio** — Pendiente sesión.

4. **3 Papers en PDF** — Pendiente producción.

---

## 20. NOTA FINAL DE JULIO

Equipos,

Esto no es construir un sitio web. Es construir el primer activo público de marca de FABRIC. La página debe transmitir que somos la firma de Oracle Critical Engineering más seria de México y LATAM. Cada detalle importa: cada pixel, cada microinteracción, cada línea de copy.

**No quiero un sitio bonito. Quiero un sitio que un CFO de empresa USD 500M vea y diga "estos son los que necesito".**

Que gane el mejor equipo. El sitio será su carta de presentación profesional.

Cualquier duda, conmigo directo. Sin filtros, sin política, sin esperar.

A construir.

Julio Alvarez
Founder · FABRIC SOFT MEXICO
