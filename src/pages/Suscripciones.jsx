import React, { useState } from 'react';
import { Gem, Leaf, Zap, Rocket, Building2, BarChart2, CreditCard, X, ShieldCheck, Smartphone, Store } from 'lucide-react';

export default function Suscripciones() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [currency, setCurrency] = useState('MXN');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const exchangeRates = {
    MXN: { symbol: '$', rate: 1, name: 'MXN' },
    USD: { symbol: '$', rate: 0.055, name: 'USD' },
    COP: { symbol: '$', rate: 220, name: 'COP' },
    EUR: { symbol: '€', rate: 0.051, name: 'EUR' }
  };

  const formatPrice = (basePrice) => {
    if (basePrice === 0) return 'Gratis';
    const converted = Math.round(basePrice * exchangeRates[currency].rate);
    return `${exchangeRates[currency].symbol}${converted.toLocaleString()}`;
  };

  const handleSelectPlan = (plan) => {
    if (plan.id === 'basico') {
      alert('¡Ya estás en el plan básico!');
      return;
    }
    setSelectedPlan(plan);
    setPaymentMethod('card');
    setTermsAccepted(false);
    setIsPaymentModalOpen(true);
  };

  const CheckIcon = () => (
    <div className="tw-min-w-[16px] tw-h-4 tw-rounded-full tw-bg-emerald-100 dark:tw-bg-emerald-500/20 tw-flex tw-items-center tw-justify-center tw-mr-2.5 tw-mt-0.5">
      <span className="tw-text-emerald-600 dark:tw-text-emerald-400 tw-text-[10px] tw-font-bold">✓</span>
    </div>
  );
  const CrossIcon = () => (
    <div className="tw-min-w-[16px] tw-h-4 tw-rounded-full tw-bg-gray-100 dark:tw-bg-gray-800 tw-flex tw-items-center tw-justify-center tw-mr-2.5 tw-mt-0.5">
      <span className="tw-text-gray-400 dark:tw-text-gray-500 tw-text-[9px] tw-font-bold">✕</span>
    </div>
  );

  const plans = [
    {
      id: 'basico',
      name: 'Personal Básico',
      icon: <Leaf className="tw-text-emerald-500" size={32} strokeWidth={1.5} />,
      basePrice: { monthly: 0, annual: 0 },
      period: 'Para siempre',
      color: 'tw-text-gray-800 dark:tw-text-[#f4f1ec]',
      border: 'tw-border-gray-200 dark:tw-border-white/10',
      buttonText: 'Plan actual',
      buttonClass: 'tw-bg-white dark:tw-bg-transparent tw-border tw-border-gray-200 dark:tw-border-white/10 tw-text-gray-500 tw-cursor-default',
      features: [
        { name: 'Agenda inteligente', included: true },
        { name: '50 recordatorios activos', included: true },
        { name: 'Planificación diaria', included: true },
        { name: '100 transacciones/mes', included: true },
        { name: 'Lista de compras (20 tiendas)', included: true },
        { name: '20 hábitos', included: true },
        { name: 'Asistente IA básico', included: true },
        { name: 'Planificación semanal/mensual', included: false },
        { name: 'Alertas de pagos', included: false },
        { name: 'Predicción de gastos', included: false },
      ]
    },
    {
      id: 'principiante',
      name: 'Personal Principiante',
      icon: <Zap className="tw-text-[#6b8cdd]" size={32} strokeWidth={1.5} />,
      badge: 'MÁS POPULAR',
      basePrice: { monthly: 199, annual: 1999 },
      period: isAnnual ? '/año' : '/mes',
      color: 'tw-text-[#6b8cdd]',
      border: 'tw-border-[#6b8cdd] tw-shadow-[0_0_15px_rgba(107,140,221,0.15)]',
      buttonText: 'Elegir plan',
      buttonClass: 'tw-bg-[#6b8cdd] hover:tw-bg-[#5a7bc2] tw-text-white tw-transition-colors',
      features: [
        { name: 'Todo lo de Básico', included: true },
        { name: 'Recordatorios ilimitados', included: true },
        { name: 'Planificación semanal y mensual', included: true },
        { name: 'Transacciones ilimitadas', included: true },
        { name: 'Tiendas ilimitadas', included: true },
        { name: 'Alertas de pagos', included: true },
        { name: '5 dispositivos', included: true },
        { name: 'Asistente IA completo', included: true },
        { name: 'Predicción de gastos IA', included: false },
        { name: 'Reorganización automática', included: false },
      ]
    },
    {
      id: 'avanzado',
      name: 'Personal Avanzado',
      icon: <Rocket className="tw-text-[#9795cd]" size={32} strokeWidth={1.5} />,
      basePrice: { monthly: 349, annual: 3499 },
      period: isAnnual ? '/año' : '/mes',
      color: 'tw-text-[#9795cd]',
      border: 'tw-border-[#9795cd]',
      buttonText: 'Elegir plan',
      buttonClass: 'tw-bg-[#9795cd] hover:tw-bg-[#8684bd] tw-text-white tw-transition-colors',
      features: [
        { name: 'Todo lo de Principiante', included: true },
        { name: 'IA Avanzada en todo', included: true },
        { name: 'Reorganización automática', included: true },
        { name: 'Predicción de gastos', included: true },
        { name: 'Comparación de precios', included: true },
        { name: 'Estimación predictiva de precios', included: true },
        { name: 'Dispositivos ilimitados', included: true },
        { name: 'Soporte prioritario', included: true },
        { name: 'Calendarios compartidos', included: false },
      ]
    },
    {
      id: 'ejecutivo',
      name: 'Empresa Ejecutivo',
      icon: <Building2 className="tw-text-[#6d9e9a]" size={32} strokeWidth={1.5} />,
      badge: 'EMPRESARIAL',
      badgeClass: 'tw-bg-[#6d9e9a]',
      basePrice: { monthly: 799, annual: 7999 },
      period: isAnnual ? '/año' : '/mes',
      color: 'tw-text-[#6d9e9a]',
      border: 'tw-border-[#6d9e9a]',
      buttonText: 'Elegir plan',
      buttonClass: 'tw-bg-[#6d9e9a] hover:tw-bg-[#5c8d89] tw-text-white tw-transition-colors',
      features: [
        { name: 'Todo lo de Avanzado', included: true },
        { name: 'IA Empresarial', included: true },
        { name: 'Calendarios compartidos', included: true },
        { name: 'Gestión de equipos', included: true },
        { name: 'Lista de compras compartida', included: true },
        { name: 'Panel ejecutivo financiero', included: true },
        { name: 'Hábitos de equipos', included: true },
        { name: 'Soporte 24/7 dedicado', included: true },
      ]
    }
  ];

  return (
    <div className="page active tw-flex tw-flex-col tw-h-full tw-overflow-y-auto tw-pb-10">
      {/* Header */}
      <div className="tw-mb-8">
        <h1 className="tw-text-[22px] tw-font-bold tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-flex tw-items-center tw-gap-3">
          <div className="tw-w-10 tw-h-10 tw-bg-[#6b8cdd] tw-text-white tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-shadow-sm">
            <Gem size={20} strokeWidth={2.5} />
          </div>
          Planes y Suscripciones
        </h1>
        <p className="tw-text-sm tw-text-gray-500 dark:tw-text-[#ccc] tw-mt-1">
          Elige el plan que mejor se adapte a ti
        </p>
      </div>

      {/* Toggle and Currency */}
      <div className="tw-flex tw-flex-col sm:tw-flex-row tw-justify-center tw-items-center tw-gap-6 tw-mb-6 md:tw-mb-10">
        <div className="tw-flex tw-items-center tw-gap-3">
          <span className={`tw-text-sm tw-font-medium ${!isAnnual ? 'tw-text-[#6b8cdd]' : 'tw-text-gray-500 dark:tw-text-gray-400'}`}>Mensual</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className={`tw-relative tw-w-11 tw-h-6 tw-rounded-full tw-transition-colors tw-duration-300 ${isAnnual ? 'tw-bg-[#6b8cdd]' : 'tw-bg-gray-200 dark:tw-bg-white/10'}`}
          >
            <div className={`tw-absolute tw-top-1 tw-left-1 tw-bg-white tw-w-4 tw-h-4 tw-rounded-full tw-transition-transform tw-duration-300 ${isAnnual ? 'tw-translate-x-5' : 'tw-translate-x-0'}`}></div>
          </button>
          <span className={`tw-text-sm tw-font-medium tw-flex tw-items-center tw-gap-2 ${isAnnual ? 'tw-text-[#6b8cdd]' : 'tw-text-gray-500 dark:tw-text-gray-400'}`}>
            Anual
            <span className="tw-bg-[#e8f0fe] dark:tw-bg-[#6b8cdd]/20 tw-text-[#6b8cdd] tw-text-[10px] tw-px-2 tw-py-0.5 tw-rounded-full tw-font-bold">Ahorra ~15%</span>
          </span>
        </div>

        {/* Currency Selector */}
        <div className="tw-flex tw-items-center tw-gap-2 tw-bg-gray-100 dark:tw-bg-[#1a1a18] tw-p-1 tw-rounded-lg">
          {Object.keys(exchangeRates).map((curr) => (
            <button
              key={curr}
              onClick={() => setCurrency(curr)}
              className={`tw-px-3 tw-py-1 tw-text-[11px] tw-font-bold tw-rounded-md tw-transition-all ${currency === curr ? 'tw-bg-white dark:tw-bg-[#242422] tw-text-gray-900 dark:tw-text-white tw-shadow-sm' : 'tw-text-gray-500 dark:tw-text-gray-400 hover:tw-text-gray-700 dark:hover:tw-text-gray-300'}`}
            >
              {curr}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Cards Desktop (Premium SaaS Design) */}
      <div className="tw-hidden md:tw-flex md:tw-flex-row tw-flex-wrap lg:tw-flex-nowrap tw-gap-6 lg:tw-gap-5 tw-mb-16 tw-items-stretch lg:tw-items-center tw-justify-center tw-px-2">
        {plans.map((plan) => {
          const isPopular = plan.id === 'principiante';
          return (
            <div 
              key={plan.id} 
              className={`tw-relative tw-w-full md:tw-w-[calc(50%-12px)] lg:tw-w-1/4 tw-bg-white dark:tw-bg-[#1e1e1d] tw-rounded-3xl tw-flex tw-flex-col tw-transition-all tw-duration-300 hover:-tw-translate-y-2 ${
                isPopular 
                  ? 'tw-shadow-[0_20px_40px_-15px_rgba(107,140,221,0.3)] tw-border-2 tw-border-[#6b8cdd] lg:tw-scale-105 tw-z-10 tw-p-8' 
                  : 'tw-shadow-xl tw-border tw-border-gray-100 dark:tw-border-white/5 hover:tw-shadow-2xl tw-p-7'
              }`}
            >
              {plan.badge && (
                <div className="tw-absolute -tw-top-4 tw-left-1/2 -tw-translate-x-1/2 tw-w-full tw-flex tw-justify-center">
                  <span className={`tw-text-[11px] tw-font-black tw-text-white tw-uppercase tw-tracking-widest tw-px-5 tw-py-1.5 tw-rounded-full tw-shadow-lg ${plan.badgeClass || 'tw-bg-gradient-to-r tw-from-[#6b8cdd] tw-to-[#8ba4e6]'}`}>
                    {plan.badge}
                  </span>
                </div>
              )}
              
              <div className="tw-text-center tw-mb-8 tw-mt-2">
                <div className="tw-flex tw-justify-center tw-mb-4">{plan.icon}</div>
                <h3 className="tw-text-[17px] tw-font-bold tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-mb-4">{plan.name}</h3>
                <div className="tw-flex tw-items-center tw-justify-center tw-gap-1">
                  <span className={`tw-text-4xl tw-font-extrabold tw-tracking-tight ${plan.id === 'basico' ? 'tw-text-gray-800 dark:tw-text-[#f4f1ec]' : plan.color}`}>
                    {formatPrice(isAnnual ? plan.basePrice.annual : plan.basePrice.monthly)}
                  </span>
                  {plan.id !== 'basico' && (
                    <span className="tw-text-gray-400 tw-text-sm tw-font-medium tw-self-end tw-mb-1">{plan.period}</span>
                  )}
                </div>
                <p className="tw-text-[12px] tw-font-medium tw-text-gray-400 tw-mt-2 h-4">
                  {plan.id !== 'basico' ? (isAnnual ? `o ${formatPrice(plan.basePrice.monthly)}/mes` : `o ${formatPrice(plan.basePrice.annual)}/año`) : plan.period}
                </p>
              </div>

              <div className="tw-flex-1 tw-flex tw-flex-col">
                <ul className="tw-flex-1 tw-flex tw-flex-col tw-gap-4 tw-mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={`tw-flex tw-items-start tw-text-[13px] ${feature.included ? 'tw-text-gray-700 dark:tw-text-[#e0e0e0] tw-font-medium' : 'tw-text-gray-400 dark:tw-text-[#666]'}`}>
                      {feature.included ? <CheckIcon /> : <CrossIcon />}
                      <span className="tw-leading-tight">{feature.name}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => handleSelectPlan(plan)}
                  className={`tw-w-full tw-py-3.5 tw-rounded-xl tw-text-[14px] tw-font-bold tw-shadow-sm hover:tw-shadow-md active:tw-scale-95 tw-mt-auto tw-transition-all ${plan.buttonClass}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pricing Cards Mobile (Diseño exclusivo tipo Carousel para celular) */}
      <div className="md:tw-hidden tw-flex tw-overflow-x-auto tw-snap-x tw-snap-mandatory tw-gap-4 tw-pb-6 tw-pt-2 tw-px-4 tw-mb-2 [&::-webkit-scrollbar]:tw-hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {plans.map((plan) => (
          <div key={`${plan.id}-mobile`} className={`tw-snap-center tw-shrink-0 tw-w-[85vw] tw-relative tw-bg-white dark:tw-bg-[#242422] tw-border-2 tw-rounded-2xl tw-p-5 tw-flex tw-flex-col tw-shadow-md ${plan.border}`}>
            {plan.badge && (
              <div className="tw-absolute -tw-top-3 tw-left-1/2 -tw-translate-x-1/2 tw-w-full tw-flex tw-justify-center tw-z-10">
                <span className={`tw-text-[10px] tw-font-bold tw-text-white tw-uppercase tw-tracking-widest tw-px-3 tw-py-1 tw-rounded-full tw-shadow-md ${plan.badgeClass || 'tw-bg-[#6b8cdd]'}`}>
                  {plan.badge}
                </span>
              </div>
            )}
            
            <div className="tw-text-center tw-mb-5 tw-mt-2">
              <div className="tw-flex tw-justify-center tw-mb-3">{plan.icon}</div>
              <h3 className="tw-text-[16px] tw-font-bold tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-mb-2">{plan.name}</h3>
              <div className="tw-flex tw-items-center tw-justify-center tw-gap-1">
                <span className={`tw-text-3xl tw-font-extrabold ${plan.id === 'basico' ? 'tw-text-gray-800 dark:tw-text-[#f4f1ec]' : plan.color}`}>
                  {formatPrice(isAnnual ? plan.basePrice.annual : plan.basePrice.monthly)}
                </span>
                {plan.id !== 'basico' && (
                  <span className="tw-text-gray-400 tw-text-sm tw-font-medium">{plan.period}</span>
                )}
              </div>
              <p className="tw-text-[11px] tw-font-medium tw-text-gray-400 tw-mt-1 h-4">
                {plan.id !== 'basico' ? (isAnnual ? `o ${formatPrice(plan.basePrice.monthly)}/mes` : `o ${formatPrice(plan.basePrice.annual)}/año`) : plan.period}
              </p>
            </div>

            <div className="tw-flex-1 tw-flex tw-flex-col">
              <div className="tw-bg-gray-50/80 dark:tw-bg-[#1a1a18]/80 tw-rounded-xl tw-p-4 tw-mb-5 tw-flex-1">
                <ul className="tw-flex tw-flex-col tw-gap-3.5">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={`tw-flex tw-items-start tw-text-[12px] ${feature.included ? 'tw-text-gray-700 dark:tw-text-[#e0e0e0] tw-font-medium' : 'tw-text-gray-400 dark:tw-text-[#666]'}`}>
                      {feature.included ? <CheckIcon /> : <CrossIcon />}
                      <span className="tw-leading-snug">{feature.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button 
                onClick={() => handleSelectPlan(plan)}
                className={`tw-w-full tw-py-3.5 tw-rounded-xl tw-text-[14px] tw-font-bold tw-shadow-md active:tw-scale-95 tw-mt-auto tw-transition-transform ${plan.buttonClass}`}
              >
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>



      {/* Comparison Table (Solo visible en Desktop, es muy complejo para celular) */}
      <div className="tw-hidden md:tw-block tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-xl tw-p-6">
        <h3 className="tw-text-[14px] tw-font-bold tw-text-gray-800 dark:tw-text-[#f4f1ec] tw-mb-6 tw-flex tw-items-center tw-gap-2">
          <BarChart2 className="tw-text-[#6b8cdd]" size={18} />
          Comparativa completa
        </h3>
        
        <div className="tw-overflow-x-auto">
          <table className="tw-w-full tw-text-left tw-border-collapse min-w-[700px]">
            <thead>
              <tr className="tw-border-b tw-border-gray-100 dark:tw-border-white/5">
                <th className="tw-py-3 tw-px-4 tw-text-[12px] tw-font-semibold tw-text-gray-500 tw-w-1/3">Función</th>
                <th className="tw-py-3 tw-px-4 tw-text-[12px] tw-font-bold tw-text-gray-800 dark:tw-text-[#f4f1ec] tw-text-center">Básico</th>
                <th className="tw-py-3 tw-px-4 tw-text-[12px] tw-font-bold tw-text-[#6b8cdd] tw-text-center">Principiante</th>
                <th className="tw-py-3 tw-px-4 tw-text-[12px] tw-font-bold tw-text-[#9795cd] tw-text-center">Avanzado</th>
                <th className="tw-py-3 tw-px-4 tw-text-[12px] tw-font-bold tw-text-[#6d9e9a] tw-text-center">Ejecutivo</th>
              </tr>
            </thead>
            <tbody className="tw-text-[12px] tw-text-gray-600 dark:tw-text-[#ccc]">
              <tr className="tw-border-b tw-border-gray-50 dark:tw-border-white/5 hover:tw-bg-gray-50 dark:hover:tw-bg-white/5 tw-transition-colors">
                <td className="tw-py-3 tw-px-4">Recordatorios</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-font-medium">50 activos</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Ilimitados</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Ilimitados</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Ilimitados</td>
              </tr>
              <tr className="tw-border-b tw-border-gray-50 dark:tw-border-white/5 hover:tw-bg-gray-50 dark:hover:tw-bg-white/5 tw-transition-colors">
                <td className="tw-py-3 tw-px-4">Planificación semanal y mensual</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-gray-300">✕</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-emerald-400">✓</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-emerald-400">✓</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-emerald-400">✓</td>
              </tr>
              <tr className="tw-border-b tw-border-gray-50 dark:tw-border-white/5 hover:tw-bg-gray-50 dark:hover:tw-bg-white/5 tw-transition-colors">
                <td className="tw-py-3 tw-px-4">Priorización automática</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-gray-400">—</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Básica</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">IA Avanzada</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">IA Empresarial</td>
              </tr>
              <tr className="tw-border-b tw-border-gray-50 dark:tw-border-white/5 hover:tw-bg-gray-50 dark:hover:tw-bg-white/5 tw-transition-colors">
                <td className="tw-py-3 tw-px-4">Sincronización</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">1 dispositivo</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">5 dispositivos</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Ilimitados</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Ilimitados</td>
              </tr>
              <tr className="tw-border-b tw-border-gray-50 dark:tw-border-white/5 hover:tw-bg-gray-50 dark:hover:tw-bg-white/5 tw-transition-colors">
                <td className="tw-py-3 tw-px-4">Registro ingresos/gastos</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">100/mes</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Ilimitado</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Ilimitado</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Ilimitado</td>
              </tr>
              <tr className="tw-border-b tw-border-gray-50 dark:tw-border-white/5 hover:tw-bg-gray-50 dark:hover:tw-bg-white/5 tw-transition-colors">
                <td className="tw-py-3 tw-px-4">Clasificación de gastos</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Básica</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Avanzada</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Personalizada</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Por equipos</td>
              </tr>
              <tr className="tw-border-b tw-border-gray-50 dark:tw-border-white/5 hover:tw-bg-gray-50 dark:hover:tw-bg-white/5 tw-transition-colors">
                <td className="tw-py-3 tw-px-4">Alertas de pagos</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-gray-300">✕</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-emerald-400">✓</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-emerald-400">✓</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-emerald-400">✓</td>
              </tr>
              <tr className="tw-border-b tw-border-gray-50 dark:tw-border-white/5 hover:tw-bg-gray-50 dark:hover:tw-bg-white/5 tw-transition-colors">
                <td className="tw-py-3 tw-px-4">Resúmenes financieros</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Mensuales</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Mensuales</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Sem. y mens.</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Panel ejecutivo</td>
              </tr>
              <tr className="tw-border-b tw-border-gray-50 dark:tw-border-white/5 hover:tw-bg-gray-50 dark:hover:tw-bg-white/5 tw-transition-colors">
                <td className="tw-py-3 tw-px-4">Optimización de presupuesto</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Básica</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Básica</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Predictiva</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Predictiva</td>
              </tr>
              <tr className="tw-border-b tw-border-gray-50 dark:tw-border-white/5 hover:tw-bg-gray-50 dark:hover:tw-bg-white/5 tw-transition-colors">
                <td className="tw-py-3 tw-px-4">Historial de compras</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">30 días</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Completo</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Completo</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Compartido</td>
              </tr>
              <tr className="tw-border-b tw-border-gray-50 dark:tw-border-white/5 hover:tw-bg-gray-50 dark:hover:tw-bg-white/5 tw-transition-colors">
                <td className="tw-py-3 tw-px-4">Organización por tiendas</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">20</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Ilimitadas</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Ilimitadas</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Ilimitadas</td>
              </tr>
              <tr className="tw-border-b tw-border-gray-50 dark:tw-border-white/5 hover:tw-bg-gray-50 dark:hover:tw-bg-white/5 tw-transition-colors">
                <td className="tw-py-3 tw-px-4">Estimación de precios</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-gray-300">✕</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Básica</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">IA predictiva</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">IA predictiva</td>
              </tr>
              <tr className="tw-border-b tw-border-gray-50 dark:tw-border-white/5 hover:tw-bg-gray-50 dark:hover:tw-bg-white/5 tw-transition-colors">
                <td className="tw-py-3 tw-px-4">Seguimiento de hábitos</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">20</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">75</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Ilimitados</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Equipos</td>
              </tr>
              <tr className="tw-border-b tw-border-gray-50 dark:tw-border-white/5 hover:tw-bg-gray-50 dark:hover:tw-bg-white/5 tw-transition-colors">
                <td className="tw-py-3 tw-px-4">Asistente IA</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Básico</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Completo</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Completo</td>
                <td className="tw-py-3 tw-px-4 tw-text-center">Ejecutivo</td>
              </tr>
              <tr className="tw-border-b tw-border-gray-50 dark:tw-border-white/5 hover:tw-bg-gray-50 dark:hover:tw-bg-white/5 tw-transition-colors">
                <td className="tw-py-3 tw-px-4">Reorganización automática</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-gray-300">✕</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-gray-300">✕</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-emerald-400">✓</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-emerald-400">✓</td>
              </tr>
              <tr className="tw-border-b tw-border-gray-50 dark:tw-border-white/5 hover:tw-bg-gray-50 dark:hover:tw-bg-white/5 tw-transition-colors">
                <td className="tw-py-3 tw-px-4">Predicción de gastos</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-gray-300">✕</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-gray-300">✕</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-emerald-400">✓</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-emerald-400">✓</td>
              </tr>
              <tr className="tw-border-b tw-border-gray-50 dark:tw-border-white/5 hover:tw-bg-gray-50 dark:hover:tw-bg-white/5 tw-transition-colors">
                <td className="tw-py-3 tw-px-4">Comparación de precios</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-gray-300">✕</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-gray-300">✕</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-emerald-400">✓</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-emerald-400">✓</td>
              </tr>
              <tr className="tw-border-b tw-border-gray-50 dark:tw-border-white/5 hover:tw-bg-gray-50 dark:hover:tw-bg-white/5 tw-transition-colors">
                <td className="tw-py-3 tw-px-4">Calendarios compartidos</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-gray-300">✕</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-gray-300">✕</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-gray-300">✕</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-emerald-400">✓</td>
              </tr>
              <tr className="tw-border-b tw-border-gray-50 dark:tw-border-white/5 hover:tw-bg-gray-50 dark:hover:tw-bg-white/5 tw-transition-colors">
                <td className="tw-py-3 tw-px-4">Gestión de equipos</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-gray-300">✕</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-gray-300">✕</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-gray-300">✕</td>
                <td className="tw-py-3 tw-px-4 tw-text-center tw-text-emerald-400">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Payment Gateway Modal */}
      {isPaymentModalOpen && selectedPlan && (
        <div className="tw-fixed tw-inset-0 tw-z-[100] tw-flex tw-items-center tw-justify-center tw-p-4 tw-bg-black/50 tw-backdrop-blur-sm tw-overflow-y-auto">
          <div className="tw-bg-white dark:tw-bg-[#1e1e1d] tw-w-full tw-max-w-md tw-rounded-2xl tw-shadow-2xl tw-overflow-hidden tw-animate-fade-in-up tw-my-auto">
            {/* Header Modal */}
            <div className="tw-bg-gray-50 dark:tw-bg-[#242422] tw-p-5 tw-flex tw-justify-between tw-items-center tw-border-b tw-border-gray-200 dark:tw-border-white/10">
              <div className="tw-flex tw-items-center tw-gap-3">
                <CreditCard className="tw-text-[#6b8cdd]" size={22} />
                <h3 className="tw-text-[16px] tw-font-bold tw-text-gray-900 dark:tw-text-white">Pago Seguro</h3>
              </div>
              <button onClick={() => setIsPaymentModalOpen(false)} className="tw-text-gray-400 hover:tw-text-gray-600 dark:hover:tw-text-white tw-transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="tw-p-5 md:tw-p-6">
              {/* Resumen del Plan */}
              <div className="tw-flex tw-justify-between tw-items-center tw-mb-5 tw-bg-blue-50/50 dark:tw-bg-blue-900/10 tw-p-3.5 tw-rounded-xl tw-border tw-border-blue-100 dark:tw-border-blue-800/20">
                <div>
                  <p className="tw-text-[11px] tw-text-gray-500 dark:tw-text-gray-400 tw-uppercase tw-tracking-wider tw-font-bold">Plan a contratar</p>
                  <p className="tw-font-bold tw-text-gray-900 dark:tw-text-white tw-text-[15px]">{selectedPlan.name}</p>
                </div>
                <div className="tw-text-right">
                  <p className="tw-text-[20px] tw-font-black tw-text-[#6b8cdd]">
                    {formatPrice(isAnnual ? selectedPlan.basePrice.annual : selectedPlan.basePrice.monthly)} <span className="tw-text-[11px]">{currency}</span>
                  </p>
                  <p className="tw-text-[10px] tw-text-gray-500 dark:tw-text-gray-400">{isAnnual ? 'Facturado anualmente' : 'Facturado mensualmente'}</p>
                </div>
              </div>

              {/* Métodos de Pago */}
              <div className="tw-mb-5">
                <p className="tw-text-[11px] tw-font-bold tw-text-gray-700 dark:tw-text-gray-300 tw-uppercase tw-tracking-wider tw-mb-3">Método de pago</p>
                <div className="tw-grid tw-grid-cols-3 tw-gap-2.5">
                  <button 
                    onClick={() => setPaymentMethod('card')}
                    className={`tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1.5 tw-p-2.5 tw-rounded-xl tw-border-2 tw-transition-all ${paymentMethod === 'card' ? 'tw-border-[#6b8cdd] tw-bg-blue-50 dark:tw-bg-blue-900/20 tw-text-[#6b8cdd]' : 'tw-border-gray-100 dark:tw-border-white/5 tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-text-gray-500 hover:tw-border-gray-300'}`}
                  >
                    <CreditCard size={18} />
                    <span className="tw-text-[10px] tw-font-bold tw-uppercase">Tarjeta</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('paypal')}
                    className={`tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1.5 tw-p-2.5 tw-rounded-xl tw-border-2 tw-transition-all ${paymentMethod === 'paypal' ? 'tw-border-[#6b8cdd] tw-bg-blue-50 dark:tw-bg-blue-900/20 tw-text-[#6b8cdd]' : 'tw-border-gray-100 dark:tw-border-white/5 tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-text-gray-500 hover:tw-border-gray-300'}`}
                  >
                    <Smartphone size={18} />
                    <span className="tw-text-[10px] tw-font-bold tw-uppercase">PayPal</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('cash')}
                    className={`tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1.5 tw-p-2.5 tw-rounded-xl tw-border-2 tw-transition-all ${paymentMethod === 'cash' ? 'tw-border-[#6b8cdd] tw-bg-blue-50 dark:tw-bg-blue-900/20 tw-text-[#6b8cdd]' : 'tw-border-gray-100 dark:tw-border-white/5 tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-text-gray-500 hover:tw-border-gray-300'}`}
                  >
                    <Store size={18} />
                    <span className="tw-text-[10px] tw-font-bold tw-uppercase">Efectivo</span>
                  </button>
                </div>
              </div>
              
              {/* Formulario Dinámico según Método */}
              <div className="tw-min-h-[140px] tw-mb-5">
                {paymentMethod === 'card' && (
                  <div className="tw-space-y-3.5 tw-animate-fade-in">
                    <div>
                      <input type="text" placeholder="Número de Tarjeta (0000 0000 0000 0000)" className="tw-w-full tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-lg tw-px-3.5 tw-py-2.5 tw-text-[13px] tw-text-gray-900 dark:tw-text-white tw-outline-none focus:tw-border-[#6b8cdd] tw-transition-colors" />
                    </div>
                    <div className="tw-grid tw-grid-cols-2 tw-gap-3">
                      <input type="text" placeholder="MM/YY" className="tw-w-full tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-lg tw-px-3.5 tw-py-2.5 tw-text-[13px] tw-text-gray-900 dark:tw-text-white tw-outline-none focus:tw-border-[#6b8cdd] tw-transition-colors" />
                      <input type="text" placeholder="CVC (123)" className="tw-w-full tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-lg tw-px-3.5 tw-py-2.5 tw-text-[13px] tw-text-gray-900 dark:tw-text-white tw-outline-none focus:tw-border-[#6b8cdd] tw-transition-colors" />
                    </div>
                    <div>
                      <input type="text" placeholder="Nombre en la tarjeta" className="tw-w-full tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-lg tw-px-3.5 tw-py-2.5 tw-text-[13px] tw-text-gray-900 dark:tw-text-white tw-outline-none focus:tw-border-[#6b8cdd] tw-transition-colors" />
                    </div>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="tw-h-full tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-xl tw-p-5 tw-flex tw-items-center tw-justify-center tw-text-center tw-animate-fade-in">
                    <p className="tw-text-[13px] tw-text-gray-600 dark:tw-text-[#ccc] tw-leading-relaxed">Serás redirigido a la plataforma segura de <span className="tw-font-bold tw-text-blue-600">PayPal</span> para completar tu pago con protección al comprador.</p>
                  </div>
                )}

                {paymentMethod === 'cash' && (
                  <div className="tw-h-full tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-xl tw-p-5 tw-flex tw-items-center tw-justify-center tw-text-center tw-animate-fade-in">
                    <p className="tw-text-[13px] tw-text-gray-600 dark:tw-text-[#ccc] tw-leading-relaxed">Generaremos una ficha referenciada para que pagues en efectivo en <span className="tw-font-bold tw-text-emerald-600">OXXO, 7-Eleven o ventanilla bancaria</span>.</p>
                  </div>
                )}
              </div>

              {/* Términos y Políticas (Protección Legal) */}
              <div className="tw-mb-5 tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-p-3.5 tw-rounded-xl tw-border tw-border-gray-200 dark:tw-border-white/5">
                <label className="tw-flex tw-items-start tw-gap-3 tw-cursor-pointer tw-group">
                  <div className="tw-relative tw-flex tw-items-center tw-mt-0.5">
                    <input 
                      type="checkbox" 
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="tw-w-4 tw-h-4 tw-appearance-none tw-border-2 tw-border-gray-300 dark:tw-border-gray-600 tw-rounded tw-bg-white dark:tw-bg-[#242422] checked:tw-bg-[#6b8cdd] checked:tw-border-[#6b8cdd] tw-transition-colors tw-cursor-pointer"
                    />
                    <svg className={`tw-absolute tw-w-3 tw-h-3 tw-text-white tw-pointer-events-none tw-left-0.5 tw-top-0.5 tw-transition-opacity ${termsAccepted ? 'tw-opacity-100' : 'tw-opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="tw-text-[10px] md:tw-text-[11px] tw-text-gray-500 dark:tw-text-gray-400 tw-leading-snug tw-select-none">
                    He leído y acepto los <span className="tw-text-[#6b8cdd] hover:tw-underline">Términos del Servicio</span> y la <span className="tw-text-[#6b8cdd] hover:tw-underline">Política de Privacidad</span>. Reconozco que los bienes digitales y suscripciones de software <span className="tw-font-bold tw-text-gray-700 dark:tw-text-gray-300">no son reembolsables</span> una vez procesado el pago.
                  </span>
                </label>
              </div>
              
              {/* Botón de Pago Final */}
              <div className="tw-flex tw-flex-col tw-gap-2.5">
                <button 
                  disabled={!termsAccepted}
                  onClick={() => {
                    alert(`Pago simulado vía ${paymentMethod.toUpperCase()} procesado con éxito.`);
                    setIsPaymentModalOpen(false);
                  }}
                  className={`tw-w-full tw-font-bold tw-py-3.5 tw-rounded-xl tw-shadow-md tw-transition-all tw-flex tw-justify-center tw-items-center tw-gap-2 ${termsAccepted ? 'tw-bg-[#6b8cdd] hover:tw-bg-[#5a7bc2] tw-text-white active:tw-scale-95' : 'tw-bg-gray-200 dark:tw-bg-gray-800 tw-text-gray-400 tw-cursor-not-allowed'}`}
                >
                  <ShieldCheck size={18} />
                  Confirmar Pago ({formatPrice(isAnnual ? selectedPlan.basePrice.annual : selectedPlan.basePrice.monthly)})
                </button>
                <p className="tw-text-[10px] tw-text-center tw-text-gray-400 tw-flex tw-items-center tw-justify-center tw-gap-1">
                  Transacción 100% segura. SSL 256-bit encryption.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
