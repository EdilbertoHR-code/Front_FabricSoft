import { motion } from "framer-motion";

const rescueBullets = [
  "Patrones de fracaso identificados según síntomas",
  "Estimación de complejidad de rescate",
  "Plan de remediación accionable",
  "Costos y plazos estimados",
];

const severityMetrics = [
  { label: "Cierre contable", value: ">15 días" },
  { label: "Reportes manuales", value: "12 activos" },
  { label: "Adopción usuarios", value: "42%" },
  { label: "Incidencias críticas", value: "7 abiertas" },
];

const doctrineItems = [
  {
    number: "01",
    title: "Entrega en primer ciclo crítico.",
    body:
      "El proyecto se entrega cuando tu primer cierre contable, primer ciclo operativo o primer ciclo regulatorio crítico opera en producción con estabilidad documentada.",
    tag: "VALIDADO · APE PLAZAS",
  },
  {
    number: "02",
    title: "Solo seniors. Cero juniors facturables.",
    body:
      "Cada consultor de FABRIC tiene mínimo 8 años de experiencia real en Oracle. Sin excepciones.",
    tag: "CONTRACTUAL",
  },
  {
    number: "03",
    title: "Fixed-Price por fase. Cero sorpresas.",
    body:
      "Operamos con presupuestos cerrados. Si nos atrasamos por nuestra causa, no facturamos las semanas adicionales.",
    tag: "CONTRACTUAL",
  },
  {
    number: "04",
    title: "Cero reportes manuales post go-live.",
    body:
      "Si subsiste un reporte manual paralelo por causa atribuible a FABRIC, se resuelve sin costo adicional hasta su eliminación.",
    tag: "VALIDADO · APE PLAZAS",
  },
  {
    number: "05",
    title: "Transición formal con documentación viva.",
    body:
      "Acta firmada por todos los stakeholders, tablero de KPIs verificado, y documentación auditable y actualizable por el cliente sin dependencia de FABRIC.",
    tag: "VALIDADO · APE PLAZAS",
  },
];

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MetricCard({ label, value, delay }: { label: string; value: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, delay }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative overflow-hidden rounded-[28px] border border-[#D4AF37]/14 bg-white/[0.035] p-5 shadow-[0_18px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300 hover:border-[#D4AF37]/45 hover:bg-[#D4AF37]/[0.055]"
    >
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#D4AF37]/10 blur-2xl transition group-hover:bg-[#D4AF37]/18" />
      <p className="relative font-mono text-[10px] uppercase tracking-[0.22em] text-[#D8D0BB]/54">{label}</p>
      <p className="relative mt-3 text-2xl font-black tracking-tight text-[#F5E6A3] md:text-3xl">{value}</p>
    </motion.div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="inline-flex rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-4 py-2 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#F5E6A3] shadow-[0_0_45px_rgba(212,175,55,0.08)]">
      {children}
    </div>
  );
}

function RescueAssessment() {
  return (
    <section className="relative grid items-center gap-10 lg:grid-cols-[1fr_0.84fr]">
      <motion.div
        initial={{ opacity: 0, x: -28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <p className="font-mono text-[11px] font-black uppercase tracking-[0.35em] text-[#D4AF37]">S05 · RESCUE ASSESSMENT</p>

        <div className="mt-5">
          <SectionLabel>Lead Magnet · Rescue Diagnostic</SectionLabel>
        </div>

        <h2 className="mt-7 max-w-4xl text-4xl font-black leading-[0.95] tracking-tight text-[#F8F5EA] md:text-6xl lg:text-7xl">
          ¿Tu Oracle Fusion está implementado pero el negocio sigue sufriendo?
        </h2>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-[#D8D0BB]/80">
          Si tienes cierre contable pesado, reportes manuales paralelos, usuarios sin adopción o incidencias críticas,
          FABRIC realiza diagnóstico ejecutivo en 5 días hábiles.
        </p>

        <div className="mt-9 grid gap-3">
          {rescueBullets.map((bullet, index) => (
            <motion.div
              key={bullet}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="group flex items-center gap-4 rounded-2xl border border-[#D4AF37]/12 bg-white/[0.025] px-4 py-4 text-sm text-[#D8D0BB]/86 transition duration-300 hover:border-[#D4AF37]/42 hover:bg-[#D4AF37]/[0.055]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/12 text-[#F5E6A3] transition group-hover:bg-[#D4AF37] group-hover:text-[#050505]">
                <CheckIcon />
              </span>
              <span>{bullet}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <button className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#D4AF37] px-7 py-4 font-mono text-xs font-black uppercase tracking-[0.22em] text-[#050505] shadow-[0_0_55px_rgba(212,175,55,0.18)] transition duration-300 hover:-translate-y-1 hover:bg-[#F5E6A3]">
            Iniciar diagnóstico
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </button>

          <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#D4AF37]/72">
            12 preguntas · 5 minutos · Resultado en 5 días hábiles
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[34px] border border-[#D4AF37]/18 bg-[#0B0B09]/88 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8"
      >
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#D4AF37]/12 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#F5E6A3]/[0.06] blur-3xl" />

        <div className="relative flex items-center justify-between gap-4 border-b border-[#D4AF37]/14 pb-5">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-[#D4AF37]">Nivel de severidad:</p>
          <span className="rounded-full bg-[#D4AF37] px-4 py-2 font-mono text-xs font-black uppercase tracking-[0.2em] text-[#050505]">ALTO</span>
        </div>

        <div className="relative mt-6 grid grid-cols-2 gap-4">
          {severityMetrics.map((metric, index) => (
            <MetricCard key={metric.label} label={metric.label} value={metric.value} delay={index * 0.05} />
          ))}
        </div>

        <div className="relative mt-6 rounded-[28px] border border-[#D4AF37]/18 bg-[#D4AF37]/10 p-5">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.26em] text-[#D4AF37]">Patrón detectado:</p>
          <p className="mt-3 text-2xl font-black text-[#F8F5EA] md:text-3xl">Abandono post go-live</p>
          <div className="mt-5 grid gap-3 font-mono text-sm text-[#D8D0BB]/82 sm:grid-cols-2">
            <p>
              Plazo remediación: <span className="text-[#F5E6A3]">8-12 sem</span>
            </p>
            <p>
              Inversión típica: <span className="text-[#F5E6A3]">USD 150-300K</span>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Doctrine() {
  return (
    <section className="relative">
      <div className="mb-10 max-w-5xl">
        <p className="font-mono text-[11px] font-black uppercase tracking-[0.35em] text-[#D4AF37]">S06 · DOCTRINA</p>
        <h3 className="mt-5 text-4xl font-black leading-[0.98] tracking-tight text-[#F8F5EA] md:text-6xl">Doctrina</h3>
        <p className="mt-6 max-w-5xl text-2xl font-black leading-tight text-[#D8D0BB] md:text-4xl">
          No somos consultores. Somos ingenieros que asumen riesgo técnico y financiero por contrato.
        </p>
      </div>

      <div className="grid gap-4">
        {doctrineItems.map((item, index) => (
          <motion.article
            key={item.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.65, delay: index * 0.05 }}
            className="group grid gap-5 rounded-[30px] border border-[#D4AF37]/13 bg-white/[0.025] p-5 transition duration-300 hover:border-[#D4AF37]/45 hover:bg-[#D4AF37]/[0.045] md:grid-cols-[90px_1fr_auto] md:p-6"
          >
            <div className="font-mono text-4xl font-black text-[#D4AF37]/72 transition group-hover:text-[#F5E6A3]">{item.number}</div>
            <div>
              <h4 className="text-xl font-black text-[#F8F5EA]">{item.title}</h4>
              <p className="mt-3 max-w-4xl leading-7 text-[#D8D0BB]/76">{item.body}</p>
            </div>
            <div className="h-fit rounded-full bg-[#D4AF37]/12 px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-[0.22em] text-[#F5E6A3]">
              {item.tag}
            </div>
          </motion.article>
        ))}
      </div>

      <button className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#D4AF37]/22 px-6 py-4 font-mono text-xs font-black uppercase tracking-[0.22em] text-[#F5E6A3] transition hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/10">
        Leer doctrina completa
        <ArrowIcon />
      </button>
    </section>
  );
}

function Guarantee() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[36px] border border-[#D4AF37]/22 bg-[#D4AF37] p-7 text-[#050505] shadow-[0_40px_150px_rgba(212,175,55,0.14)] md:p-12"
    >
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/25 blur-3xl" />
      <div className="absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-black/10 blur-3xl" />

      <p className="relative font-mono text-[11px] font-black uppercase tracking-[0.35em]">THE GUARANTEE</p>
      <h3 className="relative mt-4 text-4xl font-black tracking-tight md:text-6xl">La Garantía FABRIC</h3>
      <blockquote className="relative mt-8 max-w-5xl text-2xl font-black leading-tight md:text-4xl">
        “Si después de 90 días post go-live, tu Oracle Fusion sigue requiriendo reportes manuales ejecutivos paralelos por causa atribuible a FABRIC, devolvemos el 100% de los honorarios de la fase de estabilización.”
      </blockquote>
      <p className="relative mt-8 max-w-3xl text-lg font-semibold leading-8">
        Esto no es marketing. Es cláusula contractual estándar en cada proyecto FABRIC.
      </p>
      <p className="relative mt-7 font-mono text-xs font-black uppercase tracking-[0.24em]">— Doctrina FABRIC</p>
    </motion.section>
  );
}

export default function Part4Home() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-24 text-white md:px-10 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.14),transparent_28%),radial-gradient(circle_at_80%_45%,rgba(212,175,55,0.07),transparent_34%),radial-gradient(circle_at_bottom,rgba(212,175,55,0.09),transparent_40%)]" />
      <div className="absolute inset-0 opacity-[0.055] bg-[linear-gradient(to_right,#D4AF37_1px,transparent_1px),linear-gradient(to_bottom,#D4AF37_1px,transparent_1px)] bg-[size:92px_92px]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#D4AF37]/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-28">
        <RescueAssessment />
        <Doctrine />
        <Guarantee />
      </div>
    </section>
  );
}
