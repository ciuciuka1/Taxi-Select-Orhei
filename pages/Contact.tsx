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
      <div className="pt-32 pb-20 px-6 relative z-10 bg-brand-dark min-h-screen flex items-center">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="bg-[#0D2541]/90 backdrop-blur-md border border-white/10 p-12 rounded-2xl shadow-2xl">
             <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
                {t.contact.title}
             </h1>
             <p className="text-gray-300 mb-10 text-lg font-light tracking-wide">
                {t.contact.text}
             </p>
             
             {/* Phone Section */}
             <div className="flex flex-col items-center justify-center space-y-4 mb-10">
                <a 
                   href="tel:+37323566666"
                   className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-brand-gold to-brand-orange hover:to-white transition-all duration-300 font-serif drop-shadow-lg"
                >
                   66 6 66
                </a>
                <span className="text-sm text-gray-400 uppercase tracking-[0.3em]">{t.contact.location}</span>
             </div>

             {/* Call Action Button */}
             <div className="flex justify-center mb-12">
                <a 
                   href="tel:+37323566666"
                   className="group relative bg-brand-red hover:bg-red-600 text-white font-bold py-4 px-16 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(190,61,42,0.5)] hover:shadow-[0_0_40px_rgba(190,61,42,0.7)] hover:-translate-y-1 flex items-center gap-3 overflow-hidden"
                >
                   <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                   <span className="animate-pulse text-2xl">📞</span> 
                   <span className="relative text-lg uppercase tracking-wider">{t.contact.callAction}</span>
                </a>
             </div>

             {/* Social Media / Facebook */}
             <div className="pt-10 border-t border-white/10">
                <p className="text-gray-400 mb-4 text-sm">{t.contact.social}</p>
                <a 
                  href="https://www.facebook.com/profile.php?id=61558158336366" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-white bg-[#1877F2] hover:bg-[#166fe5] px-6 py-3 rounded-lg transition-colors shadow-lg font-medium"
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