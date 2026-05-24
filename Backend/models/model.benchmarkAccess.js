const mongoose = require('mongoose');

const benchmarkAccessSchema = new mongoose.Schema(
  {
    nombre:    { type: String, required: true, trim: true },
    empresa:   { type: String, required: true, trim: true },
    email:     { type: String, required: true, lowercase: true, trim: true, unique: true },
    ipAddress: { type: String, default: '' },
    status:    { type: String, enum: ['pendiente', 'notificado'], default: 'pendiente' },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('BenchmarkAccess', benchmarkAccessSchema);
