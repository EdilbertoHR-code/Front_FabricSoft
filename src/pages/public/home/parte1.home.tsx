import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const highlightPhrases = [
  {
    base: "Garantizamos la estabilización del primer ciclo crítico. ",
    gold: "Por contrato.",
  },
  {
    base: "Nos quedamos hasta el primer cierre contable operado en producción. ",
    gold: "Sin sorpresas.",
  },
  {
    base: "Transición a soporte sin incidencias bloqueantes abiertas. ",
    gold: "Cero abandono post go-live.",
  },
];

const particles = [
  { x: "8%", y: "18%", d: "0s", s: "2px" },
  { x: "18%", y: "72%", d: ".4s", s: "2px" },
  { x: "32%", y: "12%", d: ".8s", s: "3px" },
  { x: "50%", y: "48%", d: "1.2s", s: "2px" },
  { x: "72%", y: "20%", d: "1.6s", s: "2px" },
  { x: "88%", y: "62%", d: "2s", s: "3px" },
  { x: "14%", y: "46%", d: "2.4s", s: "2px" },
  { x: "66%", y: "82%", d: "2.8s", s: "2px" },
  { x: "92%", y: "34%", d: "3.2s", s: "2px" },
  { x: "44%", y: "86%", d: "3.6s", s: "3px" },
];

function BackgroundParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {particles.map((particle, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-[#F5D98B] opacity-0"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.s,
            height: particle.s,
            boxShadow: "0 0 10px rgba(201,169,110,0.76)",
            animation: `fabricStar 8s ease-in-out infinite`,
            animationDelay: particle.d,
          }}
        />
      ))}
    </div>
  );
}

function TypewriterCarousel() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = highlightPhrases[phraseIndex];
    const totalLength = phrase.base.length + phrase.gold.length;

    if (!deleting && charIndex === totalLength) {
      const pause = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(pause);
    }

    if (deleting && charIndex === 0) {
      setDeleting(false);
      setPhraseIndex((current) => (current + 1) % highlightPhrases.length);
      return;
    }

    const timer = setTimeout(() => {
      setCharIndex((current) => current + (deleting ? -1 : 1));
    }, deleting ? 18 : 34);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, phraseIndex]);

  const phrase = highlightPhrases[phraseIndex];
  const base = phrase.base.slice(0, charIndex);
  const gold = charIndex > phrase.base.length ? phrase.gold.slice(0, charIndex - phrase.base.length) : "";

  return (
    <div className="fabric-typewriter relative mt-6 flex min-h-[66px] w-full max-w-[680px] items-center overflow-hidden border-l-2 border-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/13 via-[#D4AF37]/6 to-transparent px-5 py-4">
      <span className="relative z-10 text-sm font-bold leading-relaxed text-[#F5F5F5] md:text-base">
        {base}
        <span className="text-[#D4AF37]">{gold}</span>
        <span className="ml-1 inline-block h-[1em] w-[2px] animate-pulse bg-[#D4AF37] align-middle" />
      </span>
    </div>
  );
}

function PremiumGlobe() {
  const globeStars = [
    { left: "18%", top: "18%", delay: "0s" },
    { left: "76%", top: "14%", delay: ".7s" },
    { left: "86%", top: "58%", delay: "1.2s" },
    { left: "24%", top: "76%", delay: "1.8s" },
  ];

  const globeLabels = [
    {
      number: "01",
      title: "Rescate Fusion",
      className: "left-[2%] top-[13%]",
    },
    {
      number: "02",
      title: "Migración SAP/EBS",
      className: "right-[1%] top-[26%]",
    },
    {
      number: "03",
      title: "Greenfield Oracle",
      className: "left-[4%] bottom-[16%]",
    },
  
   
  ];

  return (
    <div className="fabric-orb-stage relative mx-auto flex min-h-[390px] w-full max-w-[560px] items-center justify-center overflow-visible md:min-h-[470px] lg:min-h-[540px]">
      {globeStars.map((star, index) => (
        <span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            boxShadow: "0 0 12px rgba(245,245,245,.78), 0 0 20px rgba(201,169,110,.30)",
            animation: "globeTwinkle 3.4s ease-in-out infinite",
            animationDelay: star.delay,
          }}
        />
      ))}

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.11),transparent_66%)] blur-2xl" />

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[48%] w-[78%] rounded-full border border-[rgba(201,169,110,0.14)]"
        style={{ animation: "orbitRotate 46s linear infinite" }}
      />

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[68%] w-[52%] rounded-full border border-[rgba(201,169,110,0.08)]"
        style={{ animation: "orbitRotate 60s linear infinite reverse" }}
      />

      <div className="relative z-10" style={{ animation: "globeFloat 7s ease-in-out infinite" }}>
        <div
          className="fabric-orb-core relative h-[205px] w-[205px] overflow-hidden rounded-full md:h-[275px] md:w-[275px] lg:h-[335px] lg:w-[335px]"
          style={{
            backgroundImage: "url('https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/globe.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "left center",
            animation: "earthRotate 40s linear infinite",
            boxShadow:
              "0 0 48px rgba(201,169,110,.15), -10px 0 18px rgba(195,244,255,.30) inset, 24px 8px 48px rgba(0,0,0,.92) inset, -32px -6px 50px rgba(195,244,255,.12) inset, 185px 0 74px rgba(0,0,0,.72) inset, 116px 0 58px rgba(0,0,0,.84) inset",
          }}
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.22),transparent_24%,transparent_100%)]" />
          <div className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,rgba(0,0,0,.76),transparent_36%,transparent_58%,rgba(0,0,0,.88))]" />
          <div className="absolute inset-0 rounded-full border border-white/10" />
        </div>
      </div>

      {globeLabels.map((label) => (
        <div
          key={`${label.number ?? "info"}-${label.title}`}
          className={`fabric-orb-label absolute z-30 max-w-[190px] border border-[#353535] bg-[#0A0A0A]/90 px-3.5 py-2.5 shadow-[0_14px_38px_rgba(0,0,0,0.42)] backdrop-blur-md transition duration-300 hover:border-[#C9A96E] hover:bg-[#111111]/95 md:max-w-[210px] ${label.className}`}
        >
          {label.number ? (
            <p className="font-mono text-[7px] font-black uppercase leading-none tracking-[0.22em] text-[#C9A96E] md:text-[8px]">
              {label.number}
            </p>
          ) : null}

          <p className={`${label.number ? "mt-1.5" : ""} truncate font-mono text-[7.5px] font-black uppercase leading-none tracking-[0.22em] text-[#F5F5F5] md:text-[8.5px] lg:text-[9px]`}>
            {label.title}
          </p>
        </div>
      ))}

      <div className="fabric-orb-caption absolute bottom-[2%] left-1/2 z-30 w-[260px] -translate-x-1/2 border border-[rgba(201,169,110,0.24)] bg-[#0A0A0A]/88 px-4 py-3 text-center shadow-[0_14px_38px_rgba(0,0,0,0.42)] backdrop-blur-md md:w-[300px]">
        <p className="font-mono text-[7px] font-black uppercase leading-none tracking-[0.22em] text-[#C9A96E]/80 md:text-[8px]">
          ERP Mission Critical
        </p>
        <p className="mt-2 text-[11px] leading-5 text-[#8A8A8A] md:text-xs">
          Operaciones ERP sin dependencia manual.
        </p>
      </div>
    </div>
  );
}

export default function Parte1HomeSplineAI() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="inicio" className="pre-dossier-section p1-dossier-aligned relative flex min-h-[calc(100vh-72px)] w-full items-center overflow-hidden bg-[#0A0A0A] px-6 pb-16 pt-16 text-[#F5F5F5] md:px-12 lg:pb-20 lg:pt-12">
      <style>{`
        @keyframes fabricStar {
          0%, 100% { opacity: 0; transform: translateY(0) scale(.85); }
          45%, 65% { opacity: .9; transform: translateY(-10px) scale(1); }
        }

        @keyframes titleReveal {
          0% { opacity: 0; transform: translateY(18px); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        @keyframes earthRotate {
          0% { background-position: 0 0; }
          100% { background-position: 520px 0; }
        }

        @keyframes globeFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.01); }
        }

        @keyframes globeTwinkle {
          0%, 100% { opacity: .14; transform: scale(.8); }
          50% { opacity: 1; transform: scale(1.18); }
        }

        @keyframes orbitRotate {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>

      <BackgroundParticles />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(201,169,110,0.12),transparent_28%),radial-gradient(circle_at_78%_55%,rgba(201,169,110,0.09),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1420px] grid-cols-1 items-center gap-12 lg:grid-cols-[1.14fr_0.86fr] lg:gap-12">
        <div className="relative z-20 max-w-4xl">
          <div
            className={`fabric-hero-badge inline-flex items-center gap-2.5 rounded-full border border-[#C9A96E]/30 bg-[#C9A96E]/5 px-4 py-2 backdrop-blur-md transition-all duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
            }`}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#D4AF37] opacity-70" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#C9A96E]" />
            </span>
            <span className="font-mono text-[8.5px] font-semibold uppercase tracking-[0.22em] text-[#F5F5F5]">
              Oracle Certified Partner · Critical Engineering
            </span>
          </div>

          <h1
            className="mt-7 font-serif text-[clamp(46px,5.5vw,84px)] leading-[0.95] tracking-[-0.045em] text-[#F5F5F5] lg:whitespace-nowrap"
            style={{ animation: "titleReveal .9s cubic-bezier(.16,1,.3,1) .18s both" }}
          >
            No entregamos en go-live.
          </h1>

          <h2
            className="mt-4 max-w-4xl font-serif text-[clamp(28px,3.1vw,46px)] font-semibold leading-[1.06] tracking-[-0.04em] text-[#F5F5F5]"
            style={{ animation: "titleReveal .9s cubic-bezier(.16,1,.3,1) .34s both" }}
          >
            Entregamos cuando tu primer ciclo <span className="text-[#C9A96E]">crítico opera.</span>
          </h2>

          <p
            className="mt-7 max-w-2xl text-base leading-8 text-[#F5F5F5]/82 md:text-lg"
            style={{ animation: "titleReveal .9s cubic-bezier(.16,1,.3,1) .5s both" }}
          >
            El 73% de las implementaciones Oracle Fusion celebran el go-live y abandonan al cliente con cierres pesados e incidencias abiertas.
          </p>

          <TypewriterCarousel />

      

          <div
            className={`mt-9 flex flex-col gap-4 transition-all delay-1000 duration-1000 sm:flex-row sm:items-center ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <Link
              to="/diagnostico"
              className="relative inline-flex min-w-[250px] items-center justify-center overflow-hidden border border-[#353535] bg-transparent px-8 py-4 font-mono text-[11px] font-black uppercase tracking-[0.24em] text-[#F5F5F5] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A96E] hover:bg-[#C9A96E]/[0.045] hover:text-[#C9A96E] hover:shadow-[0_0_28px_rgba(201,169,110,0.12)]"
            >
              <span className="absolute left-0 top-0 h-full w-[2px] bg-[#C9A96E] opacity-0 transition-opacity duration-300 hover:opacity-100" />
              <span className="relative z-10">Diagnóstico Oracle</span>
              <span className="relative z-10 ml-3 text-[#C9A96E]">→</span>
            </Link>

            <Link
              to="/contacto"
              className="relative inline-flex min-w-[250px] items-center justify-center overflow-hidden border border-[#353535] bg-transparent px-8 py-4 font-mono text-[11px] font-black uppercase tracking-[0.24em] text-[#F5F5F5] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A96E] hover:bg-[#C9A96E]/[0.045] hover:text-[#C9A96E] hover:shadow-[0_0_28px_rgba(201,169,110,0.12)]"
            >
              <span className="absolute left-0 top-0 h-full w-[2px] bg-[#C9A96E] opacity-0 transition-opacity duration-300 hover:opacity-100" />
              <span className="relative z-10">Iniciar conversación</span>
              <span className="relative z-10 ml-3 text-[#C9A96E]">→</span>
            </Link>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[580px] md:mx-auto lg:ml-auto">
          <PremiumGlobe />
        </div>
      </div>
    </section>
  );
}
