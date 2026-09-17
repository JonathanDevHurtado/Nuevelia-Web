import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Calendar, Clock, Trash2, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const WEEKDAYS = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
const EVENT_COLORS = [
  { name: 'Azul',    bg: 'tw-bg-blue-500',   light: 'tw-bg-blue-50 dark:tw-bg-blue-500/10',   text: 'tw-text-blue-600 dark:tw-text-blue-400',   border: 'tw-border-blue-200 dark:tw-border-blue-500/30',   dot: '#3b82f6' },
  { name: 'Verde',   bg: 'tw-bg-green-500',  light: 'tw-bg-green-50 dark:tw-bg-green-500/10', text: 'tw-text-green-600 dark:tw-text-green-400', border: 'tw-border-green-200 dark:tw-border-green-500/30', dot: '#22c55e' },
  { name: 'Rojo',    bg: 'tw-bg-red-500',    light: 'tw-bg-red-50 dark:tw-bg-red-500/10',     text: 'tw-text-red-600 dark:tw-text-red-400',     border: 'tw-border-red-200 dark:tw-border-red-500/30',     dot: '#ef4444' },
  { name: 'Naranja', bg: 'tw-bg-orange-500', light: 'tw-bg-orange-50 dark:tw-bg-orange-500/10',text: 'tw-text-orange-600 dark:tw-text-orange-400',border: 'tw-border-orange-200 dark:tw-border-orange-500/30',dot: '#f97316' },
  { name: 'Morado',  bg: 'tw-bg-purple-500', light: 'tw-bg-purple-50 dark:tw-bg-purple-500/10',text: 'tw-text-purple-600 dark:tw-text-purple-400',border: 'tw-border-purple-200 dark:tw-border-purple-500/30',dot: '#a855f7' },
];

export default function Agenda({ setActiveModal }) {
  const { eventos, addEvento, deleteEvento } = useData();

  const today = new Date();
  const [curYear, setCurYear] = useState(today.getFullYear());
  const [curMonth, setCurMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split('T')[0]);

  const todayStr = today.toISOString().split('T')[0];

  // Calendar grid helpers
  const firstDay = new Date(curYear, curMonth, 1).getDay();
  const daysInMonth = new Date(curYear, curMonth + 1, 0).getDate();
  const prevDays = new Date(curYear, curMonth, 0).getDate();

  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevDays - i, cur: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, cur: true });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, cur: false });
  }

  const getDateStr = (day) => {
    const m = String(curMonth + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${curYear}-${m}-${d}`;
  };

  const getEventsForDate = (dateStr) => eventos.filter(e => e.fecha === dateStr);

  const selectedEvents = getEventsForDate(selectedDate);

  const upcomingEvents = [...eventos]
    .filter(e => e.fecha >= todayStr)
    .sort((a, b) => a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora))
    .slice(0, 5);

  const formatSelectedDate = () => {
    const [y, m, d] = selectedDate.split('-');
    const dateObj = new Date(Number(y), Number(m) - 1, Number(d));
    return dateObj.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getColorForEvent = (e) => {
    const idx = (e.id.charCodeAt(0) + e.id.charCodeAt(1)) % EVENT_COLORS.length;
    return EVENT_COLORS[e.color !== undefined ? e.color : idx] || EVENT_COLORS[0];
  };

  const prevMonth = () => {
    if (curMonth === 0) { setCurMonth(11); setCurYear(y => y - 1); }
    else setCurMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (curMonth === 11) { setCurMonth(0); setCurYear(y => y + 1); }
    else setCurMonth(m => m + 1);
  };

  return (
    <div className="page active tw-flex tw-flex-col">
      {/* Header */}
      <div className="tw-mb-6 tw-flex tw-items-center tw-justify-between tw-gap-4 tw-flex-wrap">
        <div className="tw-flex tw-items-center tw-gap-4">
          <div className="tw-w-12 tw-h-12 tw-rounded-2xl tw-bg-gradient-to-br tw-from-blue-400 tw-to-indigo-600 tw-flex tw-items-center tw-justify-center tw-shadow-lg tw-shadow-blue-500/20">
            <Calendar className="tw-text-white" size={24} />
          </div>
          <div>
            <h1 className="tw-text-[24px] tw-font-bold tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-tracking-tight">Agenda</h1>
            <p className="tw-text-sm tw-text-gray-500 dark:tw-text-[#ccc] tw-mt-0.5">Organiza tus eventos y horarios</p>
          </div>
        </div>
        <button
          onClick={() => setActiveModal && setActiveModal('evento')}
          className="tw-bg-gradient-to-r tw-from-blue-500 tw-to-indigo-600 hover:tw-from-blue-600 hover:tw-to-indigo-700 tw-text-white tw-rounded-xl tw-px-5 tw-py-2.5 tw-text-[13px] tw-font-bold tw-shadow-md hover:tw-shadow-lg hover:-tw-translate-y-0.5 tw-transition-all tw-duration-300 tw-flex tw-items-center tw-gap-2"
        >
          <Plus size={16} />
          Nuevo evento
        </button>
      </div>

      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-[1fr_340px] tw-gap-4">
        {/* Calendar */}
        <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-shadow-sm tw-overflow-hidden">
          {/* Month nav */}
          <div className="tw-flex tw-items-center tw-justify-between tw-px-5 tw-py-4 tw-border-b tw-border-gray-100 dark:tw-border-white/5">
            <button onClick={prevMonth} className="tw-w-8 tw-h-8 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-gray-500 dark:tw-text-gray-400 hover:tw-bg-gray-100 dark:hover:tw-bg-white/10 tw-transition-colors">
              <ChevronLeft size={18} />
            </button>
            <h2 className="tw-font-bold tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-text-[15px]">
              {MONTHS[curMonth]} {curYear}
            </h2>
            <button onClick={nextMonth} className="tw-w-8 tw-h-8 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-gray-500 dark:tw-text-gray-400 hover:tw-bg-gray-100 dark:hover:tw-bg-white/10 tw-transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="tw-grid tw-grid-cols-7 tw-border-b tw-border-gray-100 dark:tw-border-white/5">
            {WEEKDAYS.map(d => (
              <div key={d} className="tw-text-center tw-py-2 tw-text-[11px] tw-font-bold tw-text-gray-400 dark:tw-text-gray-500 tw-uppercase tw-tracking-wider">{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div className="tw-grid tw-grid-cols-7">
            {cells.map((cell, i) => {
              const dateStr = cell.cur ? getDateStr(cell.day) : null;
              const isToday = dateStr === todayStr;
              const isSelected = dateStr === selectedDate;
              const cellEvents = dateStr ? getEventsForDate(dateStr) : [];

              return (
                <div
                  key={i}
                  onClick={() => dateStr && setSelectedDate(dateStr)}
                  className={`tw-relative tw-min-h-[72px] tw-p-1.5 tw-border-b tw-border-r tw-border-gray-50 dark:tw-border-white/[0.03] tw-transition-colors ${
                    cell.cur ? 'tw-cursor-pointer hover:tw-bg-gray-50 dark:hover:tw-bg-white/5' : 'tw-opacity-30'
                  } ${isSelected && cell.cur ? 'tw-bg-blue-50 dark:tw-bg-blue-500/10' : ''}`}
                >
                  <span className={`tw-w-7 tw-h-7 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-text-[13px] tw-font-medium tw-mx-auto tw-mb-1 tw-transition-colors ${
                    isToday
                      ? 'tw-bg-blue-500 tw-text-white tw-font-bold'
                      : isSelected && cell.cur
                        ? 'tw-bg-blue-100 dark:tw-bg-blue-500/20 tw-text-blue-600 dark:tw-text-blue-400 tw-font-bold'
                        : 'tw-text-gray-700 dark:tw-text-gray-300'
                  }`}>
                    {cell.day}
                  </span>
                  <div className="tw-flex tw-flex-col tw-gap-0.5">
                    {cellEvents.slice(0, 2).map((ev, ei) => {
                      const col = getColorForEvent(ev);
                      return (
                        <div key={ei} className={`tw-text-[9px] tw-px-1 tw-py-0.5 tw-rounded tw-font-semibold tw-truncate ${col.text} ${col.light}`}>
                          {ev.titulo}
                        </div>
                      );
                    })}
                    {cellEvents.length > 2 && (
                      <span className="tw-text-[9px] tw-text-gray-400 tw-pl-1">+{cellEvents.length - 2} más</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right panel */}
        <div className="tw-flex tw-flex-col tw-gap-4">
          {/* Selected day events */}
          <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-shadow-sm tw-overflow-hidden tw-flex tw-flex-col">
            <div className="tw-px-4 tw-py-3 tw-border-b tw-border-gray-100 dark:tw-border-white/5">
              <p className="tw-text-[11px] tw-font-bold tw-text-gray-400 dark:tw-text-gray-500 tw-uppercase tw-tracking-wider tw-mb-0.5">Eventos del día</p>
              <h3 className="tw-text-[13px] tw-font-bold tw-text-gray-800 dark:tw-text-[#f4f1ec] tw-capitalize">{formatSelectedDate()}</h3>
            </div>
            <div className="tw-p-3 tw-flex tw-flex-col tw-gap-2 tw-min-h-[120px]">
              {selectedEvents.length === 0 ? (
                <div className="tw-flex-1 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-py-6 tw-text-gray-400 dark:tw-text-[#555]">
                  <Calendar size={28} className="tw-opacity-40" />
                  <p className="tw-text-xs">Sin eventos este día</p>
                  <button
                    onClick={() => setActiveModal && setActiveModal('evento')}
                    className="tw-text-xs tw-text-blue-500 hover:tw-text-blue-600 tw-font-semibold tw-transition-colors"
                  >
                    + Añadir evento
                  </button>
                </div>
              ) : (
                selectedEvents.map(ev => {
                  const col = getColorForEvent(ev);
                  return (
                    <div key={ev.id} className={`tw-flex tw-items-start tw-gap-3 tw-p-3 tw-rounded-xl tw-border ${col.light} ${col.border}`}>
                      <div className="tw-flex-1 tw-min-w-0">
                        <p className={`tw-text-[13px] tw-font-bold tw-truncate ${col.text}`}>{ev.titulo}</p>
                        {ev.hora && (
                          <p className="tw-text-[11px] tw-text-gray-500 dark:tw-text-gray-400 tw-flex tw-items-center tw-gap-1 tw-mt-0.5">
                            <Clock size={10} /> {ev.hora}
                          </p>
                        )}
                        {ev.descripcion && (
                          <p className="tw-text-[11px] tw-text-gray-500 dark:tw-text-gray-400 tw-mt-1 tw-line-clamp-2">{ev.descripcion}</p>
                        )}
                      </div>
                      <button
                        onClick={() => deleteEvento(ev.id)}
                        className="tw-text-gray-300 dark:tw-text-gray-600 hover:tw-text-red-500 tw-transition-colors tw-flex-shrink-0 tw-mt-0.5"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Upcoming events */}
          <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-shadow-sm tw-overflow-hidden">
            <div className="tw-px-4 tw-py-3 tw-border-b tw-border-gray-100 dark:tw-border-white/5">
              <p className="tw-text-[11px] tw-font-bold tw-text-gray-400 dark:tw-text-gray-500 tw-uppercase tw-tracking-wider">Próximos eventos</p>
            </div>
            <div className="tw-p-3 tw-flex tw-flex-col tw-gap-2 tw-min-h-[120px]">
              {upcomingEvents.length === 0 ? (
                <div className="tw-flex-1 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-py-6 tw-text-gray-400 dark:tw-text-[#555]">
                  <p className="tw-text-xs">No hay próximos eventos</p>
                </div>
              ) : (
                upcomingEvents.map(ev => {
                  const col = getColorForEvent(ev);
                  const [y, m, d] = ev.fecha.split('-');
                  const label = ev.fecha === todayStr ? 'Hoy' : `${d}/${m}`;
                  return (
                    <div
                      key={ev.id}
                      onClick={() => { setSelectedDate(ev.fecha); setCurMonth(Number(m) - 1); setCurYear(Number(y)); }}
                      className="tw-flex tw-items-center tw-gap-3 tw-p-2.5 tw-rounded-xl hover:tw-bg-gray-50 dark:hover:tw-bg-white/5 tw-cursor-pointer tw-transition-colors"
                    >
                      <div className="tw-w-10 tw-h-10 tw-rounded-xl tw-flex tw-flex-col tw-items-center tw-justify-center tw-flex-shrink-0" style={{ backgroundColor: col.dot + '20' }}>
                        <span className="tw-text-[10px] tw-font-bold" style={{ color: col.dot }}>{label}</span>
                      </div>
                      <div className="tw-flex-1 tw-min-w-0">
                        <p className="tw-text-[13px] tw-font-semibold tw-text-gray-800 dark:tw-text-[#f4f1ec] tw-truncate">{ev.titulo}</p>
                        {ev.hora && (
                          <p className="tw-text-[11px] tw-text-gray-400 tw-flex tw-items-center tw-gap-1">
                            <Clock size={9} /> {ev.hora}
                          </p>
                        )}
                      </div>
                      <div className="tw-w-2 tw-h-2 tw-rounded-full tw-flex-shrink-0" style={{ backgroundColor: col.dot }} />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
