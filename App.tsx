import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Language } from './types';
import { translations } from './i18n/translations';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import PulseCallButton from './components/PulseCallButton';
import SecurityWrapper from './components/SecurityWrapper';

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

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ro');

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
      <HashRouter>
        <ScrollToTop />
        
        {/* Content Layer */}
        <div className="relative min-h-screen flex flex-col">
          <Header t={t} lang={lang} setLang={handleSetLang} />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home t={t} />} />
              <Route path="/services" element={<Services t={t} />} />
              <Route path="/about" element={<About t={t} />} />
              <Route path="/contact" element={<Contact t={t} />} />
              <Route path="/terms" element={<Terms t={t} />} />
              <Route path="/privacy" element={<Privacy t={t} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer t={t} />
          <PulseCallButton />
        </div>
      </HashRouter>
    </SecurityWrapper>
  );
};

export default App;