import React, { useState } from 'react';
import { Plus, Check, Trash2, CheckSquare, AlertCircle, Clock, BarChart2, Filter } from 'lucide-react';
import { useData } from '../context/DataContext';

const PRIORITY_CONFIG = {
  alta: {
    label: 'Alta prioridad',
    gradient: 'tw-from-red-500/10 tw-to-orange-500/5 dark:tw-from-red-500/10 dark:tw-to-red-500/5',
    headerBg: 'tw-bg-red-50 dark:tw-bg-red-500/10',
    border: 'tw-border-red-100 dark:tw-border-red-500/20',
    dot: 'tw-bg-red-500',
    badge: 'tw-bg-red-500',
    checkHover: 'hover:tw-border-red-400',
    textColor: 'tw-text-red-600 dark:tw-text-red-400',
    icon: <AlertCircle size={16} className="tw-text-red-500" />,
  },
  media: {
    label: 'Media prioridad',
    gradient: 'tw-from-blue-500/10 tw-to-indigo-500/5 dark:tw-from-blue-500/10 dark:tw-to-blue-500/5',
    headerBg: 'tw-bg-blue-50 dark:tw-bg-blue-500/10',
    border: 'tw-border-blue-100 dark:tw-border-blue-500/20',
    dot: 'tw-bg-blue-500',
    badge: 'tw-bg-blue-500',
    checkHover: 'hover:tw-border-blue-400',
    textColor: 'tw-text-blue-600 dark:tw-text-blue-400',
    icon: <Clock size={16} className="tw-text-blue-500" />,
  },
  baja: {
    label: 'Baja prioridad',
    gradient: 'tw-from-green-500/10 tw-to-teal-500/5 dark:tw-from-green-500/10 dark:tw-to-green-500/5',
    headerBg: 'tw-bg-green-50 dark:tw-bg-green-500/10',
    border: 'tw-border-green-100 dark:tw-border-green-500/20',
    dot: 'tw-bg-green-500',
    badge: 'tw-bg-green-500',
    checkHover: 'hover:tw-border-green-400',
    textColor: 'tw-text-green-600 dark:tw-text-green-400',
    icon: <BarChart2 size={16} className="tw-text-green-500" />,
  },
};

export default function Tareas({ setActiveModal }) {
  const { tareas, toggleTarea, deleteTarea } = useData();
  const [filter, setFilter] = useState('all'); // all | pending | done

  const totalTareas = tareas.length;
  const completadas = tareas.filter(t => t.completada).length;
  const pendientes = totalTareas - completadas;
  const progreso = totalTareas === 0 ? 0 : Math.round((completadas / totalTareas) * 100);

  const filteredTareas = tareas.filter(t => {
    if (filter === 'pending') return !t.completada;
    if (filter === 'done') return t.completada;
    return true;
  });

  const isOverdue = (fechaLimite) => {
    if (!fechaLimite) return false;
    return new Date(fechaLimite) < new Date(new Date().toDateString());
  };

  return (
    <div className="page active tw-flex tw-flex-col">
      {/* Header */}
      <div className="tw-mb-6 tw-flex tw-items-center tw-justify-between tw-gap-4 tw-flex-wrap">
        <div className="tw-flex tw-items-center tw-gap-4">
          <div className="tw-w-12 tw-h-12 tw-rounded-2xl tw-bg-gradient-to-br tw-from-violet-500 tw-to-indigo-600 tw-flex tw-items-center tw-justify-center tw-shadow-lg tw-shadow-violet-500/20">
            <CheckSquare className="tw-text-white" size={24} />
          </div>
          <div>
            <h1 className="tw-text-[24px] tw-font-bold tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-tracking-tight">Tareas</h1>
            <p className="tw-text-sm tw-text-gray-500 dark:tw-text-[#ccc] tw-mt-0.5">Gestiona tus pendientes por prioridad</p>
          </div>
        </div>
        <button
          onClick={() => setActiveModal && setActiveModal('tarea')}
          className="tw-bg-gradient-to-r tw-from-violet-500 tw-to-indigo-600 hover:tw-from-violet-600 hover:tw-to-indigo-700 tw-text-white tw-rounded-xl tw-px-5 tw-py-2.5 tw-text-[13px] tw-font-bold tw-shadow-md hover:tw-shadow-lg hover:-tw-translate-y-0.5 tw-transition-all tw-duration-300 tw-flex tw-items-center tw-gap-2"
        >
          <Plus size={16} />
          Nueva tarea
        </button>
      </div>

      {/* Stats Row */}
      <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-3 tw-mb-6">
        <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-p-4 tw-shadow-sm tw-flex tw-items-center tw-gap-3">
          <div className="tw-w-9 tw-h-9 tw-rounded-xl tw-bg-violet-50 dark:tw-bg-violet-500/10 tw-flex tw-items-center tw-justify-center tw-text-violet-500 tw-flex-shrink-0">
            <CheckSquare size={18} />
          </div>
          <div>
            <p className="tw-text-[10px] tw-text-gray-400 dark:tw-text-gray-500 tw-font-semibold tw-uppercase tw-tracking-wide">Total</p>
            <p className="tw-text-xl tw-font-bold tw-text-gray-900 dark:tw-text-white">{totalTareas}</p>
          </div>
        </div>
        <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-p-4 tw-shadow-sm tw-flex tw-items-center tw-gap-3">
          <div className="tw-w-9 tw-h-9 tw-rounded-xl tw-bg-orange-50 dark:tw-bg-orange-500/10 tw-flex tw-items-center tw-justify-center tw-text-orange-500 tw-flex-shrink-0">
            <Clock size={18} />
          </div>
          <div>
            <p className="tw-text-[10px] tw-text-gray-400 dark:tw-text-gray-500 tw-font-semibold tw-uppercase tw-tracking-wide">Pendientes</p>
            <p className="tw-text-xl tw-font-bold tw-text-gray-900 dark:tw-text-white">{pendientes}</p>
          </div>
        </div>
        <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-p-4 tw-shadow-sm tw-flex tw-items-center tw-gap-3">
          <div className="tw-w-9 tw-h-9 tw-rounded-xl tw-bg-green-50 dark:tw-bg-green-500/10 tw-flex tw-items-center tw-justify-center tw-text-green-500 tw-flex-shrink-0">
            <Check size={18} />
          </div>
          <div>
            <p className="tw-text-[10px] tw-text-gray-400 dark:tw-text-gray-500 tw-font-semibold tw-uppercase tw-tracking-wide">Completadas</p>
            <p className="tw-text-xl tw-font-bold tw-text-gray-900 dark:tw-text-white">{completadas}</p>
          </div>
        </div>
        <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-p-4 tw-shadow-sm tw-flex tw-items-center tw-gap-3 tw-flex-1">
          <div className="tw-flex-1">
            <div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
              <p className="tw-text-[10px] tw-text-gray-400 dark:tw-text-gray-500 tw-font-semibold tw-uppercase tw-tracking-wide">Progreso</p>
              <span className="tw-text-xs tw-font-bold tw-text-violet-500">{progreso}%</span>
            </div>
            <div className="tw-w-full tw-bg-gray-100 dark:tw-bg-white/10 tw-rounded-full tw-h-2">
              <div
                className="tw-bg-gradient-to-r tw-from-violet-500 tw-to-indigo-500 tw-h-2 tw-rounded-full tw-transition-all tw-duration-700"
                style={{ width: `${progreso}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter pills */}
      <div className="tw-flex tw-items-center tw-gap-2 tw-mb-5">
        <Filter size={14} className="tw-text-gray-400" />
        {[
          { id: 'all', label: 'Todas' },
          { id: 'pending', label: 'Pendientes' },
          { id: 'done', label: 'Completadas' },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`tw-px-3 tw-py-1 tw-rounded-full tw-text-[12px] tw-font-semibold tw-transition-all tw-duration-200 ${
              filter === f.id
                ? 'tw-bg-violet-500 tw-text-white tw-shadow-sm tw-shadow-violet-500/30'
                : 'tw-bg-white dark:tw-bg-[#242422] tw-text-gray-500 dark:tw-text-gray-400 tw-border tw-border-gray-200 dark:tw-border-white/10 hover:tw-border-violet-300 dark:hover:tw-border-violet-500/40'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Three Priority Columns */}
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
        {Object.entries(PRIORITY_CONFIG).map(([priorityId, cfg]) => {
          const colTareas = filteredTareas.filter(t => t.prioridad === priorityId);
          const colTotal = tareas.filter(t => t.prioridad === priorityId).length;
          const colDone = tareas.filter(t => t.prioridad === priorityId && t.completada).length;

          return (
            <div
              key={priorityId}
              className={`tw-bg-white dark:tw-bg-[#242422] tw-border ${cfg.border} tw-rounded-2xl tw-shadow-sm tw-flex tw-flex-col tw-overflow-hidden tw-transition-all hover:tw-shadow-md`}
            >
              {/* Column Header */}
              <div className={`${cfg.headerBg} tw-px-4 tw-py-3.5 tw-flex tw-items-center tw-justify-between tw-border-b ${cfg.border}`}>
                <div className="tw-flex tw-items-center tw-gap-2">
                  {cfg.icon}
                  <span className={`tw-text-[13px] tw-font-bold ${cfg.textColor}`}>{cfg.label}</span>
                </div>
                <span className={`tw-text-[11px] tw-font-bold tw-text-white ${cfg.badge} tw-rounded-full tw-min-w-[20px] tw-h-5 tw-px-1.5 tw-flex tw-items-center tw-justify-center`}>
                  {colTotal}
                </span>
              </div>

              {/* Mini progress bar */}
              {colTotal > 0 && (
                <div className="tw-h-1 tw-bg-gray-100 dark:tw-bg-white/5">
                  <div
                    className={`tw-h-1 ${cfg.dot} tw-transition-all tw-duration-500`}
                    style={{ width: `${Math.round((colDone / colTotal) * 100)}%` }}
                  />
                </div>
              )}

              {/* Tasks List */}
              <div className="tw-flex-1 tw-p-3 tw-flex tw-flex-col tw-gap-2 tw-min-h-[180px]">
                {colTareas.length === 0 ? (
                  <div className="tw-flex-1 tw-flex tw-flex-col tw-items-center tw-justify-center tw-py-10 tw-text-gray-400 dark:tw-text-[#555] tw-gap-2">
                    <div className={`tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-items-center tw-justify-center ${cfg.headerBg}`}>
                      {cfg.icon}
                    </div>
                    <p className="tw-text-[12px] tw-font-medium">Sin tareas aquí</p>
                    <button
                      onClick={() => setActiveModal && setActiveModal('tarea')}
                      className={`tw-text-[11px] tw-font-semibold ${cfg.textColor} tw-transition-colors`}
                    >
                      + Añadir tarea
                    </button>
                  </div>
                ) : (
                  colTareas.map(tarea => {
                    const overdue = isOverdue(tarea.fechaLimite) && !tarea.completada;
                    return (
                      <div
                        key={tarea.id}
                        className={`tw-group tw-flex tw-items-start tw-justify-between tw-gap-3 tw-p-3 tw-rounded-xl tw-border tw-transition-all tw-duration-200 ${
                          tarea.completada
                            ? 'tw-bg-gray-50 dark:tw-bg-white/[0.03] tw-border-gray-100 dark:tw-border-white/5 tw-opacity-60'
                            : overdue
                              ? 'tw-bg-red-50 dark:tw-bg-red-500/5 tw-border-red-100 dark:tw-border-red-500/20 hover:tw-shadow-sm'
                              : 'tw-bg-white dark:tw-bg-[#2a2a28] tw-border-gray-100 dark:tw-border-white/5 hover:tw-shadow-sm hover:-tw-translate-y-0.5'
                        }`}
                      >
                        <div className="tw-flex tw-items-start tw-gap-3 tw-flex-1 tw-min-w-0">
                          <button
                            onClick={() => toggleTarea(tarea.id)}
                            className={`tw-mt-0.5 tw-w-5 tw-h-5 tw-rounded-md tw-border-2 tw-flex tw-items-center tw-justify-center tw-transition-all tw-flex-shrink-0 ${
                              tarea.completada
                                ? 'tw-bg-green-500 tw-border-green-500 tw-text-white'
                                : `tw-border-gray-300 dark:tw-border-gray-600 ${cfg.checkHover}`
                            }`}
                          >
                            {tarea.completada && <Check size={11} strokeWidth={3} />}
                          </button>
                          <div className="tw-flex-1 tw-min-w-0">
                            <p className={`tw-text-[13px] tw-font-medium tw-leading-snug ${
                              tarea.completada
                                ? 'tw-line-through tw-text-gray-400 dark:tw-text-gray-600'
                                : 'tw-text-gray-800 dark:tw-text-[#f4f1ec]'
                            }`}>
                              {tarea.texto}
                            </p>
                            {tarea.descripcion && (
                              <p className="tw-text-[11px] tw-text-gray-400 dark:tw-text-gray-500 tw-mt-0.5 tw-line-clamp-2 tw-leading-relaxed">
                                {tarea.descripcion}
                              </p>
                            )}
                            <div className="tw-flex tw-items-center tw-gap-2 tw-mt-1 tw-flex-wrap">
                              {tarea.fechaLimite && (
                                <p className={`tw-text-[11px] tw-flex tw-items-center tw-gap-1 tw-font-medium ${
                                  overdue ? 'tw-text-red-500' : 'tw-text-gray-400 dark:tw-text-gray-500'
                                }`}>
                                  <Clock size={9} />
                                  {overdue ? '⚠ Vencida: ' : ''}{tarea.fechaLimite}
                                </p>
                              )}
                              {tarea.hora && (
                                <p className="tw-text-[11px] tw-text-gray-400 dark:tw-text-gray-500 tw-flex tw-items-center tw-gap-1 tw-font-medium">
                                  🕐 {tarea.hora}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteTarea(tarea.id)}
                          className="tw-text-gray-300 dark:tw-text-gray-600 hover:tw-text-red-500 tw-transition-colors tw-flex-shrink-0 tw-opacity-0 group-hover:tw-opacity-100 tw-mt-0.5"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
