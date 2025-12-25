
import React, { useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { TranslationStructure, Language } from '../types';

interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
}

interface WeatherData {
  temperature: number;
  apparentTemperature: number;
  weatherCode: number;
  isDay: boolean;
  windSpeed: number;
  humidity: number;
  daily: DailyForecast[];
}

interface Props {
  t?: TranslationStructure;
  lang?: Language;
}

const CACHE_KEY = 'taxi_select_weather_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const WeatherWidget: React.FC<Props> = ({ t, lang = 'ro' }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const gradientId = useMemo(() => `liquid-grad-${Math.random().toString(36).substr(2, 9)}`, []);

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

  const fetchWeather = async (forceRefresh = false) => {
    try {
      if (!forceRefresh) {
        const cachedStr = localStorage.getItem(CACHE_KEY);
        if (cachedStr) {
          try {
            const { data, timestamp } = JSON.parse(cachedStr);
            if (Date.now() - timestamp < CACHE_DURATION) {
              setWeather(data);
              setLoading(false);
              return;
            }
          } catch (e) {
            console.warn("Malformed weather cache found, clearing...");
            localStorage.removeItem(CACHE_KEY);
          }
        }
      }

      const uniqueParam = `${Date.now()}`;
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=47.3831&longitude=28.8231&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,is_day,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&timeformat=unixtime&t=${uniqueParam}`
      );
      
      if (!response.ok) throw new Error('Weather API Error');
      const data = await response.json();
      
      const dailyForecasts: DailyForecast[] = data.daily.time.slice(1, 4).map((time: number, idx: number) => ({
        date: new Date(time * 1000).toISOString(),
        maxTemp: Math.round(data.daily.temperature_2m_max[idx + 1]),
        minTemp: Math.round(data.daily.temperature_2m_min[idx + 1]),
        weatherCode: data.daily.weather_code[idx + 1]
      }));

      const newWeatherData: WeatherData = {
        temperature: Math.round(data.current.temperature_2m),
        apparentTemperature: Math.round(data.current.apparent_temperature),
        weatherCode: data.current.weather_code,
        isDay: data.current.is_day === 1,
        windSpeed: Math.round(data.current.wind_speed_10m),
        humidity: Math.round(data.current.relative_humidity_2m),
        daily: dailyForecasts
      };

      setWeather(newWeatherData);
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data: newWeatherData,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error("Failed to fetch weather", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(() => fetchWeather(true), CACHE_DURATION);
    return () => clearInterval(interval);
  }, []);

  const getWeatherDescription = (code: number, temp: number, wind: number) => {
    if (!t) return "..."; 
    if (temp >= 35) return t.weather.heat;
    if (temp <= -15) return t.weather.cold;
    if (wind > 80) return t.weather.strongWind;

    switch (code) {
      case 0: return t.weather.clear;
      case 1: return t.weather.mainlyClear;
      case 2: return t.weather.partlyCloudy;
      case 3: return t.weather.overcast;
      case 45: case 48: return t.weather.fog;
      case 51: case 53: case 55: return t.weather.drizzleMod;
      case 61: return t.weather.rainLight;
      case 63: return t.weather.rainMod;
      case 65: return t.weather.rainHeavy;
      case 71: case 73: case 75: return t.weather.snowMod;
      case 95: case 96: case 99: return t.weather.thunder;
      default: return t.weather.variable;
    }
  };

  const getDayName = (dateStr: string) => {
    if (!t) return "";
    const date = new Date(dateStr);
    return t.weather.days[date.getDay()];
  };

  const getThermometer = (temp: number, isSmall = false) => {
    const minTemp = -10, maxTemp = 40;
    const percent = Math.max(0, Math.min(1, (temp - minTemp) / (maxTemp - minTemp)));
    const color = temp <= 0 ? '#60A5FA' : temp <= 15 ? '#22D3EE' : temp <= 25 ? '#FFFFFF' : temp <= 32 ? '#FACC15' : '#EF4444';
    const scale = isSmall ? 0.7 : 1;
    const liquidY = 18 - (percent * 14);

    return (
      <svg width={14 * scale} height={28 * scale} viewBox="0 0 14 28" className="overflow-visible filter drop-shadow-md">
        <defs>
          <linearGradient id={gradientId + (isSmall ? 's' : 'b')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path d="M 4.5 3 A 2.5 2.5 0 0 1 9.5 3 V 17.3 A 4.5 4.5 0 1 1 4.5 17.3 V 3 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <path d={`M 5.75 ${liquidY} A 1.25 1.25 0 0 1 8.25 ${liquidY} L 8.25 18.3 A 3 3 0 1 1 5.75 18.3 Z`} fill={`url(#${gradientId + (isSmall ? 's' : 'b')})`} />
      </svg>
    );
  };

  const getWeatherIcon = (code: number, isDay: boolean, temp: number, isMini = false) => {
    const size = isMini ? "w-8 h-8" : "w-10 h-10 md:w-12 md:h-12";
    const iconClass = `${size} filter drop-shadow-lg`;

    const Cloud = ({ fill = "white", opacity = 1, className = "" }) => (
      <path d="M25,30 a10,10 0 0,1 18,0 a8,8 0 0,1 6,7 a5,5 0 0,1 -2,9 h-25 a8,8 0 0,1 -8,-8 a8,8 0 0,1 8,-8 z" fill={fill} opacity={opacity} className={className} />
    );

    if (temp >= 35) return (
      <svg className={iconClass} viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="28" fill="#EF4444" opacity="0.2" className="animate-pulse" />
        <circle cx="32" cy="32" r="14" fill="#F59E0B" className="animate-heat-wave" />
      </svg>
    );

    switch (code) {
      case 0: // Clear
        return (
          <svg className={iconClass} viewBox="0 0 64 64">
            {isDay ? (
              <g className="animate-pulse-glow">
                <circle cx="32" cy="32" r="14" fill="#F59E0B" />
                <g className="animate-spin-slow origin-center">
                   {[...Array(8)].map((_, i) => <line key={i} x1="32" y1="8" x2="32" y2="2" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" transform={`rotate(${i * 45} 32 32)`} />)}
                </g>
              </g>
            ) : (
              <circle cx="32" cy="32" r="12" fill="#F8FAFC" className="animate-float" />
            )}
          </svg>
        );
      case 1: case 2: // Partly Cloudy
        return (
          <svg className={iconClass} viewBox="0 0 64 64">
            <circle cx="42" cy="22" r="10" fill={isDay ? "#F59E0B" : "#F8FAFC"} />
            <Cloud fill="#CBD5E1" className="animate-float" />
          </svg>
        );
      case 3: // Overcast
        return (
          <svg className={iconClass} viewBox="0 0 64 64">
            <g transform="translate(8, -4) scale(0.9)"><Cloud fill="#94A3B8" className="animate-drift-reverse" /></g>
            <Cloud fill="white" className="animate-drift" />
          </svg>
        );
      case 45: case 48: // Fog
        return (
          <svg className={iconClass} viewBox="0 0 64 64">
            <line x1="10" y1="30" x2="54" y2="30" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" className="animate-fog-flow" />
            <line x1="15" y1="40" x2="49" y2="40" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" className="animate-fog-flow" style={{animationDelay: '1s'}} />
            <line x1="8" y1="50" x2="56" y2="50" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" className="animate-fog-flow" style={{animationDelay: '0.5s'}} />
          </svg>
        );
      case 51: case 53: case 55: case 61: case 63: case 65: case 80: case 81: case 82: // Rain
        const isHeavy = code === 65 || code === 82;
        return (
          <svg className={iconClass} viewBox="0 0 64 64">
            <Cloud fill="#64748B" />
            <line x1="22" y1="42" x2="20" y2="52" stroke="#06B6D4" strokeWidth="2.5" className={isHeavy ? "animate-rain-heavy" : "animate-rain-drop"} />
            <line x1="32" y1="45" x2="30" y2="55" stroke="#06B6D4" strokeWidth="2.5" className={isHeavy ? "animate-rain-heavy" : "animate-rain-drop"} style={{animationDelay: '0.2s'}} />
            <line x1="42" y1="42" x2="40" y2="52" stroke="#06B6D4" strokeWidth="2.5" className={isHeavy ? "animate-rain-heavy" : "animate-rain-drop"} style={{animationDelay: '0.4s'}} />
          </svg>
        );
      case 71: case 73: case 75: case 85: case 86: // Snow
        return (
          <svg className={iconClass} viewBox="0 0 64 64">
            <Cloud fill="#94A3B8" />
            <circle cx="22" cy="45" r="2.5" fill="white" className="animate-snow-fall" />
            <circle cx="32" cy="52" r="2.5" fill="white" className="animate-snow-fall" style={{animationDelay: '1s'}} />
            <circle cx="42" cy="45" r="2.5" fill="white" className="animate-snow-fall" style={{animationDelay: '0.5s'}} />
          </svg>
        );
      case 95: case 96: case 99: // Thunder
        return (
          <svg className={iconClass} viewBox="0 0 64 64">
            <Cloud fill="#334155" />
            <path d="M34 32 L26 44 H34 L30 58" stroke="#FACC15" strokeWidth="3" fill="none" className="animate-flash" strokeLinecap="round" />
          </svg>
        );
      default:
        return <svg className={iconClass} viewBox="0 0 64 64"><Cloud fill="white" /></svg>;
    }
  };

  if (loading || !weather) return (
    <div className="relative z-50 animate-fadeInUp">
      <div className="rounded-full flex items-center gap-2 pl-4 pr-3 py-2 border border-white/5 bg-brand-dark/50 ring-1 ring-white/5">
        <div className="h-4 w-12 bg-white/10 rounded animate-pulse" />
        <div className="h-10 w-10 bg-white/10 rounded-full animate-pulse" />
      </div>
    </div>
  );

  return (
    <>
      <div className="relative z-50 animate-fadeInUp group cursor-pointer" onClick={() => setShowModal(true)}>
        <div className={`rounded-full flex items-center gap-2 pl-4 pr-3 py-2 border backdrop-blur-xl shadow-lg ring-1 transition-all duration-300 active:scale-95 ${
            weather.temperature >= 35 ? "bg-red-900/60 border-red-500/30 ring-red-500/20" :
            weather.temperature <= -10 ? "bg-blue-900/60 border-blue-500/30 ring-blue-500/20" :
            "bg-brand-dark/70 border-white/10 ring-white/5"
        }`}>
          <div className="flex items-center gap-1.5">
            {getThermometer(weather.temperature)}
            <div className="flex flex-col items-end">
              <span className={`text-xl font-bold font-serif leading-none tracking-tight ${weather.temperature >= 35 ? "text-red-400" : "text-white"}`}>
                {weather.temperature}°C
              </span>
            </div>
          </div>
          <div className="border-l border-white/10 pl-2 transform group-hover:scale-110 transition-transform duration-500">
            {getWeatherIcon(weather.weatherCode, weather.isDay, weather.temperature)}
          </div>
        </div>
      </div>

      {showModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-pageFade cursor-pointer" onClick={() => setShowModal(false)}>
          <div className="bg-[#0f172a]/95 backdrop-blur-2xl border border-white/20 rounded-[28px] md:rounded-[36px] p-5 md:p-8 w-full max-w-sm max-h-[96vh] shadow-2xl relative overflow-hidden flex flex-col cursor-auto" onClick={e => e.stopPropagation()}>
             <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/5 blur-[80px] rounded-full pointer-events-none" />
             <button onClick={() => setShowModal(false)} className="absolute top-5 right-5 text-gray-400 hover:text-white p-2.5 bg-white/5 rounded-full z-10 transition-colors">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M6 18L18 6M6 6l12 12" /></svg>
             </button>

             <div className="flex flex-col items-center flex-shrink-0 mb-4 md:mb-6 mt-2 md:mt-4">
                 <div className="scale-[1.2] md:scale-[1.5] mb-4 md:mb-6">{getWeatherIcon(weather.weatherCode, weather.isDay, weather.temperature)}</div>
                 <div className="flex items-center gap-4 md:gap-5">
                    <div className="transform scale-[1.3] md:scale-[1.8] origin-right">{getThermometer(weather.temperature)}</div>
                    <div className="flex flex-col">
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-white leading-none tracking-tighter">{weather.temperature}°C</h2>
                      <p className="text-gray-400 text-[10px] md:text-xs mt-1">{t?.weather.apparent} <span className="text-brand-gold font-bold">{weather.apparentTemperature}°C</span></p>
                    </div>
                 </div>
                 <p className="text-white text-xs md:text-sm font-bold mt-4 md:mt-6 bg-white/5 px-4 md:px-6 py-2 rounded-full border border-white/5 text-center">{getWeatherDescription(weather.weatherCode, weather.temperature, weather.windSpeed)}</p>
             </div>

             <div className="grid grid-cols-2 gap-3 mb-4 md:mb-6 flex-shrink-0">
                <div className="bg-white/5 rounded-2xl p-3 md:p-4 flex flex-col items-center border border-white/5">
                   <span className="text-gray-500 text-[8px] md:text-[9px] uppercase font-black tracking-widest mb-1">{t?.weather.wind}</span>
                   <span className="text-white font-bold text-base md:text-lg">{weather.windSpeed} <span className="text-[9px] md:text-[10px] font-normal text-gray-500">km/h</span></span>
                </div>
                <div className="bg-white/5 rounded-2xl p-3 md:p-4 flex flex-col items-center border border-white/5">
                   <span className="text-gray-500 text-[8px] md:text-[9px] uppercase font-black tracking-widest mb-1">{t?.weather.humidity}</span>
                   <span className="text-white font-bold text-base md:text-lg">{weather.humidity}<span className="text-[9px] md:text-[10px] font-normal text-gray-500">%</span></span>
                </div>
             </div>

             <div className="flex-grow flex flex-col min-h-0 overflow-hidden">
                <h3 className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black mb-3 md:mb-4 flex-shrink-0">{t?.weather.forecast}</h3>
                <div className="space-y-2 overflow-y-auto pr-1 hide-scrollbar">
                  {weather.daily.map((day, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white/5 rounded-xl md:rounded-2xl px-3 py-2 border border-white/5 hover:bg-white/10 transition-all group">
                      <span className="text-white font-bold text-xs w-10 md:w-12">{getDayName(day.date)}</span>
                      <div className="flex-1 flex justify-center group-hover:scale-110 transition-transform">
                        {getWeatherIcon(day.weatherCode, true, day.maxTemp, true)}
                      </div>
                      <div className="flex items-center gap-2 md:gap-3 w-16 md:w-20 justify-end">
                         <div className="flex flex-col items-end">
                            <span className="text-white font-black text-xs">{day.maxTemp}°</span>
                            <span className="text-gray-500 font-bold text-[9px]">{day.minTemp}°</span>
                         </div>
                         {getThermometer(day.maxTemp, true)}
                      </div>
                    </div>
                  ))}
                </div>
             </div>
             
             <div className="mt-4 md:mt-6 text-center flex-shrink-0 border-t border-white/5 pt-3">
               <p className="text-[8px] md:text-[9px] text-brand-gold font-black tracking-widest uppercase">TAXI SELECT ORHEI</p>
             </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default WeatherWidget;
