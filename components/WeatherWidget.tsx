
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { TranslationStructure, Language } from '../types';

interface WeatherData {
  temperature: number;
  weatherCode: number;
  isDay: boolean;
  windSpeed: number;
  humidity: number;
}

interface Props {
  t?: TranslationStructure;
  lang?: Language;
}

const WeatherWidget: React.FC<Props> = ({ t, lang = 'ro' }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const fetchWeather = async () => {
    try {
      const uniqueParam = `${Date.now()}`;
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=47.3831&longitude=28.8231&current=temperature_2m,relative_humidity_2m,weather_code,is_day,wind_speed_10m&timezone=auto&timeformat=unixtime&t=${uniqueParam}`
      );
      
      if (!response.ok) throw new Error('Weather API Error');
      const data = await response.json();
      
      setWeather({
        temperature: Math.round(data.current.temperature_2m),
        weatherCode: data.current.weather_code,
        isDay: data.current.is_day === 1,
        windSpeed: Math.round(data.current.wind_speed_10m),
        humidity: Math.round(data.current.relative_humidity_2m)
      });
    } catch (error) {
      console.error("Failed to fetch weather", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 60000); 
    return () => clearInterval(interval);
  }, []);

  const getWeatherDescription = (code: number, temp: number, wind: number) => {
    if (!t) return "Loading..."; 

    if (temp >= 30) return t.weather.heat;
    if (temp <= -10) return t.weather.cold;
    if (wind > 60 && code >= 95) return t.weather.redCode;
    if (wind > 80) return t.weather.strongWind;

    switch (code) {
      case 0: return t.weather.clear;
      case 1: return t.weather.mainlyClear;
      case 2: return t.weather.partlyCloudy;
      case 3: return t.weather.overcast;
      case 45: case 48: return t.weather.fog;
      case 51: return t.weather.drizzleLight;
      case 53: return t.weather.drizzleMod;
      case 55: return t.weather.drizzleDense;
      case 56: case 57: return t.weather.freezingRain; 
      case 61: return t.weather.rainLight;
      case 63: return t.weather.rainMod;
      case 65: return t.weather.rainHeavy;
      case 66: case 67: return t.weather.freezingRain;
      case 71: return t.weather.snowLight;
      case 73: return t.weather.snowMod;
      case 75: return t.weather.snowHeavy;
      case 77: return t.weather.hail;
      case 80: return t.weather.showersLight; 
      case 81: return t.weather.showersMod;
      case 82: return t.weather.showersHeavy;
      case 85: return t.weather.sleet;
      case 86: return t.weather.blizzard;
      case 95: return t.weather.thunder;
      case 96: case 99: return t.weather.thunderHail;
      default: return t.weather.variable;
    }
  };

  // --- GRAFICĂ METEO ---
  const getWeatherIcon = (code: number, isDay: boolean, temp: number, wind: number) => {
    const iconClass = "w-10 h-10 md:w-12 md:h-12 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]"; 

    const defs = (
      <defs>
        <radialGradient id="sunCore" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#FFF7ED" />
            <stop offset="40%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
        </radialGradient>
        <linearGradient id="cloudWhite" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id="cloudGrey" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="cloudDarkStorm" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <radialGradient id="moonSurface" cx="50%" cy="50%" r="50%">
            <stop offset="40%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#94A3B8" />
        </radialGradient>
        <radialGradient id="heatGlow" cx="50%" cy="50%" r="50%">
           <stop offset="0%" stopColor="#EF4444" stopOpacity="0.4" />
           <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
        </radialGradient>
      </defs>
    );

    const CloudPath = ({ x=0, y=0, scale=1, opacity=1, fill="url(#cloudWhite)", className="" }: any) => (
       <g transform={`translate(${x}, ${y}) scale(${scale})`} opacity={opacity} className={className}>
          <path d="M25,30 a10,10 0 0,1 18,0 a8,8 0 0,1 6,7 a5,5 0 0,1 -2,9 h-25 a8,8 0 0,1 -8,-8 a8,8 0 0,1 8,-8 z" fill={fill} />
       </g>
    );

    if (temp >= 30) {
      return (
        <svg className={iconClass} viewBox="0 0 64 64">
           {defs}
           <circle cx="32" cy="32" r="28" fill="url(#heatGlow)" className="animate-pulse-slow" />
           <circle cx="32" cy="32" r="14" fill="url(#sunCore)" className="animate-heat-wave drop-shadow-[0_0_20px_rgba(249,115,22,0.8)]" />
           <path d="M10 50 Q 15 45, 20 50 T 30 50" stroke="#EF4444" fill="none" opacity="0.6" className="animate-fog-flow" />
           <path d="M34 55 Q 39 50, 44 55 T 54 55" stroke="#EF4444" fill="none" opacity="0.6" className="animate-fog-flow" style={{animationDelay:'0.5s'}} />
        </svg>
      );
    }

    if (temp <= -10) {
      return (
        <svg className={iconClass} viewBox="0 0 64 64">
           {defs}
           <circle cx="32" cy="32" r="25" fill="#3B82F6" opacity="0.2" className="animate-cold-pulse" />
           <path d="M32 10 L32 54 M10 32 L54 32 M16 16 L48 48 M16 48 L48 16" stroke="white" strokeWidth="2" strokeLinecap="round" className="animate-spin-slow" />
           <circle cx="32" cy="32" r="5" fill="white" />
        </svg>
      );
    }

    if (code >= 95) {
      return (
        <svg className={iconClass} viewBox="0 0 64 64">
           {defs}
           <rect x="0" y="0" width="64" height="64" fill="white" className="animate-flash" opacity="0.1" />
           <CloudPath x={2} y={2} scale={1.1} fill="url(#cloudDarkStorm)" />
           <path d="M34 32 L26 44 H34 L30 58" stroke="#FACC15" strokeWidth="3" fill="none" className="animate-flash drop-shadow-[0_0_10px_rgba(250,204,21,1)]" strokeLinecap="round" strokeLinejoin="round" />
           <line x1="18" y1="45" x2="14" y2="58" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" className="animate-rain-heavy" />
           <line x1="48" y1="45" x2="44" y2="58" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" className="animate-rain-heavy" style={{animationDelay: '0.2s'}} />
        </svg>
      );
    }

    if (code >= 80 && code <= 82) {
      return (
        <svg className={iconClass} viewBox="0 0 64 64">
           {defs}
           <CloudPath x={6} y={-4} scale={0.9} fill="url(#cloudDarkStorm)" opacity={0.9} />
           <CloudPath x={0} y={0} fill="url(#cloudGrey)" />
           <g>
             <line x1="20" y1="40" x2="15" y2="55" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" className="animate-rain-heavy" style={{animationDelay: '0s'}} />
             <line x1="32" y1="38" x2="27" y2="53" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" className="animate-rain-heavy" style={{animationDelay: '0.1s'}} />
             <line x1="44" y1="40" x2="39" y2="55" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" className="animate-rain-heavy" style={{animationDelay: '0.2s'}} />
             <line x1="26" y1="45" x2="21" y2="60" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" className="animate-rain-heavy" style={{animationDelay: '0.15s'}} />
           </g>
        </svg>
      );
    }

    if (code >= 61 && code <= 65) {
      return (
        <svg className={iconClass} viewBox="0 0 64 64">
          {defs}
          <CloudPath x={0} y={0} fill="url(#cloudGrey)" />
          <g> 
            <line x1="22" y1="42" x2="22" y2="54" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" className="animate-rain-drop" style={{animationDuration: '0.9s'}} />
            <line x1="32" y1="40" x2="32" y2="52" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" className="animate-rain-drop" style={{animationDuration: '1.1s', animationDelay: '0.3s'}} />
            <line x1="42" y1="42" x2="42" y2="54" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" className="animate-rain-drop" style={{animationDuration: '1.0s', animationDelay: '0.6s'}} />
          </g>
        </svg>
      );
    }

    if ([56, 57, 66, 67, 85].includes(code)) {
       return (
        <svg className={iconClass} viewBox="0 0 64 64">
           {defs}
           <CloudPath x={0} y={0} fill="url(#cloudGrey)" />
           <line x1="25" y1="42" x2="25" y2="52" stroke="#06B6D4" strokeWidth="2" className="animate-rain-drop" />
           <circle cx="38" cy="48" r="2" fill="white" className="animate-snow-fall" />
           <line x1="38" y1="46" x2="38" y2="50" stroke="white" strokeWidth="1" className="animate-snow-fall" />
           <line x1="36" y1="48" x2="40" y2="48" stroke="white" strokeWidth="1" className="animate-snow-fall" />
        </svg>
       );
    }

    if (code >= 51 && code <= 55) {
      return (
        <svg className={iconClass} viewBox="0 0 64 64">
          {defs}
          <CloudPath x={0} y={0} fill={isDay ? "url(#cloudWhite)" : "url(#cloudGrey)"} />
          <g> 
            <line x1="24" y1="42" x2="24" y2="46" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" className="animate-rain-drop" />
            <line x1="32" y1="44" x2="32" y2="48" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" className="animate-rain-drop" style={{animationDelay: '0.5s'}} />
            <line x1="40" y1="42" x2="40" y2="46" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" className="animate-rain-drop" style={{animationDelay: '0.2s'}} />
          </g>
        </svg>
      );
    }

    if ((code >= 71 && code <= 77) || code === 86) {
       const isBlizzard = code === 86 || wind > 40;
       return (
        <svg className={iconClass} viewBox="0 0 64 64">
           {defs}
           <CloudPath x={0} y={0} fill={isDay ? "url(#cloudWhite)" : "url(#cloudGrey)"} />
           <g fill="white" className={isBlizzard ? "animate-blizzard" : "animate-snow-fall"}>
              <circle cx="20" cy="45" r="2" />
              <circle cx="32" cy="50" r="2.5" />
              <circle cx="44" cy="45" r="2" />
              {isBlizzard && <circle cx="54" cy="48" r="2" />}
           </g>
        </svg>
       );
    }

    if (code === 45 || code === 48) {
      return (
        <svg className={iconClass} viewBox="0 0 64 64">
           {defs}
           <path d="M12 35h40" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" className="animate-fog-flow" style={{animationDuration: '4s'}} opacity="0.7" />
           <path d="M8 45h48" stroke="#94A3B8" strokeWidth="5" strokeLinecap="round" className="animate-fog-flow" style={{animationDuration: '6s', animationDirection: 'reverse'}} opacity="0.5" />
        </svg>
      );
    }

    if (code === 3) {
        return (
            <svg className={iconClass} viewBox="0 0 64 64">
                {defs}
                <CloudPath x={8} y={-5} scale={0.9} fill="url(#cloudGrey)" className="animate-drift-reverse" />
                <CloudPath x={-2} y={5} fill="url(#cloudWhite)" className="animate-drift" />
            </svg>
        );
    }

    if (code === 1 || code === 2) {
        return (
            <svg className={iconClass} viewBox="0 0 64 64">
                {defs}
                <g transform="translate(6, -6)">
                   {isDay ? (
                       <g className="animate-pulse-glow">
                          <circle cx="32" cy="32" r="12" fill="url(#sunCore)" />
                       </g>
                   ) : (
                       <circle cx="32" cy="32" r="10" fill="url(#moonSurface)" />
                   )}
                </g>
                <CloudPath x={-2} y={8} scale={0.95} className="animate-float" fill="url(#cloudWhite)" />
            </svg>
        );
    }

    if (isDay) {
        return (
          <svg className={iconClass} viewBox="0 0 64 64">
            {defs}
            <circle cx="32" cy="32" r="14" fill="url(#sunCore)" className="animate-pulse-glow drop-shadow-[0_0_20px_rgba(245,158,11,0.7)]" />
            <g className="animate-sun-spin origin-[32px_32px]">
              {[...Array(12)].map((_, i) => (
                <line key={i} x1="32" y1="8" x2="32" y2="2" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${i * 30} 32 32)`} />
              ))}
            </g>
          </svg>
        );
    } else {
        return (
            <svg className={iconClass} viewBox="0 0 64 64">
                {defs}
                <circle cx="32" cy="32" r="12" fill="url(#moonSurface)" className="drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-float" />
                <circle cx="10" cy="15" r="1" fill="white" className="animate-twinkle" />
                <circle cx="50" cy="10" r="1.5" fill="white" className="animate-twinkle" style={{animationDelay: '1s'}} />
            </svg>
        );
    }
    return null;
  };

  const baseContainerClasses = "rounded-full flex items-center gap-2 pl-5 pr-2 py-2 border backdrop-blur-xl shadow-lg ring-1 select-none w-fit h-auto transition-all duration-300 cursor-pointer active:scale-95";

  if (loading || !weather) {
     return (
        <div className="relative group z-50 animate-fadeInUp">
          <div className={`${baseContainerClasses} border-white/5 bg-brand-dark/50 ring-white/5`}>
             <div className="flex flex-col items-end justify-center">
                 <div className="h-4 w-8 bg-white/10 rounded animate-pulse mb-1"></div>
                 <div className="h-2 w-10 bg-white/10 rounded animate-pulse"></div>
             </div>
             <div className="h-10 w-10 bg-white/10 rounded-full animate-pulse ml-1"></div>
          </div>
        </div>
     );
  }

  return (
    <>
      {/* --- WIDGET PRINCIPAL --- */}
      <div 
        className="relative group z-50 animate-fadeInUp" 
        onClick={() => setShowModal(true)} // Enable Click for Modal
      >
        <div className={`${baseContainerClasses} bg-gradient-to-r ${
            weather.temperature >= 30 ? "from-red-900/80 to-brand-dark/80 border-red-500/30 ring-red-500/20" :
            weather.temperature <= -10 ? "from-blue-900/80 to-brand-dark/80 border-blue-500/30 ring-blue-500/20" :
            "from-brand-dark/80 to-brand-slate/80 border-white/10 ring-white/5 hover:ring-brand-gold/30"
        }`}>
          
          <div className="flex flex-col items-end justify-center">
            <span className={`text-lg font-bold font-serif leading-none tracking-tight shadow-black drop-shadow-md ${
                weather.temperature >= 30 ? "text-red-400" :
                weather.temperature <= -10 ? "text-blue-300" :
                "text-white"
            }`}>
              {weather.temperature}°C
            </span>
            <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mt-0.5 opacity-90 whitespace-nowrap">
              Orhei
            </span>
          </div>

          <div className="transform group-hover:scale-110 transition-transform duration-500 ease-out shrink-0 ml-2">
            {getWeatherIcon(weather.weatherCode, weather.isDay, weather.temperature, weather.windSpeed)}
          </div>
        </div>

        {/* --- TOOLTIP DESKTOP (Rămâne la hover) --- */}
        <div className="hidden md:block absolute top-full right-0 mt-3 w-max px-4 py-2 bg-[#0a0a0a]/95 text-white text-xs font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-white/10 shadow-2xl transform translate-y-2 group-hover:translate-y-0 z-[100] backdrop-blur-xl">
          <span className="uppercase tracking-wide text-brand-gold block text-[10px] mb-0.5">
              {t ? t.weather.label : "Vremea Acum"}
          </span>
          <span className="text-sm font-bold block">{getWeatherDescription(weather.weatherCode, weather.temperature, weather.windSpeed)}</span>
          <div className="absolute -top-1 right-8 w-2 h-2 bg-[#0a0a0a]/95 border-t border-l border-white/10 transform rotate-45"></div>
        </div>
      </div>

      {/* --- MODAL DETALIAT (PORTAL to BODY) --- */}
      {showModal && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-pageFade cursor-pointer"
          style={{ margin: 0 }} // Reset margin to be safe
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-brand-dark/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative overflow-hidden cursor-auto"
            onClick={(e) => e.stopPropagation()} 
          >
             {/* Gradient Decor */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 blur-[50px] rounded-full"></div>
             
             {/* Close Button */}
             <button 
               onClick={() => setShowModal(false)}
               className="absolute top-4 right-4 text-gray-400 hover:text-white p-2"
             >
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>

             {/* Header */}
             <div className="flex flex-col items-center mb-8 mt-2">
                 <div className="scale-[1.8] mb-6">
                    {getWeatherIcon(weather.weatherCode, weather.isDay, weather.temperature, weather.windSpeed)}
                 </div>
                 {/* Increased size for emphasis since marketing text is gone */}
                 <h2 className="text-5xl font-serif font-bold text-white mb-2">{weather.temperature}°C</h2>
                 <p className="text-brand-gold text-sm uppercase tracking-widest font-medium">{getWeatherDescription(weather.weatherCode, weather.temperature, weather.windSpeed)}</p>
             </div>

             {/* Grid Details */}
             <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center border border-white/5 shadow-inner">
                   <span className="text-gray-400 text-[10px] uppercase mb-1 tracking-wider">Vânt</span>
                   <span className="text-white font-bold text-xl">{weather.windSpeed} <span className="text-sm font-normal text-gray-400">km/h</span></span>
                </div>
                <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center border border-white/5 shadow-inner">
                   <span className="text-gray-400 text-[10px] uppercase mb-1 tracking-wider">Umiditate</span>
                   <span className="text-white font-bold text-xl">{weather.humidity}<span className="text-sm font-normal text-gray-400">%</span></span>
                </div>
             </div>

             <div className="mt-6 text-center border-t border-white/5 pt-4">
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">Orhei • Taxi Select</p>
             </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default WeatherWidget;
