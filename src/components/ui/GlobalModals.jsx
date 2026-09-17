import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useData } from '../../context/DataContext';

const ModalContainer = ({ title, children, width = 'tw-max-w-[420px]', onClose }) => (
  <div
    className="tw-fixed tw-inset-0 tw-z-[100] tw-flex tw-items-center tw-justify-center tw-p-4 tw-bg-black/40 tw-backdrop-blur-[2px]"
    onClick={onClose}
  >
    <div
      className={`tw-bg-white dark:tw-bg-[#242422] tw-w-full ${width} tw-rounded-xl tw-shadow-2xl tw-border tw-border-transparent dark:tw-border-white/10 tw-overflow-hidden`}
      onClick={e => e.stopPropagation()}
    >
      <div className="tw-flex tw-items-center tw-justify-between tw-px-5 tw-py-4 tw-border-b tw-border-gray-100 dark:tw-border-white/5">
        <h3 className="tw-text-sm tw-font-bold tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-flex tw-items-center tw-gap-2">
          {title}
        </h3>
        <button
          onClick={onClose}
          className="tw-text-gray-400 hover:tw-text-gray-600 dark:tw-text-[#888] dark:hover:tw-text-[#ccc] tw-transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      <div className="tw-p-5">{children}</div>
    </div>
  </div>
);

export default function GlobalModals({ activeModal, setActiveModal }) {
  if (!activeModal) return null;

  const closeModal = () => setActiveModal(null);

  const inputCls = 'tw-w-full tw-bg-white dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-md tw-px-3 tw-py-2 tw-text-sm focus:tw-border-[#8aa7ec] focus:tw-outline-none tw-text-gray-900 dark:tw-text-[#f4f1ec]';
  const inputAltCls = 'tw-w-full tw-bg-[#f9f9f9] dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-md tw-px-3 tw-py-2 tw-text-sm focus:tw-border-[#8aa7ec] focus:tw-outline-none tw-text-gray-900 dark:tw-text-[#f4f1ec]';
  const labelCls = 'tw-text-[11px] tw-text-gray-500 dark:tw-text-[#888] tw-font-semibold';
  const btnCancel = 'tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-600 dark:tw-text-[#ccc] tw-bg-white dark:tw-bg-transparent tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-md hover:tw-bg-gray-50 dark:hover:tw-bg-white/5';
  const btnPrimary = 'tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-white tw-bg-[#8aa7ec] hover:tw-bg-[#7896dc] tw-rounded-md tw-transition-colors';

  // ─── Menú Principal ───────────────────────────────────────────────────────
  if (activeModal === 'menu') {
    return (
      <ModalContainer title="¿Qué quieres añadir?" width="tw-max-w-[420px]" onClose={closeModal}>
        <div className="tw-grid tw-grid-cols-2 tw-gap-3">
          {[
            { id: 'evento', label: 'Evento', icon: '📅' },
            { id: 'tarea', label: 'Tarea', icon: '✅' },
            { id: 'transaccion', label: 'Transacción', icon: '💰' },
            { id: 'compra', label: 'Compra', icon: '🛒' },
            { id: 'notificacion', label: 'Notificación', icon: '🔔' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveModal(item.id)}
              className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-py-6 tw-bg-white dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-xl hover:tw-border-[#8aa7ec] dark:hover:tw-border-[#9ab8f0] hover:tw-bg-[#8aa7ec]/5 tw-transition-all"
            >
              <span className="tw-text-2xl">{item.icon}</span>
              <span className="tw-text-xs tw-font-medium tw-text-gray-700 dark:tw-text-[#ccc]">{item.label}</span>
            </button>
          ))}
        </div>
      </ModalContainer>
    );
  }

  // ─── Nuevo Evento ─────────────────────────────────────────────────────────
  if (activeModal === 'evento') {
    const { addEvento } = useData();
    const [form, setForm] = useState({ titulo: '', fecha: '', hora: '', descripcion: '' });

    const handleSubmit = (e) => {
      e.preventDefault();
      addEvento(form);
      closeModal();
    };

    return (
      <ModalContainer title="📅 Nuevo evento" onClose={closeModal}>
        <form onSubmit={handleSubmit} className="tw-flex tw-flex-col tw-gap-4">
          <div className="tw-flex tw-flex-col tw-gap-1">
            <label className={labelCls}>Título</label>
            <input type="text" placeholder="Reunión con equipo" className={inputCls} required
              value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} />
          </div>
          <div className="tw-grid tw-grid-cols-2 tw-gap-4">
            <div className="tw-flex tw-flex-col tw-gap-1">
              <label className={labelCls}>Fecha</label>
              <input type="date" className={inputAltCls} required
                value={form.fecha} onChange={e => setForm({ ...form, fecha: e.target.value })} />
            </div>
            <div className="tw-flex tw-flex-col tw-gap-1">
              <label className={labelCls}>Hora</label>
              <input type="time" className={inputAltCls} required
                value={form.hora} onChange={e => setForm({ ...form, hora: e.target.value })} />
            </div>
          </div>
          <div className="tw-flex tw-flex-col tw-gap-1">
            <label className={labelCls}>Descripción</label>
            <textarea rows="3" placeholder="Detalles del evento..." className={`${inputAltCls} tw-resize-none`}
              value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} />
          </div>
          <div className="tw-flex tw-justify-end tw-gap-2 tw-mt-2">
            <button type="button" onClick={closeModal} className={btnCancel}>Cancelar</button>
            <button type="submit" className={btnPrimary}>Guardar evento</button>
          </div>
        </form>
      </ModalContainer>
    );
  }

  // ─── Nueva Tarea ──────────────────────────────────────────────────────────────
  if (activeModal === 'tarea') {
    const { addTarea } = useData();
    const [form, setForm] = useState({ texto: '', prioridad: 'media', fechaLimite: '', hora: '', descripcion: '' });

    const handleSubmit = (e) => {
      e.preventDefault();
      addTarea(form);
      closeModal();
    };

    const priorities = [
      { id: 'alta',  label: 'Alta',  emoji: '🔴', active: 'tw-bg-red-500 tw-text-white tw-border-red-500', inactive: 'tw-border-gray-200 dark:tw-border-white/10 tw-text-gray-600 dark:tw-text-gray-400 hover:tw-border-red-300' },
      { id: 'media', label: 'Media', emoji: '🔵', active: 'tw-bg-blue-500 tw-text-white tw-border-blue-500', inactive: 'tw-border-gray-200 dark:tw-border-white/10 tw-text-gray-600 dark:tw-text-gray-400 hover:tw-border-blue-300' },
      { id: 'baja',  label: 'Baja',  emoji: '🟢', active: 'tw-bg-green-500 tw-text-white tw-border-green-500', inactive: 'tw-border-gray-200 dark:tw-border-white/10 tw-text-gray-600 dark:tw-text-gray-400 hover:tw-border-green-300' },
    ];

    return (
      <ModalContainer title="✅ Nueva tarea" onClose={closeModal}>
        <form onSubmit={handleSubmit} className="tw-flex tw-flex-col tw-gap-4">
          {/* Texto de la tarea */}
          <div className="tw-flex tw-flex-col tw-gap-1">
            <label className={labelCls}>Tarea</label>
            <input type="text" placeholder="¿Qué necesitas hacer?" className={inputCls} required
              value={form.texto} onChange={e => setForm({ ...form, texto: e.target.value })} />
          </div>

          {/* Prioridad como píldoras */}
          <div className="tw-flex tw-flex-col tw-gap-2">
            <label className={labelCls}>Prioridad</label>
            <div className="tw-flex tw-gap-2">
              {priorities.map(p => (
                <button type="button" key={p.id}
                  onClick={() => setForm({ ...form, prioridad: p.id })}
                  className={`tw-flex-1 tw-flex tw-items-center tw-justify-center tw-gap-1.5 tw-py-2 tw-rounded-lg tw-border tw-text-[12px] tw-font-bold tw-transition-all tw-duration-200 ${
                    form.prioridad === p.id ? p.active : p.inactive
                  }`}>
                  <span className="tw-text-base">{p.emoji}</span> {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fecha límite y Hora */}
          <div className="tw-grid tw-grid-cols-2 tw-gap-4">
            <div className="tw-flex tw-flex-col tw-gap-1">
              <label className={labelCls}>Fecha límite</label>
              <input type="date" className={inputAltCls}
                value={form.fechaLimite} onChange={e => setForm({ ...form, fechaLimite: e.target.value })} />
            </div>
            <div className="tw-flex tw-flex-col tw-gap-1">
              <label className={labelCls}>Hora</label>
              <input type="time" className={inputAltCls}
                value={form.hora} onChange={e => setForm({ ...form, hora: e.target.value })} />
            </div>
          </div>

          {/* Descripción opcional */}
          <div className="tw-flex tw-flex-col tw-gap-1">
            <label className={labelCls}>Descripción <span className="tw-text-gray-400 tw-font-normal">(opcional)</span></label>
            <textarea rows="2" placeholder="Detalles adicionales..." className={`${inputAltCls} tw-resize-none`}
              value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} />
          </div>

          <div className="tw-flex tw-justify-end tw-gap-2 tw-mt-1">
            <button type="button" onClick={closeModal} className={btnCancel}>Cancelar</button>
            <button type="submit" className={btnPrimary}>Guardar tarea</button>
          </div>
        </form>
      </ModalContainer>
    );
  }

  // ─── Nueva Transacción ────────────────────────────────────────────────────
  if (activeModal === 'transaccion') {
    const { addTransaccion } = useData();
    const today = new Date().toISOString().split('T')[0];
    const [form, setForm] = useState({ descripcion: '', monto: '', tipo: 'gasto', categoria: 'alimentacion', fecha: today });

    const handleTipoChange = (e) => {
      const nuevoTipo = e.target.value;
      setForm({ ...form, tipo: nuevoTipo, categoria: nuevoTipo === 'gasto' ? 'alimentacion' : 'salario' });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      addTransaccion(form);
      closeModal();
    };

    return (
      <ModalContainer title="💰 Nueva Transacción" onClose={closeModal}>
        <form onSubmit={handleSubmit} className="tw-flex tw-flex-col tw-gap-5">
          {/* Descripción */}
          <div className="tw-flex tw-flex-col tw-gap-1.5">
            <label className="tw-text-[12px] tw-font-bold tw-text-gray-700 dark:tw-text-[#ccc] tw-uppercase tw-tracking-wider">Descripción</label>
            <input 
              type="text" 
              placeholder="Ej. Supermercado, salario, etc." 
              className="tw-w-full tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-xl tw-px-4 tw-py-3 tw-text-[14px] focus:tw-border-[#8aa7ec] focus:tw-ring-2 focus:tw-ring-[#8aa7ec]/20 focus:tw-outline-none tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-transition-all"
              required
              value={form.descripcion} 
              onChange={e => setForm({ ...form, descripcion: e.target.value })} 
            />
          </div>

          <div className="tw-grid tw-grid-cols-2 tw-gap-4">
            {/* Monto */}
            <div className="tw-flex tw-flex-col tw-gap-1.5">
              <label className="tw-text-[12px] tw-font-bold tw-text-gray-700 dark:tw-text-[#ccc] tw-uppercase tw-tracking-wider">Monto</label>
              <div className="tw-relative">
                <span className={`tw-absolute tw-left-4 tw-top-1/2 -tw-translate-y-1/2 tw-font-bold tw-text-[15px] ${form.tipo === 'gasto' ? 'tw-text-rose-500' : 'tw-text-emerald-500'}`}>
                  {form.tipo === 'gasto' ? '-$' : '+$'}
                </span>
                <input 
                  type="number" 
                  step="0.01" 
                  min="0" 
                  placeholder="0.00" 
                  required
                  className="tw-w-full tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-xl tw-pl-10 tw-pr-4 tw-py-3 tw-text-[14px] focus:tw-border-[#8aa7ec] focus:tw-ring-2 focus:tw-ring-[#8aa7ec]/20 focus:tw-outline-none tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-transition-all"
                  value={form.monto} 
                  onChange={e => setForm({ ...form, monto: e.target.value })} 
                />
              </div>
            </div>

            {/* Tipo */}
            <div className="tw-flex tw-flex-col tw-gap-1.5">
              <label className="tw-text-[12px] tw-font-bold tw-text-gray-700 dark:tw-text-[#ccc] tw-uppercase tw-tracking-wider">Tipo</label>
              <select 
                className="tw-w-full tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-xl tw-px-4 tw-py-3 tw-text-[14px] focus:tw-border-[#8aa7ec] focus:tw-ring-2 focus:tw-ring-[#8aa7ec]/20 focus:tw-outline-none tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-transition-all tw-appearance-none"
                value={form.tipo} 
                onChange={handleTipoChange}
              >
                <option value="gasto">🔴 Gasto</option>
                <option value="ingreso">🟢 Ingreso</option>
              </select>
            </div>
          </div>

          <div className="tw-grid tw-grid-cols-2 tw-gap-4">
            {/* Categoría */}
            <div className="tw-flex tw-flex-col tw-gap-1.5">
              <label className="tw-text-[12px] tw-font-bold tw-text-gray-700 dark:tw-text-[#ccc] tw-uppercase tw-tracking-wider">Categoría</label>
              <select 
                className="tw-w-full tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-xl tw-px-4 tw-py-3 tw-text-[14px] focus:tw-border-[#8aa7ec] focus:tw-ring-2 focus:tw-ring-[#8aa7ec]/20 focus:tw-outline-none tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-transition-all tw-appearance-none"
                value={form.categoria} 
                onChange={e => setForm({ ...form, categoria: e.target.value })}
              >
                {form.tipo === 'gasto' ? (
                  <>
                    <option value="alimentacion">Alimentación</option>
                    <option value="transporte">Transporte</option>
                    <option value="vivienda">Vivienda</option>
                    <option value="servicios">Servicios</option>
                    <option value="ocio">Ocio</option>
                    <option value="otros">Otros</option>
                  </>
                ) : (
                  <>
                    <option value="salario">Salario</option>
                    <option value="negocios">Negocios / Ventas</option>
                    <option value="inversiones">Inversiones</option>
                    <option value="regalos">Regalos</option>
                    <option value="otros">Otros</option>
                  </>
                )}
              </select>
            </div>

            {/* Fecha */}
            <div className="tw-flex tw-flex-col tw-gap-1.5">
              <label className="tw-text-[12px] tw-font-bold tw-text-gray-700 dark:tw-text-[#ccc] tw-uppercase tw-tracking-wider">Fecha</label>
              <input 
                type="date" 
                className="tw-w-full tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-xl tw-px-4 tw-py-3 tw-text-[14px] focus:tw-border-[#8aa7ec] focus:tw-ring-2 focus:tw-ring-[#8aa7ec]/20 focus:tw-outline-none tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-transition-all"
                required
                value={form.fecha} 
                onChange={e => setForm({ ...form, fecha: e.target.value })} 
              />
            </div>
          </div>

          <div className="tw-flex tw-justify-end tw-gap-3 tw-mt-4">
            <button 
              type="button" 
              onClick={closeModal} 
              className="tw-px-5 tw-py-2.5 tw-text-[14px] tw-font-bold tw-text-gray-600 dark:tw-text-[#ccc] tw-bg-gray-100 dark:tw-bg-white/5 hover:tw-bg-gray-200 dark:hover:tw-bg-white/10 tw-rounded-xl tw-transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="tw-px-6 tw-py-2.5 tw-text-[14px] tw-font-bold tw-text-white tw-bg-gradient-to-r tw-from-[#8aa7ec] tw-to-[#6d8bcf] hover:tw-from-[#7896dc] hover:tw-to-[#5c7abe] tw-rounded-xl tw-shadow-md tw-transition-colors active:tw-scale-95"
            >
              Guardar Transacción
            </button>
          </div>
        </form>
      </ModalContainer>
    );
  }

  // ─── Añadir Ítem de Compra ────────────────────────────────────────────────
  if (activeModal === 'compra') {
    const { addCompra } = useData();
    const [form, setForm] = useState({ producto: '', cantidad: '', categoria: 'alimentos', tienda: '' });

    const handleSubmit = (e) => {
      e.preventDefault();
      addCompra(form);
      closeModal();
    };

    return (
      <ModalContainer title="🛒 Añadir ítem" onClose={closeModal}>
        <form onSubmit={handleSubmit} className="tw-flex tw-flex-col tw-gap-4">
          <div className="tw-flex tw-flex-col tw-gap-1">
            <label className={labelCls}>Producto</label>
            <input type="text" placeholder="Leche, pan, shampoo..." className={inputCls} required
              value={form.producto} onChange={e => setForm({ ...form, producto: e.target.value })} />
          </div>
          <div className="tw-grid tw-grid-cols-2 tw-gap-4">
            <div className="tw-flex tw-flex-col tw-gap-1">
              <label className={labelCls}>Cantidad</label>
              <input type="text" placeholder="1 kg, 2 pzas..." className={inputAltCls}
                value={form.cantidad} onChange={e => setForm({ ...form, cantidad: e.target.value })} />
            </div>
            <div className="tw-flex tw-flex-col tw-gap-1">
              <label className={labelCls}>Categoría</label>
              <select className={inputAltCls}
                value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })}>
                <option value="alimentos">Alimentos</option>
                <option value="bebidas">Bebidas</option>
                <option value="limpieza">Limpieza</option>
                <option value="higiene">Higiene</option>
                <option value="ropa">Ropa</option>
                <option value="electronica">Electrónica</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>
          <div className="tw-flex tw-flex-col tw-gap-1">
            <label className={labelCls}>Tienda</label>
            <select className={inputAltCls}
              value={form.tienda} onChange={e => setForm({ ...form, tienda: e.target.value })}>
              <option value="">— Seleccionar tienda —</option>
              <option value="walmart">Walmart</option>
              <option value="bodega_aurrera">Bodega Aurrerá</option>
              <option value="costco">Costco</option>
              <option value="bara">Bara</option>
              <option value="oxxo">OXXO</option>
              <option value="waldos">Waldos</option>
              <option value="h_m">H&M</option>
              <option value="pull_and_bear">Pull and Bear</option>
              <option value="cuidado_con_el_perro">Cuidado con el Perro</option>
              <option value="7_eleven">7-Eleven</option>
              <option value="soriana">Soriana</option>
              <option value="chedraui">Chedraui</option>
              <option value="la_comer">La Comer</option>
              <option value="sams_club">Sam's Club</option>
              <option value="liverpool">Liverpool</option>
              <option value="zara">Zara</option>
              <option value="mercado_libre">Mercado Libre</option>
              <option value="amazon">Amazon</option>
              <option value="farmacia_guadalajara">Farmacia Guadalajara</option>
              <option value="farmacias_del_ahorro">Farmacias del Ahorro</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div className="tw-flex tw-justify-end tw-gap-2 tw-mt-2">
            <button type="button" onClick={closeModal} className={btnCancel}>Cancelar</button>
            <button type="submit" className={btnPrimary}>Añadir</button>
          </div>
        </form>
      </ModalContainer>
    );
  }

  // ─── Nuevo Hábito ─────────────────────────────────────────────────────────
  if (activeModal === 'habito') {
    const { addHabito } = useData();
    const [form, setForm] = useState({ nombre: '', icono: '⭐', color: '#8aa7ec', frecuencia: 7 });
    const iconOptions = ['⭐', '💪', '📚', '🏃', '🥗', '💧', '🧘', '😴', '🎯', '✍️'];

    const handleSubmit = (e) => {
      e.preventDefault();
      // Desenfoque de input color para forzar cierre del diálogo nativo en algunos SO
      if (document.activeElement && document.activeElement.type === 'color') {
        document.activeElement.blur();
      }
      addHabito(form);
      closeModal();
    };

    return (
      <ModalContainer title="📊 Nuevo hábito" onClose={closeModal}>
        <form onSubmit={handleSubmit} className="tw-flex tw-flex-col tw-gap-4">
          <div className="tw-flex tw-flex-col tw-gap-1">
            <label className={labelCls}>Nombre del hábito</label>
            <input type="text" placeholder="Ej: Hacer ejercicio, Leer 30 min..." className={inputCls} required
              value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
          </div>
          <div className="tw-flex tw-flex-col tw-gap-2">
            <label className={labelCls}>Ícono</label>
            <div className="tw-flex tw-flex-wrap tw-gap-2">
              {iconOptions.map(ico => (
                <button type="button" key={ico}
                  onClick={() => setForm({ ...form, icono: ico })}
                  className={`tw-w-9 tw-h-9 tw-rounded-lg tw-text-lg tw-flex tw-items-center tw-justify-center tw-border tw-transition-all ${form.icono === ico ? 'tw-border-[#8aa7ec] tw-bg-[#8aa7ec]/10' : 'tw-border-gray-200 dark:tw-border-white/10 hover:tw-bg-gray-50 dark:hover:tw-bg-white/5'}`}>
                  {ico}
                </button>
              ))}
            </div>
          </div>
          <div className="tw-grid tw-grid-cols-2 tw-gap-4">
            <div className="tw-flex tw-flex-col tw-gap-1">
              <label className={labelCls}>Frecuencia semanal</label>
              <select className={inputAltCls}
                value={form.frecuencia} onChange={e => setForm({ ...form, frecuencia: parseInt(e.target.value) })}>
                <option value="1">1 vez</option>
                <option value="2">2 veces</option>
                <option value="3">3 veces</option>
                <option value="4">4 veces</option>
                <option value="5">5 veces</option>
                <option value="6">6 veces</option>
                <option value="7">Todos los días</option>
              </select>
            </div>
            <div className="tw-flex tw-flex-col tw-gap-1">
              <label className={labelCls}>Color</label>
              <input type="color" className="tw-w-full tw-h-9 tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-md tw-cursor-pointer"
                value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} />
            </div>
          </div>
          <div className="tw-flex tw-justify-end tw-gap-2 tw-mt-2">
            <button type="button" onClick={closeModal} className={btnCancel}>Cancelar</button>
            <button type="submit" className={btnPrimary}>Crear hábito</button>
          </div>
        </form>
      </ModalContainer>
    );
  }

  // ─── Nueva Notificación ───────────────────────────────────────────────────
  if (activeModal === 'notificacion') {
    const { addNotificacion } = useData();
    const [form, setForm] = useState({ tipo: 'info', titulo: '', mensaje: '' });

    const handleSubmit = (e) => {
      e.preventDefault();
      addNotificacion(form);
      closeModal();
    };

    return (
      <ModalContainer title="🔔 Nueva notificación" onClose={closeModal}>
        <form onSubmit={handleSubmit} className="tw-flex tw-flex-col tw-gap-4">
          <div className="tw-flex tw-flex-col tw-gap-1">
            <label className={labelCls}>Tipo de notificación</label>
            <select className={inputAltCls} value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}>
              <option value="info">ℹ️ Información</option>
              <option value="alerta">🔴 Alerta</option>
              <option value="tarea">✅ Tarea</option>
            </select>
          </div>
          <div className="tw-flex tw-flex-col tw-gap-1">
            <label className={labelCls}>Título</label>
            <input type="text" placeholder="Título de la notificación" className={inputCls} required
              value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} />
          </div>
          <div className="tw-flex tw-flex-col tw-gap-1">
            <label className={labelCls}>Mensaje</label>
            <textarea rows="3" placeholder="Detalles del mensaje..." className={`${inputAltCls} tw-resize-none`}
              value={form.mensaje} onChange={e => setForm({ ...form, mensaje: e.target.value })} />
          </div>
          <div className="tw-flex tw-justify-end tw-gap-2 tw-mt-2">
            <button type="button" onClick={closeModal} className={btnCancel}>Cancelar</button>
            <button type="submit" className={btnPrimary}>Enviar</button>
          </div>
        </form>
      </ModalContainer>
    );
  }

  return null;
}
