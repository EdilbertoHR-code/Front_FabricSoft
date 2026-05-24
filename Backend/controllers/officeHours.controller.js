const Booking = require('../models/model.officeHoursBooking');

const PUBLIC_DOMAINS = ['gmail','hotmail','yahoo','outlook','icloud','live','msn','me','proton'];

function isPublicEmail(email) {
  const domain = (email.split('@')[1] || '').split('.')[0].toLowerCase();
  return PUBLIC_DOMAINS.includes(domain);
}

exports.book = async (req, res) => {
  try {
    const { nombre, empresa, email, dia, slot } = req.body;

    if (!nombre?.trim()) return res.status(400).json({ error: 'Nombre requerido.' });
    if (!empresa?.trim()) return res.status(400).json({ error: 'Empresa requerida.' });
    if (!email || !email.includes('@')) return res.status(400).json({ error: 'Email inválido.' });
    if (isPublicEmail(email)) return res.status(400).json({ error: 'Usa tu correo corporativo.' });
    if (!dia) return res.status(400).json({ error: 'Selecciona un día.' });
    if (!slot) return res.status(400).json({ error: 'Selecciona un horario.' });

    // Anti-duplicate: same slot same day
    const existing = await Booking.findOne({ dia, slot, status: { $ne: 'cancelado' } });
    if (existing) return res.status(409).json({ error: 'Ese horario ya fue reservado. Elige otro.' });

    const booking = await Booking.create({
      nombre:    nombre.trim(),
      empresa:   empresa.trim(),
      email:     email.trim().toLowerCase(),
      dia,
      slot,
      ipAddress: req.ip || '',
    });

    res.status(201).json({ ok: true, data: booking });
  } catch (err) {
    console.error('officeHours.book error:', err);
    res.status(500).json({ error: 'Error interno al guardar la reserva.' });
  }
};

exports.listar = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status && status !== 'Todos') filter.status = status;

    const [data, total] = await Promise.all([
      Booking.find(filter).sort({ createdAt: -1 }),
      Booking.countDocuments(filter),
    ]);

    res.json({ ok: true, data, total });
  } catch (err) {
    console.error('officeHours.listar error:', err);
    res.status(500).json({ error: 'Error listando reservas.' });
  }
};

exports.actualizarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const VALID = ['pendiente', 'confirmado', 'cancelado'];

    if (!VALID.includes(status)) return res.status(400).json({ error: 'Status inválido.' });

    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    if (!booking) return res.status(404).json({ error: 'Reserva no encontrada.' });

    res.json({ ok: true, data: booking });
  } catch (err) {
    console.error('officeHours.actualizarStatus error:', err);
    res.status(500).json({ error: 'Error actualizando status.' });
  }
};

// Devuelve qué slots están tomados para un día dado
exports.slotsOcupados = async (req, res) => {
  try {
    const { dia } = req.query;
    if (!dia) return res.status(400).json({ error: 'Parámetro dia requerido.' });

    const bookings = await Booking.find({ dia, status: { $ne: 'cancelado' } }, 'slot');
    const ocupados = bookings.map(b => b.slot);

    res.json({ ok: true, ocupados });
  } catch (err) {
    console.error('officeHours.slotsOcupados error:', err);
    res.status(500).json({ error: 'Error consultando slots.' });
  }
};
