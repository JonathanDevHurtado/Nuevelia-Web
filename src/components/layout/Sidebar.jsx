import React, { useState } from 'react';
import { 
  Eye, ChevronDown, 
  Home, Calendar, CheckSquare, 
  Wallet, ShoppingCart, 
  BarChart2, Bell, 
  Sparkles, CreditCard, 
  Settings, MessageSquare,
  LogOut
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function Sidebar({ activePage, setActivePage, onLogout }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const { tareas, notificaciones, perfil, exportarExcel } = useData();
  
  const isGuest = perfil.nombre === 'Invitado' && perfil.email === '__guest__';
  const displayRole = isGuest ? 'Invitado' : 'Usuario';

  const noLeidas = notificaciones.filter(n => !n.leida).length;
  const tareasPendientes = tareas.filter(t => !t.completada).length;

  const navSections = [
    {
      label: 'PRINCIPAL',
      items: [
        { id: 'inicio',   label: 'Inicio',          icon: Home },
        { id: 'agenda',   label: 'Agenda',           icon: Calendar },
        { id: 'tareas',   label: 'Tareas',           icon: CheckSquare, badge: tareasPendientes > 0 ? tareasPendientes : undefined },
      ]
    },
    {
      label: 'FINANZAS',
      items: [
        { id: 'finanzas', label: 'Finanzas', icon: Wallet },
        { id: 'compras',  label: 'Compras',  icon: ShoppingCart },
      ]
    },
    {
      label: 'BIENESTAR',
      items: [
        { id: 'habitos',        label: 'Hábitos',        icon: BarChart2 },
        { id: 'notificaciones', label: 'Notificaciones', icon: Bell, badge: noLeidas > 0 ? noLeidas : undefined },
      ]
    },
    {
      label: 'SERVICIOS',
      items: [
        { id: 'servicios',     label: 'Servicios',    icon: Sparkles },
        { id: 'suscripciones', label: 'Suscripciones', icon: CreditCard },
      ]
    },
    {
      label: 'SISTEMA',
      items: [
        { id: 'configuracion', label: 'Configuración', icon: Settings },
        { id: 'soporte',       label: 'Soporte',       icon: MessageSquare },
      ]
    },
  ];

  return (
    <aside
      id="sidebar"
      className="tw-w-[240px] tw-h-screen tw-bg-white dark:tw-bg-[#111111] tw-border-r tw-border-gray-100 dark:tw-border-[#2a2a2a] tw-z-50 tw-transition-colors tw-duration-200 tw-flex tw-flex-col tw-shrink-0"
    >
      {/* ── Brand ─────────────────────────────────── */}
      <div className="tw-px-4 tw-py-5 tw-flex tw-items-center tw-gap-3 tw-border-b tw-border-gray-100 dark:tw-border-[#2a2a2a]">
        {/*
          Icon: a rounded square with the logo image cropped to show only
          the colourful "N" symbol (top 58% of the square image).
          Works on any background — no white box in dark mode.
        */}
        <img
          src="/logo.png"
          alt="Nuvelia"
          className="tw-w-14 tw-h-14 tw-object-contain tw-shrink-0"
          style={{ mixBlendMode: isDarkMode ? 'screen' : 'multiply' }}
          onError={(e) => e.target.style.display = 'none'}
        />

        {/* Wordmark */}
        <div className="tw-flex tw-flex-col tw-leading-none">
          <span
            className="tw-text-[16px] tw-font-extrabold tw-tracking-tight"
            style={{
              background: 'linear-gradient(90deg,#85BEFF,#C7BBF5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Nuvelia
          </span>
          <span className="tw-text-[10px] tw-text-gray-400 dark:tw-text-[#555] tw-font-medium tw-mt-0.5 tw-tracking-wide">
            Organiza tu vida
          </span>
        </div>
      </div>

      {/* ── Nav ───────────────────────────────────── */}
      <nav className="tw-flex-1 tw-overflow-y-auto tw-px-3 tw-py-3">
        {navSections.map((section) => (
          <div key={section.label}>
            {/* Section label */}
            <p className="tw-px-3 tw-pt-4 tw-pb-1.5 tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-text-gray-400 dark:tw-text-[#444]">
              {section.label}
            </p>

            {section.items.map((item) => {
              const isActive = activePage === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`tw-w-full tw-flex tw-items-center tw-gap-3 tw-px-3 tw-py-2.5 tw-mb-0.5 tw-rounded-xl tw-transition-all tw-duration-150 tw-text-left ${
                    isActive
                      ? 'tw-bg-[#85BEFF]/12 dark:tw-bg-[#85BEFF]/20 tw-text-[#85BEFF]'
                      : 'tw-text-gray-500 dark:tw-text-[#777] hover:tw-bg-gray-50 dark:hover:tw-bg-[#1a1a1a] hover:tw-text-gray-800 dark:hover:tw-text-[#ccc]'
                  }`}
                >
                  <Icon
                    size={17}
                    className="tw-shrink-0"
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                  <span className={`tw-text-[13px] tw-flex-1 ${isActive ? 'tw-font-bold' : 'tw-font-medium'}`}>
                    {item.label}
                  </span>
                  {item.badge !== undefined && (
                    <span
                      className={`tw-text-[10px] tw-font-bold tw-px-1.5 tw-py-0.5 tw-rounded-full ${
                        isActive
                          ? 'tw-bg-[#85BEFF] tw-text-white'
                          : 'tw-bg-gray-200 dark:tw-bg-[#2a2a2a] tw-text-gray-600 dark:tw-text-gray-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ── Footer / User ─────────────────────────── */}
      <div className="tw-p-3 tw-border-t tw-border-gray-100 dark:tw-border-[#2a2a2a] tw-relative">

        {/* User context menu */}
        {isUserMenuOpen && (
          <div className="tw-absolute tw-bottom-[calc(100%+8px)] tw-left-3 tw-w-[calc(100%-24px)] tw-bg-white/95 dark:tw-bg-[#1a1a1a]/95 tw-backdrop-blur-xl tw-rounded-2xl tw-shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] dark:tw-shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] tw-border tw-border-gray-100 dark:tw-border-white/10 tw-py-2 tw-z-50 tw-animate-fade-in-up tw-overflow-hidden">
            <button
              onClick={() => {
                setIsUserMenuOpen(false);
                exportarExcel();
              }}
              className="tw-flex tw-items-center tw-gap-3 tw-px-4 tw-py-3 tw-w-full tw-text-left tw-text-[13px] tw-font-bold tw-text-gray-700 dark:tw-text-[#e0e0e0] hover:tw-bg-blue-50 dark:hover:tw-bg-blue-900/20 hover:tw-text-[#6b8cdd] tw-transition-all"
            >
              <div className="tw-bg-gray-100 dark:tw-bg-[#2a2a2a] tw-p-1.5 tw-rounded-lg">
                <BarChart2 size={16} />
              </div>
              Exportar a Excel
            </button>
            <div className="tw-h-px tw-bg-gradient-to-r tw-from-transparent tw-via-gray-200 dark:tw-via-[#333] tw-to-transparent tw-my-1" />
            <button
              onClick={() => {
                setIsUserMenuOpen(false);
                onLogout();
              }}
              className="tw-flex tw-items-center tw-gap-3 tw-px-4 tw-py-3 tw-w-full tw-text-left tw-text-[13px] tw-font-bold tw-text-red-500 hover:tw-bg-red-50 dark:hover:tw-bg-red-500/10 tw-transition-all"
            >
              <div className="tw-bg-red-50 dark:tw-bg-red-500/10 tw-p-1.5 tw-rounded-lg">
                <LogOut size={16} />
              </div>
              Cerrar sesión
            </button>
          </div>
        )}

        {/* User card */}
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="tw-w-full tw-flex tw-items-center tw-gap-3 tw-p-2.5 tw-rounded-xl tw-transition-colors hover:tw-bg-gray-50 dark:hover:tw-bg-[#1a1a1a] tw-text-left"
        >
          {/* Avatar */}
          <div className="tw-w-9 tw-h-9 tw-rounded-full tw-bg-gradient-to-br tw-from-[#85BEFF] tw-to-[#C7BBF5] tw-flex tw-items-center tw-justify-center tw-text-white tw-text-[13px] tw-font-bold tw-shrink-0 tw-uppercase tw-overflow-hidden">
            {perfil.avatar ? (
              <img src={perfil.avatar} alt="Avatar" className="tw-w-full tw-h-full tw-object-cover" />
            ) : (
              perfil.nombre ? perfil.nombre.charAt(0) : 'I'
            )}
          </div>

          {/* Info */}
          <div className="tw-flex-1 tw-overflow-hidden">
            <p className="tw-text-[13px] tw-font-bold tw-text-gray-900 dark:tw-text-white tw-truncate">
              {perfil.nombre || 'Invitado'}
            </p>
            <p className="tw-text-[11px] tw-text-gray-400 dark:tw-text-[#666] tw-flex tw-items-center tw-gap-1 tw-mt-0.5">
              <Eye size={10} className="tw-shrink-0" />
              {displayRole}
            </p>
          </div>

          <ChevronDown
            size={14}
            className={`tw-text-gray-400 dark:tw-text-[#555] tw-transition-transform tw-duration-200 ${isUserMenuOpen ? 'tw-rotate-180' : ''}`}
          />
        </button>
      </div>
    </aside>
  );
}
