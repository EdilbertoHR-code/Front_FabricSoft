import type { Request, Response, NextFunction } from "express";

// Middleware de autenticación — verificar token de Clerk
// Por ahora valida API key simple; cuando se integre Clerk backend SDK, reemplazar aquí
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["x-api-key"];
  const expected = process.env.API_KEY;

  if (!expected || apiKey !== expected) {
    res.status(401).json({ success: false, error: "No autorizado" });
    return;
  }
  next();
}
