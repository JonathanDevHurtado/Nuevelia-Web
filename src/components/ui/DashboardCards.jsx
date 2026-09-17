import React from 'react';
import { CheckSquare, Wallet, Activity, ShoppingCart, TrendingUp, TrendingDown, Clock, Star } from 'lucide-react';

const CARDS = [
  {
    key: 'tasks',
    icon: CheckSquare,
    label: 'Tareas Pendientes',
    accent: 'tw-text-violet-500',
    iconBg: 'tw-bg-violet-50 dark:tw-bg-violet-500/10',
    getValue: (stats) => stats.tasksPending,
    getSub:   (stats) => `${stats.tasksPending === 0 ? 'Al día ✓' : `${stats.tasksPending} por completar`}`,
    subColor: (stats) => stats.tasksPending === 0 ? 'tw-text-emerald-500' : 'tw-text-violet-400',
  },
  {
    key: 'balance',
    icon: Wallet,
    label: 'Balance del Mes',
    accent: 'tw-text-emerald-500',
    iconBg: 'tw-bg-emerald-50 dark:tw-bg-emerald-500/10',
    getValue: (stats) => {
      const n = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(Math.abs(stats.balance));
      return (stats.balance < 0 ? '-' : '+') + n;
    },
    getSub: (stats) => stats.balance >= 0 ? '↑ En superávit' : '↓ En déficit',
    subColor: (stats) => stats.balance >= 0 ? 'tw-text-emerald-500' : 'tw-text-red-400',
  },
  {
    key: 'habits',
    icon: Activity,
    label: 'Hábitos Completados',
    accent: 'tw-text-[#8aa7ec]',
    iconBg: 'tw-bg-blue-50 dark:tw-bg-blue-500/10',
    getValue: (stats) => `${stats.habitsCompletedPercent}%`,
    getSub: () => 'Esta semana',
    subColor: () => 'tw-text-[#8aa7ec]',
  },
  {
    key: 'shopping',
    icon: ShoppingCart,
    label: 'Compras Pendientes',
    accent: 'tw-text-amber-500',
    iconBg: 'tw-bg-amber-50 dark:tw-bg-amber-500/10',
    getValue: (stats) => stats.shoppingItems,
    getSub: (stats) => `${stats.shoppingItems === 0 ? 'Lista vacía' : `${stats.shoppingItems} ítems`}`,
    subColor: (stats) => stats.shoppingItems === 0 ? 'tw-text-gray-400' : 'tw-text-amber-500',
  },
];

export default function DashboardCards({ stats = {} }) {
  return (
    <div className="tw-grid tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-4 tw-mb-8">
      {CARDS.map(({ key, icon: Icon, label, accent, iconBg, getValue, getSub, subColor }) => (
        <div
          key={key}
          className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-p-5 tw-shadow-sm hover:tw-shadow-md tw-transition-all tw-group"
        >
          <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
            <p className="tw-text-[11px] tw-font-bold tw-text-gray-500 dark:tw-text-[#888] tw-uppercase tw-tracking-wider">{label}</p>
            <div className={`tw-w-8 tw-h-8 tw-rounded-xl ${iconBg} tw-flex tw-items-center tw-justify-center ${accent} tw-transition-transform group-hover:tw-scale-110`}>
              <Icon size={16} />
            </div>
          </div>
          <p className={`tw-text-[26px] tw-font-extrabold tw-tracking-tight tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-leading-none`}>
            {getValue(stats)}
          </p>
          <p className={`tw-text-[12px] tw-font-semibold tw-mt-2 ${subColor(stats)}`}>
            {getSub(stats)}
          </p>
        </div>
      ))}
    </div>
  );
}
