const mongoose = require('mongoose');

const officeHoursBookingSchema = new mongoose.Schema({
  nombre:    { type: String, required: true, trim: true },
  empresa:   { type: String, required: true, trim: true },
  email:     { type: String, required: true, lowercase: true, trim: true },
  dia:       { type: String, required: true },
  slot:      { type: String, required: true },
  status:    { type: String, enum: ['pendiente', 'confirmado', 'cancelado'], default: 'pendiente' },
  emailEnviado: { type: Boolean, default: false },
  calendarEnviado: { type: Boolean, default: false },
  calendarEventId: { type: String, default: '' },
  notas:     { type: String, default: '' },
  ipAddress: { type: String, default: '' },
}, { timestamps: true, versionKey: false });

officeHoursBookingSchema.index({ email: 1, createdAt: -1 });
officeHoursBookingSchema.index({ dia: 1, slot: 1 });

module.exports = mongoose.model('OfficeHoursBooking', officeHoursBookingSchema);
