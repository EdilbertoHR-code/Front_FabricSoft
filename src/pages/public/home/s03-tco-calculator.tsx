import {
  useEffect, useMemo, useRef, useState,
  memo, useCallback,
  type ElementType, type ReactNode,
} from "react";
// FÍJATE AQUÍ: Ya solo importamos 'toast', quitamos 'Toaster' porque ya lo tienes en main.tsx
import { toast } from "sonner";

// ─── TYPES ────────────────────────────────────────────────────────────────────
type CurrentSystem = "SAP S/4 HANA" | "Oracle EBS" | "JD Edwards" | "PeopleSoft" | "Microsoft Dynamics";
type IconName = "shield" | "scan" | "chart" | "cloud" | "calculator";
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

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const SYSTEMS: CurrentSystem[] = [
  "SAP S/4 HANA", "Oracle EBS", "JD Edwards", "PeopleSoft", "Microsoft Dynamics"
];
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const DEFAULT_FORM: FormState = {
  currentSystem: "SAP S/4 HANA",
  users: 150,
  currentYearOne: 485000,
  oracleYearOne: 310000,
  migrationCost: 372000,
  manualReports: 12,
  closingDays: 15,
  adoptionRate: 72,
};

const FEATURES = [
  { id: "01", title: "Costo Total",        text: "Análisis de costo total a 5 y 10 años.",         icon: "chart"  as IconName },
  { id: "02", title: "Punto de Equilibrio", text: "Breakeven de migración estimado.",                icon: "scan"   as IconName },
  { id: "03", title: "Proyección Exacta",   text: "ROI proyectado con benchmarks Oracle.",           icon: "cloud"  as IconName },
  { id: "04", title: "Privacidad",          text: "Opción de análisis detallado con datos reales.",  icon: "shield" as IconName },
];

// ─── FORMATTERS ───────────────────────────────────────────────────────────────
const fmt   = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);
const fmtCo = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 }).format(v);
const clamp = (v: number, min = 0, max = Infinity) =>
  isNaN(v) ? min : Math.min(Math.max(v, min), max);

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

function useTco(form: FormState) {
  return useMemo(() => {
    const base      = Math.max(form.currentYearOne - form.oracleYearOne, 0);
    const reports   = form.manualReports * 3500;
    const closing   = Math.max(form.closingDays - 10, 0) * 6200;
    const adoption  = form.adoptionRate < 70 ? (70 - form.adoptionRate) * form.users * 38 : 0;
    const annual    = base + reports + closing + adoption;
    const five      = annual * 5;
    const ten       = annual * 10 * 1.532;
    const breakeven = annual > 0 ? Math.ceil((form.migrationCost / annual) * 12) : 0;
    const roi5      = form.migrationCost > 0 ? Math.round(((five - form.migrationCost) / form.migrationCost) * 100) : 0;
    const currTco5  = form.currentYearOne * 5 + reports * 5 + closing * 5 + adoption * 5;
    const oracleTco5 = form.oracleYearOne * 5 + form.migrationCost;
    return { annual, five, ten, breakeven, roi5, currTco5, oracleTco5 };
  }, [form]);
}

/** Animated number counter hook */
function useCountUp(end: number, duration = 600, start = true) {
  const [current, setCurrent] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!start || end === 0) {
      setCurrent(end);
      return;
    }
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCurrent(Math.round(progress * end));
      if (progress < 1) {
        raf.current = requestAnimationFrame(step);
      }
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [end, duration, start]);

  return current;
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
const toastBase = {
  style: {
    background: "#0A0A0A", borderRadius: "4px",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px", fontWeight: 700,
    letterSpacing: "0.12em", textTransform: "uppercase" as const,
    padding: "14px 18px",
  },
};
const toastOk  = (msg: string) => {
  toast.dismiss();
  toast.success(msg, {
    ...toastBase,
    style: { ...toastBase.style, border: "1px solid #C9A96E", color: "#C9A96E" },
    icon: null
  });
};
const toastErr = (msg: string) => {
  toast.dismiss();
  toast.error(msg, {
    ...toastBase,
    style: { ...toastBase.style, border: "1px solid #b85450", color: "#b85450" },
    icon: null
  });
};

// ─── ICONS ────────────────────────────────────────────────────────────────────
function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const s = "1.5";
  if (name === "calculator") return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" stroke="currentColor" strokeWidth={s} />
      <path d="M8 7H16M8 11H8.01M12 11H12.01M16 11H16.01M8 15H8.01M12 15H12.01M16 15H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
  if (name === "shield") return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3L20 6.5V11.5C20 16.5 16.5 20.5 12 22C7.5 20.5 4 16.5 4 11.5V6.5L12 3Z" stroke="currentColor" strokeWidth={s} strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M9 12L11 14L15 9" stroke="currentColor" strokeWidth={s} strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
  if (name === "scan") return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 8V6C4 4.9 4.9 4 6 4H8M16 4H18C19.1 4 20 4.9 20 6V8M20 16V18C20 19.1 19.1 20 18 20H16M8 20H6C4.9 20 4 19.1 4 18V16" stroke="currentColor" strokeWidth={s} strokeLinecap="square" />
      <path d="M7 12H17" stroke="currentColor" strokeWidth={s} strokeLinecap="square" />
    </svg>
  );
  if (name === "cloud") return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.5 17.5H18C20.2 17.5 22 15.7 22 13.5C22 11.3 20.2 9.5 18 9.5C17.6 6.5 15.1 4 12 4C9.2 4 6.8 5.9 6.1 8.5C3.8 8.9 2 10.9 2 13.25C2 15.6 3.9 17.5 6.5 17.5Z" stroke="currentColor" strokeWidth={s} strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 19H20M7 16V10M12 16V6M17 16V12" stroke="currentColor" strokeWidth={s} strokeLinecap="square" />
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

// ─── TEXT SCRAMBLE ────────────────────────────────────────────────────────────
function TextScramble({
  children, as: Tag = "span", className,
  trigger = true, duration = 0.8, speed = 0.03,
  chars = SCRAMBLE_CHARS, onComplete,
}: {
  children: string; as?: ElementType; className?: string;
  trigger?: boolean; duration?: number; speed?: number;
  chars?: string; onComplete?: () => void;
}) {
  const [text, setText] = useState(typeof children === 'string' ? children : '');
  const [busy, setBusy] = useState(false);
  useEffect(() => { if (typeof children === 'string') setText(children); }, [children]);
  useEffect(() => {
    if (!trigger || busy || typeof children !== 'string') return;
    setBusy(true);
    const steps = Math.max(1, Math.floor(duration / speed));
    let step = 0;
    const id = window.setInterval(() => {
      const p = step / steps;
      setText(children.split("").map((c, i) =>
        c === " " ? " " : p * children.length > i ? c : chars[Math.floor(Math.random() * chars.length)]
      ).join(""));
      if (++step > steps) { clearInterval(id); setText(children); setBusy(false); onComplete?.(); }
    }, speed * 1000);
    return () => clearInterval(id);
  }, [chars, children, duration, busy, onComplete, speed, trigger]);
  if (typeof children !== 'string') return <Tag className={className}>{children}</Tag>;
  return <Tag className={className}>{text}</Tag>;
}

// ─── SHARED PRIMITIVES ────────────────────────────────────────────────────────
function Btn({ children, onClick, disabled = false, className = "" }: {
  children: ReactNode; onClick: () => void; disabled?: boolean; className?: string;
}) {
  return (
    <button
      type="button" onClick={onClick} disabled={disabled}
      className={`group inline-flex items-center justify-center gap-3
        border border-[#C9A96E] bg-[#C9A96E]/5
        px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.15em]
        text-[#C9A96E] transition-all duration-300
        hover:bg-[#C9A96E] hover:text-[#0A0A0A]
        disabled:opacity-40 disabled:cursor-not-allowed
        shadow-[0_0_20px_-5px_rgba(201,169,110,0.2)] hover:shadow-[0_0_30px_rgba(201,169,110,0.4)]
        rounded-sm ${className}`}
    >
      {children}
    </button>
  );
}

function ScrollReveal({ children, up = true, delay = 0 }: {
  children: ReactNode; up?: boolean; delay?: number;
}) {
  const [ref, visible] = useInView<HTMLDivElement>(0.2);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 will-change-transform ${
        visible ? "translate-y-0 opacity-100" : up ? "translate-y-10 opacity-0" : "-translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── FORM INPUTS ──────────────────────────────────────────────────────────────
const inputBase =
  "flex items-center bg-[#0A0A0A] px-4 py-3.5 border border-[#2A2A2A] transition-all duration-200 focus-within:border-[#C9A96E]/60 focus-within:shadow-[0_0_12px_rgba(201,169,110,0.15)] rounded-sm";

const NumberInput = memo(function NumberInput({ label, value, onChange, prefix, suffix }: {
  label: string; value: number; onChange: (v: number) => void; prefix?: string; suffix?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.1em] text-[#888]">{label}</span>
      <div className={inputBase}>
        {prefix && <span className="mr-2 font-mono text-[#888]">{prefix}</span>}
        <input
          type="number" min={0} value={value}
          onChange={(e) => onChange(clamp(Number(e.target.value)))}
          className="w-full bg-transparent font-mono text-sm text-[#F5F5F5] outline-none placeholder:text-[#444]"
        />
        {suffix && <span className="ml-2 font-mono text-xs text-[#888]">{suffix}</span>}
      </div>
    </label>
  );
});

const SelectInput = memo(function SelectInput({ value, onChange }: {
  value: CurrentSystem; onChange: (v: CurrentSystem) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.1em] text-[#888]">Sistema Actual</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as CurrentSystem)}
        className="w-full cursor-pointer appearance-none bg-[#0A0A0A] px-4 py-3.5 font-mono text-sm text-[#F5F5F5] outline-none border border-[#2A2A2A] transition-all duration-200 focus:border-[#C9A96E]/60 focus:shadow-[0_0_12px_rgba(201,169,110,0.15)] rounded-sm"
      >
        {SYSTEMS.map((s) => <option key={s} value={s} className="bg-[#0A0A0A]">{s}</option>)}
      </select>
    </label>
  );
});

// ─── RESULT CHART ─────────────────────────────────────────────────────────────
const ResultChart = memo(function ResultChart({ currTco5, oracleTco5, five, show }: {
  currTco5: number; oracleTco5: number; five: number; show: boolean;
}) {
  const max = Math.max(currTco5, oracleTco5, five, 1);
  const bars = [
    { label: "TCO Actual (5 Años)",  value: currTco5,   color: "bg-[#444]" },
    { label: "TCO Nuevo (5 Años)",   value: oracleTco5, color: "bg-[#D4AF37]" },
    { label: "Ahorro Neto Estimado", value: five,       color: "bg-[#C9A96E]" },
  ];
  return (
    <div className="bg-[#0A0A0A] p-6 border border-[#1A1A1A] rounded-sm">
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] mb-6 text-[#C9A96E]">Análisis Financiero</p>
      <div className="space-y-5">
        {bars.map((b, i) => (
          <div key={b.label}>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-sans text-xs text-[#888]">{b.label}</span>
              <span className="font-mono text-sm text-[#F5F5F5]">{fmtCo(b.value)}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden bg-[#161616] rounded-full">
              <div
                className={`h-full ${b.color} transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full ${
                  show ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  width: show ? `${(b.value / max) * 100}%` : "0%",
                  transitionDelay: `${i * 120}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

// ─── FEATURE CARD ─────────────────────────────────────────────────────────────
const FeatureCard = memo(function FeatureCard({ feature, index }: {
  feature: (typeof FEATURES)[number]; index: number;
}) {
  const [ref, visible] = useInView<HTMLElement>(0.15);
  return (
    <article
      ref={ref}
      className={`bg-[#0A0A0A] border border-[#1A1A1A] group relative flex flex-col p-6 transition-all duration-700
        hover:border-[#C9A96E]/40 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(201,169,110,0.08)] rounded-sm
        ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      style={{ transitionDelay: `${index * 100 + 150}ms` }}
    >
      <div className="mb-5 flex h-10 w-10 items-center justify-center bg-[#050505] text-[#C9A96E] border border-[#2A2A2A] transition-colors group-hover:bg-[#C9A96E]/10 rounded-sm">
        <Icon name={feature.icon} className="h-4 w-4" />
      </div>
      <h3 className="font-serif text-lg text-[#F5F5F5] mb-2">{feature.title}</h3>
      <p className="font-sans text-[13px] leading-relaxed text-[#888]">{feature.text}</p>
    </article>
  );
});

// ─── PREVIEW ROW ──────────────────────────────────────────────────────────────
const PreviewRow = memo(function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3 last:border-0 last:pb-0">
      <span className="font-sans text-[13px] text-[#888]">{label}</span>
      <span className="font-mono text-sm text-[#F5F5F5]">{value}</span>
    </div>
  );
});

// ─── LEAD PREVIEW CARD ────────────────────────────────────────────────────────
const LeadPreviewCard = memo(function LeadPreviewCard({ onOpen }: { onOpen: () => void }) {
  const rows = [
    { label: "Sistema actual", value: "SAP S/4 HANA" },
    { label: "Usuarios",       value: "150"          },
    { label: "Año 1 actual",   value: "$485,000"     },
    { label: "Año 1 Oracle",   value: "$310,000"     },
    { label: "Ahorro 5 años",  value: "$1,240,000"   },
    { label: "Breakeven",      value: "18 meses"     },
  ];
  return (
    <article className="relative w-full max-w-[460px] bg-[#0A0A0A] p-8 border border-[#2A2A2A] shadow-[0_25px_60px_rgba(0,0,0,0.6)] md:p-10 rounded-xl transition-shadow duration-500 hover:shadow-[0_25px_60px_rgba(201,169,110,0.1)]">
      <div className="mb-8 flex items-center justify-between border-b border-[#1A1A1A] pb-6">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-[#C9A96E] animate-pulse rounded-full" />
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C9A96E]">Live Preview</p>
          </div>
          <p className="font-serif text-2xl text-[#F5F5F5]">Modelo Financiero <span className="text-[#C9A96E]">TCO</span></p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center bg-[#111111] text-[#C9A96E] border border-[#2A2A2A] rounded-sm">
          <Icon name="calculator" />
        </div>
      </div>
      <div className="space-y-4">
        {rows.map((r) => <PreviewRow key={r.label} label={r.label} value={r.value} />)}
      </div>
      <div
        onClick={onOpen}
        className="group mt-8 cursor-pointer bg-[#C9A96E]/5 p-6 border border-[#C9A96E]/20 transition-all duration-300 hover:bg-[#C9A96E] rounded-sm"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] mb-2 text-[#C9A96E] transition-colors duration-300 group-hover:text-black">
          Ahorro 10 años
        </p>
        <p className="font-serif text-4xl text-[#F5F5F5] transition-colors duration-300 group-hover:text-black">
          $3.8M
        </p>
      </div>
    </article>
  );
});

// ─── CALCULATOR MODAL ─────────────────────────────────────────────────────────
function CalculatorModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [hasResult, setResult] = useState(false);
  const [busy, setBusy] = useState(false);
  const tco = useTco(form);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const update = useCallback(<K extends keyof FormState>(key: K, val: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: val }));
    setResult(false);
  }, []);

  const calculate = useCallback(() => {
    if (busy) return;
    if (!form.users || !form.currentYearOne || !form.oracleYearOne || !form.migrationCost) {
      toastErr("Completa los campos obligatorios");
      return;
    }
    setBusy(true);
    setResult(true);
    toastOk("Análisis TCO generado");
    setTimeout(() => setBusy(false), 500);
  }, [form, busy]);

  // Animated counters (triggered when hasResult becomes true)
  const fiveCount = useCountUp(tco.five, 800, hasResult);
  const tenCount  = useCountUp(tco.ten, 1000, hasResult);
  const beCount   = useCountUp(tco.breakeven, 400, hasResult);
  const roiCount  = useCountUp(tco.roi5, 500, hasResult);

  if (!open) return null;

  return (
    <>
      <style>{`
        .fabric-modal-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(201, 169, 110, 0.65) transparent;
        }
        .fabric-modal-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .fabric-modal-scroll::-webkit-scrollbar-track {
          background: transparent;
          margin: 16px 0;
        }
        .fabric-modal-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(201, 169, 110, 0.85), rgba(201, 169, 110, 0.35));
          border-radius: 999px;
          border: 2px solid rgba(5, 5, 5, 0.95);
        }
        .fabric-modal-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(201, 169, 110, 0.95);
        }
        .fabric-modal-scroll::-webkit-scrollbar-corner {
          background: transparent;
        }
      `}</style>

      {/* Backdrop */}
      <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl animate-[fadeIn_0.3s_ease-out]">
        <div className="fabric-modal-scroll h-full overflow-y-auto overscroll-contain px-4 py-6 md:px-6 md:py-10">
          <div className="relative mx-auto w-full max-w-[1100px] bg-[#050505]/95 border border-[#2A2A2A] shadow-[0_0_80px_rgba(0,0,0,0.9),0_0_20px_rgba(201,169,110,0.1)] rounded-2xl overflow-hidden">
            
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="group absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center bg-[#050505]/80 border border-[#2A2A2A] text-[#888] backdrop-blur-md transition-all duration-300 hover:border-[#C9A96E] hover:text-[#C9A96E] hover:bg-[#C9A96E]/10 rounded-sm"
            >
              <CloseIcon />
            </button>

            <div className="grid lg:grid-cols-[1fr_1.1fr]">
              {/* Form Column */}
              <div className="p-8 md:p-12 lg:border-r border-[#1A1A1A]">
                <div className="mb-8">
                  <div className="mb-5 inline-flex items-center bg-[#C9A96E]/10 px-3 py-1 border border-[#C9A96E]/30 rounded-sm">
                    <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#C9A96E]">
                      Calculadora Ejecutiva
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl text-[#F5F5F5]">
                    Configura tu escenario
                  </h3>
                  <p className="mt-3 font-sans text-sm text-[#888] leading-relaxed">
                    Introduce los parámetros de tu infraestructura actual para proyectar el ahorro.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectInput value={form.currentSystem} onChange={(v) => update("currentSystem", v)} />
                  <NumberInput label="Usuarios Totales" value={form.users} onChange={(v) => update("users", v)} />
                  <NumberInput label="Costo Anual Actual" value={form.currentYearOne} onChange={(v) => update("currentYearOne", v)} prefix="$" />
                  <NumberInput label="Costo Anual Nuevo" value={form.oracleYearOne} onChange={(v) => update("oracleYearOne", v)} prefix="$" />
                  <NumberInput label="Inversión Migración" value={form.migrationCost} onChange={(v) => update("migrationCost", v)} prefix="$" />
                  <NumberInput label="Reportes Manuales/Mes" value={form.manualReports} onChange={(v) => update("manualReports", v)} />
                  <NumberInput label="Días Cierre Contable" value={form.closingDays} onChange={(v) => update("closingDays", v)} suffix="días" />
                  <NumberInput label="Adopción Estimada" value={form.adoptionRate} onChange={(v) => update("adoptionRate", v)} suffix="%" />
                </div>

                <div className="mt-10">
                  <Btn onClick={calculate} disabled={busy} className="w-full">
                    {busy ? "Procesando..." : "Generar Proyección"}
                    <ArrowIcon />
                  </Btn>
                </div>
              </div>

              {/* Results Column */}
              <div className="bg-[#0A0A0A] p-8 md:p-12">
                {!hasResult ? (
                  <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center bg-[#111111] text-[#666] border border-[#2A2A2A] rounded-full">
                      <Icon name="calculator" className="h-8 w-8" />
                    </div>
                    <h4 className="font-serif text-2xl text-[#F5F5F5]">Esperando parámetros</h4>
                    <p className="mt-3 max-w-[280px] font-sans text-[13px] text-[#888] leading-relaxed">
                      Completa la información para generar el dashboard de{" "}
                      <span className="text-[#C9A96E]">TCO</span> y{" "}
                      <span className="text-[#C9A96E]">ROI</span>.
                    </p>
                  </div>
                ) : (
                  <div className="flex h-full flex-col justify-center animate-[fadeIn_0.5s_ease-out]">
                    <div className="mb-8 grid gap-4 sm:grid-cols-2">
                      {/* Ahorro 5 años */}
                      <div className="bg-[#111111] p-6 border border-[#1A1A1A] rounded-sm animate-[fadeInUp_0.5s_ease-out]">
                        <p className="font-mono text-[9px] uppercase tracking-[0.15em] mb-2 text-[#888]">Ahorro 5 Años</p>
                        <p className="font-mono text-xl text-[#C9A96E]">
                          {fmt(fiveCount)}
                        </p>
                      </div>

                      {/* Ahorro 10 años */}
                      <div className="bg-[#C9A96E] p-6 rounded-sm shadow-[0_0_25px_rgba(201,169,110,0.3)] animate-[fadeInUp_0.5s_ease-out_0.1s]">
                        <p className="font-mono text-[9px] uppercase tracking-[0.15em] mb-2 text-black">Ahorro 10 Años</p>
                        <p className="font-mono text-xl font-bold text-black">
                          {fmtCo(tenCount)}
                        </p>
                      </div>

                      {/* Breakeven */}
                      <div className="bg-[#111111] p-6 border border-[#1A1A1A] rounded-sm animate-[fadeInUp_0.5s_ease-out_0.15s]">
                        <p className="font-mono text-[9px] uppercase tracking-[0.15em] mb-2 text-[#888]">Breakeven</p>
                        <p className="font-mono text-lg text-[#C9A96E]">
                          {beCount} <span className="text-[#888] text-sm">Meses</span>
                        </p>
                      </div>

                      {/* ROI */}
                      <div className="bg-[#111111] p-6 border border-[#1A1A1A] rounded-sm animate-[fadeInUp_0.5s_ease-out_0.2s]">
                        <p className="font-mono text-[9px] uppercase tracking-[0.15em] mb-2 text-[#888]">ROI 5 Años</p>
                        <p className="font-mono text-lg text-[#C9A96E]">
                          {roiCount}%
                        </p>
                      </div>
                    </div>

                    {/* Chart with animated bars */}
                    <ResultChart
                      currTco5={tco.currTco5}
                      oracleTco5={tco.oracleTco5}
                      five={tco.five}
                      show={hasResult}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function S03TcoCalculator() {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);

  return (
    <section id="tco" className="relative overflow-hidden bg-[#050505] px-6 py-24 md:px-12 md:py-32">
      {/* 🛑 ELIMINÉ EL <Toaster /> AQUÍ PORQUE YA ESTÁ EN MAIN.TSX 🛑 */}

      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="pointer-events-none absolute left-0 right-0 top-0 -z-10 m-auto h-[400px] w-[400px] bg-[#C9A96E] opacity-[0.05] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1300px]">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          {/* Left Content */}
          <div className="relative flex flex-col justify-center">
            <ScrollReveal delay={0}>
              <div className="mb-8 inline-flex w-fit items-center gap-2 border border-[#C9A96E]/30 bg-[#C9A96E]/5 px-4 py-2 rounded-sm backdrop-blur-sm">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#C9A96E]">
                  Lead Magnet · TCO Analysis
                </span>
              </div>
            </ScrollReveal>

           <ScrollReveal delay={100}>
  <h2 className="font-serif text-[38px] leading-[1.1] tracking-[-0.04em] text-[#F5F5F5] md:text-[52px] lg:text-[60px]">
    ¿Cuánto te está costando realmente tu ERP actual?
  </h2>
</ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="mt-8 max-w-2xl font-sans text-base md:text-lg leading-relaxed text-[#888]">
                Comparativo TCO{" "}
                <span className="text-[#F5F5F5] font-semibold">Oracle Fusion</span> vs tu SAP, EBS, JD Edwards, PeopleSoft o Microsoft Dynamics.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="mt-12 flex flex-col items-start gap-6">
                <Btn onClick={handleOpen}>
                  Calcular Ahorro
                  <ArrowIcon />
                </Btn>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#C9A96E]/70">
                  8 preguntas · Resultado inmediato en pantalla
                </p>
              </div>
            </ScrollReveal>

            {/* Mobile features */}
            <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:hidden">
              {FEATURES.map((f, i) => (
                <FeatureCard key={f.id} feature={f} index={i} />
              ))}
            </div>
          </div>

          {/* Right Preview (desktop) */}
          <div className="relative hidden flex-col justify-center lg:flex">
            <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-[#C9A96E] opacity-[0.03] blur-[100px]" />
            <ScrollReveal up={false} delay={200}>
              <LeadPreviewCard onOpen={handleOpen} />
            </ScrollReveal>
          </div>
        </div>

        {/* Desktop features */}
        <div className="mt-24 hidden grid-cols-1 gap-6 sm:grid-cols-2 lg:grid lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.id} feature={f} index={i} />
          ))}
        </div>

        {/* Mobile preview card */}
        <div className="mt-16 flex justify-center lg:hidden">
          <ScrollReveal delay={400}>
            <LeadPreviewCard onOpen={handleOpen} />
          </ScrollReveal>
        </div>
      </div>

      <CalculatorModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}