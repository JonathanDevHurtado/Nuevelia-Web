import React from 'react';
import { CalendarDays, Wallet, ShoppingCart, Bot, BarChart, Bell, Sparkles } from 'lucide-react';

export default function Servicios() {
  const servicios = [
    {
      icon: <CalendarDays size={24} strokeWidth={1.5} className="tw-text-blue-500" />,
      title: 'Gestión Inteligente del Día',
      color: 'tw-from-blue-500 tw-to-indigo-500',
      bgColor: 'tw-bg-blue-50 dark:tw-bg-blue-500/10',
      textColor: 'tw-text-blue-600 dark:tw-text-blue-400',
      features: [
        'Organización automática de agenda',
        'Creación y seguimiento de recordatorios',
        'Planificación diaria, semanal y mensual',
        'Priorización por urgencia e importancia'
      ]
    },
    {
      icon: <Wallet size={24} strokeWidth={1.5} className="tw-text-emerald-500" />,
      title: 'Control de Gastos y Finanzas',
      color: 'tw-from-emerald-400 tw-to-teal-500',
      bgColor: 'tw-bg-emerald-50 dark:tw-bg-emerald-500/10',
      textColor: 'tw-text-emerald-600 dark:tw-text-emerald-400',
      features: [
        'Registro de ingresos y gastos',
        'Clasificación automática por categoría',
        'Alertas de pagos próximos',
        'Resúmenes financieros semanales y mensuales',
        'Recomendaciones para optimizar el presupuesto'
      ]
    },
    {
      icon: <ShoppingCart size={24} strokeWidth={1.5} className="tw-text-orange-500" />,
      title: 'Asistente de Compras',
      color: 'tw-from-orange-400 tw-to-pink-500',
      bgColor: 'tw-bg-orange-50 dark:tw-bg-orange-500/10',
      textColor: 'tw-text-orange-600 dark:tw-text-orange-400',
      features: [
        'Listas de supermercado inteligentes',
        'Historial de compras frecuentes',
        'Organización por tienda (Walmart, Costco, OXXO, Bara...)',
        'Precio aproximado según la tienda seleccionada',
        'Recordatorios de artículos por agotarse',
        'Sugerencias basadas en hábitos de consumo'
      ]
    },
    {
      icon: <Bot size={24} strokeWidth={1.5} className="tw-text-purple-500" />,
      title: 'Adaptación Personalizada',
      color: 'tw-from-purple-500 tw-to-indigo-600',
      bgColor: 'tw-bg-purple-50 dark:tw-bg-purple-500/10',
      textColor: 'tw-text-purple-600 dark:tw-text-purple-400',
      features: [
        'Aprende tus rutinas y preferencias',
        'Ajusta horarios y recordatorios según tus hábitos',
        'Se adapta a tu forma de escribir',
        'Sugerencias de organización del día',
        'Te avisa de eventos próximos',
        'Actúa como tu asistente / manager personal'
      ]
    },
    {
      icon: <BarChart size={24} strokeWidth={1.5} className="tw-text-cyan-500" />,
      title: 'Seguimiento de Hábitos',
      color: 'tw-from-cyan-400 tw-to-blue-500',
      bgColor: 'tw-bg-cyan-50 dark:tw-bg-cyan-500/10',
      textColor: 'tw-text-cyan-600 dark:tw-text-cyan-400',
      features: [
        'Registro de metas personales',
        'Monitoreo de hábitos diarios',
        'Estadísticas de progreso semanal',
        'Motivación mediante logros y recordatorios positivos'
      ]
    },
    {
      icon: <Bell size={24} strokeWidth={1.5} className="tw-text-amber-500" />,
      title: 'Notificaciones Inteligentes',
      color: 'tw-from-amber-400 tw-to-orange-500',
      bgColor: 'tw-bg-amber-50 dark:tw-bg-amber-500/10',
      textColor: 'tw-text-amber-600 dark:tw-text-amber-400',
      features: [
        'Recordatorios oportunos y no invasivos',
        'Alertas de eventos importantes',
        'Avisos de pagos, compras y tareas pendientes',
        'Sincronización con calendario y dispositivos'
      ]
    }
  ];

  return (
    <div className="page active tw-flex tw-flex-col">
      {/* Header */}
      <div className="tw-mb-8 tw-flex tw-items-center tw-justify-between tw-gap-4 tw-flex-wrap">
        <div>
          <h1 className="tw-text-[28px] tw-font-extrabold tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-tracking-tight tw-flex tw-items-center tw-gap-3">
            <div className="tw-w-10 tw-h-10 tw-bg-[#8ba4e6] tw-text-white tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-shadow-sm">
              <Sparkles size={20} strokeWidth={2.5} />
            </div>
            Servicios Nuvelia
          </h1>
          <p className="tw-text-[15px] tw-text-gray-500 dark:tw-text-[#ccc] tw-mt-1.5 tw-font-medium">
            Descubre todo lo que Nuvelia puede hacer por ti
          </p>
        </div>
      </div>

      {/* Main Content - Dynamic Grid */}
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-3 tw-gap-6 tw-pb-8">
        
        {servicios.map((servicio, idx) => (
          <div 
            key={idx}
            className="tw-group tw-relative tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-2xl tw-p-6 tw-transition-all tw-duration-300 hover:tw-shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:tw-shadow-[0_8px_30px_rgba(255,255,255,0.03)] hover:-tw-translate-y-1 tw-flex tw-flex-col tw-h-full tw-overflow-hidden"
          >
            {/* Top gradient accent line that appears on hover */}
            <div className={`tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-h-1 tw-bg-gradient-to-r ${servicio.color} tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-300`}></div>
            
            {/* Header */}
            <div className="tw-flex tw-items-center tw-gap-4 tw-mb-5">
              <div className={`tw-w-12 tw-h-12 tw-rounded-xl ${servicio.bgColor} tw-flex tw-items-center tw-justify-center tw-text-2xl tw-shadow-sm tw-transition-transform tw-duration-300 group-hover:tw-scale-110`}>
                {servicio.icon}
              </div>
              <h3 className="tw-text-[16px] tw-font-bold tw-text-gray-800 dark:tw-text-[#f4f1ec] tw-leading-tight tw-flex-1">
                {servicio.title}
              </h3>
            </div>
            
            {/* Divider */}
            <div className="tw-h-[1px] tw-w-full tw-bg-gray-100 dark:tw-bg-white/5 tw-mb-5"></div>
            
            {/* Features List */}
            <ul className="tw-flex-1 tw-flex tw-flex-col tw-gap-3.5">
              {servicio.features.map((feature, fIdx) => (
                <li key={fIdx} className="tw-flex tw-items-start tw-gap-2.5">
                  <span className={`tw-mt-0.5 tw-font-bold ${servicio.textColor} tw-text-[14px] tw-transition-transform group-hover:tw-translate-x-1 tw-duration-300`}>
                    →
                  </span>
                  <span className="tw-text-[13px] tw-text-gray-600 dark:tw-text-[#aaa] tw-leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>
    </div>
  );
}
