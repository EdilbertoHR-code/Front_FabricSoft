import { notFound } from "next/navigation";
import Link from "next/link";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import SiteInteractions from "@/components/interactions/site-interactions";

interface CaseMetric {
  label: string;
  value: string;
  detail: string;
  highlight?: boolean;
}

interface CaseStudy {
  slug: string;
  tag: string;
  client: string;
  title: string;
  subtitle: string;
  status: string;
  summary: string;
  quote: string;
  author: string;
  metrics: CaseMetric[];
  timeline: string[];
  proof: string[];
}

const caseStudies: CaseStudy[] = [
  {
    slug: "ape-plazas",
    tag: "Caso Ancla · Abril 2026",
    client: "APE Plazas",
    title: "Implementación Oracle Fusion Cloud estabilizada en primer cierre contable.",
    subtitle: "Operadora de centros comerciales · México · Multi-entidad",
    status: "En Producción",
    summary:
      "APE Plazas requería una salida a producción con continuidad operativa y cierre contable controlado. FABRIC acompañó el paso crítico hasta validar que el primer ciclo operara sin incidencias críticas.",
    quote:
      "El cierre contable de abril se ejecutó sin incidencias con acompañamiento FABRIC. Ese es el momento en el que consideramos el proyecto entregado.",
    author: "Director de Finanzas · APE Plazas · abr 2026",
    metrics: [
      { label: "Go-live planeado", value: "06 abril 2026", detail: "Documentado" },
      { label: "Go-live ejecutado", value: "06 abril 2026", detail: "+0 días" },
      { label: "Primer cierre contable", value: "Abril 2026", detail: "Sin incidencias", highlight: true },
      { label: "Incidencias críticas post-GL", value: "0", detail: "Auditado", highlight: true },
      { label: "Transición a soporte", value: "En firma", detail: "Acta vigente" }
    ],
    timeline: [
      "Diagnóstico de riesgo operativo y calendario de salida.",
      "Acompañamiento de go-live con control de incidencias.",
      "Validación del primer cierre contable en producción.",
      "Preparación de acta de transición a soporte."
    ],
    proof: [
      "Acta de salida a producción",
      "Bitácora de cierre contable",
      "Matriz de incidencias críticas",
      "Runbook de transición operativa"
    ]
  },
  {
    slug: "aplazo",
    tag: "Caso Ancla · Q1 2026",
    client: "Aplazo",
    title: "Rescate Oracle Fusion para fintech regulada con operación crítica.",
    subtitle: "Fintech regulada · Crédito al consumo · México",
    status: "Estabilizado",
    summary:
      "El proyecto llegó a FABRIC con señales de abandono post go-live: reportes manuales, cierre contable extendido y adopción limitada. El objetivo fue estabilizar operación, cumplimiento y cierre.",
    quote:
      "FABRIC tomó una implementación abandonada y la convirtió en plataforma operativa estable en 10 semanas. Sin renegociaciones.",
    author: "CFO Controller · Aplazo · feb 2026",
    metrics: [
      { label: "Estado inicial", value: "Crítico", detail: "Pre-FABRIC", highlight: true },
      { label: "Reportes manuales eliminados", value: "5", detail: "12 a 7" },
      { label: "Tiempo de cierre", value: "6d", detail: "-66% (antes 18d)", highlight: true },
      { label: "Adopción de usuarios", value: "95%", detail: "42 a 95" },
      { label: "Compliance regulatorio", value: "Operativo", detail: "CNBV" }
    ],
    timeline: [
      "Diagnóstico de abandono post go-live.",
      "Priorización de reportes y conciliaciones críticas.",
      "Corrección de controles operativos y adopción.",
      "Estabilización de cierre y compliance regulatorio."
    ],
    proof: [
      "Diagnóstico inicial documentado",
      "Comparativo de cierre contable",
      "Inventario de reportes manuales",
      "Evidencia de controles regulatorios"
    ]
  }
];

export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((item) => item.slug === slug);

  if (!caseStudy) return {};

  return {
    title: `${caseStudy.client} · Caso FABRIC`,
    description: caseStudy.summary
  };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((item) => item.slug === slug);

  if (!caseStudy) notFound();

  return (
    <>
      <Header />
      <main className="flex-1 pt-20">
        <section className="border-b border-border-sutil bg-bg-base py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <Link
              href="/#s07"
              className="font-mono text-[11px] uppercase tracking-widest text-text-tertiary transition-colors hover:text-accent"
            >
              ← Volver a casos
            </Link>

            <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-accent">
                  {caseStudy.tag}
                </span>
                <h1 className="mt-5 max-w-4xl font-serif text-5xl font-light leading-none tracking-tight text-text-primary md:text-7xl">
                  {caseStudy.client}
                </h1>
                <p className="mt-5 max-w-3xl font-serif text-2xl font-light leading-snug text-text-primary md:text-3xl">
                  {caseStudy.title}
                </p>
                <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-text-secondary">
                  {caseStudy.summary}
                </p>
              </div>

              <aside className="border border-border-sutil bg-bg-panel p-6">
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  Estado del caso
                </div>
                <div className="mt-3 font-serif text-3xl text-text-primary">{caseStudy.status}</div>
                <div className="mt-4 border-t border-border-sutil pt-4 font-mono text-xs leading-relaxed text-text-secondary">
                  {caseStudy.subtitle}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="border-b border-border-sutil py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="font-serif text-4xl font-light text-text-primary">
                Métricas verificables <em className="italic text-accent">bajo NDA.</em>
              </h2>
              <blockquote className="mt-8 border-l-2 border-accent pl-6 font-serif text-xl italic leading-relaxed text-text-secondary">
                {caseStudy.quote}
              </blockquote>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
                {caseStudy.author}
              </p>
            </div>

            <div className="border border-border-sutil bg-bg-panel">
              {caseStudy.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="grid grid-cols-1 gap-2 border-b border-border-sutil p-5 last:border-b-0 sm:grid-cols-[1fr_auto_auto] sm:items-center"
                >
                  <span className="font-mono text-xs text-text-secondary">{metric.label}</span>
                  <span className={`font-serif text-2xl ${metric.highlight ? "text-accent" : "text-text-primary"}`}>
                    {metric.value}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
                    {metric.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2">
            <div className="border border-border-sutil bg-bg-panel p-8">
              <h2 className="font-mono text-xs uppercase tracking-widest text-accent">Secuencia de trabajo</h2>
              <div className="mt-8 grid gap-5">
                {caseStudy.timeline.map((item, index) => (
                  <div key={item} className="grid grid-cols-[40px_1fr] gap-5 border-b border-border-sutil pb-5 last:border-b-0">
                    <span className="font-mono text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
                    <p className="text-sm leading-relaxed text-text-secondary">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-accent bg-bg-panel p-8">
              <h2 className="font-mono text-xs uppercase tracking-widest text-accent">Proof of Work</h2>
              <p className="mt-5 text-sm leading-relaxed text-text-secondary">
                La documentación completa se comparte únicamente con prospectos calificados dentro del proceso de evaluación.
              </p>
              <ul className="mt-8 grid gap-3">
                {caseStudy.proof.map((item) => (
                  <li key={item} className="flex justify-between gap-4 border-b border-border-sutil pb-3 font-mono text-xs text-text-secondary">
                    <span>{item}</span>
                    <span className="text-accent">NDA</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                data-interaction="proof"
                className="mt-8 border border-accent bg-accent px-6 py-3 font-mono text-xs uppercase tracking-widest text-bg-base transition-colors hover:bg-transparent hover:text-accent"
              >
                Solicitar acceso completo →
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <SiteInteractions />
    </>
  );
}
