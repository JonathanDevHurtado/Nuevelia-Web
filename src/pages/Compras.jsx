import React from 'react';
import { useData } from '../context/DataContext';
import { Check, Trash2, ShoppingBag } from 'lucide-react';

export default function Compras({ setActiveModal }) {
  const { compras, toggleCompra, deleteCompra, clearComprasCompletadas } = useData();

  const catIcons = {
    alimentos: '🍎', bebidas: '🥤', limpieza: '🧹', higiene: '🧼',
    ropa: '👕', electronica: '💻', otro: '📦'
  };

  const catColors = {
    alimentos: 'tw-bg-red-100 tw-text-red-600 dark:tw-bg-red-500/10 dark:tw-text-red-400',
    bebidas: 'tw-bg-blue-100 tw-text-blue-600 dark:tw-bg-blue-500/10 dark:tw-text-blue-400',
    limpieza: 'tw-bg-teal-100 tw-text-teal-600 dark:tw-bg-teal-500/10 dark:tw-text-teal-400',
    higiene: 'tw-bg-purple-100 tw-text-purple-600 dark:tw-bg-purple-500/10 dark:tw-text-purple-400',
    ropa: 'tw-bg-pink-100 tw-text-pink-600 dark:tw-bg-pink-500/10 dark:tw-text-pink-400',
    electronica: 'tw-bg-gray-100 tw-text-gray-600 dark:tw-bg-gray-500/10 dark:tw-text-gray-400',
    otro: 'tw-bg-orange-100 tw-text-orange-600 dark:tw-bg-orange-500/10 dark:tw-text-orange-400',
  };

  return (
    <div className="page active tw-flex tw-flex-col">
      {/* Header */}
      <div className="tw-mb-8 tw-flex tw-items-center tw-justify-between tw-gap-4 tw-flex-wrap">
        <div className="tw-flex tw-items-center tw-gap-4">
          <div className="tw-w-12 tw-h-12 tw-rounded-2xl tw-bg-gradient-to-br tw-from-indigo-500 tw-to-purple-600 tw-flex tw-items-center tw-justify-center tw-shadow-lg tw-shadow-indigo-500/20">
            <ShoppingBag className="tw-text-white" size={24} />
          </div>
          <div>
            <h1 className="tw-text-[24px] tw-font-bold tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-tracking-tight">
              Lista de Compras
            </h1>
            <p className="tw-text-sm tw-text-gray-500 dark:tw-text-[#ccc] tw-mt-0.5">
              Organiza tus artículos y optimiza tu tiempo
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveModal && setActiveModal('compra')}
          className="tw-bg-gradient-to-r tw-from-[#8aa7ec] tw-to-[#7896dc] hover:tw-from-[#7896dc] hover:tw-to-[#6785cb] tw-text-white tw-rounded-xl tw-px-5 tw-py-2.5 tw-text-[13px] tw-font-bold tw-shadow-md hover:tw-shadow-lg hover:-tw-translate-y-0.5 tw-transition-all tw-duration-300"
        >
          + Añadir ítem
        </button>
      </div>

      {/* Main Content */}
      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-6">
        
        {/* Lista de compras */}
        <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-shadow-sm tw-p-6 tw-transition-colors lg:tw-col-span-2 tw-flex tw-flex-col tw-min-h-[400px] tw-relative tw-overflow-hidden">
          <div className="tw-absolute tw-top-0 tw-right-0 tw-w-64 tw-h-64 tw-bg-gradient-to-bl tw-from-indigo-50 dark:tw-from-indigo-500/5 tw-to-transparent tw-rounded-bl-full tw-opacity-60 tw-pointer-events-none"></div>

          <div className="tw-flex tw-items-center tw-justify-between tw-mb-6 tw-relative tw-z-10">
            <h3 className="tw-text-lg tw-font-bold tw-text-gray-800 dark:tw-text-[#f4f1ec]">Artículos pendientes</h3>
            {compras.some(c => c.completada) && (
              <button 
                onClick={clearComprasCompletadas}
                className="tw-flex tw-items-center tw-gap-1.5 tw-border tw-border-gray-200 dark:tw-border-white/10 tw-bg-white dark:tw-bg-transparent hover:tw-bg-gray-50 dark:hover:tw-bg-white/5 tw-text-gray-500 dark:tw-text-gray-400 tw-rounded-lg tw-px-3 tw-py-1.5 tw-text-xs tw-font-medium tw-transition-all hover:tw-text-gray-700 dark:hover:tw-text-white"
              >
                <Trash2 size={14} />
                Limpiar
              </button>
            )}
          </div>
          
          <div className="tw-flex-1 tw-flex tw-flex-col tw-gap-3 tw-relative tw-z-10 tw-overflow-y-auto tw-pr-2">
            {compras.length === 0 ? (
              <div className="tw-flex-1 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-py-12 tw-text-gray-400 dark:tw-text-gray-500">
                <div className="tw-w-20 tw-h-20 tw-rounded-full tw-bg-gray-50 dark:tw-bg-white/5 tw-flex tw-items-center tw-justify-center tw-mb-2">
                  <ShoppingBag size={32} className="tw-opacity-50" />
                </div>
                <p className="tw-text-sm tw-font-medium">Tu carrito está vacío</p>
                <button
                  onClick={() => setActiveModal && setActiveModal('compra')}
                  className="tw-text-[#8aa7ec] hover:tw-text-[#7896dc] tw-text-sm tw-font-semibold tw-transition-colors"
                >
                  Agrega tu primer artículo
                </button>
              </div>
            ) : (
              compras.map(compra => (
                <div
                  key={compra.id}
                  className={`tw-group tw-flex tw-items-center tw-justify-between tw-gap-4 tw-p-4 tw-rounded-xl tw-border ${
                    compra.completada 
                      ? 'tw-bg-gray-50/50 dark:tw-bg-white/5 tw-border-transparent tw-opacity-50' 
                      : 'tw-bg-white dark:tw-bg-[#2a2a28] tw-border-gray-100 dark:tw-border-white/5 tw-shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:tw-shadow-md hover:-tw-translate-y-0.5 hover:tw-border-indigo-100 dark:hover:tw-border-indigo-500/20'
                  } tw-transition-all tw-duration-300`}
                >
                  <div className="tw-flex tw-items-center tw-gap-4 tw-flex-1 tw-min-w-0">
                    <button
                      onClick={() => toggleCompra(compra.id)}
                      className={`tw-w-6 tw-h-6 tw-rounded-full tw-border-2 tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-300 ${
                        compra.completada 
                          ? 'tw-bg-indigo-500 tw-border-indigo-500 tw-text-white tw-scale-110' 
                          : 'tw-border-gray-300 dark:tw-border-gray-600 hover:tw-border-indigo-400 dark:hover:tw-border-indigo-400'
                      }`}
                    >
                      {compra.completada && <Check size={14} className="tw-animate-in tw-zoom-in" />}
                    </button>
                    <div className="tw-flex-1 tw-min-w-0 tw-flex tw-flex-col tw-justify-center">
                      <p className={`tw-text-[15px] tw-font-medium tw-truncate tw-transition-all ${compra.completada ? 'tw-line-through tw-text-gray-400 dark:tw-text-gray-500' : 'tw-text-gray-800 dark:tw-text-[#f4f1ec]'}`}>
                        {compra.producto}
                      </p>
                      <div className="tw-flex tw-items-center tw-gap-2 tw-mt-1">
                        {compra.cantidad && (
                          <span className="tw-text-xs tw-font-medium tw-bg-gray-100 dark:tw-bg-white/10 tw-text-gray-600 dark:tw-text-gray-300 tw-px-2 tw-py-0.5 tw-rounded-md">
                            {compra.cantidad}
                          </span>
                        )}
                        <span className="tw-text-xs tw-text-gray-400 tw-capitalize">
                          {compra.tienda || compra.categoria}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteCompra(compra.id)}
                    className="tw-w-8 tw-h-8 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-gray-400 hover:tw-text-red-500 hover:tw-bg-red-50 dark:hover:tw-bg-red-500/10 tw-transition-all tw-opacity-0 group-hover:tw-opacity-100 tw-flex-shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Categorías */}
        <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-shadow-sm tw-p-6 tw-transition-colors">
          <h3 className="tw-text-lg tw-font-bold tw-text-gray-800 dark:tw-text-[#f4f1ec] tw-mb-5">Resumen</h3>
          
          <div className="tw-grid tw-grid-cols-2 tw-gap-3">
            {['alimentos', 'bebidas', 'limpieza', 'higiene', 'ropa', 'electronica', 'otro'].map(cat => {
              const catCount = compras.filter(c => c.categoria === cat && !c.completada).length;
              
              const colorClass = catColors[cat] || catColors['otro'];
              
              return (
                <div key={cat} className={`tw-flex tw-flex-col tw-gap-2 tw-p-3 tw-rounded-xl tw-border tw-border-gray-100 dark:tw-border-white/5 ${catCount > 0 ? 'tw-bg-white dark:tw-bg-[#2a2a28]' : 'tw-bg-gray-50/50 dark:tw-bg-[#1a1a18] tw-opacity-60'} tw-transition-all`}>
                  <div className="tw-flex tw-items-center tw-justify-between">
                    <div className={`tw-w-8 tw-h-8 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-text-sm ${colorClass}`}>
                      {catIcons[cat] || '📦'}
                    </div>
                    <span className="tw-text-lg tw-font-bold tw-text-gray-900 dark:tw-text-white">{catCount}</span>
                  </div>
                  <span className="tw-text-xs tw-font-semibold tw-text-gray-600 dark:tw-text-[#ccc] tw-capitalize">{cat}</span>
                </div>
              );
            })}
          </div>
          
          {compras.length > 0 && (
            <div className="tw-mt-6 tw-pt-5 tw-border-t tw-border-gray-100 dark:tw-border-white/5 tw-flex tw-items-center tw-justify-between">
              <span className="tw-text-sm tw-font-medium tw-text-gray-500">Total pendientes</span>
              <span className="tw-text-xl tw-font-black tw-text-indigo-600 dark:tw-text-indigo-400">
                {compras.filter(c => !c.completada).length}
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
