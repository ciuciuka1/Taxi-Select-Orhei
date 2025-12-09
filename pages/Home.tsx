
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
      
      {/* Hero Section - Strict Full Screen Adaptive (100svh) */}
      <section className="relative h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden bg-brand-dark">
        
        {/* Animation Layer - Absolute to stay in Hero */}
        <div className="absolute inset-0 z-0 bg-brand-dark">
           <Suspense fallback={<div className="w-full h-full bg-brand-dark" />}>
              <HyperCanvas />
           </Suspense>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-dark/60 via-transparent to-brand-dark/90 pointer-events-none"></div>

        {/* Content Layer */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center">
          <div className="max-w-4xl mx-auto text-center perspective-1000 mt-0 md:mt-0">
            {/* Title with Brand Gradient - Added animate-gradient-x and bg sizing for dynamic shimmer */}
            <h1 className="font-serif text-4xl xs:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 xs:mb-4 md:mb-6 leading-tight drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)] animate-fadeInUp text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-gold to-brand-orange bg-[length:200%_auto] animate-gradient-x pb-2" style={{ animationDelay: '0.1s' }}>
              {t.hero.title}
            </h1>
            
            <p className="text-base xs:text-lg md:text-2xl text-gray-100 mb-6 xs:mb-8 md:mb-10 font-light tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-fadeInUp px-2" style={{ animationDelay: '0.3s' }}>
              {t.hero.subtitle}
            </p>
            
            <div className="animate-fadeInUp mt-2 md:mt-12" style={{ animationDelay: '0.5s' }}>
              <a 
                href="tel:+37323566666"
                className="inline-flex items-center justify-center bg-gradient-to-r from-brand-gold to-brand-orange hover:from-brand-gold hover:to-yellow-500 text-brand-dark font-bold text-lg md:text-xl px-8 py-3 md:px-12 md:py-4 rounded-full transition-all duration-100 transform hover:scale-105 active:scale-95 active:duration-75 shadow-[0_0_20px_rgba(245,196,94,0.4)] hover:shadow-[0_0_40px_rgba(245,196,94,0.6)] border-2 border-transparent relative overflow-hidden group ring-2 ring-brand-gold/50 ring-offset-2 ring-offset-brand-dark"
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
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 xs:bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce opacity-70 z-20 pointer-events-none">
          <svg className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-lg" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Services & Bento Grid */}
      <section className="relative z-10 bg-brand-dark py-20 md:py-24 px-4 md:px-6 border-t border-white/5 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
        <div className="container mx-auto">
          
          {/* Service Cards - Full Background Poster Style - Removed Borders */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-32">
            {[
              { 
                title: t.services.city, 
                desc: t.services.cityDesc, 
                image: "https://images.unsplash.com/photo-1432611185496-76ccd1dc5efe?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Taxi in Orhei Oras - Rapid si Ieftin" 
              },
              { 
                title: t.services.inter, 
                desc: t.services.interDesc, 
                image: "https://images.unsplash.com/photo-1641907624750-d08806c872c4?q=80&w=824&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Taxi Interurban Moldova Raionul Orhei" 
              },
              { 
                title: t.services.airport, 
                desc: t.services.airportDesc, 
                image: "https://images.unsplash.com/photo-1635668422708-11c28ca70419?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Transfer Aeroport Chisinau Orhei Taxi" 
              }
            ].map((service, idx) => (
              <Link 
                to="/services" 
                key={idx}
                className="group relative overflow-hidden rounded-3xl h-[400px] shadow-xl transition-all duration-300 hover:shadow-brand-gold/20 hover:-translate-y-2 active:scale-95 active:duration-75 flex flex-col justify-end"
              >
                {/* Background Image */}
                <img 
                  src={service.image} 
                  alt={service.alt} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Gradient Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80"></div>

                {/* Content */}
                <div className="relative z-10 p-8 text-center flex flex-col items-center justify-end h-full">
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
          
          {/* Bento Grid Layout - Removed Borders */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 md:h-[600px]">
              
              {/* Left Card - Premium Experience (Phone GPS) */}
              <div className="md:col-span-2 relative rounded-3xl overflow-hidden shadow-2xl group h-[500px] md:h-auto bg-[#111]">
                 {/* SINGLE IMAGE - NO FRAME - OBJECT COVER */}
                 <img 
                    src="https://images.unsplash.com/photo-1644436767671-506bf9d8d706?q=80&w=861&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Taxi Premium Experience Orhei" 
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                 />

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
                 
                 {/* Top Right - Intercity (Open Road) - REMOVED BADGE AS REQUESTED */}
                 <div className="relative flex-1 rounded-3xl overflow-hidden shadow-xl group bg-gray-900">
                    <img 
                       src="https://images.unsplash.com/photo-1763477892730-ccf12297a7d0?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                       alt="Drumuri nationale Moldova Taxi" 
                       className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                       loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    {/* Badge Removed here */}
                 </div>

                 {/* Bottom Right - Safety (Red Seatbelt) */}
                 <div className="relative flex-1 rounded-3xl overflow-hidden shadow-xl group bg-gray-900">
                    <img 
                       src="https://images.unsplash.com/photo-1760466871236-ff1d1c94ecad?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                       alt="Siguranta Pasageri Taxi Orhei" 
                       className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90"
                       loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 z-10">
                       <div className="flex items-center gap-2 bg-brand-dark/80 backdrop-blur-md px-4 py-2 rounded-full text-brand-gold text-xs font-bold tracking-widest uppercase hover:bg-brand-gold hover:text-brand-dark transition-all cursor-default shadow-lg">
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

          {/* Mountain CTA Section - Removed Border */}
          <div className="mt-32 relative rounded-3xl overflow-hidden h-[500px] flex items-center justify-center shadow-2xl bg-[#020617]">
             
             {/* Robust Mountain Background - High Contrast Silhouette */}
             <div className="absolute inset-0 bg-black">
                {/* Base Image - Matterhorn / Peak */}
                <div 
                  className="absolute inset-0 opacity-100 mix-blend-normal"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1545652578-b6577b273c71?q=80&w=2000&auto=format&fit=crop)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 30%'
                  }}
                ></div>
                
                {/* Overlay Gradients for Toblerone Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent"></div>
                {/* Golden Rim Light from Top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-radial-gradient from-brand-gold/20 to-transparent blur-2xl opacity-60 pointer-events-none"></div>
             </div>

             <div className="relative z-10 text-center p-6">
                <h3 className="text-brand-gold font-serif text-xl md:text-2xl tracking-[0.5em] uppercase mb-4 animate-fadeInUp">
                   Taxi Select
                </h3>
                
                <a href="tel:+37323566666" className="block group cursor-pointer mb-8 active:scale-95 transition-transform duration-100">
                   <span className="font-serif text-6xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-[#e5e5e5] to-[#999] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-105 inline-block">
                      66 6 66
                   </span>
                   <div className="h-1 w-24 bg-brand-gold mx-auto mt-4 rounded-full shadow-[0_0_15px_#F5C45E] group-hover:w-48 transition-all duration-500"></div>
                </a>

                {/* UPDATED TEXT: Replaced "Raion" with "Moldova" for premium feel */}
                <span className="text-gray-400 text-sm md:text-lg tracking-[0.3em] uppercase font-light">
                   Orhei • Moldova • Aeroport
                </span>

                <div className="mt-10">
                   <a 
                      href="tel:+37323566666" 
                      className="group inline-flex items-center gap-3 bg-gradient-to-r from-brand-gold to-brand-orange hover:from-white hover:to-white text-brand-dark font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(245,196,94,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] active:scale-95 active:duration-75"
                   >
                      <div className="bg-brand-dark/10 p-2 rounded-full group-hover:bg-brand-dark/20 transition-colors">
                         <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.057 15.057 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1.01A11.36 11.36 0 018.59 3.91.97.97 0 007.61 3H4.21a1 1 0 00-.98 1.05c.2 10.53 8.67 19.01 19.23 19.21a1 1 0 001.05-.98v-3.39a.99.99 0 00-.5-2.51z"/></svg>
                      </div>
                      <span className="tracking-wider">{t.contact.callAction}</span>
                   </a>
                </div>
             </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Home;
