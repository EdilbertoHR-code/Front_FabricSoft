const mongoose = require('mongoose');

const paperAccessSchema = new mongoose.Schema(
  {
    paperId:   { type: String, required: true, enum: ['01', '02', '03'] },
    email:     { type: String, required: true, lowercase: true, trim: true },
    cargo:     { type: String, required: true, trim: true },
    empresa:   { type: String, required: true, trim: true },
    ipAddress: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pendiente', 'enviado', 'bloqueado'],
      default: 'pendiente',
    },
    emailSent: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

// Índice para evitar spam: misma persona mismo paper en < 24h
paperAccessSchema.index({ email: 1, paperId: 1, createdAt: -1 });

module.exports = mongoose.model('PaperAccess', paperAccessSchema);
