# FabriSoft - Oracle Critical Engineering

Repositorio central del proyecto FabriSoft para la plataforma oficial **fabricsoft.com.mx** (V1).

Este repositorio está diseñado para organizar y separar la documentación inicial de ingeniería de software, los maquetados/prototipos estáticos actuales, y servir como base para el desarrollo futuro del Frontend y Backend.

---

## 📂 Estructura del Proyecto

El espacio de trabajo se encuentra estructurado en las siguientes carpetas principales:

```
FabriSoft/
├── documentacion/          # Documentos LaTeX (.tex), PDFs compilados, briefs e imágenes de soporte.
│   └── imagenes/           # Diagramas técnicos y capturas de pantalla de la arquitectura.
├── maquetado/              # Códigos estáticos actuales (HTML, CSS, JS) y recursos gráficos.
│   ├── css/                # Hojas de estilo del prototipo actual.
│   ├── js/                 # Scripts interactivos (Terminal de IA, Wizards, etc.).
│   └── zip_extracted/      # Recursos y maquetas de referencia para los archivos HTML.
├── frontend/               # Carpeta reservada para el desarrollo de la interfaz de usuario definitiva.
└── backend/                # Carpeta reservada para la base de datos (MongoDB), API e integración de IA (Oracle Agent).
```

---

## 🎨 Sistema de Diseño (Design System) del Maquetado

Para facilitar la colaboración y unificar criterios de diseño entre los desarrolladores del equipo, a continuación se documentan formalmente los colores, tipografías y botones implementados en el maquetado actual. Se propone adoptar este esquema como la **guía de estilos oficial para el Frontend**.

### 1. Paleta de Colores (Colores Base y Acentos)

| Variable CSS | Color HEX/RGBA | Uso en la Interfaz | Muestra Visual |
| :--- | :--- | :--- | :--- |
| `--bg-base` | `#0A0A0A` | Fondo base de la aplicación (gris oscuro, casi negro sólido). | Dark Base |
| `--bg-panel` | `#131313` | Fondo de tarjetas, menús y secciones secundarias. | Panel |
| `--bg-elevated`| `#1A1A1A` | Elementos elevados, tooltips y menús desplegables. | Elevated |
| `--text-primary`| `#F5F5F5` | Texto principal, títulos y etiquetas activas (blanco suave). | Text Main |
| `--text-secondary`| `#8A8A8A`| Texto de cuerpo secundario y descripciones complementarias. | Text Sec |
| `--text-tertiary`| `#5A5A5A` | Placeholders, metadatos y estados inactivos. | Text Tert |
| `--accent` | `#C9A96E` | **Champagne (Oro)**: Color de acento primario para botones, links y labels. | Champagne |
| `--accent-2` | `#A07845` | **Bronce**: Color de acento secundario para monogramas o elementos de borde. | Bronze |
| `--accent-soft`| `rgba(201, 169, 110, 0.08)` | Tintas de fondo suaves en hovers o badges. | Soft Accent |
| `--border` | `#252525` | Bordes estándar de separación y tarjetas. | Border |
| `--border-strong`| `#353535`| Bordes destacados o estados activos. | Strong Border |
| `--danger` | `#B85450` | Alertas del sistema, validaciones y errores (rojo oscuro apagado). | Danger |

### 2. Especificación Tipográfica (Typography)

Se utilizan tres familias tipográficas con roles específicos para reflejar una estética formal y de "ingeniería de atelier":

*   **Fuentes Serif (`--serif`)**: `'Cormorant Garamond', 'Times New Roman', serif`.
    *   *Uso*: Títulos principales (`h1`, `h2`, `h3`, `h4`) y texto de citas/énfasis (`em`, `blockquote`). Transmite elegancia B2B y autoridad.
*   **Fuentes Sans-serif (`--sans`)**: `'Inter', -apple-system, sans-serif`.
    *   *Uso*: Texto base general (`body`). Se renderiza con `font-weight: 300` (delgada), `font-size: 17px` y `line-height: 1.6` para una lectura limpia y espaciada.
*   **Fuentes Monospace (`--mono`)**: `'JetBrains Mono', monospace`.
    *   *Uso*: Etiquetas técnicas (`.label`), llamadas a la acción (`.cta`), botones, consolas de comandos de la IA, tablas de datos y métricas financieras. Transmite precisión y rigor técnico.

---

### 3. Especificación de Componentes (Botones y CTAs)

Los botones y llamados a la acción tienen bordes completamente rectos (`border-radius: 0px`) y un comportamiento interactivo sutil:

#### A. Llamada a la Acción de Texto (`.cta`)
Enlace en JetBrains Mono de color Champagne con una flecha interactiva:
*   *Estilos base*: `font-size: 15px`, `text-transform: uppercase`, subrayado sutil inferior.
*   *Hover*: El texto cambia a blanco (`#F5F5F5`), el subrayado se retrae de derecha a izquierda y la flecha se desplaza a la derecha (`transform: translateX(4px)`).

#### B. Botón Primario (`.btn-primary`)
Botón principal de conversión o envío de formularios:
*   *Estilos base*: Fondo Champagne (`#C9A96E`), texto oscuro base (`#0A0A0A`), fuente monospace de `13px` en mayúsculas, espaciado de letras `0.15em`, padding de `18px 36px` y borde Champagne de `1px`.
*   *Hover*: El fondo se vuelve transparente, el texto cambia a Champagne (`#C9A96E`) y se conserva el contorno dorado (`1px solid #C9A96E`).

#### C. Botón Secundario (`.btn-secondary`)
Botón secundario para cancelaciones o flujos paralelos:
*   *Estilos base*: Fondo transparente, texto blanco suave (`#F5F5F5`), contorno gris fuerte (`1px solid #353535`), fuente monospace de `13px` en mayúsculas, padding de `18px 36px`.
*   *Hover*: El borde y el texto cambian al color de acento Champagne (`#C9A96E`).

---

## 🛠️ Propuesta de Integración en Frontend (Tailwind CSS Config)

Para la implementación final del **Frontend** usando **Tailwind CSS**, se propone agregar el siguiente bloque de configuración en `tailwind.config.js` para mantener la fidelidad de los tokens de diseño actuales:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0A0A0A',
          panel: '#131313',
          elevated: '#1A1A1A',
        },
        text: {
          primary: '#F5F5F5',
          secondary: '#8A8A8A',
          tertiary: '#5A5A5A',
        },
        accent: {
          DEFAULT: '#C9A96E', // Champagne
          dark: '#A07845',    // Bronce
          soft: 'rgba(201, 169, 110, 0.08)',
        },
        border: {
          DEFAULT: '#252525',
          strong: '#353535',
        },
        danger: '#B85450',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        none: '0px',
      }
    },
  },
  plugins: [],
}
```
