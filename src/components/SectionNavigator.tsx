import { useEffect, useState } from "react";

type SectionItem = {
  id: string;
  label: string;
  number: string;
};

const sections: SectionItem[] = [
  { id: "inicio",      label: "Hero",         number: "01" },
  { id: "tco",         label: "ERP TCO",      number: "02" },
  { id: "cloud-tco",   label: "Cloud TCO",    number: "03" },
  { id: "diagnostico", label: "Diagnóstico",  number: "04" },
  { id: "doctrina",    label: "Doctrina",     number: "05" },
  { id: "fabric-ai",   label: "FABRIC AI",    number: "06" },
  { id: "s07",         label: "Casos",        number: "07" },
  { id: "s08",         label: "Industrias",   number: "08" },
  { id: "s09",         label: "FABRIC OS",    number: "09" },
  { id: "s10",         label: "Lifecycle",    number: "10" },
  { id: "s11",         label: "Office Hours", number: "11" },
  { id: "s12",         label: "Referencias",  number: "12" },
  { id: "s13",         label: "Transparencia",number: "13" },
  { id: "s14",         label: "Investigación",number: "14" },
  { id: "s15",         label: "Contacto",     number: "15" },
];

export default function SectionNavigator() {
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, current) =>
            current.intersectionRatio > prev.intersectionRatio ? current : prev
          );

          setActiveSection(mostVisible.target.id);
        }
      },
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: "-30% 0px -45% 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <aside className="fixed right-2 lg:right-4 top-1/2 z-50 hidden -translate-y-1/2 lg:block 2xl:right-8">
      <nav className="relative flex flex-col items-end">
        
        {/* Línea vertical central */}
        <div className="absolute right-[11.5px] top-0 h-full w-px bg-gradient-to-b from-transparent via-[var(--border-strong)] to-transparent opacity-60" />

        <div className="relative z-10 flex flex-col items-end gap-6">
          {sections.map((section) => {
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                className="group relative flex items-center justify-end p-1"
                aria-label={`Ir a ${section.label}`}
              >
                
                {/* Tooltip Lateral: Oculto por defecto, visible SOLO en hover */}
                <span
                  className={`
                    pointer-events-none absolute right-10 top-1/2 flex min-w-[140px] -translate-y-1/2 flex-col items-end rounded-md border
                    px-4 py-2.5 opacity-0 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                    translate-x-4 group-hover:translate-x-0 group-hover:opacity-100
                    ${
                      isActive
                        ? "border-[var(--accent)]/30 bg-[var(--bg-panel)]/90 shadow-lg shadow-[var(--accent)]/5"
                        : "border-[var(--border-strong)] bg-[var(--bg-panel)]/50 group-hover:border-[var(--accent)]/50 group-hover:bg-[var(--bg-panel)]/80"
                    }
                  `}
                >
                  <span
                    className={`
                      block font-technical text-[9px] font-bold uppercase tracking-[0.2em] transition-colors duration-300
                      ${isActive ? "text-[var(--accent)]" : "text-[var(--text-tertiary)] group-hover:text-[var(--accent)]"}
                    `}
                  >
                    {section.number}
                  </span>

                  <span
                    className={`
                      mt-0.5 block whitespace-nowrap font-display text-[15px] transition-colors duration-300
                      ${isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"}
                    `}
                  >
                    {section.label}
                  </span>
                </span>

                {/* Indicador Circular (El Punto) */}
                <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-[var(--bg-base)]">
                  {/* Anillo exterior */}
                  <span
                    className={`
                      absolute inset-0 rounded-full border transition-all duration-500
                      ${
                        isActive
                          ? "scale-100 border-[var(--accent)] opacity-100 shadow-[0_0_12px_rgba(201,169,110,0.4)]"
                          : "scale-75 border-[var(--border-strong)] opacity-40 group-hover:scale-100 group-hover:border-[var(--accent)] group-hover:opacity-100"
                      }
                    `}
                  />
                  
                  {/* Punto central interior */}
                  <span
                    className={`
                      rounded-full transition-all duration-500
                      ${
                        isActive
                          ? "h-2 w-2 scale-100 bg-[var(--accent)]"
                          : "h-1.5 w-1.5 scale-100 bg-[var(--text-tertiary)] group-hover:scale-125 group-hover:bg-[var(--accent)]"
                      }
                    `}
                  />
                </span>

              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}