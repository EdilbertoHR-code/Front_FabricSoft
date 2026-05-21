import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import type { OfficeHoursSlot } from "../models/types.js";

const router = Router();

let slots: OfficeHoursSlot[] = [];

// Pública — muestra disponibilidad
router.get("/", (_req, res) => {
  res.json({ success: true, data: slots });
});

// Reservar un slot (usuario público)
router.post("/:id/reservar", (req, res) => {
  const idx = slots.findIndex((s) => s.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ success: false, error: "Slot no encontrado" });
    return;
  }
  if (slots[idx].status !== "available") {
    res.status(409).json({ success: false, error: "Slot no disponible" });
    return;
  }
  slots[idx] = { ...slots[idx], status: "reserved", ...req.body };
  res.json({ success: true, data: slots[idx] });
});

// Admin: confirmar / liberar / bloquear
router.patch("/:id", requireAuth, (req, res) => {
  const idx = slots.findIndex((s) => s.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ success: false, error: "Slot no encontrado" });
    return;
  }
  slots[idx] = { ...slots[idx], ...req.body };
  res.json({ success: true, data: slots[idx] });
});

export default router;
