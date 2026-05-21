# SESSION CONTEXT — FabriSoft Frontend
Actualizado: 2026-05-20 · Sesion 2 completada

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
- Parallax, scroll-jacking, animaciones > 400ms
- `border-radius` > 4px en componentes

### Microinteracciones Aprobadas

- Scroll reveal: opacity 0→1, translateY 24px→0, 200ms ease-out, stagger 80ms
- Counter animado (Rescue Counter): 0 al valor en 800ms al entrar en viewport
- Hover CTAs: linea champagne de izquierda a derecha en 300ms con `::after`
- Typing cursor terminal IA: typewriter 30ms/char + cursor blink CSS
- Navbar: transparente → opaca en 200ms despues de 80px scroll
- Pulse del agente IA OPERATIONAL: escala 1 → 1.05 → 1, loop 2s

---

## 4. Arquitectura de Componentes (Objetivo Final)

```
fabricsoft/ (frontend/)
├── app/
│   ├── page.tsx               # Home — S01 a S16
│   ├── layout.tsx             # Root layout, metadata y fuentes
│   ├── globals.css            # Variables CSS + overrides mobile S07-S15
│   ├── maquetado-dossier.css  # CSS completo del dossier (NO EDITAR — fuente de verdad)
│   ├── maquetado-interacciones.css
│   ├── casos/                 # Paginas internas de casos
│   ├── diagnostico/page.tsx   # Rescue Assessment wizard (12 preguntas)
│   ├── comparator/erp/page.tsx # TCO Comparator wizard (8 pasos)
│   ├── aplicar/page.tsx       # Wait List form (10 campos)
│   ├── office-hours/page.tsx  # Calendly + gate de validacion
│   ├── admin/                 # Panel privado con Clerk
│   └── api/                   # Endpoints, Server Actions y agente IA
├── components/
│   ├── layout/
│   │   ├── header.tsx         [PLACEHOLDER]
│   │   └── footer.tsx         [PLACEHOLDER]
│   ├── sections/              [COMPLETADO S07-S15 — fiel al maquetado desktop+mobile]
│   │   ├── s07-casos.tsx
│   │   ├── s08-industrias.tsx
│   │   ├── s09-fabric-os.tsx
│   │   ├── s10-lifecycle.tsx
│   │   ├── s11-office-hours.tsx
│   │   ├── s12-referencias.tsx
│   │   ├── criterios-evaluacion.tsx
│   │   ├── s13-transparencia.tsx
│   │   ├── s14-investigacion.tsx
│   │   └── s15-founder.tsx
│   ├── interactions/          [PENDIENTE — overlays I01-I08]
│   └── forms/                 [PENDIENTE]
│       ├── DiagnosticWizard   (12 preguntas con score)
│       ├── ComparatorWizard   (8 pasos TCO)
│       └── WaitListForm       (10 campos)
└── middleware.ts               # Proteccion de /admin/*
```

---

## 5. Estado Actual — Lo Que Esta Hecho

### Completado (build limpio, TypeScript sin errores)

| Archivo | Estado | Notas sesion 2 |
|---------|--------|----------------|
| `app/layout.tsx` | Fuentes configuradas | — |
| `app/globals.css` | Design tokens + mobile overrides S07-S15 | Agregados en sesion 2 |
| `app/page.tsx` | Importa y ordena S07-S15 | — |
| `components/layout/header.tsx` | Placeholder elegante | — |
| `components/layout/footer.tsx` | Placeholder | — |
| `components/sections/s07-casos.tsx` | APE Plazas + Aplazo | Mobile: border-top acento, metricas 2 cols, CTAs columna |
| `components/sections/s08-industrias.tsx` | 3 verticales | Mobile: monograma 40px |
| `components/sections/s09-fabric-os.tsx` | Capas OS + FSOs | Acentos corregidos en sesion 2 |
| `components/sections/s10-lifecycle.tsx` | Timeline desktop + mobile | Mobile: timeline vertical con spine, nodos izquierda, Stabilize destacado |
| `components/sections/s11-office-hours.tsx` | Criterios + calendario | Mobile: heading "Con el fundador.", parrafo compacto, CTA dentro del calendario |
| `components/sections/s12-referencias.tsx` | Tabla C-level + CTAs | Acentos corregidos en sesion 2 |
| `components/sections/criterios-evaluacion.tsx` | Grid admision/exclusion | Acentos corregidos en sesion 2 |
| `components/sections/s13-transparencia.tsx` | Tres bloques con verified | Reescritura completa sesion 2: datos correctos, clase `verified`, tags correctos |
| `components/sections/s14-investigacion.tsx` | Fichas de papers | Acentos + em dash corregidos en sesion 2 |
| `components/sections/s15-founder.tsx` | Perfil Julio + waitlist + Founder Line | Acentos + em dash corregidos en sesion 2 |
| `public/julio_alvarez.png` | Retrato B&W generado | — |

### Que se corrigio en sesion 2 (vs maquetado)

1. **S13 Transparencia** — contenido estaba incorrecto:
   - Items del bloque "Hoy" ahora son texto directo (no titulo+small embebido)
   - `meta verified` en todos los items del bloque "Hoy" (clase CSS que los pone en dorado con checkmark)
   - Tags correctos: `"Hoy · 2026"` / `"Q4 · 2026"` / `"Compromiso"`
   - Methodology notes correctas por bloque (antes estaban intercambiadas)
   - Atribucion `— Doctrina FABRIC` en bloque Compromiso
   - Nota `Vinculacion contractual` en bloque Compromiso

2. **Acentos/tildes** restaurados en S09, S10, S11, S12, S14, S15, Criterios

3. **Flechas y em dashes**: `->` → `→`, `<-` → `←`, `- Julio` → `— Julio`, `: no formulario` → `— no formulario`

4. **Mobile layouts** implementados como el maquetado (version mobile del dossier):
   - S10: timeline vertical con `.s10-desktop` / `.s10-mobile` + clases CSS en globals.css
   - S11: headings intercambiables `.s11-heading-desktop` / `.s11-heading-mobile`
   - S07: `.caso-metric` en 2 columnas, CTAs en columna full-width
   - S08: `.industry-monogram` 40x40px en mobile

### Clases CSS mobile agregadas en globals.css (al final del archivo)

```css
/* Clases de visibilidad */
.s10-desktop { display: block; }
.s10-mobile  { display: none; }
.s11-heading-mobile, .s11-para-mobile, .s11-cta-mobile { display: none; }
.s11-heading-desktop, .s11-para-desktop, .s11-cta-desktop { display: block; }

/* Clases del timeline mobile S10 */
.s10-mobile-inner, .s10-mobile-spine, .s10-mobile-step
.s10-mobile-node, .s10-mobile-entry-badge, .s10-mobile-num
.s10-mobile-name, .s10-mobile-deliverable

@media (max-width: 968px) {
  /* S07: caso-card border-top, caso-metric 2cols, CTAs columna */
  /* S08: industry-monogram 40x40 */
  /* S10: .s10-desktop hide, .s10-mobile show */
  /* S11: swap headings/paragraphs, show CTA inside calendar */
}
```

### Pendiente (Proximas Tareas)

| Prioridad | Tarea | Notas |
|-----------|-------|-------|
| **CRITICO** | Secciones S01-S06 | Hero, Rescue Counter, TCO Widget, AI Terminal, Rescue Assessment CTA, Doctrina |
| **CRITICO** | Interactions I01-I08 | Overlays que abren desde CTAs (ya conectados con `data-interaction`) |
| ALTA | `/diagnostico` - Rescue Assessment Wizard | 12 preguntas, score automatico, filtro email corporativo |
| ALTA | `/comparator/erp` - TCO Comparator | 8 pasos, sliders, calculo TCO en browser |
| ALTA | `/aplicar` - Wait List Form | 10 campos, Server Action, filtro revenue < USD 50M |
| ALTA | `/office-hours` | Gate por cargo/revenue, Calendly inline |
| ALTA | Deploy en Vercel | Staging: equipoa.fabricsoft.com.mx |
| MEDIA | `/admin/*` | Clerk auth, tabla de leads, metricas, capacidad |
| MEDIA | `api/ai` | Agente Oracle con RAG, Kill Switch, fallback multi-modelo |
| BAJA | Paginas internas | `/casos`, `/doctrina`, `/industrias`, `/fabric-os` |

---

## 6. Logica de los Wizards (de maquetado/js/)

### Rescue Assessment (`/diagnostico`) — 11 preguntas + contacto

Preguntas y scores:
1. Tiempo implementado Oracle Fusion → [1,2,3,4]
2. Dias de cierre contable → [0,1,2,4]
3. Reportes fuera del ERP → [0,1,2,4]
4. % usuarios que usan el sistema → [0,1,2,4]
5. Incidencias criticas abiertas → [0,1,2,4]
6. Estado de la consultora → [0,1,3,0]
7. Patrocinio ejecutivo activo → [0,1,2,4]
8. Modulo con mas problemas → [3,2,2,1]
9. Industria (sin score, solo datos)
10. Revenue aproximado (sin score, filtro)
11. Plazo para remediar → [4,2,1,0]

Niveles de resultado:
- Score >= 20 → CRITICO · 8-12 semanas · USD 150-300K
- Score >= 12 → ALTO · 12-20 semanas · USD 80-200K
- Score >= 6 → MEDIO · 8-16 semanas · USD 50-150K
- Score < 6 → BAJO · 4-8 semanas · USD 30-80K

Filtro email: rechaza gmail, hotmail, yahoo, outlook, live, icloud, msn.

### ERP TCO Comparator (`/comparator/erp`) — 8 pasos

1. ERP actual (SAP S/4 HANA, SAP ECC, Oracle EBS R12, Oracle JDE, Oracle PeopleSoft, Dynamics 365, NetSuite, Otro)
2. Numero de usuarios (slider 10-5000, default 150)
3. Costo anual licencias USD (slider 10K-5M, default 200K)
4. Costo anual infraestructura USD (slider 0-2M, default 80K)
5. Costo anual soporte/consultoria USD (slider 0-3M, default 120K)
6. Volumen mensual transacciones (<10K, 10K-100K, 100K-1M, >1M)
7. Industria (4 opciones)
8. Datos de contacto (filtro email corporativo)

Calculo TCO: SAP S4=30%, SAP ECC=35%, Oracle EBS=25%, etc.
Preview en tiempo real desde paso 5. Resultado: tabla comparativa + ahorro a 10 anos + breakeven.

### AI Terminal (S04)

3 escenarios pre-definidos:
- "Mi Fusion esta fallando" → diagnostico Post Go-Live Abandonment
- "Migracion SAP/EBS a Fusion" → guia migracion ECC → Fusion
- "Greenfield Oracle" → stack recomendado para empresa sin ERP

### Interactions I01-I08 (overlays desde CTAs)

| CTA (seccion) | data-interaction | Interaction |
|---|---|---|
| "Leer caso completo" (S07) | — | I01 — APE Plazas caso completo |
| "Proof of Work" (S07) | `proof` | I02 — Documentacion verificable (NDA) |
| "Explorar FABRIC OS" (S09) | `fabric-os` | I03 — FABRIC OS pagina interna |
| "Reservar conversacion" (S11) | `office-hours` | I04 — Calendly / Office Hours booking |
| Cualquier referencia (S12) | `reference` | I05 — Formulario contactar referencia |
| "Descargar paper" (S14) | `paper` | I06 — Gating form paper PDF |
| "Solicitar lugar" (S15) | `waitlist` | I07 — Wait List wizard (10 pasos) |
| Diagnostico (nav/hero) | — | I08 — Rescue Assessment (6 pasos) |

Los CTAs en los componentes ya tienen el atributo `data-interaction` correcto.
Las interactions estan en `components/interactions/` (PENDIENTE de implementar).

---

## 7. Reglas de Negocio Criticas

- **Filtro de emails:** rechaza gmail, hotmail, yahoo, outlook, icloud, live, msn — TANTO cliente como servidor
- **Filtro revenue:** < USD 50M no se registra como lead calificado, se redirige a Wait List sin mensaje explicito de rechazo
- **Capacidad maxima:** 12 proyectos simultaneos (configurable desde admin). Al llegar al limite, todos los CTAs cambian a "Lista de Espera"
- **Office Hours:** maximo 4 slots mensuales configurables. Solo visible el Calendly si pasa criterios de cargo y revenue
- **Panel admin:** solo accesible con correos @fabricsoft.com.mx + 2FA via Clerk
- **Metricas:** prohibido hardcodear NPS, SLA o casos. Se inyectan desde Sanity/MongoDB via ISR
- **Agente IA:** Kill Switch ante consultas fuera de Oracle. Fallback: Claude → OpenAI → Grok

---

## 8. Estrategia de Render por Pagina

| Pagina | Estrategia |
|--------|-----------|
| `/` | Static Generation |
| `/casos/ape-plazas`, `/transparencia` | ISR revalidate 3600s |
| `/diagnostico`, `/comparator/erp` | Client-side (wizard interactivo) |
| `/aplicar`, `/office-hours` | Static + Server Action |
| `/admin/*` | Server-side + Clerk middleware |
| Paginas Proximamente | Static Generation |

---

## 9. Metricas de Rendimiento Objetivo

| Metrica | Umbral | Herramienta |
|---------|--------|-------------|
| Lighthouse Performance | 95+ | Lighthouse CI + Vercel Analytics |
| Lighthouse Accessibility | 95+ | Lighthouse CI |
| Lighthouse SEO | 100 | Lighthouse CI |
| LCP | < 1.5s | Web Vitals |
| CLS | < 0.05 | Web Vitals |
| TTFB | < 200ms | Vercel Edge |
| FID | < 50ms | Web Vitals |

---

## 10. Archivos Clave de Referencia

| Archivo | Ubicacion | Descripcion |
|---------|-----------|-------------|
| `Maquetas Secciones v1.html` | `maquetado/zip_extracted/` | Dossier S07-S15: desktop + mobile iphone + memoria de diseno |
| `Maquetas Interacciones v1.html` | `maquetado/zip_extracted/` | Interacciones I01-I08 con logica de overlays |
| `maquetado-dossier.css` | `frontend/app/` | CSS fuente de verdad (NO editar — importado en globals.css) |
| `fabricsoft-maquetado.html` | `maquetado/` | Maqueta interactiva completa unificada |
| `fabricsoft-home-v1-final.html` | `maquetado/zip_extracted/uploads/` | Home S01-S06 de referencia |
| `rescue-wizard.js` | `maquetado/js/` | Logica Rescue Assessment (11 preguntas + scores) |
| `erp-wizard.js` | `maquetado/js/` | Logica TCO Comparator (8 pasos + calculo) |
| `ai-terminal.js` | `maquetado/js/` | Respuestas pre-definidas del agente terminal |

---

## 11. Convenciones de Codigo

- TypeScript strict, sin `any` implicitos
- Validacion Zod server-side en todos los endpoints y Server Actions
- Sin emojis en ningun archivo
- `border-radius` maximo 4px en cualquier componente
- Animaciones maximo 400ms
- Nombres de archivos en kebab-case, componentes React en PascalCase
- CSS responsivo mobile: breakpoint `@media (max-width: 968px)` — NO usar Tailwind md: para estas secciones (ya usa clases del dossier)
- Acentos y tildes obligatorios en todo el contenido en espanol

---

## 12. Proxima Sesion — Por Donde Continuar

**Paso critico: implementar S01-S06** (el hero y herramientas interactivas que generan los leads).

### Orden sugerido S01-S06

1. **`s01-hero.tsx`** — Hero principal
   - Headline principal en Cormorant Garamond
   - Rescue Counter animado (numero de implementaciones fallidas, counter desde 0)
   - CTA primario → `/diagnostico` (data-interaction="rescue")
   - CTA secundario → Office Hours

2. **`s02-tco.tsx`** — ERP TCO Comparator widget
   - CTA que abre el wizard TCO (data-interaction="erp" o navega a `/comparator/erp`)
   - Puede ser una preview de la calculadora inline

3. **`s03-cloud.tsx`** — Cloud Cost (confirmar contenido con maqueta)

4. **`s04-ai-terminal.tsx`** — Agente IA Oracle terminal
   - Los 3 chips disparan respuestas con typewriter
   - Ver logica en `maquetado/js/ai-terminal.js`

5. **`s05-rescue.tsx`** — Rescue Assessment CTA

6. **`s06-doctrina.tsx`** — Los 5 principios FABRIC (Doctrina)

### Luego: interactions overlay (I01-I08)
- Crear `components/interactions/InteractionHandler.tsx` — cliente component que escucha `data-interaction` clicks
- Implementar cada overlay por ID segun `Maquetas Interacciones v1.html`

### Luego: paginas wizard
- `/diagnostico` — Rescue Assessment (11 preguntas + score + email)
- `/comparator/erp` — TCO (8 pasos + calculo)
- `/aplicar` — Wait List (10 campos + filtro revenue)

---

## 13. Contacto CEO

- Julio Alvarez, Founder · FABRIC
- WhatsApp: 5554356244
- Daily standup: 11:00 AM
- Demo intermedia: jueves 21 mayo 4:00 PM
- Demo final: lunes 25 mayo

---
*Fin del contexto de sesion — actualizado 2026-05-20 sesion 2*
