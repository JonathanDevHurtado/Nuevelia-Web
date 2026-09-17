import React from 'react';
import { useData } from '../context/DataContext';
import { Trash2, Activity, Target, Flame, TrendingUp, Check } from 'lucide-react';

export default function Habitos({ setActiveModal }) {
  const { habitos, toggleHabitoDay, deleteHabito } = useData();
  const weekDays = ['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom'];
  const fullDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
  // Cálculos de estadísticas
  const totalHabitos = habitos.length;
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // 0=lun, 6=dom
  const todayKey = weekDays[todayIndex];
  
  const completadosHoy = habitos.filter(h => h.tracker[todayKey]).length;
  const progresoHoy = totalHabitos > 0 ? Math.round((completadosHoy / totalHabitos) * 100) : 0;

  return (
    <div className="page active tw-flex tw-flex-col">
      {/* Header */}
      <div className="tw-mb-8 tw-flex tw-items-center tw-justify-between tw-gap-4 tw-flex-wrap">
        <div className="tw-flex tw-items-center tw-gap-4">
          <div className="tw-w-12 tw-h-12 tw-rounded-2xl tw-bg-gradient-to-br tw-from-orange-400 tw-to-red-500 tw-flex tw-items-center tw-justify-center tw-shadow-lg tw-shadow-orange-500/20">
            <Activity className="tw-text-white" size={24} />
          </div>
          <div>
            <h1 className="tw-text-[24px] tw-font-bold tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-tracking-tight">
              Hábitos
            </h1>
            <p className="tw-text-sm tw-text-gray-500 dark:tw-text-[#ccc] tw-mt-0.5">
              Construye rutinas positivas día a día
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveModal && setActiveModal('habito')}
          className="tw-bg-gradient-to-r tw-from-[#8aa7ec] tw-to-[#7896dc] hover:tw-from-[#7896dc] hover:tw-to-[#6785cb] tw-text-white tw-rounded-xl tw-px-5 tw-py-2.5 tw-text-[13px] tw-font-bold tw-shadow-md hover:tw-shadow-lg hover:-tw-translate-y-0.5 tw-transition-all tw-duration-300"
        >
          + Nuevo hábito
        </button>
      </div>

      {/* Stats Row */}
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4 tw-mb-6">
        {/* Stat 1 */}
        <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-p-5 tw-shadow-sm tw-flex tw-items-center tw-gap-4 tw-transition-all hover:tw-shadow-md">
          <div className="tw-w-10 tw-h-10 tw-rounded-full tw-bg-blue-50 dark:tw-bg-blue-500/10 tw-flex tw-items-center tw-justify-center tw-text-blue-500">
            <Target size={20} />
          </div>
          <div>
            <p className="tw-text-xs tw-text-gray-500 dark:tw-text-[#888] tw-font-medium">Total Hábitos</p>
            <p className="tw-text-xl tw-font-bold tw-text-gray-900 dark:tw-text-white">{totalHabitos}</p>
          </div>
        </div>
        
        {/* Stat 2 */}
        <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-p-5 tw-shadow-sm tw-flex tw-items-center tw-gap-4 tw-transition-all hover:tw-shadow-md">
          <div className="tw-w-10 tw-h-10 tw-rounded-full tw-bg-orange-50 dark:tw-bg-orange-500/10 tw-flex tw-items-center tw-justify-center tw-text-orange-500">
            <Flame size={20} />
          </div>
          <div>
            <p className="tw-text-xs tw-text-gray-500 dark:tw-text-[#888] tw-font-medium">Completados Hoy</p>
            <p className="tw-text-xl tw-font-bold tw-text-gray-900 dark:tw-text-white">
              {completadosHoy} <span className="tw-text-sm tw-text-gray-400 tw-font-normal">/ {totalHabitos}</span>
            </p>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-p-5 tw-shadow-sm tw-flex tw-items-center tw-gap-4 tw-transition-all hover:tw-shadow-md">
          <div className="tw-w-10 tw-h-10 tw-rounded-full tw-bg-green-50 dark:tw-bg-green-500/10 tw-flex tw-items-center tw-justify-center tw-text-green-500">
            <TrendingUp size={20} />
          </div>
          <div className="tw-flex-1">
            <div className="tw-flex tw-justify-between tw-mb-1">
              <p className="tw-text-xs tw-text-gray-500 dark:tw-text-[#888] tw-font-medium">Progreso Diario</p>
              <span className="tw-text-xs tw-font-bold tw-text-green-500">{progresoHoy}%</span>
            </div>
            <div className="tw-w-full tw-bg-gray-100 dark:tw-bg-white/10 tw-rounded-full tw-h-1.5">
              <div className="tw-bg-green-500 tw-h-1.5 tw-rounded-full tw-transition-all tw-duration-500" style={{ width: `${progresoHoy}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-shadow-sm tw-p-6 tw-transition-colors tw-flex tw-flex-col tw-min-h-[400px] tw-relative tw-overflow-hidden">
        <div className="tw-absolute tw-top-0 tw-right-0 tw-w-64 tw-h-64 tw-bg-gradient-to-bl tw-from-orange-50 dark:tw-from-orange-500/5 tw-to-transparent tw-rounded-bl-full tw-opacity-60 tw-pointer-events-none"></div>

        <div className="tw-flex tw-items-center tw-justify-between tw-mb-6 tw-relative tw-z-10">
          <h3 className="tw-text-lg tw-font-bold tw-text-gray-800 dark:tw-text-[#f4f1ec]">Tracker semanal</h3>
          
          {/* Header de días solo visible en pantallas grandes */}
          <div className="tw-hidden md:tw-flex tw-gap-2 tw-text-[11px] tw-font-bold tw-text-gray-400 dark:tw-text-gray-500 tw-uppercase tw-tracking-wider">
            {weekDays.map((d, i) => (
              <span key={d} className={`tw-w-10 tw-text-center ${i === todayIndex ? 'tw-text-[#8aa7ec]' : ''}`}>
                {d}
              </span>
            ))}
            <span className="tw-w-8"></span> {/* Spacer for delete button */}
          </div>
        </div>
        
        <div className="tw-flex-1 tw-flex tw-flex-col tw-gap-3 tw-relative tw-z-10">
          {habitos.length === 0 ? (
            <div className="tw-flex-1 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-py-12 tw-text-gray-400 dark:tw-text-gray-500">
              <div className="tw-w-20 tw-h-20 tw-rounded-full tw-bg-gray-50 dark:tw-bg-white/5 tw-flex tw-items-center tw-justify-center tw-mb-2">
                <Target size={32} className="tw-opacity-50" />
              </div>
              <p className="tw-text-sm tw-font-medium">No tienes hábitos registrados</p>
              <button
                onClick={() => setActiveModal && setActiveModal('habito')}
                className="tw-text-[#8aa7ec] hover:tw-text-[#7896dc] tw-text-sm tw-font-semibold tw-transition-colors"
              >
                Comienza una nueva rutina
              </button>
            </div>
          ) : (
            habitos.map(habito => {
              const diasCompletados = weekDays.filter(d => habito.tracker[d]).length;
              const meta = habito.frecuencia || 7;
              const porcentajeSemana = Math.min(100, Math.round((diasCompletados / meta) * 100));
              
              return (
                <div key={habito.id} className="tw-group tw-flex tw-flex-col md:tw-flex-row md:tw-items-center tw-justify-between tw-gap-4 tw-p-4 tw-bg-white dark:tw-bg-[#2a2a28] tw-rounded-xl tw-border tw-border-gray-100 dark:tw-border-white/5 tw-shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:tw-shadow-md hover:-tw-translate-y-0.5 tw-transition-all tw-duration-300">
                  
                  {/* Info del hábito */}
                  <div className="tw-flex tw-items-center tw-gap-4 tw-flex-1">
                    <div className="tw-w-12 tw-h-12 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-text-2xl tw-bg-gray-50 dark:tw-bg-white/5 tw-shadow-inner" style={{ color: habito.color }}>
                      {habito.icono}
                    </div>
                    <div>
                      <span className="tw-text-[15px] tw-font-bold tw-text-gray-800 dark:tw-text-[#f4f1ec]">{habito.nombre}</span>
                      <div className="tw-flex tw-items-center tw-gap-2 tw-mt-1">
                        <div className="tw-w-24 tw-bg-gray-100 dark:tw-bg-white/10 tw-rounded-full tw-h-1.5">
                          <div className="tw-h-1.5 tw-rounded-full tw-transition-all tw-duration-500" style={{ width: `${porcentajeSemana}%`, backgroundColor: habito.color }}></div>
                        </div>
                        <span className="tw-text-[11px] tw-text-gray-400 tw-font-medium">{diasCompletados}/{meta} {meta === 7 ? 'días' : 'veces'}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tracker de botones */}
                  <div className="tw-flex tw-items-center tw-justify-between md:tw-justify-end tw-gap-2 tw-w-full md:tw-w-auto tw-mt-2 md:tw-mt-0">
                    <div className="tw-flex tw-gap-1.5 md:tw-gap-2">
                      {weekDays.map((day, i) => {
                        const isCompleted = habito.tracker[day];
                        const isToday = i === todayIndex;
                        const isFuture = i > todayIndex;
                        
                        return (
                          <button
                            key={day}
                            onClick={() => !isFuture && toggleHabitoDay(habito.id, day)}
                            disabled={isFuture}
                            style={{ 
                              backgroundColor: isCompleted ? habito.color : '',
                              borderColor: isCompleted ? habito.color : ''
                            }}
                            className={`tw-relative tw-w-9 tw-h-9 md:tw-w-10 md:tw-h-10 tw-rounded-xl tw-border-2 tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-300 tw-group/btn ${
                              isFuture
                                ? 'tw-bg-gray-50/50 dark:tw-bg-white/5 tw-border-gray-100 dark:tw-border-white/5 tw-opacity-50 tw-cursor-not-allowed'
                                : isCompleted 
                                  ? 'tw-text-white tw-scale-105 tw-shadow-sm' 
                                  : `tw-bg-transparent tw-border-gray-200 dark:tw-border-gray-600 hover:tw-border-gray-300 dark:hover:tw-border-gray-500 ${isToday ? 'tw-border-dashed' : ''}`
                            }`}
                            title={isFuture ? 'Aún no puedes marcar este día' : fullDays[i]}
                          >
                            {isCompleted ? (
                              <Check size={16} className="tw-animate-in tw-zoom-in" strokeWidth={3} />
                            ) : (
                              <span className={`tw-text-[10px] tw-font-bold ${isToday ? 'tw-text-[#8aa7ec]' : 'tw-text-gray-300 dark:tw-text-gray-600'} md:tw-hidden`}>
                                {day.charAt(0)}
                              </span>
                            )}
                            
                            {/* Hover tooltip for desktop */}
                            <span className="tw-absolute -tw-top-8 tw-bg-gray-800 tw-text-white tw-text-[10px] tw-px-2 tw-py-1 tw-rounded tw-opacity-0 group-hover/btn:tw-opacity-100 tw-transition-opacity tw-pointer-events-none tw-whitespace-nowrap tw-hidden md:tw-block tw-z-20">
                              {fullDays[i]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => deleteHabito(habito.id)}
                      className="tw-w-8 tw-h-8 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-gray-400 hover:tw-text-red-500 hover:tw-bg-red-50 dark:hover:tw-bg-red-500/10 tw-transition-all tw-opacity-0 group-hover:tw-opacity-100 tw-flex-shrink-0 tw-ml-2"
                      title="Eliminar hábito"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
