import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { MessageSquare, Send, Trash2, Mail, Clock, Shield, CreditCard, Settings, Bot, Phone, HelpCircle } from 'lucide-react';

export default function Soporte() {
  const { perfil } = useData();
  const isGuest = !perfil.nombre || perfil.nombre.toLowerCase() === 'invitado' || !perfil.email || perfil.email === '__guest__';
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `¡Hola${isGuest ? '' : ' ' + perfil.nombre.split(' ')[0]}! 👋 Soy el asistente virtual de Nuvelia. ¿En qué puedo ayudarte hoy?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const botResponses = {
    'suscripción': 'Para gestionar tu suscripción, dirígete a la sección "Suscripciones" en el menú izquierdo. Allí podrás cambiar de plan, actualizar métodos de pago o cancelar.',
    'cancelar': 'Lamentamos que quieras irte. Puedes cancelar tu plan actual desde "Suscripciones" > "Gestionar plan". Seguirás teniendo acceso hasta el final de tu ciclo.',
    'exportar': 'Para exportar todos tus datos, ve a "Configuración" > "Privacidad y Datos" y haz clic en "Exportar a Excel (.xlsx)". Es rápido y seguro.',
    'acceso': 'Si tienes problemas para acceder a tu cuenta, asegúrate de estar usando el correo correcto. Puedes recuperar tu contraseña desde la pantalla de inicio de sesión.',
    'ia': 'Puedes activar, desactivar o cambiar la personalidad de tu Asistente de IA (Nuve o Elia) desde la sección de "Configuración".',
    'pago': 'Gestiona tus tarjetas y facturas en "Suscripciones" > "Métodos de pago". Aceptamos la mayoría de las tarjetas de crédito y débito.',
    'hola': '¡Hola! ¿En qué te puedo ayudar el día de hoy?',
    'gracias': '¡De nada! Es un placer ayudarte. Si necesitas algo más, aquí estaré.',
    'adios': '¡Hasta pronto! Que tengas un excelente día.'
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let responseText = 'Entiendo tu consulta. Como soy un asistente virtual básico en esta versión, te recomiendo escribirnos a soporte@nuvelia.mx para que un humano pueda ayudarte detalladamente.';
      
      for (const [key, value] of Object.entries(botResponses)) {
        if (lowerText.includes(key)) {
          responseText = value;
          break;
        }
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: 'He limpiado el historial. ¿En qué más puedo asistirte?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const faqTopics = [
    { icon: <CreditCard size={18} className="tw-text-blue-500" />, label: 'Gestionar suscripción', keyword: 'suscripción' },
    { icon: <Settings size={18} className="tw-text-emerald-500" />, label: 'Exportar mis datos', keyword: 'exportar' },
    { icon: <Shield size={18} className="tw-text-amber-500" />, label: 'Problemas de acceso', keyword: 'acceso' },
    { icon: <Bot size={18} className="tw-text-indigo-500" />, label: 'Configuración de IA', keyword: 'ia' }
  ];

  return (
    <div className="page active tw-flex tw-flex-col tw-h-full tw-overflow-y-auto tw-pb-10">
      {/* Header */}
      <div className="tw-mb-8">
        <h1 className="tw-text-[28px] tw-font-extrabold tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-tracking-tight tw-flex tw-items-center tw-gap-3">
          <div className="tw-w-10 tw-h-10 tw-rounded-xl tw-bg-gradient-to-br tw-from-blue-600 tw-to-indigo-500 tw-flex tw-items-center tw-justify-center tw-shadow-lg tw-shadow-blue-500/30">
            <MessageSquare className="tw-text-white" size={20} />
          </div>
          Centro de Soporte
        </h1>
        <p className="tw-text-sm tw-text-gray-500 dark:tw-text-[#ccc] tw-mt-2">
          Resuelve tus dudas al instante o contacta con nuestro equipo.
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-[1fr_320px] tw-gap-8 tw-items-start">
        
        {/* Left Area: Chat Interface */}
        <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-shadow-sm hover:tw-shadow-md tw-transition-shadow tw-flex tw-flex-col tw-h-[600px] tw-overflow-hidden">
          
          {/* Chat Header */}
          <div className="tw-flex tw-items-center tw-justify-between tw-px-6 tw-py-4 tw-border-b tw-border-gray-100 dark:tw-border-white/5 tw-bg-gray-50/50 dark:tw-bg-[#1a1a18]/50">
            <div className="tw-flex tw-items-center tw-gap-3.5">
              <div className="tw-relative">
                <div className="tw-w-10 tw-h-10 tw-rounded-full tw-bg-gradient-to-br tw-from-blue-100 tw-to-indigo-100 dark:tw-from-blue-900/40 dark:tw-to-indigo-900/40 tw-flex tw-items-center tw-justify-center tw-text-xl tw-border-2 tw-border-white dark:tw-border-[#242422] tw-shadow-sm">
                  🤖
                </div>
                <div className="tw-absolute tw-bottom-0.5 tw-right-0.5 tw-w-2.5 tw-h-2.5 tw-rounded-full tw-bg-emerald-500 tw-border-2 tw-border-white dark:tw-border-[#242422]"></div>
              </div>
              <div>
                <h3 className="tw-text-[15px] tw-font-bold tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-leading-tight">
                  Nuvelia Assistant
                </h3>
                <span className="tw-text-[12px] tw-text-emerald-600 dark:tw-text-emerald-400 tw-font-medium">
                  En línea ahora
                </span>
              </div>
            </div>
            
            <button 
              onClick={handleClearChat}
              title="Limpiar chat"
              className="tw-w-9 tw-h-9 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-text-gray-400 hover:tw-text-red-500 hover:tw-bg-red-50 dark:hover:tw-bg-red-500/10 tw-transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>

          {/* Chat Area */}
          <div className="tw-flex-1 tw-p-6 tw-flex tw-flex-col tw-gap-5 tw-overflow-y-auto tw-bg-[#fafafa] dark:tw-bg-[#1a1a18]">
            {messages.map((msg) => (
              <div key={msg.id} className={`tw-flex tw-flex-col ${msg.sender === 'user' ? 'tw-items-end' : 'tw-items-start'}`}>
                <div className={`tw-max-w-[85%] sm:tw-max-w-[75%] tw-px-4 tw-py-3 tw-shadow-sm ${
                  msg.sender === 'user' 
                    ? 'tw-bg-gradient-to-br tw-from-[#8aa7ec] tw-to-[#6d8bcf] tw-text-white tw-rounded-2xl tw-rounded-tr-sm' 
                    : 'tw-bg-white dark:tw-bg-[#2e2e2c] tw-text-gray-800 dark:tw-text-[#f4f1ec] tw-border tw-border-gray-100 dark:tw-border-transparent tw-rounded-2xl tw-rounded-tl-sm'
                }`}>
                  <p className="tw-text-[14px] tw-leading-relaxed">{msg.text}</p>
                </div>
                <span className="tw-text-[10px] tw-text-gray-400 dark:tw-text-gray-500 tw-mt-1.5 tw-px-1">{msg.time}</span>
              </div>
            ))}
            
            {isTyping && (
              <div className="tw-flex tw-flex-col tw-items-start">
                <div className="tw-bg-white dark:tw-bg-[#2e2e2c] tw-border tw-border-gray-100 dark:tw-border-transparent tw-rounded-2xl tw-rounded-tl-sm tw-px-4 tw-py-3.5 tw-shadow-sm tw-flex tw-items-center tw-gap-1.5">
                  <div className="tw-w-1.5 tw-h-1.5 tw-bg-gray-400 tw-rounded-full tw-animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="tw-w-1.5 tw-h-1.5 tw-bg-gray-400 tw-rounded-full tw-animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="tw-w-1.5 tw-h-1.5 tw-bg-gray-400 tw-rounded-full tw-animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="tw-p-4 tw-border-t tw-border-gray-100 dark:tw-border-white/5 tw-bg-white dark:tw-bg-[#242422]">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
              className="tw-relative tw-flex tw-items-center"
            >
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe tu mensaje aquí..." 
                className="tw-w-full tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-border tw-border-gray-200 dark:tw-border-white/10 focus:tw-border-[#8aa7ec] dark:focus:tw-border-[#8aa7ec] tw-rounded-full tw-pl-5 tw-pr-14 tw-py-3.5 tw-text-[14px] tw-text-gray-800 dark:tw-text-[#f4f1ec] focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#8aa7ec]/20 tw-transition-all"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="tw-absolute tw-right-2 tw-w-10 tw-h-10 tw-rounded-full tw-bg-[#8aa7ec] hover:tw-bg-[#7896dc] disabled:tw-opacity-50 disabled:hover:tw-bg-[#8aa7ec] tw-text-white tw-flex tw-items-center tw-justify-center tw-transition-colors tw-shadow-md"
              >
                <Send size={16} className="tw-ml-0.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Right Sidebar: FAQ and Contact */}
        <div className="tw-flex tw-flex-col tw-gap-6">
          
          {/* FAQ Card */}
          <div className="tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-2xl tw-p-6 tw-shadow-sm hover:tw-shadow-md tw-transition-shadow">
            <h3 className="tw-text-[16px] tw-font-bold tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-mb-5 tw-flex tw-items-center tw-gap-2.5">
              <HelpCircle className="tw-text-[#8aa7ec]" size={20} />
              Consultas Rápidas
            </h3>
            <div className="tw-flex tw-flex-col tw-gap-3">
              {faqTopics.map((item, idx) => (
                <button 
                  key={idx} 
                  onClick={() => handleSendMessage(item.keyword)}
                  className="tw-w-full tw-flex tw-items-center tw-justify-start tw-gap-3.5 tw-bg-gray-50 dark:tw-bg-[#1a1a18] tw-border tw-border-gray-100 dark:tw-border-white/5 hover:tw-border-[#8aa7ec] dark:hover:tw-border-[#8aa7ec]/50 hover:tw-shadow-sm tw-rounded-xl tw-px-4 tw-py-3.5 tw-text-[13px] tw-font-medium tw-text-gray-700 dark:tw-text-[#ccc] tw-transition-all tw-group"
                >
                  <div className="tw-w-8 tw-h-8 tw-rounded-lg tw-bg-white dark:tw-bg-[#2e2e2c] tw-flex tw-items-center tw-justify-center tw-shadow-sm group-hover:tw-scale-110 tw-transition-transform">
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contact Card */}
          <div className="tw-bg-gradient-to-br tw-from-blue-50 tw-to-indigo-50 dark:tw-from-[#1e1e1c] dark:tw-to-[#151514] tw-border tw-border-blue-100 dark:tw-border-transparent tw-rounded-2xl tw-p-6 tw-shadow-sm dark:tw-shadow-lg tw-text-gray-900 dark:tw-text-white tw-relative tw-overflow-hidden">
            <div className="tw-absolute -tw-right-6 -tw-top-6 tw-w-24 tw-h-24 tw-bg-blue-500/10 dark:tw-bg-white/5 tw-rounded-full tw-blur-2xl"></div>
            
            <h3 className="tw-text-[16px] tw-font-bold tw-mb-5 tw-flex tw-items-center tw-gap-2.5">
              <Phone className="tw-text-[#8aa7ec]" size={20} />
              Atención Humana
            </h3>
            
            <div className="tw-flex tw-flex-col tw-gap-4 tw-relative tw-z-10">
              <div className="tw-flex tw-items-center tw-gap-3.5">
                <div className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-blue-100 dark:tw-bg-white/10 tw-flex tw-items-center tw-justify-center tw-shrink-0">
                  <Mail size={14} className="tw-text-blue-600 dark:tw-text-blue-300" />
                </div>
                <div>
                  <p className="tw-text-[11px] tw-text-gray-500 dark:tw-text-gray-400 tw-uppercase tw-tracking-wider tw-font-semibold">Correo Electrónico</p>
                  <p className="tw-text-[13px] tw-font-medium tw-text-gray-800 dark:tw-text-white tw-mt-0.5">soporte@nuvelia.mx</p>
                </div>
              </div>
              
              <div className="tw-flex tw-items-center tw-gap-3.5">
                <div className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-emerald-100 dark:tw-bg-white/10 tw-flex tw-items-center tw-justify-center tw-shrink-0">
                  <Clock size={14} className="tw-text-emerald-600 dark:tw-text-emerald-300" />
                </div>
                <div>
                  <p className="tw-text-[11px] tw-text-gray-500 dark:tw-text-gray-400 tw-uppercase tw-tracking-wider tw-font-semibold">Horario de Atención</p>
                  <p className="tw-text-[13px] tw-font-medium tw-text-gray-800 dark:tw-text-white tw-mt-0.5">24/7 Todos los días</p>
                </div>
              </div>
            </div>
            
            <button className="tw-w-full tw-mt-6 tw-bg-blue-600 hover:tw-bg-blue-700 dark:tw-bg-white/10 dark:hover:tw-bg-white/20 tw-text-white tw-border tw-border-transparent dark:tw-border-white/10 tw-rounded-xl tw-py-2.5 tw-text-[13px] tw-font-semibold tw-transition-colors">
              Enviar correo ahora
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
