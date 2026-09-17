import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import BottomNav from './BottomNav';
import ChatAssistant from '../ui/ChatAssistant';
import GlobalModals from '../ui/GlobalModals';

export default function Layout({ children, activePage, setActivePage, activeModal, setActiveModal, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
  };

  return (
    <div id="app" className="tw-flex tw-h-screen tw-overflow-hidden tw-text-gray-900 dark:tw-text-[#f4f1ec] tw-transition-colors tw-duration-200">
      
      {/* === MOBILE DRAWER (Only visible on < md) === */}
      <div 
        className={`md:tw-hidden tw-fixed tw-inset-0 tw-z-[100] tw-transition-all tw-duration-300 ${
          isMobileMenuOpen ? 'tw-opacity-100 tw-pointer-events-auto' : 'tw-opacity-0 tw-pointer-events-none'
        }`}
      >
        {/* Overlay oscuro */}
        <div 
          className="tw-absolute tw-inset-0 tw-bg-black/60"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        {/* Contenedor del Sidebar que se desliza */}
        <div 
          className={`tw-absolute tw-inset-y-0 tw-left-0 tw-transform tw-transition-transform tw-duration-300 tw-ease-out ${
            isMobileMenuOpen ? 'tw-translate-x-0' : '-tw-translate-x-full'
          }`}
        >
          <Sidebar activePage={activePage} setActivePage={handlePageChange} onLogout={onLogout} />
        </div>
      </div>

      {/* === DESKTOP SIDEBAR (Only visible on >= md) === */}
      <div className="tw-hidden md:tw-block md:tw-static md:tw-z-50 md:tw-shrink-0">
        <Sidebar activePage={activePage} setActivePage={handlePageChange} onLogout={onLogout} />
      </div>
      
      {/* Contenido Principal */}
      <main id="main" className="tw-flex-1 tw-flex tw-flex-col tw-h-screen tw-relative md:tw-ml-[220px]">
        <Topbar onMenuClick={toggleMobileMenu} activePage={activePage} setActiveModal={setActiveModal} />
        
        {/* Contenedor escroleable independiente para arreglar bug de scroll en móvil */}
        <div id="content" className="tw-flex-1 tw-overflow-y-auto tw-p-4 tw-pb-24 md:tw-p-8 md:tw-pb-8">
          {children}
        </div>

        <BottomNav activePage={activePage} setActivePage={handlePageChange} />
        <ChatAssistant />
      </main>

      {/* Modales Globales */}
      <GlobalModals activeModal={activeModal} setActiveModal={setActiveModal} />
    </div>
  );
}
