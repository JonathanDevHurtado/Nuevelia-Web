import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import { useData } from '../context/DataContext';
import { User, Mail, DollarSign, Download, Trash2, Moon, Bell, Bot, Mic, MonitorSmartphone, Shield, Check, Camera, Lock, Key } from 'lucide-react';

export default function Configuracion() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { perfil, updatePerfil, exportarExcel, borrarTodoLosDatos } = useData();
  
  const [formData, setFormData] = useState({
    nombre: perfil.nombre || '',
    email: perfil.email || '',
    moneda: perfil.moneda || 'mxn',
    avatar: perfil.avatar || null
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [saved, setSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  useEffect(() => {
    setFormData({
      nombre: perfil.nombre || '',
      email: perfil.email || '',
      moneda: perfil.moneda || 'mxn',
      avatar: perfil.avatar || null
    });
  }, [perfil.nombre, perfil.email, perfil.moneda, perfil.avatar]);

  const isGuest = !perfil.nombre || perfil.nombre.toLowerCase() === 'invitado' || !perfil.email || perfil.email === '__guest__';

  const handleSaveProfile = async () => {
    if (!formData.nombre || !formData.email) {
      alert('Por favor completa los campos con tu nombre y un correo válido.');
      return;
    }

    try {
      await updatePerfil(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      alert(error.message || 'No se pudo guardar el perfil.');
    }
  };

  const handleToggle = (key) => {
    updatePerfil({ [key]: perfil[key] === false ? true : false });
  };

  const handleAssistantType = (type) => {
    updatePerfil({ assistantType: type });
  };

  const Switch = ({ checked, onChange, disabled }) => (
    <button 
      type="button"
      onClick={onChange}
      disabled={disabled}
      className={`tw-relative tw-w-11 tw-h-6 tw-rounded-full tw-transition-colors tw-duration-300 tw-shrink-0 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#8aa7ec] focus:tw-ring-offset-2 dark:focus:tw-ring-offset-[#1a1a18] ${disabled ? 'tw-opacity-50 tw-cursor-not-allowed' : 'tw-cursor-pointer'} ${checked ? 'tw-bg-[#8aa7ec]' : 'tw-bg-gray-200 dark:tw-bg-white/10'}`}
    >
      <div className={`tw-absolute tw-top-[2px] tw-left-[2px] tw-bg-white tw-w-5 tw-h-5 tw-rounded-full tw-shadow-md tw-transition-transform tw-duration-300 ${checked ? 'tw-translate-x-[20px]' : 'tw-translate-x-0'}`}></div>
    </button>
  );

  return (
    <div className="page active tw-flex tw-flex-col tw-h-full tw-overflow-y-auto tw-pb-10">
      {/* Header */}
      <div className="tw-mb-8">
        <h1 className="tw-text-[28px] tw-font-extrabold tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-tracking-tight tw-flex tw-items-center tw-gap-3">
          <div className="tw-w-10 tw-h-10 tw-rounded-xl tw-bg-gradient-to-br tw-from-gray-800 tw-to-gray-600 dark:tw-from-gray-100 dark:tw-to-gray-300 tw-flex tw-items-center tw-justify-center tw-shadow-lg">
            <MonitorSmartphone className="tw-text-white dark:tw-text-gray-900" size={20} />
          </div>
          Configuración
        </h1>
        <p className="tw-text-sm tw-text-gray-500 dark:tw-text-[#ccc] tw-mt-2">
          Ajusta tus preferencias, gestiona tus datos y personaliza a Nuvelia.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-gap-8 tw-items-start">
        
        {/* Col 1: Perfil y Datos */}
        <div className="lg:tw-col-span-7 tw-flex tw-flex-col tw-gap-8">
          
          {/* Perfil Card */}
          <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-p-6 tw-shadow-sm hover:tw-shadow-md tw-transition-shadow tw-relative tw-overflow-hidden">
            {isGuest ? (
              <div className="tw-flex tw-flex-col tw-items-center tw-text-center tw-py-6 tw-px-2">
                <div className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-32 tw-bg-gradient-to-b tw-from-blue-50/50 tw-to-transparent dark:tw-from-blue-900/10"></div>
                
                <div className="tw-w-20 tw-h-20 tw-rounded-2xl tw-bg-gradient-to-br tw-from-[#8aa7ec] tw-to-[#6d8bcf] tw-flex tw-items-center tw-justify-center tw-mb-5 tw-shadow-lg tw-shadow-blue-500/20 tw-relative tw-z-10">
                  <User size={36} className="tw-text-white" />
                </div>
                
                <h3 className="tw-text-[22px] tw-font-extrabold tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-mb-2 tw-relative tw-z-10">Crear cuenta</h3>
                <p className="tw-text-[14px] tw-text-gray-500 dark:tw-text-[#888] tw-mb-8 tw-max-w-md tw-leading-relaxed tw-relative tw-z-10">
                  Ingresa tus datos para personalizar tu experiencia en Nuvelia. Tu información se guarda de forma segura en tu dispositivo.
                </p>
                
                <div className="tw-w-full tw-max-w-sm tw-space-y-5 tw-text-left tw-relative tw-z-10">
                  <div className="tw-flex tw-flex-col tw-gap-1.5">
                    <label className="tw-text-[12px] tw-font-bold tw-text-gray-700 dark:tw-text-[#ccc] tw-uppercase tw-tracking-wider">Tu Nombre</label>
                    <div className="tw-relative">
                      <User className="tw-absolute tw-left-3.5 tw-top-1/2 -tw-translate-y-1/2 tw-text-gray-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Ej. Juan Pérez"
                        value={formData.nombre === 'Invitado' ? '' : formData.nombre}
                        onChange={e => setFormData({...formData, nombre: e.target.value})}
                        className="tw-w-full tw-pl-11 tw-pr-4 tw-py-3 tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-xl tw-text-[14px] focus:tw-border-[#8aa7ec] focus:tw-ring-2 focus:tw-ring-[#8aa7ec]/20 focus:tw-outline-none tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-transition-all" 
                      />
                    </div>
                  </div>
                  
                  <div className="tw-flex tw-flex-col tw-gap-1.5">
                    <label className="tw-text-[12px] tw-font-bold tw-text-gray-700 dark:tw-text-[#ccc] tw-uppercase tw-tracking-wider">Correo Electrónico</label>
                    <div className="tw-relative">
                      <Mail className="tw-absolute tw-left-3.5 tw-top-1/2 -tw-translate-y-1/2 tw-text-gray-400" size={18} />
                      <input 
                        type="email" 
                        placeholder="tucorreo@ejemplo.com"
                        value={formData.email === '__guest__' ? '' : formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="tw-w-full tw-pl-11 tw-pr-4 tw-py-3 tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-xl tw-text-[14px] focus:tw-border-[#8aa7ec] focus:tw-ring-2 focus:tw-ring-[#8aa7ec]/20 focus:tw-outline-none tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-transition-all" 
                      />
                    </div>
                  </div>

                  <div className="tw-flex tw-flex-col tw-gap-1.5">
                    <label className="tw-text-[12px] tw-font-bold tw-text-gray-700 dark:tw-text-[#ccc] tw-uppercase tw-tracking-wider">Moneda Principal</label>
                    <div className="tw-relative">
                      <DollarSign className="tw-absolute tw-left-3.5 tw-top-1/2 -tw-translate-y-1/2 tw-text-gray-400" size={18} />
                      <select 
                        value={formData.moneda}
                        onChange={e => setFormData({...formData, moneda: e.target.value})}
                        className="tw-w-full tw-pl-11 tw-pr-10 tw-py-3 tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-xl tw-text-[14px] focus:tw-border-[#8aa7ec] focus:tw-ring-2 focus:tw-ring-[#8aa7ec]/20 focus:tw-outline-none tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-transition-all tw-appearance-none"
                      >
                        <option value="mxn">Peso Mexicano (MXN)</option>
                        <option value="usd">Dólar Estadounidense (USD)</option>
                        <option value="eur">Euro (EUR)</option>
                        <option value="ars">Peso Argentino (ARS)</option>
                        <option value="cop">Peso Colombiano (COP)</option>
                      </select>
                    </div>
                  </div>

                  <div className="tw-pt-3">
                    <button 
                      onClick={() => {
                        if (formData.nombre && formData.email && formData.nombre.toLowerCase() !== 'invitado' && formData.email !== '__guest__') {
                          handleSaveProfile();
                        } else {
                          alert('Por favor completa los campos con tu nombre y un correo válido.');
                        }
                      }}
                      className="tw-w-full tw-flex tw-items-center tw-justify-center tw-gap-2 tw-bg-gradient-to-r tw-from-[#8aa7ec] tw-to-[#6d8bcf] hover:tw-from-[#7896dc] hover:tw-to-[#5c7abe] tw-text-white tw-shadow-lg tw-shadow-[#8aa7ec]/30 tw-rounded-xl tw-px-6 tw-py-3.5 tw-text-[15px] tw-font-bold tw-transition-all active:tw-scale-95"
                    >
                      Registrarme ahora
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-justify-between tw-mb-8 tw-gap-4">
                  <div className="tw-flex tw-items-center tw-gap-3">
                    <div className="tw-w-8 tw-h-8 tw-rounded-lg tw-bg-blue-50 dark:tw-bg-blue-500/10 tw-flex tw-items-center tw-justify-center tw-text-blue-500">
                      <User size={18} />
                    </div>
                    <h3 className="tw-text-[16px] tw-font-bold tw-text-gray-800 dark:tw-text-[#f4f1ec]">Perfil de usuario</h3>
                  </div>

                  {/* Avatar Upload */}
                  <div className="tw-flex tw-items-center tw-gap-4">
                    <div className="tw-relative tw-group">
                      <div className="tw-w-16 tw-h-16 tw-rounded-full tw-bg-gradient-to-br tw-from-[#85BEFF] tw-to-[#C7BBF5] tw-flex tw-items-center tw-justify-center tw-text-white tw-text-[24px] tw-font-bold tw-overflow-hidden tw-shadow-md">
                        {formData.avatar ? (
                          <img src={formData.avatar} alt="Avatar" className="tw-w-full tw-h-full tw-object-cover" />
                        ) : (
                          formData.nombre ? formData.nombre.charAt(0).toUpperCase() : 'I'
                        )}
                      </div>
                      <label className="tw-absolute -tw-bottom-1 -tw-right-1 tw-w-7 tw-h-7 tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-200 dark:tw-border-[#333] tw-rounded-full tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-shadow-sm hover:tw-bg-gray-50 dark:hover:tw-bg-[#1a1a1a] tw-transition-colors">
                        <Camera size={12} className="tw-text-gray-600 dark:tw-text-[#ccc]" />
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="tw-hidden" 
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                const newAvatar = reader.result;
                                setFormData({...formData, avatar: newAvatar});
                                // Guardar inmediatamente al perfil global
                                updatePerfil({ avatar: newAvatar });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div className="tw-hidden sm:tw-block">
                      <p className="tw-text-[12px] tw-font-bold tw-text-gray-700 dark:tw-text-[#ccc]">Foto de perfil</p>
                      <p className="tw-text-[10px] tw-text-gray-400">PNG, JPG hasta 5MB</p>
                    </div>
                  </div>
                </div>
                
                <div className="tw-space-y-5">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-5">
                  <div className="tw-flex tw-flex-col tw-gap-2">
                    <label className="tw-text-[12px] tw-text-gray-500 dark:tw-text-[#888] tw-font-semibold tw-uppercase tw-tracking-wider">Nombre</label>
                    <div className="tw-relative">
                      <User className="tw-absolute tw-left-3 tw-top-1/2 -tw-translate-y-1/2 tw-text-gray-400" size={16} />
                      <input 
                        type="text" 
                        value={formData.nombre}
                        onChange={e => setFormData({...formData, nombre: e.target.value})}
                        className="tw-w-full tw-pl-10 tw-pr-4 tw-py-2.5 tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-xl tw-text-[14px] focus:tw-border-[#8aa7ec] focus:tw-ring-1 focus:tw-ring-[#8aa7ec] focus:tw-outline-none tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-transition-all" 
                      />
                    </div>
                  </div>
                  <div className="tw-flex tw-flex-col tw-gap-2">
                    <label className="tw-text-[12px] tw-text-gray-500 dark:tw-text-[#888] tw-font-semibold tw-uppercase tw-tracking-wider">Email</label>
                    <div className="tw-relative">
                      <Mail className="tw-absolute tw-left-3 tw-top-1/2 -tw-translate-y-1/2 tw-text-gray-400" size={16} />
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="tw-w-full tw-pl-10 tw-pr-4 tw-py-2.5 tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-xl tw-text-[14px] focus:tw-border-[#8aa7ec] focus:tw-ring-1 focus:tw-ring-[#8aa7ec] focus:tw-outline-none tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-transition-all" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="tw-flex tw-flex-col tw-gap-2">
                  <label className="tw-text-[12px] tw-text-gray-500 dark:tw-text-[#888] tw-font-semibold tw-uppercase tw-tracking-wider">Moneda Principal</label>
                  <div className="tw-relative tw-w-full md:tw-w-1/2">
                    <DollarSign className="tw-absolute tw-left-3 tw-top-1/2 -tw-translate-y-1/2 tw-text-gray-400" size={16} />
                    <select 
                      value={formData.moneda}
                      onChange={e => setFormData({...formData, moneda: e.target.value})}
                      className="tw-w-full tw-pl-10 tw-pr-10 tw-py-2.5 tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-xl tw-text-[14px] focus:tw-border-[#8aa7ec] focus:tw-ring-1 focus:tw-ring-[#8aa7ec] focus:tw-outline-none tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-transition-all tw-appearance-none"
                    >
                      <option value="mxn">Peso Mexicano (MXN)</option>
                      <option value="usd">Dólar Estadounidense (USD)</option>
                      <option value="eur">Euro (EUR)</option>
                      <option value="ars">Peso Argentino (ARS)</option>
                      <option value="cop">Peso Colombiano (COP)</option>
                    </select>
                  </div>
                </div>

                <div className="tw-pt-4 tw-flex tw-items-center tw-justify-end tw-border-t tw-border-gray-100 dark:tw-border-white/5">
                  <button 
                    onClick={handleSaveProfile}
                    className="tw-flex tw-items-center tw-gap-2 tw-bg-gradient-to-r tw-from-[#8aa7ec] tw-to-[#6d8bcf] hover:tw-from-[#7896dc] hover:tw-to-[#5c7abe] tw-text-white tw-shadow-lg tw-shadow-[#8aa7ec]/30 tw-rounded-xl tw-px-6 tw-py-2.5 tw-text-[14px] tw-font-bold tw-transition-all active:tw-scale-95"
                  >
                    {saved ? <><Check size={16} /> Guardado</> : 'Guardar cambios'}
                  </button>
                </div>
              </div>
              </>
            )}
          </div>

          {/* Seguridad y Contraseña Card */}
          {!isGuest && (
            <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-p-6 tw-shadow-sm hover:tw-shadow-md tw-transition-shadow">
              <div className="tw-flex tw-items-center tw-gap-3 tw-mb-6">
                <div className="tw-w-8 tw-h-8 tw-rounded-lg tw-bg-amber-50 dark:tw-bg-amber-500/10 tw-flex tw-items-center tw-justify-center tw-text-amber-500">
                  <Lock size={18} />
                </div>
                <h3 className="tw-text-[16px] tw-font-bold tw-text-gray-800 dark:tw-text-[#f4f1ec]">Seguridad y Contraseña</h3>
              </div>
              
              <div className="tw-space-y-5">
                <div className="tw-flex tw-flex-col tw-gap-2">
                  <label className="tw-text-[12px] tw-text-gray-500 dark:tw-text-[#888] tw-font-semibold tw-uppercase tw-tracking-wider">Contraseña Actual</label>
                  <div className="tw-relative">
                    <Key className="tw-absolute tw-left-3 tw-top-1/2 -tw-translate-y-1/2 tw-text-gray-400" size={16} />
                    <input 
                      type="password" 
                      value={securityData.currentPassword}
                      onChange={e => setSecurityData({...securityData, currentPassword: e.target.value})}
                      placeholder="••••••••"
                      className="tw-w-full tw-pl-10 tw-pr-4 tw-py-2.5 tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-xl tw-text-[14px] focus:tw-border-amber-400 focus:tw-ring-1 focus:tw-ring-amber-400 focus:tw-outline-none tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-transition-all" 
                    />
                  </div>
                </div>
                
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-5">
                  <div className="tw-flex tw-flex-col tw-gap-2">
                    <label className="tw-text-[12px] tw-text-gray-500 dark:tw-text-[#888] tw-font-semibold tw-uppercase tw-tracking-wider">Nueva Contraseña</label>
                    <div className="tw-relative">
                      <Lock className="tw-absolute tw-left-3 tw-top-1/2 -tw-translate-y-1/2 tw-text-gray-400" size={16} />
                      <input 
                        type="password" 
                        value={securityData.newPassword}
                        onChange={e => setSecurityData({...securityData, newPassword: e.target.value})}
                        placeholder="••••••••"
                        className="tw-w-full tw-pl-10 tw-pr-4 tw-py-2.5 tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-xl tw-text-[14px] focus:tw-border-amber-400 focus:tw-ring-1 focus:tw-ring-amber-400 focus:tw-outline-none tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-transition-all" 
                      />
                    </div>
                  </div>
                  <div className="tw-flex tw-flex-col tw-gap-2">
                    <label className="tw-text-[12px] tw-text-gray-500 dark:tw-text-[#888] tw-font-semibold tw-uppercase tw-tracking-wider">Confirmar Contraseña</label>
                    <div className="tw-relative">
                      <Lock className="tw-absolute tw-left-3 tw-top-1/2 -tw-translate-y-1/2 tw-text-gray-400" size={16} />
                      <input 
                        type="password" 
                        value={securityData.confirmPassword}
                        onChange={e => setSecurityData({...securityData, confirmPassword: e.target.value})}
                        placeholder="••••••••"
                        className="tw-w-full tw-pl-10 tw-pr-4 tw-py-2.5 tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-xl tw-text-[14px] focus:tw-border-amber-400 focus:tw-ring-1 focus:tw-ring-amber-400 focus:tw-outline-none tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-transition-all" 
                      />
                    </div>
                  </div>
                </div>

                <div className="tw-pt-4 tw-flex tw-items-center tw-justify-between tw-border-t tw-border-gray-100 dark:tw-border-white/5">
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <Shield size={16} className="tw-text-gray-400" />
                    <span className="tw-text-[11px] tw-text-gray-500">Usa al menos 8 caracteres.</span>
                  </div>
                  <button 
                    onClick={() => {
                      if (securityData.newPassword && securityData.newPassword === securityData.confirmPassword) {
                        setPasswordSaved(true);
                        setSecurityData({currentPassword: '', newPassword: '', confirmPassword: ''});
                        setTimeout(() => setPasswordSaved(false), 2000);
                      } else {
                        alert('Las contraseñas no coinciden o están vacías.');
                      }
                    }}
                    className="tw-flex tw-items-center tw-gap-2 tw-bg-gray-900 hover:tw-bg-gray-800 dark:tw-bg-white dark:hover:tw-bg-gray-200 dark:tw-text-gray-900 tw-text-white tw-shadow-md tw-rounded-xl tw-px-5 tw-py-2.5 tw-text-[13px] tw-font-bold tw-transition-all active:tw-scale-95"
                  >
                    {passwordSaved ? <><Check size={16} /> Actualizada</> : 'Actualizar contraseña'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Gestión de Datos Card */}
          <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-p-6 tw-shadow-sm hover:tw-shadow-md tw-transition-shadow">
            <div className="tw-flex tw-items-center tw-gap-3 tw-mb-4">
              <div className="tw-w-8 tw-h-8 tw-rounded-lg tw-bg-emerald-50 dark:tw-bg-emerald-500/10 tw-flex tw-items-center tw-justify-center tw-text-emerald-500">
                <Shield size={18} />
              </div>
              <h3 className="tw-text-[16px] tw-font-bold tw-text-gray-800 dark:tw-text-[#f4f1ec]">Privacidad y Datos</h3>
            </div>
            
            <p className="tw-text-[13px] tw-text-gray-500 dark:tw-text-[#888] tw-mb-6 tw-leading-relaxed">
              Tus datos están seguros y se sincronizan con el servidor cuando has iniciado sesión. Puedes exportar una copia de seguridad o eliminar todo tu historial si lo deseas.
            </p>
            
            <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-4">
              <button 
                onClick={exportarExcel}
                className="tw-flex tw-items-center tw-justify-center tw-gap-2.5 tw-bg-white dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 hover:tw-border-emerald-300 dark:hover:tw-border-emerald-500/50 hover:tw-bg-emerald-50 dark:hover:tw-bg-emerald-500/5 tw-text-gray-700 dark:tw-text-[#ccc] tw-rounded-xl tw-px-4 tw-py-3 tw-text-[14px] tw-font-medium tw-transition-all group"
              >
                <Download size={18} className="tw-text-emerald-500 group-hover:tw-scale-110 tw-transition-transform" /> 
                Exportar a Excel (.xlsx)
              </button>
              <button 
                onClick={borrarTodoLosDatos}
                className="tw-flex tw-items-center tw-justify-center tw-gap-2.5 tw-bg-white dark:tw-bg-[#1a1a18] tw-border tw-border-red-200 dark:tw-border-red-500/20 hover:tw-bg-red-50 dark:hover:tw-bg-red-500/10 tw-text-red-600 dark:tw-text-red-400 tw-rounded-xl tw-px-4 tw-py-3 tw-text-[14px] tw-font-medium tw-transition-all group"
              >
                <Trash2 size={18} className="group-hover:tw-scale-110 tw-transition-transform" /> 
                Eliminar cuenta
              </button>
            </div>
          </div>
        </div>

        {/* Col 2: Apariencia y Asistente */}
        <div className="lg:tw-col-span-5 tw-flex tw-flex-col tw-gap-8">
          
          {/* Apariencia Card */}
          <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-p-6 tw-shadow-sm hover:tw-shadow-md tw-transition-shadow">
            <h3 className="tw-text-[16px] tw-font-bold tw-text-gray-800 dark:tw-text-[#f4f1ec] tw-mb-6 tw-flex tw-items-center tw-gap-2">
              <span className="tw-text-xl">✨</span> Preferencias
            </h3>
            
            <div className="tw-flex tw-flex-col tw-gap-6">
              <div className="tw-flex tw-items-center tw-justify-between tw-group">
                <div className="tw-flex tw-items-center tw-gap-3">
                  <div className="tw-w-8 tw-h-8 tw-rounded-lg tw-bg-gray-100 dark:tw-bg-white/5 tw-flex tw-items-center tw-justify-center tw-text-gray-600 dark:tw-text-[#ccc]">
                    <Moon size={16} />
                  </div>
                  <div>
                    <p className="tw-text-[14px] tw-font-semibold tw-text-gray-800 dark:tw-text-[#f4f1ec]">Modo oscuro</p>
                    <p className="tw-text-[11px] tw-text-gray-500 dark:tw-text-[#888]">Protege tu vista en ambientes oscuros</p>
                  </div>
                </div>
                <Switch checked={isDarkMode} onChange={toggleTheme} />
              </div>
              
              <div className="tw-w-full tw-h-[1px] tw-bg-gray-100 dark:tw-bg-white/5"></div>
              
              <div className="tw-flex tw-items-center tw-justify-between tw-group">
                <div className="tw-flex tw-items-center tw-gap-3">
                  <div className="tw-w-8 tw-h-8 tw-rounded-lg tw-bg-amber-50 dark:tw-bg-amber-500/10 tw-flex tw-items-center tw-justify-center tw-text-amber-500">
                    <Bell size={16} />
                  </div>
                  <div>
                    <p className="tw-text-[14px] tw-font-semibold tw-text-gray-800 dark:tw-text-[#f4f1ec]">Notificaciones</p>
                    <p className="tw-text-[11px] tw-text-gray-500 dark:tw-text-[#888]">Recibe alertas de tus tareas</p>
                  </div>
                </div>
                <Switch checked={perfil.notifications !== false} onChange={() => handleToggle('notifications')} />
              </div>
            </div>
          </div>

          {/* Asistente Card */}
          <div className="tw-bg-gradient-to-br tw-from-indigo-50 tw-to-blue-50 dark:tw-from-[#1e2335] dark:tw-to-[#181b2a] tw-border tw-border-indigo-100 dark:tw-border-indigo-500/20 tw-rounded-2xl tw-p-6 tw-shadow-sm hover:tw-shadow-md tw-transition-shadow">
            <h3 className="tw-text-[16px] tw-font-bold tw-text-indigo-900 dark:tw-text-indigo-100 tw-mb-6 tw-flex tw-items-center tw-gap-2">
              <Bot size={20} className="tw-text-indigo-500" /> Asistente de IA
            </h3>
            
            <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
              <div>
                <p className="tw-text-[14px] tw-font-semibold tw-text-indigo-900 dark:tw-text-indigo-100">Activar Asistente</p>
                <p className="tw-text-[11px] tw-text-indigo-600/70 dark:tw-text-indigo-300/70">Asesoramiento inteligente en tiempo real</p>
              </div>
              <Switch checked={perfil.assistantActive !== false} onChange={() => handleToggle('assistantActive')} />
            </div>
            
            <div className={`tw-transition-all tw-duration-300 ${perfil.assistantActive === false ? 'tw-opacity-50 tw-pointer-events-none' : 'tw-opacity-100'}`}>
              <p className="tw-text-[12px] tw-font-semibold tw-uppercase tw-tracking-wider tw-text-indigo-800 dark:tw-text-indigo-300 tw-mb-3">Personalidad</p>
              <div className="tw-flex tw-gap-3 tw-mb-6">
                <button 
                  onClick={() => handleAssistantType('nuve')}
                  className={`tw-flex-1 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-py-4 tw-rounded-xl tw-border-2 tw-transition-all ${perfil.assistantType !== 'elia' ? 'tw-bg-white dark:tw-bg-[#242422] tw-border-indigo-400 tw-shadow-md' : 'tw-bg-white/50 dark:tw-bg-[#242422]/50 tw-border-transparent hover:tw-bg-white dark:hover:tw-bg-[#242422]'}`}
                >
                  <span className="tw-text-2xl">🤖</span>
                  <div className="tw-text-center">
                    <p className={`tw-text-[13px] tw-font-bold ${perfil.assistantType !== 'elia' ? 'tw-text-indigo-600 dark:tw-text-indigo-400' : 'tw-text-gray-600 dark:tw-text-gray-400'}`}>Nuve</p>
                    <p className="tw-text-[10px] tw-text-gray-500 dark:tw-text-gray-400">Directo y analítico</p>
                  </div>
                </button>
                <button 
                  onClick={() => handleAssistantType('elia')}
                  className={`tw-flex-1 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-py-4 tw-rounded-xl tw-border-2 tw-transition-all ${perfil.assistantType === 'elia' ? 'tw-bg-white dark:tw-bg-[#242422] tw-border-indigo-400 tw-shadow-md' : 'tw-bg-white/50 dark:tw-bg-[#242422]/50 tw-border-transparent hover:tw-bg-white dark:hover:tw-bg-[#242422]'}`}
                >
                  <span className="tw-text-2xl">👩‍🦰</span>
                  <div className="tw-text-center">
                    <p className={`tw-text-[13px] tw-font-bold ${perfil.assistantType === 'elia' ? 'tw-text-indigo-600 dark:tw-text-indigo-400' : 'tw-text-gray-600 dark:tw-text-gray-400'}`}>Elia</p>
                    <p className="tw-text-[10px] tw-text-gray-500 dark:tw-text-gray-400">Cálida y motivadora</p>
                  </div>
                </button>
              </div>

              <div className="tw-flex tw-items-center tw-justify-between">
                <div className="tw-flex tw-items-center tw-gap-3">
                  <div className="tw-w-8 tw-h-8 tw-rounded-lg tw-bg-indigo-100 dark:tw-bg-indigo-500/20 tw-flex tw-items-center tw-justify-center tw-text-indigo-500">
                    <Mic size={16} />
                  </div>
                  <div>
                    <p className="tw-text-[14px] tw-font-semibold tw-text-indigo-900 dark:tw-text-indigo-100">Respuestas por voz</p>
                    <p className="tw-text-[11px] tw-text-indigo-600/70 dark:tw-text-indigo-300/70">Lectura en voz alta (Próximamente)</p>
                  </div>
                </div>
                <Switch checked={false} onChange={() => {}} disabled={true} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
