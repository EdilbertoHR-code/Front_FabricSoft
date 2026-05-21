# Contexto de sesión — Tibor
> Para cuando retomes en otra laptop. Dale este archivo a Claude Code (o a quien sea) para que entienda exactamente en qué punto quedamos.

**Fecha de la sesión:** 21 mayo 2026  
**Rama:** `main`  
**Repo:** https://github.com/Tiboryeah/FabricSoftPage

---

## Qué es el proyecto

**FabriSoft** — sitio web de FABRIC, firma de Oracle Critical Engineering en México. Estética premium editorial tipo Bain / Anthropic / Linear: negro profundo, tipografía serif+mono, dorado champagne. El compañero se llama Edilberto.

**Stack:** Vite + React 19 + TypeScript + Tailwind CSS v4 + React Router v7 + Clerk (auth) + Framer Motion + Sonner

---

## División de trabajo

| Secciones | Quién | Archivos |
|---|---|---|
| Hero, Rescue Counter, Calculadora TCO | **Edilberto** | `parte1.home.tsx`, `Parte2.home.tsx`, `parte4.home.tsx` |
| S07–S15 (Casos → Founder) | **Tú (Tibor)** | `s07-casos.tsx` … `s15-founder.tsx` |
| Header, Footer, Interacciones, Router | Compartido | `headerPublic.tsx`, `footerPublic.tsx`, `InteractionManager.tsx`, `AppRouter.tsx` |

Tus secciones (S07-S15) son la referencia visual del proyecto. Las de Edilberto tienen que verse igual.

---

## Lo que se hizo en esta sesión

### 1. Unificación visual de las secciones de Edilberto

Las secciones de Edilberto usaban:
- Color incorrecto `#D4AF37` en vez de `#C9A96E` (el dorado del maquetado)
- Textos cálidos `#F5E6A3`, `#F8F5EA`, `#D8D0BB` en vez de `#F5F5F5` / `#8A8A8A`
- `rounded-xl`, `rounded-[28px]`, `rounded-full` en tarjetas y paneles (debe ser sin border-radius)
- Glassmorphism (`bg-white/[0.025]`, `backdrop-blur-xl`) en secciones principales
- `font-black` en headings (debe ser `font-light` o `font-normal`)

**Archivos modificados:** `parte1.home.tsx`, `parte4.home.tsx`, `src/index.css`

**Solución:** Edición directa de valores + overrides CSS en `index.css` usando selectores sin capa para ganar en la cascada.

> **Nota:** El Edit tool de Claude Code a veces introduce comillas tipográficas Unicode (`"` U+201D) en los atributos `className`. Esto causa un error de Babel: `Unexpected character '"'`. El fix es correr este PowerShell:
> ```powershell
> $f = "ruta\archivo.tsx"
> $c = [IO.File]::ReadAllText($f, [Text.Encoding]::UTF8)
> $c = $c.Replace([char]0x201C, [char]0x22).Replace([char]0x201D, [char]0x22)
> [IO.File]::WriteAllText($f, $c, [Text.Encoding]::UTF8)
> ```

---

### 2. Integración de los cambios v3/v4 de Edilberto

Edilberto subió dos commits nuevos a `feature/fabric_edilberto`:
- `feature/edilberto_v3` — Reescribió `parte3.home.tsx` (calculadora TCO con ScrollReveal + Sonner)
- `feature/edilberto_v4` — Reescribió `parte4.home.tsx` (calculadora TCO v2, más limpia, sin Sonner)

**Decisión tomada:** Las dos eran la misma calculadora. Se integró `parte4` (la mejor) y se eliminó `parte3` del render de `home.tsx`. `parte3.home.tsx` sigue existiendo en disco pero no se importa.

**Comando usado:**
```bash
git checkout origin/feature/fabric_edilberto -- src/pages/public/home/parte3.home.tsx src/pages/public/home/parte4.home.tsx
```

---

### 3. Fix del layout de parte4 (calculadora)

La calculadora se veía mal: contenido comprimido a la izquierda, fondo cuadriculado diferente al resto.

**Causas:**
- El grid de 2 columnas (`1.06fr 0.94fr`) metía heading + CTA en la mitad izquierda
- `bg-grid-pattern` visible que S07-S15 no tienen
- La sección no usaba el mismo padding que S07-S15

**Solución:** Se restructuró `parte4` para usar el sistema editorial del maquetado:
- La sección ahora usa `className="demo-section s03"` y `<div className="container">`
- Intro (label + h2 + párrafo + CTA) a ancho completo
- Feature cards en grid de 4 columnas (igual que S08 industries)
- Se agregaron `.s03`, `.s03-intro`, `.s03-features` en `maquetado-dossier.css`

---

### 4. Fix del bug de cascada CSS (el más importante)

**El problema raíz** de que parte1 y parte2 se veían sin padding (contenido pegado al borde izquierdo):

`maquetado-dossier.css` tenía:
```css
* { margin: 0; padding: 0; box-sizing: border-box; }
```

Este CSS es **sin capa** (unlayered). En CSS Cascade Level 5, el CSS sin capa tiene **mayor prioridad que cualquier `@layer`**, independientemente de especificidad. Tailwind v4 pone sus utilidades en `@layer utilities`, que es capa = menor prioridad.

Consecuencia: `px-6`, `py-24`, `p-3.5` de Tailwind en las secciones de Edilberto → todos sobrescritos a `padding: 0`. Las secciones S07-S15 no se afectaban porque su padding está también en CSS sin capa (`.demo-section { padding: 110px 56px }`).

**Fix en `maquetado-dossier.css` línea 5:**
```css
/* ANTES */
* { margin: 0; padding: 0; box-sizing: border-box; }

/* DESPUÉS */
* { box-sizing: border-box; }
.demo-section *, .demo-section *::before, .demo-section *::after { margin: 0; padding: 0; }
```

El reset de margin/padding ahora solo aplica dentro de `.demo-section` (donde viven S07-S15). Las secciones de Edilberto recuperaron sus paddings de Tailwind.

---

### 5. Fix de los tamaños de h2/h3/h4

`maquetado-dossier.css` también tenía reglas globales de font-size para headings:
```css
h3 { font-size: clamp(28px, 3vw, 36px); }
```

Por el mismo problema de cascada, esto sobreescribía las clases de Tailwind como `text-[11px]` en `h3` elements. En parte4, las FeatureCard tenían `<h3 className="text-[11px]">` pero se renderizaban a 28-36px.

**Fix en `maquetado-dossier.css`:**
```css
/* Antes: globales */
h2 { font-size: clamp(36px, 4.5vw, 56px); }
h3 { font-size: clamp(28px, 3vw, 36px); }
h4 { font-size: 22px; }

/* Después: solo dentro de .demo-section */
.demo-section h2 { font-size: clamp(36px, 4.5vw, 56px); }
.demo-section h3 { font-size: clamp(28px, 3vw, 36px); }
.demo-section h4 { font-size: 22px; }
```

**Además:** en el `FeatureCard` de parte4, el `<h3>` se cambió a `<p>` para evitar que la regla de `.demo-section h3` le aplique (parte4 usa `demo-section`).

---

### 6. Documento de contexto para Edilberto

Se creó `CONTEXTO_EDILBERTO.md` en la raíz del repo. Es la guía que Edilberto le da a GPT al empezar a trabajar. Cubre design system, reglas, cómo estructurar secciones, y qué no hacer.

---

## Estado actual del proyecto

### Página renderizada (en orden)
```
Header
├── parte1  → Hero + Globe animado (Edilberto)
├── Parte2  → Rescue Counter métricas (Edilberto)
├── parte4  → Calculadora TCO ERP (Edilberto) — usa demo-section/s03
├── s07     → Casos APE Plazas + Aplazo (Tibor)
├── s08     → 3 Industrias focales (Tibor)
├── s09     → FABRIC OS (Tibor)
├── s10     → Lifecycle 5 fases (Tibor)
├── s11     → Office Hours + calendario (Tibor)
├── s12     → Referencias (Tibor)
├── ----    → Criterios de evaluación (Tibor)
├── s13     → Transparencia (Tibor)
├── s14     → Papers / Investigación (Tibor)
└── s15     → Founder + Wait List (Tibor)
InteractionManager (modales I01-I07)
Footer
```

### Archivos CSS
```
src/index.css               ← Tokens del design system + overrides pre-dossier
src/maquetado-dossier.css   ← CSS base de S07-S15 + s03
src/maquetado-interacciones.css ← CSS de modales
```

### Rutas activas (`AppRouter.tsx`)
- `/` → Home (todas las secciones)
- `/casos/:slug` → CasoPage (detalle de caso individual)
- `/sign-in` y `/sign-up` → Clerk auth

---

## Qué falta / posibles próximos pasos

- [ ] Parte3 existe en disco (`parte3.home.tsx`) pero no se renderiza. Si Edilberto quiere recuperarla con contenido diferente (por ejemplo el Rescue Assessment original que tenía antes), se puede hacer. Si no, se puede borrar.
- [ ] Revisar parte1 y parte2 visualmente ahora que el bug de cascada CSS está corregido — con el fix, los paddings deberían estar correctos
- [ ] La sección de la calculadora (`parte4`) está integrada al sistema editorial pero puede tener ajustes finos de diseño pendientes
- [ ] Hay interacciones I01-I07 en `InteractionManager.tsx` — revisar que siguen funcionando con los cambios de layout

---

## Comandos para arrancar

```bash
# Clonar si es laptop nueva
git clone https://github.com/Tiboryeah/FabricSoftPage.git
cd FabricSoftPage

# Instalar dependencias
pnpm install

# Dev server
pnpm dev   # http://localhost:5173

# Check TypeScript
npx tsc --noEmit
```

---

## Variables de entorno necesarias

El proyecto usa Clerk para autenticación. Necesitas un `.env.local` con:
```
VITE_CLERK_PUBLISHABLE_KEY=pk_...
```
Sin esto, la app carga pero las rutas `/sign-in` y `/sign-up` no funcionan. El resto del sitio sí.
