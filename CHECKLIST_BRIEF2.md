# Checklist de cobertura contra Brief2.md

Fecha de revision: 2026-05-21  
Fuente: `documentacion/Brief2.md`  
Pagina revisada: app publica actual en `src/pages/public/home/home.tsx` y rutas de `src/routers/AppRouter.tsx`.

Leyenda:
- `[x]` Ya existe en la pagina actual.
- `[~]` Existe parcialmente o como maqueta/link, pero falta completar funcionalidad/contenido.
- `[ ]` Falta en la pagina actual.

Nota de criterio: todo lo que aparece en el brief se considera requerido para cobertura, aunque el brief lo llame opcional, futuro, idea radical o V1.5.

## Version final V1.0 del sitio

- [x] Hero / manifiesto balanceado. Existe seccion `#inicio` con mensaje principal y CTA en `parte1.home.tsx`.
- [x] CTA principal "Iniciar conversacion". Existe en hero/header y navega a diagnostico.
- [x] CTA secundario "Auditoria OCI gratuita". Existe visible en hero.
- [~] Optimizador OCI como lead magnet hero. Hay diagnostico/proceso y CTA, pero no esta separado exactamente como "Auditoria OCI gratuita" con flujo audit-only, analisis 24-72h y reporte cuantificado por componente.
- [x] Doctrina con cinco principios finales. Existe en `parte6.home.tsx` y modal `DoctrinaModal.tsx`.
- [x] Caso ancla APE Plazas. Existe en seccion `S07Casos` y ruta `casos/:slug`.
- [x] Industrias focales. Existe seccion `S08Industrias`.
- [x] FABRIC OS. Existe seccion `S09FabricOS` con capas expandibles.
- [x] Lifecycle de 5 fases. Existe seccion `S10Lifecycle`.
- [x] Referencias disponibles. Existe seccion `S12Referencias` con acceso verificado.
- [x] Transparencia. Existe seccion `S13Transparencia`.
- [~] Metodologia publica de transparencia. Existe texto de metodologia/auditoria bajo NDA, pero falta pagina/metodologia completa con definiciones, formulas, universo, periodos y auditor por metrica.
- [x] Investigacion con 3 papers. Existe seccion `S14Investigacion`.
- [~] Descarga gated de papers con registro corporativo. Existe modal/interaccion de papers, pero falta descarga real y almacenamiento de lead.
- [x] Julio Alvarez + Wait List. Existe seccion `S15Founder`.
- [x] Footer. Existe footer publico con marca, contacto, links, idioma y legal.
- [x] Mapa removido del footer. Ya no hay iframe de Google Maps en `src` ni `frontend`.

## Secciones iniciales del brief

- [x] Seccion 1 HERO. Cubierta por `Parte1Home`.
- [~] Seccion 2 PUENTE / TESIS. Hay narrativa de tesis en hero y secciones posteriores, pero no aparece como bloque limpio de tres frases exactas: abandono post go-live, nos quedamos hasta primer cierre, por contrato.
- [x] Seccion 3 FABRIC AI Diagnostic. Existe `ChatIa` en `#fabric-ai`.
- [~] AI Diagnostic como motor real RAG/API. La UI existe con respuestas predefinidas; falta backend/RAG/modelo real.
- [~] System prompt del AI Diagnostic. El comportamiento esta simulado; falta implementar el prompt completo del brief como backend real.
- [~] Captura opcional de correo corporativo en AI Diagnostic. La idea existe como lead/contacto general, pero falta flujo dentro del chat que pida correo opcional sin insistir.
- [x] Seccion 4 DOCTRINA preview. Cubierta.
- [x] Seccion 5 CASO ANCLA APE PLAZAS. Cubierta.
- [x] Seccion 6 INDUSTRIAS FOCALES. Cubierta.
- [x] Seccion 7 FABRIC OS. Cubierta.
- [x] Seccion 8 LIFECYCLE. Cubierta.
- [x] Seccion 9 TRANSPARENCIA con metricas. Cubierta parcialmente con transparencia honesta.
- [x] Seccion 10 INVESTIGACION. Cubierta.
- [x] Seccion 11 DOCTRINA DE FILTRADO / criterios. Existe `criterios-evaluacion.tsx`.
- [~] Seccion 12 APLICAR. Existe diagnostico/aplicacion y wait list, pero falta ruta/form final `/aplicar` completo como proceso de admision.
- [x] Seccion 13 FOOTER. Cubierta.

## Herramientas y lead magnets

- [x] ERP TCO Comparator. Existe seccion `#tco` en `parte3.home.tsx`.
- [~] ERP TCO Comparator con CTA premium y carga opcional de archivos. Existe calculadora; falta formulario final con empresa, cargo, email corporativo, aceptacion NDA y carga opcional de facturas/reportes/contratos.
- [x] Cloud Cost Comparator. Existe seccion `#cloud-tco` en `parte4.home.tsx`.
- [~] Cloud Cost Comparator con reporte real. Existe waitlist/preview; falta calculo completo con datos reales y entrega de reporte.
- [~] Auditoria OCI gratuita. Existe como CTA/diagnostico; falta flujo completo: acceso audit-only, analisis automatizado 24-72h, reporte cuantificado y NDA.
- [~] Diagnostico de Proyecto. Existe formulario/modal en `parte5.home.tsx`; falta persistencia real, CRM/Slack y proceso operativo.
- [ ] RFP Template. Solo aparece como link futuro en footer; falta pagina/herramienta.
- [ ] Migration Roadmap. Solo aparece como link futuro; falta pagina/herramienta.
- [ ] Readiness Score. Solo aparece como link futuro; falta pagina/herramienta.

## Ideas radicales / opcionales que tambien deben estar

- [~] The Doctrine Generator. Solo aparece como link futuro en footer. Falta ruta `/doctrina/generator`, 6 preguntas, captura de lead, PDF personalizado, 8-12 clausulas, disclaimer, branding y CTA.
- [ ] Doctrine Generator con generacion inteligente V1.5. Falta personalizacion con IA/API segun respuestas.
- [ ] The Apply Reverse. Falta ruta `/rechazados` con proyectos rechazados anonimizados, razon de rechazo y resumen YTD.
- [~] The Audit Trail Visible. Casos tienen entregables auditables, pero falta ruta tipo `/casos/ape-plazas/audit-trail` con timeline de evidencias y acceso bajo NDA.
- [x] The Wait List. Existe en seccion de fundador/wait list.
- [x] Wait List con escasez real visible. Existe capacidad, proyectos activos, reservados/lista y disponibilidad.
- [x] Calendario publico de admision. Existe en `S15Founder`.
- [x] Contador regresivo visible para ventana de admision. Existe en `S15Founder`.
- [~] Stamps de proyectos en ejecucion. Hay capacidad/lista y algunos datos, pero falta visualizacion explicita de proyectos activos por industria, tipo, inicio y go-live.
- [~] Proximos casos de publicacion. Hay investigacion/benchmark y casos, pero falta bloque explicito "Proximos casos de publicacion" Q3/Q4.
- [ ] FABRIC Research Letters / membresia editorial cerrada. Falta seccion o pagina con validacion corporativa.

## Office Hours

- [x] Office Hours existe en la pagina actual. Hay seccion `S11OfficeHours`.
- [~] Office Hours no aparece como especificacion formal en `Brief2.md`. Se puede conservar como mecanismo comercial, pero debe quedar alineado a admision/FOMO y no sustituir la Wait List.
- [~] Reserva real de slots. Hay UI/interaccion, pero falta persistencia/calendario real y confirmacion por email.

## Contenido, marca y posicionamiento

- [x] Marca publica FABRIC. Se usa FABRIC en header/footer.
- [~] Evitar "FabricSoft" como marca publica. En footer legal aparece razon social, correcto; revisar textos secundarios para evitar uso comercial no legal.
- [x] Categoria Oracle Critical Engineering. Aparece en hero, header/footer y secciones.
- [x] Promesa: no entregamos en go-live, entregamos en primer ciclo critico. Aparece en varias secciones.
- [x] Cliente objetivo CFO + CTO, USD 50M-500M+, finanzas/inmobiliario/logistica. Aparece en filtros, industrias y secciones.
- [x] Enemigo: implementacion Oracle que termina en go-live y abandona al cliente. Aparece en narrativa de chat/diagnostico/doctrina.
- [~] Dato "73% de implementaciones..." del hero final. Revisar si esta visible exactamente y con soporte; si no hay fuente defendible, debe tratarse como placeholder o retirarse.

## Doctrina final

- [x] Entrega en primer ciclo critico. Cubierta.
- [x] Solo seniors, cero juniors facturables. Cubierta.
- [x] Fixed-price por fase, cero sorpresas. Cubierta.
- [x] Cero reportes manuales post go-live. Cubierta.
- [x] Transicion formal con documentacion viva. Cubierta.
- [~] Doctrina contractualizable en PDF/RFP. Falta convertirla en herramienta descargable real.

## Transparencia y metricas

- [x] Transparencia honesta: no inventar numeros. Cubierta.
- [~] Metricas actuales publicables. Existe seccion, pero debe validarse que cada numero tenga metodologia/auditoria.
- [ ] Pagina publica `/transparencia` con metodologia completa. Falta ruta dedicada.
- [ ] Contacto `metodologia@fabricsoft.com.mx` o equivalente para consultas de metodologia. Falta verificar/agregar.
- [~] Auditoria bajo NDA para clientes/prospectos/inversores/M&A. Mencionada parcialmente; falta flujo de solicitud.

## Referencias y casos

- [x] Referencias disponibles con acceso post-admision. Cubierto.
- [~] Validacion directa con ejecutivos reales. UI lo comunica, falta proceso operativo y autorizaciones.
- [~] Caso APE Plazas con evidencia auditable. Caso existe; faltan evidencias descargables bajo NDA.
- [ ] Audit Trail publico por caso. Falta ruta y contenido especifico.

## Investigacion

- [x] Paper 01: por que fallan los go-live de Oracle Fusion. Cubierto como card.
- [x] Paper 02: IA aplicada a cierre contable en Fusion Cloud. Cubierto como card.
- [x] Paper 03: modelo de entrega en primer ciclo critico. Cubierto como card.
- [~] PDFs reales descargables. Falta archivo, registro corporativo y descarga.
- [x] FABRIC Benchmark Index anual / early access. Existe en seccion investigacion.
- [ ] FABRIC Research Letters quincenal cerrada. Falta.

## Aplicar / admision

- [x] Criterios de evaluacion. Existe `criterios-evaluacion.tsx`.
- [x] No PYMES sin compliance regulatorio. Cubierto en criterios/filtro.
- [x] No outsourcing por horas. Cubierto.
- [x] No mantenimiento preventivo simple. Cubierto.
- [x] No proyectos sin patrocinio CFO/CTO. Cubierto.
- [~] Form de aplicacion final con 5 campos. Hay formularios, pero falta ruta/form canonico `/aplicar`.
- [x] Tiempo de respuesta 24 horas habiles. Aparece en contacto/founder/waitlist.
- [~] NDA en proceso de admision. Mencionado; falta aceptacion formal en formularios.

## Founder / fotografia / assets

- [~] Foto editorial B&W de Julio Alvarez. Hay placeholder/estructura; falta fotografia real final.
- [ ] Detalle de manos opcional para B-roll. Falta asset; el brief lo marca opcional, pero en esta cobertura se cuenta como pendiente.
- [~] Retrato medio y retrato 3/4. Falta validar que existan assets reales y no placeholder.
- [~] Founder Line / acceso directo para iniciativas Oracle > USD 1M. Existe en `S15Founder`; falta flujo real/copy final validado.

## Footer y navegacion

- [x] Links principales: Doctrina, Casos, Industrias, FABRIC OS, Transparencia, Investigacion, Aplicar. Cubiertos.
- [~] Links de herramientas futuras. Existen algunos como links futuros, pero faltan rutas/herramientas reales.
- [x] Idioma EN | ES. Existe visualmente.
- [~] Legal: terminos, privacidad, doctrina de no alineacion. En app Next existe; en app Vite actual falta revisar/agregar rutas o links reales.
- [x] Razon social solo footer/legal. Cubierto.

## Admin / operacion interna

- [x] Admin dashboard basico. Existe en `src/pages/admin`.
- [x] Leads, metricas, capacidad y logs. Existen pantallas admin.
- [~] Persistencia real de leads/metricas/capacidad/logs. Falta backend/base de datos.
- [~] Notificacion CRM/Slack interno. Falta integracion real.

## Pendientes criticos antes de considerar "Brief2 completo"

- [ ] Crear rutas reales: `/doctrina/generator`, `/rechazados`, `/transparencia`, `/aplicar`, `/casos/:slug/audit-trail`.
- [ ] Implementar PDF/downloads reales para Doctrine Generator y papers.
- [ ] Implementar captura y persistencia de leads.
- [ ] Implementar integraciones CRM/Slack/calendario/email.
- [ ] Implementar metodologia completa de transparencia.
- [ ] Reemplazar placeholders de fotografia/evidencia por assets reales aprobados.
- [ ] Convertir todos los links "future" del footer en destinos reales o paginas "coming soon" con contenido del brief.
- [ ] Revisar copy final contra `Brief2.md` para eliminar desviaciones y encoding roto en textos visibles.

