import React from 'react';
import { TranslationStructure } from '../types';
import SeoHead from '../components/SeoHead';

interface Props {
  t: TranslationStructure;
}

const Services: React.FC<Props> = ({ t }) => {
  return (
    <>
      <SeoHead 
        title={`${t.nav.services} - Taxi Select Orhei`} 
        description={t.services.interDesc}
        path="services"
      />
      <div className="pt-32 pb-20 px-6 relative z-10 bg-brand-dark min-h-screen">
        <div className="container mx-auto max-w-5xl">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-16 text-center drop-shadow-lg">
            {t.services.title}
          </h1>

          {/* City Rides */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24 group">
            <div className="order-2 md:order-1 relative overflow-hidden rounded-xl shadow-2xl border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1618668129934-3e5a9e8bb9d0?q=80&w=1056&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Orhei City Night Taxi" 
                className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent"></div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-serif font-bold text-brand-gold mb-4">{t.services.city}</h2>
              <p className="text-gray-300 leading-relaxed text-lg">{t.services.cityDesc}</p>
              <ul className="mt-6 space-y-3 text-gray-400">
                <li className="flex items-center gap-3">
                  <span className="text-brand-gold">●</span> {t.services.cityList.time}
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-brand-gold">●</span> {t.services.cityList.rates}
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-brand-gold">●</span> {t.services.cityList.cars}
                </li>
              </ul>
            </div>
          </div>

          {/* Airport Transfer */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24 group">
            <div>
              <h2 className="text-3xl font-serif font-bold text-brand-orange mb-4">{t.services.airport}</h2>
              <p className="text-gray-300 leading-relaxed text-lg">{t.services.airportDesc}</p>
              <div className="mt-6 p-4 bg-brand-orange/10 border-l-4 border-brand-orange rounded-r-lg">
                <p className="text-brand-orange text-sm italic">
                  {t.services.airportWarning}
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl shadow-2xl border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Airport Transfer Service" 
                className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent"></div>
            </div>
          </div>

          {/* Intercity */}
           <div className="grid md:grid-cols-2 gap-12 items-center group">
            <div className="order-2 md:order-1 relative overflow-hidden rounded-xl shadow-2xl border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Intercity Taxi Travel" 
                className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent"></div>
              {/* Badge overlay */}
              <div className="absolute bottom-4 left-4 bg-brand-red/90 backdrop-blur px-4 py-1 rounded text-white font-bold text-sm">
                {t.services.interBadge}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-serif font-bold text-brand-red mb-4">{t.services.inter}</h2>
              <p className="text-gray-300 leading-relaxed text-lg">{t.services.interDesc}</p>
              <p className="mt-4 text-gray-400">
                {t.services.interExtra}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;