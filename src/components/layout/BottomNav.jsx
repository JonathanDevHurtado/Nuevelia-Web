import React from 'react';
import { Home, CalendarDays, CheckSquare, Wallet, LayoutGrid } from 'lucide-react';

export default function BottomNav({ activePage, setActivePage }) {
  const navItems = [
    { id: 'inicio',    label: 'Inicio',    icon: <Home size={22} /> },
    { id: 'agenda',    label: 'Agenda',    icon: <CalendarDays size={22} /> },
    { id: 'tareas',    label: 'Tareas',    icon: <CheckSquare size={22} /> },
    { id: 'finanzas',  label: 'Finanzas',  icon: <Wallet size={22} /> },
    { id: 'compras',   label: 'Compras',   icon: <LayoutGrid size={22} /> },
  ];

  return (
    <nav
      id="bottom-nav"
      className="tw-fixed tw-bottom-0 tw-left-0 tw-w-full tw-bg-white dark:tw-bg-[#242422] tw-border-t tw-border-gray-200 dark:tw-border-white/10 tw-z-50 md:tw-hidden tw-transition-colors"
    >
      <div className="tw-flex tw-justify-around tw-items-center tw-py-2">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage && setActivePage(item.id)}
              className={`tw-flex tw-flex-col tw-items-center tw-gap-0.5 tw-px-3 tw-py-1 tw-rounded-lg tw-transition-colors tw-bg-transparent tw-border-none tw-cursor-pointer ${
                isActive
                  ? 'tw-text-brand dark:tw-text-[#9ab8f0]'
                  : 'tw-text-gray-400 dark:tw-text-[#888] hover:tw-text-gray-700 dark:hover:tw-text-[#ccc]'
              }`}
            >
              {item.icon}
              <span className={`tw-text-[10px] ${isActive ? 'tw-font-semibold' : 'tw-font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
