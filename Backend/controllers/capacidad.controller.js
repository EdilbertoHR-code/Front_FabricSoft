const Capacidad = require('../models/model.capacidad');

async function getSingleton() {
  let doc = await Capacidad.findOne();
  if (!doc) doc = await Capacidad.create({});
  if (!doc.deadlineQ3 || !/^\d{4}-\d{2}-\d{2}T/.test(doc.deadlineQ3) || Number.isNaN(new Date(doc.deadlineQ3).getTime())) {
    await Capacidad.updateOne(
      { _id: doc._id },
      { $set: { deadlineQ3: '2026-07-30T23:59:59-06:00' } },
      { runValidators: false }
    );
    doc.deadlineQ3 = '2026-07-30T23:59:59-06:00';
  }
  return doc;
}

exports.get = async (req, res) => {
  try {
    const doc = await getSingleton();
    res.json({ ok: true, data: doc });
  } catch (err) {
    console.error('capacidad.get error:', err);
    res.status(500).json({ error: 'Error obteniendo capacidad.' });
  }
};

exports.update = async (req, res) => {
  try {
    const { slots, admissionQuarters, deadlineQ3, waitlist } = req.body;
    const doc = await getSingleton();

    if (slots)             doc.slots             = slots;
    if (admissionQuarters) doc.admissionQuarters = admissionQuarters;
    if (deadlineQ3)        doc.deadlineQ3        = deadlineQ3;
    if (waitlist)          doc.waitlist          = waitlist;

    await doc.save();
    res.json({ ok: true, data: doc });
  } catch (err) {
    console.error('capacidad.update error:', err);
    res.status(500).json({ error: 'Error actualizando capacidad.' });
  }
};

exports.updateSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const VALID = ['disponible', 'activo', 'reservado'];

    if (!VALID.includes(status)) return res.status(400).json({ error: 'Status inválido.' });

    const doc = await getSingleton();
    const slot = doc.slots.find(s => s.id === Number(id));
    if (!slot) return res.status(404).json({ error: 'Slot no encontrado.' });

    slot.status = status;
    await doc.save();
    res.json({ ok: true, data: doc });
  } catch (err) {
    console.error('capacidad.updateSlot error:', err);
    res.status(500).json({ error: 'Error actualizando slot.' });
  }
};
