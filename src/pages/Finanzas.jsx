import React, { useMemo } from 'react';
import {
  Plus, Trash2, TrendingUp, TrendingDown, Wallet,
  DollarSign, Receipt, Briefcase, ShoppingBag, Gift,
  MoreHorizontal, Car, Home, Coffee, PiggyBank
} from 'lucide-react';
import { useData } from '../context/DataContext';

const CATEGORY_CONFIG = {
  alimentacion: { icon: ShoppingBag,   color: 'tw-text-orange-500', bg: 'tw-bg-orange-50 dark:tw-bg-orange-500/10',   label: 'Alimentación' },
  transporte:   { icon: Car,            color: 'tw-text-blue-500',   bg: 'tw-bg-blue-50 dark:tw-bg-blue-500/10',       label: 'Transporte' },
  vivienda:     { icon: Home,           color: 'tw-text-purple-500', bg: 'tw-bg-purple-50 dark:tw-bg-purple-500/10',   label: 'Vivienda' },
  servicios:    { icon: Receipt,        color: 'tw-text-sky-500',    bg: 'tw-bg-sky-50 dark:tw-bg-sky-500/10',         label: 'Servicios' },
  ocio:         { icon: Coffee,         color: 'tw-text-pink-500',   bg: 'tw-bg-pink-50 dark:tw-bg-pink-500/10',       label: 'Ocio' },
  salario:      { icon: DollarSign,     color: 'tw-text-emerald-500',bg: 'tw-bg-emerald-50 dark:tw-bg-emerald-500/10', label: 'Salario' },
  negocios:     { icon: Briefcase,      color: 'tw-text-teal-500',   bg: 'tw-bg-teal-50 dark:tw-bg-teal-500/10',       label: 'Negocios' },
  inversiones:  { icon: TrendingUp,     color: 'tw-text-indigo-500', bg: 'tw-bg-indigo-50 dark:tw-bg-indigo-500/10',   label: 'Inversiones' },
  regalos:      { icon: Gift,           color: 'tw-text-rose-500',   bg: 'tw-bg-rose-50 dark:tw-bg-rose-500/10',       label: 'Regalos' },
  otros:        { icon: MoreHorizontal, color: 'tw-text-gray-500',   bg: 'tw-bg-gray-50 dark:tw-bg-white/5',           label: 'Otros' },
};

export default function Finanzas({ setActiveModal }) {
  const { ingresosMes, gastosMes, balance, transacciones, deleteTransaccion } = useData();

  const formatCurrency = (val) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(Math.abs(val ?? 0));

  // ── Chart data ─────────────────────────────────────────────────
  const computedChartData = useMemo(() => {
    const data = Array(12).fill(null).map(() => ({ ingresos: 0, gastos: 0 }));
    transacciones.forEach(t => {
      const match = t.fecha?.match(/-(\d{2})-/);
      if (match) {
        const idx = parseInt(match[1], 10) - 1;
        if (idx >= 0 && idx < 12) {
          if (t.tipo === 'ingreso') data[idx].ingresos += Number(t.monto) || 0;
          else                      data[idx].gastos   += Number(t.monto) || 0;
        }
      }
    });
    return data;
  }, [transacciones]);

  const maxVal = useMemo(() => {
    const m = Math.max(...computedChartData.flatMap(d => [d.ingresos, d.gastos]), 1);
    return Math.ceil(m / 100) * 100;
  }, [computedChartData]);

  // ── Category breakdown ──────────────────────────────────────────
  const categoryTotals = useMemo(() => {
    const totals = {};
    transacciones
      .filter(t => t.tipo === 'gasto')
      .forEach(t => {
        const cat = t.categoria || 'otros';
        totals[cat] = (totals[cat] || 0) + (Number(t.monto) || 0);
      });
    return Object.entries(totals).sort(([, a], [, b]) => b - a).slice(0, 4);
  }, [transacciones]);

  const totalGastosCat = categoryTotals.reduce((s, [, v]) => s + v, 0) || 1;

  const CHART_H = 120;
  const BASE_Y  = 140;
  const months  = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

  return (
    <div className="page active tw-flex tw-flex-col">

      {/* ── Header ───────────────────────────────────────────── */}
      <div className="tw-mb-8 tw-flex tw-items-center tw-justify-between tw-gap-4 tw-flex-wrap">
        <div>
          <h1 className="tw-text-[28px] tw-font-extrabold tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-tracking-tight tw-flex tw-items-center tw-gap-3">
            <div className="tw-w-10 tw-h-10 tw-rounded-xl tw-bg-gradient-to-br tw-from-emerald-500 tw-to-teal-500 tw-flex tw-items-center tw-justify-center tw-shadow-lg tw-shadow-emerald-500/30">
              <Wallet className="tw-text-white" size={20} />
            </div>
            Finanzas
          </h1>
          <p className="tw-text-sm tw-text-gray-500 dark:tw-text-[#ccc] tw-mt-2">
            Gestiona tus ingresos, controla tus gastos y alcanza tus metas.
          </p>
        </div>
        <button
          onClick={() => setActiveModal && setActiveModal('transaccion')}
          className="tw-flex tw-items-center tw-gap-2 tw-bg-gradient-to-r tw-from-[#85BEFF] tw-to-[#C7BBF5] hover:tw-from-[#6faaff] hover:tw-to-[#b5a9f0] tw-text-white tw-rounded-xl tw-px-5 tw-py-2.5 tw-text-[14px] tw-font-bold tw-transition-all tw-shadow-md hover:tw-shadow-lg active:tw-scale-[0.98]"
        >
          <Plus size={18} /> Nueva Transacción
        </button>
      </div>

      {/* ── Stat Cards ───────────────────────────────────────── */}
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-5 tw-mb-8">

        {/* Ingresos */}
        <div className="tw-bg-gradient-to-br tw-from-emerald-50 tw-to-green-50 dark:tw-from-[#0e1f17] dark:tw-to-[#12241b] tw-border tw-border-emerald-100 dark:tw-border-emerald-500/20 tw-rounded-2xl tw-p-6 tw-shadow-sm tw-relative tw-overflow-hidden">
          <div className="tw-absolute -tw-right-6 -tw-top-6 tw-w-24 tw-h-24 tw-bg-emerald-400/20 tw-rounded-full tw-blur-2xl" />
          <div className="tw-flex tw-items-center tw-justify-between tw-mb-4 tw-relative tw-z-10">
            <p className="tw-text-[11px] tw-font-bold tw-text-emerald-700 dark:tw-text-emerald-400 tw-uppercase tw-tracking-widest">Ingresos del mes</p>
            <div className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-emerald-100 dark:tw-bg-emerald-500/20 tw-flex tw-items-center tw-justify-center tw-text-emerald-600 dark:tw-text-emerald-400">
              <TrendingUp size={16} />
            </div>
          </div>
          <p className="tw-text-[30px] tw-font-extrabold tw-text-emerald-700 dark:tw-text-emerald-300 tw-relative tw-z-10 tw-tracking-tight">
            {formatCurrency(ingresosMes)}
          </p>
          <p className="tw-text-[11px] tw-text-emerald-600/70 dark:tw-text-emerald-500/70 tw-mt-1 tw-relative tw-z-10">
            {transacciones.filter(t => t.tipo === 'ingreso').length} transacciones
          </p>
        </div>

        {/* Gastos */}
        <div className="tw-bg-gradient-to-br tw-from-red-50 tw-to-rose-50 dark:tw-from-[#200e0e] dark:tw-to-[#261010] tw-border tw-border-red-100 dark:tw-border-red-500/20 tw-rounded-2xl tw-p-6 tw-shadow-sm tw-relative tw-overflow-hidden">
          <div className="tw-absolute -tw-right-6 -tw-top-6 tw-w-24 tw-h-24 tw-bg-red-400/20 tw-rounded-full tw-blur-2xl" />
          <div className="tw-flex tw-items-center tw-justify-between tw-mb-4 tw-relative tw-z-10">
            <p className="tw-text-[11px] tw-font-bold tw-text-red-700 dark:tw-text-red-400 tw-uppercase tw-tracking-widest">Gastos del mes</p>
            <div className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-red-100 dark:tw-bg-red-500/20 tw-flex tw-items-center tw-justify-center tw-text-red-600 dark:tw-text-red-400">
              <TrendingDown size={16} />
            </div>
          </div>
          <p className="tw-text-[30px] tw-font-extrabold tw-text-red-700 dark:tw-text-red-300 tw-relative tw-z-10 tw-tracking-tight">
            -{formatCurrency(gastosMes)}
          </p>
          <p className="tw-text-[11px] tw-text-red-600/70 dark:tw-text-red-500/70 tw-mt-1 tw-relative tw-z-10">
            {transacciones.filter(t => t.tipo === 'gasto').length} transacciones
          </p>
        </div>

        {/* Balance */}
        <div className="tw-bg-gradient-to-br tw-from-indigo-50 tw-to-blue-50 dark:tw-from-[#1c1c1a] dark:tw-to-[#131311] tw-border tw-border-indigo-100 dark:tw-border-white/10 tw-rounded-2xl tw-p-6 tw-shadow-sm dark:tw-shadow-xl tw-relative tw-overflow-hidden">
          <div className="tw-absolute -tw-right-6 -tw-top-6 tw-w-24 tw-h-24 tw-bg-indigo-400/20 dark:tw-bg-white/5 tw-rounded-full tw-blur-2xl" />
          <div className="tw-flex tw-items-center tw-justify-between tw-mb-4 tw-relative tw-z-10">
            <p className="tw-text-[11px] tw-font-bold tw-text-indigo-600 dark:tw-text-gray-300 tw-uppercase tw-tracking-widest">Balance Total</p>
            <div className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-indigo-100 dark:tw-bg-white/10 tw-flex tw-items-center tw-justify-center tw-text-indigo-600 dark:tw-text-white">
              <PiggyBank size={16} />
            </div>
          </div>
          <p className={`tw-text-[30px] tw-font-extrabold tw-relative tw-z-10 tw-tracking-tight ${balance < 0 ? 'tw-text-rose-500 dark:tw-text-rose-400' : 'tw-text-emerald-600 dark:tw-text-emerald-400'}`}>
            {balance < 0 ? '-' : '+'}{formatCurrency(balance)}
          </p>
          <p className="tw-text-[11px] tw-font-semibold tw-text-indigo-500/80 dark:tw-text-white/60 tw-mt-1 tw-relative tw-z-10">
            {balance >= 0 ? '✓ En superávit' : '⚠ En déficit'}
          </p>
        </div>

      </div>

      {/* ── Main Grid ────────────────────────────────────────── */}
      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-gap-6 tw-items-start">

        {/* Left: Chart + Category Breakdown */}
        <div className="lg:tw-col-span-7 tw-flex tw-flex-col tw-gap-6">

          {/* Bar Chart */}
          <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-shadow-sm tw-p-6">
            <div className="tw-flex tw-items-center tw-justify-between tw-mb-5">
              <h3 className="tw-text-[16px] tw-font-bold tw-text-gray-900 dark:tw-text-[#f4f1ec]">Análisis Mensual</h3>
              <div className="tw-flex tw-items-center tw-gap-4">
                <span className="tw-flex tw-items-center tw-gap-2 tw-text-[12px] tw-font-semibold tw-text-gray-500 dark:tw-text-[#aaa]">
                  <span className="tw-w-2.5 tw-h-2.5 tw-rounded-full tw-bg-emerald-500" /> Ingresos
                </span>
                <span className="tw-flex tw-items-center tw-gap-2 tw-text-[12px] tw-font-semibold tw-text-gray-500 dark:tw-text-[#aaa]">
                  <span className="tw-w-2.5 tw-h-2.5 tw-rounded-full tw-bg-rose-500" /> Gastos
                </span>
              </div>
            </div>

            <div className="tw-w-full tw-overflow-x-auto">
              <div className="tw-min-w-[460px]">
                <svg viewBox="0 0 530 180" className="tw-w-full tw-h-auto">
                  {[1, 0.75, 0.5, 0.25, 0].map((ratio, i) => (
                    <g key={i}>
                      <line
                        x1="44" y1={10 + i * 30} x2="520" y2={10 + i * 30}
                        stroke="currentColor"
                        strokeWidth={i === 4 ? 1.5 : 0.8}
                        strokeDasharray={i === 4 ? '0' : '3 5'}
                        className={i === 4
                          ? 'tw-text-gray-300 dark:tw-text-white/15'
                          : 'tw-text-gray-100 dark:tw-text-white/5'}
                      />
                      <text
                        x="38" y={14 + i * 30}
                        fontSize="9" fontWeight="600"
                        fill="currentColor" textAnchor="end"
                        className="tw-text-gray-400 dark:tw-fill-gray-500"
                      >
                        {maxVal <= 1
                          ? ratio.toFixed(1)
                          : maxVal >= 1000
                            ? `$${Math.round(maxVal * ratio / 1000)}k`
                            : `$${Math.round(maxVal * ratio)}`}
                      </text>
                    </g>
                  ))}

                  {computedChartData.map((d, i) => {
                    const barW  = 18;
                    const startX = 56 + i * 38;
                    const ingH  = d.ingresos > 0 ? Math.max((d.ingresos / maxVal) * CHART_H, 3) : 0;
                    const gasH  = d.gastos   > 0 ? Math.max((d.gastos   / maxVal) * CHART_H, 3) : 0;

                    return (
                      <g key={i} className="tw-cursor-pointer">
                        <rect
                          x={startX - 5} y={0} width={barW + 10} height={160}
                          fill="transparent" rx="4"
                          className="hover:tw-fill-gray-50 dark:hover:tw-fill-white/5 tw-transition-all"
                        />
                        {ingH > 0 && (
                          <rect x={startX} y={BASE_Y - ingH} width={barW / 2 - 2} height={ingH} rx="3" fill="#10b981" opacity="0.9" />
                        )}
                        {gasH > 0 && (
                          <rect x={startX + barW / 2} y={BASE_Y - gasH} width={barW / 2 - 2} height={gasH} rx="3" fill="#f43f5e" opacity="0.9" />
                        )}
                        <text
                          x={startX + barW / 2 - 1} y="163"
                          fontSize="10" fontWeight="600"
                          fill="currentColor" textAnchor="middle"
                          className="tw-text-gray-500 dark:tw-fill-gray-500"
                        >
                          {months[i]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* Gastos por Categoría */}
          {categoryTotals.length > 0 && (
            <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-shadow-sm tw-p-6">
              <h3 className="tw-text-[16px] tw-font-bold tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-mb-5">
                Gastos por Categoría
              </h3>
              <div className="tw-flex tw-flex-col tw-gap-4">
                {categoryTotals.map(([cat, total]) => {
                  const cfg  = CATEGORY_CONFIG[cat] || CATEGORY_CONFIG['otros'];
                  const Icon = cfg.icon;
                  const pct  = Math.round((total / totalGastosCat) * 100);
                  return (
                    <div key={cat} className="tw-flex tw-items-center tw-gap-4">
                      <div className={`tw-w-9 tw-h-9 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-shrink-0 ${cfg.bg} ${cfg.color}`}>
                        <Icon size={17} />
                      </div>
                      <div className="tw-flex-1 tw-min-w-0">
                        <div className="tw-flex tw-justify-between tw-items-center tw-mb-1.5">
                          <span className="tw-text-[13px] tw-font-semibold tw-text-gray-800 dark:tw-text-[#f4f1ec]">{cfg.label}</span>
                          <span className="tw-text-[13px] tw-font-bold tw-text-gray-700 dark:tw-text-[#ccc]">{formatCurrency(total)}</span>
                        </div>
                        <div className="tw-w-full tw-h-1.5 tw-bg-gray-100 dark:tw-bg-white/5 tw-rounded-full tw-overflow-hidden">
                          <div
                            className="tw-h-full tw-rounded-full tw-bg-gradient-to-r tw-from-rose-400 tw-to-rose-600 tw-transition-all tw-duration-700"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                      <span className="tw-text-[12px] tw-font-bold tw-text-gray-400 dark:tw-text-gray-500 tw-w-8 tw-text-right">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right: Transaction list */}
        <div className="lg:tw-col-span-5 tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-shadow-sm tw-p-6 tw-flex tw-flex-col">
          <div className="tw-flex tw-items-center tw-justify-between tw-mb-5">
            <h3 className="tw-text-[16px] tw-font-bold tw-text-gray-900 dark:tw-text-[#f4f1ec]">Transacciones Recientes</h3>
            <span className="tw-text-[12px] tw-font-bold tw-text-gray-400 dark:tw-text-gray-500 tw-bg-gray-100 dark:tw-bg-white/5 tw-px-2.5 tw-py-0.5 tw-rounded-full">
              {transacciones.length}
            </span>
          </div>

          <div className="tw-flex tw-flex-col tw-gap-0.5 tw-overflow-y-auto" style={{ maxHeight: '520px' }}>
            {transacciones.length === 0 ? (
              <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-py-14">
                <div className="tw-w-14 tw-h-14 tw-rounded-2xl tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-flex tw-items-center tw-justify-center tw-text-gray-300 dark:tw-text-gray-600">
                  <Wallet size={26} />
                </div>
                <p className="tw-text-[14px] tw-font-bold tw-text-gray-500 dark:tw-text-[#888]">Sin transacciones</p>
                <p className="tw-text-[12px] tw-text-gray-400 tw-text-center tw-max-w-[180px]">
                  Registra tu primer ingreso o gasto para comenzar.
                </p>
                <button
                  onClick={() => setActiveModal && setActiveModal('transaccion')}
                  className="tw-mt-1 tw-text-[13px] tw-font-bold tw-text-[#8aa7ec] hover:tw-text-[#6d8bcf] tw-flex tw-items-center tw-gap-1.5 tw-transition-colors"
                >
                  <Plus size={15} /> Añadir transacción
                </button>
              </div>
            ) : (
              transacciones.slice().reverse().map(t => {
                const cfg  = CATEGORY_CONFIG[t.categoria] || CATEGORY_CONFIG['otros'];
                const Icon = cfg.icon;
                return (
                  <div
                    key={t.id}
                    className="tw-flex tw-items-center tw-justify-between tw-px-3 tw-py-3 tw-rounded-xl hover:tw-bg-gray-50 dark:hover:tw-bg-white/[0.03] tw-transition-colors tw-group tw-cursor-default"
                  >
                    <div className="tw-flex tw-items-center tw-gap-3.5 tw-min-w-0">
                      <div className={`tw-w-10 tw-h-10 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-shrink-0 ${cfg.bg} ${cfg.color}`}>
                        <Icon size={17} />
                      </div>
                      <div className="tw-min-w-0">
                        <p className="tw-text-[13.5px] tw-font-bold tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-truncate tw-max-w-[140px]">
                          {t.descripcion}
                        </p>
                        <p className="tw-text-[11px] tw-font-medium tw-text-gray-400 tw-capitalize tw-mt-0.5">
                          {cfg.label} · {t.fecha}
                        </p>
                      </div>
                    </div>
                    <div className="tw-flex tw-items-center tw-gap-2 tw-shrink-0">
                      <span className={`tw-text-[14px] tw-font-extrabold tw-tabular-nums ${
                        t.tipo === 'ingreso'
                          ? 'tw-text-emerald-600 dark:tw-text-emerald-400'
                          : 'tw-text-gray-700 dark:tw-text-[#d4d0cc]'
                      }`}>
                        {t.tipo === 'ingreso' ? '+' : '-'}{formatCurrency(t.monto)}
                      </span>
                      <button
                        onClick={() => deleteTransaccion(t.id)}
                        className="tw-opacity-0 group-hover:tw-opacity-100 tw-w-7 tw-h-7 tw-flex tw-items-center tw-justify-center tw-rounded-lg tw-text-gray-300 hover:tw-text-red-500 hover:tw-bg-red-50 dark:hover:tw-bg-red-500/10 tw-transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
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
