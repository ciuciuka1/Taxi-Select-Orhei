import React from 'react';

const PulseCallButton: React.FC = () => {
  return (
    <a
      href="tel:+37323566666"
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 group flex flex-col items-center justify-center origin-bottom-right animate-float hover:animate-none"
      aria-label="Call Taxi Select Orhei"
    >
      {/* Glow Effect - Subtle pulsing behind the phone */}
      <div className="absolute inset-0 bg-brand-gold/20 rounded-[20px] blur-xl group-hover:bg-brand-gold/30 transition-all duration-500 scale-90 animate-pulse-slow"></div>
      
      {/* iPhone 17 Pro Chassis - Compact & Elegant */}
      {/* Added animate-wiggle-7s here to vibrate the phone body every 7s. Stops on hover. */}
      {/* Added animate-pulse-slow to the container to breathe */}
      <div className="relative transition-all duration-300 ease-out transform group-hover:-translate-y-1 group-hover:scale-[1.02] animate-wiggle-7s group-hover:animate-none
                      w-[52px] h-[108px] rounded-[18px] border-[2px] border-[#4a4a4a] bg-[#1a1a1a] shadow-2xl shadow-black/70 ring-1 ring-white/10
                      md:w-[64px] md:h-[132px] md:rounded-[22px] md:border-[2.5px]">
        
        {/* Screen Area - OLED Black */}
        <div className="absolute inset-0 bg-brand-dark rounded-[16px] md:rounded-[19px] overflow-hidden flex flex-col items-center w-full h-full border-[1px] border-black animate-pulse-slow">
            
            {/* Glass Reflection/Shine */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none z-20 opacity-50"></div>

            {/* Dynamic Island - Scaled Down */}
            <div className="mt-[5px] md:mt-[7px] z-20 bg-black w-[16px] h-[5px] md:w-[20px] md:h-[6px] rounded-full shadow-sm border border-[#111]"></div>

            {/* Content Container */}
            <div className="flex flex-col items-center w-full h-full pt-5 md:pt-6 pb-3 z-10 justify-between">
                
                {/* Text - Compact but readable */}
                <div className="flex flex-col items-center justify-center space-y-0.5 mt-1.5">
                    <span className="text-[7px] md:text-[9px] font-black text-white uppercase tracking-wider leading-none drop-shadow-md opacity-90">
                        TAXI
                    </span>
                    <span className="text-[7px] md:text-[9px] font-black text-brand-gold uppercase tracking-wider leading-none drop-shadow-md">
                        SELECT
                    </span>
                </div>

                {/* Call Button - Pulsing invitation */}
                <div className="mb-2 md:mb-2.5">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(34,197,94,0.4)] group-hover:bg-white transition-colors duration-300 border border-white/10 animate-pulse-slow group-hover:animate-none">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 md:h-5 md:w-5 text-white group-hover:text-green-600 fill-current transition-colors duration-300" 
                            viewBox="0 0 24 24"
                        >
                            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.057 15.057 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1.01A11.36 11.36 0 018.59 3.91.97.97 0 007.61 3H4.21a1 1 0 00-.98 1.05c.2 10.53 8.67 19.01 19.23 19.21a1 1 0 001.05-.98v-3.39a.99.99 0 00-.5-2.51z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </a>
  );
};

export default PulseCallButton;