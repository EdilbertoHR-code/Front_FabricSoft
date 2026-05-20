import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  "Análisis de costo total a 5 y 10 años",
  "Breakeven de migración estimado",
  "ROI proyectado con benchmarks Oracle",
  "Opción de análisis detallado con datos reales",
];

const previewRows = [
  { label: "Sistema actual", value: "SAP S/4 HANA" },
  { label: "Usuarios", value: "150" },
  { label: "Año 1 actual", value: "$485,000" },
  { label: "Año 1 Oracle", value: "$310,000" },
  { label: "Ahorro 5 años", value: "$1,240,000" },
  { label: "Breakeven", value: "18 meses" },
];

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2L14.25 8.15L20.5 10.5L14.25 12.85L12 19L9.75 12.85L3.5 10.5L9.75 8.15L12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CalculatorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 7H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M8 11H8.01M12 11H12.01M16 11H16.01M8 15H8.01M12 15H12.01M16 15H16.01"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function NumberInput({
  label,
  value,
  onChange,
  prefix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] font-black uppercase tracking-[0.24em] text-[#D4AF37]/80">
        {label}
      </span>
      <div className="flex items-center border border-[#D4AF37]/18 bg-[#050505]/70 px-4 py-3 transition focus-within:border-[#D4AF37]/60">
        {prefix ? <span className="mr-2 font-mono text-sm text-[#F5E6A3]/60">{prefix}</span> : null}
        <input
          type="number"
          value={value}
          min={0}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full bg-transparent font-mono text-sm text-[#F8F5EA] outline-none placeholder:text-[#D8D0BB]/30"
        />
      </div>
    </label>
  );
}

function CalculatorModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [users, setUsers] = useState(150);
  const [currentCost, setCurrentCost] = useState(485000);
  const [oracleCost, setOracleCost] = useState(310000);
  const [migrationCost, setMigrationCost] = useState(260000);

  const result = useMemo(() => {
    const annualSaving = Math.max(currentCost - oracleCost, 0);
    const saving5Years = annualSaving * 5 - migrationCost;
    const saving10Years = annualSaving * 10 - migrationCost;
    const breakevenMonths = annualSaving > 0 ? Math.ceil((migrationCost / annualSaving) * 12) : 0;
    const savingPerUser = users > 0 ? annualSaving / users : 0;

    return {
      annualSaving,
      saving5Years,
      saving10Years,
      breakevenMonths,
      savingPerUser,
    };
  }, [users, currentCost, oracleCost, migrationCost]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/72 px-4 py-8 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto border border-[#D4AF37]/22 bg-[#0B0B09] p-6 shadow-[0_40px_160px_rgba(0,0,0,0.75)] md:p-8"
          >
            <div className="absolute left-0 top-0 h-16 w-px bg-[#D4AF37]" />
            <div className="absolute left-0 top-0 h-px w-24 bg-[#D4AF37]" />
            <div className="absolute bottom-0 right-0 h-16 w-px bg-[#D4AF37]/60" />
            <div className="absolute bottom-0 right-0 h-px w-24 bg-[#D4AF37]/60" />

            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center border border-[#D4AF37]/18 text-[#F5E6A3] transition hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/10"
              aria-label="Cerrar calculadora"
            >
              <CloseIcon />
            </button>

            <div className="pr-12">
              <div className="mb-3 inline-flex bg-[#D4AF37] px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.28em] text-[#050505]">
                Calculadora TCO
              </div>
              <h3 className="max-w-3xl text-3xl font-black tracking-tight text-[#F8F5EA] md:text-5xl">
                Estima el costo real de tu ERP actual.
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#D8D0BB]/72 md:text-base">
                Ajusta los datos y calcula una proyección rápida de ahorro, breakeven y costo por usuario.
              </p>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-5">
                <NumberInput label="Usuarios" value={users} onChange={setUsers} />
                <NumberInput label="Costo anual ERP actual" value={currentCost} onChange={setCurrentCost} prefix="$" />
                <NumberInput label="Costo anual Oracle" value={oracleCost} onChange={setOracleCost} prefix="$" />
                <NumberInput label="Costo estimado de migración" value={migrationCost} onChange={setMigrationCost} prefix="$" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="border border-[#D4AF37]/16 bg-white/[0.035] p-5">
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-[#D4AF37]/75">
                    Ahorro anual
                  </p>
                  <p className="mt-3 text-3xl font-black text-[#F5E6A3]">{formatCurrency(result.annualSaving)}</p>
                </div>

                <div className="border border-[#D4AF37]/16 bg-white/[0.035] p-5">
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-[#D4AF37]/75">
                    Breakeven
                  </p>
                  <p className="mt-3 text-3xl font-black text-[#F5E6A3]">
                    {result.breakevenMonths > 0 ? `${result.breakevenMonths} meses` : "Sin ahorro"}
                  </p>
                </div>

                <div className="border border-[#D4AF37]/16 bg-white/[0.035] p-5">
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-[#D4AF37]/75">
                    Ahorro 5 años
                  </p>
                  <p className="mt-3 text-3xl font-black text-[#F5E6A3]">{formatCurrency(result.saving5Years)}</p>
                </div>

                <div className="border border-[#D4AF37]/16 bg-[#D4AF37] p-5 text-[#050505]">
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em]">
                    Ahorro 10 años
                  </p>
                  <p className="mt-3 text-4xl font-black">{formatCurrency(result.saving10Years)}</p>
                </div>

                <div className="border border-[#D4AF37]/16 bg-white/[0.035] p-5 sm:col-span-2">
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-[#D4AF37]/75">
                    Ahorro anual aproximado por usuario
                  </p>
                  <p className="mt-3 text-3xl font-black text-[#F5E6A3]">{formatCurrency(result.savingPerUser)}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-[#D4AF37]/14 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#D4AF37]/65">
                Resultado estimado · Requiere validación con datos reales
              </p>
              <button
                type="button"
                onClick={onClose}
                className="w-fit bg-[#D4AF37] px-6 py-3 font-mono text-xs font-black uppercase tracking-[0.22em] text-[#050505] transition hover:bg-[#F5E6A3]"
              >
                Cerrar resultado
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function PreviewCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34, rotate: -1.2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, rotate: 0.4 }}
      className="relative w-full max-w-[430px] overflow-hidden border border-[#D4AF37]/20 bg-[#0D0D0B]/90 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8"
    >
      <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#D4AF37]/12 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent" />

      <div className="relative mb-7 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#D4AF37]">
          <SparkIcon />
          Preview
        </div>
        <div className="rounded-full border border-[#D4AF37]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5E6A3]/70">
          TCO
        </div>
      </div>

      <div className="relative space-y-1">
        {previewRows.map((row, index) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 + index * 0.06, duration: 0.45 }}
            className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-dashed border-[#D4AF37]/14 py-3 text-sm"
          >
            <span className="font-mono text-[#F5E6A3]/72">{row.label}</span>
            <span className="bg-[#D4AF37] px-2 py-1 font-mono text-xs font-black text-[#050505]">
              {row.value}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.55 }}
        className="relative mt-7 border-t border-[#D4AF37]/22 pt-6 text-right"
      >
        <p className="font-mono text-sm uppercase tracking-[0.18em] text-[#F5E6A3]">Ahorro 10 años:</p>
        <p className="mt-2 text-4xl font-black tracking-tight text-[#D4AF37] md:text-5xl">$3.8M</p>
      </motion.div>
    </motion.div>
  );
}

export default function ErpTcoLeadMagnet() {
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-24 text-white md:px-10 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.14),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(212,175,55,0.08),transparent_32%)]" />
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#D4AF37_1px,transparent_1px),linear-gradient(to_bottom,#D4AF37_1px,transparent_1px)] bg-[size:82px_82px]" />
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#D4AF37]/70 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 border border-[#D4AF37]/14 bg-[#0B0B09]/72 p-6 shadow-[0_40px_140px_rgba(0,0,0,0.55)] backdrop-blur-xl md:p-12 lg:grid-cols-[1.05fr_0.85fr] lg:p-16"
      >
        <div className="absolute left-0 top-0 h-16 w-px bg-[#D4AF37]" />
        <div className="absolute left-0 top-0 h-px w-24 bg-[#D4AF37]" />
        <div className="absolute bottom-0 right-0 h-16 w-px bg-[#D4AF37]/55" />
        <div className="absolute bottom-0 right-0 h-px w-24 bg-[#D4AF37]/55" />

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mb-7 inline-flex bg-[#D4AF37] px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.32em] text-[#050505]"
          >
            Lead Magnet · ERP TCO
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-[#F8F5EA] md:text-7xl"
          >
            ¿Cuánto te está costando realmente tu ERP actual?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.22 }}
            className="mt-7 max-w-2xl text-lg leading-8 text-[#D8D0BB]/82"
          >
            Comparativo TCO Oracle Fusion vs tu SAP, EBS, JD Edwards, PeopleSoft o Microsoft Dynamics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.3 }}
            className="mt-9 space-y-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.36 + index * 0.06 }}
                className="group flex items-center gap-3 border-b border-[#D4AF37]/12 py-3 text-sm text-[#F5E6A3]/82"
              >
                <span className="text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
                <span className="text-[#D8D0BB]/88 transition-colors group-hover:text-[#F5E6A3]">
                  {feature}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.55 }}
            className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center"
          >
            <button
              type="button"
              onClick={() => setCalculatorOpen(true)}
              className="group inline-flex w-fit items-center justify-center gap-3 bg-[#D4AF37] px-8 py-5 font-mono text-xs font-black uppercase tracking-[0.26em] text-[#050505] shadow-[0_0_50px_rgba(212,175,55,0.18)] transition duration-300 hover:-translate-y-1 hover:bg-[#F5E6A3]"
            >
              <CalculatorIcon />
              Calcular ahorro
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>

            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#D4AF37]/75">
              8 preguntas · Resultado inmediato en pantalla
            </span>
          </motion.div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <PreviewCard />
        </div>
      </motion.div>

      <CalculatorModal open={calculatorOpen} onClose={() => setCalculatorOpen(false)} />
    </section>
  );
}
