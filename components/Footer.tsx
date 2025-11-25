import React from 'react';
import { Link } from 'react-router-dom';
import { TranslationStructure } from '../types';

interface Props {
  t: TranslationStructure;
}

const Footer: React.FC<Props> = ({ t }) => {
  return (
    <footer className="bg-brand-dark border-t border-white/10 text-gray-300 py-12 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-xl text-white font-bold mb-2">TAXI SELECT</h3>
            <p className="text-sm">Orhei, Moldova</p>
            <a href="tel:+37323566666" className="text-brand-gold font-bold text-lg mt-2 block hover:underline active:scale-95 transition-transform duration-75">
              0 235 66 6 66
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm">
            <Link to="/terms" className="hover:text-brand-gold transition-colors active:scale-95 duration-75">{t.footer.terms}</Link>
            <Link to="/privacy" className="hover:text-brand-gold transition-colors active:scale-95 duration-75">{t.footer.privacy}</Link>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Taxi Select Orhei. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
};

export default Footer;