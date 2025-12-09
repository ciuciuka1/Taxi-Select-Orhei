import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Language } from './types';
import { translations } from './i18n/translations';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import PulseCallButton from './components/PulseCallButton';
import SecurityWrapper from './components/SecurityWrapper';
import Preloader from './components/Preloader';
import CookieConsent from './components/CookieConsent';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

// Scroll to top wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
  return null;
};

// Component to handle page transitions
const AnimatedRoutes: React.FC<{ t: any }> = ({ t }) => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="animate-pageFade">
      <Routes location={location}>
        <Route path="/" element={<Home t={t} />} />
        <Route path="/services" element={<Services t={t} />} />
        <Route path="/about" element={<About t={t} />} />
        <Route path="/contact" element={<Contact t={t} />} />
        <Route path="/terms" element={<Terms t={t} />} />
        <Route path="/privacy" element={<Privacy t={t} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ro');
  const [loading, setLoading] = useState(true);

  // Initial Preloader Logic
  useEffect(() => {
    // Simulate loading time (e.g. waiting for fonts/three.js init)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 
    return () => clearTimeout(timer);
  }, []);

  // Persist language selection
  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language;
    if (savedLang && ['ro', 'ru', 'en'].includes(savedLang)) {
      setLang(savedLang);
    }
  }, []);

  const handleSetLang = (l: Language) => {
    setLang(l);
    localStorage.setItem('lang', l);
  };

  const t = translations[lang];

  return (
    <SecurityWrapper>
       <Preloader isLoading={loading} />
      
      <HashRouter>
        <ScrollToTop />
        
        {/* Content Layer */}
        <div className={`relative min-h-screen flex flex-col transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <Header t={t} lang={lang} setLang={handleSetLang} />
          
          <main className="flex-grow">
             <AnimatedRoutes t={t} />
          </main>

          <Footer t={t} />
          <PulseCallButton />
          <CookieConsent t={t} />
        </div>
      </HashRouter>
    </SecurityWrapper>
  );
};

export default App;