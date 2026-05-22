# Contexto de sesión — Tibor
> Actualizado: 21 mayo 2026. Dáselo a Claude Code al retomar.
> Repo: https://github.com/Tiboryeah/FabricSoftPage · Rama: main

---

## Stack y estructura del proyecto

```
/
├── src/          ← Frontend Vite + React 19 (LA app activa, puerto 5173)
├── backend/      ← API Express scaffolding (estructura lista, sin implementar)
├── public/       ← Assets estáticos
├── docs/         ← Documentación (Brief2.md, ESTRUCTURA_HOME_FINAL.md, este archivo)
└── design/       ← Maquetas HTML/CSS de referencia
```

**Comandos:**
```bash
pnpm dev          # Frontend → http://localhost:5173
npx tsc --noEmit  # Verificar TypeScript (sin output = OK)
```

---

## Estado actual de la página

### Rutas activas
| Ruta | Estado |
|---|---|
| `/` | Home con 19 secciones |
| `/casos/:slug` | APE Plazas + Aplazo |
| `/aplicar` | ✅ Wizard 5 pasos (NUEVO esta sesión) |
| `/transparencia` | ✅ Página completa (NUEVA esta sesión) |
| `/admin/*` | Panel admin (Clerk, en memoria) |

### Secciones del home (en orden)
```
s01-hero → s02-optimizador → s03-tco-calculator → s04-tco-waitlist →
chatIa → s05-analisis-fallas → s06-doctrina → s06b-fixed-price →
s07-casos → s07b-rescue-assessment → s08-industrias → s09-fabric-os →
s10-lifecycle → s11-office-hours → s12-referencias → s12b-criterios →
s13-transparencia → s14-investigacion → s15-founder
```

### Navegación lateral (13 puntos — SectionNavigator)
```
01 Hero · 02 TCO Comparator · 03 FABRIC AI · 04 Diagnóstico ·
05 Doctrina · 06 Casos · 07 Industrias · 08 FABRIC OS ·
09 Lifecycle · 10 Office Hours · 11 Investigación ·
12 Transparencia · 13 Founder · Wait List
```
+ Menú hamburguesa agrega: Transparencia → /transparencia · Aplicar → /aplicar

---

## Lo que se hizo esta sesión

- ✅ Página `/aplicar` — wizard 5 pasos con validación email corporativo, criterios de admisión
- ✅ Página `/transparencia` — 3 niveles según brief: métricas, compromisos, equipo
- ✅ Sección `/aplicar` conectada desde footer, header nav y s15 (botón "Solicitar lugar")
- ✅ SectionNavigator reducido a 13 puntos (antes 19)
- ✅ Footer reorganizado según brief — eliminadas redundancias, Papers 01/02/03 individuales
- ✅ Comillas decorativas del manifiesto del Founder corregidas (ya no chocan con el texto)
- ✅ Logo reemplazado por `fabricsoft_sin_fondo.png` con scale(3.2) en header
- ✅ Rescue Assessment: layout 2 columnas (pregunta izq / respuestas der) + tipografía serif
- ✅ Nota NDA en casos (s07) separada del status badge — ya no se superponen
- ✅ `frontend/` (Next.js sin uso) eliminado del repo
- ✅ Estructura reorganizada: `design/`, `docs/`, `backend/` scaffolding

---

## Pendientes por prioridad

### 🔴 CRÍTICOS — sin esto el sitio no convierte

#### 1. FABRIC AI Diagnostic — conectar API real
**Qué hay:** UI funcional con 3 escenarios hardcodeados en `src/pages/public/chat/chatIa.tsx`
**Qué falta:** Llamada real a Anthropic API (Claude Sonnet 4.6)
**Cómo:** El scaffolding está en `backend/src/routes/` — necesita endpoint `/api/ai`
**Brief dice:** Claude Sonnet 4.6, temp 0.3, scope Oracle estricto, Kill Switch, RAG, disclaimer obligatorio
**System prompt:** Ya está completo en `docs/Brief2.md` sección "System Prompt V1.0" — copiar directo
**Variables de entorno necesarias:** `ANTHROPIC_API_KEY`, `VITE_API_URL`

#### 2. Gating real en Papers (s14 Investigación)
**Qué hay:** UI de 3 papers con botón "Reservar lugar" que va a #aplicar
**Qué falta:** Form de gating (email corporativo + cargo + empresa), PDFs reales, entrega por email
**Brief dice:** descarga directa deshabilitada, PDF llega por Resend como adjunto
**Para V1 mínimo:** form de captura + PDF placeholder + confirmación visual

#### 3. Office Hours — integración Calendly
**Qué hay:** Calendario UI con slots hardcodeados en `s11-office-hours.tsx`
**Qué falta:** URL real de Calendly de Julio + gate de calificación (solo C-level + revenue 50M+)
**Brief dice:** si no pasa el gate → redirect silencioso a /aplicar sin mensaje de rechazo

---

### 🟡 ALTOS — completan el brief V1

#### 4. Doctrine Generator (`/doctrina/generator`)
**Brief:** Completo. 6 preguntas → PDF "Cláusulas Oracle que tu contrato debería incluir"
**Preguntas a definir con Julio** (el brief da el concepto, no las preguntas exactas)
**Flujo:** wizard 6 pasos → genera PDF → captura email → entrega

#### 5. Proyectos evaluados / Rechazados
**Brief:** Completo. Registro público de proyectos rechazados con razón (sin nombre de empresa)
**Ruta sugerida:** `/evaluados` o `/criterios/evaluados`
**Datos:** Julio debe proveer los registros reales anonimizados
**Formato:** tabla con trimestre, sector, revenue, razón de rechazo

#### 6. Audit Trail APE Plazas (`/casos/ape-plazas/audit-trail`)
**Brief:** Timeline público: go-live 06 abril → cierre contable 30 abril → transición firmada
**Qué necesita:** autorización formal de APE Plazas (Julio gestiona) + datos verificables

#### 7. PDFs de los 3 Papers (gating)
**Brief:** Outlines completos en `docs/Brief2.md` secciones "Paper 01", "Paper 02", "Paper 03"
**Producción:** Julio escribe/valida → diseño en Figma/InDesign → PDF
**Gating frontend:** Ya planificado (ver pendiente #2 arriba)

---

### 🟢 MEDIOS — herramientas futuras (brief las llama V1.5)

#### 8. Migration Roadmap (`/herramientas/roadmap`)
**Brief:** 12 preguntas → PDF plan 30-60-90-180 días
**Preguntas:** Brief da concepto, no las preguntas exactas (Julio define)

#### 9. Readiness Score (`/herramientas/readiness`)
**Brief:** 15 preguntas → score 0-100 + recomendaciones por nivel
**Preguntas:** Brief da concepto, Julio define

#### 10. RFP Template Oracle
**Brief:** PDF con 47 preguntas para evaluar implementadores Oracle
**Producción:** Julio escribe las 47 preguntas → PDF

#### 11. Benchmark Index 2026
**Brief:** Reporte anual "Estado de implementaciones Oracle Fusion LATAM"
**Producción:** Julio escribe con datos reales → PDF con gating

---

### ⚪ BAJOS — servicios premium y legal

- **Post-Mortem Privado** — landing page, precio USD 25,000, brief tiene concepto
- **Confidential Roundtable** — landing, invitación selectiva, brief tiene concepto
- **Research Letters** — newsletter quincenal, brief solo lo menciona
- **Términos de uso / Privacidad** — páginas legales, sin spec en el brief
- **Doctrina de no alineación** — solo nombrada, sin desarrollo

---

## Cosas que necesitan a Julio (no son de código)

| Item | Qué necesita Julio |
|---|---|
| Foto editorial | Sesión fotográfica (ver brief fotográfico en `docs/Brief2.md`) |
| Proyectos evaluados | Datos reales anonimizados de rechazos |
| Audit Trail APE Plazas | Autorización del cliente + documentos |
| Papers 01/02/03 | Escribir y validar contenido (outlines en Brief2.md) |
| API key Anthropic | Para conectar FABRIC AI Diagnostic |
| URL Calendly | Para Office Hours real |
| Preguntas Roadmap/Readiness | Brief da concepto pero no las preguntas exactas |

---

## Notas técnicas importantes

### CSS Cascade — el bug más importante del proyecto
`maquetado-dossier.css` es CSS sin capa (unlayered). En CSS Cascade Level 5,
el CSS unlayered tiene MAYOR prioridad que `@layer` de Tailwind.
**Solución aplicada:** `h2/h3/h4` font-size scopeados a `.demo-section`,
y `margin/padding: 0` scopeado a `.demo-section *`.
Si algo no tiene el padding esperado con clases Tailwind → agregar `id` y usar `.demo-section`.

### Edit tool introduce comillas tipográficas
Cuando el Edit tool escribe `className="..."`, a veces introduce comillas U+201D en vez de ASCII.
**Fix:** PowerShell:
```powershell
$f = "ruta\archivo.tsx"
$c = [IO.File]::ReadAllText($f, [Text.Encoding]::UTF8)
$c = $c.Replace([char]0x201C, [char]0x22).Replace([char]0x201D, [char]0x22)
[IO.File]::WriteAllText($f, $c, [Text.Encoding]::UTF8)
```

### Secciones del compañero (Edilberto)
Edilberto trabaja en `s01` al `s06b` + `chatIa`. Si subes cambios a `main`
y él baja, que use `git checkout main && git pull` desde rama nueva.
Ver `CONTEXTO_EDILBERTO.md` (ya no está en la raíz, lo eliminó Edilberto).

### Backend scaffolding
`backend/` tiene estructura Express lista:
- `src/routes/leads.ts`, `metricas.ts`, `officeHours.ts`
- `src/middleware/auth.ts` (API key)
- `src/models/types.ts` (tipos en sync con frontend store)
Para correr: `cd backend && pnpm install && pnpm dev` → puerto 3001
