const mongoose = require('mongoose');
const trackingSchema = require('./schema.tracking');

const historialEntrySchema = new mongoose.Schema({
  fecha:  { type: String, required: true },
  estado: { type: String, required: true },
  autor:  { type: String, default: 'Sistema' },
}, { _id: false });

const leadSchema = new mongoose.Schema({
  nombre:     { type: String, required: true, trim: true },
  cargo:      { type: String, required: true, trim: true },
  empresa:    { type: String, required: true, trim: true },
  revenue:    { type: String, default: '' },
  email:      { type: String, required: true, lowercase: true, trim: true },
  telefono:   { type: String, default: '', trim: true },
  industria:  { type: String, default: '' },
  iniciativa: { type: String, default: '' },
  plazo:      { type: String, default: '' },
  source:     { type: String, default: 'aplicar' },
  cloudComparator: {
    provider:            { type: String, default: '' },
    monthlySpend:        { type: Number, default: 0 },
    analysisPeriod:      { type: String, default: '' },
    criticalApplication: { type: String, default: '' },
    objective:           { type: String, default: '' },
    workload:            { type: String, default: '' },
    breakdown: {
      compute:    { type: Number, default: 0 },
      storage:    { type: Number, default: 0 },
      database:   { type: Number, default: 0 },
      networking: { type: Number, default: 0 },
      other:      { type: Number, default: 0 },
    },
  },
  migrationRoadmap: {
    sistema:        { type: String, default: '' },
    modulos:        { type: [String], default: [] },
    industria:      { type: String, default: '' },
    geografia:      { type: String, default: '' },
    plazo:          { type: String, default: '' },
    compliance:     { type: String, default: '' },
    patrocinio:     { type: String, default: '' },
    presupuesto:    { type: String, default: '' },
    integraciones:  { type: String, default: '' },
    datos:          { type: String, default: '' },
    equipo:         { type: String, default: '' },
    experiencia:    { type: String, default: '' },
    riskLevel:      { type: String, default: '' },
    estimatedTimeline: { type: String, default: '' },
  },
  readinessScore: {
    patrocinio:    { type: String, default: '' },
    presupuesto:   { type: String, default: '' },
    procesos:      { type: String, default: '' },
    datos:         { type: String, default: '' },
    equipo:        { type: String, default: '' },
    integraciones: { type: String, default: '' },
    plazo:         { type: String, default: '' },
    usuarios:      { type: String, default: '' },
    compliance:    { type: String, default: '' },
    experiencia:   { type: String, default: '' },
    consultora:    { type: String, default: '' },
    alcance:       { type: String, default: '' },
    gobierno:      { type: String, default: '' },
    ciclo:         { type: String, default: '' },
    comunicacion:  { type: String, default: '' },
    scoreTotal:    { type: Number, default: 0 },
    nivel:         { type: String, default: '' },
  },
  score:      { type: Number, default: 0 },
  status:     { type: String, enum: ['Nuevo', 'Aprobado', 'WaitList', 'Revisión', 'Rechazado'], default: 'Nuevo' },
  notas:      { type: String, default: '' },
  ipAddress:  { type: String, default: '' },
  historial:  [historialEntrySchema],
  queryChat:  { type: String, default: '' },
  tracking:   { type: trackingSchema, default: () => ({}) },
}, { timestamps: true, versionKey: false });

leadSchema.index({ email: 1 });
leadSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Lead', leadSchema);
