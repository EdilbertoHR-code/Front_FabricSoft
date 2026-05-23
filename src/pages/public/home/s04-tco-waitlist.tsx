import { useMemo, useState, type FormEvent } from "react";

type CloudProvider = "AWS" | "Google Cloud (GCP)" | "Microsoft Azure" | "Otro / On-premise";
type AnalysisPeriod = "Ultimo mes" | "Ultimos 3 meses" | "Ultimos 12 meses";
type CriticalApplication =
  | "SAP S/4 HANA"
  | "SAP ECC"
  | "Microsoft Dynamics"
  | "NetSuite"
  | "Oracle EBS"
  | "Oracle JD Edwards"
  | "Oracle PeopleSoft"
  | "Apps custom / legacy"
  | "Otro";

type CloudForm = {
  company: string;
  role: string;
  email: string;
  phone: string;
  cloudProvider: CloudProvider;
  monthlySpend: number;
  computeSpend: number;
  storageSpend: number;
  databaseSpend: number;
  networkingSpend: number;
  otherSpend: number;
  analysisPeriod: AnalysisPeriod;
  workload: string;
  criticalApplication: CriticalApplication;
  ndaAccepted: boolean;
};

const DEFAULT_FORM: CloudForm = {
  company: "",
  role: "",
  email: "",
  phone: "",
  cloudProvider: "AWS",
  monthlySpend: 28500,
  computeSpend: 12400,
  storageSpend: 5800,
  databaseSpend: 7200,
  networkingSpend: 2100,
  otherSpend: 1000,
  analysisPeriod: "Ultimos 12 meses",
  workload: "",
  criticalApplication: "SAP S/4 HANA",
  ndaAccepted: false,
};

const CLOUD_PROVIDERS: CloudProvider[] = ["AWS", "Google Cloud (GCP)", "Microsoft Azure", "Otro / On-premise"];
const PERIODS: AnalysisPeriod[] = ["Ultimo mes", "Ultimos 3 meses", "Ultimos 12 meses"];
const CRITICAL_APPS: CriticalApplication[] = [
  "SAP S/4 HANA",
  "SAP ECC",
  "Microsoft Dynamics",
  "NetSuite",
  "Oracle EBS",
  "Oracle JD Edwards",
  "Oracle PeopleSoft",
  "Apps custom / legacy",
  "Otro",
];

const bullets = [
  "Analisis de costo cloud actual por componente",
  "Estimacion equivalente en Oracle Cloud Infrastructure",
  "ROI de migracion con plazo de breakeven",
  "Riesgos y consideraciones sin instrucciones tecnicas de migracion",
];

const fmt = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

const clamp = (value: number, min = 0) => {
  if (Number.isNaN(value)) return min;
  return Math.max(value, min);
};

function estimateCloudComparison(form: CloudForm) {
  const monthlySpend =
    form.monthlySpend || form.computeSpend + form.storageSpend + form.databaseSpend + form.networkingSpend + form.otherSpend;
  const savingsRate = form.cloudProvider === "Otro / On-premise" ? 0.18 : 0.26;
  const ociMonthly = monthlySpend * (1 - savingsRate);
  const monthlySavings = monthlySpend - ociMonthly;
  const annualSavings = monthlySavings * 12;
  const estimatedMigration = Math.max(monthlySpend * 5.5, 90000);
  const breakeven = annualSavings > 0 ? Math.ceil((estimatedMigration / annualSavings) * 12) : 0;

  return {
    monthlySpend,
    annualSpend: monthlySpend * 12,
    ociMonthly,
    monthlySavings,
    annualSavings,
    savingsRate,
    estimatedMigration,
    breakeven,
    savings5y: annualSavings * 5,
  };
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.15em] text-[#F5F5F5]/50">{children}</span>;
}

const inputClass =
  "w-full border border-[#2A2A2A] bg-[#111] px-4 py-3 text-sm text-[#F5F5F5] outline-none transition-all duration-300 placeholder:text-[#F5F5F5]/25 focus:border-[#C9A96E] focus:bg-black rounded-sm";

function TextInput({ label, value, onChange, placeholder, type = "text", required = true }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <input required={required} type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className={inputClass} />
    </label>
  );
}

function NumberInput({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <div className="flex items-center border border-[#2A2A2A] bg-[#111] px-4 py-3 transition-all duration-300 focus-within:border-[#C9A96E] focus-within:bg-black rounded-sm">
        <span className="mr-2 font-mono text-sm text-[#F5F5F5]/45">$</span>
        <input
          required
          type="number"
          min={0}
          value={value}
          onChange={(event) => onChange(clamp(Number(event.target.value)))}
          className="w-full bg-transparent font-mono text-sm text-[#F5F5F5] outline-none"
        />
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
      <select value={value} onChange={(event) => onChange(event.target.value as T)} className={`${inputClass} cursor-pointer appearance-none`}>
        {options.map((option) => (
          <option key={option} value={option} className="bg-[#0A0A0A]">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function ReportPreview({ form }: { form: CloudForm }) {
  const estimate = estimateCloudComparison(form);
  const rows = [
    { label: "Cloud provider", value: form.cloudProvider },
    { label: "Periodo analizado", value: form.analysisPeriod },
    { label: "Costo promedio mensual", value: fmt(estimate.monthlySpend) },
    { label: "Costo anual proyectado", value: fmt(estimate.annualSpend) },
    { label: "Compute", value: fmt(form.computeSpend) },
    { label: "Storage", value: fmt(form.storageSpend) },
    { label: "Database", value: fmt(form.databaseSpend) },
    { label: "Networking", value: fmt(form.networkingSpend) },
    { label: "Equivalente OCI mensual", value: fmt(estimate.ociMonthly), accent: true },
  ];

  return (
    <div className="relative border border-[#2A2A2A] bg-[#0A0A0A] p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-colors duration-500 hover:border-[#C9A96E]/40 md:p-8 rounded-sm">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent opacity-50" />

      <div className="mb-6 flex items-center justify-between border-b border-[#2A2A2A]/60 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">Ejemplo estimado</span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#F5F5F5]/40">Preview manual</span>
      </div>

      <div className="border border-[#2A2A2A]/60 bg-[#111] p-6 rounded-sm">
        <div className="space-y-4">
          {rows.map((item) => (
            <div key={item.label} className="flex items-center justify-between border-b border-[#2A2A2A]/40 pb-3 last:border-b-0 last:pb-0">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#F5F5F5]/60">{item.label}</span>
              <span className={`text-right font-mono text-[11px] font-bold uppercase tracking-[0.1em] ${item.accent ? "text-[#C9A96E]" : "text-[#F5F5F5]/80"}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 border-t border-[#2A2A2A] pt-6 sm:grid-cols-2">
          <div className="border border-[#C9A96E]/10 bg-[#C9A96E]/[0.02] p-5 text-center rounded-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#C9A96E]/80">Ahorro anual estimado</p>
            <p className="mt-2 font-serif text-3xl tracking-tight text-[#C9A96E]">{fmt(estimate.annualSavings)}</p>
          </div>
          <div className="border border-[#2A2A2A]/60 bg-[#0A0A0A] p-5 text-center rounded-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#F5F5F5]/45">Breakeven</p>
            <p className="mt-2 font-serif text-3xl tracking-tight text-[#F5F5F5]">{estimate.breakeven} meses</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CloudComparatorModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<CloudForm>(DEFAULT_FORM);
  const estimate = useMemo(() => estimateCloudComparison(form), [form]);

  if (!isOpen) return null;

  const update = <K extends keyof CloudForm>(key: K, value: CloudForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const publicEmail = /(gmail|hotmail|outlook|yahoo)\./i.test(form.email);

    if (publicEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return;
    if (!form.ndaAccepted) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/90 px-4 py-6 backdrop-blur-md">
      <div className="relative w-full max-w-[1120px] overflow-hidden border border-[#2A2A2A] bg-[#0D0D0D] p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] sm:p-10 rounded-sm">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center border border-[#2A2A2A] bg-[#111] text-[#F5F5F5]/60 transition-all duration-300 hover:border-[#C9A96E]/50 hover:text-[#C9A96E] rounded-sm"
          aria-label="Cerrar"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <div className="mb-8">
                <span className="mb-3 inline-flex border border-[#C9A96E]/30 bg-[#C9A96E]/10 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] rounded-sm">
                  Cloud Comparator inicial sin costo
                </span>
                <h3 className="font-serif text-3xl tracking-tight text-[#F5F5F5] md:text-4xl">Solicitar analisis comparativo</h3>
                <p className="mt-2 max-w-2xl font-sans text-sm leading-relaxed text-[#F5F5F5]/60">
                  Captura manualmente tu gasto cloud mensual, workload principal y aplicaciones criticas. FABRIC entrega en 5-7 dias un reporte inicial sin costo con costo actual, equivalente OCI/Fusion, ROI proyectado, breakeven y riesgos de migracion.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextInput label="Empresa" value={form.company} onChange={(value) => update("company", value)} />
                <TextInput label="Cargo" value={form.role} placeholder="CFO / CIO / CTO" onChange={(value) => update("role", value)} />
                <TextInput label="Email corporativo" type="email" value={form.email} onChange={(value) => update("email", value)} />
                <TextInput label="Telefono" type="tel" value={form.phone} placeholder="+52" required={false} onChange={(value) => update("phone", value)} />
                <SelectInput label="Cloud actual" value={form.cloudProvider} options={CLOUD_PROVIDERS} onChange={(value) => update("cloudProvider", value)} />
                <SelectInput label="Periodo analizado" value={form.analysisPeriod} options={PERIODS} onChange={(value) => update("analysisPeriod", value)} />
                <NumberInput label="Factura mensual actual" value={form.monthlySpend} onChange={(value) => update("monthlySpend", value)} />
                <SelectInput label="ERP / aplicacion critica" value={form.criticalApplication} options={CRITICAL_APPS} onChange={(value) => update("criticalApplication", value)} />
              </div>

              <div className="mt-6">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.15em] text-[#C9A96E]">Distribucion mensual aproximada</p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <NumberInput label="Compute" value={form.computeSpend} onChange={(value) => update("computeSpend", value)} />
                  <NumberInput label="Storage" value={form.storageSpend} onChange={(value) => update("storageSpend", value)} />
                  <NumberInput label="Database" value={form.databaseSpend} onChange={(value) => update("databaseSpend", value)} />
                  <NumberInput label="Networking" value={form.networkingSpend} onChange={(value) => update("networkingSpend", value)} />
                  <NumberInput label="Otros" value={form.otherSpend} onChange={(value) => update("otherSpend", value)} />
                </div>
              </div>

              <label className="mt-6 block">
                <FieldLabel>Carga de trabajo principal</FieldLabel>
                <textarea
                  required
                  value={form.workload}
                  placeholder="Ejemplo: ERP financiero, data warehouse, integraciones OIC, analytics, aplicaciones internas."
                  onChange={(event) => update("workload", event.target.value)}
                  className={`${inputClass} min-h-[110px] resize-y`}
                />
              </label>

              <label className="mt-5 flex items-start gap-3 font-sans text-xs leading-relaxed text-[#F5F5F5]/60">
                <input
                  required
                  type="checkbox"
                  checked={form.ndaAccepted}
                  onChange={(event) => update("ndaAccepted", event.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#C9A96E]"
                />
                Acepto que FABRIC revise esta informacion bajo NDA para preparar un analisis comparativo inicial sin costo. El reporte no incluye instrucciones tecnicas de migracion.
              </label>

              <button type="submit" className="mt-8 flex w-full items-center justify-center gap-3 border border-[#C9A96E] bg-[#C9A96E]/10 px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] transition-all duration-300 hover:bg-[#C9A96E] hover:text-black sm:w-auto rounded-sm">
                Solicitar analisis sin costo
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12H19M13 6L19 12L13 18" />
                </svg>
              </button>
            </div>

            <aside className="border border-[#2A2A2A] bg-[#080808] p-6 rounded-sm">
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.15em] text-[#C9A96E]">Vista previa del reporte</p>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-[#2A2A2A]/50 pb-3">
                  <span className="font-sans text-sm text-[#F5F5F5]/55">Costo mensual actual</span>
                  <span className="font-mono text-sm text-[#F5F5F5]">{fmt(estimate.monthlySpend)}</span>
                </div>
                <div className="flex justify-between border-b border-[#2A2A2A]/50 pb-3">
                  <span className="font-sans text-sm text-[#F5F5F5]/55">Equivalente OCI</span>
                  <span className="font-mono text-sm text-[#C9A96E]">{fmt(estimate.ociMonthly)}</span>
                </div>
                <div className="flex justify-between border-b border-[#2A2A2A]/50 pb-3">
                  <span className="font-sans text-sm text-[#F5F5F5]/55">Ahorro anual</span>
                  <span className="font-mono text-sm text-[#C9A96E]">{fmt(estimate.annualSavings)}</span>
                </div>
                <div className="flex justify-between border-b border-[#2A2A2A]/50 pb-3">
                  <span className="font-sans text-sm text-[#F5F5F5]/55">Breakeven</span>
                  <span className="font-mono text-sm text-[#F5F5F5]">{estimate.breakeven} meses</span>
                </div>
              </div>
              <p className="mt-6 font-sans text-xs leading-relaxed text-[#F5F5F5]/45">
                Estimacion inicial para orientar la conversacion. El reporte se prepara con los datos manuales capturados, contexto de workload y validacion tecnica senior.
              </p>
            </aside>
          </form>
        ) : (
          <div className="mx-auto flex max-w-[560px] flex-col items-center justify-center py-12 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center border border-[#C9A96E] bg-[#C9A96E]/10 text-[#C9A96E] rounded-sm">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-serif text-3xl text-[#F5F5F5] md:text-4xl">Solicitud recibida</h3>
            <p className="mt-4 font-sans text-base leading-relaxed text-[#F5F5F5]/60">
              FABRIC revisara tu informacion y preparara el Cloud Comparator inicial sin costo en 5-7 dias. El reporte incluira costo actual, equivalente OCI/Fusion, ROI proyectado, breakeven y riesgos de migracion.
            </p>
            <button onClick={onClose} className="mt-10 border-b border-[#C9A96E]/50 pb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[#C9A96E] transition-colors duration-300 hover:border-[#F5F5F5] hover:text-[#F5F5F5]">
              Cerrar ventana
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function S04TcoWaitlist() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const preview = estimateCloudComparison(DEFAULT_FORM);

  return (
    <section id="cloud-tco" className="relative w-full overflow-hidden bg-[#050505] py-24 text-[#F5F5F5] md:py-32">
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 -z-10 m-auto h-[600px] w-[600px] -translate-y-1/2 bg-[#C9A96E] opacity-[0.03] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="mx-auto mb-16 max-w-[820px] text-center">
          <div className="mb-6 inline-flex items-center gap-3 border border-[#C9A96E]/20 bg-[#C9A96E]/5 px-4 py-1.5 backdrop-blur-sm rounded-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#C9A96E] opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#C9A96E]" />
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E]">Lead Magnet · Cloud Cost Comparator</span>
          </div>

          <h2 className="font-serif text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-tight text-[#F5F5F5]">
            ¿Cuánto pagas <span className="text-[#C9A96E]">realmente</span> en AWS, GCP o Azure?
          </h2>
          <p className="mx-auto mt-6 max-w-[650px] font-sans text-lg leading-relaxed text-[#F5F5F5]/60">
            Compara tu cloud actual contra Oracle Cloud Infrastructure. Captura tus datos manualmente y FABRIC prepara un reporte inicial sin costo con costo actual, equivalente OCI/Fusion, ROI proyectado, breakeven y riesgos de migracion.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 xl:items-start">
          <ReportPreview form={DEFAULT_FORM} />

          <div className="flex flex-col justify-center">
            <div className="space-y-5">
              {bullets.map((item) => (
                <div key={item} className="flex items-start gap-4 border-b border-[#2A2A2A]/40 pb-4">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-[#C9A96E]/30 bg-[#C9A96E]/10 text-[#C9A96E] rounded-sm">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-sans text-[15px] leading-relaxed text-[#F5F5F5]/70">{item}</p>
                </div>
              ))}
            </div>

            <div className="my-10">
              <h3 className="mb-3 font-serif text-[26px] leading-tight text-[#F5F5F5]">
                En 5-7 dias recibes un reporte inicial sin costo.
              </h3>
              <p className="mb-8 font-sans text-[15px] leading-relaxed text-[#F5F5F5]/60">
                Captura gasto mensual, workload principal y aplicaciones criticas. No pedimos PDF, instrucciones tecnicas ni acceso operativo para esta etapa.
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex w-full items-center justify-center gap-3 bg-[#C9A96E] px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-black shadow-[0_0_20px_-5px_rgba(201,169,110,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_-5px_rgba(201,169,110,0.7)] active:scale-[0.98] sm:w-auto rounded-sm"
              >
                Solicitar analisis comparativo
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12H19M13 6L19 12L13 18" />
                </svg>
              </button>
            </div>

            <div className="border-t border-[#2A2A2A]/60 pt-8">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.1em] text-[#F5F5F5]/40">Ejemplo gasto mensual</p>
                  <p className="font-mono text-[14px] font-bold tracking-[0.1em] text-[#F5F5F5]">{fmt(preview.monthlySpend)}</p>
                </div>
                <div>
                  <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.1em] text-[#F5F5F5]/40">Ahorro anual estimado</p>
                  <p className="font-mono text-[14px] font-bold tracking-[0.1em] text-[#C9A96E]">{fmt(preview.annualSavings)}</p>
                </div>
                <div>
                  <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.1em] text-[#F5F5F5]/40">Entrega</p>
                  <p className="font-mono text-[14px] font-bold tracking-[0.1em] text-[#C9A96E]">5-7 dias</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CloudComparatorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
