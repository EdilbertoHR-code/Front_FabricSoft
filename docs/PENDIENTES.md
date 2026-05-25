# PENDIENTES — FabriSoft · Brief2

Última actualización: 25 mayo 2026

---

## ❌ FUNCIONALIDAD FALTANTE

### 1. `/optimizador-oci` — Auditoría OCI gratuita
**Estado:** ~~Falta~~ ✅ YA IMPLEMENTADO
- Página: `src/pages/public/optimizador-oci/OptimizadorOciPage.tsx`
- Backend: modelo, controlador, rutas, email
- Admin: `src/pages/admin/AdminOciAudit.tsx`
- Ruta pública en AppRouter: `/optimizador-oci`
- Ruta admin en AppRouter: `/admin/oci-audit`

---

### 2. ~~Hero CTA apunta a `/contacto` — ruta inexistente~~ ✅ RESUELTO
- Primer CTA: `/contacto` → `/aplicar`
- Segundo CTA: `/#fabric-ai` → `/optimizador-oci`

---

### 3. Rescue Assessment — falta selección de escenario inicial
**Archivo:** `src/pages/public/home/s07b-rescue-assessment.tsx`
**Problema:** El quiz actual es genérico (12 preguntas de síntomas). Brief2 pide 3 chips de escenario al inicio para personalizar el diagnóstico:
- **Fusion fallando** — proyecto activo con problemas críticos
- **Migrando** — en proceso de migración Oracle
- **Greenfield** — implementación nueva desde cero
**Fix requerido:** Agregar pantalla previa con los 3 chips. El escenario seleccionado debe condicionar el contexto del diagnóstico (puede ser solo visual/label, o filtrar preguntas relevantes).

---

## ⚠️ NAMING — archivos con nombre que no refleja su función

> Los archivos están bien implementados. Solo el nombre confunde al leerlos.

| Archivo actual | Función real | Nombre correcto |
|---|---|---|
| `s02-optimizador.tsx` | Contador de métricas de impacto | `s02-metricas-impacto.tsx` |
| `s03-tco-calculator.tsx` | ERP TCO Comparator | `s03-erp-tco-comparator.tsx` |
| `s04-tco-waitlist.tsx` | Cloud Cost Comparator | `s04-cloud-cost-comparator.tsx` |
| `s06b-fixed-price.tsx` | Animación canvas (visualización) | `s06b-fixed-price-visual.tsx` |

> ⚠️ Renombrar implica actualizar el import en `src/pages/public/home/home.tsx`.
> No es urgente para el deadline — es limpieza de código.

---

## 📋 RESUMEN DE PRIORIDAD

| # | Tarea | Urgencia |
|---|---|---|
| 1 | Fix Hero CTA `/contacto` → `/aplicar` | 🔴 Alta — genera 404 en producción |
| 2 | Rescue Assessment — 3 chips de escenario | 🟡 Media — funcional pero incompleto vs Brief2 |
| 3 | Renombrar archivos s02/s03/s04/s06b | 🟢 Baja — cosmético, no afecta funcionalidad |
