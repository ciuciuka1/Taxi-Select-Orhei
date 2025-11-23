import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
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
      
      {/* Hero Section - Strict Full Screen Adaptive (100svh) with overflow hidden 
          Changed from 100dvh to 100svh (Small Viewport Height) to prevent jumpy resizing 
          when mobile address bars retract during scroll. 
      */}
      <section className="relative h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden bg-brand-dark">
        
        {/* Animation Layer */}
        <div className="absolute inset-0 z-0 bg-brand-dark">
           <Suspense fallback={<div className="w-full h-full bg-brand-dark" />}>
              <HyperCanvas />
           </Suspense>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-dark/60 via-transparent to-brand-dark/90 pointer-events-none"></div>

        {/* Content Layer - Adjusted spacing for strict fit */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center">
          <div className="max-w-4xl mx-auto text-center perspective-1000 mt-0 md:mt-0">
            {/* Title - slightly smaller on extra small screens to ensure fit */}
            <h1 className="font-serif text-4xl xs:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 xs:mb-4 md:mb-6 leading-tight drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)] animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              {t.hero.title}
            </h1>
            
            {/* Subtitle - tighter margins on mobile */}
            <p className="text-base xs:text-lg md:text-2xl text-gray-100 mb-6 xs:mb-8 md:mb-10 font-light tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-fadeInUp px-2" style={{ animationDelay: '0.3s' }}>
              {t.hero.subtitle}
            </p>
            
            <div className="animate-fadeInUp mt-2 md:mt-12" style={{ animationDelay: '0.5s' }}>
              <a 
                href="tel:+37323566666"
                className="inline-flex items-center justify-center bg-gradient-to-r from-brand-gold to-brand-orange hover:from-brand-gold hover:to-yellow-500 text-brand-dark font-bold text-lg md:text-xl px-8 py-3 md:px-12 md:py-4 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 active:duration-75 shadow-[0_0_20px_rgba(245,196,94,0.4)] hover:shadow-[0_0_40px_rgba(245,196,94,0.6)] border-2 border-transparent relative overflow-hidden group ring-2 ring-brand-gold/50 ring-offset-2 ring-offset-brand-dark"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rotate-12 scale-150"></div>
                <span className="relative z-10 flex items-center tracking-wider whitespace-nowrap">
                   <svg className="w-5 h-5 mr-3 fill-current animate-pulse" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.057 15.057 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1.01A11.36 11.36 0 018.59 3.91.97.97 0 007.61 3H4.21a1 1 0 00-.98 1.05c.2 10.53 8.67 19.01 19.23 19.21a1 1 0 001.05-.98v-3.39a.99.99 0 00-.5-2.51z"/></svg>
                  {t.hero.cta} 
                </span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator - Moved slightly up to be safe */}
        <div className="absolute bottom-8 xs:bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce opacity-70 z-20 pointer-events-none">
          <svg className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-lg" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Services & Bento Grid */}
      <section className="relative z-10 bg-brand-dark py-20 md:py-24 px-4 md:px-6 border-t border-white/5 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
        <div className="container mx-auto">
          
          {/* Quick Service Icons (Full Background Cards) */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-32">
            {[
              { 
                title: t.services.city, 
                desc: t.services.cityDesc, 
                image: "https://images.unsplash.com/photo-1432611185496-76ccd1dc5efe?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              },
              { 
                title: t.services.inter, 
                desc: t.services.interDesc, 
                image: "https://images.unsplash.com/photo-1641907624750-d08806c872c4?q=80&w=824&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              },
              { 
                title: t.services.airport, 
                desc: t.services.airportDesc, 
                image: "https://images.unsplash.com/photo-1635668422708-11c28ca70419?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              }
            ].map((service, idx) => (
              <Link 
                to="/services" 
                key={idx}
                className="group relative overflow-hidden rounded-3xl h-[400px] border border-white/10 shadow-xl transition-all duration-500 hover:shadow-brand-gold/20 hover:border-brand-gold/40 hover:-translate-y-2 active:scale-95 active:duration-75 flex flex-col justify-end"
              >
                {/* Background Image */}
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80"></div>

                {/* Content Overlay */}
                <div className="relative z-10 p-8 text-center flex flex-col items-center justify-end h-full">
                  {/* Decorative Line */}
                  <div className="w-12 h-1 bg-brand-gold mb-4 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-brand-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-medium opacity-90 group-hover:opacity-100 transform translate-y-0 group-hover:-translate-y-1 transition-all duration-300">
                    {service.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Bento Grid Layout */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 md:h-[600px]">
              
              {/* Left Card - Premium Experience */}
              <div className="md:col-span-2 relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group h-[500px] md:h-auto bg-[#111]">
                 <img 
                   src="https://images.unsplash.com/photo-1614091199036-e934784dbf0f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                   alt="Taxi Premium Experience" 
                   className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                   loading="lazy"
                 />

                 {/* Text Content */}
                 <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full z-30 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <div className="w-12 h-1 bg-brand-gold mb-4 rounded-full"></div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3 drop-shadow-lg">
                      {t.home.experience}
                    </h2>
                    <p className="text-gray-200 text-sm md:text-base font-light mb-0 drop-shadow-md max-w-md">
                      {t.home.experienceDesc}
                    </p>
                 </div>
              </div>

              {/* Right Column - 2 Stacked Cards */}
              <div className="md:col-span-1 flex flex-col gap-4 md:gap-6 h-[500px] md:h-auto">
                 
                 {/* Top Right - Intercity */}
                 <div className="relative flex-1 rounded-3xl overflow-hidden border border-white/10 shadow-xl group bg-gray-900">
                    <img 
                       src="https://images.unsplash.com/photo-1763477892730-ccf12297a7d0?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                       alt="Intercity Travel" 
                       className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                       loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    
                    <div className="absolute bottom-6 left-6 z-10">
                       <div className="flex items-center gap-2 border border-white/30 bg-brand-dark/80 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold tracking-widest uppercase shadow-lg cursor-default">
                          <svg className="w-4 h-4 text-brand-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                             <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {t.services.interBadge}
                       </div>
                    </div>
                 </div>

                 {/* Bottom Right - Safety */}
                 <div className="relative flex-1 rounded-3xl overflow-hidden border border-white/10 shadow-xl group bg-gray-900">
                    <img 
                       src="https://images.unsplash.com/photo-1760466871236-ff1d1c94ecad?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                       alt="Safety Seatbelt" 
                       className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90"
                       loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                    
                    <div className="absolute bottom-6 left-6 z-10">
                       <div className="flex items-center gap-2 border border-brand-gold/30 bg-brand-dark/80 backdrop-blur-md px-4 py-2 rounded-full text-brand-gold text-xs font-bold tracking-widest uppercase hover:bg-brand-gold hover:text-brand-dark transition-all cursor-default shadow-lg">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {t.home.safetyBadge}
                       </div>
                    </div>
                 </div>

              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Home;