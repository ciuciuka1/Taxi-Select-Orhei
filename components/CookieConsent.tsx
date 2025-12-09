import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('taxi-select-cookie-consent');
    if (!consent) {
      // Delay slightly for smoother entrance
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('taxi-select-cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] animate-fadeInUp">
      <div className="bg-brand-dark/95 backdrop-blur-md border-t border-brand-gold/20 p-4 md:p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-300 text-sm md:text-base text-center md:text-left">
            <p>
              Folosim cookie-uri pentru a vă oferi cea mai bună experiență pe site-ul nostru (reținerea limbii preferate). 
              Continuând să navigați, sunteți de acord cu{' '}
              <Link to="/privacy" className="text-brand-gold hover:underline font-medium">
                Politica de Confidențialitate
              </Link>.
            </p>
          </div>
          <button
            onClick={handleAccept}
            className="whitespace-nowrap bg-brand-gold hover:bg-yellow-400 text-brand-dark font-bold py-2 px-8 rounded-full transition-all transform active:scale-95 shadow-lg shadow-brand-gold/20"
          >
            Acceptă
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;