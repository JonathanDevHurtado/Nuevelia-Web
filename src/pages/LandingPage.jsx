import React from 'react';
import { ArrowRight, Wallet, CheckSquare, Zap, Sun, Moon, ExternalLink, Code2, Smartphone, Server, Database, Palette, Mail, MapPin, Calendar, GitBranch, CalendarDays, ShoppingCart, Bell, Flame } from 'lucide-react';

function GithubIcon({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}
import { useTheme } from '../context/ThemeContext.jsx';

export default function LandingPage({ onNavigateAuth }) {
  const { isDarkMode, toggleTheme } = useTheme();

  const technologies = [
    { name: 'React', category: 'Frontend', icon: Code2, color: 'tw-text-cyan-500', bg: 'tw-bg-cyan-50 dark:tw-bg-cyan-500/10' },
    { name: 'Vite', category: 'Frontend', icon: Zap, color: 'tw-text-purple-500', bg: 'tw-bg-purple-50 dark:tw-bg-purple-500/10' },
    { name: 'HTML', category: 'Frontend', icon: Code2, color: 'tw-text-orange-500', bg: 'tw-bg-orange-50 dark:tw-bg-orange-500/10' },
    { name: 'CSS', category: 'Frontend', icon: Palette, color: 'tw-text-blue-500', bg: 'tw-bg-blue-50 dark:tw-bg-blue-500/10' },
    { name: 'Tailwind CSS', category: 'Frontend', icon: Palette, color: 'tw-text-teal-500', bg: 'tw-bg-teal-50 dark:tw-bg-teal-500/10' },
    { name: 'Node.js', category: 'Backend', icon: Server, color: 'tw-text-green-600', bg: 'tw-bg-green-50 dark:tw-bg-green-500/10' },
    { name: 'Express', category: 'Backend', icon: Server, color: 'tw-text-gray-600 dark:tw-text-gray-400', bg: 'tw-bg-gray-50 dark:tw-bg-gray-500/10' },
    { name: 'Supabase', category: 'Backend', icon: Database, color: 'tw-text-emerald-500', bg: 'tw-bg-emerald-50 dark:tw-bg-emerald-500/10' },
    { name: 'SQLite', category: 'Base de Datos', icon: Database, color: 'tw-text-blue-500', bg: 'tw-bg-blue-50 dark:tw-bg-blue-500/10' },
    { name: 'Kotlin', category: 'Mobile', icon: Smartphone, color: 'tw-text-violet-500', bg: 'tw-bg-violet-50 dark:tw-bg-violet-500/10' },
    { name: 'Java', category: 'Mobile', icon: Code2, color: 'tw-text-orange-500', bg: 'tw-bg-orange-50 dark:tw-bg-orange-500/10' },
    { name: 'JavaScript', category: 'Lenguaje', icon: Code2, color: 'tw-text-yellow-500', bg: 'tw-bg-yellow-50 dark:tw-bg-yellow-500/10' },
    { name: 'Git', category: 'Herramientas', icon: GitBranch, color: 'tw-text-red-500', bg: 'tw-bg-red-50 dark:tw-bg-red-500/10' },
    { name: 'Vercel', category: 'Deploy', icon: Zap, color: 'tw-text-gray-800 dark:tw-text-gray-200', bg: 'tw-bg-gray-50 dark:tw-bg-gray-500/10' },
  ];

  const projects = [
    {
      name: 'Danganime',
      description: 'Aplicación para ver anime, series y películas. Lee novelas ligeras, mangas y manhwas sin anuncios de forma gratuita.',
      tech: ['Java', 'Capacitor', 'JavaScript'],
      stars: 1,
      url: 'https://github.com/JonathanDevHurtado/Danganime',
      color: 'from-purple-500 to-pink-500',
      image: 'https://raw.githubusercontent.com/JonathanDevHurtado/Danganime/main/screenshots/2-menu.png',
      icon: 'https://raw.githubusercontent.com/JonathanDevHurtado/Danganime/main/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png',
    },
    {
      name: 'BubuADS',
      description: 'Aplicación de YouTube sin anuncios para dispositivos móviles. Experiencia de visualización limpia y sin interrupciones.',
      tech: ['Kotlin', 'Android'],
      stars: 1,
      url: 'https://github.com/JonathanDevHurtado/BubuADS',
      color: 'from-red-500 to-orange-500',
      image: 'https://raw.githubusercontent.com/JonathanDevHurtado/BubuADS/main/Github/capturas/inicio.png',
      icon: 'https://raw.githubusercontent.com/JonathanDevHurtado/BubuADS/main/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png',
    },
  ];

  return (
    <div className={`tw-font-sans tw-antialiased tw-overflow-x-hidden tw-transition-colors tw-duration-500 ${isDarkMode ? 'tw-text-gray-100' : 'tw-text-slate-800'}`}
      style={{
        backgroundColor: isDarkMode ? '#0a0a0a' : '#f7f5ff',
        backgroundImage: isDarkMode
          ? `radial-gradient(at 15% 15%, rgba(120, 80, 200, 0.15) 0px, transparent 50%),
             radial-gradient(at 85% 10%, rgba(60, 160, 140, 0.1) 0px, transparent 50%),
             radial-gradient(at 50% 90%, rgba(80, 180, 160, 0.08) 0px, transparent 50%)`
          : `radial-gradient(at 15% 15%, rgba(216, 180, 254, 0.4) 0px, transparent 50%),
             radial-gradient(at 85% 10%, rgba(196, 233, 219, 0.45) 0px, transparent 50%),
             radial-gradient(at 50% 90%, rgba(165, 243, 222, 0.35) 0px, transparent 50%),
             radial-gradient(at 90% 85%, rgba(224, 231, 255, 0.5) 0px, transparent 50%)`
      }}
    >
      {/* ═══════════════════════════════════════════════════════
          BARRA DE NAVEGACIÓN
      ═══════════════════════════════════════════════════════ */}
      <header className={`tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-50 tw-border-b tw-transition-all tw-duration-300 ${isDarkMode ? 'tw-border-white/5' : 'tw-border-slate-100/80'}`}
        style={{
          background: isDarkMode ? 'rgba(10, 10, 10, 0.85)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)'
        }}
      >
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-h-20 tw-flex tw-items-center tw-justify-between">

          {/* Logotipo */}
          <div className="tw-flex tw-items-center tw-space-x-3 tw-cursor-pointer tw-group">
            <div className="tw-w-10 tw-h-10 tw-rounded-xl tw-shadow-md tw-overflow-hidden tw-transition-transform tw-duration-300 group-hover:tw-scale-110 group-hover:tw-shadow-lg">
              <img src="/logo.png" alt="Nuvelia" className="tw-w-full tw-h-full tw-object-contain" onError={(e) => { e.target.style.display='none'; }} />
            </div>
            <span className={`tw-text-xl tw-font-bold tw-tracking-tight ${isDarkMode ? 'tw-text-white' : 'tw-text-slate-900'}`}>Nuvelia</span>
          </div>

          {/* Enlaces de navegación */}
          <nav className="tw-hidden md:tw-flex tw-items-center tw-space-x-1">
            {[
              { label: 'Características', href: '#caracteristicas' },
              { label: 'Todo en Uno', href: '#plataforma' },
              { label: 'Comunidad', href: '#comunidad' },
              { label: 'Desarrollador', href: '#desarrollador' },
            ].map((link) => (
              <a key={link.href} href={link.href}
                className={`tw-text-sm tw-font-medium tw-px-4 tw-py-2 tw-rounded-xl tw-transition-all tw-duration-200 ${isDarkMode ? 'tw-text-gray-400 hover:tw-text-white hover:tw-bg-white/5' : 'tw-text-slate-600 hover:tw-text-purple-600 hover:tw-bg-purple-50'}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Acciones */}
          <div className="tw-flex tw-items-center tw-space-x-3">
            {/* Dark Mode Toggle */}
            <button onClick={toggleTheme}
              className={`tw-w-10 tw-h-10 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-300 ${isDarkMode ? 'tw-bg-white/5 hover:tw-bg-white/10 tw-text-yellow-400' : 'tw-bg-slate-100 hover:tw-bg-slate-200 tw-text-slate-600'}`}
              title={isDarkMode ? 'Modo claro' : 'Modo oscuro'}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button onClick={() => onNavigateAuth('login')}
              className={`tw-text-sm tw-font-semibold tw-px-4 tw-py-2 tw-rounded-xl tw-transition-all tw-duration-200 ${isDarkMode ? 'tw-text-gray-300 hover:tw-text-white hover:tw-bg-white/5' : 'tw-text-slate-700 hover:tw-text-purple-600 hover:tw-bg-purple-50'}`}
            >
              Iniciar sesión
            </button>
            <button onClick={() => onNavigateAuth('register')}
              className="tw-text-sm tw-font-medium tw-text-white tw-px-5 tw-py-2.5 tw-rounded-xl tw-bg-gradient-to-r tw-from-purple-600 tw-to-indigo-500 hover:tw-from-purple-700 hover:tw-to-indigo-600 tw-shadow-lg tw-shadow-purple-500/25 hover:tw-shadow-xl hover:tw-shadow-purple-500/35 tw-transform hover:-tw-translate-y-0.5 tw-transition-all tw-duration-200"
            >
              Comenzar gratis
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="tw-relative tw-pt-32 tw-pb-20 md:tw-pt-44 md:tw-px-6 tw-overflow-hidden">
        <div className="tw-absolute tw-top-20 tw-left-1/2 -tw-translate-x-1/2 tw-w-[600px] tw-h-[600px] tw-bg-purple-300/20 dark:tw-bg-purple-500/10 tw-rounded-full tw-blur-3xl tw-pointer-events-none -tw-z-10 tw-animate-pulse"></div>

        <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-text-center">
          <div className={`tw-inline-flex tw-items-center tw-space-x-2 tw-px-4 tw-py-2 tw-rounded-full tw-border tw-shadow-sm tw-mb-8 tw-animate-fade-in-up hover:tw-shadow-md hover:tw-scale-105 tw-transition-all tw-duration-300 tw-cursor-default ${isDarkMode ? 'tw-bg-white/5 tw-border-white/10' : 'tw-bg-white/80 tw-border-purple-100'}`}>
            <span className="tw-flex tw-h-2 tw-w-2 tw-rounded-full tw-bg-teal-400 tw-animate-ping"></span>
            <span className={`tw-text-xs tw-font-semibold tw-uppercase tw-tracking-wider ${isDarkMode ? 'tw-text-purple-300' : 'tw-text-purple-700'}`}>Nueva Versión 2.0 disponible</span>
          </div>

          <h1 className={`tw-text-4xl sm:tw-text-6xl lg:tw-text-7xl tw-font-extrabold tw-tracking-tight tw-max-w-4xl tw-mx-auto tw-leading-[1.1] tw-mb-6 tw-animate-fade-in-up ${isDarkMode ? 'tw-text-white' : 'tw-text-slate-900'}`}>
            Tu plataforma todo en uno para darte <span className="tw-bg-gradient-to-r tw-from-purple-600 tw-via-indigo-600 tw-to-teal-500 tw-bg-clip-text tw-text-transparent">paz mental.</span>
          </h1>

          <p className={`tw-text-lg sm:tw-text-xl tw-max-w-2xl tw-mx-auto tw-mb-10 tw-leading-relaxed tw-animate-fade-in-up ${isDarkMode ? 'tw-text-gray-400' : 'tw-text-slate-500'}`}>
            Organiza tus finanzas personales, controla tus tareas diarias y construye hábitos duraderos en una sola interfaz hermosa e intuitiva.
          </p>

          <div className="tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-justify-center tw-space-y-4 sm:tw-space-y-0 sm:tw-space-x-4 tw-mb-16 tw-animate-fade-in-up">
            <button onClick={() => onNavigateAuth('register')}
              className="tw-w-full sm:tw-w-auto tw-px-8 tw-py-4 tw-bg-gradient-to-r tw-from-purple-600 tw-via-purple-500 tw-to-teal-500 hover:tw-from-purple-700 hover:tw-via-purple-600 hover:tw-to-teal-600 tw-text-white tw-font-semibold tw-rounded-2xl tw-shadow-xl tw-shadow-purple-500/30 tw-transform hover:-tw-translate-y-1 hover:tw-shadow-2xl hover:tw-shadow-purple-500/40 tw-transition-all tw-duration-300 tw-flex tw-items-center tw-justify-center tw-space-x-2 tw-group"
            >
              <span>Empieza ahora gratis</span>
              <ArrowRight size={20} className="tw-transition-transform tw-duration-300 group-hover:tw-translate-x-1" />
            </button>
            <a href="#caracteristicas"
              className={`tw-w-full sm:tw-w-auto tw-px-8 tw-py-4 tw-font-semibold tw-rounded-2xl tw-border tw-shadow-sm hover:tw-shadow-md tw-transition-all tw-duration-300 tw-flex tw-items-center tw-justify-center hover:-tw-translate-y-0.5 ${isDarkMode ? 'tw-bg-white/5 hover:tw-bg-white/10 tw-text-gray-300 tw-border-white/10 hover:tw-border-white/20' : 'tw-bg-white/80 hover:tw-bg-white tw-text-slate-700 tw-border-slate-200 hover:tw-border-slate-300'}`}
            >
              Ver características
            </a>
          </div>

          {/* Tarjeta Central */}
          <div className="tw-relative tw-max-w-4xl tw-mx-auto tw-animate-float">
            <div className={`tw-p-4 tw-backdrop-blur-2xl tw-rounded-3xl tw-shadow-2xl tw-border tw-transition-shadow tw-duration-500 hover:tw-shadow-3xl ${isDarkMode ? 'tw-bg-white/5 tw-border-white/10 tw-shadow-purple-500/5 hover:tw-shadow-purple-500/10' : 'tw-bg-white/70 tw-border-white tw-shadow-purple-900/10 hover:tw-shadow-purple-900/15'}`}>
              <div className={`tw-rounded-2xl tw-p-8 sm:tw-p-12 tw-flex tw-flex-col tw-items-center tw-justify-center tw-border ${isDarkMode ? 'tw-bg-gradient-to-tr tw-from-purple-900/20 tw-via-transparent tw-to-teal-900/20 tw-border-white/5' : 'tw-bg-gradient-to-tr tw-from-purple-50 tw-via-white tw-to-teal-50 tw-border-slate-100'}`}>
                <div className="tw-w-24 tw-h-24 tw-mb-6 tw-bg-white dark:tw-bg-[#1a1a1a] tw-rounded-2xl tw-shadow-xl tw-flex tw-items-center tw-justify-center tw-border tw-border-purple-50 dark:tw-border-purple-500/20 tw-animate-bounce-soft hover:tw-scale-110 tw-transition-transform tw-duration-300">
                  <img src="/logo.png" alt="Nuvelia" className="tw-w-16 tw-h-16 tw-object-contain" onError={(e) => { e.target.style.display='none'; }} />
                </div>
                <span className="tw-text-xs tw-uppercase tw-tracking-widest tw-font-bold tw-text-purple-600 dark:tw-text-purple-400 tw-mb-2">Nuvelia Workspace</span>
                <h3 className={`tw-text-2xl tw-font-bold ${isDarkMode ? 'tw-text-white' : 'tw-text-slate-900'}`}>Diseñado para tu bienestar diario</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CARACTERÍSTICAS
      ═══════════════════════════════════════════════════════ */}
      <section id="caracteristicas" className={`tw-py-24 tw-backdrop-blur-md tw-border-t ${isDarkMode ? 'tw-bg-transparent tw-border-white/5' : 'tw-bg-white/60 tw-border-slate-100'}`}>
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6">
          <div className="tw-text-center tw-max-w-2xl tw-mx-auto tw-mb-16">
            <h2 className={`tw-text-3xl tw-font-bold tw-tracking-tight tw-mb-4 ${isDarkMode ? 'tw-text-white' : 'tw-text-slate-900'}`}>Todo lo que necesitas en un solo lugar</h2>
            <p className={isDarkMode ? 'tw-text-gray-400' : 'tw-text-slate-500'}>Adiós a usar múltiples aplicaciones desconectadas. Nuvelia unifica tus pilares clave de productividad.</p>
          </div>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-8">
            <div className={`tw-p-8 tw-rounded-3xl tw-shadow-xl tw-border tw-transition-all tw-duration-300 tw-group hover:-tw-translate-y-2 tw-cursor-pointer ${isDarkMode ? 'tw-bg-white/5 tw-shadow-black/20 hover:tw-border-purple-500/30 hover:tw-shadow-2xl' : 'tw-bg-white tw-shadow-slate-200/50 tw-border-slate-100 hover:tw-border-purple-200 hover:tw-shadow-2xl hover:tw-shadow-purple-100/50'}`}>
              <div className={`tw-w-14 tw-h-14 tw-bg-purple-50 dark:tw-bg-purple-500/10 tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-text-purple-600 dark:tw-text-purple-400 tw-mb-6 group-hover:tw-scale-110 group-hover:tw-bg-purple-100 dark:group-hover:tw-bg-purple-500/20 tw-transition-all tw-duration-300`}>
                <Wallet size={28} />
              </div>
              <h3 className={`tw-text-xl tw-font-bold tw-mb-2 group-hover:tw-text-purple-700 dark:group-hover:tw-text-purple-400 tw-transition-colors tw-duration-300 ${isDarkMode ? 'tw-text-white' : 'tw-text-slate-900'}`}>Finanzas Claras</h3>
              <p className={`tw-text-sm tw-leading-relaxed ${isDarkMode ? 'tw-text-gray-400' : 'tw-text-slate-500'}`}>Monitorea tus ingresos, gastos y presupuestos mensuales con gráficos limpios que eliminan la ansiedad financiera.</p>
            </div>

            <div className={`tw-p-8 tw-rounded-3xl tw-shadow-xl tw-border tw-transition-all tw-duration-300 tw-group hover:-tw-translate-y-2 tw-cursor-pointer ${isDarkMode ? 'tw-bg-white/5 tw-shadow-black/20 hover:tw-border-teal-500/30 hover:tw-shadow-2xl' : 'tw-bg-white tw-shadow-slate-200/50 tw-border-slate-100 hover:tw-border-teal-200 hover:tw-shadow-2xl hover:tw-shadow-teal-100/50'}`}>
              <div className={`tw-w-14 tw-h-14 tw-bg-teal-50 dark:tw-bg-teal-500/10 tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-text-teal-600 dark:tw-text-teal-400 tw-mb-6 group-hover:tw-scale-110 group-hover:tw-bg-teal-100 dark:group-hover:tw-bg-teal-500/20 tw-transition-all tw-duration-300`}>
                <CheckSquare size={28} />
              </div>
              <h3 className={`tw-text-xl tw-font-bold tw-mb-2 group-hover:tw-text-teal-700 dark:group-hover:tw-text-teal-400 tw-transition-colors tw-duration-300 ${isDarkMode ? 'tw-text-white' : 'tw-text-slate-900'}`}>Gestión de Tareas</h3>
              <p className={`tw-text-sm tw-leading-relaxed ${isDarkMode ? 'tw-text-gray-400' : 'tw-text-slate-500'}`}>Prioriza tus pendientes diarios con tableros inteligentes enfocados en lo que realmente genera impacto.</p>
            </div>

            <div className={`tw-p-8 tw-rounded-3xl tw-shadow-xl tw-border tw-transition-all tw-duration-300 tw-group hover:-tw-translate-y-2 tw-cursor-pointer ${isDarkMode ? 'tw-bg-white/5 tw-shadow-black/20 hover:tw-border-indigo-500/30 hover:tw-shadow-2xl' : 'tw-bg-white tw-shadow-slate-200/50 tw-border-slate-100 hover:tw-border-indigo-200 hover:tw-shadow-2xl hover:tw-shadow-indigo-100/50'}`}>
              <div className={`tw-w-14 tw-h-14 tw-bg-indigo-50 dark:tw-bg-indigo-500/10 tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-text-indigo-600 dark:tw-text-indigo-400 tw-mb-6 group-hover:tw-scale-110 group-hover:tw-bg-indigo-100 dark:group-hover:tw-bg-indigo-500/20 tw-transition-all tw-duration-300`}>
                <Zap size={28} />
              </div>
              <h3 className={`tw-text-xl tw-font-bold tw-mb-2 group-hover:tw-text-indigo-700 dark:group-hover:tw-text-indigo-400 tw-transition-colors tw-duration-300 ${isDarkMode ? 'tw-text-white' : 'tw-text-slate-900'}`}>Hábitos Conscientes</h3>
              <p className={`tw-text-sm tw-leading-relaxed ${isDarkMode ? 'tw-text-gray-400' : 'tw-text-slate-500'}`}>Crea rachas positivas y transforma tu rutina diaria paso a paso con seguimiento automatizado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TODO EN UNO (Plataforma)
      ═══════════════════════════════════════════════════════ */}
      <section id="plataforma" className={`tw-py-24 tw-border-t ${isDarkMode ? 'tw-border-white/5' : 'tw-border-slate-100'}`}>
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6">
          <div className="tw-text-center tw-max-w-2xl tw-mx-auto tw-mb-16">
            <h2 className={`tw-text-3xl tw-font-bold tw-tracking-tight tw-mb-4 ${isDarkMode ? 'tw-text-white' : 'tw-text-slate-900'}`}>Todo en una sola plataforma</h2>
            <p className={isDarkMode ? 'tw-text-gray-400' : 'tw-text-slate-500'}>Sin pestañas infinitas, sin apps dispersas. Todo conectado, todo sincronizado.</p>
          </div>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
            {[
              { label: 'Agenda', desc: 'Calendario inteligente con recordatorios y eventos', icon: CalendarDays, color: 'tw-text-blue-600 dark:tw-text-blue-400', bg: 'tw-bg-blue-50 dark:tw-bg-blue-500/10' },
              { label: 'Finanzas', desc: 'Control total de ingresos, gastos y presupuestos', icon: Wallet, color: 'tw-text-green-600 dark:tw-text-green-400', bg: 'tw-bg-green-50 dark:tw-bg-green-500/10' },
              { label: 'Tareas', desc: 'Tablero Kanban para organizar tu productividad', icon: CheckSquare, color: 'tw-text-teal-600 dark:tw-text-teal-400', bg: 'tw-bg-teal-50 dark:tw-bg-teal-500/10' },
              { label: 'Hábitos', desc: 'Rachas, estadísticas y seguimiento diario', icon: Flame, color: 'tw-text-orange-600 dark:tw-text-orange-400', bg: 'tw-bg-orange-50 dark:tw-bg-orange-500/10' },
              { label: 'Compras', desc: 'Listas inteligentes y comparador de precios', icon: ShoppingCart, color: 'tw-text-pink-600 dark:tw-text-pink-400', bg: 'tw-bg-pink-50 dark:tw-bg-pink-500/10' },
              { label: 'Notificaciones', desc: 'Alertas inteligentes que no interrumpen', icon: Bell, color: 'tw-text-violet-600 dark:tw-text-violet-400', bg: 'tw-bg-violet-50 dark:tw-bg-violet-500/10' },
            ].map((item, i) => (
              <div key={i} className={`tw-p-6 tw-rounded-2xl tw-border tw-transition-all tw-duration-300 tw-group hover:-tw-translate-y-1 tw-cursor-pointer ${isDarkMode ? 'tw-bg-white/5 tw-border-white/5 hover:tw-border-white/10 hover:tw-bg-white/8' : 'tw-bg-white tw-border-slate-100 hover:tw-border-slate-200 hover:tw-shadow-lg'}`}>
                <div className="tw-flex tw-items-start tw-space-x-4">
                  <div className={`tw-w-12 tw-h-12 tw-rounded-xl ${item.bg} tw-flex tw-items-center tw-justify-center ${item.color} tw-shrink-0 group-hover:tw-scale-110 tw-transition-transform tw-duration-300`}>
                    <item.icon size={22} />
                  </div>
                  <div>
                    <h3 className={`tw-font-bold tw-mb-1 ${isDarkMode ? 'tw-text-white' : 'tw-text-slate-900'}`}>{item.label}</h3>
                    <p className={`tw-text-sm ${isDarkMode ? 'tw-text-gray-400' : 'tw-text-slate-500'}`}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          COMUNIDAD / TESTIMONIOS
      ═══════════════════════════════════════════════════════ */}
      <section id="comunidad" className={`tw-py-24 tw-border-t ${isDarkMode ? 'tw-border-white/5' : 'tw-border-slate-100'}`}>
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6">
          <div className="tw-text-center tw-max-w-2xl tw-mx-auto tw-mb-16">
            <h2 className={`tw-text-3xl tw-font-bold tw-tracking-tight tw-mb-4 ${isDarkMode ? 'tw-text-white' : 'tw-text-slate-900'}`}>Construido para la comunidad</h2>
            <p className={isDarkMode ? 'tw-text-gray-400' : 'tw-text-slate-500'}>Nuvelia está diseñado con retroalimentación real de usuarios que buscan organizar su vida.</p>
          </div>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-8">
            {[
              { text: 'Finalmente una app que no me abruma. Todo está donde debe estar.', author: 'María G.', role: 'Emprendedora', image: '/images/Maria G.jpg' },
              { text: 'Mis finanzas nunca habían estado tan claras. La uso todos los días.', author: 'Carlos R.', role: 'Freelancer', image: '/images/Carlos R.jpg' },
              { text: 'La sección de hábitos me ayudó a crear una rutina que realmente funciona.', author: 'Ana L.', role: 'Estudiante', image: '/images/Ana L.jpg' },
            ].map((item, i) => (
              <div key={i} className={`tw-p-8 tw-rounded-3xl tw-border tw-transition-all tw-duration-300 hover:-tw-translate-y-1 ${isDarkMode ? 'tw-bg-white/5 tw-border-white/5 hover:tw-border-white/10' : 'tw-bg-white tw-border-slate-100 hover:tw-shadow-xl hover:tw-shadow-slate-100/50'}`}>
                <div className="tw-flex tw-mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="tw-w-5 tw-h-5 tw-text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <p className={`tw-text-sm tw-leading-relaxed tw-mb-6 ${isDarkMode ? 'tw-text-gray-300' : 'tw-text-slate-600'}`}>"{item.text}"</p>
                <div className="tw-flex tw-items-center tw-space-x-3">
                  <div className="tw-w-10 tw-h-10 tw-rounded-full tw-overflow-hidden tw-shadow-md tw-ring-2 tw-ring-purple-100 dark:tw-ring-purple-500/20">
                    <img src={item.image} alt={item.author} className="tw-w-full tw-h-full tw-object-cover" onError={(e) => { e.target.style.display='none'; e.target.parentElement.innerHTML = `<div class="tw-w-full tw-h-full tw-bg-gradient-to-br tw-from-purple-500 tw-to-teal-500 tw-flex tw-items-center tw-justify-center tw-text-white tw-text-sm tw-font-bold">${item.author.charAt(0)}</div>`; }} />
                  </div>
                  <div>
                    <p className={`tw-text-sm tw-font-bold ${isDarkMode ? 'tw-text-white' : 'tw-text-slate-900'}`}>{item.author}</p>
                    <p className={`tw-text-xs ${isDarkMode ? 'tw-text-gray-500' : 'tw-text-slate-400'}`}>{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          DESARROLLADOR
      ═══════════════════════════════════════════════════════ */}
      <section id="desarrollador" className={`tw-py-24 tw-border-t ${isDarkMode ? 'tw-border-white/5' : 'tw-border-slate-100'}`}>
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6">

          <div className="tw-text-center tw-mb-16">
            <h2 className={`tw-text-3xl tw-font-bold tw-tracking-tight tw-mb-4 ${isDarkMode ? 'tw-text-white' : 'tw-text-slate-900'}`}>Conoce al Desarrollador</h2>
            <p className={isDarkMode ? 'tw-text-gray-400' : 'tw-text-slate-500'}>El talento detrás de Nuvelia y otros proyectos innovadores.</p>
          </div>

          {/* Perfil */}
          <div className={`tw-p-8 md:tw-p-12 tw-rounded-3xl tw-border tw-mb-12 ${isDarkMode ? 'tw-bg-white/5 tw-border-white/5' : 'tw-bg-white tw-border-slate-100 tw-shadow-xl tw-shadow-slate-100/50'}`}>
            <div className="tw-flex tw-flex-col md:tw-flex-row tw-items-center md:tw-items-start tw-space-y-6 md:tw-space-y-0 md:tw-space-x-8">
              {/* Avatar */}
              <div className="tw-shrink-0">
                <img
                  src="https://avatars.githubusercontent.com/u/318078264?v=4"
                  alt="Jonathan Dev Hurtado"
                  className="tw-w-32 tw-h-32 tw-rounded-2xl tw-object-cover tw-shadow-xl tw-border-2 tw-border-purple-200 dark:tw-border-purple-500/30 hover:tw-scale-105 tw-transition-transform tw-duration-300"
                />
              </div>

              {/* Info */}
              <div className="tw-flex-1 tw-text-center md:tw-text-left">
                <h3 className={`tw-text-2xl tw-font-extrabold tw-mb-1 ${isDarkMode ? 'tw-text-white' : 'tw-text-slate-900'}`}>Jonathan Dev Hurtado</h3>
                <p className="tw-text-purple-600 dark:tw-text-purple-400 tw-font-semibold tw-mb-4">Full-Stack Developer & Mobile Developer</p>

                <div className={`tw-flex tw-flex-wrap tw-justify-center md:tw-justify-start tw-gap-4 tw-mb-6 tw-text-sm ${isDarkMode ? 'tw-text-gray-400' : 'tw-text-slate-500'}`}>
                  <span className="tw-flex tw-items-center tw-gap-1.5"><MapPin size={14} /> Colombia</span>
                  <span className="tw-flex tw-items-center tw-gap-1.5"><Calendar size={14} /> Disponible para proyectos</span>
                  <span className="tw-flex tw-items-center tw-gap-1.5"><Mail size={14} /> Contratable</span>
                </div>

                <p className={`tw-text-sm tw-leading-relaxed tw-mb-6 ${isDarkMode ? 'tw-text-gray-300' : 'tw-text-slate-600'}`}>
                  Desarrollador apasionado por crear soluciones tecnológicas que impactan. Especializado en aplicaciones web modernas y móviles nativas. Me enfoco en escribir código limpio, escalable y centrado en la experiencia del usuario. Siempre en busca de nuevos desafíos y oportunidades para crecer profesionalmente.
                </p>

                <div className="tw-flex tw-flex-wrap tw-justify-center md:tw-justify-start tw-gap-3">
                  <a href="https://github.com/JonathanDevHurtado" target="_blank" rel="noopener noreferrer"
                    className={`tw-inline-flex tw-items-center tw-gap-2 tw-px-5 tw-py-2.5 tw-rounded-xl tw-font-semibold tw-text-sm tw-transition-all tw-duration-200 hover:-tw-translate-y-0.5 ${isDarkMode ? 'tw-bg-white/10 hover:tw-bg-white/15 tw-text-white' : 'tw-bg-gray-900 hover:tw-bg-gray-800 tw-text-white'}`}
                  >
                    <GithubIcon size={18} /> GitHub
                  </a>
                  <a href="https://github.com/JonathanDevHurtado?tab=repositories" target="_blank" rel="noopener noreferrer"
                    className={`tw-inline-flex tw-items-center tw-gap-2 tw-px-5 tw-py-2.5 tw-rounded-xl tw-font-semibold tw-text-sm tw-border tw-transition-all tw-duration-200 hover:-tw-translate-y-0.5 ${isDarkMode ? 'tw-border-white/10 hover:tw-border-white/20 tw-text-gray-300 hover:tw-text-white' : 'tw-border-slate-200 hover:tw-border-slate-300 tw-text-slate-700 hover:tw-text-slate-900'}`}
                  >
                    <ExternalLink size={16} /> Ver Repositorios
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Stack Tecnológico */}
          <div className="tw-mb-12">
            <h3 className={`tw-text-xl tw-font-bold tw-text-center tw-mb-8 ${isDarkMode ? 'tw-text-white' : 'tw-text-slate-900'}`}>Stack Tecnológico</h3>
            <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 md:tw-grid-cols-5 tw-gap-4">
              {technologies.map((tech, i) => (
                <div key={i} className={`tw-p-4 tw-rounded-2xl tw-border tw-text-center tw-transition-all tw-duration-300 tw-group hover:-tw-translate-y-1 tw-cursor-default ${isDarkMode ? 'tw-bg-white/5 tw-border-white/5 hover:tw-border-white/10 hover:tw-bg-white/8' : 'tw-bg-white tw-border-slate-100 hover:tw-shadow-lg hover:tw-shadow-slate-100/50'}`}>
                  <div className={`tw-w-12 tw-h-12 tw-mx-auto tw-mb-3 ${tech.bg} tw-rounded-xl tw-flex tw-items-center tw-justify-center ${tech.color} group-hover:tw-scale-110 tw-transition-transform tw-duration-300`}>
                    <tech.icon size={24} />
                  </div>
                  <p className={`tw-text-sm tw-font-bold ${isDarkMode ? 'tw-text-white' : 'tw-text-slate-900'}`}>{tech.name}</p>
                  <p className={`tw-text-xs ${isDarkMode ? 'tw-text-gray-500' : 'tw-text-slate-400'}`}>{tech.category}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Proyectos */}
          <div>
            <h3 className={`tw-text-xl tw-font-bold tw-text-center tw-mb-8 ${isDarkMode ? 'tw-text-white' : 'tw-text-slate-900'}`}>Proyectos Destacados</h3>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
              {projects.map((project, i) => (
                <a key={i} href={project.url} target="_blank" rel="noopener noreferrer"
                  className={`tw-rounded-2xl tw-border tw-overflow-hidden tw-transition-all tw-duration-300 tw-group hover:-tw-translate-y-2 ${isDarkMode ? 'tw-bg-white/5 tw-border-white/5 hover:tw-border-white/15' : 'tw-bg-white tw-border-slate-100 hover:tw-shadow-xl hover:tw-shadow-slate-100/50'}`}
                >
                  {project.image && (
                    <div className="tw-h-48 tw-overflow-hidden tw-bg-gray-100 dark:tw-bg-gray-800">
                      <img src={project.image} alt={project.name} className="tw-w-full tw-h-full tw-object-cover tw-object-top group-hover:tw-scale-105 tw-transition-transform tw-duration-500" />
                    </div>
                  )}
                  <div className="tw-p-6">
                    <div className="tw-w-12 tw-h-12 tw-rounded-xl tw-overflow-hidden tw-mb-4 tw-shadow-lg group-hover:tw-scale-110 tw-transition-transform tw-duration-300">
                      <img src={project.icon} alt={`${project.name} icon`} className="tw-w-full tw-h-full tw-object-cover" />
                    </div>
                    <h4 className={`tw-font-bold tw-mb-2 ${isDarkMode ? 'tw-text-white' : 'tw-text-slate-900'}`}>{project.name}</h4>
                    <p className={`tw-text-sm tw-leading-relaxed tw-mb-4 ${isDarkMode ? 'tw-text-gray-400' : 'tw-text-slate-500'}`}>{project.description}</p>
                    <div className="tw-flex tw-flex-wrap tw-gap-2">
                      {project.tech.map((t, j) => (
                        <span key={j} className={`tw-text-xs tw-font-semibold tw-px-2.5 tw-py-1 tw-rounded-lg ${isDarkMode ? 'tw-bg-white/10 tw-text-gray-300' : 'tw-bg-slate-100 tw-text-slate-600'}`}>{t}</span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA FINAL
      ═══════════════════════════════════════════════════════ */}
      <section className="tw-py-24">
        <div className="tw-max-w-4xl tw-mx-auto tw-px-6 tw-text-center">
          <div className={`tw-p-12 md:tw-p-16 tw-rounded-3xl tw-border ${isDarkMode ? 'tw-bg-gradient-to-br tw-from-purple-900/30 tw-to-teal-900/30 tw-border-white/5' : 'tw-bg-gradient-to-br tw-from-purple-50 tw-to-teal-50 tw-border-slate-100'}`}>
            <h2 className={`tw-text-3xl md:tw-text-4xl tw-font-extrabold tw-mb-4 ${isDarkMode ? 'tw-text-white' : 'tw-text-slate-900'}`}>¿Listo para organizar tu vida?</h2>
            <p className={`tw-text-lg tw-mb-8 ${isDarkMode ? 'tw-text-gray-400' : 'tw-text-slate-500'}`}>Únete a quienes ya están transformando su productividad diaria.</p>
            <button onClick={() => onNavigateAuth('register')}
              className="tw-px-10 tw-py-4 tw-bg-gradient-to-r tw-from-purple-600 tw-to-teal-500 hover:tw-from-purple-700 hover:tw-to-teal-600 tw-text-white tw-font-bold tw-text-lg tw-rounded-2xl tw-shadow-xl tw-shadow-purple-500/30 hover:tw-shadow-2xl hover:tw-shadow-purple-500/40 tw-transform hover:-tw-translate-y-1 tw-transition-all tw-duration-300 tw-group"
            >
              <span className="tw-flex tw-items-center tw-gap-2">
                Crear mi cuenta gratis
                <ArrowRight size={20} className="tw-transition-transform tw-duration-300 group-hover:tw-translate-x-1" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════ */}
      <footer className={`tw-border-t tw-py-12 ${isDarkMode ? 'tw-bg-transparent tw-border-white/5' : 'tw-bg-white tw-border-slate-100'}`}>
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-between tw-text-sm">
          <div className="tw-flex tw-items-center tw-space-x-3 tw-mb-4 md:tw-mb-0">
            <div className="tw-w-8 tw-h-8 tw-rounded-lg tw-overflow-hidden">
              <img src="/logo.png" alt="Nuvelia" className="tw-w-full tw-h-full tw-object-contain" onError={(e) => e.target.style.display='none'} />
            </div>
            <span className={`tw-font-bold ${isDarkMode ? 'tw-text-white' : 'tw-text-slate-900'}`}>Nuvelia</span>
            <span className={isDarkMode ? 'tw-text-gray-500' : 'tw-text-slate-400'}>© 2026. Todos los derechos reservados.</span>
          </div>
          <div className="tw-flex tw-space-x-6">
            <button onClick={() => onNavigateAuth('login')} className={`${isDarkMode ? 'tw-text-gray-400 hover:tw-text-purple-400' : 'tw-text-slate-500 hover:tw-text-purple-600'} tw-transition-colors tw-duration-200`}>Iniciar sesión</button>
            <button onClick={() => onNavigateAuth('register')} className={`${isDarkMode ? 'tw-text-gray-400 hover:tw-text-purple-400' : 'tw-text-slate-500 hover:tw-text-purple-600'} tw-transition-colors tw-duration-200`}>Registrarse</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
