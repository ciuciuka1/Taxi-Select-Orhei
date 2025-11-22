import React from 'react';
import { TranslationStructure } from '../types';
import SeoHead from '../components/SeoHead';

interface Props {
  t: TranslationStructure;
}

const About: React.FC<Props> = ({ t }) => {
  const features = [
    {
      title: t.about.safety,
      desc: t.about.safetyDesc,
      // Image: Professional mechanic/car detail, conveying technical safety
      image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=800&q=80",
      accent: "border-brand-gold"
    },
    {
      title: t.about.comfort,
      desc: t.about.comfortDesc,
      // Image: Luxury leather interior close-up
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
      accent: "border-white"
    },
    {
      title: t.about.local,
      desc: t.about.localDesc,
      // Image: Green rolling hills and winding road - optimal representation of Orhei/Moldova landscape
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
      accent: "border-brand-orange"
    }
  ];

  return (
    <>
      <SeoHead 
        title={`${t.nav.about} - Taxi Select Orhei`} 
        description={t.about.desc}
        path="about"
      />
      <div className="pt-32 pb-20 px-6 relative z-10 bg-brand-dark min-h-screen">
        <div className="container mx-auto max-w-6xl">
          
          {/* Header */}
          <div className="text-center mb-16 animate-fadeInUp">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">
              {t.about.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
              {t.about.desc}
            </p>
          </div>
          
          {/* 3-Column Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`group relative bg-brand-slate/50 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Image Area */}
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 saturate-[0.8] group-hover:saturate-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-slate via-transparent to-transparent opacity-90"></div>
                </div>

                {/* Content Area */}
                <div className={`p-8 relative -mt-16 flex-grow flex flex-col`}>
                  <div className={`w-16 h-1 mb-6 ${feature.accent.replace('border', 'bg')} rounded-full shadow-[0_0_10px_currentColor]`}></div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-brand-gold transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative Element */}
          <div className="mt-24 flex justify-center opacity-30">
             <svg className="w-24 h-24 text-brand-gold animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="1" strokeDasharray="4 4"/>
                <path d="M12 6v6l4 2" strokeWidth="1"/>
             </svg>
          </div>

        </div>
      </div>
    </>
  );
};

export default About;