// Tipos compartidos entre frontend y backend
// Estos deben mantenerse en sync con src/store/fabricStore.ts

export type LeadStatus = "nuevo" | "contactado" | "calificado" | "rechazado" | "convertido";
export type Industria = "financiero" | "inmobiliario" | "logistica" | "otro";
export type SlotStatus = "available" | "reserved" | "confirmed" | "blocked";

export interface Lead {
  id: string;
  nombre: string;
  empresa: string;
  industria: Industria;
  email: string;
  telefono?: string;
  status: LeadStatus;
  notas?: string;
  creadoEn: string;
  actualizadoEn: string;
}

export interface OfficeHoursSlot {
  id: string;
  fecha: string;
  hora: string;
  status: SlotStatus;
  leadId?: string;
  leadNombre?: string;
  empresa?: string;
}

export interface MetricaPublica {
  id: string;
  label: string;
  valor: string | number;
  descripcion?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
