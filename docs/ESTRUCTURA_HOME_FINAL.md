# Estructura Final: Home vs. Páginas Independientes (Footer)

Basado en el análisis exhaustivo del documento `Brief2.md`, esta es la arquitectura definitiva para el sitio. El objetivo es que el **Home** mantenga una narrativa lineal, poderosa y libre de saturación, mientras que todas las herramientas de generación de leads, ideas radicales y calculadoras vivan como **páginas independientes** enlazadas desde el Footer.

---

## 🏠 LO QUE SÍ VA EN EL HOME (Secciones Principales)
Estas 12 secciones (dictadas explícitamente en el cierre estratégico del brief) conforman el flujo narrativo principal. Todo debe mantener el diseño premium (cero animaciones complejas, paleta dark/champagne).

1. **Hero / Manifiesto Balanceado**: 
   - Etiqueta "Oracle Critical Engineering".
   - Promesa principal: "No entregamos en go-live, entregamos cuando tu primer ciclo crítico opera".
   - Sub-manifiesto sobre el 73% de fallas.
   - 2 CTAs: "Iniciar conversación" y "Auditoría OCI gratuita".
2. **Optimizador OCI (Lead Magnet Hero)**:
   - Alternativa potente al Hero: Diagrama de 3 pasos ofreciendo auditoría de OCI en lectura para encontrar ahorros en USD.
3. **La Doctrina (Preview de las 5)**:
   - 1. Primer ciclo crítico. 2. Solo seniors. 3. Fixed-price. 4. Cero reportes manuales. 5. Transición formal.
4. **Caso Ancla: APE Plazas**:
   - Prueba verificable operativa: Go-live vs Primer cierre contable en abril 2026.
5. **Industrias Focales**:
   - Bloque claro delimitando: Servicios Financieros, Inmobiliario, Logística.
6. **FABRIC OS**:
   - Gráfico de 4 capas: Doctrina, FSOs, Frameworks, Agentes IA.
7. **Lifecycle (5 Fases)**:
   - Diagnose, Architect, Deploy, Stabilize, Optimize.
8. **Referencias Disponibles (Lead Magnet)**:
   - Bloque ofreciendo charlas directas (bajo NDA) con CFOs y CTOs de empresas que ya operan con FABRIC.
9. **Transparencia**:
   - Publicación de métricas honestas reales actuales (sin inventar números) y compromiso público de medición futura.
10. **Investigación**:
    - Acceso a descarga (con *gating*) de los 3 papers iniciales de FABRIC.
11. **Julio Alvarez + Wait List (FOMO)**:
    - Foto editorial impecable. 
    - Contador de proyectos activos (ej. 9 de 12), slots en Q3 y lista de espera.
12. **El Footer Público**:
    - Base de navegación limpia que contendrá los enlaces a todas las herramientas que listamos abajo.

---

## 🔽 LO QUE VA COMO PÁGINAS INDEPENDIENTES (Acceso en Footer)
Para no engrosar el Home, **TODAS** estas "ideas radicales", lead magnets, y comparadores que el brief menciona, deben desarrollarse como rutas separadas (ej. `/herramientas/doctrine-generator`). Todas estas están marcadas con `*` indicando que NO van en el Home.

### 🛠 Herramientas Interactivas (Wizards)
1. **[*] The Doctrine Generator** (`/doctrina/generator`): Wizard de 6 preguntas para que el CFO genere un PDF con cláusulas contractuales recomendadas.
2. **[*] ERP TCO Comparator & Cloud Cost Comparator** (`/herramientas/tco`): Calculadora que muestra el ahorro potencial de migrar a Oracle Cloud en escenarios a 5/10 años.
3. **[*] Oracle Readiness Score** (`/herramientas/readiness`): Wizard de 15 preguntas con un score (0-100) evaluando si la empresa está lista para Fusion.
4. **[*] FABRIC Migration Roadmap** (`/herramientas/roadmap`): Herramienta de 12 preguntas que entrega un PDF con un plan técnico a 30-60-90-180 días.
5. **[*] FABRIC AI - Consultor de Migración Oracle** (`/herramientas/ai-diagnostic`): El motor conversacional (RAG) especializado en escenarios de rescate y migración. *(Nota: actualmente lo tenemos maquetado en el Home, sugiero extraerlo a una página dedicada si queremos máxima limpieza).*

### 📊 Páginas de Autoridad y Transparencia
6. **[*] Proyectos Evaluados / Criterios ("The Apply Reverse")** (`/criterios`): Registro de los proyectos que FABRIC evaluó y las razones de por qué rechazó algunos.
7. **[*] The Audit Trail Visible** (`/casos/ape-plazas/audit-trail`): Timeline público con evidencias reales (descargables bajo NDA) de que APE Plazas cerró contablemente.
8. **[*] Transparencia Metodológica** (`/transparencia`): Detalle profundo de cómo se calcula cada métrica de FABRIC.

### 📄 Descargables y Lead Magnets (PDFs)
9. **[*] Oracle Fusion Rescue Assessment**: Diagnóstico de severidad en 5 días para proyectos fallidos.
10. **[*] FABRIC Benchmark Index**: Reporte "El Estado de las Implementaciones Oracle Fusion 2026".
11. **[*] RFP Template para Oracle**: Un PDF con 47 preguntas para evaluar a consultoras competidoras.

### 🤝 Servicios Premium de Ingreso (Ofertas)
12. **[*] FABRIC Office Hours** (`/office-hours`): Calendly de Julio Alvarez con solo 4 slots al mes para asesoría.
13. **[*] Post-Mortem Privado** (`/servicios/post-mortem`): Landing page vendiendo el análisis de proyectos fallidos por USD $25,000.
14. **[*] Confidential Roundtable** (`/eventos/roundtable`): Landing para invitar a CFOs a cenas exclusivas trimestrales.

---

### Conclusión para el Desarrollo Frontend
**Regla de Oro:** Todo lo que requiera más de un clic, implique llenar múltiples campos (wizards), o sean calculadoras comparativas, **debe salir del componente `Home` actual**. De esta manera el visitante no pierde la inmersión del manifiesto y la propuesta de FABRIC, y usa el Footer como su "caja de herramientas".
