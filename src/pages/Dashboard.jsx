import React from 'react';
import { useData } from '../context/DataContext';
import DashboardHeader from '../components/ui/DashboardHeader';
import DashboardCards from '../components/ui/DashboardCards';
import {
  CalendarDays, CheckCircle2, TrendingUp, TrendingDown,
  Flame, DollarSign, ShoppingBag, ArrowRight
} from 'lucide-react';

export default function Dashboard({ setActivePage }) {
  const { tareas, compras, balance, habitos, eventos, transacciones } = useData();

  // ── Stats ─────────────────────────────────────────────────────
  const tasksPending = tareas.filter(t => !t.completada).length;
  const shoppingItems = compras.filter(c => !c.completada).length;

  let totalHabitDays = 0, completedHabitDays = 0;
  habitos.forEach(h => {
    Object.values(h.tracker || {}).forEach(val => {
      totalHabitDays++;
      if (val) completedHabitDays++;
    });
  });
  const habitsCompletedPercent = totalHabitDays === 0
    ? 0
    : Math.round((completedHabitDays / totalHabitDays) * 100);

  const stats = {
    tasksPending, balance, habitsCompletedPercent, shoppingItems,
    balanceTrend: balance >= 0 ? '↑ Balance positivo' : '↓ Balance negativo',
  };

  const today = new Date().toISOString().split('T')[0];
  const todayEvents = eventos.filter(e => e.fecha === today);
  const topTareas   = tareas.filter(t => !t.completada && t.prioridad === 'alta').slice(0, 3);
  const lastTransacciones = transacciones.slice(0, 4);

  const formatCurrency = (val) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(Math.abs(val ?? 0));

  // Shared section header
  const SectionHeader = ({ icon: Icon, iconColor, iconBg, title, page, label = 'Ver todo' }) => (
    <div className="tw-flex tw-items-center tw-justify-between tw-mb-5">
      <h3 className="tw-text-[15px] tw-font-bold tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-flex tw-items-center tw-gap-2.5">
        <div className={`tw-w-7 tw-h-7 tw-rounded-lg ${iconBg} ${iconColor} tw-flex tw-items-center tw-justify-center`}>
          <Icon size={15} />
        </div>
        {title}
      </h3>
      <button
        onClick={() => setActivePage && setActivePage(page)}
        className="tw-flex tw-items-center tw-gap-1 tw-text-[12px] tw-font-bold tw-text-gray-400 hover:tw-text-[#8aa7ec] dark:tw-text-gray-500 dark:hover:tw-text-[#8aa7ec] tw-transition-colors"
      >
        {label} <ArrowRight size={13} />
      </button>
    </div>
  );

  // Empty state
  const EmptyState = ({ icon, text }) => (
    <div className="tw-flex-1 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2.5 tw-py-8 tw-text-gray-300 dark:tw-text-gray-600">
      <span className="tw-text-4xl">{icon}</span>
      <p className="tw-text-[13px] tw-font-medium tw-text-gray-400 dark:tw-text-gray-500">{text}</p>
    </div>
  );

  return (
    <div className="page active tw-flex tw-flex-col" id="page-dashboard">
      <DashboardHeader />
      <DashboardCards stats={stats} />

      {/* ── Widget Grid ────────────────────────────────────────── */}
      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-5">

        {/* Agenda del día */}
        <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-p-6 tw-shadow-sm hover:tw-shadow-md tw-transition-shadow tw-min-h-[220px] tw-flex tw-flex-col">
          <SectionHeader
            icon={CalendarDays} iconColor="tw-text-indigo-500"
            iconBg="tw-bg-indigo-50 dark:tw-bg-indigo-500/10"
            title="Agenda del día" page="agenda"
          />
          <div className="tw-flex-1 tw-flex tw-flex-col tw-gap-2.5">
            {todayEvents.length === 0 ? (
              <EmptyState icon="📅" text="Sin eventos hoy" />
            ) : (
              todayEvents.map(e => (
                <div key={e.id} className="tw-flex tw-items-center tw-gap-4 tw-bg-indigo-50 dark:tw-bg-indigo-500/5 tw-border tw-border-indigo-100 dark:tw-border-indigo-500/10 tw-rounded-xl tw-px-4 tw-py-3">
                  <div className="tw-w-10 tw-h-10 tw-rounded-xl tw-bg-indigo-100 dark:tw-bg-indigo-500/20 tw-flex tw-flex-col tw-items-center tw-justify-center tw-shrink-0">
                    <span className="tw-text-[10px] tw-font-bold tw-text-indigo-400 tw-uppercase tw-leading-none">
                      {new Date().toLocaleDateString('es-ES', { weekday: 'short' })}
                    </span>
                    <span className="tw-text-[14px] tw-font-extrabold tw-text-indigo-600 dark:tw-text-indigo-300 tw-leading-tight">
                      {new Date().getDate()}
                    </span>
                  </div>
                  <div className="tw-min-w-0">
                    <p className="tw-text-[13.5px] tw-font-bold tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-truncate">{e.titulo}</p>
                    <p className="tw-text-[11.5px] tw-font-medium tw-text-indigo-500 dark:tw-text-indigo-400 tw-mt-0.5">{e.hora}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tareas prioritarias */}
        <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-p-6 tw-shadow-sm hover:tw-shadow-md tw-transition-shadow tw-min-h-[220px] tw-flex tw-flex-col">
          <SectionHeader
            icon={CheckCircle2} iconColor="tw-text-rose-500"
            iconBg="tw-bg-rose-50 dark:tw-bg-rose-500/10"
            title="Tareas Prioritarias" page="tareas"
          />
          <div className="tw-flex-1 tw-flex tw-flex-col tw-gap-2.5">
            {topTareas.length === 0 ? (
              <EmptyState icon="🎯" text="Sin tareas urgentes" />
            ) : (
              topTareas.map(t => (
                <div key={t.id} className="tw-flex tw-items-center tw-gap-3.5 tw-bg-rose-50 dark:tw-bg-rose-500/5 tw-border tw-border-rose-100 dark:tw-border-rose-500/10 tw-rounded-xl tw-px-4 tw-py-3">
                  <div className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-rose-500 tw-shrink-0 tw-shadow-[0_0_6px_rgba(244,63,94,0.5)]" />
                  <p className="tw-text-[13.5px] tw-font-semibold tw-text-rose-700 dark:tw-text-rose-300 tw-truncate">{t.texto}</p>
                  {t.fechaLimite && (
                    <span className="tw-ml-auto tw-shrink-0 tw-text-[11px] tw-font-bold tw-text-rose-400 tw-bg-rose-100 dark:tw-bg-rose-500/10 tw-rounded-lg tw-px-2 tw-py-0.5">
                      {t.fechaLimite}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Resumen financiero */}
        <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-p-6 tw-shadow-sm hover:tw-shadow-md tw-transition-shadow tw-min-h-[220px] tw-flex tw-flex-col">
          <SectionHeader
            icon={DollarSign} iconColor="tw-text-emerald-500"
            iconBg="tw-bg-emerald-50 dark:tw-bg-emerald-500/10"
            title="Resumen Financiero" page="finanzas"
          />
          <div className="tw-flex-1 tw-flex tw-flex-col tw-gap-1.5">
            {lastTransacciones.length === 0 ? (
              <EmptyState icon="💰" text="Sin movimientos recientes" />
            ) : (
              lastTransacciones.map(t => (
                <div key={t.id} className="tw-flex tw-items-center tw-justify-between tw-px-3 tw-py-2.5 tw-rounded-xl hover:tw-bg-gray-50 dark:hover:tw-bg-white/3 tw-transition-colors tw-group">
                  <div className="tw-flex tw-items-center tw-gap-3 tw-min-w-0">
                    <div className={`tw-w-8 tw-h-8 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-shrink-0 ${
                      t.tipo === 'ingreso'
                        ? 'tw-bg-emerald-50 dark:tw-bg-emerald-500/10 tw-text-emerald-500'
                        : 'tw-bg-rose-50 dark:tw-bg-rose-500/10 tw-text-rose-500'
                    }`}>
                      {t.tipo === 'ingreso' ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
                    </div>
                    <p className="tw-text-[13px] tw-font-semibold tw-text-gray-800 dark:tw-text-[#f4f1ec] tw-truncate tw-max-w-[120px]">{t.descripcion}</p>
                  </div>
                  <span className={`tw-text-[13px] tw-font-extrabold tw-tabular-nums tw-shrink-0 ${
                    t.tipo === 'ingreso' ? 'tw-text-emerald-600 dark:tw-text-emerald-400' : 'tw-text-gray-700 dark:tw-text-[#ccc]'
                  }`}>
                    {t.tipo === 'ingreso' ? '+' : '-'}{formatCurrency(t.monto)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Hábitos esta semana */}
        <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-p-6 tw-shadow-sm hover:tw-shadow-md tw-transition-shadow tw-min-h-[220px] tw-flex tw-flex-col">
          <SectionHeader
            icon={Flame} iconColor="tw-text-orange-500"
            iconBg="tw-bg-orange-50 dark:tw-bg-orange-500/10"
            title="Hábitos Esta Semana" page="habitos"
          />
          <div className="tw-flex-1 tw-flex tw-flex-col tw-gap-4">
            {habitos.length === 0 ? (
              <EmptyState icon="🔥" text="Sin hábitos activos" />
            ) : (
              habitos.slice(0, 3).map(h => {
                const completed = Object.values(h.tracker || {}).filter(Boolean).length;
                const total     = 7;
                const pct       = Math.round((completed / total) * 100);
                return (
                  <div key={h.id} className="tw-flex tw-items-center tw-gap-3.5">
                    <div className="tw-w-9 tw-h-9 tw-rounded-xl tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-flex tw-items-center tw-justify-center tw-text-xl tw-shrink-0">
                      {h.icono}
                    </div>
                    <div className="tw-flex-1 tw-min-w-0">
                      <div className="tw-flex tw-justify-between tw-items-center tw-mb-1.5">
                        <p className="tw-text-[13px] tw-font-bold tw-text-gray-800 dark:tw-text-[#f4f1ec] tw-truncate">{h.nombre}</p>
                        <span className="tw-text-[11px] tw-font-bold tw-text-gray-400 dark:tw-text-gray-500 tw-ml-2 tw-shrink-0">{completed}/{total}</span>
                      </div>
                      <div className="tw-w-full tw-h-1.5 tw-bg-gray-100 dark:tw-bg-white/5 tw-rounded-full tw-overflow-hidden">
                        <div
                          className="tw-h-full tw-rounded-full tw-transition-all tw-duration-700"
                          style={{ width: `${pct}%`, backgroundColor: h.color || '#8aa7ec' }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
