import React, { useState, useEffect } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Agenda from './pages/Agenda';
import Tareas from './pages/Tareas';
import Finanzas from './pages/Finanzas';
import Compras from './pages/Compras';
import Habitos from './pages/Habitos';
import Notificaciones from './pages/Notificaciones';
import Servicios from './pages/Servicios';
import Suscripciones from './pages/Suscripciones';
import Configuracion from './pages/Configuracion';
import Soporte from './pages/Soporte';
import Auth from './pages/Auth';
import LandingPage from './pages/LandingPage';
import { DataProvider } from './context/DataContext';
import { useAuth } from './context/AuthContext.jsx';
import { useTheme } from './context/ThemeContext.jsx';

function App() {
  const { isAuthenticated, loading, logout } = useAuth();
  const { isDarkMode } = useTheme();
  const [guestMode, setGuestMode] = useState(false);
  const [activePage, setActivePage] = useState('inicio');
  const [activeModal, setActiveModal] = useState(null);
  const [view, setView] = useState('landing'); // 'landing' | 'auth'
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'register'

  const navigateToAuth = (tab = 'login') => {
    setAuthTab(tab);
    setView('auth');
  };

  const handleLogout = () => {
    logout();
    setGuestMode(false);
    setView('landing');
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark', 'tw-dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark', 'tw-dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isAuthenticated) {
      setGuestMode(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="tw-flex tw-h-screen tw-items-center tw-justify-center tw-bg-white dark:tw-bg-[#121212] tw-text-gray-900 dark:tw-text-white">
        Cargando...
      </div>
    );
  }

  if (!isAuthenticated && !guestMode) {
    if (view === 'landing') {
      return <LandingPage onNavigateAuth={navigateToAuth} />;
    }
    return <Auth initialTab={authTab} onGuestLogin={() => setGuestMode(true)} onBackToLanding={() => setView('landing')} />;
  }

  return (
    <DataProvider>
      <Layout 
        activePage={activePage} 
        setActivePage={setActivePage}
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        onLogout={handleLogout}
      >
        {activePage === 'inicio' && <Dashboard setActivePage={setActivePage} />}
        {activePage === 'agenda' && <Agenda setActiveModal={setActiveModal} />}
        {activePage === 'tareas' && <Tareas setActiveModal={setActiveModal} />}
        {activePage === 'finanzas' && <Finanzas setActiveModal={setActiveModal} />}
        {activePage === 'compras' && <Compras setActiveModal={setActiveModal} />}
        {activePage === 'habitos' && <Habitos setActiveModal={setActiveModal} />}
        {activePage === 'notificaciones' && <Notificaciones />}
        {activePage === 'servicios' && <Servicios />}
        {activePage === 'suscripciones' && <Suscripciones />}
        {activePage === 'configuracion' && <Configuracion />}
        {activePage === 'soporte' && <Soporte />}
      </Layout>
    </DataProvider>
  );
}

export default App;
