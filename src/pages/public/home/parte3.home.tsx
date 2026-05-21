import { useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

type Scenario = "rescue" | "stabilize" | "migrate";

type BreakdownItem = {
  label: string;
  value: number;
  short: string;
};

type InputState = {
  users: number;
  licenseCost: number;
  supportCost: number;
  manualHours: number;
  hourlyCost: number;
  closingDays: number;
  manualReports: number;
  adoptionRate: number;
  remediationCost: number;
};

const initialInput: InputState = {
  users: 150,
  licenseCost: 285000,
  supportCost: 120000,
  manualHours: 220,
  hourlyCost: 75,
  closingDays: 15,
  manualReports: 12,
  adoptionRate: 42,
  remediationCost: 180000,
};

const scenarioCopy: Record<
  Scenario,
  {
    title: string;
    description: string;
    multiplier: number;
  }
> = {
  rescue: {
    title: "Rescate Oracle Fusion",
    description: "Reduce reportes paralelos, cierre lento y operación fuera del ERP.",
    multiplier: 0.42,
  },
  stabilize: {
    title: "Estabilización post go-live",
    description: "Optimiza adopción, gobierno operativo y primer ciclo crítico.",
    multiplier: 0.36,
  },
  migrate: {
    title: "Migración controlada",
    description: "Proyecta TCO para migrar sin trasladar deuda operativa.",
    multiplier: 0.55,
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.075, delayChildren: 0.08 },
  },
};

const wordReveal: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
  },
};

function clamp(value: number, min = 0, max = Number.POSITIVE_INFINITY) {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CalculatorIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 7H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 11H8.01M12 11H12.01M16 11H16.01M8 15H8.01M12 15H12.01M16 15H16.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 19H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7 16V10M12 16V6M17 16V12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.5L18.5 6.2V11.2C18.5 15.5 15.8 19.3 12 20.5C8.2 19.3 5.5 15.5 5.5 11.2V6.2L12 3.5Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 12L11 14L15.5 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AnimatedHeadline({ text }: { text: string }) {
  return (
    <motion.h2
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.55 }}
      className="font-display text-[clamp(42px,5.4vw,84px)] leading-[0.95] tracking-[-0.05em] text-text-primary"
    >
      {text.split(" ").map((word, index) => {
        const isAccent = word.includes("ERP") || word.includes("actual");

        return (
          <motion.span key={`${word}-${index}`} variants={wordReveal} className="mr-[0.18em] inline-block">
            <span className={isAccent ? "text-accent" : undefined}>{word}</span>
          </motion.span>
        );
      })}
    </motion.h2>
  );
}

function FinancialButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative inline-flex w-fit items-center justify-center gap-3 overflow-hidden border border-border-strong bg-transparent px-8 py-4 font-technical text-[11px] font-black uppercase tracking-[0.22em] text-text-primary transition duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent-soft hover:text-accent hover:shadow-[0_0_34px_rgba(201,169,110,0.12)]"
    >
      <span className="absolute left-0 top-0 h-full w-[2px] bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

function NumberField({
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
      <span className="mb-2 block font-technical text-[9px] font-black uppercase tracking-[0.22em] text-accent/80">
        {label}
      </span>
      <div className="flex items-center border border-border bg-bg-base/82 px-4 py-3 transition duration-300 focus-within:border-accent/70 focus-within:bg-bg-elevated/70">
        {prefix ? <span className="mr-2 font-technical text-xs text-accent/75">{prefix}</span> : null}
        <input
          type="number"
          min={0}
          value={value}
          onChange={(event) => onChange(clamp(Number(event.target.value)))}
          className="w-full bg-transparent font-technical text-sm text-text-primary outline-none placeholder:text-text-tertiary"
        />
        {suffix ? <span className="ml-2 font-technical text-xs text-text-tertiary">{suffix}</span> : null}
      </div>
    </label>
  );
}

function RangeField({
  label,
  value,
  onChange,
  min,
  max,
  suffix,
  helper,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  suffix?: string;
  helper: string;
}) {
  return (
    <div className="border border-border bg-bg-panel/70 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-technical text-[9px] font-black uppercase tracking-[0.2em] text-text-primary">
            {label}
          </p>
          <p className="mt-2 text-xs leading-5 text-text-tertiary">{helper}</p>
        </div>
        <span className="shrink-0 font-technical text-sm font-black text-accent">
          {value}
          {suffix ?? ""}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-4 h-1 w-full accent-[#C9A96E]"
      />
    </div>
  );
}

function useErpCalculation(input: InputState, scenario: Scenario) {
  return useMemo(() => {
    const manualAnnualCost = input.manualHours * input.hourlyCost * 12;
    const adoptionLeakage = input.licenseCost * Math.max(0, 100 - input.adoptionRate) * 0.006;
    const closingPenalty = input.closingDays * 8500;
    const reportsPenalty = input.manualReports * 12500;

    const currentTco = input.licenseCost + input.supportCost + manualAnnualCost + adoptionLeakage + closingPenalty + reportsPenalty;
    const projectedTco = currentTco * scenarioCopy[scenario].multiplier + input.remediationCost * 0.22;
    const annualSaving = Math.max(currentTco - projectedTco, 0);
    const saving3Years = annualSaving * 3 - input.remediationCost;
    const saving5Years = annualSaving * 5 - input.remediationCost;
    const breakevenMonths = annualSaving > 0 ? Math.ceil((input.remediationCost / annualSaving) * 12) : 0;
    const roi = input.remediationCost > 0 ? (saving5Years / input.remediationCost) * 100 : 0;

    const breakdown: BreakdownItem[] = [
      { label: "Licencias", value: input.licenseCost, short: "Lic." },
      { label: "Soporte", value: input.supportCost, short: "Sup." },
      { label: "Horas manuales", value: manualAnnualCost, short: "Manual" },
      { label: "Cierre lento", value: closingPenalty, short: "Close" },
      { label: "Reportes", value: reportsPenalty, short: "Reports" },
      { label: "Baja adopción", value: adoptionLeakage, short: "Adopt." },
    ];

    return {
      manualAnnualCost,
      currentTco,
      projectedTco,
      annualSaving,
      saving3Years,
      saving5Years,
      breakevenMonths,
      roi,
      breakdown,
    };
  }, [input, scenario]);
}

function KpiCard({ label, value, featured = false }: { label: string; value: string; featured?: boolean }) {
  return (
    <motion.article
      variants={fadeUp}
      className={`relative overflow-hidden border p-4 ${
        featured ? "border-accent bg-accent text-bg-base" : "border-border bg-bg-panel/78 text-text-primary"
      }`}
    >
      <p className={`font-technical text-[9px] font-black uppercase tracking-[0.2em] ${featured ? "text-bg-base" : "text-accent/75"}`}>
        {label}
      </p>
      <p className="mt-3 font-technical text-2xl font-black tracking-[-0.05em] md:text-3xl">{value}</p>
    </motion.article>
  );
}

function ComparisonBars({ currentTco, projectedTco }: { currentTco: number; projectedTco: number }) {
  const max = Math.max(currentTco, projectedTco, 1);
  const currentWidth = `${(currentTco / max) * 100}%`;
  const projectedWidth = `${(projectedTco / max) * 100}%`;

  return (
    <div className="border border-border bg-bg-panel/72 p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="font-technical text-[9px] font-black uppercase tracking-[0.22em] text-accent/80">
          TCO Comparison
        </p>
        <ChartIcon />
      </div>

      {[
        { label: "ERP actual", value: currentTco, width: currentWidth, accent: false },
        { label: "Con FABRIC", value: projectedTco, width: projectedWidth, accent: true },
      ].map((bar) => (
        <div key={bar.label} className="mb-5 last:mb-0">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="font-technical text-[9px] font-black uppercase tracking-[0.18em] text-text-secondary">
              {bar.label}
            </span>
            <span className="font-technical text-xs font-black text-text-primary">{formatCompactUsd(bar.value)}</span>
          </div>
          <div className="h-2 overflow-hidden bg-bg-base">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: bar.width }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className={`h-full ${bar.accent ? "bg-accent" : "bg-border-strong"}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function CostBreakdownChart({ breakdown }: { breakdown: BreakdownItem[] }) {
  const max = Math.max(...breakdown.map((item) => item.value), 1);

  return (
    <div className="border border-border bg-bg-panel/72 p-5">
      <p className="font-technical text-[9px] font-black uppercase tracking-[0.22em] text-accent/80">
        Hidden Cost Breakdown
      </p>

      <div className="mt-5 space-y-3">
        {breakdown.map((item, index) => (
          <div key={item.label} className="grid grid-cols-[72px_1fr_72px] items-center gap-3">
            <span className="font-technical text-[8px] font-black uppercase tracking-[0.14em] text-text-tertiary">
              {item.short}
            </span>
            <div className="h-2 overflow-hidden bg-bg-base">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(item.value / max) * 100}%` }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.75, delay: index * 0.055, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-accent/80"
              />
            </div>
            <span className="text-right font-technical text-[9px] font-black text-text-secondary">
              {formatCompactUsd(item.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SavingsLineChart({ currentTco, projectedTco, remediationCost }: { currentTco: number; projectedTco: number; remediationCost: number }) {
  const yearSavings = [1, 2, 3, 4, 5].map((year) => Math.max((currentTco - projectedTco) * year - remediationCost, 0));
  const max = Math.max(...yearSavings, 1);
  const points = yearSavings
    .map((value, index) => {
      const x = 24 + index * 60;
      const y = 130 - (value / max) * 92;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="border border-border bg-bg-panel/72 p-5">
      <p className="font-technical text-[9px] font-black uppercase tracking-[0.22em] text-accent/80">
        5Y Savings Projection
      </p>

      <svg viewBox="0 0 290 150" className="mt-4 h-[150px] w-full" aria-hidden="true">
        <path d="M24 130H270" stroke="var(--border)" strokeWidth="1" />
        <path d="M24 38H270" stroke="var(--border)" strokeWidth="1" opacity="0.45" />
        <motion.polyline
          points={points}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.15, ease: "easeInOut" }}
        />
        {yearSavings.map((value, index) => {
          const x = 24 + index * 60;
          const y = 130 - (value / max) * 92;
          return <circle key={index} cx={x} cy={y} r="3.5" fill="var(--accent)" />;
        })}
      </svg>
    </div>
  );
}

function FinancialDashboard({ result }: { result: ReturnType<typeof useErpCalculation> }) {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="grid content-start gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <KpiCard label="TCO anual actual" value={formatUsd(result.currentTco)} />
        <KpiCard label="TCO proyectado" value={formatUsd(result.projectedTco)} />
        <KpiCard label="Breakeven" value={`${result.breakevenMonths} meses`} />
        <KpiCard label="Ahorro neto 5 años" value={formatUsd(result.saving5Years)} featured />
      </div>

      <ComparisonBars currentTco={result.currentTco} projectedTco={result.projectedTco} />
      <CostBreakdownChart breakdown={result.breakdown} />
      <SavingsLineChart currentTco={result.currentTco} projectedTco={result.projectedTco} remediationCost={initialInput.remediationCost} />
    </motion.div>
  );
}

function CalculatorModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [scenario, setScenario] = useState<Scenario>("rescue");
  const [input, setInput] = useState<InputState>(initialInput);
  const result = useErpCalculation(input, scenario);

  const updateInput = (key: keyof InputState, value: number) => {
    setInput((current) => ({ ...current, [key]: value }));
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/78 px-4 py-6 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="fabric-panel relative max-h-[92vh] w-full max-w-7xl overflow-y-auto bg-bg-base p-5 shadow-[0_42px_180px_rgba(0,0,0,0.78)] md:p-7"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/75 to-transparent" />
            <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center border border-border-strong text-text-primary transition duration-300 hover:border-accent hover:bg-accent-soft hover:text-accent"
              aria-label="Cerrar calculadora"
            >
              <CloseIcon />
            </button>

            <div className="pr-12">
              <div className="label inline-flex border border-accent/25 bg-accent-soft px-4 py-2">
                Financial ERP Diagnostic
              </div>
              <h3 className="mt-5 max-w-4xl font-display text-[clamp(34px,4.5vw,64px)] leading-[0.96] tracking-[-0.045em] text-text-primary">
                Modelo financiero del costo oculto de tu ERP.
              </h3>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-text-secondary md:text-base">
                Ajusta operación, adopción, reportes y cierre contable. El dashboard calcula TCO actual, TCO proyectado, breakeven y ahorro acumulado.
              </p>
            </div>

            <div className="mt-8 grid gap-7 lg:grid-cols-[0.86fr_1.14fr]">
              <div className="space-y-5">
                <div>
                  <p className="mb-3 font-technical text-[9px] font-black uppercase tracking-[0.22em] text-accent/80">
                    Escenario
                  </p>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {(Object.keys(scenarioCopy) as Scenario[]).map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setScenario(item)}
                        className={`border px-4 py-3 text-left transition duration-300 ${
                          scenario === item
                            ? "border-accent bg-accent-soft text-accent"
                            : "border-border bg-bg-panel/70 text-text-secondary hover:border-accent/55 hover:text-accent"
                        }`}
                      >
                        <span className="font-technical text-[9px] font-black uppercase tracking-[0.18em]">
                          {scenarioCopy[item].title}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-xs leading-5 text-text-tertiary">{scenarioCopy[scenario].description}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <NumberField label="Usuarios Oracle" value={input.users} onChange={(value) => updateInput("users", value)} />
                  <NumberField label="Licencias anuales" value={input.licenseCost} onChange={(value) => updateInput("licenseCost", value)} prefix="$" />
                  <NumberField label="Soporte anual" value={input.supportCost} onChange={(value) => updateInput("supportCost", value)} prefix="$" />
                  <NumberField label="Costo remediación" value={input.remediationCost} onChange={(value) => updateInput("remediationCost", value)} prefix="$" />
                  <NumberField label="Horas manuales / mes" value={input.manualHours} onChange={(value) => updateInput("manualHours", value)} suffix="h" />
                  <NumberField label="Costo hora interna" value={input.hourlyCost} onChange={(value) => updateInput("hourlyCost", value)} prefix="$" />
                </div>

                <div className="grid gap-3">
                  <RangeField label="Días de cierre contable" value={input.closingDays} onChange={(value) => updateInput("closingDays", value)} min={0} max={30} suffix=" días" helper="Retraso del cierre mensual después del go-live." />
                  <RangeField label="Reportes manuales activos" value={input.manualReports} onChange={(value) => updateInput("manualReports", value)} min={0} max={40} helper="Archivos paralelos usados fuera del ERP." />
                  <RangeField label="Adopción real" value={input.adoptionRate} onChange={(value) => updateInput("adoptionRate", value)} min={0} max={100} suffix="%" helper="Usuarios clave operando correctamente en el flujo Oracle." />
                </div>
              </div>

              <FinancialDashboard result={result} />
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-technical text-[9px] uppercase tracking-[0.22em] text-text-tertiary">
                Estimación ejecutiva · Validación final bajo NDA
              </p>
              <FinancialButton onClick={onClose}>Cerrar cálculo</FinancialButton>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function PreviewDashboard({ onOpen }: { onOpen: () => void }) {
  const current = 1200000;
  const projected = 610000;
  const max = Math.max(current, projected);

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      whileHover={{ y: -6 }}
      className="fabric-panel relative w-full max-w-[480px] overflow-hidden bg-bg-panel/82 p-5 shadow-[0_30px_110px_rgba(0,0,0,0.48)] backdrop-blur-xl md:p-6"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/75 to-transparent" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />

      <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <p className="font-technical text-[9px] font-black uppercase tracking-[0.24em] text-accent">
            ERP Cost Model
          </p>
          <p className="mt-2 text-sm text-text-secondary">Vista financiera ejecutiva</p>
        </div>

        <span className="flex h-10 w-10 items-center justify-center border border-accent/30 bg-accent-soft text-accent">
          <CalculatorIcon />
        </span>
      </div>

      <div className="mt-5 grid gap-4">
        {[
          { label: "TCO actual", value: current, accent: false },
          { label: "TCO con FABRIC", value: projected, accent: true },
        ].map((row) => (
          <div key={row.label}>
            <div className="mb-2 flex items-center justify-between gap-4">
              <span className="font-technical text-[9px] font-black uppercase tracking-[0.18em] text-text-tertiary">
                {row.label}
              </span>
              <span className="font-technical text-sm font-black text-text-primary">{formatCompactUsd(row.value)}</span>
            </div>
            <div className="h-2 overflow-hidden bg-bg-base">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(row.value / max) * 100}%` }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className={`h-full ${row.accent ? "bg-accent" : "bg-border-strong"}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="border border-border bg-bg-base/70 p-4">
          <p className="font-technical text-[8px] font-black uppercase tracking-[0.18em] text-text-tertiary">Breakeven</p>
          <p className="mt-2 font-technical text-xl font-black text-accent">8-14m</p>
        </div>
        <div className="border border-border bg-bg-base/70 p-4">
          <p className="font-technical text-[8px] font-black uppercase tracking-[0.18em] text-text-tertiary">5Y saving</p>
          <p className="mt-2 font-technical text-xl font-black text-text-primary">$2.4M</p>
        </div>
      </div>

      <div className="mt-5">
        <FinancialButton onClick={onOpen}>
          Calcular costo real
          <ArrowIcon />
        </FinancialButton>
      </div>
    </motion.article>
  );
}

export default function ErpCostCalculatorSection() {
  const [openCalculator, setOpenCalculator] = useState(false);

  return (
    <section className="relative overflow-hidden bg-bg-base px-6 py-20 text-text-primary md:px-12 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(201,169,110,0.11),transparent_28%),radial-gradient(circle_at_82%_58%,rgba(201,169,110,0.08),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg-base to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-base to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} className="max-w-3xl">
          <div className="label inline-flex items-center gap-2 border border-accent/25 bg-accent-soft px-4 py-2">
            <ShieldIcon />
            ERP Cost Intelligence
          </div>

          <div className="mt-7">
            <AnimatedHeadline text="¿Cuánto te está costando realmente tu ERP actual?" />
          </div>

          <p className="mt-7 max-w-2xl text-base leading-8 text-text-secondary md:text-lg">
            Calculamos el costo total del ERP sumando licencias, soporte, horas manuales, reportes paralelos, cierre contable lento y adopción incompleta. El resultado muestra si conviene rescatar, estabilizar o migrar.
          </p>

          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
            {["TCO anual real", "Costo oculto operativo", "Breakeven de remediación", "Ahorro acumulado a 5 años"].map((item) => (
              <motion.div
                key={item}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                className="flex gap-3 border border-border bg-bg-panel/65 p-4 backdrop-blur-sm transition duration-300 hover:border-accent/50 hover:bg-bg-elevated/70"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                <p className="text-sm leading-6 text-text-secondary">{item}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-9">
            <FinancialButton onClick={() => setOpenCalculator(true)}>
              Calcular costo real
              <ArrowIcon />
            </FinancialButton>
          </div>
        </motion.div>

        <div className="flex justify-center lg:justify-end">
          <PreviewDashboard onOpen={() => setOpenCalculator(true)} />
        </div>
      </div>

      <CalculatorModal open={openCalculator} onClose={() => setOpenCalculator(false)} />
    </section>
  );
}
