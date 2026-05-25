const mongoose = require('mongoose');

// ---------------------------------------------------------------------------
// Sub-schemas
// ---------------------------------------------------------------------------

const publicadaSchema = new mongoose.Schema({
  label:               { type: String, required: true, trim: true },
  valor:               { type: String, required: true, trim: true },
  unidad:              { type: String, required: true, trim: true },
  metodologia:         { type: String, required: true, trim: true },
  periodo:             { type: String, required: true, trim: true },
  fuente: {
    tipo:        { type: String, enum: ['interna', 'auditoria_externa', 'cliente'], default: 'interna' },
    descripcion: { type: String, default: '' },
  },
  verificadoPor:       { type: String, default: '' },
  ultimaActualizacion: { type: Date, required: true, default: Date.now },
  // Candado doble: visible activa la intención, verified confirma el dato
  visible:             { type: Boolean, default: false },
  verified:            { type: Boolean, default: false },
  orden:               { type: Number, default: 0 },
}, { _id: true });

const proximaSchema = new mongoose.Schema({
  label:         { type: String, required: true, trim: true },
  fechaObjetivo: { type: String, required: true, trim: true },
  descripcion:   { type: String, default: '' },
  visible:       { type: Boolean, default: true },
  orden:         { type: Number, default: 0 },
}, { _id: true });

const compromisoSchema = new mongoose.Schema({
  titulo: { type: String, required: true, trim: true },
  cuerpo: { type: String, required: true, trim: true },
  orden:  { type: Number, default: 0 },
}, { _id: true });

// ---------------------------------------------------------------------------
// Defaults — replican exactamente el contenido editorial hardcodeado actual
// ---------------------------------------------------------------------------

const DEFAULT_PUBLICADAS = [
  {
    label:               'Go-live APE Plazas en fecha contractual',
    valor:               '✓',
    unidad:              'Verificable',
    metodologia:         'Go-live planeado 06 abril 2026 · Ejecutado 06 abril 2026 · Verificable bajo NDA',
    periodo:             'abr 2026',
    fuente:              { tipo: 'cliente', descripcion: 'CFO APE Plazas' },
    verificadoPor:       'CFO APE Plazas',
    ultimaActualizacion: new Date('2026-04-30'),
    visible:             true,
    verified:            true,
    orden:               1,
  },
  {
    label:               'Primer cierre contable APE Plazas',
    valor:               '✓',
    unidad:              'Verificable',
    metodologia:         'Cierre planeado abril 2026 · Ejecutado 30 abril 2026 · Acta en firma mayo 2026',
    periodo:             'abr–may 2026',
    fuente:              { tipo: 'cliente', descripcion: 'CFO APE Plazas' },
    verificadoPor:       'CFO APE Plazas',
    ultimaActualizacion: new Date('2026-05-01'),
    visible:             true,
    verified:            true,
    orden:               2,
  },
  {
    label:               'Sin incidencias críticas post go-live',
    valor:               '✓',
    unidad:              'APE Plazas',
    metodologia:         'Cero incidencias bloqueantes al cierre del primer ciclo · Verificable bajo NDA',
    periodo:             'abr 2026',
    fuente:              { tipo: 'cliente', descripcion: 'CFO APE Plazas' },
    verificadoPor:       'CFO APE Plazas',
    ultimaActualizacion: new Date('2026-04-30'),
    visible:             true,
    verified:            true,
    orden:               3,
  },
  {
    label:               'Experiencia Oracle promedio del equipo',
    valor:               '15+',
    unidad:              'años',
    metodologia:         'Promedio de años de experiencia Oracle por consultor senior facturable',
    periodo:             'auditado',
    fuente:              { tipo: 'interna', descripcion: 'Currículum + certificaciones verificadas' },
    verificadoPor:       'Dirección FABRIC',
    ultimaActualizacion: new Date('2026-01-01'),
    visible:             true,
    verified:            true,
    orden:               4,
  },
  {
    label:               'Plantilla 100% senior Oracle',
    valor:               '100%',
    unidad:              'del equipo',
    metodologia:         'Cero juniors facturables · Condición contractual en cada SOW · Verificable',
    periodo:             'SOW',
    fuente:              { tipo: 'interna', descripcion: 'Contratos SOW vigentes' },
    verificadoPor:       'Dirección FABRIC',
    ultimaActualizacion: new Date('2026-01-01'),
    visible:             true,
    verified:            true,
    orden:               5,
  },
  {
    label:               'Certificaciones Oracle vigentes',
    valor:               '100%',
    unidad:              'del equipo',
    metodologia:         'Certificaciones activas verificables por consultor facturable',
    periodo:             'vigente',
    fuente:              { tipo: 'interna', descripcion: 'Oracle Certification Portal' },
    verificadoPor:       'Dirección FABRIC',
    ultimaActualizacion: new Date('2026-01-01'),
    visible:             true,
    verified:            true,
    orden:               6,
  },
];

const DEFAULT_PROXIMAS = [
  { label: 'NPS clientes activos',                  fechaObjetivo: 'Oct 2026', descripcion: '', visible: true, orden: 1 },
  { label: 'Retención a 24 meses',                  fechaObjetivo: 'Nov 2026', descripcion: '', visible: true, orden: 2 },
  { label: 'Tiempo medio respuesta crítica',         fechaObjetivo: 'Q4 2026', descripcion: '', visible: true, orden: 3 },
  { label: 'Cumplimiento Fixed-Price contractual',   fechaObjetivo: 'Dic 2026', descripcion: '', visible: true, orden: 4 },
  { label: 'Tasa de proyectos completados en ciclo', fechaObjetivo: 'Anual',   descripcion: '', visible: true, orden: 5 },
];

const DEFAULT_COMPROMISOS = [
  {
    titulo: 'Publicamos solo números reales',
    cuerpo:  'Las métricas de esta página reflejan proyectos reales documentados. No proyectamos tasas de éxito ni publicamos benchmarks de mercado como si fueran propios. Si no tenemos el número, no lo publicamos.',
    orden:   1,
  },
  {
    titulo: 'Metodología pública por cada métrica',
    cuerpo:  'Cada número tiene una definición, un universo y un método de cálculo documentado. Ninguna métrica es un claim sin sustento.',
    orden:   2,
  },
  {
    titulo: 'Actualización trimestral',
    cuerpo:  'Las métricas se actualizan al cierre de cada trimestre. La fecha de última actualización aparece en cada dato. Preferimos retrasar una publicación a publicar un número sin validar.',
    orden:   3,
  },
];

// ---------------------------------------------------------------------------
// Singleton schema
// ---------------------------------------------------------------------------

const transparenciaConfigSchema = new mongoose.Schema({
  publicadas:  { type: [publicadaSchema],  default: () => DEFAULT_PUBLICADAS  },
  proximas:    { type: [proximaSchema],    default: () => DEFAULT_PROXIMAS    },
  compromisos: { type: [compromisoSchema], default: () => DEFAULT_COMPROMISOS },
}, { timestamps: true, versionKey: false });

transparenciaConfigSchema.statics.defaults = () => ({
  publicadas:  DEFAULT_PUBLICADAS,
  proximas:    DEFAULT_PROXIMAS,
  compromisos: DEFAULT_COMPROMISOS,
});

module.exports = mongoose.model('TransparenciaConfig', transparenciaConfigSchema);
