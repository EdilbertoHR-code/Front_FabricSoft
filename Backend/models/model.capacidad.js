const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  id:     { type: Number, required: true },
  status: { type: String, enum: ['disponible', 'activo', 'reservado'], default: 'disponible' },
}, { _id: false });

// Singleton: un solo documento en la colección
const capacidadSchema = new mongoose.Schema({
  slots:             { type: [slotSchema], default: () => Array.from({ length: 12 }, (_, i) => ({ id: i + 1, status: 'disponible' })) },
  admissionQuarters: { type: [String], default: ['Q3 2026', 'Q4 2026'] },
  deadlineQ3:        { type: String, default: '30 jun 2026' },
  waitlist:          { type: [String], default: [] },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Capacidad', capacidadSchema);
