import React, { Suspense } from 'react';
import { TranslationStructure } from '../types';
import SeoHead from '../components/SeoHead';

// Lazy load the heavy animation component
const HyperCanvas = React.lazy(() => import('../animations/HyperCanvas'));

interface Props {
  t: TranslationStructure;
}

const Home: React.FC<Props> = ({ t }) => {
  return (
    <>
      <SeoHead title={t.meta.title} description={t.meta.description} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-brand-dark">
        
        {/* Animation Layer */}
        <div className="absolute inset-0 z-0 bg-brand-dark">
           <Suspense fallback={<div className="w-full h-full bg-brand-dark" />}>
              <HyperCanvas />
           </Suspense>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-dark/80 via-transparent to-brand-dark pointer-events-none"></div>

        {/* Content Layer */}
        <div className="relative z-10 max-w-4xl mx-auto text-center perspective-1000 pointer-events-none">
          <div className="pointer-events-auto">
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)] animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-2xl text-gray-100 mb-10 font-light tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              {t.hero.subtitle}
            </p>
            
            <div className="animate-fadeInUp mt-24 md:mt-32" style={{ animationDelay: '0.5s' }}>
              <a 
                href="tel:+37323566666"
                className="inline-block bg-gradient-to-r from-brand-gold to-brand-orange hover:from-white hover:to-gray-200 text-brand-dark font-bold text-lg md:text-xl px-10 py-4 rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(245,196,94,0.4)] hover:shadow-[0_0_40px_rgba(245,196,94,0.7)] border-2 border-transparent relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  {t.hero.cta} <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
                </span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-70 z-10">
          <svg className="w-6 h-6 text-white drop-shadow-lg" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Quick Services Grid */}
      <section className="relative z-10 bg-brand-dark py-24 px-6 border-t border-white/5 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: t.services.city, desc: t.services.cityDesc, icon: '🏙️' },
              { title: t.services.inter, desc: t.services.interDesc, icon: '🛣️' },
              { title: t.services.airport, desc: t.services.airportDesc, icon: '✈️' },
            ].map((service, idx) => (
              <div 
                key={idx} 
                className="bg-brand-slate/50 backdrop-blur-lg p-8 rounded-xl border border-white/5 shadow-xl hover:border-brand-gold/50 transition-all hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group flex flex-col h-full"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">{service.icon}</div>
                <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-white transition-colors">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Gallery Section - OPTIMIZED LAYOUT */}
      <section className="relative z-10 py-20 bg-brand-dark">
        <div className="container mx-auto px-6 max-w-7xl">
           
           {/* Responsive Grid: Columns on mobile, Row on MD+ */}
           <div className="flex flex-col md:flex-row gap-8 min-h-[800px] md:min-h-[600px]">
              
              {/* Primary Feature Image */}
              <div className="w-full md:w-2/3 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group min-h-[350px] md:min-h-full">
                 <img 
                    src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80" 
                    alt="Night Driving Experience" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                    loading="lazy"
                    width="1200"
                    height="800"
                  />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-10">
                    <div className="w-12 h-1 bg-brand-gold mb-4 rounded-full"></div>
                    <h2 className="text-white font-serif text-3xl md:text-4xl font-bold tracking-wide">{t.home.experience}</h2>
                    <p className="text-gray-300 mt-2 text-sm md:text-base max-w-md">Confort și siguranță la standarde ridicate pentru fiecare călătorie.</p>
                 </div>
              </div>

              {/* Secondary Column */}
              <div className="w-full md:w-1/3 flex flex-col gap-8 min-h-[400px] md:min-h-full">
                 
                 {/* Detail Shot */}
                 <div className="relative flex-1 rounded-2xl overflow-hidden border border-white/10 shadow-xl group min-h-[200px]">
                    <img 
                      src="https://images.unsplash.com/photo-1490902931801-d6f80ca94fe4?auto=format&fit=crop&w=600&q=80" 
                      alt="Taxi Service Details" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      loading="lazy"
                      width="600"
                      height="400"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                 </div>

                 {/* Safety Feature */}
                 <div className="relative flex-1 rounded-2xl overflow-hidden border border-white/10 shadow-xl group min-h-[200px]">
                    <img 
                      src="https://images.unsplash.com/photo-1515569067071-ec3b51335dd0?auto=format&fit=crop&w=600&q=80" 
                      alt="Safe Driving" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      loading="lazy"
                      width="600"
                      height="400"
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-6">
                        <div className="bg-brand-dark/80 backdrop-blur border border-white/10 px-4 py-2 rounded-lg">
                            <span className="text-brand-gold font-bold tracking-wider text-xs md:text-sm uppercase flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                {t.home.safetyBadge}
                            </span>
                        </div>
                     </div>
                 </div>

              </div>
           </div>
        </div>
      </section>

      {/* Call to Action - MOUNTAIN SECTION - OPTIMIZED */}
      <section className="relative z-10 w-full min-h-[80vh] flex flex-col justify-end items-center bg-[#020617] overflow-hidden border-t border-white/5">
         
         {/* 1. The Mountain Image */}
         <div className="absolute bottom-0 left-0 w-full h-[80%] z-0">
            <div 
                className="w-full h-full bg-cover bg-bottom bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop')",
                    opacity: 0.6
                }}
            ></div>
            {/* Gradient Overlays for blending */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-transparent"></div>
         </div>

         {/* 2. The Glow (Behind the text, on top of mountain) */}
         <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-brand-gold rounded-full blur-[150px] opacity-10 pointer-events-none z-0"></div>

         {/* 3. Content */}
         <div className="relative z-10 container mx-auto px-6 text-center pb-24 md:pb-32">
            <a 
              href="tel:+37323566666"
              className="inline-flex flex-col items-center justify-center group/phone cursor-pointer"
              aria-label="Call Taxi Select Now"
            >
              {/* Number */}
              <h2 className="font-serif text-5xl md:text-8xl lg:text-9xl font-bold mb-2 transition-all duration-500 drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-brand-gold/40 group-hover/phone:to-brand-gold group-hover/phone:scale-105 leading-tight">
                66 6 66
              </h2>
              
              {/* Underline glow */}
              <div className="w-32 h-1 bg-brand-gold rounded-full mb-6 group-hover/phone:w-48 transition-all duration-500 shadow-[0_0_20px_rgba(245,196,94,0.8)]"></div>

              <div className="relative overflow-visible">
                 <p className="text-brand-gold text-2xl md:text-3xl tracking-[0.4em] uppercase font-bold relative z-10 group-hover/phone:tracking-[0.6em] transition-all duration-500 animate-pulse-slow group-hover/phone:text-white text-shadow-sm">
                    NON STOP
                 </p>
              </div>

              <div className="mt-12 opacity-0 group-hover/phone:opacity-100 transform translate-y-4 group-hover/phone:translate-y-0 transition-all duration-500 ease-out">
                 <span className="bg-white/90 backdrop-blur text-brand-dark font-extrabold px-8 py-3 rounded-full text-lg shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center gap-2 border border-white">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-vibrate-smooth text-brand-dark" viewBox="0 0 24 24" fill="currentColor">
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