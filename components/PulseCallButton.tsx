import React from 'react';

const PulseCallButton: React.FC = () => {
  return (
    <a
      href="tel:+37323566666"
      className="fixed bottom-5 right-5 z-50 group flex items-center justify-center origin-bottom-right"
      aria-label="Call Taxi Select Orhei"
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-green-500/20 rounded-[20px] blur-xl group-hover:bg-green-500/40 transition-all duration-500 animate-pulse"></div>
      
      {/* iPhone Chassis - Responsive Size: Smaller on mobile to be unobtrusive but clear */}
      <div className="relative w-[52px] h-[104px] md:w-[60px] md:h-[120px] bg-[#000] rounded-[18px] md:rounded-[22px] p-[2px] shadow-2xl transform transition-transform duration-300 group-hover:-translate-y-1 animate-vibrate-smooth">
        {/* Titanium Frame Gradient */}
        <div className="absolute inset-0 rounded-[18px] md:rounded-[22px] bg-gradient-to-b from-[#555] via-[#999] to-[#444] z-0"></div>
        <div className="absolute inset-[1px] rounded-[17px] md:rounded-[21px] bg-black z-0"></div>

        {/* Screen */}
        <div className="absolute inset-[2px] bg-black rounded-[16px] md:rounded-[20px] z-10 overflow-hidden flex flex-col items-center justify-between py-3 md:py-4">
            
            {/* Dynamic Island */}
            <div className="w-[14px] md:w-[18px] h-[4px] md:h-[5px] bg-[#1a1a1a] rounded-full absolute top-2 left-1/2 -translate-x-1/2 z-20 border border-white/10"></div>
            
            {/* Top Text - Taxi Select - Pulsing */}
            <div className="flex flex-col items-center justify-center mt-4 md:mt-5 w-full px-1">
                <span className="text-[9px] md:text-[11px] font-bold text-white tracking-tight text-center leading-tight drop-shadow-md animate-pulse opacity-90">
                    Taxi<br/>Select
                </span>
            </div>

            {/* Green Call Button */}
            <div className="mb-2 md:mb-3 relative w-[38px] h-[38px] md:w-[44px] md:h-[44px] rounded-full bg-[#34C759] flex items-center justify-center shadow-[0_4px_12px_rgba(52,199,89,0.5)] animate-wiggle group-hover:scale-110 transition-transform border border-[#34C759]">
                {/* Phone Icon */}
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white fill-current drop-shadow-sm" viewBox="0 0 24 24">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.27-.27.36-.66.25-1.01a11.36 11.36 0 00-.56-3.53c-.12-.46-.58-.8-1.06-.8H4.47c-.55 0-1.05.53-1.06 1.09-.09 6.72 5.28 12.09 12 12 .56-.01 1.09-.5 1.09-1.06v-3.42c0-.48-.34-.93-.8-1.05z"/>
                </svg>
            </div>
        </div>
        
        {/* Glass Reflection Overlay */}
        <div className="absolute inset-[2px] rounded-[16px] md:rounded-[20px] bg-gradient-to-tr from-white/10 to-transparent opacity-50 pointer-events-none z-30"></div>
      </div>
    </a>
  );
};

export default PulseCallButton;