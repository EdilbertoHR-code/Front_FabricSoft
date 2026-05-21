import { useEffect, useMemo, useRef, useState, type ElementType, type ReactNode } from "react";

type CurrentSystem = "SAP S/4 HANA" | "Oracle EBS" | "JD Edwards" | "PeopleSoft" | "Microsoft Dynamics";

type FormState = {
  currentSystem: CurrentSystem;
  users: number;
  currentYearOne: number;
  oracleYearOne: number;
  migrationCost: number;
  manualReports: number;
  closingDays: number;
  adoptionRate: number;
};

type ToastState = {
  type: "success" | "error";
  message: string;
} | null;

type TextScrambleProps = {
  children: string;
  as?: ElementType;
  className?: string;
  trigger?: boolean;
  duration?: number;
  speed?: number;
  characterSet?: string;
};

type IconName = "calculator" | "shield" | "chart" | "scan" | "database" | "cloud" | "arrow" | "close";

const systems: CurrentSystem[] = ["SAP S/4 HANA", "Oracle EBS", "JD Edwards", "PeopleSoft", "Microsoft Dynamics"];

const defaultForm: FormState = {
  currentSystem: "SAP S/4 HANA",
  users: 150,
  currentYearOne: 485000,
  oracleYearOne: 310000,
  migrationCost: 372000,
  manualReports: 12,
  closingDays: 15,
  adoptionRate: 72,
};

const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$%#";

const features = [
  {
    id: "01",
    title: "Análisis 5 y 10 años",
    body: "Costo total comparativo entre ERP actual y Oracle Fusion.",
    icon: "chart" as IconName,
  },
  {
    id: "02",
    title: "Breakeven estimado",
    body: "Meses necesarios para recuperar la inversión de migración.",
    icon: "scan" as IconName,
  },
  {
    id: "03",
    title: "ROI proyectado",
    body: "Proyección financiera con benchmarks Oracle y operación real.",
    icon: "cloud" as IconName,
  },
  {
    id: "04",
    title: "Análisis bajo NDA",
    body: "Evaluación detallada con datos reales y confidenciales.",
    icon: "shield" as IconName,
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompact(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function clampNumber(value: number, min = 0, max = Number.POSITIVE_INFINITY) {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.18, rootMargin: "-80px 0px -80px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView] as const;
}

function TextScramble({
  children,
  as: Component = "span",
  className,
  trigger = true,
  duration = 0.85,
  speed = 0.028,
  characterSet = scrambleChars,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setDisplayText(children);
  }, [children]);

  useEffect(() => {
    if (!trigger || isAnimating) return;

    setIsAnimating(true);
    const steps = Math.max(1, Math.floor(duration / speed));
    let step = 0;

    const interval = window.setInterval(() => {
      const progress = step / steps;
      let output = "";

      for (let index = 0; index < children.length; index += 1) {
        const char = children[index];

        if (char === " ") {
          output += " ";
          continue;
        }

        output += progress * children.length > index ? char : characterSet[Math.floor(Math.random() * characterSet.length)];
      }

      setDisplayText(output);
      step += 1;

      if (step > steps) {
        window.clearInterval(interval);
        setDisplayText(children);
        setIsAnimating(false);
      }
    }, speed * 1000);

    return () => window.clearInterval(interval);
  }, [characterSet, children, duration, isAnimating, speed, trigger]);

  return <Component className={className}>{displayText}</Component>;
}

function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  if (name === "close") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "arrow") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "calculator") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="3" width="14" height="18" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 7H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 11H8.01M12 11H12.01M16 11H16.01M8 15H8.01M12 15H12.01M16 15H16.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3.5L18.5 6.2V11.2C18.5 15.5 15.8 19.3 12 20.5C8.2 19.3 5.5 15.5 5.5 11.2V6.2L12 3.5Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 12L11 14L15.5 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "scan") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 8V5H8M16 5H20V8M20 16V20H16M8 20H4V16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M7 12H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "database") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M19 6.5C19 8.4 15.9 10 12 10C8.1 10 5 8.4 5 6.5C5 4.6 8.1 3 12 3C15.9 3 19 4.6 19 6.5Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M5 6.5V17.5C5 19.4 8.1 21 12 21C15.9 21 19 19.4 19 17.5V6.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M5 12C5 13.9 8.1 15.5 12 15.5C15.9 15.5 19 13.9 19 12" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (name === "cloud") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7.5 18H17C19.2 18 21 16.2 21 14C21 12 19.5 10.4 17.6 10.1C16.9 7.7 14.7 6 12 6C9.3 6 7.1 7.8 6.4 10.2C4.5 10.6 3 12.2 3 14.2C3 16.3 5 18 7.5 18Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 19H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7 16V10M12 16V6M17 16V12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function FinancialButton({ children, onClick, className = "" }: { children: ReactNode; onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden border border-border-strong bg-transparent px-8 py-4 font-technical text-[11px] font-black uppercase tracking-[0.22em] text-text-primary transition duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent-soft hover:text-accent hover:shadow-[0_0_34px_rgba(201,169,110,0.12)] ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 translate-y-full bg-accent-soft transition-transform duration-300 group-hover:translate-y-0" />
      <span className="pointer-events-none absolute left-0 top-0 h-full w-[2px] bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
    </button>
  );
}

function useTcoCalculation(form: FormState) {
  return useMemo(() => {
    const baseAnnualSaving = Math.max(form.currentYearOne - form.oracleYearOne, 0);
    const manualReportRecovery = form.manualReports * 3500;
    const closeRecovery = Math.max(form.closingDays - 10, 0) * 6200;
    const adoptionFactor = form.adoptionRate < 70 ? (70 - form.adoptionRate) * form.users * 38 : 0;

    const annualSaving = baseAnnualSaving + manualReportRecovery + closeRecovery + adoptionFactor;
    const savingFiveYears = annualSaving * 5;
    const savingTenYears = annualSaving * 10 * 1.532;
    const breakevenMonths = annualSaving > 0 ? Math.ceil((form.migrationCost / annualSaving) * 12) : 0;
    const roiFiveYears = form.migrationCost > 0 ? Math.round(((savingFiveYears - form.migrationCost) / form.migrationCost) * 100) : 0;

    const currentTcoFiveYears = form.currentYearOne * 5 + manualReportRecovery * 5 + closeRecovery * 5 + adoptionFactor * 5;
    const oracleTcoFiveYears = form.oracleYearOne * 5 + form.migrationCost;

    return {
      annualSaving,
      savingFiveYears,
      savingTenYears,
      breakevenMonths,
      roiFiveYears,
      currentTcoFiveYears,
      oracleTcoFiveYears,
    };
  }, [form]);
}

function SingleToast({ toast }: { toast: ToastState }) {
  if (!toast) return null;

  return (
    <div className="fixed right-5 top-5 z-[70] animate-fade-in-down border border-border-strong bg-bg-base/95 px-4 py-3 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-md">
      <p className={`font-technical text-[9px] font-black uppercase tracking-[0.2em] ${toast.type === "success" ? "text-accent" : "text-[#B85450]"}`}>
        {toast.type === "success" ? "Validado" : "Revisar datos"}
      </p>
      <p className="mt-1 max-w-[280px] text-sm leading-6 text-text-secondary">{toast.message}</p>
    </div>
  );
}

function NumberInput({ label, value, onChange, prefix, suffix }: { label: string; value: number; onChange: (value: number) => void; prefix?: string; suffix?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block font-technical text-[8px] font-black uppercase tracking-[0.18em] text-accent/75">{label}</span>
      <div className="flex items-center border border-border bg-bg-base/85 px-3.5 py-2.5 transition duration-300 focus-within:border-accent/70 focus-within:bg-bg-elevated/70">
        {prefix ? <span className="mr-2 font-technical text-[11px] text-accent/75">{prefix}</span> : null}
        <input
          type="number"
          min={0}
          value={value}
          onChange={(event) => onChange(clampNumber(Number(event.target.value)))}
          className="w-full bg-transparent font-technical text-xs text-text-primary outline-none placeholder:text-text-tertiary"
        />
        {suffix ? <span className="ml-2 font-technical text-[11px] text-text-tertiary">{suffix}</span> : null}
      </div>
    </label>
  );
}

function SelectInput({ value, onChange }: { value: CurrentSystem; onChange: (value: CurrentSystem) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block font-technical text-[8px] font-black uppercase tracking-[0.18em] text-accent/75">Sistema actual</span>
      <select value={value} onChange={(event) => onChange(event.target.value as CurrentSystem)} className="w-full border border-border bg-bg-base/85 px-3.5 py-2.5 font-technical text-xs text-text-primary outline-none transition duration-300 focus:border-accent/70">
        {systems.map((system) => (
          <option key={system} value={system} className="bg-bg-base text-text-primary">
            {system}
          </option>
        ))}
      </select>
    </label>
  );
}

function ResultChart({ currentTcoFiveYears, oracleTcoFiveYears, savingFiveYears }: ReturnType<typeof useTcoCalculation>) {
  const max = Math.max(currentTcoFiveYears, oracleTcoFiveYears, savingFiveYears, 1);

  return (
    <div className="border border-border bg-bg-panel/72 p-5">
      <p className="font-technical text-[9px] font-black uppercase tracking-[0.22em] text-accent/80">Análisis financiero</p>

      <div className="mt-5 space-y-4">
        {[
          { label: "TCO actual 5 años", value: currentTcoFiveYears, color: "bg-border-strong" },
          { label: "TCO Oracle 5 años", value: oracleTcoFiveYears, color: "bg-accent/70" },
          { label: "Ahorro estimado", value: savingFiveYears, color: "bg-accent" },
        ].map((item, index) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between gap-4">
              <span className="font-technical text-[8px] font-black uppercase tracking-[0.16em] text-text-tertiary">{item.label}</span>
              <span className="font-technical text-xs font-black text-text-primary">{formatCompact(item.value)}</span>
            </div>
            <div className="h-2 overflow-hidden bg-bg-base">
              <div className={`h-full ${item.color} transition-all duration-700`} style={{ width: `${(item.value / max) * 100}%`, transitionDelay: `${index * 90}ms` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureCard({ feature, index, visible }: { feature: (typeof features)[number]; index: number; visible: boolean }) {
  return (
    <article
      className={`group relative min-h-[210px] overflow-hidden border border-border bg-bg-panel/66 p-5 transition-all duration-700 hover:-translate-y-1 hover:border-accent/55 hover:bg-bg-elevated/75 ${visible ? "translate-y-0 opacity-100 blur-0" : "translate-y-7 opacity-0 blur-sm"}`}
      style={{ transitionDelay: `${index * 95 + 150}ms` }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-accent/55 to-transparent transition-transform duration-700" style={{ transform: visible ? "scaleX(1)" : "scaleX(0)", transitionDelay: `${index * 120 + 260}ms` }} />
      <div className="flex h-10 w-10 items-center justify-center border border-accent/25 bg-accent-soft text-accent">
        <Icon name={feature.icon} className="h-4 w-4" />
      </div>
      <span className="mt-9 inline-flex bg-accent-soft px-2 py-1 font-technical text-[8px] font-black uppercase tracking-[0.18em] text-accent">{feature.id}</span>
      <h3 className="mt-5 font-technical text-[11px] font-black uppercase leading-5 tracking-[0.18em] text-text-primary">{feature.title}</h3>
      <p className="mt-3 text-sm leading-6 text-text-secondary">{feature.body}</p>
    </article>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-border/80 pb-3 last:border-b-0 last:pb-0">
      <span className="font-technical text-[8.5px] font-black uppercase tracking-[0.18em] text-text-tertiary">{label}</span>
      <span className="font-technical text-sm font-black text-text-primary">{value}</span>
    </div>
  );
}

function MiniChart() {
  return (
    <div className="mt-5 border border-border bg-bg-base/70 p-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="font-technical text-[9px] font-black uppercase tracking-[0.2em] text-accent/80">TCO analysis</p>
        <span className="font-technical text-[9px] font-black text-text-tertiary">5Y</span>
      </div>

      {[
        { label: "Actual", width: "100%", value: "$2.4M", accent: false },
        { label: "Oracle", width: "54%", value: "$1.6M", accent: true },
        { label: "Ahorro", width: "72%", value: "$1.24M", accent: true },
      ].map((bar, index) => (
        <div key={bar.label} className="mb-4 last:mb-0">
          <div className="mb-2 flex items-center justify-between gap-4">
            <span className="font-technical text-[8px] font-black uppercase tracking-[0.16em] text-text-tertiary">{bar.label}</span>
            <span className="font-technical text-[10px] font-black text-text-primary">{bar.value}</span>
          </div>
          <div className="h-2 overflow-hidden bg-bg-panel">
            <div className={`h-full ${bar.accent ? "bg-accent" : "bg-border-strong"} transition-all duration-1000`} style={{ width: bar.width, transitionDelay: `${index * 100}ms` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function LeadPreviewCard({ onOpen, visible }: { onOpen: () => void; visible: boolean }) {
  const rows = [
    { label: "Sistema actual", value: "SAP S/4 HANA" },
    { label: "Usuarios", value: "150" },
    { label: "Año 1 actual", value: "$485,000" },
    { label: "Año 1 Oracle", value: "$310,000" },
    { label: "Ahorro 5 años", value: "$1,240,000" },
    { label: "Breakeven", value: "18 meses" },
  ];

  return (
    <article className={`fabric-panel relative w-full max-w-[440px] overflow-hidden bg-bg-panel/82 p-5 shadow-[0_30px_110px_rgba(0,0,0,0.48)] backdrop-blur-xl transition-all duration-700 md:p-6 ${visible ? "translate-y-0 scale-100 opacity-100 blur-0" : "translate-y-8 scale-[0.985] opacity-0 blur-sm"}`} style={{ transitionDelay: "220ms" }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/75 to-transparent" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />

      <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <p className="font-technical text-[9px] font-black uppercase tracking-[0.24em] text-accent">Live Preview</p>
          <p className="mt-2 text-sm text-text-secondary">Modelo TCO ejecutivo</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center border border-accent/30 bg-accent-soft text-accent">
          <Icon name="calculator" />
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {rows.map((row, index) => (
          <div key={row.label} className={`transition-all duration-700 ${visible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`} style={{ transitionDelay: `${320 + index * 65}ms` }}>
            <PreviewRow label={row.label} value={row.value} />
          </div>
        ))}
      </div>

      <MiniChart />

      <button type="button" onClick={onOpen} className="group mt-5 w-full border border-accent/30 bg-accent-soft p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent">
        <p className="font-technical text-[9px] font-black uppercase tracking-[0.22em] text-accent transition-colors group-hover:text-bg-base">Ahorro 10 años</p>
        <p className="mt-2 font-display text-4xl font-semibold leading-none text-text-primary transition-colors group-hover:text-bg-base">$3.8M</p>
      </button>

      <FinancialButton onClick={onOpen} className="mt-5 w-full">
        Calcular ahorro
        <Icon name="arrow" className="h-4 w-4" />
      </FinancialButton>
    </article>
  );
}

function CalculatorModal({ open, onClose, showToast }: { open: boolean; onClose: () => void; showToast: (type: "success" | "error", message: string) => void }) {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [hasResult, setHasResult] = useState(false);
  const result = useTcoCalculation(form);

  const updateForm = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setHasResult(false);
  };

  const validateAndCalculate = () => {
    if (!form.currentSystem) return showToast("error", "Selecciona el sistema actual.");

    const values = [form.users, form.currentYearOne, form.oracleYearOne, form.migrationCost, form.manualReports, form.closingDays, form.adoptionRate];
    if (values.some((value) => value < 0)) return showToast("error", "No uses valores negativos en el diagnóstico.");
    if (form.users <= 0 || form.currentYearOne <= 0 || form.oracleYearOne <= 0 || form.migrationCost <= 0) return showToast("error", "Completa usuarios, costos anuales y costo de migración.");
    if (form.adoptionRate > 100) return showToast("error", "La adopción real no puede ser mayor a 100%.");

    setHasResult(true);
    showToast("success", "Diagnóstico calculado correctamente.");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/78 px-4 py-6 backdrop-blur-md">
      <div className="fabric-panel relative max-h-[90vh] w-full max-w-[1040px] overflow-y-auto bg-bg-base p-4 shadow-[0_42px_160px_rgba(0,0,0,0.78)] animate-fade-in-down md:p-5">
        <button type="button" onClick={onClose} className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center border border-border-strong text-text-primary transition duration-300 hover:border-accent hover:bg-accent-soft hover:text-accent" aria-label="Cerrar calculadora">
          <Icon name="close" />
        </button>

        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden border border-border bg-bg-panel/55 p-4 md:p-5">
            <div className="label inline-flex border border-accent/25 bg-accent-soft px-3 py-1.5 text-[8px]">8 preguntas · ERP TCO</div>
            <h3 className="mt-4 font-display text-[clamp(28px,3.8vw,46px)] leading-[0.96] tracking-[-0.045em] text-text-primary">Calcula tu ahorro.</h3>
            <p className="mt-3 max-w-md text-xs leading-6 text-text-secondary md:text-sm">Completa datos rápidos para estimar ahorro, breakeven y ROI proyectado.</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <SelectInput value={form.currentSystem} onChange={(value) => updateForm("currentSystem", value)} />
              <NumberInput label="Usuarios" value={form.users} onChange={(value) => updateForm("users", value)} />
              <NumberInput label="Año 1 actual" value={form.currentYearOne} onChange={(value) => updateForm("currentYearOne", value)} prefix="$" />
              <NumberInput label="Año 1 Oracle" value={form.oracleYearOne} onChange={(value) => updateForm("oracleYearOne", value)} prefix="$" />
              <NumberInput label="Costo migración" value={form.migrationCost} onChange={(value) => updateForm("migrationCost", value)} prefix="$" />
              <NumberInput label="Reportes manuales" value={form.manualReports} onChange={(value) => updateForm("manualReports", value)} />
              <NumberInput label="Cierre contable" value={form.closingDays} onChange={(value) => updateForm("closingDays", value)} suffix="días" />
              <NumberInput label="Adopción real" value={form.adoptionRate} onChange={(value) => updateForm("adoptionRate", value)} suffix="%" />
            </div>

            <FinancialButton onClick={validateAndCalculate} className="mt-4 w-full py-3.5">
              Generar proyección
              <Icon name="arrow" className="h-4 w-4" />
            </FinancialButton>
          </div>

          <div className="relative min-h-[420px] overflow-hidden border border-border bg-bg-panel/50 p-4 md:p-5">
            {!hasResult ? (
              <div className="flex h-full min-h-[380px] items-center justify-center text-center">
                <div>
                  <span className="mx-auto flex h-12 w-12 items-center justify-center border border-accent/30 bg-accent-soft text-accent"><Icon name="calculator" /></span>
                  <p className="mt-5 font-technical text-[10px] font-black uppercase tracking-[0.22em] text-accent">Dashboard listo</p>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-text-secondary">Al calcular, aparecerán métricas ejecutivas y una gráfica TCO compacta.</p>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 animate-fade-in-down">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="border border-border bg-bg-base/72 p-4"><p className="font-technical text-[8px] font-black uppercase tracking-[0.18em] text-accent/80">Ahorro 5 años</p><p className="mt-3 font-technical text-2xl font-black text-text-primary">{formatCurrency(result.savingFiveYears)}</p></div>
                  <div className="border border-accent bg-accent p-4 text-bg-base"><p className="font-technical text-[8px] font-black uppercase tracking-[0.18em]">Ahorro 10 años</p><p className="mt-3 font-technical text-2xl font-black">{formatCompact(result.savingTenYears)}</p></div>
                  <div className="border border-border bg-bg-base/72 p-4"><p className="font-technical text-[8px] font-black uppercase tracking-[0.18em] text-accent/80">Breakeven</p><p className="mt-3 font-technical text-2xl font-black text-text-primary">{result.breakevenMonths} meses</p></div>
                  <div className="border border-border bg-bg-base/72 p-4"><p className="font-technical text-[8px] font-black uppercase tracking-[0.18em] text-accent/80">ROI 5 años</p><p className="mt-3 font-technical text-2xl font-black text-text-primary">{result.roiFiveYears}%</p></div>
                </div>

                <ResultChart {...result} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ErpCostCalculatorSection() {
  const [sectionRef, isInView] = useInView<HTMLElement>();
  const [openCalculator, setOpenCalculator] = useState(false);
  const [toastState, setToastState] = useState<ToastState>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    setToastState({ type, message });
    toastTimerRef.current = window.setTimeout(() => setToastState(null), 3200);
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-bg-base px-6 py-20 text-text-primary md:px-12 md:py-28">
      <SingleToast toast={toastState} />
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(201,169,110,0.10),transparent_28%),radial-gradient(circle_at_82%_58%,rgba(201,169,110,0.07),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg-base to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-base to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1240px]">
        <div className="grid border border-border bg-bg-base/62 backdrop-blur-sm lg:grid-cols-[1.06fr_0.94fr]">
          <div className={`relative min-h-[430px] overflow-hidden border-b border-border p-7 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:p-10 lg:border-b-0 lg:border-r lg:p-12 ${isInView ? "translate-y-0 opacity-100 blur-0" : "translate-y-10 opacity-0 blur-sm"}`}>
            <div className="relative z-10 flex h-full flex-col justify-center">
              <div className="label inline-flex w-fit items-center gap-2 border border-accent/25 bg-accent-soft px-4 py-2">
                <TextScramble as="span" trigger={isInView} speed={0.02} duration={0.55}>Lead Magnet · ERP TCO</TextScramble>
              </div>

              <div className="mt-7">
                <TextScramble as="h2" trigger={isInView} duration={1.05} speed={0.028} className="max-w-3xl font-display text-[clamp(42px,5.2vw,78px)] leading-[0.95] tracking-[-0.05em] text-text-primary">
                  ¿Cuánto te está costando realmente tu ERP actual?
                </TextScramble>
              </div>

              <p className={`mt-7 max-w-2xl text-base leading-8 text-text-secondary transition-all duration-700 md:text-lg ${isInView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`} style={{ transitionDelay: "180ms" }}>
                Comparativo TCO Oracle Fusion vs tu SAP, EBS, JD Edwards, PeopleSoft o Microsoft Dynamics.
              </p>

              <div className="mt-9">
                <FinancialButton onClick={() => setOpenCalculator(true)}>
                  Calcular ahorro
                  <Icon name="arrow" className="h-4 w-4" />
                </FinancialButton>
                <p className="mt-4 font-technical text-[9px] font-black uppercase tracking-[0.22em] text-text-tertiary">8 preguntas · Resultado inmediato en pantalla</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {features.map((feature, index) => <FeatureCard key={feature.id} feature={feature} index={index} visible={isInView} />)}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <LeadPreviewCard onOpen={() => setOpenCalculator(true)} visible={isInView} />
        </div>
      </div>

      <CalculatorModal open={openCalculator} onClose={() => setOpenCalculator(false)} showToast={showToast} />
    </section>
  );
}
