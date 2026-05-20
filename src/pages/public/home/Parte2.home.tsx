import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";


interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

function AnimatedNumber({ 
  value, 
  prefix = "", 
  suffix = "", 
  duration = 2.5, 
  className = "",
  decimals = 0 
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");
  const hasAnimated = useRef(false);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { 
    duration: duration * 1000, 
    bounce: 0,
    ease: [0.25, 0.1, 0.25, 1.0] // Easing suave tipo BlueBox
  });

  useEffect(() => {
    if (isInView && value > 0 && !hasAnimated.current) {
      hasAnimated.current = true;
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      const rounded = decimals > 0 
        ? latest.toFixed(decimals) 
        : Math.round(latest).toLocaleString("en-US");
      setDisplayValue(rounded);
    });
    return () => unsubscribe();
  }, [springValue, decimals]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}



const WORLD_CONTINENTS = `
  M 150,180 L 180,160 L 220,170 L 240,190 L 230,220 L 200,240 L 170,230 L 150,200 Z
  M 280,140 L 320,130 L 360,140 L 380,170 L 370,210 L 340,230 L 300,220 L 270,190 L 280,140 Z
  M 420,100 L 480,90 L 540,100 L 580,130 L 590,180 L 570,220 L 520,240 L 460,230 L 420,200 L 410,150 Z
  M 620,120 L 680,110 L 740,120 L 780,150 L 790,200 L 770,250 L 720,270 L 660,260 L 620,220 L 610,170 Z
  M 200,280 L 240,270 L 280,280 L 300,310 L 290,350 L 260,370 L 220,360 L 190,330 Z
  M 500,260 L 560,250 L 620,260 L 660,290 L 670,340 L 640,380 L 580,390 L 520,370 L 490,320 Z
  M 720,280 L 780,270 L 840,280 L 870,310 L 860,360 L 820,390 L 760,380 L 720,340 Z
  M 380,320 L 420,310 L 460,320 L 480,350 L 470,390 L 440,410 L 400,400 L 370,360 Z
`;

interface MapDot {
  lat: number;
  lng: number;
  label: string;
  color?: string;
}

interface MapConnection {
  start: MapDot;
  end: MapDot;
  active?: boolean;
}

interface WorldMapProps {
  connections: MapConnection[];
  className?: string;
}

function OptimizedWorldMap({ connections, className = "" }: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredConnection, setHoveredConnection] = useState<number | null>(null);
  
  const project = useMemo(() => (lat: number, lng: number) => ({
    x: ((lng + 180) / 360) * 1200,
    y: ((90 - lat) / 180) * 600,
  }), []);

  const createArc = (start: {x: number, y: number}, end: {x: number, y: number}) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - Math.abs(end.x - start.x) * 0.3;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  // Animaciones suaves estilo BlueBox
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.6,
      transition: {
        pathLength: { duration: 2.5, ease: [0.33, 1, 0.68, 1] },
        opacity: { duration: 0.8, ease: "easeOut" }
      }
    }
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.5
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.5, 1],
      opacity: [0.8, 0, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1200 600"
      className={`w-full h-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#F5E6A3" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.3" />
        </linearGradient>
        
        <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <radialGradient id="dot-gradient">
          <stop offset="0%" stopColor="#F5E6A3" stopOpacity="1" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.4" />
        </radialGradient>
      </defs>

      {/* Grid sutil */}
      <motion.pattern 
        id="grid" 
        width="60" 
        height="60" 
        patternUnits="userSpaceOnUse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      >
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
      </motion.pattern>
      <rect width="1200" height="600" fill="url(#grid)" />

      {/* Continentes - Animación suave de entrada */}
      <motion.path
        d={WORLD_CONTINENTS}
        fill="none"
        stroke="#D4AF37"
        strokeWidth="1"
        opacity="0.3"
        filter="url(#soft-glow)"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
      />
      
      <motion.path
        d={WORLD_CONTINENTS}
        fill="#D4AF37"
        opacity="0.05"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2, delay: 1 }}
      />

      {/* Conexiones con animación fluida */}
      <motion.g variants={containerVariants} initial="hidden" animate="visible">
        {connections.map((conn, index) => {
          const start = project(conn.start.lat, conn.start.lng);
          const end = project(conn.end.lat, conn.end.lng);
          const pathD = createArc(start, end);

          return (
            <motion.g 
              key={`conn-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 1, 
                delay: 0.5 + index * 0.3,
                ease: [0.22, 1, 0.36, 1]
              }}
              onMouseEnter={() => setHoveredConnection(index)}
              onMouseLeave={() => setHoveredConnection(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Línea base sutil */}
              <motion.path
                d={pathD}
                fill="none"
                stroke="#2A2A2A"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ 
                  duration: 2, 
                  delay: 0.8 + index * 0.2,
                  ease: [0.33, 1, 0.68, 1]
                }}
              />
              
              {/* Línea dorada animada */}
              <motion.path
                d={pathD}
                fill="none"
                stroke="url(#connection-gradient)"
                strokeWidth={hoveredConnection === index ? 2.5 : 1.5}
                strokeLinecap="round"
                filter="url(#soft-glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: hoveredConnection === index ? 1 : 0.7
                }}
                transition={{ 
                  duration: 3, 
                  delay: 1 + index * 0.3,
                  ease: [0.33, 1, 0.68, 1],
                  repeat: Infinity,
                  repeatDelay: 2,
                  repeatType: "reverse"
                }}
              />
              
              {/* Partícula viajera suave */}
              <motion.circle
                r="3"
                fill="#F5E6A3"
                filter="url(#soft-glow)"
                initial={{ offsetDistance: "0%", opacity: 0 }}
                animate={{ 
                  offsetDistance: ["0%", "100%"],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 3.5,
                  delay: 1.5 + index * 0.3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                style={{ 
                  offsetPath: `path("${pathD}")`,
                  offsetRotate: "auto"
                }}
              />
            </motion.g>
          );
        })}
      </motion.g>

      {/* Puntos de conexión */}
      {connections.flatMap((conn, connIndex) => [
        { ...conn.start, key: `start-${connIndex}` },
        { ...conn.end, key: `end-${connIndex}` }
      ]).reduce((acc: MapDot[], curr) => {
        const exists = acc.some(p => 
          Math.abs(p.lat - curr.lat) < 0.5 && Math.abs(p.lng - curr.lng) < 0.5
        );
        return exists ? acc : [...acc, curr];
      }, []).map((dot, index) => {
        const { x, y } = project(dot.lat, dot.lng);
        
        return (
          <motion.g 
            key={dot.key || index}
            variants={dotVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            {/* Círculo pulsante exterior */}
            <motion.circle
              cx={x}
              cy={y}
              r="15"
              fill="url(#dot-gradient)"
              variants={pulseVariants}
              animate="pulse"
              style={{ transformOrigin: `${x}px ${y}px` }}
            />
            
            {/* Círculo principal */}
            <motion.circle
              cx={x}
              cy={y}
              r="5"
              fill="#D4AF37"
              stroke="#0A0A0A"
              strokeWidth="2"
              filter="url(#soft-glow)"
              whileHover={{ scale: 1.3, fill: "#F5E6A3" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            
            {/* Label con animación suave */}
            <motion.g
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 1.5 + index * 0.15,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <motion.rect
                x={x - 50}
                y={y - 30}
                width="100"
                height="20"
                rx="6"
                fill="#0A0A0A"
                opacity="0.9"
                stroke="#D4AF37"
                strokeWidth="0.5"
                whileHover={{ 
                  stroke: "#F5E6A3",
                  strokeWidth: 1,
                  x: x - 52,
                  y: y - 32,
                  width: 104,
                  height: 24
                }}
                transition={{ duration: 0.3 }}
              />
              <text
                x={x}
                y={y - 17}
                textAnchor="middle"
                className="font-mono"
                fontSize="10"
                fill="#F5F5F5"
                fontWeight="500"
                style={{ letterSpacing: '0.5px' }}
              >
                {dot.label}
              </text>
            </motion.g>
          </motion.g>
        );
      })}
    </svg>
  );
}


const oracleConnections: MapConnection[] = [
  { 
    start: { lat: -15.79, lng: -47.88, label: "São Paulo", color: "#D4AF37" }, 
    end: { lat: 40.71, lng: -74.01, label: "New York" },
    active: true
  },
  { 
    start: { lat: 51.51, lng: -0.13, label: "London" }, 
    end: { lat: 28.61, lng: 77.21, label: "Mumbai" },
    active: true
  },
  { 
    start: { lat: 35.68, lng: 139.69, label: "Tokyo" }, 
    end: { lat: -33.87, lng: 151.21, label: "Sydney" },
    active: true
  },
  { 
    start: { lat: 52.52, lng: 13.41, label: "Berlin" }, 
    end: { lat: -1.29, lng: 36.82, label: "Nairobi" },
    active: false
  },
  { 
    start: { lat: 19.43, lng: -99.13, label: "Mexico City" }, 
    end: { lat: 34.05, lng: -118.24, label: "Los Angeles" },
    active: true
  },
];


interface StatCardProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  highlight?: boolean;
  delay?: number;
}

function StatCard({ value, label, prefix, suffix, highlight = false, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="group relative p-6 rounded-2xl bg-gradient-to-b from-[#1A1A1A] to-[#0F0F0F] 
        border border-[#2A2A2A] hover:border-[#D4AF37]/50 transition-all duration-500
        hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 
        opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative">
        <motion.div 
          className={`text-4xl md:text-5xl font-bold font-mono tracking-tight ${
            highlight ? 'text-[#F5E6A3]' : 'text-[#F5F5F5]'
          }`}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ 
            delay: delay + 0.3,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
        >
          <AnimatedNumber 
            value={value} 
            prefix={prefix} 
            suffix={suffix} 
            className={highlight ? 'drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]' : ''}
          />
        </motion.div>
        <motion.p 
          className="mt-4 text-[11px] uppercase tracking-[0.2em] text-[#888] font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.5, duration: 0.6 }}
        >
          {label}
        </motion.p>
      </div>
    </motion.div>
  );
}


export default function RescuedStatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-[#050505] overflow-hidden"
      aria-labelledby="rescued-stats-title"
    >
      {/* Fondo con neblina suave */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-[100px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
        />
      </div>

      {/* Mapa de fondo */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2, delay: 0.3 }}
      >
        <OptimizedWorldMap connections={oracleConnections} />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 z-5 bg-gradient-to-b from-[#050505]/90 via-[#050505]/50 to-[#050505]/95" />

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 1, 
            delay: 0.5,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.h2 
            id="rescued-stats-title"
            className="text-3xl md:text-5xl font-serif text-[#F5F5F5] tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Oracle Fusion Implementations{' '}
            <span className="relative inline-block">
              <motion.span 
                className="bg-gradient-to-r from-[#F5E6A3] via-[#D4AF37] to-[#B8942B] 
                  bg-clip-text text-transparent font-bold"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                Rescued
              </motion.span>
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r 
                  from-transparent via-[#D4AF37] to-transparent"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 1.2 }}
              />
            </span>
          </motion.h2>
          <motion.p 
            className="mt-6 text-[#888] text-base md:text-lg max-w-2xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Proyectos críticos recuperados con éxito, estabilizando operaciones 
            y garantizando cierres contables en producción.
          </motion.p>
        </motion.div>

        {/* Grid de estadísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <StatCard 
            value={2} 
            label="Total Rescued" 
            highlight 
            delay={0.2}
          />
          <StatCard 
            value={12000} 
            label="Hours Saved" 
            prefix="~"
            delay={0.4}
          />
          <StatCard 
            value={7} 
            label="Reports Eliminated" 
            delay={0.6}
          />
          <StatCard 
            value={2} 
            label="Closes Stabilized" 
            delay={0.8}
          />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.button 
            className="group inline-flex items-center gap-3 text-[#B8B8B8] hover:text-[#D4AF37] 
              font-mono text-xs uppercase tracking-wider transition-colors duration-500"
            whileHover={{ x: 5 }}
          >
            Ver casos de éxito
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}