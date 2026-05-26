---
name: Sesión Migration Roadmap — implementación completa
description: Todo lo que se construyó en la sesión del Migration Roadmap (Brief2 gap analysis + backend + admin + PDF)
type: project
---

**Sesión:** 2026-05-26 — implementación completa de /roadmap según Brief2.

## Gap analysis detectado vs Brief2
1. Q4 era "revenue" → debía ser **geografía de operación** (afecta scoring)
2. Q6 era "mayor preocupación" → debía ser **compliance requirements** (afecta scoring)
3. Output no tenía roadmap por fases ni recursos ni quick wins
4. No había backend dedicado — todas las herramientas llamaban `POST /api/leads` que no existe (404 silencioso)
5. No había admin panel para ver submissions
6. No había PDF descargable

## Archivos modificados / creados

### Backend
- `Backend/models/model.lead.js` — añadido subdocumento `migrationRoadmap` con 14 campos
- `Backend/controllers/leads.controller.js` — añadido `exports.solicitarMigrationRoadmap` (línea ~379)
- `Backend/components/leads.component.js` — añadida ruta `POST /migration-roadmap`

### Frontend
- `src/pages/public/herramientas/MigrationRoadmapPage.tsx` — reescritura completa:
  - 12 preguntas correctas (geografía + compliance)
  - `calcularRiesgo()` → BAJO(≥13pts) / MEDIO(≥7pts) / ALTO(<7pts)
  - Output: 4 fases con hitos, recursos, quick wins
  - API call → `POST /leads/migration-roadmap`
  - PDF via `window.print()` + `@media print` CSS con `#roadmap-pdf`
- `src/pages/admin/AdminMigrationRoadmap.tsx` — nuevo archivo, mismo patrón que AdminRescueAssessment
- `src/routers/AppRouter.tsx` — import + ruta `/admin/migration-roadmap`
- `src/layouts/admin/adminLayaout.tsx` — nav item "Migration Roadmap" con icono GitBranch

## Scoring de riesgo
max 15pts: patrocinio(2) + presupuesto(2) + datos(2) + equipo(2) + integraciones(2) + experiencia(1) + geografía(2) + compliance(2)
- BAJO ≥13 → 4–8 meses
- MEDIO ≥7  → 6–12 meses
- ALTO  <7  → 8–18 meses

**Why:** El brief requería output estructurado con fases 30-60-90-180 días para que el lead reciba valor real antes de contactar a FABRIC.
