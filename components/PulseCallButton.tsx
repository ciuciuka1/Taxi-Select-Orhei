import React from 'react';

const PulseCallButton: React.FC = () => {
  return (
    <a
      href="tel:+37323566666"
      className="fixed bottom-6 right-6 z-50 group flex flex-col items-center justify-center origin-bottom-right"
      aria-label="Call Taxi Select Orhei"
    >
      {/* Ripple Effect behind the phone - Reverted to Brand Gold */}
      <div className="absolute inset-0 bg-brand-gold/30 rounded-[24px] blur-xl group-hover:bg-brand-gold/50 transition-all duration-500 animate-pulse"></div>
      
      {/* Phone Chassis - Reverted Style */}
      <div className="relative w-[72px] h-[120px] bg-gray-900 rounded-[24px] border-[3px] border-gray-700 shadow-[0_0_15px_rgba(245,196,94,0.3)] transform transition-transform duration-300 group-hover:-translate-y-2 animate-vibrate-smooth overflow-hidden ring-1 ring-white/10">
        
        {/* Glass Reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-20"></div>

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-between py-4 z-10 bg-gray-900/90 backdrop-blur-sm">
            
            {/* Top: Dynamic Island / Text */}
            <div className="flex flex-col items-center justify-center w-full space-y-1.5">
                <div className="w-8 h-1.5 bg-gray-700 rounded-full mb-0.5"></div>
                <span className="text-[10px] font-bold text-white uppercase tracking-wide leading-none text-center">
                    Taxi
                </span>
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wide leading-none text-center">
                    Select
                </span>
            </div>

            {/* Bottom: Action Button - Reverted to Gold */}
            <div className="w-12 h-12 bg-brand-gold rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(245,196,94,0.6)] group-hover:scale-110 transition-transform duration-200 border border-white/10">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 text-brand-dark fill-current animate-wiggle" 
                    viewBox="0 0 24 24"
                >
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.057 15.057 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1.01A11.36 11.36 0 018.59 3.91.97.97 0 007.61 3H4.21a1 1 0 00-.98 1.05c.2 10.53 8.67 19.01 19.23 19.21a1 1 0 001.05-.98v-3.39a.99.99 0 00-.5-2.51z"/>
                </svg>
            </div>
        </div>
      </div>
    </a>
  );
};

export default PulseCallButton;