import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Language, TranslationStructure } from '../types';
import LanguageSwitcher from './LanguageSwitcher';
import WeatherWidget from './WeatherWidget';

interface Props {
  t: TranslationStructure;
  lang: Language;
  setLang: (l: Language) => void;
}

const Header: React.FC<Props> = ({ t, lang, setLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Cheie unică pentru a forța re-randarea widgetului meteo la cerere
  const [weatherKey, setWeatherKey] = useState(0); 
  const location = useLocation();
  const scrollRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      scrollRef.current = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = scrollRef.current;
          // Optimized state update to minimize re-renders
          setIsScrolled((prev) => {
             const shouldBeScrolled = scrollY > 50;
             return prev !== shouldBeScrolled ? shouldBeScrolled : prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  // Funcție care forțează reîmprospătarea vremii și navighează
  const handleNavClick = (path: string, e: React.MouseEvent) => {
    // Incrementăm cheia pentru a forța re-mount la WeatherWidget
    setWeatherKey(prev => prev + 1);

    if (path === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (location.pathname === '/') {
            e.preventDefault(); 
        }
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/services', label: t.nav.services },
    { path: '/about', label: t.nav.about },
    { path: '/contact', label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-40 transition-all duration-500 border-b will-change-transform ${
        mobileMenuOpen
          ? 'bg-brand-dark border-white/10' 
          : isScrolled 
            ? 'bg-brand-dark/90 backdrop-blur-md shadow-lg py-2 border-white/5' 
            : 'bg-transparent py-4 md:py-6 border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center gap-6 md:gap-16 lg:gap-24 relative">
        
        {/* Branding + Weather Wrapper */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0 relative z-50">
          <Link 
            to="/" 
            className="relative group flex flex-col active:scale-95 transition-transform duration-75" 
            onClick={(e) => handleNavClick('/', e)}
            aria-label="Taxi Select Home"
          >
              <span className="font-serif text-2xl md:text-3xl font-bold text-white tracking-wide group-hover:scale-105 transition-transform duration-300 drop-shadow-lg">
                TAXI<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-orange">SELECT</span>
              </span>
              <span className="text-[10px] text-gray-300 uppercase tracking-[0.3em] text-right group-hover:text-brand-gold transition-colors duration-300 mr-1">
                Orhei
              </span>
          </Link>
          
          <div className="hidden xs:block origin-left">
            {/* Folosim key pentru a forța componenta să se reîncarce complet când dăm click pe Home/Logo */}
            <WeatherWidget key={weatherKey} t={t} lang={lang} />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 shrink-0 ml-auto">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={(e) => handleNavClick(link.path, e)}
              className={`text-sm font-medium tracking-wide transition-all duration-300 relative group py-2 active:scale-95 duration-75 ${
                location.pathname === link.path ? 'text-brand-gold' : 'text-white hover:text-brand-gold'
              }`}
            >
              {link.label}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-brand-gold transition-all duration-300 ${
                location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          ))}
          <div className="h-4 w-px bg-white/20 mx-4"></div>
          <LanguageSwitcher currentLang={lang} setLang={setLang} />
        </nav>

        {/* Mobile Right Section */}
        <div className="flex items-center gap-4 md:hidden relative z-50">
           <div className="xs:hidden">
             {/* Și pe mobil forțăm refresh */}
             <WeatherWidget key={`mobile-${weatherKey}`} t={t} lang={lang} />
           </div>
           
          {/* Mobile Toggle */}
          <button
            className="text-white focus:outline-none p-2 hover:text-brand-gold transition-colors relative active:scale-95 duration-75"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Închide Meniul" : "Deschide Meniul"}
            aria-expanded={mobileMenuOpen}
          >
             <div className="w-6 h-6 relative flex items-center justify-center">
                <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 delay-75' : '-translate-y-2'}`}></span>
                <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 delay-75' : 'translate-y-2'}`}></span>
             </div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-brand-dark z-40 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
            mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
          style={{ top: 0, height: '100dvh' }} 
        >
          <div className="flex flex-col h-full pt-28 pb-8 px-6 overflow-y-auto">
            <nav className="flex flex-col space-y-2 mt-4">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(link.path, e)}
                  className={`text-3xl font-serif font-bold py-5 border-b border-white/5 flex items-center justify-between group active:scale-95 duration-75 ${
                    location.pathname === link.path ? 'text-brand-gold pl-2' : 'text-white hover:text-brand-gold hover:pl-2'
                  } transition-all duration-300`}
                  style={{ 
                      transitionDelay: `${idx * 50}ms`,
                      opacity: mobileMenuOpen ? 1 : 0,
                      transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(20px)'
                  }}
                >
                  <span>{link.label}</span>
                  <svg 
                    className={`w-6 h-6 transform transition-transform duration-300 ${
                      location.pathname === link.path ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </nav>

            <div className="flex-grow"></div>

            <div 
                className={`flex flex-col space-y-6 mt-8 transition-all duration-700 delay-300 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <span className="text-gray-400 text-sm uppercase tracking-wider font-medium">Language</span>
                <LanguageSwitcher currentLang={lang} setLang={setLang} />
              </div>

              <div className="bg-white/5 rounded-xl p-5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-colors active:scale-95 duration-75">
                 <div>
                   <p className="text-gray-400 text-xs uppercase mb-1 tracking-widest">{t.nav.dispatcher}</p>
                   <a href="tel:+37323566666" className="text-2xl font-bold text-white block font-serif tracking-wide">0 235 66 6 66</a>
                 </div>
                 {/* Mobile Menu Button - Reverted to Brand Gold */}
                 <div className="w-12 h-12 rounded-full bg-brand-gold text-brand-dark flex items-center justify-center shadow-lg shadow-brand-gold/20 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.057 15.057 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1.01A11.36 11.36 0 018.59 3.91.97.97 0 007.61 3H4.21a1 1 0 00-.98 1.05c.2 10.53 8.67 19.01 19.23 19.21a1 1 0 001.05-.98v-3.39a.99.99 0 00-.5-2.51z"/></svg>
                 </div>
              </div>

               <div className="text-center pb-4">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61558158336366" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-brand-gold transition-colors flex items-center justify-center gap-2 active:scale-95 duration-75"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Facebook
                  </a>
               </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;