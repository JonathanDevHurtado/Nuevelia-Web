import React from 'react';
import { Menu, Moon, Sun, Plus } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function Topbar({ onMenuClick, activePage, setActiveModal }) {
  const { isDarkMode, toggleTheme } = useTheme();

  const getPageTitle = (page) => {
    const titles = {
      inicio: 'Inicio',
      agenda: 'Agenda',
      tareas: 'Tareas',
      finanzas: 'Finanzas',
      compras: 'Compras',
      habitos: 'Hábitos',
      notificaciones: 'Notificaciones',
      servicios: 'Servicios',
      suscripciones: 'Suscripciones',
      configuracion: 'Configuración',
      soporte: 'Soporte',
    };
    return titles[page] || 'Nuvelia';
  };

  return (
    <header id="topbar" className="tw-bg-white dark:tw-bg-[#1a1a18] tw-border-b tw-border-gray-200 dark:tw-border-transparent tw-px-6 tw-h-[60px] tw-flex tw-items-center tw-justify-between tw-sticky tw-top-0 tw-z-40 tw-transition-colors">
      <div className="topbar-left tw-flex tw-items-center tw-gap-3">
        <button 
          id="menu-btn" 
          onClick={onMenuClick} 
          className="tw-p-1.5 tw-rounded-md hover:tw-bg-gray-100 dark:hover:tw-bg-[#2e2e2c] tw-text-gray-500 dark:tw-text-[#ccc] tw-transition-colors md:tw-hidden"
        >
          <Menu size={20} />
        </button>
        <h2 className="topbar-title tw-text-[17px] tw-font-semibold tw-text-gray-900 dark:tw-text-[#f4f1ec]">{getPageTitle(activePage)}</h2>
      </div>
      
      <div className="topbar-right tw-flex tw-items-center tw-gap-3">
        <button 
          onClick={toggleTheme}
          className="topbar-btn tw-bg-transparent tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-full tw-p-1.5 tw-cursor-pointer tw-text-gray-500 dark:tw-text-[#ccc] tw-flex tw-items-center tw-justify-center hover:tw-bg-gray-50 dark:hover:tw-bg-[#2e2e2c] tw-transition-all"
        >
          {isDarkMode ? <Sun size={18} className="tw-text-yellow-400" /> : <Moon size={18} className="tw-text-orange-400" />}
        </button>
        
        <button
          onClick={() => setActiveModal && setActiveModal('menu')}
          className="tw-bg-brand dark:tw-bg-[#9ab8f0] hover:tw-bg-brand/90 dark:hover:tw-bg-[#bdd0f7] tw-text-white dark:tw-text-[#242422] tw-rounded-md tw-px-3 tw-py-1.5 tw-text-[13px] tw-font-medium tw-flex tw-items-center tw-gap-1 tw-transition-colors">
          <Plus size={16} />
          Añadir
        </button>
      </div>
    </header>
  );
}
