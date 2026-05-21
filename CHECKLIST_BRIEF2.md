# Checklist ordenado de cobertura contra Brief2.md

Fecha de revision: 2026-05-21  
Fuente revisada: `documentacion/Brief2.md` completo
Pagina revisada: app publica actual en `src/pages/public/home/home.tsx`, rutas en `src/routers/AppRouter.tsx`, componentes publicos en `src/pages/public` y componentes compartidos en `src/components`.

## Criterio de revision

- `[x]` Ya esta visible o representado en la pagina actual.
- `[~]` Existe parcialmente, como maqueta, link, modal, copy o UI sin funcionalidad final.
- `[ ]` Falta en la pagina actual.

Todo lo que aparece en el brief cuenta como requerido para cobertura, aunque el brief diga "opcional", "idea radical", "si decides incluirlo", "V1.5", "futuro" o "jugada".

## 0. Auditoria de instrucciones raras / posibles trampas

- [x] No encontre instrucciones del tipo "ignora el brief", "no revises esto", "omite secciones" o intentos de engañar a la IA para saltarse contenido.
- [x] Si hay frases de alcance como "todo lo demas queda fuera de mensajeria publica", "scope estricto", "si no tienes numeros reales, esta seccion no entra" y "NO incluir scripts/templates". Las trato como reglas de producto, no como permiso para omitirlas del checklist.
- [x] La regla operativa para este checklist es mas estricta que el brief: incluso lo opcional se lista como pendiente si no esta.

## 1. Decisiones iniciales de posicionamiento e industrias

- [x] Categoria madre: Oracle Critical Engineering.
- [x] Promesa principal: no entregar en go-live, entregar en primer ciclo critico operado en produccion.
- [x] Cliente objetivo: CFO + CTO de empresas USD 50M-500M+.
- [x] Enemigo narrativo: implementacion Oracle que termina en go-live y abandona al cliente.
- [x] Industrias focales: servicios financieros/fintech.
- [x] Industrias focales: inmobiliario/centros comerciales.
- [x] Industrias focales: logistica/distribucion/transporte.
- [~] Regla de excluir lo demas de mensajeria publica. La pagina se enfoca en las tres industrias, pero conviene revisar todo el copy para no abrir verticales no prioritarias.
- [x] Marca publica FABRIC.
- [x] Razon social solo en footer/legal: FABRIC SOFT MEXICO SA DE CV.

## 2. Primera estructura Home del brief, secciones 1-13

- [x] Seccion 1 Hero. Existe `#inicio` en `parte1.home.tsx`.
- [x] Hero con etiqueta Oracle Critical Engineering.
- [x] Hero con promesa de primer ciclo critico.
- [x] CTA "Iniciar conversacion".
- [x] CTA "Auditoria OCI gratuita".
- [~] Hero con quietud/cero animaciones. La pagina actual tiene animaciones/particulas/typewriter; revisar contra la indicacion de quietud del brief.
- [~] Seccion 2 Puente/Tesis. La tesis aparece distribuida, pero falta bloque exacto y limpio: abandono post go-live, nos quedamos al primer cierre, por contrato.
- [x] Seccion 3 FABRIC AI Diagnostic. Existe `ChatIa` en `#fabric-ai`.
- [~] AI Diagnostic limitado a Oracle. La UI va hacia Oracle, pero falta enforcement real de scope.
- [~] AI Diagnostic con arquitectura RAG. Falta backend/RAG/base curada.
- [~] AI Diagnostic con respuestas accionables y disclaimer obligatorio. Hay respuestas predefinidas y disclaimer; falta motor real.
- [x] Seccion 4 Doctrina preview. Existe `parte6.home.tsx` y `DoctrinaModal.tsx`.
- [x] Seccion 5 Caso ancla APE Plazas. Existe en casos.
- [x] Seccion 6 Industrias focales. Existe `S08Industrias`.
- [x] Seccion 7 FABRIC OS. Existe `S09FabricOS`.
- [x] Seccion 8 Lifecycle. Existe `S10Lifecycle`.
- [x] Seccion 9 Transparencia con metricas. Existe `S13Transparencia`.
- [~] Condicion "si tienes numeros reales, entra; si no, no". La seccion existe, pero debe validarse que cada numero sea real/auditable.
- [x] Seccion 10 Investigacion. Existe `S14Investigacion`.
- [x] Seccion 11 Doctrina de filtrado. Existe `criterios-evaluacion.tsx`.
- [~] Seccion 12 Aplicar. Hay diagnostico/wait list, pero falta ruta canonica `/aplicar` con formulario final.
- [x] Seccion 13 Footer. Existe `footerPublic.tsx`.

## 3. Sistema de diseno web

- [x] Paleta dark base con negro casi puro, panel oscuro, borde sutil, texto claro y acento champagne. Representada en CSS actual.
- [~] Prohibiciones visuales: azul SaaS, verde fluorescente, rojo neon, gradientes, glassmorphism/neumorphism. Hay que auditar CSS completo porque algunas secciones usan efectos/gradientes.
- [~] Tipografia especificada: GT Sectra/Sohne/Inter/JetBrains Mono. La pagina usa serif/sans/mono, pero falta confirmar fuentes exactas.
- [x] Layout amplio y grid/contenedores. Cubierto en general.
- [~] Padding minimo 160px vertical por seccion. Varias secciones cumplen visualmente, pero requiere auditoria responsive exacta.
- [~] Movimiento: fade-in 200ms y hover CTA 300ms. Hay animaciones; falta alinear tiempos con brief.
- [~] Prohibido parallax/scroll-jacking/confetti. No veo confetti/scroll-jacking, pero hay animaciones complejas; revisar si contradicen "quietud".
- [~] Moodboard de 10 referencias visuales. No es contenido visible, pero debe guiar QA de diseno.

## 4. Foto editorial de Julio Alvarez

- [~] Foto unica del sitio, impecable. Existe seccion founder, pero falta validar si usa foto final real o placeholder.
- [~] Concepto visual "el ingeniero que asume el riesgo". Aparece parcialmente por copy; falta validar foto final.
- [ ] Vestimenta exacta segun brief. Pendiente de produccion fotografica.
- [ ] Locacion exacta segun brief. Pendiente de produccion fotografica.
- [ ] Retrato medio. Falta asset validado.
- [ ] Retrato 3/4. Falta asset validado.
- [ ] Detalle de manos opcional/B-roll. Falta asset; se cuenta como pendiente.
- [ ] Orientaciones vertical, cuadrada y horizontal. Falta validar entregables.
- [ ] Entrega RAW/JPG/PNG y derechos comerciales. No aplica a codigo, pero falta en activos/proceso.

## 5. Caso APE Plazas / contenido de caso

- [x] Caso APE Plazas publicado.
- [x] Narrativa de go-live como hito intermedio, no final.
- [x] Doctrina aplicada desde el SOW.
- [~] Evidencias descargables bajo NDA. Faltan archivos y flujo de acceso.
- [~] Acta de transicion/entregables auditables. Existe concepto visual, falta entrega real.

## 6. System Prompt del AI Diagnostic

- [~] Identidad FABRIC AI Diagnostic. Existe UI de chat, falta prompt/backend real.
- [~] Scope: Oracle Cloud Infrastructure y Oracle Fusion Cloud Applications. Parcial.
- [~] Rechazo amable de temas fuera de scope. Falta comportamiento real.
- [~] Casos soportados: rescate post go-live, migracion SAP/EBS/JDE/PeopleSoft, greenfield Fusion. Parcial en respuestas.
- [~] Respuesta con diagnostico, riesgos, complejidad y CTA. Parcial.
- [~] Disclaimer obligatorio al final de toda respuesta. Parcial.
- [~] Captura opcional de correo corporativo, sin insistir. Falta dentro del chat.

## 7. Ideas radicales / opcionales del brief

- [~] Idea radical 1: The Doctrine Generator. Solo hay link futuro en footer.
- [ ] Ruta `/doctrina/generator`.
- [ ] Flujo de 6 preguntas.
- [ ] Captura de nombre, correo corporativo, empresa y cargo.
- [ ] PDF "Clausulas Recomendadas para tu Proximo Contrato Oracle".
- [ ] PDF con 8-12 clausulas, explicacion, disclaimer, branding y CTA.
- [ ] Generacion inteligente V1.5 con IA/API.
- [ ] Idea radical 3: The Apply Reverse. Falta ruta/contenido.
- [ ] Ruta `/rechazados`.
- [ ] Registro anonimizado de proyectos rechazados.
- [ ] Razones de rechazo y resumen YTD.
- [~] Version suavizada posterior: "Proyectos que evaluamos en 2026" / "Criterios aplicados en evaluacion". Existe criterios, pero no pagina/bloque publico con estadisticas.
- [~] Idea radical 4: The Audit Trail Visible. Concepto de evidencias existe en casos, falta ruta.
- [ ] Ruta tipo `/casos/ape-plazas/audit-trail`.
- [ ] Timeline publico: go-live, cierre validado, cierre contable, verificable bajo NDA.
- [x] Idea radical 5: The Wait List. Existe en `S15Founder`.
- [x] Wait List con numero visible.
- [x] Capacidad maxima de 12 proyectos.
- [x] Proyectos activos/lista/ventana de admision.
- [x] Debe usar numeros reales. En UI hay numeros; falta validacion operativa.

## 8. Decision final de doctrinas

- [x] Doctrina 01: entrega en primer ciclo critico.
- [x] Doctrina 02: solo seniors, cero juniors facturables.
- [x] Doctrina 03: fixed-price por fase, cero sorpresas.
- [x] Doctrina 04: cero reportes manuales post go-live.
- [x] Doctrina 05: transicion formal con documentacion viva.
- [~] Doctrinas contractualizables en RFP/SOW/PDF. Falta herramienta descargable real.

## 9. Optimizador OCI especificacion final

- [~] Optimizador OCI como jugada central. Existe CTA/diagnostico, pero falta seccion exacta.
- [ ] Flujo: CFO/CTO solicita acceso.
- [ ] Flujo: acceso solo lectura al tenant OCI o script proporcionado.
- [ ] Reporte en 24-48/72 horas.
- [ ] Reporte con hallazgos cuantificados de optimizacion.
- [ ] Reporte con porcentaje de ahorro mensual potencial.
- [ ] Reporte por componente/areas de optimizacion.
- [ ] Conversacion con FABRIC si quiere ejecutar.
- [ ] Form con empresa, cargo, email corporativo, gasto mensual OCI y aceptacion NDA.
- [ ] Mensaje post-envio con contacto en 24 horas y reporte en 48-72 horas.
- [ ] Modelo comercial: diagnostico gratuito, ejecucion Fixed-Price o Success-Fee.
- [x] Regla de NO incluir instrucciones de ejecucion en reporte publico. Listada como requisito de producto.
- [x] Regla de NO incluir scripts de remediacion. Listada como requisito de producto.
- [x] Regla de NO incluir Terraform/Ansible/templates. Listada como requisito de producto.
- [x] Regla de NO incluir comparativas con otros clientes. Listada como requisito de producto.

## 10. Version final V1.0, Home de 12 secciones

- [x] 01 Hero manifiesto balanceado. Existe.
- [~] Hero con dato 73%. Falta validar si esta visible y si tiene fuente defendible.
- [~] 02 Optimizador OCI lead magnet hero. Parcial, ver seccion 9.
- [x] 03 Doctrina. Existe.
- [x] 04 Caso ancla APE Plazas. Existe.
- [x] 05 Industrias focales. Existe.
- [x] 06 FABRIC OS. Existe.
- [x] 07 Lifecycle 5 fases. Existe.
- [x] 08 Referencias disponibles. Existe.
- [x] 09 Transparencia. Existe.
- [~] 09 Transparencia con metodologia publica `/transparencia`. Falta ruta dedicada.
- [x] 10 Investigacion 3 papers. Existe.
- [~] 10 Descarga de papers con registro corporativo. Falta descarga/lead real.
- [x] 11 Julio Alvarez + Wait List. Existe.
- [x] 12 Footer. Existe.

## 11. Objecion 1: valor del Optimizador OCI

- [~] Mensaje de ahorro OCI como valor economico. Parcial en Cloud TCO/OCI.
- [ ] Reporte sin instrucciones de ejecucion para que FABRIC capture implementacion.
- [ ] Precalificacion por gasto OCI antes de primera reunion.
- [ ] Posicionamiento Success-Fee / Fixed-Price segun ahorro ejecutado.

## 12. Objecion 2: foco de prospectos

- [x] Prioridad rescate de Fusion fallido. Existe `s07b-rescue-assessment.tsx` y chat/diagnostico.
- [~] Prioridad migraciones SAP/EBS/JDE/PeopleSoft a Fusion. Parcial en TCO/chat.
- [~] Prioridad Greenfield Fusion. Parcial en chat/diagnostico.
- [~] Ordenamiento explicito de prospectos prioritarios. Falta bloque o documento visible claro.

## 13. Objecion 3: piezas que no deben quedar fuera

- [~] FABRIC AI Consultor de Migracion Oracle. Chat existe, pero falta asistente especializado real para 3 escenarios.
- [~] Diagnostico de Proyecto Oracle Fallido. Existe rescue assessment, pero falta form exacto de 8 preguntas y entrega en 5 dias.
- [~] Comparativo Economico de Migracion como PDF educativo, no calculadora magica. Existe calculadora TCO; falta PDF educativo con escenarios, rangos, breakeven, variables y metodologia.
- [ ] FABRIC Migration Roadmap. Falta wizard de 12 preguntas y PDF 30-60-90-180 dias.
- [~] Proyectos evaluados en 2026 / criterios aplicados. Parcial en criterios, falta estadistica publica.
- [x] FSO Engine explicado como Fabric Solution Object. FABRIC OS menciona FSOs.
- [~] Lista de 5-8 FSOs disponibles con que resuelve, tiempo y costo aproximado. Existe parcialmente; falta costo/tiempo por FSO.
- [x] Zero-Trust explicado en lenguaje CFO. Parcialmente cubierto en FABRIC OS.
- [~] IA aplicada continua con ejemplos concretos. Parcial; faltan ejemplos completos visibles: conciliacion automatica, anomalías de cierre, notas a estados financieros, prediccion de partidas pendientes.

## 14. Objecion 5: metricas creibles y sustentadas

- [x] Transparencia honesta: no inventar numeros. Existe.
- [~] Metricas con definicion, universo, formula, periodo y auditoria. Falta pagina/metodologia completa.
- [ ] Pagina `/transparencia`.
- [ ] Contacto de metodologia.
- [~] Publicacion solo con numeros defendibles. Pendiente de validacion.

## 15. Objecion 6: FOMO premium

- [x] FOMO 1: Wait List visible con escasez real. Existe.
- [x] FOMO 2: calendario publico de admision. Existe en `S15Founder`.
- [x] FOMO 2: contador regresivo visible. Existe.
- [~] FOMO 3: stamps de proyectos en ejecucion. Parcial; falta bloque explicito de 9 proyectos activos visualizados.
- [~] FOMO 4: proximos casos de publicacion. Parcial en investigacion/benchmark; falta bloque Q3/Q4 claro.
- [ ] FOMO 5: FABRIC Research Letters / membresia editorial cerrada. Falta.

## 16. Correccion 1: prospectos prioritarios reordenados

- [x] Prioridad 1: rescate de Fusion fallido. Existe parcialmente en rescue assessment/chat.
- [~] Señales: reportes manuales, cierre pesado, baja adopcion, incidencias, consultora anterior abandono. Parcial.
- [~] Ticket tipico USD 150K-500K. Parcial en chat/rescue.
- [~] Prioridad 2 y 3 del bloque. Falta revisar/representar de forma explicita si aplica segun copy final.

## 17. Correccion 2: AI Migration Consultant reformulado

- [~] Escenario 1: rescate post go-live. Parcial.
- [~] Escenario 2: migracion desde SAP/EBS/JDE/PeopleSoft. Parcial.
- [~] Escenario 3: greenfield sin ERP empresarial actual. Parcial.
- [~] Output por escenario: patrones, complejidad, plazo, riesgos, CTA especifico. Parcial.

## 18. Correccion 3: comparativos economicos

- [x] Herramienta 1: ERP TCO Comparator. Existe.
- [~] ERP TCO con output de 5/10 años, reduccion de costo, breakeven y CTA. Parcial.
- [~] ERP TCO con solicitud de analisis con datos reales. Parcial.
- [ ] ERP TCO con carga opcional de facturas/reportes/contratos.
- [ ] ERP TCO con aceptacion NDA formal.
- [ ] Entrega en 7-10 dias de TCO personalizado con datos reales.
- [x] Herramienta 2: Cloud Cost Comparator. Existe `#cloud-tco`.
- [~] Cloud Cost Comparator con datos AWS/GCP/Azure y comparativo OCI. Parcial.
- [~] Cloud Cost Comparator con reporte real y CTA. Parcial.

## 19. Lead generation adicional, 7 ideas finales

- [x] Lead Magnet 1: Oracle Fusion Rescue Assessment. Existe `s07b-rescue-assessment.tsx`.
- [~] Rescue Assessment con form de 12 preguntas exactas. Parcial.
- [~] Rescue Assessment con output inmediato: severidad, patron, accion, inversion, ROI. Parcial.
- [x] Lead Magnet 2: FABRIC Benchmark Index. Existe en investigacion.
- [~] Benchmark Index con gating por correo corporativo. Falta descarga real/gating.
- [ ] Benchmark Index como evento anual/prensa/LinkedIn. Falta.
- [ ] Lead Magnet 3: RFP Template para Oracle. Solo link futuro; falta PDF.
- [ ] RFP Template con 47 preguntas, criterios, clausulas, alertas y scorecard.
- [ ] Lead Magnet 4: Oracle Readiness Score. Solo link futuro; falta wizard.
- [ ] Readiness Score con 15 preguntas, score 0-100 y recomendaciones.
- [x] Lead Magnet 5: FABRIC Office Hours. Existe `S11OfficeHours`.
- [~] Office Hours con Calendly publico real. Falta.
- [~] Office Hours con criterios visibles y 4 slots/mes. UI parcial; falta integracion.
- [ ] Lead Magnet 6: Post-Mortem Privado. Solo link futuro en footer; falta pagina/form/oferta.
- [ ] Post-Mortem con 2 dias de inmersion, analisis tecnico/funcional/operativo, causas raiz, plan y reporte ejecutivo.
- [ ] Precio Post-Mortem USD 25,000 visible o definido. Falta.
- [ ] Lead Magnet 7: Confidential Roundtable. Solo link futuro en footer; falta pagina/form/oferta.
- [ ] Roundtable trimestral, 8-12 CFO/CTO, cena privada, NDA, moderada por Julio. Falta.

## 20. Footer, navegacion, legal y admin

- [x] Footer con FABRIC, categoria y contacto. Existe.
- [x] Links principales: Doctrina, Casos, Industrias, FABRIC OS, Transparencia, Investigacion, Aplicar. Existen.
- [~] Links a herramientas futuras. Existen algunos, pero faltan destinos reales.
- [x] Idioma EN | ES. Existe visualmente.
- [~] Terminos, privacidad, doctrina de no alineacion. En app actual faltan rutas reales.
- [x] Admin dashboard basico. Existe `src/pages/admin`.
- [x] Admin Leads, Metricas, Capacidad, Logs. Existen pantallas.
- [~] Persistencia real de admin/leads/metricas/logs. Falta backend/base de datos.
- [~] Notificacion CRM/Slack. Falta integracion real.

## 21. Pendientes criticos para declarar Brief2 completo

- [ ] Crear rutas reales: `/doctrina/generator`, `/rechazados` o `/evaluados`, `/transparencia`, `/aplicar`, `/casos/:slug/audit-trail`, `/post-mortem`, `/roundtable`.
- [ ] Implementar herramientas reales: Doctrine Generator, Migration Roadmap, Readiness Score, RFP Template, Post-Mortem, Roundtable.
- [ ] Implementar PDF/downloads reales: Doctrine Generator, papers, RFP, roadmap, TCO educativo, benchmark.
- [ ] Implementar captura y persistencia de leads.
- [ ] Implementar integraciones CRM/Slack/calendario/email.
- [ ] Implementar metodologia completa de transparencia.
- [ ] Implementar backend real para AI Diagnostic/RAG o dejar claramente como demo.
- [ ] Reemplazar placeholders fotograficos/evidencias por assets reales aprobados.
- [ ] Auditar copy visible contra el brief para corregir encoding roto y desviaciones.
- [ ] Auditar diseno contra prohibiciones del brief: exceso de animacion, gradientes, colores fuera de paleta, fuentes exactas.
