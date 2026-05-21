import express from "express";
import cors from "cors";
import "dotenv/config";

import leadsRouter from "./routes/leads.js";
import metricasRouter from "./routes/metricas.js";
import officeHoursRouter from "./routes/officeHours.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors({ origin: process.env.FRONTEND_URL ?? "http://localhost:5173" }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/leads", leadsRouter);
app.use("/api/metricas", metricasRouter);
app.use("/api/office-hours", officeHoursRouter);

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
