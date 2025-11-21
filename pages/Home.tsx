import React from 'react';
import { Link } from 'react-router-dom';
import { TranslationStructure } from '../types';
import SeoHead from '../components/SeoHead';

interface Props {
  t: TranslationStructure;
}

const Home: React.FC<Props> = ({ t }) => {
  return (
    <>
      <SeoHead title={t.meta.title} description={t.meta.description} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="relative z-10 max-w-4xl mx-auto text-center perspective-1000">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            {t.hero.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-10 font-light tracking-wide drop-shadow-md animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            {t.hero.subtitle}
          </p>
          
          <div className="animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            <a 
              href="tel:+37323566666"
              className="inline-block bg-gradient-to-r from-brand-gold to-brand-orange hover:from-white hover:to-gray-200 text-brand-dark font-bold text-lg md:text-xl px-10 py-4 rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(245,196,94,0.4)] hover:shadow-[0_0_40px_rgba(245,196,94,0.7)] border-2 border-transparent relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                {t.hero.cta} <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Quick Services Grid */}
      <section className="relative z-10 bg-brand-dark py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 -mt-32">
            {[
              { title: t.services.city, desc: t.services.cityDesc, icon: '🏙️' },
              { title: t.services.inter, desc: t.services.interDesc, icon: '🛣️' },
              { title: t.services.airport, desc: t.services.airportDesc, icon: '✈️' },
            ].map((service, idx) => (
              <div 
                key={idx} 
                className="bg-[#163A63]/90 backdrop-blur-lg p-8 rounded-xl border border-white/10 shadow-xl hover:border-brand-gold/50 transition-all hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">{service.icon}</div>
                <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors">{service.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Gallery Section - OPTIMAL TAXI IMAGERY */}
      <section className="relative z-20 py-20 bg-brand-dark">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px] md:h-[400px]">
              {/* Large Image - Car Interior/Driver view */}
              <div className="md:col-span-2 relative overflow-hidden rounded-lg group h-full">
                 <img 
                    // High quality dashboard/night driving shot
                    src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80" 
                    alt="Night Driving Experience" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                    <span className="text-white font-serif text-2xl font-bold">Experiență Premium</span>
                 </div>
              </div>
              {/* Side Images */}
              <div className="flex flex-col gap-4 h-full">
                 <div className="relative overflow-hidden rounded-lg group flex-1">
                    <img 
                      // Professional Car Detail / Steering Wheel
                      src="https://images.unsplash.com/photo-1490902931801-d6f80ca94fe4?auto=format&fit=crop&w=600&q=80" 
                      alt="Taxi Service Details" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                 </div>
                 <div className="relative overflow-hidden rounded-lg group flex-1">
                    <img 
                      // Professional Driver / Hand on steering wheel
                      src="https://images.unsplash.com/photo-1515569067071-ec3b51335dd0?auto=format&fit=crop&w=600&q=80" 
                      alt="Safe Driving" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                        <span className="text-brand-gold font-bold tracking-wider text-sm">SIGURANȚĂ</span>
                     </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Visual Break / Call to Action - PREMIUM ENHANCED */}
      {/* Added mt-24 to ensure clear separation from the images above */}
      <section className="relative z-10 mt-24 py-32 bg-brand-dark overflow-hidden group">
         <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-1000 ease-in-out mix-blend-overlay">
            <img 
              // Image: Night road texture
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80" 
              alt="Road Background" 
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[3s]"
              loading="lazy"
            />
         </div>
         <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-transparent to-brand-dark"></div>
         
         <div className="relative z-10 container mx-auto px-6 text-center">
            <a 
              href="tel:+37323566666"
              className="inline-flex flex-col items-center justify-center group/phone cursor-pointer"
              aria-label="Call Taxi Select Now"
            >
              {/* Animated Phone Number */}
              <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold mb-4 transition-all duration-500 drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 group-hover/phone:from-brand-gold group-hover/phone:to-brand-orange group-hover/phone:scale-105">
                66 6 66
              </h2>
              
              {/* Divider Line */}
              <div className="w-24 h-1 bg-brand-gold rounded-full mb-8 group-hover/phone:w-48 transition-all duration-500 shadow-[0_0_10px_rgba(245,196,94,0.8)]"></div>

              {/* NON STOP Text with Glowing Effect */}
              <div className="relative overflow-visible">
                 <p className="text-brand-gold text-2xl md:text-3xl tracking-[0.4em] uppercase font-bold relative z-10 group-hover/phone:tracking-[0.6em] transition-all duration-500 animate-pulse-slow group-hover/phone:text-white">
                    NON STOP
                 </p>
                 {/* Text Glow */}
                 <div className="absolute inset-0 blur-lg bg-brand-gold/30 opacity-0 group-hover/phone:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Call Button Indicator */}
              <div className="mt-12 opacity-0 group-hover/phone:opacity-100 transform translate-y-4 group-hover/phone:translate-y-0 transition-all duration-500 ease-out">
                 <span className="bg-white text-brand-dark font-extrabold px-8 py-3 rounded-full text-lg shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-vibrate-smooth" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
                   </svg>
                   {t.contact.callAction}
                 </span>
              </div>
            </a>
         </div>
      </section>
    </>
  );
};

export default Home;