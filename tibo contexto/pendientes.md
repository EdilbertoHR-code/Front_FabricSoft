---
name: Pendientes del proyecto
description: Backlog priorizado de tareas pendientes conocidas al 2026-05-26
type: project
---

## CRÍTICO — Bugs que rompen funcionalidad en prod

### 1. Bug 404 silencioso en herramientas (otras 4)
Las siguientes páginas aún llaman `api.post('/leads', { tipo: '...', datos: ... })` que no existe en el backend. Los formularios fallan silenciosamente en producción:
- `/readiness` → `ReadinessScorePage.tsx`
- `/rfp-template` → `RFPTemplatePage.tsx`
- `/benchmark` → `BenchmarkIndexPage.tsx`
- `/office-hours` → `OfficeHoursPage.tsx`

**Fix necesario por herramienta:**
1. Backend: añadir `exports.solicitarX` en `leads.controller.js` + ruta en `leads.component.js`
2. Frontend: cambiar `api.post('/leads', ...)` → `api.post('/leads/readiness-score', ...)` etc.
3. Modelo: añadir subdocumento en `model.lead.js` si necesario
4. Admin: crear página admin para cada una (o confirmar si ya existe)

---

## MEDIO — Features prometidas sin implementar

### 2. PDF real en RFP Template y Benchmark Index
Ambas páginas prometen "enviar PDF por email" pero `Backend/assets/` no tiene archivos PDF reales. Opciones:
- Subir PDFs reales a `Backend/assets/` y configurar nodemailer para adjuntarlos
- O cambiar copy a "te contactaremos" si los PDFs no existen aún

### 3. Revisión de páginas del footer vs Brief2
No se auditaron aún contra el brief. Páginas pendientes de revisar:
- `/post-mortem`
- `/roundtable`
- `/rechazados`
- `/transparencia`
- `/optimizador-oci`
- `/modelos`

---

## BAJO — Mejoras deseables

### 4. Validación de email corporativo en todas las herramientas
Solo `MigrationRoadmapPage` tiene la validación. Las demás herramientas deberían tener el mismo bloqueo de emails públicos (gmail, hotmail, etc.)

### 5. roadmap-preview.html en raíz del repo
Archivo de desarrollo, no debe estar en la raíz del proyecto. Borrar o mover a `/dev-tools/` antes del próximo deploy.

---

## Completado en esta sesión ✓
- [x] /roadmap — reescritura completa según Brief2
- [x] Backend: endpoint `POST /leads/migration-roadmap` + modelo + controller
- [x] Admin panel: `AdminMigrationRoadmap.tsx` + nav + router
- [x] PDF descargable via window.print() con @media print CSS
