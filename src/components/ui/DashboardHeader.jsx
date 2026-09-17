import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Sparkles } from 'lucide-react';

export default function DashboardHeader() {
  const { perfil } = useData();
  const [currentDate, setCurrentDate] = useState('');
  const [greeting, setGreeting] = useState('Buenos días');

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 12)      setGreeting('Buenos días');
    else if (hour < 19) setGreeting('Buenas tardes');
    else                setGreeting('Buenas noches');

    const dateStr = now.toLocaleDateString('es-ES', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    setCurrentDate(dateStr.charAt(0).toUpperCase() + dateStr.slice(1));
  }, []);

  const isGuest = !perfil.nombre || perfil.nombre.toLowerCase() === 'invitado' || !perfil.email || perfil.email === '__guest__';
  const displayName = isGuest ? 'Invitado' : perfil.nombre.split(' ')[0];
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="tw-mb-8 tw-flex tw-items-center tw-justify-between tw-gap-4 tw-flex-wrap">
      <div className="tw-flex tw-items-center tw-gap-4 md:tw-gap-5">
        {/* Avatar */}
        <div className="tw-w-12 tw-h-12 md:tw-w-14 md:tw-h-14 tw-rounded-2xl tw-bg-gradient-to-br tw-from-[#8aa7ec] tw-to-[#6d8bcf] tw-flex tw-items-center tw-justify-center tw-text-white tw-text-xl md:tw-text-[22px] tw-font-extrabold tw-shadow-lg tw-shadow-[#8aa7ec]/30 tw-shrink-0 tw-overflow-hidden">
          {perfil.avatar ? (
            <img src={perfil.avatar} alt="Avatar" className="tw-w-full tw-h-full tw-object-cover" />
          ) : (
            initial
          )}
        </div>
        <div>
          <h1 className="tw-text-xl md:tw-text-[26px] tw-font-extrabold tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-tracking-tight tw-leading-none">
            {greeting}, {displayName} 👋
          </h1>
          <p className="tw-text-xs md:tw-text-sm tw-text-gray-500 dark:tw-text-[#999] tw-mt-1 md:tw-mt-1.5 tw-capitalize">
            {currentDate}
          </p>
        </div>
      </div>

      {/* Chip destacado */}
      <div className="tw-flex tw-items-center tw-gap-2 tw-bg-gradient-to-r tw-from-[#8aa7ec]/10 tw-to-indigo-500/10 tw-border tw-border-[#8aa7ec]/20 tw-rounded-xl tw-px-4 tw-py-2.5">
        <Sparkles size={16} className="tw-text-[#8aa7ec]" />
        <span className="tw-text-[13px] tw-font-semibold tw-text-[#8aa7ec]">Todo bajo control</span>
      </div>
    </div>
  );
}
