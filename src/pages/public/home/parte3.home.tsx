import { useEffect, useMemo, useRef, useState, type ElementType, type ReactNode } from "react";
import { Toaster, toast } from "sonner";

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

type TextScrambleProps = {
  children: string;
  as?: ElementType;
  className?: string;
  trigger?: boolean;
  duration?: number;
  speed?: number;
  characterSet?: string;
  onScrambleComplete?: () => void;
};

type IconName = "shield" | "scan" | "chart" | "database" | "cloud" | "calculator";

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

const defaultChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const features = [
  {
    id: "01",
    title: "Costo Total",
    text: "Análisis de costo total a 5 y 10 años.",
    icon: "chart" as IconName,
  },
  {
    id: "02",
    title: "Punto de Equilibrio",
    text: "Breakeven de migración estimado.",
    icon: "scan" as IconName,
  },
  {
    id: "03",
    title: "Proyección Exacta",
    text: "ROI proyectado con benchmarks Oracle.",
    icon: "cloud" as IconName,
  },
  {
    id: "04",
    title: "Privacidad",
    text: "Opción de análisis detallado con datos reales.",
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

function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isInView) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isInView]);

  return [ref, isInView] as const;
}

function TextScramble({
  children,
  as: Component = "span",
  className,
  trigger = true,
  duration = 0.8,
  speed = 0.03,
  characterSet = defaultChars,
  onScrambleComplete,
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
        onScrambleComplete?.();
      }
    }, speed * 1000);

    return () => window.clearInterval(interval);
  }, [characterSet, children, duration, isAnimating, onScrambleComplete, speed, trigger]);

  return <Component className={className}>{displayText}</Component>;
}

function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const strokeWidth = "1.5";
  if (name === "calculator") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="3" width="14" height="18" stroke="currentColor" strokeWidth={strokeWidth} />
        <path d="M8 7H16M8 11H8.01M12 11H12.01M16 11H16.01M8 15H8.01M12 15H12.01M16 15H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      </svg>
    );
  }
  if (name === "shield") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3L20 6.5V11.5C20 16.5 16.5 20.5 12 22C7.5 20.5 4 16.5 4 11.5V6.5L12 3Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="square" strokeLinejoin="miter" />
        <path d="M9 12L11 14L15 9" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="square" strokeLinejoin="miter" />
      </svg>
    );
  }
  if (name === "scan") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 8V6C4 4.9 4.9 4 6 4H8M16 4H18C19.1 4 20 4.9 20 6V8M20 16V18C20 19.1 19.1 20 18 20H16M8 20H6C4.9 20 4 19.1 4 18V16" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="square" />
        <path d="M7 12H17" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="square" />
      </svg>
    );
  }
  if (name === "cloud") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6.5 17.5H18C20.2 17.5 22 15.7 22 13.5C22 11.3 20.2 9.5 18 9.5C17.6 6.5 15.1 4 12 4C9.2 4 6.8 5.9 6.1 8.5C3.8 8.9 2 10.9 2 13.25C2 15.6 3.9 17.5 6.5 17.5Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="square" strokeLinejoin="miter" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 19H20M7 16V10M12 16V6M17 16V12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="square" />
    </svg>
  );
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

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 last:border-0 last:pb-0">
      <span className="label text-[var(--text-secondary)]">{label}</span>
      <span className="font-technical text-sm text-[var(--text-primary)]">{value}</span>
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block label text-[var(--text-secondary)]">
        {label}
      </span>
      <div className="group flex items-center bg-[var(--bg-panel)] px-4 py-3.5 transition-colors duration-200 border border-[var(--border-strong)] focus-within:border-[var(--accent)]">
        {prefix && <span className="mr-2 font-technical text-[var(--text-secondary)]">{prefix}</span>}
        <input
          type="number"
          min={0}
          value={value}
          onChange={(event) => onChange(clampNumber(Number(event.target.value)))}
          className="w-full bg-transparent font-technical text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)]"
        />
        {suffix && <span className="ml-2 font-technical text-xs text-[var(--text-secondary)]">{suffix}</span>}
      </div>
    </label>
  );
}

function SelectInput({ value, onChange }: { value: CurrentSystem; onChange: (value: CurrentSystem) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block label text-[var(--text-secondary)]">
        Sistema Actual
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as CurrentSystem)}
        className="w-full cursor-pointer appearance-none bg-[var(--bg-panel)] px-4 py-3.5 font-technical text-sm text-[var(--text-primary)] outline-none border border-[var(--border-strong)] transition-colors duration-200 focus:border-[var(--accent)]"
      >
        {systems.map((system) => (
          <option key={system} value={system} className="bg-[var(--bg-panel)]">
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
    <div className="fabric-panel p-6 border border-[var(--border)]">
      <p className="label mb-6 text-[var(--text-secondary)]">Análisis Financiero</p>
      <div className="space-y-5">
        {[
          { label: "TCO Actual (5 Años)", value: currentTcoFiveYears, color: "bg-[var(--text-tertiary)]" },
          { label: "TCO Nuevo (5 Años)", value: oracleTcoFiveYears, color: "bg-[var(--accent-2)]" },
          { label: "Ahorro Neto Estimado", value: savingFiveYears, color: "bg-[var(--accent)]" },
        ].map((item, index) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between">
              <span className="label text-[var(--text-secondary)]">{item.label}</span>
              <span className="font-technical text-sm text-[var(--text-primary)]">{formatCompact(item.value)}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden bg-[var(--bg-elevated)]">
              <div
                className={`h-full ${item.color} transition-all duration-1000 ease-out`}
                style={{ width: `${(item.value / max) * 100}%`, transitionDelay: `${index * 150}ms` }}
              />
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
      className={`fabric-elevated group relative flex flex-col justify-between p-5 transition-all duration-700 hover:border-[var(--accent)] hover:-translate-y-1 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 100 + 150}ms` }}
    >
      <div>
        <div className="mb-4 flex h-10 w-10 items-center justify-center bg-[var(--bg-panel)] text-[var(--accent)] border border-[var(--border-strong)] transition-colors group-hover:bg-[var(--accent-soft)]">
          <Icon name={feature.icon} className="h-4 w-4" />
        </div>
        <h3 className="font-display text-base text-[var(--text-primary)] mb-2">{feature.title}</h3>
        <p className="font-body text-xs leading-relaxed text-[var(--text-secondary)]">{feature.text}</p>
      </div>
    </article>
  );
}

function CalculatorModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [hasResult, setHasResult] = useState(false);
  const result = useTcoCalculation(form);

  const updateForm = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setHasResult(false);
  };

  const validateAndCalculate = () => {
    if (form.users <= 0 || form.currentYearOne <= 0 || form.oracleYearOne <= 0 || form.migrationCost <= 0) {
      toast.error("Por favor, completa los campos obligatorios.", {
        style: { background: 'var(--bg-panel)', color: 'var(--text-primary)', border: '1px solid var(--border-strong)' }
      });
      return;
    }
    setHasResult(true);
    toast.success("Análisis TCO generado con éxito.", {
      style: { background: 'var(--bg-panel)', color: 'var(--accent)', border: '1px solid var(--border-strong)' }
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm transition-opacity">
      <div className="relative max-h-[90vh] w-full max-w-[1000px] overflow-y-auto bg-[var(--bg-base)] border border-[var(--border)] shadow-2xl shadow-black animate-fade-in-down">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center bg-[var(--bg-panel)] text-[var(--text-secondary)] border border-[var(--border-strong)] transition-all hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
        >
          <CloseIcon />
        </button>

        <div className="grid lg:grid-cols-[1fr_1.1fr]">
          <div className="relative p-8 md:p-10">
            <div className="mb-8">
              <div className="mb-5 inline-flex items-center bg-[var(--accent-soft)] px-3 py-1 border border-[var(--accent)]/30">
                <span className="label">Calculadora Ejecutiva</span>
              </div>
              <h3 className="font-display text-4xl text-[var(--text-primary)]">Configura tu escenario</h3>
              <p className="mt-3 font-body text-sm text-[var(--text-secondary)]">Introduce los parámetros de tu infraestructura actual para proyectar el ahorro.</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <SelectInput value={form.currentSystem} onChange={(value) => updateForm("currentSystem", value)} />
              <NumberInput label="Usuarios Totales" value={form.users} onChange={(value) => updateForm("users", value)} />
              <NumberInput label="Costo Anual Actual" value={form.currentYearOne} onChange={(value) => updateForm("currentYearOne", value)} prefix="$" />
              <NumberInput label="Costo Anual Nuevo" value={form.oracleYearOne} onChange={(value) => updateForm("oracleYearOne", value)} prefix="$" />
              <NumberInput label="Inversión Migración" value={form.migrationCost} onChange={(value) => updateForm("migrationCost", value)} prefix="$" />
              <NumberInput label="Reportes Manuales/Mes" value={form.manualReports} onChange={(value) => updateForm("manualReports", value)} />
              <NumberInput label="Días Cierre Contable" value={form.closingDays} onChange={(value) => updateForm("closingDays", value)} suffix="días" />
              <NumberInput label="Adopción Estimada" value={form.adoptionRate} onChange={(value) => updateForm("adoptionRate", value)} suffix="%" />
            </div>

            <div className="mt-10">
              <button 
                type="button" 
                onClick={validateAndCalculate} 
                className="group flex w-full items-center justify-center gap-3 border border-[var(--accent)] bg-transparent px-8 py-4 font-technical text-[13px] font-bold uppercase tracking-[0.15em] text-[var(--accent)] transition-all duration-300 hover:bg-[var(--accent)] hover:text-[var(--bg-base)]"
              >
                Generar Proyección
                <ArrowIcon />
              </button>
            </div>
          </div>

          <div className="relative border-t border-[var(--border)] bg-[var(--bg-panel)] p-8 lg:border-l lg:border-t-0 md:p-10">
            {!hasResult ? (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center bg-[var(--bg-elevated)] text-[var(--text-tertiary)] border border-[var(--border-strong)]">
                  <Icon name="calculator" className="h-8 w-8" />
                </div>
                <h4 className="font-display text-2xl text-[var(--text-primary)]">Esperando parámetros</h4>
                <p className="mt-3 max-w-[280px] font-body text-sm text-[var(--text-secondary)]">
                  Completa la información a la izquierda para generar el dashboard interactivo de TCO y ROI.
                </p>
              </div>
            ) : (
              <div className="flex h-full flex-col justify-center animate-fade-in-down">
                <div className="mb-8 grid gap-4 sm:grid-cols-2">
                  <div className="fabric-elevated p-6 border border-[var(--border)]">
                    <p className="label mb-2 text-[var(--text-secondary)]">Ahorro 5 Años</p>
                    <p className="font-technical text-2xl text-[var(--accent)]">{formatCurrency(result.savingFiveYears)}</p>
                  </div>
                  <div className="bg-[var(--accent)] p-6 border border-[var(--accent)]">
                    <p className="label mb-2 text-[var(--bg-base)]">Ahorro 10 Años</p>
                    <p className="font-technical text-2xl text-[var(--bg-base)] font-bold">{formatCompact(result.savingTenYears)}</p>
                  </div>
                  <div className="fabric-elevated p-6 border border-[var(--border)]">
                    <p className="label mb-2 text-[var(--text-secondary)]">Breakeven</p>
                    <p className="font-technical text-xl text-[var(--text-primary)]">{result.breakevenMonths} Meses</p>
                  </div>
                  <div className="fabric-elevated p-6 border border-[var(--border)]">
                    <p className="label mb-2 text-[var(--text-secondary)]">ROI 5 Años</p>
                    <p className="font-technical text-xl text-[var(--text-primary)]">{result.roiFiveYears}%</p>
                  </div>
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

function LeadPreviewCard({ onOpen }: { onOpen: () => void }) {
  const rows = [
    { label: "Sistema actual", value: "SAP S/4 HANA" },
    { label: "Usuarios", value: "150" },
    { label: "Año 1 actual", value: "$485,000" },
    { label: "Año 1 Oracle", value: "$310,000" },
    { label: "Ahorro 5 años", value: "$1,240,000" },
    { label: "Breakeven", value: "18 meses" },
  ];

  return (
    <article className="relative w-full max-w-[460px] bg-[var(--bg-panel)] p-8 border border-[var(--border-strong)] shadow-2xl animate-fade-in-down md:p-10">
      <div className="mb-8 flex items-center justify-between border-b border-[var(--border)] pb-6">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-[var(--accent)]" />
            <p className="label text-[var(--accent)]">Live Preview</p>
          </div>
          <p className="font-display text-xl text-[var(--text-primary)]">Modelo Financiero TCO</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border)]">
          <Icon name="calculator" />
        </div>
      </div>

      <div className="space-y-4">
        {rows.map((row) => (
          <PreviewRow key={row.label} label={row.label} value={row.value} />
        ))}
      </div>

      <div className="mt-8 bg-[var(--accent-soft)] p-6 border border-[var(--accent)]/20 transition-all hover:bg-[var(--accent)] hover:text-[var(--bg-base)] group cursor-pointer" onClick={onOpen}>
        <p className="label mb-2 text-[var(--accent)] group-hover:text-[var(--bg-base)]">Ahorro 10 años</p>
        <p className="font-display text-4xl text-[var(--text-primary)] group-hover:text-[var(--bg-base)]">$3.8M</p>
      </div>
    </article>
  );
}

export default function ErpCostCalculatorSection() {
  const [sectionRef, isInView] = useInViewOnce<HTMLElement>();
  const [openCalculator, setOpenCalculator] = useState(false);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[var(--bg-base)] px-6 py-24 md:px-12 md:py-32">
      <Toaster position="top-right" />
      
      {/* Background Gradients & Textures */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern animate-grid opacity-50" />
      <div className="pointer-events-none absolute left-0 right-0 top-0 -z-10 m-auto h-[400px] w-[400px] bg-[var(--accent)] opacity-[0.03] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1300px]">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          
          <div className={`relative flex flex-col justify-center transition-all duration-1000 ${isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
            <div className="mb-8 inline-flex w-fit items-center gap-2 border border-[var(--border-strong)] bg-[var(--bg-panel)] px-4 py-2">
              <span className="label text-[var(--text-secondary)]">Lead Magnet · TCO Analysis</span>
            </div>

            <TextScramble
              as="h2"
              trigger={isInView}
              duration={1.2}
              speed={0.02}
              className="font-display text-4xl text-[var(--text-primary)] md:text-5xl lg:text-[64px]"
            >
              ¿Cuánto te está costando realmente tu ERP actual?
            </TextScramble>

            <p className="mt-8 max-w-2xl font-body text-lg text-[var(--text-secondary)]">
              Comparativo TCO Oracle Fusion vs tu SAP, EBS, JD Edwards, PeopleSoft o Microsoft Dynamics.
            </p>

            <div className="mt-12 flex flex-col items-start gap-6">
              <button 
                onClick={() => setOpenCalculator(true)} 
                className="group inline-flex items-center justify-center gap-3 border border-[var(--accent)] bg-transparent px-8 py-4 font-technical text-[13px] font-bold uppercase tracking-[0.15em] text-[var(--accent)] transition-all duration-300 hover:bg-[var(--accent)] hover:text-[var(--bg-base)]"
              >
                Calcular Ahorro
                <ArrowIcon />
              </button>
              <p className="label text-[var(--text-tertiary)]">
                8 preguntas · Resultado inmediato en pantalla
              </p>
            </div>

            <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:hidden">
              {features.map((feature, index) => (
                <FeatureCard key={feature.id} feature={feature} index={index} visible={isInView} />
              ))}
            </div>
          </div>

          <div className="relative hidden flex-col justify-center lg:flex">
            <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-[var(--accent)] opacity-[0.02] blur-[100px]" />
            <LeadPreviewCard onOpen={() => setOpenCalculator(true)} />
          </div>
        </div>

        <div className="mt-24 hidden grid-cols-1 gap-6 sm:grid-cols-2 lg:grid lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} visible={isInView} />
          ))}
        </div>

        <div className="mt-16 flex justify-center lg:hidden">
          <LeadPreviewCard onOpen={() => setOpenCalculator(true)} />
        </div>
      </div>

      <CalculatorModal open={openCalculator} onClose={() => setOpenCalculator(false)} />
    </section>
  );
}