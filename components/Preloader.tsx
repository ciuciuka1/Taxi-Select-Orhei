import React from 'react';

interface Props {
  isLoading: boolean;
}

const Preloader: React.FC<Props> = ({ isLoading }) => {
  return (
    <div 
      className={`fixed inset-0 z-[100] bg-brand-dark flex flex-col items-center justify-center transition-all duration-700 ease-in-out pointer-events-none ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="relative">
         {/* Pulse Effect */}
         <div className="absolute inset-0 bg-brand-gold/20 blur-xl rounded-full animate-pulse-glow"></div>
         
         {/* Logo Text */}
         <div className="relative z-10 flex flex-col items-center">
            <h1 className="font-serif text-5xl font-bold text-white tracking-widest drop-shadow-2xl">
               TAXI
               <span className="text-brand-gold ml-2">SELECT</span>
            </h1>
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-brand-gold to-transparent mt-4 animate-fadeInUp"></div>
            <p className="text-gray-400 text-xs uppercase tracking-[0.5em] mt-2 animate-pulse">Orhei</p>
         </div>
      </div>
    </div>
  );
};

export default Preloader;