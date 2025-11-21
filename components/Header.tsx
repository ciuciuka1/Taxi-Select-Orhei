import React, { useState, useEffect } from 'react';
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
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/services', label: t.nav.services },
    { path: '/about', label: t.nav.about },
    { path: '/contact', label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-40 transition-all duration-500 border-b ${
        isScrolled || mobileMenuOpen 
          ? 'bg-brand-dark/90 backdrop-blur-md shadow-lg py-2 border-white/5' 
          : 'bg-transparent py-4 md:py-6 border-transparent'
      }`}
    >
      {/* Added significant gap-16 at md breakpoint to force separation between Weather and Home */}
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center gap-6 md:gap-16 lg:gap-24">
        
        {/* Branding + Weather Wrapper */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          <Link to="/" className="z-50 relative group flex flex-col">
              <span className="font-serif text-2xl md:text-3xl font-bold text-white tracking-wide group-hover:scale-105 transition-transform duration-300 drop-shadow-lg">
                TAXI<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-orange">SELECT</span>
              </span>
              <span className="text-[10px] text-gray-300 uppercase tracking-[0.3em] text-right group-hover:text-brand-gold transition-colors duration-300 mr-1">
                Orhei
              </span>
          </Link>
          
          {/* Weather Widget */}
          <div className="hidden xs:block origin-left">
            <WeatherWidget />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 shrink-0 ml-auto">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium tracking-wide transition-all duration-300 relative group py-2 ${
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

        {/* Mobile Right Section (Weather on very small screens + Burger) */}
        <div className="flex items-center gap-4 md:hidden">
           <div className="xs:hidden">
             <WeatherWidget />
           </div>
           
          {/* Mobile Toggle */}
          <button
            className="z-50 text-white focus:outline-none p-2 hover:text-brand-gold transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-brand-dark/98 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) md:hidden ${
            mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
        >
          {navLinks.map((link, idx) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-3xl font-serif font-bold text-white hover:text-brand-gold transition-transform hover:scale-110"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-12 p-2 border border-white/10 rounded-lg">
            <LanguageSwitcher currentLang={lang} setLang={setLang} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;