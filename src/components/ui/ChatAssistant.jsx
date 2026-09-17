import React, { useState, useRef, useEffect } from 'react';
import { X, Mic, Phone, Send, Loader2 } from 'lucide-react';

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hola, soy Nuve 👋 Dime qué necesitas.', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    if (isPending) return; // evita múltiples envíos simultáneos

    const userMsg = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);
    setIsPending(true);

    (async () => {
      try {
        // enviar sólo los últimos N mensajes para controlar tamaño
        const lastMessages = [...messages, userMsg].slice(-12).map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text }));

        const resp = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: lastMessages }),
        });

        if (!resp.ok) {
          const err = await resp.json().catch(() => ({ error: resp.statusText }));
          const botMsg = { id: Date.now() + 1, text: `Error: ${err.error || 'Respuesta no válida'}`, sender: 'bot' };
          setMessages(prev => [...prev, botMsg]);
          return;
        }

        const data = await resp.json();
        const content = data?.choices?.[0]?.message?.content || data?.result || 'Sin respuesta.';
        const botMsg = { id: Date.now() + 1, text: String(content), sender: 'bot' };
        setMessages(prev => [...prev, botMsg]);
      } catch (error) {
        console.error('Chat assistant error:', error);
        const botMsg = { id: Date.now() + 1, text: 'Hubo un error contactando la API de IA.', sender: 'bot' };
        setMessages(prev => [...prev, botMsg]);
      } finally {
        setIsTyping(false);
        setIsPending(false);
      }
    })();
  };

  return (
    <div className="tw-fixed tw-bottom-[85px] md:tw-bottom-6 tw-right-4 md:tw-right-6 tw-z-50">
      {/* Botón flotante */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`tw-w-[52px] tw-h-[52px] tw-rounded-full tw-bg-gradient-to-br tw-from-[#6b8cdd] tw-to-indigo-400 tw-text-white tw-flex tw-items-center tw-justify-center tw-shadow-xl hover:tw-scale-105 tw-transition-transform ${isOpen ? 'tw-scale-0 tw-opacity-0' : 'tw-scale-100 tw-opacity-100'}`}
      >
        <span className="tw-text-2xl">🤖</span>
      </button>

      {/* Ventana de Chat */}
      <div 
        className={`tw-absolute tw-bottom-0 tw-right-0 tw-w-[90vw] md:tw-w-[360px] tw-bg-white dark:tw-bg-[#242422] tw-border tw-border-gray-200 dark:tw-border-white/10 tw-rounded-2xl tw-shadow-2xl tw-flex tw-flex-col tw-overflow-hidden tw-transition-all tw-duration-300 tw-origin-bottom-right ${isOpen ? 'tw-scale-100 tw-opacity-100' : 'tw-scale-0 tw-opacity-0 tw-pointer-events-none'}`}
      >
        {/* Header */}
        <div className="tw-p-4 tw-bg-gradient-to-br tw-from-[#6b8cdd]/10 tw-to-indigo-300/10 tw-border-b tw-border-gray-200 dark:tw-border-white/10 tw-flex tw-items-center tw-justify-between">
          <div className="tw-flex tw-items-center tw-gap-3">
            <div className="tw-w-10 tw-h-10 tw-rounded-full tw-bg-gradient-to-br tw-from-[#6b8cdd] tw-to-indigo-400 tw-flex tw-items-center tw-justify-center tw-shadow-md">
              <span className="tw-text-xl">🤖</span>
            </div>
            <div>
              <strong className="tw-block tw-text-sm tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-leading-tight">Nuvelia Assistant</strong>
              <div className="tw-flex tw-items-center tw-gap-1">
                <div className="tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-emerald-500 tw-animate-pulse"></div>
                <small className="tw-text-[11px] tw-text-gray-500 dark:tw-text-gray-400">Nuve — En línea</small>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-white/50 dark:tw-bg-black/20 tw-flex tw-items-center tw-justify-center tw-text-gray-500 hover:tw-bg-gray-200 dark:hover:tw-bg-white/10 dark:tw-text-gray-400 tw-transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="tw-flex-1 tw-p-4 tw-h-[340px] md:tw-h-[380px] tw-overflow-y-auto tw-flex tw-flex-col tw-gap-3 tw-bg-gray-50/50 dark:tw-bg-[#1a1a18]/50">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`tw-max-w-[85%] tw-px-3.5 tw-py-2.5 tw-rounded-2xl tw-text-[13px] tw-shadow-sm ${
                msg.sender === 'user' 
                  ? 'tw-self-end tw-bg-[#6b8cdd] tw-text-white tw-rounded-br-sm' 
                  : 'tw-self-start tw-bg-white dark:tw-bg-[#2e2e2c] tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-rounded-bl-sm'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="tw-self-start tw-bg-white dark:tw-bg-[#2e2e2c] tw-border tw-border-gray-100 dark:tw-border-white/5 tw-px-3.5 tw-py-3 tw-rounded-2xl tw-rounded-bl-sm tw-shadow-sm tw-flex tw-items-center tw-gap-1.5">
              <div className="tw-w-1.5 tw-h-1.5 tw-bg-gray-400 tw-rounded-full tw-animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="tw-w-1.5 tw-h-1.5 tw-bg-gray-400 tw-rounded-full tw-animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="tw-w-1.5 tw-h-1.5 tw-bg-gray-400 tw-rounded-full tw-animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="tw-p-3 tw-bg-white dark:tw-bg-[#242422] tw-border-t tw-border-gray-200 dark:tw-border-white/10 tw-flex tw-items-center tw-gap-2">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe un mensaje..." 
            className="tw-flex-1 tw-bg-gray-100 dark:tw-bg-[#1a1a18] tw-border-transparent tw-rounded-full tw-px-4 tw-py-2.5 tw-text-[13px] tw-text-gray-900 dark:tw-text-[#f4f1ec] placeholder-gray-500 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-[#6b8cdd]/50 tw-transition-shadow"
          />
          {inputValue.trim() ? (
            <button type="submit" className="tw-w-[38px] tw-h-[38px] tw-rounded-full tw-bg-[#6b8cdd] tw-text-white tw-flex tw-items-center tw-justify-center hover:tw-bg-[#5a7bc2] tw-transition-colors tw-shrink-0 tw-shadow-md active:tw-scale-95">
              <Send size={16} className="tw-ml-0.5" />
            </button>
          ) : (
            <div className="tw-flex tw-gap-1 tw-shrink-0">
              <button type="button" className="tw-w-9 tw-h-9 tw-rounded-full tw-text-gray-400 hover:tw-bg-gray-100 dark:hover:tw-bg-white/5 hover:tw-text-[#6b8cdd] tw-flex tw-items-center tw-justify-center tw-transition-colors">
                <Mic size={18} />
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
