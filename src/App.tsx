import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

// Suppress Framer Motion benign list key and console warning noise
if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    if (args[0] && typeof args[0] === "string") {
      if (args[0].includes("Framer Motion") || args[0].includes("key")) {
        return;
      }
    }
    originalError.apply(console, args);
  };
}

// ============================================
// Core Icons Matching Precise Prompt Outlines
// ============================================

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function CheckIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M7 17L17 7 M7 7h10v10" />
    </svg>
  );
}

export function PlayIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      {...props}
    >
      <polygon points="6,4 20,12 6,20 6,4" />
    </svg>
  );
}

export function ClockIcon28() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function GlobeIcon28() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

// Material SVGs for Capabilities section
export function AISceneryIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
      <path d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21H5Zm1-4h12l-3.75-5-3 4L9 13l-3 4Z" />
    </svg>
  );
}

export function BatchProductionIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
      <path d="M4 6.47 5.76 10H20v8H4V6.47M22 4h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.89-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4Z" />
    </svg>
  );
}

export function SmartLightingIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1Zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7Z" />
    </svg>
  );
}

// ============================================
// FadingVideo Component (No CSS Transition, rAF)
// ============================================

interface FadingVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

export function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rAFRef = useRef<number | null>(null);
  const fadingOutRef = useRef<boolean>(false);

  // Custom JS transition driven by requestAnimationFrame
  const fadeTo = (target: number, duration: number = 500) => {
    const video = videoRef.current;
    if (!video) return;

    if (rAFRef.current !== null) {
      cancelAnimationFrame(rAFRef.current);
    }

    const startOpacity = parseFloat(video.style.opacity) || 0;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Calculate inline opacity
      const opacity = startOpacity + (target - startOpacity) * progress;
      video.style.opacity = opacity.toFixed(5);

      if (progress < 1) {
        rAFRef.current = requestAnimationFrame(animate);
      } else {
        rAFRef.current = null;
      }
    };

    rAFRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Start with opacity 0
    const video = videoRef.current;
    if (video) {
      video.style.opacity = "0";
      if (video.readyState >= 2) {
        handleLoadedData();
      }
    }

    return () => {
      if (rAFRef.current !== null) {
        cancelAnimationFrame(rAFRef.current);
      }
    };
  }, [src]);

  const handleLoadedData = () => {
    const video = videoRef.current;
    if (!video) return;
    video.style.opacity = "0";
    video.play().catch((err) => {
      console.warn("FadingVideo play interrupted or rejected:", err);
    });
    fadeTo(1, 500);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const duration = video.duration;
    const currentTime = video.currentTime;

    // FADE_OUT_LEAD = 0.55 seconds
    if (duration && !fadingOutRef.current) {
      const timeLeft = duration - currentTime;
      if (timeLeft <= 0.55 && timeLeft > 0) {
        fadingOutRef.current = true;
        fadeTo(0, 500);
      }
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    // Set immediate opacity 0
    video.style.opacity = "0";

    // Timeout of 100ms as per specification
    setTimeout(() => {
      const v = videoRef.current;
      if (!v) return;
      v.currentTime = 0;
      v.play().catch((err) => {
        console.warn("FadingVideo play on ended failed:", err);
      });
      fadingOutRef.current = false;
      fadeTo(1, 500);
    }, 100);
  };

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      style={{ ...style, transition: "none" }} // Strictly no CSS transition
      autoPlay
      muted
      playsInline
      preload="auto"
      onLoadedData={handleLoadedData}
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleEnded}
    />
  );
}

// ============================================
// BlurText Component (Word-by-word custom stagger)
// ============================================

interface BlurTextProps {
  text: string;
  className?: string;
}

export function BlurText({ text, className }: BlurTextProps) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {},
  };

  // Word variants with exact 3-step keyframes
  const wordVariants = {
    hidden: { filter: "blur(10px)", opacity: 0, y: 50 },
    visible: (i: number) => ({
      filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
      opacity: [0, 0.5, 1],
      y: [50, -5, 0],
      transition: {
        duration: 0.7, // stepDuration 0.35 * 2
        times: [0, 0.5, 1],
        ease: "easeOut",
        delay: i * 0.1, // Stagger: i * 100 / 1000 seconds
      },
    }),
  };

  return (
    <motion.p
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }} // IntersectionObserver triggers on 10% visibility
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        rowGap: "0.1em",
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          custom={i}
          className="blur-word"
          style={{
            display: "inline-block",
            marginRight: "0.28em",
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

// ============================================
// Primary App Layout
// ============================================

export default function App() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [selectedVoyage, setSelectedVoyage] = useState("Mars Express");
  const [selectedClass, setSelectedClass] = useState("Clase Colonizadora");
  const [selectedSeat, setSelectedSeat] = useState("A2");
  const [boardingPassConfirmed, setBoardingPassConfirmed] = useState(false);

  const heroEntranceVariants = {
    hidden: { filter: "blur(10px)", opacity: 0, y: 20 },
    visible: (delay: number) => ({
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  return (
    <main className="bg-black text-white min-h-screen w-full relative">
      
      {/* ======================================= */}
      {/* Section 1: Hero Section                 */}
      {/* ======================================= */}
      <section
        id="home"
        className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black"
      >
        {/* Background Video (120% scale, centering top) */}
        <FadingVideo
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
          className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
          style={{ width: "120%", height: "120%" }}
        />

        {/* Floating Navbar */}
        <nav className="fixed top-4 left-0 right-0 px-8 lg:px-16 z-50 flex items-center justify-between pointer-events-none">
          {/* Logo on Left */}
          <div className="w-12 h-12 rounded-full liquid-glass flex items-center justify-center text-3xl font-heading italic lowercase select-none pointer-events-auto">
            a
          </div>

          {/* Navigation Links & Action Button in Center */}
          <div className="hidden md:flex items-center gap-1 liquid-glass rounded-full px-1.5 py-1.5 pointer-events-auto">
            <a
              href="#home"
              className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-opacity duration-200"
            >
              Inicio
            </a>
            <a
              href="#voyages"
              className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-opacity duration-200"
            >
              Viajes
            </a>
            <a
              href="#worlds"
              className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-opacity duration-200"
            >
              Mundos
            </a>
            <a
              href="#innovation"
              className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-opacity duration-200"
            >
              Innovación
            </a>
            <a
              href="#claim"
              className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-opacity duration-200 mr-2"
            >
              Registrarse
            </a>

            <button 
              onClick={() => document.getElementById('claim')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black rounded-full px-5 py-2 text-sm font-semibold font-body flex items-center gap-2 hover:bg-neutral-200 transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              Asegurar Lugar
              <ArrowUpRightIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Invisible spacer right balancing the logo */}
          <div className="w-12 h-12 opacity-0 select-none pointer-events-none" />
        </nav>

        {/* Hero Content Container */}
        <div className="relative z-10 flex-grow flex flex-col items-center justify-center pt-32 px-4 max-w-4xl mx-auto text-center">
          
          {/* Badge (delay 0.4s) */}
          <motion.div
            variants={heroEntranceVariants}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="liquid-glass rounded-full p-1 pl-1 pr-3 flex items-center gap-2 mb-6"
          >
            <span className="bg-white text-black px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider">
              Nuevo
            </span>
            <span className="text-sm font-body font-medium text-white/90 leading-none">
              El primer viaje tripulado a Marte llega en 2026
            </span>
          </motion.div>

          {/* Headline (using BlurText Component) */}
          <BlurText
            text="Aventúrate Más Allá de Nuestro Cielo a Través del Universo"
            className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-2xl justify-center tracking-[-4px] select-none"
          />

          {/* Subheading (delay 0.8s) */}
          <motion.p
            variants={heroEntranceVariants}
            initial="hidden"
            animate="visible"
            custom={0.8}
            className="mt-6 text-sm md:text-base text-white max-w-xl font-body font-light leading-relaxed text-center opacity-90"
          >
            Descubre el universo como nunca antes se imaginó. Nuestras naves pioneras e ingeniería de vanguardia ponen la exploración del espacio profundo a tu alcance, de forma segura y extraordinaria.
          </motion.p>

          {/* CTAs (delay 1.1s) */}
          <motion.div
            variants={heroEntranceVariants}
            initial="hidden"
            animate="visible"
            custom={1.1}
            className="flex items-center gap-8 mt-8"
          >
            <button 
              onClick={() => document.getElementById('voyages')?.scrollIntoView({ behavior: 'smooth' })}
              className="liquid-glass-strong rounded-full px-8 py-3 text-sm font-semibold text-white flex items-center gap-3 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              Inicia tu Viaje
              <ArrowUpRightIcon className="w-5 h-5" />
            </button>
            <button className="font-body text-sm font-semibold text-white flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <PlayIcon className="h-3 w-3 fill-black text-black" />
              </span>
              Ver Despegue
            </button>
          </motion.div>

          {/* Stats Row (delay 1.3s) */}
          <motion.div
            variants={heroEntranceVariants}
            initial="hidden"
            animate="visible"
            custom={1.3}
            className="flex flex-row flex-wrap justify-center items-stretch gap-6 mt-12 w-full"
          >
            {/* Stat Card 1 */}
            <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] flex flex-col justify-end items-start text-left min-h-[170px]">
              <div className="mb-4 text-white">
                <ClockIcon28 />
              </div>
              <div className="text-4xl font-heading italic text-white tracking-[-1px] leading-none mb-1">
                34.5 Min
              </div>
              <div className="text-[10px] uppercase tracking-wider text-white/60 font-light leading-tight">
                Tiempo promedio de reproducción
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] flex flex-col justify-end items-start text-left min-h-[170px]">
              <div className="mb-4 text-white">
                <GlobeIcon28 />
              </div>
              <div className="text-4xl font-heading italic text-white tracking-[-1px] leading-none mb-1">
                2.8B+
              </div>
              <div className="text-[10px] uppercase tracking-wider text-white/60 font-light leading-tight">
                Usuarios en todo el mundo
              </div>
            </div>
          </motion.div>

        </div>

        {/* Partners Row (delay 1.4s) */}
        <motion.div
          variants={heroEntranceVariants}
          initial="hidden"
          animate="visible"
          custom={1.4}
          className="relative z-10 flex flex-col items-center gap-6 pb-12 pt-6 w-full px-4"
        >
          <div className="liquid-glass rounded-full px-4 py-1 text-[10px] uppercase tracking-widest text-white/60 font-body">
            Colaborando con pioneros de la industria aeroespacial global
          </div>
          <div className="flex flex-wrap items-center justify-center gap-16 font-heading italic text-white text-3xl md:text-4xl tracking-tight select-none opacity-90">
            <span>Aeon</span>
            <span>Vela</span>
            <span>Apex</span>
            <span>Orbit</span>
            <span>Zeno</span>
          </div>
        </motion.div>
      </section>

      {/* ======================================= */}
      {/* Sección 2: Viajes Estelares             */}
      {/* ======================================= */}
      <section
        id="voyages"
        className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black border-t border-white/5"
      >
        {/* Background Video (looping with custom JS crossfade) */}
        <FadingVideo
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Liquid Glass Film Overlay for Background Visuals */}
        <div className="absolute inset-0 z-5 bg-black/45 backdrop-blur-[4px] liquid-glass pointer-events-none" />

        {/* Section Content Wrapper */}
        <div className="relative z-10 px-8 md:px-16 lg:px-20 pt-28 pb-12 flex flex-col justify-between min-h-screen max-w-7xl mx-auto w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <p className="text-sm font-body text-white/80 tracking-wide mb-3">
              // Destinos de Expedición
            </p>
            <h2 className="font-heading italic text-white text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px] select-none">
              Viajes de
              <br />
              Leyenda
            </h2>
          </motion.div>

          {/* Cards for Destinations / Worlds */}
          <div id="worlds" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-pulse-slow">
            
            {/* Destino 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="liquid-glass rounded-[1.25rem] p-6 min-h-[380px] flex flex-col justify-between hover:bg-white/[0.02] transition-colors"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="bg-red-500/10 text-red-300 font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full">
                    Próximo Despegue
                  </span>
                  <span className="text-xs text-white/60 font-body">8 Meses de Viaje</span>
                </div>
                <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-tight mb-2">
                  Mars Express
                </h3>
                <p className="text-sm text-white/85 font-body font-light leading-snug">
                  Entra en la historia convirtiéndote en uno de los primeros pioneros en colonizar las dunas escarlata y llanuras heladas del planeta rojo.
                </p>
              </div>
              <button 
                onClick={() => {
                  setSelectedVoyage("Mars Express");
                  document.getElementById('claim')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="liquid-glass rounded-full px-4 py-2 mt-6 text-sm font-semibold flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer"
              >
                <span>Asegurar Lugar</span>
                <ArrowUpRightIcon className="w-4 h-4 text-white" />
              </button>
            </motion.div>

            {/* Destino 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="liquid-glass rounded-[1.25rem] p-6 min-h-[380px] flex flex-col justify-between hover:bg-white/[0.02] transition-colors"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="bg-blue-500/10 text-blue-300 font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full">
                    Misión Científica
                  </span>
                  <span className="text-xs text-white/60 font-body">1.8 Años de Viaje</span>
                </div>
                <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-tight mb-2">
                  Europa Oceanus
                </h3>
                <p className="text-sm text-white/85 font-body font-light leading-snug">
                  Explora las misteriosas aguas abisales ocultas debajo de la inmensa capa de hielo brillante de la mítica luna de Júpiter.
                </p>
              </div>
              <button 
                onClick={() => {
                  setSelectedVoyage("Europa Oceanus");
                  document.getElementById('claim')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="liquid-glass rounded-full px-4 py-2 mt-6 text-sm font-semibold flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer"
              >
                <span>Asegurar Lugar</span>
                <ArrowUpRightIcon className="w-4 h-4 text-white" />
              </button>
            </motion.div>

            {/* Destino 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="liquid-glass rounded-[1.25rem] p-6 min-h-[380px] flex flex-col justify-between hover:bg-white/[0.02] transition-colors"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="bg-purple-500/10 text-purple-300 font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full">
                    Exomundo Habitable
                  </span>
                  <span className="text-xs text-white/60 font-body">Estadía Permanente</span>
                </div>
                <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-tight mb-2">
                  Kepler-186f
                </h3>
                <p className="text-sm text-white/85 font-body font-light leading-snug">
                  Un exoplaneta transitable cubierto de frondosos bosques de hojas carmesí, océanos infinitos y cielos perpetuamente teñidos de oro.
                </p>
              </div>
              <button 
                onClick={() => {
                  setSelectedVoyage("Kepler-186f");
                  document.getElementById('claim')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="liquid-glass rounded-full px-4 py-2 mt-6 text-sm font-semibold flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer"
              >
                <span>Asegurar Lugar</span>
                <ArrowUpRightIcon className="w-4 h-4 text-white" />
              </button>
            </motion.div>

          </div>

          <div className="text-center text-[10px] text-white/30 font-mono mt-8 select-none">
            La física relativista se aplica durante todos los trayectos. Sincronización temporal asegurada orbitalmente.
          </div>
        </div>
      </section>

      {/* ======================================= */}
      {/* Sección 3: Capabilities/Innovación      */}
      {/* ======================================= */}
      <section
        id="innovation"
        className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black border-t border-white/5"
      >
        {/* Background Video */}
        <FadingVideo
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Main Section Content Wrapper */}
        <div className="relative z-10 px-8 md:px-16 lg:px-20 pt-28 pb-12 flex flex-col justify-between min-h-screen max-w-7xl mx-auto w-full">
          
          {/* Header of Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-auto text-left"
          >
            <p className="text-sm font-body text-white/80 tracking-wide mb-3">
              // Capacidades de Navegación e Ingeniería
            </p>
            <h2 className="font-heading italic text-white text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px] select-none">
              Producción
              <br />
              evolucionada
            </h2>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            
            {/* Card 1: AI Scenery */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="w-11 h-11 rounded-[0.75rem] liquid-glass flex items-center justify-center text-white shrink-0">
                  <AISceneryIcon />
                </div>
                <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                  <span className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap">
                    Contexto Natural
                  </span>
                  <span className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap">
                    Fotorrealismo
                  </span>
                  <span className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap">
                    Escenarios Infinitos
                  </span>
                  <span className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap">
                    Estética Ecológica
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none mb-3">
                  Paisajes de IA
                </h3>
                <p className="text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]">
                  La IA analiza tu producto para crear entornos naturales idénticos a la realidad: desde acantilados islandeses hasta bosques neblinosos.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Batch Production */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="w-11 h-11 rounded-[0.75rem] liquid-glass flex items-center justify-center text-white shrink-0">
                  <BatchProductionIcon />
                </div>
                <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                  <span className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap">
                    Escala Rápido
                  </span>
                  <span className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap">
                    Consistencia Visual
                  </span>
                  <span className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap">
                    Ahorro de Tiempo
                  </span>
                  <span className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap">
                    Listo para Publicar
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none mb-3">
                  Producción en Lote
                </h3>
                <p className="text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]">
                  Diseña toda tu línea de productos en minutos. Crea una identidad visual unificada para catálogos y plataformas sociales sin semanas de retoques.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Smart Lighting */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="w-11 h-11 rounded-[0.75rem] liquid-glass flex items-center justify-center text-white shrink-0">
                  <SmartLightingIcon />
                </div>
                <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                  <span className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap">
                    Trazado de Rayos
                  </span>
                  <span className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap">
                    Sombras Físicas
                  </span>
                  <span className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap">
                    Calidad de Estudio
                  </span>
                  <span className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap">
                    Sincronización Solar
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none mb-3">
                  Iluminación Inteligente
                </h3>
                <p className="text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]">
                  Ajuste automático de iluminación y materiales. Logra una integración impecable con sombras realistas y sincronización de luz solar.
                </p>
              </div>
            </motion.div>

          </div>

          <div className="mt-12 text-center text-[10px] text-white/30 font-mono select-none">
            Ingeniería cuántica de precisión aplicada. Todos los sistemas activos.
          </div>
        </div>
      </section>

      {/* ======================================= */}
      {/* Sección 4: Asegurar Lugar (Claim)       */}
      {/* ======================================= */}
      <section
        id="claim"
        className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black border-t border-white/5"
      >
        {/* Background Visual Detail */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover" 
            alt="Space Backdrop"
          />
        </div>

        {/* Liquid Glass Film Overlay for Background Visuals */}
        <div className="absolute inset-0 z-5 bg-black/50 backdrop-blur-[4px] liquid-glass pointer-events-none" />

        <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-28 pb-12 flex flex-col justify-between min-h-screen max-w-7xl mx-auto w-full">
          
          {/* Header */}
          <div className="text-center items-center flex flex-col mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs uppercase tracking-widest text-white/50 mb-3 font-mono">
                // RESERVA E INGRESO A LA TRIPULACIÓN
              </p>
              <h2 className="font-heading italic text-white text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.9] tracking-[-3px] select-none">
                Asegura tu Lugar
              </h2>
              <p className="max-w-md text-white/70 text-sm font-body mt-4">
                Configura tu perfil de viaje, selecciona tu suite orbital y obtén tu pase estelar digital verificado de inmediato.
              </p>
            </motion.div>
          </div>

          {/* Main Booking Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-stretch my-6">
            
            {/* Form & Seating Selector (Col-span 7) */}
            <div className="lg:col-span-7 flex flex-col justify-between liquid-glass rounded-[1.25rem] p-6 lg:p-8 backdrop-blur-md relative overflow-hidden">
              {!boardingPassConfirmed ? (
                <div className="space-y-6">
                  <h3 className="text-xl font-heading italic text-white tracking-wide border-b border-white/5 pb-3">
                    Configuración de Vuelo
                  </h3>

                  {/* Pasajero Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1.5 font-mono">Nombre Completo</label>
                      <input 
                        type="text"
                        placeholder="Ej. Alexander Vance"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs font-body text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1.5 font-mono">Correo Electrónico</label>
                      <input 
                        type="email"
                        placeholder="ejemplo@vela.orbit"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs font-body text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Flight Destino Selector */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1.5 font-mono">Destino Estelar</label>
                      <select 
                        value={selectedVoyage}
                        onChange={(e) => setSelectedVoyage(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs font-body text-white focus:outline-none focus:border-white/30 cursor-pointer"
                      >
                        <option value="Mars Express" className="bg-neutral-900 text-white">Mars Express (Marte)</option>
                        <option value="Europa Oceanus" className="bg-neutral-900 text-white">Europa Oceanus (Europa)</option>
                        <option value="Kepler-186f" className="bg-neutral-900 text-white">Kepler-186f (Nuevo Hogar)</option>
                      </select>
                    </div>

                    {/* Cabin Class Selection */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-white/40 mb-1.5 font-mono">Clase de Cabina</label>
                      <select 
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs font-body text-white focus:outline-none focus:border-white/30 cursor-pointer"
                      >
                        <option value="Clase Colonizadora" className="bg-neutral-900 text-white">Clase Colonizadora (Base)</option>
                        <option value="Especialista Científico" className="bg-neutral-900 text-white">Especialista Científico (1.5x)</option>
                        <option value="Primera Clase Orbital" className="bg-neutral-900 text-white">Primera Clase Orbital (3.0x)</option>
                      </select>
                    </div>
                  </div>

                  {/* Cabin Seating Map Selector */}
                  <div className="pt-3">
                    <label className="block text-[11px] uppercase tracking-widest text-white/40 mb-3 font-mono text-center">
                      Distribución de Cabina / Selecciona tu Suite
                    </label>
                    <div className="bg-white/[0.02] border border-white/5 rounded-[1rem] p-4 max-w-md mx-auto">
                      {/* Seating Layout diagram */}
                      <div className="flex justify-between text-[9px] font-mono text-white/30 px-6 mb-2">
                        <span>IQUIERDA (VENTANA)</span>
                        <span>PASILLO</span>
                        <span>DERECHA (VENTANA)</span>
                      </div>
                      
                      <div className="space-y-3">
                        {/* Row A */}
                        <div className="flex items-center justify-between px-4">
                          <span className="text-[10px] font-mono text-white/20 w-4">R-A</span>
                          {[
                            { id: "A1", status: "occupied" },
                            { id: "A2", status: "available" },
                            { id: "A3", status: "occupied" }
                          ].map(seat => (
                            <button
                              key={seat.id}
                              disabled={seat.status === "occupied"}
                              onClick={() => setSelectedSeat(seat.id)}
                              className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                                seat.status === "occupied" 
                                  ? "bg-white/[0.03] text-white/20 border border-white/5 cursor-not-allowed" 
                                  : selectedSeat === seat.id
                                    ? "bg-white text-black font-semibold shadow-inner" 
                                    : "bg-white/5 text-white border border-white/10 hover:border-white/30"
                              }`}
                            >
                              {seat.id}
                            </button>
                          ))}
                        </div>

                        {/* Row B */}
                        <div className="flex items-center justify-between px-4">
                          <span className="text-[10px] font-mono text-white/20 w-4">R-B</span>
                          {[
                            { id: "B1", status: "available" },
                            { id: "B2", status: "occupied" },
                            { id: "B3", status: "available" }
                          ].map(seat => (
                            <button
                              key={seat.id}
                              disabled={seat.status === "occupied"}
                              onClick={() => setSelectedSeat(seat.id)}
                              className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                                seat.status === "occupied" 
                                  ? "bg-white/[0.03] text-white/20 border border-white/5 cursor-not-allowed" 
                                  : selectedSeat === seat.id
                                    ? "bg-white text-black font-semibold shadow-inner" 
                                    : "bg-white/5 text-white border border-white/10 hover:border-white/30"
                              }`}
                            >
                              {seat.id}
                            </button>
                          ))}
                        </div>

                        {/* Row C */}
                        <div className="flex items-center justify-between px-4">
                          <span className="text-[10px] font-mono text-white/20 w-4">R-C</span>
                          {[
                            { id: "C1", status: "available" },
                            { id: "C2", status: "available" },
                            { id: "C3", status: "occupied" }
                          ].map(seat => (
                            <button
                              key={seat.id}
                              disabled={seat.status === "occupied"}
                              onClick={() => setSelectedSeat(seat.id)}
                              className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                                seat.status === "occupied" 
                                  ? "bg-white/[0.03] text-white/20 border border-white/5 cursor-not-allowed" 
                                  : selectedSeat === seat.id
                                    ? "bg-white text-black font-semibold shadow-inner" 
                                    : "bg-white/5 text-white border border-white/10 hover:border-white/30"
                              }`}
                            >
                              {seat.id}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Seating Legend */}
                      <div className="flex justify-center gap-4 mt-3 text-[10px] font-body text-white/50">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 bg-white/5 border border-white/10 rounded-sm" />
                          <span>Disponible</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 bg-white text-black rounded-sm" />
                          <span>Seleccionado</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 bg-white/[0.03] border border-white/5 rounded-sm" />
                          <span>Ocupado</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button 
                      onClick={() => {
                        if (!nombre.trim()) {
                          alert("Por favor introduce tu nombre completo.");
                          return;
                        }
                        if (!email.trim() || !email.includes("@")) {
                          alert("Por favor introduce una dirección de correo válida.");
                          return;
                        }
                        setBoardingPassConfirmed(true);
                      }}
                      className="w-full bg-white text-black font-semibold rounded-full py-3.5 text-sm flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors cursor-pointer"
                    >
                      <span>Asegurar mi Lugar en la Misión</span>
                      <ArrowUpRightIcon className="w-4 h-4 text-black" />
                    </button>
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="h-full flex flex-col justify-center items-center text-center space-y-6 py-6"
                >
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white mb-2 shadow-lg animate-pulse">
                    <CheckIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-heading italic text-white tracking-wide">
                    ¡Asiento Reservado!
                  </h3>
                  <p className="text-sm text-white/80 font-body max-w-sm leading-relaxed">
                    Estimado/a <span className="font-semibold text-white">{nombre}</span>, tu solicitud para unirse a la misión <span className="font-semibold text-white">{selectedVoyage}</span> ha sido codificada con éxito.
                  </p>

                  <div className="liquid-glass border border-white/10 rounded-xl p-4 w-full max-w-xs text-left text-xs font-mono space-y-1 text-white/60">
                    <div className="text-white font-semibold flex justify-between">
                      <span>SIGN:</span>
                      <span className="text-green-400">VERIFICADO</span>
                    </div>
                    <div className="truncate">HASH: SHA256//9b3a7f8e8103c2db9c..</div>
                    <div>SEAT: {selectedSeat} • CLASS: {selectedClass}</div>
                    <div>TIME: {new Date().toISOString().substring(0, 19)}Z</div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs pt-4">
                    <button 
                      onClick={() => {
                        alert(`¡Pase de abordar digital de ${nombre} guardado en tu memoria cósmica!`);
                      }}
                      className="flex-1 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-full py-2.5 text-xs font-body transition-colors cursor-pointer text-center"
                    >
                      Descargar Pase
                    </button>
                    <button 
                      onClick={() => setBoardingPassConfirmed(false)}
                      className="flex-1 bg-white text-black font-semibold hover:bg-neutral-200 rounded-full py-2.5 text-xs font-body transition-colors cursor-pointer text-center"
                    >
                      Modificar Reserva
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Boarding Pass Live Visualizer (Col-span 5) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="liquid-glass-strong border border-white/15 rounded-[1.25rem] p-6 flex flex-col justify-between relative overflow-hidden h-full min-h-[460px] shadow-2xl backdrop-blur-xl">
                
                {/* Visual Glass highlights / glow watermark in pass background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white/5 filter blur-3xl pointer-events-none z-0" />
                
                {/* Inside Pass Content */}
                <div className="relative z-10 space-y-6 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Header of Pass */}
                    <div className="flex justify-between items-start border-b border-white/10 pb-4">
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-white/50">BOARDING PASS</div>
                        <h4 className="font-heading italic text-white text-2xl tracking-normal">SSS999 Space</h4>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/25 flex items-center justify-center text-xs font-semibold select-none italic text-white/80 shrink-0">
                        s9
                      </div>
                    </div>

                    {/* Flight Primary Details */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div>
                        <div className="text-[9px] font-mono uppercase tracking-wider text-white/40">ORIGEN</div>
                        <div className="text-xs font-semibold text-white">PLANETA TIERRA</div>
                        <div className="text-[10px] font-mono text-white/60">Cabo Cañaveral / CC</div>
                      </div>
                      <div>
                        <div className="text-[9px] font-mono uppercase tracking-wider text-white/40">DESTINO</div>
                        <div className="text-xs font-semibold text-white uppercase">{selectedVoyage || "Mars Express"}</div>
                        <div className="text-[10px] font-mono text-white/60">
                          {selectedVoyage === "Europa Oceanus" 
                            ? "Júpiter Océano / EUR" 
                            : selectedVoyage === "Kepler-186f"
                              ? "Kepler ExoHab-186f"
                              : "Marte Dunas / MAR"
                          }
                        </div>
                      </div>
                    </div>

                    {/* Pasajero Details */}
                    <div className="mt-5 space-y-3">
                      <div>
                        <div className="text-[9px] font-mono uppercase tracking-wider text-white/40">PASAJERO</div>
                        <div className="text-[13px] font-semibold text-white tracking-wide truncate max-w-[200px]">
                          {nombre.trim() ? nombre.toUpperCase() : "EXPLORADOR ESTELAR"}
                        </div>
                        <div className="text-[9px] font-mono text-white/50 truncate max-w-[200px]">
                          {email.trim() ? email : "libre@cielo.abierto"}
                        </div>
                      </div>

                      {/* Row 3 Column Seat Allocation info */}
                      <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-3">
                        <div>
                          <div className="text-[9px] font-mono uppercase tracking-wider text-white/40">ASIENTO</div>
                          <div className="text-sm font-bold text-white tracking-widest">{selectedSeat}</div>
                        </div>
                        <div>
                          <div className="text-[9px] font-mono uppercase tracking-wider text-white/40">CLASE</div>
                          <div className="text-[10px] font-semibold text-white leading-tight">
                            {selectedClass === "Primera Clase Orbital" 
                              ? "FIRST" 
                              : selectedClass === "Especialista Científico" 
                                ? "SPEC" 
                                : "COLONY"
                            }
                          </div>
                        </div>
                        <div>
                          <div className="text-[9px] font-mono uppercase tracking-wider text-white/40">VENTANA</div>
                          <div className="text-[10px] font-semibold text-white leading-tight">
                            {selectedVoyage === "Kepler-186f" ? "2032 OP" : "2026 OCT"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Barcode */}
                  <div className="border-t border-white/10 pt-4 flex flex-col justify-end space-y-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-white/40">PASAJE ESTIMADO</span>
                      <span className="text-lg font-heading italic text-white flex flex-col items-end">
                        <span>
                          {selectedVoyage === "Kepler-186f" 
                            ? selectedClass === "Primera Clase Orbital" ? "$2,850,000 USD" : selectedClass === "Especialista Científico" ? "$1,425,000 USD" : "$950,000 USD"
                            : selectedVoyage === "Europa Oceanus"
                              ? selectedClass === "Primera Clase Orbital" ? "$1,440,000 USD" : selectedClass === "Especialista Científico" ? "$720,000 USD" : "$480,000 USD"
                              : selectedClass === "Primera Clase Orbital" ? "$750,000 USD" : selectedClass === "Especialista Científico" ? "$375,000 USD" : "$250,000 USD"
                          }
                        </span>
                        <span className="text-[10px] font-mono text-white/50 mt-0.5">
                          {selectedVoyage === "Kepler-186f" 
                            ? selectedClass === "Primera Clase Orbital" ? "11.25 BTC" : selectedClass === "Especialista Científico" ? "5.62 BTC" : "3.75 BTC"
                            : selectedVoyage === "Europa Oceanus"
                              ? selectedClass === "Primera Clase Orbital" ? "5.67 BTC" : selectedClass === "Especialista Científico" ? "2.83 BTC" : "1.89 BTC"
                              : selectedClass === "Primera Clase Orbital" ? "2.94 BTC" : selectedClass === "Especialista Científico" ? "1.47 BTC" : "0.98 BTC"
                          }
                        </span>
                      </span>
                    </div>

                    {/* Laser Barcode Decoration */}
                    <div className="flex flex-col items-center justify-center space-y-1 pt-1 border-t border-dashed border-white/10">
                      <div className="flex items-stretch justify-center h-8 gap-[1px] opacity-75 w-full select-none">
                        {[1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 3, 1, 2, 4, 1].map((w, idx) => (
                          <div key={idx} style={{ width: `${w}px` }} className="bg-white h-full" />
                        ))}
                      </div>
                      <span className="text-[8px] font-mono tracking-widest text-white/30 truncate">
                        V9-S9-RESERVA-{selectedSeat}-{selectedClass.substring(0, 3).toUpperCase()}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* SSS999 Footer Line */}
          <div className="mt-auto pt-10 text-center text-[10px] text-white/40 font-body select-none">
            <p className="mb-2">
              © 2026 SSS999. Todos los derechos reservados a SSS999 dueño. Desarrollado con tecnología premium de liquid-glass.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
