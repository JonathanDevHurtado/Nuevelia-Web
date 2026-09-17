import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import { useAuth } from './AuthContext.jsx';
import { apiFetch } from '../api/client.js';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

// Helper to load from localStorage with fallback
function loadState(key, fallback) {
  try {
    const raw = localStorage.getItem(`nuvelia_${key}`);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

// Helper to save to localStorage
function saveState(key, value) {
  try {
    localStorage.setItem(`nuvelia_${key}`, JSON.stringify(value));
  } catch {}
}

export function DataProvider({ children }) {
  // ─── State ───────────────────────────────────────────────────────────────
  const [tareas, setTareas] = useState(() => loadState('tareas', []));
  const [eventos, setEventos] = useState(() => loadState('eventos', []));
  const [transacciones, setTransacciones] = useState(() => loadState('transacciones', []));
  const [compras, setCompras] = useState(() => loadState('compras', []));
  const [habitos, setHabitos] = useState(() => loadState('habitos', []));
  const { user, isAuthenticated } = useAuth();
  const [perfil, setPerfil] = useState(() => {
    const saved = loadState('perfil', { nombre: 'Invitado', email: '__guest__', moneda: 'mxn' });
    return user ? { ...saved, ...user } : saved;
  });
  const [notificaciones, setNotificaciones] = useState(() => loadState('notificaciones', []));
  const notifFiredRef = useRef(new Set(loadState('notif_fired', [])));

  // ─── Persist to localStorage ─────────────────────────────────────────────
  useEffect(() => saveState('tareas', tareas), [tareas]);
  useEffect(() => saveState('eventos', eventos), [eventos]);
  useEffect(() => saveState('transacciones', transacciones), [transacciones]);
  useEffect(() => saveState('compras', compras), [compras]);
  useEffect(() => saveState('habitos', habitos), [habitos]);
  useEffect(() => saveState('perfil', perfil), [perfil]);
  useEffect(() => saveState('notificaciones', notificaciones), [notificaciones]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    setPerfil(prev => ({ ...prev, ...user }));

    const loadServerData = async () => {
      try {
        const response = await apiFetch('/api/data/all');
        setTareas(response.tareas || []);
        setEventos(response.eventos || []);
        setTransacciones(response.transacciones || []);
        setCompras(response.compras || []);
        setHabitos(response.habitos || []);
        setNotificaciones(response.notificaciones || []);
      } catch (error) {
        console.error('Error al cargar datos del servidor:', error);
      }
    };

    loadServerData();
  }, [isAuthenticated, user]);

  // ─── Unique ID generator ─────────────────────────────────────────────────
  const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  const createServerItem = async (type, item, updateLocal) => {
    if (!isAuthenticated) {
      updateLocal(item);
      return item;
    }

    try {
      const saved = await apiFetch(`/api/data/${type}`, {
        method: 'POST',
        body: JSON.stringify(item),
      });
      updateLocal(saved);
      return saved;
    } catch (error) {
      console.error(`Error al crear ${type}:`, error);
      updateLocal(item);
      return item;
    }
  };

  const updateServerItem = async (type, id, changes, updateLocal) => {
    if (!isAuthenticated) {
      updateLocal(changes);
      return;
    }

    try {
      const updated = await apiFetch(`/api/data/${type}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(changes),
      });
      updateLocal(updated);
    } catch (error) {
      console.error(`Error al actualizar ${type} ${id}:`, error);
      updateLocal(changes);
    }
  };

  const deleteServerItem = async (type, id, updateLocal) => {
    if (!isAuthenticated) {
      updateLocal(id);
      return;
    }

    try {
      await apiFetch(`/api/data/${type}/${id}`, {
        method: 'DELETE',
      });
      updateLocal(id);
    } catch (error) {
      console.error(`Error al eliminar ${type} ${id}:`, error);
      updateLocal(id);
    }
  };

  // ─── TAREAS ──────────────────────────────────────────────────────────────
  const addTarea = ({ texto, prioridad = 'media', fechaLimite = '', hora = '', descripcion = '' }) => {
    setTareas(prev => [
      { id: uid(), texto, prioridad, fechaLimite, hora, descripcion, completada: false, createdAt: new Date().toISOString() },
      ...prev
    ]);
  };

  const toggleTarea = (id) => {
    setTareas(prev => prev.map(t => t.id === id ? { ...t, completada: !t.completada } : t));
  };

  const deleteTarea = (id) => {
    setTareas(prev => prev.filter(t => t.id !== id));
  };

  // ─── AUTO-NOTIFICACIONES POR HORA DE TAREA Y EVENTOS ──────────────────────
  const tareasRef = useRef(tareas);
  const eventosRef = useRef(eventos);
  
  useEffect(() => {
    tareasRef.current = tareas;
  }, [tareas]);
  
  useEffect(() => {
    eventosRef.current = eventos;
  }, [eventos]);

  useEffect(() => {
    const checkTaskAlerts = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const todayStr = `${year}-${month}-${day}`;
      const currentHHMM = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

      let changed = false;
      
      tareasRef.current.forEach(t => {
        if (!t.completada && t.hora && t.fechaLimite === todayStr) {
          const fireKey = `tarea_${t.id}_${t.fechaLimite}_${t.hora}`;
          if (t.hora === currentHHMM && !notifFiredRef.current.has(fireKey)) {
            notifFiredRef.current.add(fireKey);
            changed = true;
            const newNotif = {
              id: `notif_${Date.now()}_${Math.random().toString(36).slice(2,5)}`,
              tipo: 'tarea',
              titulo: 'Recordatorio de tarea',
              mensaje: t.texto,
              hora: t.hora,
              fecha: todayStr,
              leida: false,
              createdAt: new Date().toISOString(),
            };
            setNotificaciones(prev => [newNotif, ...prev]);
          }
        }
      });
      
      eventosRef.current.forEach(e => {
        if (e.hora && e.fecha === todayStr) {
          const fireKey = `evento_${e.id}_${e.fecha}_${e.hora}`;
          if (e.hora === currentHHMM && !notifFiredRef.current.has(fireKey)) {
            notifFiredRef.current.add(fireKey);
            changed = true;
            const newNotif = {
              id: `notif_${Date.now()}_${Math.random().toString(36).slice(2,5)}`,
              tipo: 'evento',
              titulo: 'Evento programado',
              mensaje: e.titulo,
              hora: e.hora,
              fecha: todayStr,
              leida: false,
              createdAt: new Date().toISOString(),
            };
            setNotificaciones(prev => [newNotif, ...prev]);
          }
        }
      });
      
      if (changed) {
        saveState('notif_fired', [...notifFiredRef.current]);
      }
    };

    checkTaskAlerts();
    const interval = setInterval(checkTaskAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  // ─── NOTIFICACIONES ──────────────────────────────────────────────────────
  const addNotificacion = (notif) => {
    setNotificaciones(prev => [
      { id: uid(), leida: false, createdAt: new Date().toISOString(), ...notif },
      ...prev
    ]);
  };
  const deleteNotificacion = (id) => setNotificaciones(prev => prev.filter(n => n.id !== id));
  const markNotifRead = (id) => setNotificaciones(prev => prev.map(n => n.id === id ? { ...n, leida: true } : n));
  const markAllRead = () => setNotificaciones(prev => prev.map(n => ({ ...n, leida: true })));
  const clearAllNotificaciones = () => setNotificaciones([]);

  // ─── EVENTOS ─────────────────────────────────────────────────────────────
  const addEvento = ({ titulo, fecha, hora, descripcion = '' }) => {
    setEventos(prev => [
      { id: uid(), titulo, fecha, hora, descripcion, createdAt: new Date().toISOString() },
      ...prev
    ]);
  };

  const deleteEvento = (id) => {
    setEventos(prev => prev.filter(e => e.id !== id));
  };

  // ─── TRANSACCIONES ───────────────────────────────────────────────────────
  const addTransaccion = ({ descripcion, monto, tipo, categoria, fecha }) => {
    setTransacciones(prev => [
      { id: uid(), descripcion, monto: parseFloat(monto), tipo, categoria, fecha, createdAt: new Date().toISOString() },
      ...prev
    ]);
  };

  const deleteTransaccion = (id) => {
    setTransacciones(prev => prev.filter(t => t.id !== id));
  };

  // Financial computed values
  const currentMonth = new Date().toISOString().slice(0, 7);

  const ingresosMes = transacciones
    .filter(t => t.tipo === 'ingreso' && t.fecha && t.fecha.startsWith(currentMonth))
    .reduce((sum, t) => sum + t.monto, 0);

  const gastosMes = transacciones
    .filter(t => t.tipo === 'gasto' && t.fecha && t.fecha.startsWith(currentMonth))
    .reduce((sum, t) => sum + t.monto, 0);

  const balance = transacciones.reduce((sum, t) => t.tipo === 'ingreso' ? sum + t.monto : sum - t.monto, 0);

  // ─── COMPRAS ─────────────────────────────────────────────────────────────
  const addCompra = ({ producto, cantidad, categoria, tienda }) => {
    setCompras(prev => [
      { id: uid(), producto, cantidad, categoria, tienda, completada: false, createdAt: new Date().toISOString() },
      ...prev
    ]);
  };

  const toggleCompra = (id) => {
    setCompras(prev => prev.map(c => c.id === id ? { ...c, completada: !c.completada } : c));
  };

  const deleteCompra = (id) => {
    setCompras(prev => prev.filter(c => c.id !== id));
  };

  const clearComprasCompletadas = () => {
    setCompras(prev => prev.filter(c => !c.completada));
  };

  // ─── HÁBITOS ─────────────────────────────────────────────────────────────
  const addHabito = ({ nombre, icono = '⭐', color = '#8aa7ec', frecuencia = 7 }) => {
    const weekDays = ['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom'];
    const tracker = {};
    weekDays.forEach(d => (tracker[d] = false));
    setHabitos(prev => [
      { id: uid(), nombre, icono, color, frecuencia: parseInt(frecuencia) || 7, tracker, createdAt: new Date().toISOString() },
      ...prev
    ]);
  };

  const toggleHabitoDay = (habitoId, day) => {
    setHabitos(prev =>
      prev.map(h =>
        h.id === habitoId ? { ...h, tracker: { ...h.tracker, [day]: !h.tracker[day] } } : h
      )
    );
  };

  const deleteHabito = (id) => {
    setHabitos(prev => prev.filter(h => h.id !== id));
  };

  // ─── PERFIL ──────────────────────────────────────────────────────────────
  const updatePerfil = async (data) => {
    setPerfil(prev => ({ ...prev, ...data }));

    if (!isAuthenticated) {
      return;
    }

    try {
      const response = await apiFetch('/api/user/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      setPerfil(response.perfil);
    } catch (error) {
      console.error('Error al actualizar perfil en el servidor:', error);
    }
  };

  // ─── EXPORTAR DATOS ──────────────────────────────────────────────────────
  const exportarExcel = () => {
    try {
      const wb = XLSX.utils.book_new();
      const currency = perfil.moneda === 'usd' ? '$' : perfil.moneda === 'eur' ? '€' : '$';

      // Helper: set column widths
      const setColWidths = (ws, widths) => {
        ws['!cols'] = widths.map(w => ({ wch: w }));
      };

      // Helper: style header row (bold + background)
      const styleHeader = (ws, numCols) => {
        for (let c = 0; c < numCols; c++) {
          const addr = XLSX.utils.encode_cell({ r: 0, c });
          if (ws[addr]) {
            ws[addr].s = {
              font: { bold: true, color: { rgb: 'FFFFFF' } },
              fill: { fgColor: { rgb: '7C3AED' } },
              alignment: { horizontal: 'center' }
            };
          }
        }
      };

      // Helper: format date
      const fmtDate = (d) => {
        if (!d) return '';
        try { return new Date(d).toLocaleDateString('es-CO', { year: 'numeric', month: '2-digit', day: '2-digit' }); }
        catch { return d; }
      };
      const fmtDateTime = (d) => {
        if (!d) return '';
        try { return new Date(d).toLocaleString('es-CO', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }); }
        catch { return d; }
      };

      // ── RESUMEN ──────────────────────────────────────────────────────────
      const totalIngresos = transacciones.filter(t => t.tipo === 'ingreso').reduce((s, t) => s + (parseFloat(t.monto) || 0), 0);
      const totalGastos = transacciones.filter(t => t.tipo === 'gasto').reduce((s, t) => s + (parseFloat(t.monto) || 0), 0);
      const tareasCompletadas = tareas.filter(t => t.completada).length;
      const comprasCompletadas = compras.filter(c => c.completada).length;
      const habitosActivos = habitos.filter(h => {
        if (!h.tracker) return false;
        return Object.values(h.tracker).some(v => v);
      }).length;

      const resumenData = [
        { Concepto: 'Fecha de exportación', Valor: fmtDateTime(new Date()) },
        { Concepto: '', Valor: '' },
        { Concepto: '─── RESUMEN GENERAL ───', Valor: '' },
        { Concepto: 'Total tareas', Valor: tareas.length },
        { Concepto: 'Tareas completadas', Valor: tareasCompletadas },
        { Concepto: 'Tareas pendientes', Valor: tareas.length - tareasCompletadas },
        { Concepto: '', Valor: '' },
        { Concepto: 'Total eventos (Agenda)', Valor: eventos.length },
        { Concepto: '', Valor: '' },
        { Concepto: 'Total transacciones', Valor: transacciones.length },
        { Concepto: 'Ingresos totales', Valor: `${currency} ${totalIngresos.toLocaleString('es-CO', { minimumFractionDigits: 2 })}` },
        { Concepto: 'Gastos totales', Valor: `${currency} ${totalGastos.toLocaleString('es-CO', { minimumFractionDigits: 2 })}` },
        { Concepto: 'Balance', Valor: `${currency} ${(totalIngresos - totalGastos).toLocaleString('es-CO', { minimumFractionDigits: 2 })}` },
        { Concepto: '', Valor: '' },
        { Concepto: 'Total compras', Valor: compras.length },
        { Concepto: 'Compras realizadas', Valor: comprasCompletadas },
        { Concepto: '', Valor: '' },
        { Concepto: 'Total hábitos', Valor: habitos.length },
        { Concepto: 'Hábitos activos esta semana', Valor: habitosActivos },
        { Concepto: '', Valor: '' },
        { Concepto: 'Total notificaciones', Valor: notificaciones.length },
      ];
      const wsResumen = XLSX.utils.json_to_sheet(resumenData);
      setColWidths(wsResumen, [35, 30]);
      XLSX.utils.book_append_sheet(wb, wsResumen, "Resumen");

      // ── TAREAS ───────────────────────────────────────────────────────────
      const tareasSorted = [...tareas].sort((a, b) => {
        if (a.completada !== b.completada) return a.completada ? 1 : -1;
        const da = a.fechaLimite ? new Date(a.fechaLimite) : null;
        const db = b.fechaLimite ? new Date(b.fechaLimite) : null;
        if (da && db) return da - db;
        if (da) return -1;
        if (db) return 1;
        return 0;
      });
      const tareasData = tareasSorted.map((t, i) => ({
        '#': i + 1,
        Tarea: t.texto,
        Prioridad: t.prioridad ? t.prioridad.charAt(0).toUpperCase() + t.prioridad.slice(1) : '',
        'Fecha Límite': fmtDate(t.fechaLimite),
        Hora: t.hora || '',
        Descripción: t.descripcion || '',
        Estado: t.completada ? '✓ Completada' : '○ Pendiente',
        'Fecha Creación': fmtDateTime(t.createdAt),
      }));
      const wsTareas = XLSX.utils.json_to_sheet(tareasData.length > 0 ? tareasData : [{ Mensaje: 'Sin tareas registradas' }]);
      setColWidths(wsTareas, [5, 35, 12, 15, 8, 30, 15, 20]);
      XLSX.utils.book_append_sheet(wb, wsTareas, "Tareas");

      // ── AGENDA ───────────────────────────────────────────────────────────
      const eventosSorted = [...eventos].sort((a, b) => {
        const da = a.fecha ? new Date(a.fecha) : null;
        const db = b.fecha ? new Date(b.fecha) : null;
        if (da && db) return da - db;
        if (da) return -1;
        if (db) return 1;
        return 0;
      });
      const eventosData = eventosSorted.map((e, i) => ({
        '#': i + 1,
        Evento: e.titulo,
        Fecha: fmtDate(e.fecha),
        Hora: e.hora || '',
        Descripción: e.descripcion || '',
        'Fecha Creación': fmtDateTime(e.createdAt),
      }));
      const wsEventos = XLSX.utils.json_to_sheet(eventosData.length > 0 ? eventosData : [{ Mensaje: 'Sin eventos registrados' }]);
      setColWidths(wsEventos, [5, 30, 15, 8, 30, 20]);
      XLSX.utils.book_append_sheet(wb, wsEventos, "Agenda");

      // ── FINANZAS ─────────────────────────────────────────────────────────
      const transSorted = [...transacciones].sort((a, b) => {
        const da = a.fecha ? new Date(a.fecha) : null;
        const db = b.fecha ? new Date(b.fecha) : null;
        if (da && db) return da - db;
        if (da) return -1;
        if (db) return 1;
        return 0;
      });
      const transData = transSorted.map((t, i) => ({
        '#': i + 1,
        Descripción: t.descripcion,
        Monto: parseFloat(t.monto) || 0,
        Tipo: t.tipo === 'ingreso' ? '● Ingreso' : '● Gasto',
        Categoría: t.categoria || '',
        Fecha: fmtDate(t.fecha),
        'Fecha Creación': fmtDateTime(t.createdAt),
      }));
      const wsTrans = XLSX.utils.json_to_sheet(transData.length > 0 ? transData : [{ Mensaje: 'Sin transacciones registradas' }]);
      setColWidths(wsTrans, [5, 30, 15, 15, 18, 15, 20]);
      XLSX.utils.book_append_sheet(wb, wsTrans, "Finanzas");

      // ── COMPRAS ──────────────────────────────────────────────────────────
      const comprasSorted = [...compras].sort((a, b) => {
        if (a.completada !== b.completada) return a.completada ? 1 : -1;
        return 0;
      });
      const comprasData = comprasSorted.map((c, i) => ({
        '#': i + 1,
        Producto: c.producto,
        Cantidad: c.cantidad || 1,
        Categoría: c.categoria || '',
        Tienda: c.tienda || '',
        Estado: c.completada ? '✓ Comprado' : '○ Pendiente',
        'Fecha Creación': fmtDateTime(c.createdAt),
      }));
      const wsCompras = XLSX.utils.json_to_sheet(comprasData.length > 0 ? comprasData : [{ Mensaje: 'Sin compras registradas' }]);
      setColWidths(wsCompras, [5, 30, 10, 18, 20, 15, 20]);
      XLSX.utils.book_append_sheet(wb, wsCompras, "Compras");

      // ── HÁBITOS ──────────────────────────────────────────────────────────
      const habitosData = habitos.map((h, i) => {
        const row = {
          '#': i + 1,
          Hábito: h.nombre,
          Frecuencia: h.frecuencia ? h.frecuencia.charAt(0).toUpperCase() + h.frecuencia.slice(1) : '',
        };
        const weekDays = ['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom'];
        weekDays.forEach(d => {
          row[d.charAt(0).toUpperCase() + d.slice(1)] = h.tracker && h.tracker[d] ? '✓' : '○';
        });
        row['Racha actual'] = h.streak || 0;
        row['Fecha Creación'] = fmtDateTime(h.createdAt);
        return row;
      });
      const wsHabitos = XLSX.utils.json_to_sheet(habitosData.length > 0 ? habitosData : [{ Mensaje: 'Sin hábitos registrados' }]);
      setColWidths(wsHabitos, [5, 25, 12, 6, 6, 6, 6, 6, 6, 6, 12, 20]);
      XLSX.utils.book_append_sheet(wb, wsHabitos, "Hábitos");

      // ── NOTIFICACIONES ───────────────────────────────────────────────────
      const notifsSorted = [...notificaciones].sort((a, b) => {
        const da = a.createdAt ? new Date(a.createdAt) : null;
        const db = b.createdAt ? new Date(b.createdAt) : null;
        if (da && db) return db - da;
        if (da) return -1;
        if (db) return 1;
        return 0;
      });
      const notifsData = notifsSorted.map((n, i) => ({
        '#': i + 1,
        Título: n.titulo || '',
        Mensaje: n.mensaje || n.message || '',
        Tipo: n.tipo || '',
        Estado: n.leida ? 'Leída' : 'No leída',
        'Fecha': fmtDateTime(n.createdAt),
      }));
      const wsNotifs = XLSX.utils.json_to_sheet(notifsData.length > 0 ? notifsData : [{ Mensaje: 'Sin notificaciones' }]);
      setColWidths(wsNotifs, [5, 25, 40, 15, 12, 20]);
      XLSX.utils.book_append_sheet(wb, wsNotifs, "Notificaciones");

      // Save with timestamp
      const timestamp = new Date().toISOString().slice(0, 10);
      XLSX.writeFile(wb, `Nuvelia_Datos_${timestamp}.xlsx`);
    } catch (error) {
      console.error('Error al exportar:', error);
      alert("Hubo un error al exportar los datos a Excel.");
    }
  };

  // ─── BORRAR TODOS LOS DATOS ──────────────────────────────────────────────
  const borrarTodoLosDatos = () => {
    if (window.confirm('¿Estás seguro? Se borrarán todas tus tareas, transacciones, compras y hábitos. Esta acción no se puede deshacer.')) {
      setTareas([]);
      setEventos([]);
      setTransacciones([]);
      setCompras([]);
      setHabitos([]);
      setPerfil({ nombre: 'Invitado', email: '__guest__', moneda: 'mxn' });
    }
  };

  const value = {
    // State
    tareas, eventos, transacciones, compras, habitos, perfil, notificaciones,
    // Computed
    ingresosMes, gastosMes, balance,
    // Tareas
    addTarea, toggleTarea, deleteTarea,
    // Eventos
    addEvento, deleteEvento,
    // Transacciones
    addTransaccion, deleteTransaccion,
    // Compras
    addCompra, toggleCompra, deleteCompra, clearComprasCompletadas,
    // Hábitos
    addHabito, toggleHabitoDay, deleteHabito,
    // Notificaciones
    addNotificacion, deleteNotificacion, markNotifRead, markAllRead, clearAllNotificaciones,
    // Perfil
    updatePerfil,
    // Utils
    exportarExcel, borrarTodoLosDatos,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
