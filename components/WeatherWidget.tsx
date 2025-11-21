import React, { useEffect, useState } from 'react';

interface WeatherData {
  temperature: number;
  weatherCode: number;
}

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Orhei Coordinates: 47.3831° N, 28.8231° E
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=47.3831&longitude=28.8231&current=temperature_2m,weather_code&timezone=auto'
        );
        const data = await response.json();
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          weatherCode: data.current.weather_code,
        });
      } catch (error) {
        console.error("Failed to fetch weather", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 1800000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (code: number) => {
    // Ultra-compact Animated SVG Components
    const iconClasses = "w-5 h-5 drop-shadow-sm"; 

    // Sunny / Clear (0)
    if (code === 0) {
      return (
        <svg className={iconClasses} viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="12" fill="#F5C45E" />
          <g className="animate-spin-slow origin-center">
            {[...Array(8)].map((_, i) => (
              <line 
                key={i}
                x1="32" y1="8" x2="32" y2="2" 
                stroke="#F5C45E" strokeWidth="4" strokeLinecap="round"
                transform={`rotate(${i * 45} 32 32)`} 
              />
            ))}
          </g>
        </svg>
      );
    } 
    
    // Cloudy / Partly Cloudy (1-3)
    if (code >= 1 && code <= 3) {
      const isPartly = code === 1 || code === 2;
      return (
        <svg className={iconClasses} viewBox="0 0 64 64">
          {isPartly && <circle cx="22" cy="22" r="8" fill="#F5C45E" className="animate-pulse-slow" />}
          <path 
            d="M46 40a10 10 0 1 1-20 0 8 8 0 1 1-16 0c0 10 6 14 10 14h20c8 0 12-6 12-12s-4-10-6-12z" 
            fill="#E5E7EB" 
            className="animate-cloud-move"
          />
        </svg>
      );
    }
    
    // Rain (51-67, 80-82)
    if (code >= 51) {
      return (
        <svg className={iconClasses} viewBox="0 0 64 64">
          <path 
            d="M42 30a10 10 0 1 1-20 0 8 8 0 1 1-16 0c0 8 6 10 10 10h20c8 0 10-4 10-10s-4-10-4-10z" 
            fill="#9CA3AF" 
          />
          <g className="animate-rain">
             <line x1="24" y1="44" x2="20" y2="54" stroke="#60A5FA" strokeWidth="4" strokeLinecap="round" />
          </g>
          <g className="animate-rain" style={{ animationDelay: '0.3s' }}>
             <line x1="36" y1="44" x2="32" y2="54" stroke="#60A5FA" strokeWidth="4" strokeLinecap="round" />
          </g>
        </svg>
      );
    }

    // Default generic
    return (
       <svg className={`${iconClasses} text-gray-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
       </svg>
    );
  };

  if (loading) return <div className="w-4 h-4 rounded-full border-2 border-brand-gold border-t-transparent animate-spin ml-2"></div>;
  if (!weather) return null;

  return (
    <div className="relative group cursor-default select-none">
      {/* Extremely Compact Container */}
      <div className="flex items-center gap-2 pl-3 pr-2 py-0.5 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
        <div className="flex flex-col items-end justify-center -space-y-0.5">
          <span className="text-xs font-bold text-white font-serif leading-tight">
            {weather.temperature}°
          </span>
          <span className="text-[9px] text-brand-gold/80 uppercase font-bold tracking-wider">
            Orhei
          </span>
        </div>
        <div className="opacity-90">
          {getWeatherIcon(weather.weatherCode)}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;