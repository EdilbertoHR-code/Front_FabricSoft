---
name: Contexto del proyecto Chamba
description: Stack, estructura y convenciones del proyecto FABRIC
type: project
---

**Qué es:** App web para FABRIC — consultora de implementaciones Oracle Fusion. Tiene páginas públicas (herramientas, casos, investigación, legal) y panel de admin protegido con Clerk.

**Stack:**
- Frontend: React + TypeScript + Vite, React Router, Clerk (auth), Tailwind + CSS vars custom (dark theme: #050505 bg, #C9A96E accent dorado)
- Backend: Node.js + Express + Mongoose (MongoDB), Clerk SDK para auth de rutas admin
- Tipografía: Playfair Display (serif), JetBrains Mono (mono), Inter (sans)

**Estructura de rutas backend:**
- `Backend/components/` — routers Express
- `Backend/controllers/` — lógica de negocio
- `Backend/models/` — esquemas Mongoose
- `Backend/services/` — servicios compartidos (log, email, etc.)

**Estructura frontend:**
- `src/pages/public/` — páginas públicas por sección
- `src/pages/admin/` — panel admin (protegido)
- `src/layouts/` — PublicLayout + AdminLayout
- `src/routers/AppRouter.tsx` — enrutador principal con lazy loading
- `src/config/api.ts` — instancia axios con baseURL

**Patrón admin:** Todas las páginas admin siguen el mismo patrón — tabla filtrable + slide-out de detalle + botones de pipeline status + notas. Ver AdminRescueAssessment o AdminOciAudit como referencia.

**Brief de referencia:** `docs/brief2.md` — especificación funcional de todas las herramientas y páginas.

**Why:** FABRIC trabaja con empresas que migran ERP legacy (SAP, Oracle EBS) a Oracle Fusion. Las herramientas del sitio generan leads calificados.
