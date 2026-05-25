import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { api } from "../../../config/api";

type ErpSystem =
  | "SAP S/4 HANA"
  | "SAP ECC"
  | "Oracle EBS R12"
  | "Oracle JD Edwards"
  | "Oracle PeopleSoft"
  | "Microsoft Dynamics 365"
  | "NetSuite"
  | "Otro / Greenfield";

type TransactionVolume = "<10K" | "10K-100K" | "100K-1M" | ">1M";
type Industry = "Servicios financieros" | "Inmobiliario / Centros comerciales" | "Logistica / Distribucion / Transporte" | "Otra";
type PrimaryPain =
  | "Costo total demasiado alto"
  | "Reportes financieros lentos o manuales"
  | "Cierre contable complejo"
  | "Soporte caro o poco disponible"
  | "Obsolescencia / riesgo de continuidad"
  | "Solo explorando";
type DecisionTimeline = "0-3 meses" | "3-6 meses" | "6-12 meses" | "Solo explorando";
type TargetScenario = "Oracle Fusion Cloud" | "OCI + Oracle Fusion" | "Comparar Oracle contra otras opciones" | "No definido";

type FormState = {
  erp: ErpSystem;
  users: number;
  licenseCost: number;
  infraCost: number;
  supportCost: number;
  monthlyTransactions: TransactionVolume;
  industry: Industry;
  primaryPain: PrimaryPain;
  decisionTimeline: DecisionTimeline;
  targetScenario: TargetScenario;
  company: string;
  role: string;
  email: string;
  ndaAccepted: boolean;
};

type Benchmark = {
  savings: number;
  breakeven: number;
};

type TcoResult = {
  totalAnnualCost: number;
  oracleAnnualCost: number;
  currentTCO1y: number;
  currentTCO3y: number;
  currentTCO5y: number;
  currentTCO10y: number;
  oracleTCO1y: number;
  oracleTCO3y: number;
  oracleTCO5y: number;
  oracleTCO10y: number;
  annualSavings: number;
  savings5y: number;
  savings10y: number;
  migrationInvestment: number;
  breakeven: number;
  percentReduction: number;
  qualificationScore: number;
  market?: {
    rationale?: string;
    savingsRateAdjusted?: number;
  };
  recommendation?: {
    level: string;
    nextStep: string;
    summary: string;
  };
};

const ERPS: ErpSystem[] = [
  "SAP S/4 HANA",
  "SAP ECC",
  "Oracle EBS R12",
  "Oracle JD Edwards",
  "Oracle PeopleSoft",
  "Microsoft Dynamics 365",
  "NetSuite",
  "Otro / Greenfield",
];

const TRANSACTION_VOLUMES: TransactionVolume[] = ["<10K", "10K-100K", "100K-1M", ">1M"];

const INDUSTRIES: Industry[] = [
  "Servicios financieros",
  "Inmobiliario / Centros comerciales",
  "Logistica / Distribucion / Transporte",
  "Otra",
];

const PRIMARY_PAINS: PrimaryPain[] = [
  "Costo total demasiado alto",
  "Reportes financieros lentos o manuales",
  "Cierre contable complejo",
  "Soporte caro o poco disponible",
  "Obsolescencia / riesgo de continuidad",
  "Solo explorando",
];

const DECISION_TIMELINES: DecisionTimeline[] = ["0-3 meses", "3-6 meses", "6-12 meses", "Solo explorando"];

const TARGET_SCENARIOS: TargetScenario[] = [
  "Oracle Fusion Cloud",
  "OCI + Oracle Fusion",
  "Comparar Oracle contra otras opciones",
  "No definido",
];

const BENCHMARKS: Record<ErpSystem, Benchmark> = {
  "SAP S/4 HANA": { savings: 0.3, breakeven: 18 },
  "SAP ECC": { savings: 0.35, breakeven: 16 },
  "Oracle EBS R12": { savings: 0.25, breakeven: 14 },
  "Oracle JD Edwards": { savings: 0.2, breakeven: 12 },
  "Oracle PeopleSoft": { savings: 0.22, breakeven: 14 },
  "Microsoft Dynamics 365": { savings: 0.28, breakeven: 18 },
  "NetSuite": { savings: 0.15, breakeven: 20 },
  "Otro / Greenfield": { savings: 0.3, breakeven: 18 },
};

const DEFAULT_FORM: FormState = {
  erp: "SAP S/4 HANA",
  users: 150,
  licenseCost: 260000,
  infraCost: 90000,
  supportCost: 135000,
  monthlyTransactions: "100K-1M",
  industry: "Inmobiliario / Centros comerciales",
  primaryPain: "Costo total demasiado alto",
  decisionTimeline: "3-6 meses",
  targetScenario: "Oracle Fusion Cloud",
  company: "",
  role: "",
  email: "",
  ndaAccepted: false,
};

const FEATURES = [
  { id: "01", title: "ERP actual", text: "SAP, EBS, JDE, PeopleSoft, Dynamics, NetSuite u otro escenario." },
  { id: "02", title: "Costos base", text: "Licencias, infraestructura y soporte anual como base del TCO." },
  { id: "03", title: "Mercado analizado", text: "Benchmark de ahorro ajustado por industria, volumen y dolor operativo." },
  { id: "04", title: "Fit ejecutivo", text: "Score por urgencia, objetivo Oracle y peso financiero del caso." },
];

const fmt = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

const fmtCompact = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 }).format(value);

const clamp = (value: number, min = 0, max = Number.POSITIVE_INFINITY) => {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
};

function calculateTCO(data: FormState) {
  const totalAnnualCost = data.licenseCost + data.infraCost + data.supportCost;
  const benchmark = BENCHMARKS[data.erp];
  const painBoost = data.primaryPain === "Solo explorando" ? 0.96 : 1.05;
  const volumeBoost = data.monthlyTransactions === ">1M" ? 1.12 : data.monthlyTransactions === "100K-1M" ? 1.06 : 1;
  const adjustedSavings = Math.min(Math.max(benchmark.savings * painBoost * volumeBoost, 0.08), 0.42);
  const annualSavings = totalAnnualCost * adjustedSavings;
  const oracleAnnualCost = totalAnnualCost - annualSavings;
  const migrationInvestment = Math.max(totalAnnualCost * 0.42, data.users * 1200, 85000);
  const breakeven = annualSavings > 0 ? Math.max(6, Math.ceil((migrationInvestment / annualSavings) * 12)) : benchmark.breakeven;

  return {
    totalAnnualCost,
    oracleAnnualCost,
    currentTCO1y: totalAnnualCost,
    currentTCO3y: totalAnnualCost * 3,
    currentTCO5y: totalAnnualCost * 5,
    currentTCO10y: totalAnnualCost * 10,
    oracleTCO1y: oracleAnnualCost,
    oracleTCO3y: oracleAnnualCost * 3,
    oracleTCO5y: oracleAnnualCost * 5,
    oracleTCO10y: oracleAnnualCost * 10,
    annualSavings,
    savings5y: annualSavings * 5,
    savings10y: annualSavings * 10,
    migrationInvestment,
    breakeven,
    percentReduction: adjustedSavings * 100,
    qualificationScore: 62,
    market: {
      rationale: "Estimacion local preliminar mientras el benchmark de mercado responde desde backend.",
      savingsRateAdjusted: adjustedSavings,
    },
    recommendation: {
      level: "Estimacion preliminar",
      nextStep: "Validar con endpoint de mercado.",
      summary: "Resultado temporal calculado en cliente.",
    },
  };
}

const toastBase = {
  style: {
    background: "#0A0A0A",
    borderRadius: "4px",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    padding: "14px 18px",
  },
};

function toastOk(message: string) {
  toast.dismiss();
  toast.success(message, {
    ...toastBase,
    style: { ...toastBase.style, border: "1px solid #C9A96E", color: "#C9A96E" },
    icon: null,
  });
}

function toastErr(message: string) {
  toast.dismiss();
  toast.error(message, {
    ...toastBase,
    style: { ...toastBase.style, border: "1px solid #B85450", color: "#B85450" },
    icon: null,
  });
}

function ArrowIcon() {
  return (
    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

function Btn({ children, onClick, disabled = false, className = "" }: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={`btn-primary disabled:cursor-not-allowed disabled:opacity-40 ${className}`}>
      {children}
    </button>
  );
}

const inputBase =
  "w-full bg-[#0A0A0A] px-4 py-3.5 font-mono text-sm text-[#F5F5F5] outline-none border border-[#2A2A2A] transition-all duration-200 focus:border-[#C9A96E]/60 focus:shadow-[0_0_12px_rgba(201,169,110,0.15)] rounded-sm";

function FieldLabel({ children }: { children: ReactNode }) {
  return <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.1em] text-[#888]">{children}</span>;
}

function NumberInput({ label, value, onChange, min = 0, max, prefix, suffix }: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <div className="flex items-center border border-[#2A2A2A] bg-[#0A0A0A] px-4 py-3.5 transition-all duration-200 focus-within:border-[#C9A96E]/60 focus-within:shadow-[0_0_12px_rgba(201,169,110,0.15)] rounded-sm">
        {prefix && <span className="mr-2 font-mono text-sm text-[#888]">{prefix}</span>}
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(event) => onChange(clamp(Number(event.target.value), min, max))}
          className="w-full bg-transparent font-mono text-sm text-[#F5F5F5] outline-none"
        />
        {suffix && <span className="ml-2 font-mono text-xs text-[#888]">{suffix}</span>}
      </div>
    </label>
  );
}

function SelectInput<T extends string>({ label, value, options, onChange }: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <select value={value} onChange={(event) => onChange(event.target.value as T)} className={`${inputBase} cursor-pointer appearance-none`}>
        {options.map((option) => (
          <option key={option} value={option} className="bg-[#0A0A0A]">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextInput({ label, value, onChange, placeholder, type = "text" }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email";
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputBase} placeholder:text-[#444]`}
      />
    </label>
  );
}

function MetricBox({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`${accent ? "border-[#C9A96E]/40 bg-[#C9A96E] text-black" : "border-[#1A1A1A] bg-[#111111] text-[#F5F5F5]"} border p-5 rounded-sm`}>
      <p className={`mb-2 font-mono text-[9px] uppercase tracking-[0.15em] ${accent ? "text-black/70" : "text-[#888]"}`}>{label}</p>
      <p className="font-mono text-lg">{value}</p>
    </div>
  );
}

function ComparisonTable({ tco }: { tco: TcoResult }) {
  const rows = [
    { period: "Año 1", current: tco.currentTCO1y, oracle: tco.oracleTCO1y },
    { period: "Año 3", current: tco.currentTCO3y, oracle: tco.oracleTCO3y },
    { period: "Año 5", current: tco.currentTCO5y, oracle: tco.oracleTCO5y },
    { period: "Año 10", current: tco.currentTCO10y, oracle: tco.oracleTCO10y },
  ];

  return (
    <div className="overflow-hidden border border-[#1A1A1A] bg-[#0A0A0A] rounded-sm">
      <div className="grid grid-cols-[0.8fr_1fr_1fr] border-b border-[#1A1A1A] bg-[#111111] px-4 py-3 font-mono text-[9px] uppercase tracking-[0.14em] text-[#888]">
        <span>Periodo</span>
        <span>Situacion actual</span>
        <span>Oracle Fusion</span>
      </div>
      {rows.map((row) => (
        <div key={row.period} className="grid grid-cols-[0.8fr_1fr_1fr] border-b border-[#1A1A1A] px-4 py-4 last:border-0">
          <span className="font-mono text-xs text-[#888]">{row.period}</span>
          <span className="font-mono text-sm text-[#F5F5F5]">{fmt(row.current)}</span>
          <span className="font-mono text-sm text-[#C9A96E]">{fmt(row.oracle)}</span>
        </div>
      ))}
    </div>
  );
}

function SavingsChart({ currentTCO10y, oracleTCO10y }: { currentTCO10y: number; oracleTCO10y: number }) {
  const max = Math.max(currentTCO10y, oracleTCO10y, 1);
  const bars = [
    { label: "Actual 10 años", value: currentTCO10y, color: "bg-[#444]" },
    { label: "Oracle 10 años", value: oracleTCO10y, color: "bg-[#C9A96E]" },
  ];

  return (
    <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-6 rounded-sm">
      <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.15em] text-[#C9A96E]">Grafico simple de ahorro acumulado</p>
      <div className="space-y-5">
        {bars.map((bar) => (
          <div key={bar.label}>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-sans text-xs text-[#888]">{bar.label}</span>
              <span className="font-mono text-sm text-[#F5F5F5]">{fmtCompact(bar.value)}</span>
            </div>
            <div className="h-1.5 w-full bg-[#161616] rounded-full">
              <div className={`h-full ${bar.color} rounded-full`} style={{ width: `${(bar.value / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeadPreviewCard({ onOpen }: { onOpen: () => void }) {
  const preview = calculateTCO(DEFAULT_FORM);
  const rows = [
    { label: "ERP actual", value: DEFAULT_FORM.erp },
    { label: "Usuarios", value: String(DEFAULT_FORM.users) },
    { label: "Costo anual actual", value: fmt(DEFAULT_FORM.licenseCost + DEFAULT_FORM.infraCost + DEFAULT_FORM.supportCost) },
    { label: "Reduccion estimada", value: `${preview.percentReduction}%` },
    { label: "Ahorro 5 años", value: fmt(preview.savings5y) },
    { label: "Breakeven", value: `${preview.breakeven} meses` },
  ];

  return (
    <article className="relative w-full max-w-[460px] border border-[#2A2A2A] bg-[#0A0A0A] p-8 shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-shadow duration-500 hover:shadow-[0_25px_60px_rgba(201,169,110,0.1)] md:p-10 rounded-sm">
      <div className="mb-8 border-b border-[#1A1A1A] pb-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-[#C9A96E] animate-pulse rounded-full" />
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C9A96E]">Ejemplo estimado</p>
        </div>
        <p className="font-serif text-2xl text-[#F5F5F5]">ERP TCO <span className="text-[#C9A96E]">Comparator</span></p>
      </div>
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between border-b border-[#1A1A1A] pb-3 last:border-0 last:pb-0">
            <span className="font-sans text-[13px] text-[#888]">{row.label}</span>
            <span className="text-right font-mono text-sm text-[#F5F5F5]">{row.value}</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onOpen}
        className="group mt-8 w-full border border-[#C9A96E]/20 bg-[#C9A96E]/5 p-6 text-left transition-all duration-300 hover:border-[#C9A96E]/60 hover:bg-[#C9A96E]/10 hover:shadow-[0_0_20px_rgba(201,169,110,0.15)] rounded-sm"
      >
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[#C9A96E] transition-colors duration-300">
          Ahorro 10 años estimado
        </p>
        <p className="font-serif text-4xl text-[#F5F5F5] transition-colors duration-300 group-hover:text-[#C9A96E]">
          {fmtCompact(preview.savings10y)}
        </p>
      </button>
    </article>
  );
}

function CalculatorModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [hasUserEdited, setHasUserEdited] = useState(false);
  const fallbackTco = useMemo(() => calculateTCO(form), [form]);
  const [tco, setTco] = useState<TcoResult>(() => calculateTCO(DEFAULT_FORM));
  const [calculating, setCalculating] = useState(false);

  const update = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setHasUserEdited(true);
    setForm((current) => ({ ...current, [key]: value }));
  }, []);

  useEffect(() => {
    if (!open) return;

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        setCalculating(true);
        const { data } = await api.post("/erp-tco/calculate", form, {
          signal: controller.signal,
        });
        setTco(data.result);
      } catch (error: any) {
        if (error.name !== "CanceledError" && error.code !== "ERR_CANCELED") {
          setTco(fallbackTco);
        }
      } finally {
        setCalculating(false);
      }
    }, 220);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [fallbackTco, form, open]);

  const requestAnalysis = useCallback(async () => {
    const publicEmail = /(gmail|hotmail|outlook|yahoo)\./i.test(form.email);

    if (!form.company.trim() || !form.role.trim() || !form.email.trim()) {
      toastErr("Completa empresa, cargo y email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || publicEmail) {
      toastErr("Usa un email corporativo");
      return;
    }

    if (!form.ndaAccepted) {
      toastErr("Acepta NDA para continuar");
      return;
    }

    try {
      const { data } = await api.post("/erp-tco/calculate", form);
      setTco(data.result);
      toastOk(`Benchmark listo: ${data.result.recommendation?.level || "TCO calculado"}`);
    } catch {
      toastErr("No se pudo calcular el benchmark");
    }
  }, [form]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl">
      <div className="h-full overflow-y-auto overscroll-contain px-4 py-6 md:px-6 md:py-10">
        <div className="relative mx-auto w-full max-w-[1160px] overflow-hidden border border-[#2A2A2A] bg-[#050505]/95 shadow-[0_0_80px_rgba(0,0,0,0.9),0_0_20px_rgba(201,169,110,0.1)] rounded-sm">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center border border-[#2A2A2A] bg-[#050505]/80 text-[#888] transition-all duration-300 hover:border-[#C9A96E] hover:bg-[#C9A96E]/10 hover:text-[#C9A96E] rounded-sm"
            aria-label="Cerrar calculadora"
          >
            <CloseIcon />
          </button>

          <div className="grid lg:grid-cols-[0.95fr_1.15fr]">
            <div className="p-8 md:p-12 lg:border-r lg:border-[#1A1A1A]">
              <div className="mb-8">
                <div className="mb-5 inline-flex border border-[#C9A96E]/30 bg-[#C9A96E]/10 px-3 py-1 rounded-sm">
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#C9A96E]">
                    8 preguntas · resultado inmediato
                  </span>
                </div>
                <h3 className="font-serif text-3xl text-[#F5F5F5] md:text-4xl">Configura tu TCO actual</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#888]">
                  Captura costos anuales aproximados. El comparativo usa benchmarks por plataforma para estimar el equivalente Oracle Fusion Cloud.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <SelectInput label="ERP actual" value={form.erp} options={ERPS} onChange={(value) => update("erp", value)} />
                <NumberInput label="Usuarios totales" value={form.users} min={10} max={5000} onChange={(value) => update("users", value)} />
                <NumberInput label="Licencias anuales" value={form.licenseCost} min={10000} max={5000000} prefix="$" onChange={(value) => update("licenseCost", value)} />
                <NumberInput label="Infraestructura anual" value={form.infraCost} min={0} max={2000000} prefix="$" onChange={(value) => update("infraCost", value)} />
                <NumberInput label="Soporte / consultoria anual" value={form.supportCost} min={0} max={3000000} prefix="$" onChange={(value) => update("supportCost", value)} />
                <SelectInput label="Transacciones mensuales" value={form.monthlyTransactions} options={TRANSACTION_VOLUMES} onChange={(value) => update("monthlyTransactions", value)} />
                <div className="sm:col-span-2">
                  <SelectInput label="Industria" value={form.industry} options={INDUSTRIES} onChange={(value) => update("industry", value)} />
                </div>
                <div className="sm:col-span-2">
                  <SelectInput label="Dolor principal" value={form.primaryPain} options={PRIMARY_PAINS} onChange={(value) => update("primaryPain", value)} />
                </div>
                <SelectInput label="Horizonte de decision" value={form.decisionTimeline} options={DECISION_TIMELINES} onChange={(value) => update("decisionTimeline", value)} />
                <SelectInput label="Escenario objetivo" value={form.targetScenario} options={TARGET_SCENARIOS} onChange={(value) => update("targetScenario", value)} />
              </div>

              <div className="mt-10 border-t border-[#1A1A1A] pt-8">
                <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.15em] text-[#C9A96E]">Analisis con datos reales</p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextInput label="Empresa" value={form.company} placeholder="Empresa" onChange={(value) => update("company", value)} />
                  <TextInput label="Cargo" value={form.role} placeholder="CFO / CIO / CTO" onChange={(value) => update("role", value)} />
                  <div className="sm:col-span-2">
                    <TextInput label="Email corporativo" type="email" value={form.email} placeholder="nombre@empresa.com" onChange={(value) => update("email", value)} />
                  </div>
                </div>
                <label className="mt-5 flex items-start gap-3 font-sans text-xs leading-relaxed text-[#888]">
                  <input
                    type="checkbox"
                    checked={form.ndaAccepted}
                    onChange={(event) => update("ndaAccepted", event.target.checked)}
                    className="mt-1 h-4 w-4 accent-[#C9A96E]"
                  />
                  Acepto que FABRIC contacte a mi empresa para preparar un TCO Comparator personalizado bajo NDA. El cargado de facturas, reportes de licencias o contratos se solicita en el siguiente paso.
                </label>
                <div className="mt-8">
                  <Btn onClick={requestAnalysis} className="w-full">
                    Solicitar analisis con mis datos reales
                    <ArrowIcon />
                  </Btn>
                </div>
              </div>
            </div>

            <div className="bg-[#0A0A0A] p-8 md:p-12">
              <div className="mb-8">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[#C9A96E]">
                  {calculating ? "Calculando benchmark de mercado" : hasUserEdited ? "TCO comparativo estimado" : "Ejemplo estimado"}
                </p>
                <h4 className="font-serif text-2xl text-[#F5F5F5]">
                  {hasUserEdited
                    ? `${form.erp}, ${form.users.toLocaleString("en-US")} usuarios`
                    : "Completa tus datos para ver tu TCO comparativo"}
                </h4>
              </div>

              <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <MetricBox label="Ahorro 5 años" value={fmt(tco.savings5y)} />
                <MetricBox label="Ahorro 10 años" value={fmtCompact(tco.savings10y)} accent />
                <MetricBox label="Reduccion total" value={`${Math.round(tco.percentReduction)}%`} />
                <MetricBox label="Breakeven migracion" value={`${tco.breakeven} meses`} />
                <MetricBox label="Fit ejecutivo" value={`${Math.round(tco.qualificationScore)} / 100`} />
                <MetricBox label="Inversion estimada" value={fmtCompact(tco.migrationInvestment)} />
              </div>

              <div className="space-y-6">
                {tco.recommendation && (
                  <div className="border border-[#C9A96E]/25 bg-[#C9A96E]/[0.04] p-5 rounded-sm">
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[#C9A96E]">{tco.recommendation.level}</p>
                    <p className="font-sans text-sm leading-relaxed text-[#F5F5F5]/80">{tco.recommendation.summary}</p>
                    <p className="mt-3 font-sans text-xs leading-relaxed text-[#888]">{tco.recommendation.nextStep}</p>
                  </div>
                )}
                <ComparisonTable tco={tco} />
                <SavingsChart currentTCO10y={tco.currentTCO10y} oracleTCO10y={tco.oracleTCO10y} />
              </div>

              <div className="mt-8 border-t border-[#1A1A1A] pt-6 font-sans text-xs leading-relaxed text-[#888]">
                Resultado calculado por backend con benchmarks de mercado por ERP, industria, volumen, dolor operativo y horizonte de decision. No consulta base de datos para calcular este comparativo.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function S03TcoCalculator() {
  const [open, setOpen] = useState(false);

  return (
    <section id="tco" className="relative overflow-hidden bg-[#050505] px-6 py-24 md:px-12 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="pointer-events-none absolute left-0 right-0 top-0 -z-10 m-auto h-[400px] w-[400px] bg-[#C9A96E] opacity-[0.05] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1300px]">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <div className="relative flex flex-col justify-center">
            <div className="mb-8 inline-flex w-fit items-center gap-2 border border-[#C9A96E]/30 bg-[#C9A96E]/5 px-4 py-2 rounded-sm">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#C9A96E]">
                Lead Magnet · ERP TCO Comparator
              </span>
            </div>

            <h2 className="font-serif text-[38px] leading-[1.1] tracking-[-0.04em] text-[#F5F5F5] md:text-[52px] lg:text-[60px]">
              ¿Cuánto te está costando realmente tu ERP actual?
            </h2>

            <p className="mt-8 max-w-2xl font-sans text-base leading-relaxed text-[#888] md:text-lg">
              Comparativo Oracle Fusion vs tu situacion actual. Selecciona tu ERP, captura costos anuales aproximados y visualiza TCO estimado a 1, 3, 5 y 10 años.
            </p>

            <div className="mt-12 flex flex-col items-start gap-6">
              <Btn onClick={() => setOpen(true)}>
                Calcular TCO
                <ArrowIcon />
              </Btn>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#C9A96E]/70">
                8 preguntas · benchmarks por ERP · CTA con datos reales
              </p>
            </div>

            <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:hidden">
              {FEATURES.map((feature) => (
                <article key={feature.id} className="border border-[#1A1A1A] bg-[#0A0A0A] p-6 rounded-sm">
                  <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.15em] text-[#C9A96E]">{feature.id}</p>
                  <h3 className="mb-2 font-serif text-lg text-[#F5F5F5]">{feature.title}</h3>
                  <p className="font-sans text-[13px] leading-relaxed text-[#888]">{feature.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative hidden flex-col justify-center lg:flex">
            <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-[#C9A96E] opacity-[0.03] blur-[100px]" />
            <LeadPreviewCard onOpen={() => setOpen(true)} />
          </div>
        </div>

        <div className="mt-24 hidden grid-cols-1 gap-6 sm:grid-cols-2 lg:grid lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <article key={feature.id} className="border border-[#1A1A1A] bg-[#0A0A0A] p-6 transition-all duration-300 hover:border-[#C9A96E]/40 rounded-sm">
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.15em] text-[#C9A96E]">{feature.id}</p>
              <h3 className="mb-2 font-serif text-lg text-[#F5F5F5]">{feature.title}</h3>
              <p className="font-sans text-[13px] leading-relaxed text-[#888]">{feature.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 flex justify-center lg:hidden">
          <LeadPreviewCard onOpen={() => setOpen(true)} />
        </div>
      </div>

      <CalculatorModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
