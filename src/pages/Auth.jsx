import React, { useState } from 'react';
import { User, Building2, Globe, UserCircle2, Sun, Moon, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Auth({ initialTab = 'login', onGuestLogin, onBackToLanding }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'login' | 'register'
  const [accountType, setAccountType] = useState('personal'); // 'personal' | 'empresarial'
  const { isDarkMode, toggleTheme } = useTheme();
  const { login, register } = useAuth();
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.nombre || !formData.email) {
      setError('Nombre y correo electrónico son obligatorios.');
      return;
    }

    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    try {
      await register({
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
        moneda: 'mxn',
        accountType,
      });
    } catch (err) {
      setError(err.message || 'Error al registrar la cuenta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tw-min-h-screen tw-bg-white dark:tw-bg-[#121212] tw-flex tw-transition-colors tw-duration-300">
      
      {/* Left Panel - Visual (Hidden on mobile) */}
      <div className="tw-hidden lg:tw-flex lg:tw-w-5/12 tw-relative tw-overflow-hidden tw-bg-[#f8f9fa] dark:tw-bg-[#1a1a1a] tw-items-center tw-justify-center">
        {/* Soft gradient background matching logo colors */}
        <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-br tw-from-[#C7BBF5]/20 tw-via-[#85BEFF]/20 tw-to-[#81CBBF]/20 dark:tw-from-[#C7BBF5]/10 dark:tw-via-[#85BEFF]/10 dark:tw-to-[#81CBBF]/10"></div>
        
        {/* Decorative blur blobs */}
        <div className="tw-absolute tw-top-[-10%] tw-left-[-10%] tw-w-[50%] tw-h-[50%] tw-bg-[#C7BBF5] tw-rounded-full tw-mix-blend-multiply dark:tw-mix-blend-screen tw-filter tw-blur-[100px] tw-opacity-50 dark:tw-opacity-20"></div>
        <div className="tw-absolute tw-bottom-[-10%] tw-right-[-10%] tw-w-[50%] tw-h-[50%] tw-bg-[#81CBBF] tw-rounded-full tw-mix-blend-multiply dark:tw-mix-blend-screen tw-filter tw-blur-[100px] tw-opacity-50 dark:tw-opacity-20"></div>

        <div className="tw-relative tw-z-10 tw-flex tw-flex-col tw-items-center tw-justify-center tw-p-12 tw-text-center tw-w-full">
          <div className="tw-w-48 tw-h-48 tw-mb-8 tw-bg-white/50 dark:tw-bg-black/20 tw-backdrop-blur-xl tw-rounded-3xl tw-p-6 tw-shadow-2xl tw-border tw-border-white/40 dark:tw-border-white/5 tw-flex tw-items-center tw-justify-center hover:tw-scale-105 tw-transition-transform tw-duration-500">
            <img src="/logo.png" alt="Nuvelia Logo" className="tw-w-full tw-h-full tw-object-contain tw-drop-shadow-sm" onError={(e) => e.target.style.display='none'} />
          </div>
          
          <h1 className="tw-text-3xl tw-font-bold tw-text-gray-800 dark:tw-text-white tw-mb-4 tw-tracking-tight">
            Descubre <span className="tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-[#C7BBF5] tw-to-[#85BEFF]">Nuvelia</span>
          </h1>
          <p className="tw-text-gray-500 dark:tw-text-gray-400 tw-max-w-xs tw-mx-auto tw-leading-relaxed">
            Tu plataforma todo en uno para finanzas, tareas y hábitos. Diseñada para darte paz mental.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="tw-w-full lg:tw-w-7/12 tw-flex tw-flex-col tw-relative tw-bg-white dark:tw-bg-[#121212] tw-shadow-[-20px_0_40px_-10px_rgba(0,0,0,0.05)] dark:tw-shadow-none tw-z-20">
        
        {/* Top bar */}
        <div className="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-p-6 tw-flex tw-items-center tw-justify-between tw-z-10">
          <div className="lg:tw-hidden tw-flex tw-items-center tw-gap-2">
            <img src="/logo.png" alt="Nuvelia" className="tw-h-10 tw-w-auto tw-object-contain" onError={(e) => e.target.style.display='none'} />
          </div>
          <div className="tw-flex-1"></div>
          <button 
            onClick={toggleTheme}
            className="tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-bg-gray-50 dark:tw-bg-[#1e1e1e] tw-text-gray-500 dark:tw-text-gray-400 hover:tw-bg-gray-100 dark:hover:tw-bg-[#2a2a2a] tw-transition-colors tw-border tw-border-gray-100 dark:tw-border-white/5"
            title="Alternar tema"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Form Container */}
        <div className="tw-flex-1 tw-flex tw-items-center tw-justify-center tw-p-6 sm:tw-p-12 tw-overflow-y-auto tw-pt-24 lg:tw-pt-12">
          <div className="tw-w-full tw-max-w-[420px]">
            
            <div className="tw-mb-10">
              <h2 className="tw-text-3xl tw-font-extrabold tw-text-gray-900 dark:tw-text-white tw-mb-2 tw-tracking-tight">
                {activeTab === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
              </h2>
              <p className="tw-text-gray-500 dark:tw-text-gray-400">
                {activeTab === 'login' ? 'Ingresa tus datos para continuar.' : 'Únete a nosotros y organiza tu vida.'}
              </p>
            </div>

            {/* Tabs */}
            <div className="tw-flex tw-p-1 tw-bg-gray-50 dark:tw-bg-[#1e1e1e] tw-rounded-xl tw-mb-8 tw-border tw-border-gray-100 dark:tw-border-transparent">
              <button 
                className={`tw-flex-1 tw-py-2.5 tw-text-sm tw-font-bold tw-rounded-lg tw-transition-all ${activeTab === 'login' ? 'tw-bg-white dark:tw-bg-[#2a2a2a] tw-text-gray-900 dark:tw-text-white tw-shadow-sm' : 'tw-text-gray-500 dark:tw-text-gray-400 hover:tw-text-gray-700 dark:hover:tw-text-gray-200'}`}
                onClick={() => setActiveTab('login')}
              >
                Iniciar sesión
              </button>
              <button 
                className={`tw-flex-1 tw-py-2.5 tw-text-sm tw-font-bold tw-rounded-lg tw-transition-all ${activeTab === 'register' ? 'tw-bg-white dark:tw-bg-[#2a2a2a] tw-text-gray-900 dark:tw-text-white tw-shadow-sm' : 'tw-text-gray-500 dark:tw-text-gray-400 hover:tw-text-gray-700 dark:hover:tw-text-gray-200'}`}
                onClick={() => setActiveTab('register')}
              >
                Registrarse
              </button>
            </div>

            {/* Forms */}
            <div className="tw-transition-all tw-duration-300">
              {activeTab === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="tw-flex tw-flex-col tw-gap-5">
                  <div className="tw-flex tw-flex-col tw-gap-2">
                    <label className="tw-text-sm tw-font-semibold tw-text-gray-700 dark:tw-text-gray-300">Correo electrónico</label>
                    <input 
                      type="email" 
                      placeholder="tu@correo.com" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="tw-w-full tw-bg-white dark:tw-bg-[#1a1a1a] tw-border tw-border-gray-200 dark:tw-border-[#333] tw-rounded-xl tw-px-4 tw-py-3.5 tw-text-gray-900 dark:tw-text-white focus:tw-outline-none focus:tw-ring-4 focus:tw-ring-[#85BEFF]/20 focus:tw-border-[#85BEFF] dark:focus:tw-border-[#85BEFF] tw-transition-all"
                      required
                    />
                  </div>
                  
                  <div className="tw-flex tw-flex-col tw-gap-2">
                    <div className="tw-flex tw-items-center tw-justify-between">
                      <label className="tw-text-sm tw-font-semibold tw-text-gray-700 dark:tw-text-gray-300">Contraseña</label>
                      <button type="button" className="tw-text-xs tw-font-bold tw-text-[#85BEFF] hover:tw-text-[#C7BBF5] tw-transition-colors">¿Olvidaste tu contraseña?</button>
                    </div>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="tw-w-full tw-bg-white dark:tw-bg-[#1a1a1a] tw-border tw-border-gray-200 dark:tw-border-[#333] tw-rounded-xl tw-px-4 tw-py-3.5 tw-text-gray-900 dark:tw-text-white focus:tw-outline-none focus:tw-ring-4 focus:tw-ring-[#85BEFF]/20 focus:tw-border-[#85BEFF] dark:focus:tw-border-[#85BEFF] tw-transition-all"
                      required
                    />
                  </div>

                  <button type="submit" disabled={loading} className="tw-w-full tw-mt-2 tw-bg-gradient-to-r tw-from-[#85BEFF] tw-to-[#C7BBF5] hover:tw-from-[#75aeff] hover:tw-to-[#b5a9e3] tw-text-white tw-font-bold tw-py-3.5 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-gap-2 tw-transition-all tw-shadow-md hover:tw-shadow-lg active:tw-scale-[0.98] disabled:tw-opacity-60 disabled:tw-cursor-not-allowed">
                    {loading ? 'Ingresando...' : 'Entrar a Nuvelia'}
                    <ArrowRight size={18} />
                  </button>

                  <div className="tw-relative tw-flex tw-items-center tw-justify-center tw-my-6">
                    <div className="tw-absolute tw-w-full tw-h-px tw-bg-gray-200 dark:tw-bg-[#333]"></div>
                    <span className="tw-relative tw-bg-white dark:tw-bg-[#121212] tw-px-4 tw-text-xs tw-font-bold tw-text-gray-400 tw-uppercase tw-tracking-wider">o continuar con</span>
                  </div>

                  <div className="tw-flex tw-flex-col tw-gap-3">
                    <button 
                      type="button"
                      onClick={onGuestLogin}
                      className="tw-w-full tw-flex tw-items-center tw-justify-center tw-gap-3 tw-bg-white dark:tw-bg-[#1a1a1a] tw-border tw-border-gray-200 dark:tw-border-[#333] hover:tw-border-[#85BEFF] hover:tw-bg-[#85BEFF]/5 dark:hover:tw-bg-[#85BEFF]/10 dark:hover:tw-border-[#85BEFF]/50 tw-text-gray-700 dark:tw-text-gray-300 tw-font-bold tw-py-3.5 tw-rounded-xl tw-transition-all group"
                    >
                      <UserCircle2 size={20} className="tw-text-[#85BEFF] group-hover:tw-scale-110 tw-transition-transform" />
                      Ingresar como invitado
                    </button>
                    
                    <button 
                      type="button"
                      onClick={onBackToLanding}
                      className="tw-w-full tw-flex tw-items-center tw-justify-center tw-gap-2 tw-bg-transparent hover:tw-bg-gray-50 dark:hover:tw-bg-white/5 tw-text-gray-500 dark:tw-text-gray-400 tw-font-semibold tw-py-2.5 tw-rounded-xl tw-transition-colors tw-text-sm"
                    >
                      <Globe size={16} />
                      Volver al inicio
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="tw-flex tw-flex-col tw-gap-5">
                  <div className="tw-flex tw-flex-col tw-gap-3 tw-mb-2">
                    <label className="tw-text-sm tw-font-semibold tw-text-gray-700 dark:tw-text-gray-300">Tipo de perfil</label>
                    <div className="tw-grid tw-grid-cols-2 tw-gap-3">
                      <button 
                        type="button"
                        onClick={() => setAccountType('personal')}
                        className={`tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-p-4 tw-rounded-xl tw-border-2 tw-transition-all ${accountType === 'personal' ? 'tw-border-[#85BEFF] tw-bg-[#85BEFF]/5 dark:tw-bg-[#85BEFF]/10' : 'tw-border-gray-100 dark:tw-border-[#333] hover:tw-border-[#85BEFF]/30 tw-bg-white dark:tw-bg-[#1a1a1a]'}`}
                      >
                        <User size={24} className={accountType === 'personal' ? 'tw-text-[#85BEFF]' : 'tw-text-gray-400 dark:tw-text-gray-500'} />
                        <span className={`tw-text-sm tw-font-bold ${accountType === 'personal' ? 'tw-text-[#85BEFF]' : 'tw-text-gray-600 dark:tw-text-gray-400'}`}>Personal</span>
                      </button>

                      <button 
                        type="button"
                        onClick={() => setAccountType('empresarial')}
                        className={`tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-p-4 tw-rounded-xl tw-border-2 tw-transition-all ${accountType === 'empresarial' ? 'tw-border-[#81CBBF] tw-bg-[#81CBBF]/5 dark:tw-bg-[#81CBBF]/10' : 'tw-border-gray-100 dark:tw-border-[#333] hover:tw-border-[#81CBBF]/30 tw-bg-white dark:tw-bg-[#1a1a1a]'}`}
                      >
                        <Building2 size={24} className={accountType === 'empresarial' ? 'tw-text-[#81CBBF]' : 'tw-text-gray-400 dark:tw-text-gray-500'} />
                        <span className={`tw-text-sm tw-font-bold ${accountType === 'empresarial' ? 'tw-text-[#81CBBF]' : 'tw-text-gray-600 dark:tw-text-gray-400'}`}>Empresarial</span>
                      </button>
                    </div>
                  </div>

                  {accountType === 'empresarial' && (
                    <div className="tw-flex tw-flex-col tw-gap-2 tw-animate-in tw-fade-in tw-slide-in-from-top-2">
                      <label className="tw-text-sm tw-font-semibold tw-text-gray-700 dark:tw-text-gray-300">Nombre de la empresa</label>
                      <input 
                        type="text" 
                        placeholder="Mi Empresa S.A." 
                        className="tw-w-full tw-bg-white dark:tw-bg-[#1a1a1a] tw-border tw-border-gray-200 dark:tw-border-[#333] tw-rounded-xl tw-px-4 tw-py-3.5 tw-text-gray-900 dark:tw-text-white focus:tw-outline-none focus:tw-ring-4 focus:tw-ring-[#81CBBF]/20 focus:tw-border-[#81CBBF] dark:focus:tw-border-[#81CBBF] tw-transition-all"
                        required
                      />
                    </div>
                  )}

                  <div className="tw-flex tw-flex-col tw-gap-2">
                    <label className="tw-text-sm tw-font-semibold tw-text-gray-700 dark:tw-text-gray-300">Nombre completo</label>
                    <input 
                      type="text" 
                      placeholder="Tu nombre y apellido" 
                      value={formData.nombre}
                      onChange={(e) => handleInputChange('nombre', e.target.value)}
                      className="tw-w-full tw-bg-white dark:tw-bg-[#1a1a1a] tw-border tw-border-gray-200 dark:tw-border-[#333] tw-rounded-xl tw-px-4 tw-py-3.5 tw-text-gray-900 dark:tw-text-white focus:tw-outline-none focus:tw-ring-4 focus:tw-ring-[#85BEFF]/20 focus:tw-border-[#85BEFF] dark:focus:tw-border-[#85BEFF] tw-transition-all"
                      required
                    />
                  </div>

                  <div className="tw-flex tw-flex-col tw-gap-2">
                    <label className="tw-text-sm tw-font-semibold tw-text-gray-700 dark:tw-text-gray-300">Correo electrónico</label>
                    <input 
                      type="email" 
                      placeholder="ejemplo@correo.com" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="tw-w-full tw-bg-white dark:tw-bg-[#1a1a1a] tw-border tw-border-gray-200 dark:tw-border-[#333] tw-rounded-xl tw-px-4 tw-py-3.5 tw-text-gray-900 dark:tw-text-white focus:tw-outline-none focus:tw-ring-4 focus:tw-ring-[#85BEFF]/20 focus:tw-border-[#85BEFF] dark:focus:tw-border-[#85BEFF] tw-transition-all"
                      required
                    />
                  </div>
                  
                  <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-4">
                    <div className="tw-flex tw-flex-col tw-gap-2">
                      <label className="tw-text-sm tw-font-semibold tw-text-gray-700 dark:tw-text-gray-300">Contraseña</label>
                      <input 
                        type="password" 
                        placeholder="Mínimo 8 caracteres" 
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="tw-w-full tw-bg-white dark:tw-bg-[#1a1a1a] tw-border tw-border-gray-200 dark:tw-border-[#333] tw-rounded-xl tw-px-4 tw-py-3.5 tw-text-gray-900 dark:tw-text-white focus:tw-outline-none focus:tw-ring-4 focus:tw-ring-[#85BEFF]/20 focus:tw-border-[#85BEFF] dark:focus:tw-border-[#85BEFF] tw-transition-all"
                        required
                      />
                    </div>

                    <div className="tw-flex tw-flex-col tw-gap-2">
                      <label className="tw-text-sm tw-font-semibold tw-text-gray-700 dark:tw-text-gray-300">Confirmar</label>
                      <input 
                        type="password" 
                        placeholder="Repetir" 
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="tw-w-full tw-bg-white dark:tw-bg-[#1a1a1a] tw-border tw-border-gray-200 dark:tw-border-[#333] tw-rounded-xl tw-px-4 tw-py-3.5 tw-text-gray-900 dark:tw-text-white focus:tw-outline-none focus:tw-ring-4 focus:tw-ring-[#85BEFF]/20 focus:tw-border-[#85BEFF] dark:focus:tw-border-[#85BEFF] tw-transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="tw-flex tw-items-start tw-gap-3 tw-mt-2">
                    <input type="checkbox" id="terms" className="tw-mt-1 tw-w-4 tw-h-4 tw-rounded tw-border-gray-300 tw-text-[#85BEFF] focus:tw-ring-[#85BEFF]" required />
                    <label htmlFor="terms" className="tw-text-xs tw-text-gray-500 dark:tw-text-gray-400 tw-leading-relaxed">
                      Al crear una cuenta, aceptas nuestros <a href="#" className="tw-font-bold tw-text-[#85BEFF] hover:tw-text-[#C7BBF5] tw-transition-colors">Términos de servicio</a> y nuestra <a href="#" className="tw-font-bold tw-text-[#85BEFF] hover:tw-text-[#C7BBF5] tw-transition-colors">Política de privacidad</a>.
                    </label>
                  </div>

                  <button type="submit" className="tw-w-full tw-mt-4 tw-bg-gradient-to-r tw-from-[#85BEFF] tw-to-[#C7BBF5] hover:tw-from-[#75aeff] hover:tw-to-[#b5a9e3] tw-text-white tw-font-bold tw-py-3.5 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-gap-2 tw-transition-all tw-shadow-md hover:tw-shadow-lg active:tw-scale-[0.98]">
                    Crear mi cuenta
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
