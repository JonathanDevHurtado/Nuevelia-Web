import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Bell, Check, CheckCheck, Trash2, Clock, AlertCircle, Info, X, Calendar } from 'lucide-react';

const TIPO_CONFIG = {
  tarea: {
    icon: <Clock size={16} />,
    bg: 'tw-bg-violet-50 dark:tw-bg-violet-500/10',
    text: 'tw-text-violet-600 dark:tw-text-violet-400',
    border: 'tw-border-violet-100 dark:tw-border-violet-500/20',
    dot: 'tw-bg-violet-500',
    label: 'Tarea',
  },
  evento: {
    icon: <Calendar size={16} />,
    bg: 'tw-bg-amber-50 dark:tw-bg-amber-500/10',
    text: 'tw-text-amber-600 dark:tw-text-amber-400',
    border: 'tw-border-amber-100 dark:tw-border-amber-500/20',
    dot: 'tw-bg-amber-500',
    label: 'Evento',
  },
  alerta: {
    icon: <AlertCircle size={16} />,
    bg: 'tw-bg-red-50 dark:tw-bg-red-500/10',
    text: 'tw-text-red-600 dark:tw-text-red-400',
    border: 'tw-border-red-100 dark:tw-border-red-500/20',
    dot: 'tw-bg-red-500',
    label: 'Alerta',
  },
  info: {
    icon: <Info size={16} />,
    bg: 'tw-bg-blue-50 dark:tw-bg-blue-500/10',
    text: 'tw-text-blue-600 dark:tw-text-blue-400',
    border: 'tw-border-blue-100 dark:tw-border-blue-500/20',
    dot: 'tw-bg-blue-500',
    label: 'Info',
  },
};

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return 'Hace un momento';
  if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} h`;
  return `Hace ${Math.floor(diff / 86400)} días`;
}

export default function Notificaciones() {
  const { notificaciones, deleteNotificacion, markNotifRead, markAllRead, clearAllNotificaciones } = useData();
  const [filter, setFilter] = useState('all'); // all | unread | read

  const noLeidas = notificaciones.filter(n => !n.leida).length;

  const filtered = notificaciones.filter(n => {
    if (filter === 'unread') return !n.leida;
    if (filter === 'read') return n.leida;
    return true;
  });

  return (
    <div className="page active tw-flex tw-flex-col">
      {/* Header */}
      <div className="tw-mb-6 tw-flex tw-items-center tw-justify-between tw-gap-4 tw-flex-wrap">
        <div className="tw-flex tw-items-center tw-gap-4">
          <div className="tw-relative">
            <div className="tw-w-12 tw-h-12 tw-rounded-2xl tw-bg-gradient-to-br tw-from-amber-400 tw-to-orange-500 tw-flex tw-items-center tw-justify-center tw-shadow-lg tw-shadow-amber-500/20">
              <Bell className="tw-text-white" size={24} />
            </div>
            {noLeidas > 0 && (
              <span className="tw-absolute -tw-top-1 -tw-right-1 tw-w-5 tw-h-5 tw-bg-red-500 tw-text-white tw-text-[10px] tw-font-bold tw-rounded-full tw-flex tw-items-center tw-justify-center tw-shadow-sm">
                {noLeidas > 9 ? '9+' : noLeidas}
              </span>
            )}
          </div>
          <div>
            <h1 className="tw-text-[24px] tw-font-bold tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-tracking-tight">Notificaciones</h1>
            <p className="tw-text-sm tw-text-gray-500 dark:tw-text-[#ccc] tw-mt-0.5">
              {noLeidas > 0 ? `${noLeidas} sin leer` : 'Todo al día'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="tw-flex tw-items-center tw-gap-2">
          {noLeidas > 0 && (
            <button
              onClick={markAllRead}
              className="tw-flex tw-items-center tw-gap-1.5 tw-px-3 tw-py-2 tw-rounded-xl tw-text-[12px] tw-font-semibold tw-text-green-600 dark:tw-text-green-400 tw-border tw-border-green-200 dark:tw-border-green-500/30 hover:tw-bg-green-50 dark:hover:tw-bg-green-500/10 tw-transition-colors"
            >
              <CheckCheck size={14} /> Marcar todo leído
            </button>
          )}
          {notificaciones.length > 0 && (
            <button
              onClick={clearAllNotificaciones}
              className="tw-flex tw-items-center tw-gap-1.5 tw-px-3 tw-py-2 tw-rounded-xl tw-text-[12px] tw-font-semibold tw-text-red-500 dark:tw-text-red-400 tw-border tw-border-red-200 dark:tw-border-red-500/30 hover:tw-bg-red-50 dark:hover:tw-bg-red-500/10 tw-transition-colors"
            >
              <Trash2 size={14} /> Limpiar todo
            </button>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="tw-grid tw-grid-cols-3 tw-gap-3 tw-mb-5">
        <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-p-4 tw-shadow-sm tw-flex tw-items-center tw-gap-3">
          <div className="tw-w-9 tw-h-9 tw-rounded-xl tw-bg-amber-50 dark:tw-bg-amber-500/10 tw-flex tw-items-center tw-justify-center tw-text-amber-500 tw-flex-shrink-0">
            <Bell size={16} />
          </div>
          <div>
            <p className="tw-text-[10px] tw-text-gray-400 tw-font-semibold tw-uppercase tw-tracking-wide">Total</p>
            <p className="tw-text-xl tw-font-bold tw-text-gray-900 dark:tw-text-white">{notificaciones.length}</p>
          </div>
        </div>
        <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-p-4 tw-shadow-sm tw-flex tw-items-center tw-gap-3">
          <div className="tw-w-9 tw-h-9 tw-rounded-xl tw-bg-red-50 dark:tw-bg-red-500/10 tw-flex tw-items-center tw-justify-center tw-text-red-500 tw-flex-shrink-0">
            <AlertCircle size={16} />
          </div>
          <div>
            <p className="tw-text-[10px] tw-text-gray-400 tw-font-semibold tw-uppercase tw-tracking-wide">Sin leer</p>
            <p className="tw-text-xl tw-font-bold tw-text-gray-900 dark:tw-text-white">{noLeidas}</p>
          </div>
        </div>
        <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-p-4 tw-shadow-sm tw-flex tw-items-center tw-gap-3">
          <div className="tw-w-9 tw-h-9 tw-rounded-xl tw-bg-green-50 dark:tw-bg-green-500/10 tw-flex tw-items-center tw-justify-center tw-text-green-500 tw-flex-shrink-0">
            <Check size={16} />
          </div>
          <div>
            <p className="tw-text-[10px] tw-text-gray-400 tw-font-semibold tw-uppercase tw-tracking-wide">Leídas</p>
            <p className="tw-text-xl tw-font-bold tw-text-gray-900 dark:tw-text-white">{notificaciones.length - noLeidas}</p>
          </div>
        </div>
      </div>

      {/* Filter pills */}
      <div className="tw-flex tw-gap-2 tw-mb-5">
        {[
          { id: 'all', label: 'Todas' },
          { id: 'unread', label: 'Sin leer' },
          { id: 'read', label: 'Leídas' },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`tw-px-3 tw-py-1 tw-rounded-full tw-text-[12px] tw-font-semibold tw-transition-all ${
              filter === f.id
                ? 'tw-bg-amber-500 tw-text-white tw-shadow-sm'
                : 'tw-bg-white dark:tw-bg-[#242422] tw-text-gray-500 dark:tw-text-gray-400 tw-border tw-border-gray-200 dark:tw-border-white/10 hover:tw-border-amber-300'
            }`}
          >
            {f.label}
            {f.id === 'unread' && noLeidas > 0 && (
              <span className="tw-ml-1.5 tw-bg-red-500 tw-text-white tw-text-[10px] tw-rounded-full tw-px-1.5">{noLeidas}</span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-shadow-sm tw-mb-4">
        {filtered.length === 0 ? (
          <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-py-20 tw-text-gray-400 dark:tw-text-[#555]">
            <div className="tw-w-20 tw-h-20 tw-rounded-full tw-bg-gray-50 dark:tw-bg-white/5 tw-flex tw-items-center tw-justify-center">
              <Bell size={32} className="tw-opacity-30" />
            </div>
            <div className="tw-text-center">
              <p className="tw-text-[15px] tw-font-semibold tw-text-gray-500 dark:tw-text-gray-400">Sin notificaciones</p>
              <p className="tw-text-xs tw-mt-1">Las alertas de tus tareas aparecerán aquí</p>
            </div>
          </div>
        ) : (
          <div className="tw-divide-y tw-divide-gray-50 dark:tw-divide-white/5">
            {filtered.map(notif => {
              const cfg = TIPO_CONFIG[notif.tipo] || TIPO_CONFIG.info;
              return (
                <div
                  key={notif.id}
                  className={`tw-group tw-flex tw-items-start tw-gap-4 tw-px-5 tw-py-4 tw-transition-all hover:tw-bg-gray-50 dark:hover:tw-bg-white/[0.02] ${
                    !notif.leida ? 'tw-bg-amber-50/40 dark:tw-bg-amber-500/5' : ''
                  }`}
                >
                  {/* Unread dot */}
                  <div className="tw-flex-shrink-0 tw-mt-1">
                    {!notif.leida
                      ? <div className={`tw-w-2.5 tw-h-2.5 tw-rounded-full ${cfg.dot} tw-mt-1`} />
                      : <div className="tw-w-2.5 tw-h-2.5 tw-rounded-full tw-bg-gray-200 dark:tw-bg-white/10 tw-mt-1" />
                    }
                  </div>

                  {/* Icon */}
                  <div className={`tw-flex-shrink-0 tw-w-9 tw-h-9 tw-rounded-xl ${cfg.bg} tw-flex tw-items-center tw-justify-center ${cfg.text}`}>
                    {cfg.icon}
                  </div>

                  {/* Content */}
                  <div className="tw-flex-1 tw-min-w-0">
                    <div className="tw-flex tw-items-start tw-justify-between tw-gap-2">
                      <div>
                        <p className={`tw-text-[12px] tw-font-bold tw-uppercase tw-tracking-wide tw-mb-0.5 ${cfg.text}`}>
                          {cfg.label} · {notif.hora && `${notif.hora} hs`}
                        </p>
                        <p className={`tw-text-[14px] tw-font-semibold tw-leading-snug ${
                          notif.leida ? 'tw-text-gray-500 dark:tw-text-gray-400' : 'tw-text-gray-900 dark:tw-text-[#f4f1ec]'
                        }`}>
                          {notif.titulo}
                        </p>
                        {notif.mensaje && (
                          <p className="tw-text-[12px] tw-text-gray-400 dark:tw-text-gray-500 tw-mt-1 tw-line-clamp-2">
                            {notif.mensaje}
                          </p>
                        )}
                        <p className="tw-text-[11px] tw-text-gray-400 dark:tw-text-gray-600 tw-mt-1.5">
                          {timeAgo(notif.createdAt)}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="tw-flex tw-items-center tw-gap-1 tw-flex-shrink-0">
                        {!notif.leida && (
                          <button
                            onClick={() => markNotifRead(notif.id)}
                            className="tw-w-7 tw-h-7 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-text-green-500 hover:tw-bg-green-50 dark:hover:tw-bg-green-500/10 tw-transition-colors"
                            title="Marcar como leído"
                          >
                            <Check size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotificacion(notif.id)}
                          className="tw-w-7 tw-h-7 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-text-gray-400 hover:tw-text-red-500 hover:tw-bg-red-50 dark:hover:tw-bg-red-500/10 tw-transition-colors"
                          title="Eliminar"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
