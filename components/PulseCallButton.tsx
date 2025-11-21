import React from 'react';

const PulseCallButton: React.FC = () => {
  return (
    <a
      href="tel:+37323566666"
      className="fixed bottom-5 left-5 z-50 group flex items-center justify-center origin-bottom-left"
      aria-label="Call Taxi Select Orhei"
    >
      {/* Ambient Glow - Increased intensity */}
      <div className="absolute inset-0 bg-green-500/20 rounded-[20px] blur-xl group-hover:bg-green-500/40 transition-all duration-500 animate-pulse"></div>
      
      {/* iPhone Chassis - Compact & Premium */}
      <div className="relative w-[64px] h-[128px] bg-[#000] rounded-[20px] p-[2px] shadow-2xl transform transition-transform duration-300 group-hover:-translate-y-1 animate-vibrate-smooth">
        {/* Titanium Frame Gradient */}
        <div className="absolute inset-0 rounded-[20px] bg-gradient-to-b from-[#555] via-[#999] to-[#444] z-0"></div>
        <div className="absolute inset-[1px] rounded-[19px] bg-black z-0"></div>

        {/* Screen */}
        <div className="absolute inset-[2px] bg-black rounded-[18px] z-10 overflow-hidden flex flex-col items-center justify-between py-4">
            
            {/* Dynamic Island */}
            <div className="w-[18px] h-[5px] bg-[#1a1a1a] rounded-full absolute top-2 left-1/2 -translate-x-1/2 z-20 border border-white/10"></div>
            
            {/* Top Text - Clear & Bold */}
            <div className="flex flex-col items-center justify-center mt-5 w-full px-1">
                <span className="text-[11px] font-bold text-white tracking-tight text-center leading-tight drop-shadow-md opacity-90">
                    Taxi<br/>Select
                </span>
            </div>

            {/* Green Call Button - EXTRA VISIBLE & CLEAR ICON */}
            <div className="mb-3 relative w-[50px] h-[50px] rounded-full bg-[#34C759] flex items-center justify-center shadow-[0_4px_16px_rgba(52,199,89,0.6)] animate-wiggle group-hover:scale-110 transition-transform border-2 border-[#34C759]">
                {/* Phone Icon - Scaled UP significantly for clarity */}
                <svg className="w-7 h-7 text-white fill-current drop-shadow-sm" viewBox="0 0 24 24">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.27-.27.36-.66.25-1.01a11.36 11.36 0 00-.56-3.53c-.12-.46-.58-.8-1.06-.8H4.47c-.55 0-1.05.53-1.06 1.09-.09 6.72 5.28 12.09 12 12 .56-.01 1.09-.5 1.09-1.06v-3.42c0-.48-.34-.93-.8-1.05z"/>
                </svg>
            </div>
        </div>
        
        {/* Glass Reflection Overlay */}
        <div className="absolute inset-[2px] rounded-[18px] bg-gradient-to-tr from-white/10 to-transparent opacity-50 pointer-events-none z-30"></div>
      </div>
    </a>
  );
};

export default PulseCallButton;