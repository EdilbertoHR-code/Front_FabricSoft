import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import type { MetricaPublica } from "../models/types.js";

const router = Router();

let metricas: MetricaPublica[] = [
  { id: "rescates", label: "Rescates Oracle", valor: 14 },
  { id: "proyectos-activos", label: "Proyectos activos", valor: 9 },
  { id: "slots-totales", label: "Slots totales", valor: 12 },
  { id: "waitlist", label: "En wait list", valor: 7 },
];

// Pública — el frontend la consume sin auth
router.get("/", (_req, res) => {
  res.json({ success: true, data: metricas });
});

// Solo admin puede editar
router.patch("/:id", requireAuth, (req, res) => {
  const idx = metricas.findIndex((m) => m.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ success: false, error: "Métrica no encontrada" });
    return;
  }
  metricas[idx] = { ...metricas[idx], ...req.body };
  res.json({ success: true, data: metricas[idx] });
});

export default router;
