
import React from 'react';
import { TranslationStructure } from '../types';
import SeoHead from '../components/SeoHead';

interface Props {
  t: TranslationStructure;
}

const Contact: React.FC<Props> = ({ t }) => {
  return (
    <>
      <SeoHead 
        title={`${t.nav.contact} - Taxi Select Orhei`} 
        description="Contact Taxi Select Orhei. Phone: 0 235 66 6 66."
        path="contact"
      />
      <div className="pt-32 pb-20 px-4 md:px-6 relative z-10 bg-brand-dark min-h-screen flex items-center">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="bg-brand-slate/80 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden">
             
             {/* Decorative Background Glow */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-brand-gold/10 blur-[50px] rounded-full"></div>

             {/* Clickable Action Title "Comandă Acum" */}
             <div className="relative z-10 mb-6">
                <a 
                   href="tel:+37323566666"
                   className="font-serif text-3xl md:text-5xl font-bold text-white hover:text-brand-gold transition-colors duration-300 cursor-pointer inline-block active:scale-95 ease-out"
                >
                   {t.contact.title}
                </a>
             </div>

             <p className="text-gray-300 mb-10 text-base md:text-lg font-light tracking-wide relative z-10">
                {t.contact.text}
             </p>
             
             {/* Phone Section - SMOOTH ANIMATION */}
             <div className="flex flex-col items-center justify-center space-y-4 mb-12 relative z-10 group/phone">
                <a 
                   href="tel:+37323566666"
                   className="text-5xl xs:text-6xl md:text-8xl font-black text-white font-serif drop-shadow-[0_0_25px_rgba(245,196,94,0.5)] hover:text-brand-gold transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] tracking-wider group-hover/phone:scale-110 group-hover/phone:-translate-y-2 transform inline-block active:scale-95 active:duration-75"
                >
                   66 6 66
                </a>
                <span className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.4em] font-medium border-t border-white/20 pt-4 w-full max-w-xs block group-hover/phone:border-brand-gold/50 transition-colors duration-500">
                  {t.contact.location}
                </span>
             </div>

             {/* Call Action Button - GREEN GRADIENT - OPTIMIZED FOR MOBILE */}
             <div className="flex justify-center mb-12 relative z-10 w-full px-2 md:px-0">
                <a 
                   href="tel:+37323566666"
                   className="
                     group relative 
                     bg-gradient-to-r from-green-600 to-green-500 
                     text-white font-bold 
                     py-4 px-8 md:py-5 md:px-16 
                     rounded-full 
                     transition-all duration-100 
                     shadow-[0_4px_25px_rgba(34,197,94,0.4)] hover:shadow-[0_4px_40px_rgba(34,197,94,0.7)] hover:-translate-y-1 active:scale-95 active:duration-75
                     flex items-center justify-center gap-3 md:gap-4 
                     overflow-hidden 
                     border border-green-400/20
                     w-full md:w-auto max-w-xs md:max-w-none
                   "
                   aria-label="Sună Acum"
                >
                   <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rotate-12 scale-150"></div>
                   
                   {/* Icon: Added shrink-0 to prevent squashing on mobile with long text */}
                   <svg className="w-6 h-6 md:w-8 md:h-8 fill-current shrink-0 animate-vibrate-smooth relative z-10" viewBox="0 0 24 24">
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.057 15.057 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1.01A11.36 11.36 0 018.59 3.91.97.97 0 007.61 3H4.21a1 1 0 00-.98 1.05c.2 10.53 8.67 19.01 19.23 19.21a1 1 0 001.05-.98v-3.39a.99.99 0 00-.5-2.51z"/>
                   </svg>
                   
                   <span className="relative z-10 text-lg md:text-2xl uppercase tracking-widest font-black text-white text-shadow-sm whitespace-nowrap">
                     {t.contact.callAction}
                   </span>
                </a>
             </div>

             {/* Social Media */}
             <div className="pt-10 border-t border-white/10 relative z-10">
                <p className="text-gray-400 mb-4 text-sm">{t.contact.social}</p>
                <a 
                  href="https://www.facebook.com/profile.php?id=61558158336366" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-white bg-[#1877F2] hover:bg-[#166fe5] px-6 py-3 rounded-lg transition-colors shadow-lg font-medium hover:shadow-blue-500/30 active:scale-95 active:duration-75"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
