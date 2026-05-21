import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import type { Lead } from "../models/types.js";

const router = Router();

// TODO: reemplazar con llamadas a base de datos
let leads: Lead[] = [];

router.get("/", requireAuth, (_req, res) => {
  res.json({ success: true, data: leads });
});

router.post("/", requireAuth, (req, res) => {
  const lead: Lead = {
    id: crypto.randomUUID(),
    creadoEn: new Date().toISOString(),
    actualizadoEn: new Date().toISOString(),
    ...req.body,
  };
  leads.push(lead);
  res.status(201).json({ success: true, data: lead });
});

router.patch("/:id", requireAuth, (req, res) => {
  const idx = leads.findIndex((l) => l.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ success: false, error: "Lead no encontrado" });
    return;
  }
  leads[idx] = { ...leads[idx], ...req.body, actualizadoEn: new Date().toISOString() };
  res.json({ success: true, data: leads[idx] });
});

export default router;
