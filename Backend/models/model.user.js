const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  clerkId: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true, // Asegura que siempre se guarde en minúsculas
    trim: true       // Quita espacios en blanco al inicio o final
  },
  firstName: { 
    type: String, 
    default: '' 
  },
  lastName: { 
    type: String, 
    default: '' 
  },
  photoUrl: { 
    type: String, 
    default: '' 
  },
  rol: { 
    type: String, 
    enum: ['admin', 'superadmin'], // Seguridad: Solo permite estos valores
    default: 'admin' 
  },
  status: { 
    type: String, 
    enum: ['activo', 'inactivo', 'revocado'], 
    default: 'activo' 
  }
}, { 
 
  timestamps: true, 
  versionKey: false 
});


module.exports = mongoose.model('User', userSchema);