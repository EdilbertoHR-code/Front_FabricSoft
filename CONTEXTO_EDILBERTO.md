# Contexto de sesión — FabriSoft · Para Edilberto

> Dáselo a GPT antes de empezar a codear. Explica el estado actual del proyecto, las reglas que hay que seguir, y por qué.

---

## El proyecto

**FabriSoft** es el sitio web de FABRIC, una firma de implementación Oracle Fusion. El objetivo es un sitio premium estilo editorial — piensa en Bain, Sequoia, Linear o Anthropic. **Dark, minimalista, tipografía serif+mono, paleta dorada.**

- **Stack:** Vite + React 19 + TypeScript + Tailwind CSS v4
- **Repo local:** `c:\Users\USER\.gemini\antigravity\scratch\Chamba`
- **Rama principal:** `main`

---

## Estructura de archivos relevante

```
src/
├── index.css                        ← CSS global + tokens del design system
├── maquetado-dossier.css            ← CSS base de las secciones S07-S15
├── maquetado-interacciones.css      ← CSS de modales e interacciones
├── pages/public/home/
│   ├── home.tsx                     ← Composición de la página (orden de secciones)
│   │
│   ├── parte1.home.tsx              ← EDILBERTO: Hero + Globe
│   ├── Parte2.home.tsx              ← EDILBERTO: Rescue Counter (métricas animadas)
│   ├── parte4.home.tsx              ← EDILBERTO: Calculadora TCO ERP (S03)
│   │
│   ├── s07-casos.tsx                ← Tibor: Casos de éxito
│   ├── s08-industrias.tsx           ← Tibor: Industrias focales
│   ├── s09-fabric-os.tsx            ← Tibor: FABRIC OS
│   ├── s10-lifecycle.tsx            ← Tibor: Lifecycle operativo
│   ├── s11-office-hours.tsx         ← Tibor: Office Hours + calendario
│   ├── s12-referencias.tsx          ← Tibor: Referencias
│   ├── criterios-evaluacion.tsx     ← Tibor: Criterios de admisión
│   ├── s13-transparencia.tsx        ← Tibor: Transparencia
│   ├── s14-investigacion.tsx        ← Tibor: Papers
│   └── s15-founder.tsx             ← Tibor: Founder + Wait List
└── components/
    └── InteractionManager.tsx       ← Modales I01-I07 (interacciones globales)
```

---

## Design system — REGLAS NO NEGOCIABLES

### Paleta de colores

Usa siempre estas variables CSS. **No uses hex hardcodeados distintos a estos.**

| Variable Tailwind | Variable CSS | Valor | Uso |
|---|---|---|---|
| `bg-bg-base` | `var(--bg-base)` | `#0A0A0A` | Fondo principal |
| `bg-bg-panel` | `var(--bg-panel)` | `#131313` | Paneles, tarjetas |
| `bg-bg-elevated` | `var(--bg-elevated)` | `#1A1A1A` | Elementos elevados |
| `text-text-primary` | `var(--text-primary)` | `#F5F5F5` | Texto principal |
| `text-text-secondary` | `var(--text-secondary)` | `#8A8A8A` | Texto secundario |
| `text-text-tertiary` | `var(--text-tertiary)` | `#5A5A5A` | Texto terciario |
| `text-accent` | `var(--accent)` | `#C9A96E` | Dorado champagne (principal) |
| `bg-accent-soft` | `var(--accent-soft)` | `rgba(201,169,110,0.08)` | Fondo suave dorado |
| `border-border` | `var(--border)` | `#252525` | Bordes sutiles |
| `border-border-strong` | `var(--border-strong)` | `#353535` | Bordes fuertes |
| `text-danger` | `var(--danger)` | `#B85450` | Errores/rechazos |

**El dorado correcto es `#C9A96E`. Si ves `#D4AF37` o `#F5E6A3` en código existente, son valores incorrectos — cámbialos.**

### Tipografía

Hay tres fuentes. Úsalas como clases Tailwind:

| Clase Tailwind | Font | Uso |
|---|---|---|
| `font-display` o `font-serif` | Cormorant Garamond | Títulos h1-h4, headings editoriales |
| `font-body` o `font-sans` | Inter | Cuerpo, párrafos |
| `font-technical` o `font-mono` | JetBrains Mono | Labels, badges, UI, código, datos |

Reglas de tipografía:
- Los headings editoriales son **Cormorant + `font-light` o `font-normal`** (no `font-black` ni `font-bold`)
- Los labels técnicos son **JetBrains Mono + `uppercase tracking-[0.18em]`**
- No uses `font-black` para headings h1-h4

### Geometría

- **Cero bordes redondeados** en contenedores, tarjetas, botones. Usa `rounded-none` si necesitas explicitarlo. Solo `rounded-full` en elementos decorativos muy pequeños (dots, avatares, orbes de blur).
- No glassmorphism (`backdrop-blur`) fuera de modales y elementos flotantes.
- No `box-shadow` en tarjetas — solo `border: 1px solid var(--border)`.

---

## Arquitectura CSS — MUY IMPORTANTE

### Dos sistemas de CSS coexisten en el proyecto

**Sistema 1 — Secciones del maquetado (S07-S15, Tibor):**
- Usan clases CSS propias definidas en `maquetado-dossier.css`
- Estructura obligatoria:
  ```tsx
  <section id="s07" className="demo-section s07">
    <div className="demo-section-marker">S07 · Título</div>
    <div className="container">
      {/* contenido */}
    </div>
  </section>
  ```
- `.demo-section` da `padding: 110px 56px` automáticamente
- `.container` da `max-width: 1280px; margin: 0 auto`
- Los `h2`, `h3`, `h4` dentro de `.demo-section` reciben font-size automático del CSS base

**Sistema 2 — Secciones de Edilberto (parte1, Parte2, parte4):**
- Usan clases de Tailwind directamente
- Pueden usar Framer Motion, IntersectionObserver, Sonner, etc.
- **NO usan** `.demo-section` a menos que sea intencional (parte4 sí la usa)

### La regla de cascada más importante

`maquetado-dossier.css` tiene CSS **sin capa** (unlayered). El CSS sin capa tiene **mayor prioridad** que los `@layer` de Tailwind en CSS Cascade Level 5. Esto tiene consecuencias:

**✅ Sí funciona en las secciones de Edilberto:**
- Clases de Tailwind para padding: `px-6`, `py-24`, `p-4`, `pt-8`, etc.
- Clases de Tailwind para colores: `bg-bg-base`, `text-accent`, `border-border`, etc.
- Clases de Tailwind para tipografía: `font-display`, `text-[11px]`, `leading-relaxed`, etc.

**⚠️ Cuidado con `h1-h4` dentro de `.demo-section`:**
- Si usas un `h3` DENTRO de `.demo-section`, recibe automáticamente `font-size: clamp(28px, 3vw, 36px)`. Esto puede sobreescribir tu clase `text-[11px]`.
- Si necesitas un heading semántico pequeño (11px, 13px) DENTRO de `.demo-section`, usa `<p>` o `<div>` en lugar de `<h3>/<h4>`.
- Fuera de `.demo-section` (tus secciones), esto NO pasa — `text-[11px]` funciona normal en `h3`.

---

## Cómo estructurar una sección nueva de Edilberto

### Opción A: Estilo propio con Tailwind (parte1, Parte2 style)

```tsx
export default function MiSeccion() {
  return (
    <section className="relative overflow-hidden bg-bg-base px-6 py-24 md:px-14 md:py-28">
      {/* Fondo opcional — sin bg-grid-pattern (se ve diferente al resto) */}
      
      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* Tu contenido con Tailwind */}
      </div>
    </section>
  );
}
```

### Opción B: Integrada al sistema editorial (parte4 style)

```tsx
export default function MiSeccion() {
  return (
    <section id="s03" className="demo-section s03">
      <div className="demo-section-marker">S03 · Nombre Sección</div>
      <div className="container">
        
        {/* Intro - igual que S07-S15 */}
        <div className="s03-intro">
          <div className="label">Label · Subsección</div>
          <h2>Título principal de la sección</h2>
          <p>Descripción breve.</p>
        </div>

        {/* Tu contenido interactivo */}

      </div>
    </section>
  );
}
```

**Recomendación: usa la Opción B.** Garantiza padding, max-width, y tipografía consistente con S07-S15 sin esfuerzo adicional.

---

## Lo que NO debes hacer

### ❌ No uses estos colores hardcodeados

```tsx
// MAL — colores incorrectos o hardcodeados
className="text-[#D4AF37]"     // dorado incorrecto
className="text-[#F5E6A3]"     // crema incorrecto  
className="bg-white/[0.025]"   // glassmorphism
className="bg-[#0B0B09]/88"    // variante incorrecta de negro

// BIEN
className="text-accent"
className="text-text-primary"
className="bg-bg-panel"
className="bg-bg-base"
```

### ❌ No uses bordes redondeados en contenedores

```tsx
// MAL
className="rounded-xl"
className="rounded-[28px]"
className="rounded-full"       // (en tarjetas, modales, paneles)

// BIEN — sin border-radius o rounded-none
className="rounded-none"
```

### ❌ No pongas glassmorphism en secciones principales

```tsx
// MAL en una section o card principal
className="backdrop-blur-xl bg-white/10"

// BIEN — solo en modales flotantes y overlays
className="backdrop-blur-md"   // solo si es un modal/fixed overlay
```

### ❌ No uses font-black en headings

```tsx
// MAL
<h2 className="font-black text-[#F8F5EA]">Título</h2>

// BIEN
<h2 className="font-light text-text-primary">Título</h2>
// o
<h2 className="font-display font-normal">Título</h2>
```

### ❌ No crees dos secciones que hagan lo mismo

Actualmente `parte3.home.tsx` existe en disco pero **NO se renderiza** (fue removido de `home.tsx` porque era un duplicado de `parte4.home.tsx`). No lo re-agregues a `home.tsx` a menos que tenga contenido diferente.

---

## Componentes y utilidades disponibles

### Clases CSS listas para usar (de `index.css`)

```css
.label          /* Badge mono uppercase dorado — para etiquetas de sección */
.cta            /* Link con línea animada — para CTAs de texto */
.btn-primary    /* Botón dorado sólido */
.btn-secondary  /* Botón con borde */
.fabric-panel   /* Panel oscuro con borde */
.fabric-elevated/* Panel más elevado */
.eyebrow        /* Texto mono pequeño gris — subtítulo de sección */
.bg-grid-pattern/* Patrón de grid sutil (úsalo con opacity-10 o menos) */
```

Ejemplo de label:
```tsx
<div className="label">Casos Seleccionados · 2026</div>
// Renderiza: CASOS SELECCIONADOS · 2026 (mono, uppercase, dorado, 11px)
```

### Librerías disponibles (ya instaladas)

- `framer-motion` — animaciones (motion.div, AnimatePresence, etc.)
- `sonner` — toast notifications
- `react-router-dom` v7 — navegación (Link, useNavigate)
- `@clerk/clerk-react` — autenticación (useUser, SignedIn, SignedOut)
- IntersectionObserver nativo — para scroll reveals (ver ejemplo en parte4)

---

## Estado actual de la página (orden de renderizado)

```
Header (headerPublic.tsx)
│
├── Parte1Home     → Hero + Globe animado
├── Parte2Home     → Rescue Counter (métricas con count-up)
├── Parte4Home     → Calculadora TCO ERP (S03) ← sección principal de Edilberto
│
├── S07Casos       → Casos de éxito (APE Plazas, Aplazo)
├── S08Industrias  → 3 verticales focales
├── S09FabricOS    → Arquitectura FABRIC OS + FSOs
├── S10Lifecycle   → 5 fases del lifecycle
├── S11OfficeHours → Calendario + criterios
├── S12Referencias → Tabla de referencias
├── CriteriosEvaluacion → Admisión / rechazo
├── S13Transparencia → 3 bloques de transparencia
├── S14Investigacion → Papers descargables
└── S15Founder     → Manifiesto + Wait List + Founder Line
│
InteractionManager (modales I01-I07)
│
Footer (footerPublic.tsx)
```

---

## Flujo de trabajo recomendado

1. **Siempre parte de `main`** — `git pull origin main` antes de empezar
2. **Trabaja en tu rama** — `git checkout -b feature/edilberto_v5`
3. **Usa la Opción B** (demo-section) si quieres integración total, o la Opción A si quieres control total con Tailwind
4. **Cuando termines** — avisa a Tibor para que revise la uniformidad visual antes de hacer merge a main

---

## Comandos útiles

```bash
# Instalar dependencias
pnpm install

# Dev server
pnpm dev          # http://localhost:5173

# TypeScript check
npx tsc --noEmit  # debe salir sin output (0 errores)

# Build
pnpm build
```

---

## Si algo se ve raro visualmente

1. **Content sin padding (pegado al borde):** Verifica que la sección tenga `px-6 md:px-14` o use `demo-section`.

2. **Heading h3/h4 demasiado grande:** Estás dentro de `.demo-section` y el CSS base aplica `clamp(28px,3vw,36px)`. Cambia `<h3>` por `<p>` o `<div>`.

3. **Colores incorrectos (muy amarillos/cálidos):** Estás usando `#D4AF37` o `#F5E6A3`. Reemplaza con `text-accent` / `#C9A96E`.

4. **Error de Babel "Unexpected character":** Algún `className="..."` tiene comillas tipográficas Unicode (`"` `"`) en lugar de ASCII (`"`). Usa PowerShell para limpiar:
   ```powershell
   $f = "ruta\archivo.tsx"
   $c = [IO.File]::ReadAllText($f, [Text.Encoding]::UTF8)
   $c = $c.Replace([char]0x201C, [char]0x22).Replace([char]0x201D, [char]0x22)
   [IO.File]::WriteAllText($f, $c, [Text.Encoding]::UTF8)
   ```

5. **TypeScript errors:** Corre `npx tsc --noEmit` y arregla antes de hacer push.
