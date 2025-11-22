import React, { useEffect, useState } from 'react';

interface WeatherData {
  temperature: number;
  weatherCode: number;
  isDay: boolean;
}

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=47.3831&longitude=28.8231&current=temperature_2m,weather_code,is_day&timezone=auto',
        { cache: 'no-store' }
      );
      if (!response.ok) throw new Error('Weather API Error');
      const data = await response.json();
      setWeather({
        temperature: Math.round(data.current.temperature_2m),
        weatherCode: data.current.weather_code,
        isDay: data.current.is_day === 1
      });
    } catch (error) {
      console.error("Failed to fetch weather", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 300000); // 5 mins
    return () => clearInterval(interval);
  }, []);

  // WMO Code Mapping
  const getWeatherDescription = (code: number, isDay: boolean) => {
    switch (code) {
      case 0: return isDay ? "Cer senin" : "Noapte senină";
      case 1: return "Predominant senin";
      case 2: return "Parțial noros";
      case 3: return "Înnorat";
      case 45: case 48: return "Ceață";
      case 51: case 53: case 55: return "Burniță";
      case 56: case 57: return "Burniță înghețată";
      case 61: case 63: return "Ploaie";
      case 65: return "Ploaie torențială";
      case 66: case 67: return "Ploaie înghețată";
      case 71: case 73: return "Ninsoare";
      case 75: return "Ninsoare abundentă";
      case 77: return "Grindină";
      case 80: case 81: return "Averse";
      case 82: return "Averse violente";
      case 85: case 86: return "Averse de zăpadă";
      case 95: return "Furtună";
      case 96: case 99: return "Furtună cu grindină";
      default: return "Vreme Variabilă";
    }
  };

  // Visual Logic - Animated SVGs
  const getWeatherIcon = (code: number, isDay: boolean) => {
    const iconClasses = "w-6 h-6 drop-shadow-md filter";
    const strokeCap = { strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

    // 1. Thunderstorm (95-99) - Flashing Bolt + Rain
    if (code >= 95) {
      return (
        <svg className={iconClasses} viewBox="0 0 64 64">
           <path d="M44 32a10 10 0 1 1-20 0 8 8 0 1 1-16 0c0 8 6 10 10 10h20c8 0 10-4 10-10s-4-10-4-10z" fill="#4B5563" />
           {/* Flash Bolt */}
           <path d="M34 38 L26 50 H34 L30 62" stroke="#F59E0B" strokeWidth="3" fill="none" className="animate-flash" {...strokeCap} />
           {/* Fast Rain */}
           <line x1="20" y1="46" x2="16" y2="54" stroke="#60A5FA" strokeWidth="2" className="animate-rain" style={{animationDuration: '0.4s'}} {...strokeCap} />
           <line x1="44" y1="46" x2="40" y2="54" stroke="#60A5FA" strokeWidth="2" className="animate-rain" style={{animationDuration: '0.5s', animationDelay: '0.1s'}} {...strokeCap} />
        </svg>
      );
    }

    // 2. Snow (71-77, 85-86) - Swaying Flakes
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
       return (
        <svg className={iconClasses} viewBox="0 0 64 64">
           <path d="M46 38a10 10 0 1 1-20 0 8 8 0 1 1-16 0c0 10 6 14 10 14h20c8 0 12-6 12-12s-4-10-6-12z" fill="#D1D5DB" />
           {/* Swaying Snowflakes */}
           <circle cx="20" cy="50" r="2" fill="white" className="animate-snow-fall" style={{animationDuration: '3s'}} />
           <circle cx="32" cy="54" r="2.5" fill="white" className="animate-snow-fall" style={{animationDuration: '3.5s', animationDelay: '1s'}} />
           <circle cx="44" cy="50" r="2" fill="white" className="animate-snow-fall" style={{animationDuration: '2.8s', animationDelay: '2s'}} />
        </svg>
       );
    }

    // 3. Freezing Rain / Ice (56, 57, 66, 67)
    if ([56, 57, 66, 67].includes(code)) {
      return (
        <svg className={iconClasses} viewBox="0 0 64 64">
          <path d="M44 32a10 10 0 1 1-20 0 8 8 0 1 1-16 0c0 8 6 10 10 10h20c8 0 10-4 10-10s-4-10-4-10z" fill="#9CA3AF" />
          <line x1="24" y1="46" x2="22" y2="54" stroke="#60A5FA" strokeWidth="2" className="animate-rain" {...strokeCap} />
          {/* Ice Crystal */}
          <g className="animate-pulse-slow" transform="translate(38, 52)">
            <path d="M-4 0 L4 0 M0 -4 L0 4 M-3 -3 L3 3 M-3 3 L3 -3" stroke="white" strokeWidth="1.5" {...strokeCap} />
          </g>
        </svg>
      );
    }

    // 4. Rain (61-65, 80-82) - Drops
    if ((code >= 61 && code <= 65) || (code >= 80 && code <= 82)) {
      const isHeavy = code === 65 || code === 82;
      return (
        <svg className={iconClasses} viewBox="0 0 64 64">
          <path d="M42 30a10 10 0 1 1-20 0 8 8 0 1 1-16 0c0 8 6 10 10 10h20c8 0 10-4 10-10s-4-10-4-10z" fill={isHeavy ? "#6B7280" : "#9CA3AF"} />
          <line x1="22" y1="45" x2="22" y2="52" stroke="#60A5FA" strokeWidth="2" className="animate-rain" style={{animationDuration: '0.8s'}} {...strokeCap} />
          <line x1="32" y1="45" x2="32" y2="52" stroke="#60A5FA" strokeWidth="2" className="animate-rain" style={{animationDuration: '0.8s', animationDelay: '0.3s'}} {...strokeCap} />
          <line x1="42" y1="45" x2="42" y2="52" stroke="#60A5FA" strokeWidth="2" className="animate-rain" style={{animationDuration: '0.8s', animationDelay: '0.6s'}} {...strokeCap} />
        </svg>
      );
    }

    // 5. Drizzle (51-55) - Light Drops
    if (code >= 51 && code <= 55) {
      return (
        <svg className={iconClasses} viewBox="0 0 64 64">
          <path d="M44 32a10 10 0 1 1-20 0 8 8 0 1 1-16 0c0 8 6 10 10 10h20c8 0 10-4 10-10s-4-10-4-10z" fill="#D1D5DB" />
          <line x1="24" y1="46" x2="24" y2="50" stroke="#93C5FD" strokeWidth="2" className="animate-rain" style={{animationDuration: '1.5s'}} {...strokeCap} />
          <line x1="40" y1="46" x2="40" y2="50" stroke="#93C5FD" strokeWidth="2" className="animate-rain" style={{animationDuration: '1.5s', animationDelay: '0.5s'}} {...strokeCap} />
        </svg>
      );
    }

    // 6. Fog (45, 48) - Flowing Horizontal Lines
    if (code === 45 || code === 48) {
      return (
        <svg className={iconClasses} viewBox="0 0 64 64">
           <path d="M14 28h36" stroke="#9CA3AF" strokeWidth="3" className="animate-fog-flow" style={{animationDuration: '4s'}} {...strokeCap} />
           <path d="M10 36h44" stroke="#D1D5DB" strokeWidth="3" className="animate-fog-flow" style={{animationDuration: '6s', animationDirection: 'reverse'}} {...strokeCap} />
           <path d="M16 44h32" stroke="#9CA3AF" strokeWidth="3" className="animate-fog-flow" style={{animationDuration: '5s'}} {...strokeCap} />
        </svg>
      );
    }

    // 7. Overcast (3) - Parallax Clouds
    if (code === 3) {
        return (
            <svg className={iconClasses} viewBox="0 0 64 64">
                {/* Back cloud moves right */}
                <g className="animate-drift-reverse">
                   <path d="M32 28a8 8 0 1 1-16 0 6 6 0 1 1-12 0c0 8 5 11 8 11h16c6 0 8-5 8-10s-3-8-4-11z" fill="#6B7280" opacity="0.8" />
                </g>
                {/* Front cloud moves left */}
                <g className="animate-drift">
                   <path d="M46 40a10 10 0 1 1-20 0 8 8 0 1 1-16 0c0 10 6 14 10 14h20c8 0 12-6 12-12s-4-10-6-12z" fill="#9CA3AF" />
                </g>
            </svg>
        );
    }

    // 8. Partly Cloudy (1, 2)
    if (code === 1 || code === 2) {
        return (
            <svg className={iconClasses} viewBox="0 0 64 64">
                <g className={isDay ? "animate-sun-spin origin-[36px_24px]" : "animate-pulse"}>
                   {isDay ? (
                       <circle cx="36" cy="24" r="9" fill="#F5C45E" />
                   ) : (
                       <path d="M36 16a9 9 0 1 0 0 18 7 7 0 1 1 0-18z" fill="#FCD34D" />
                   )}
                </g>
                <g className="animate-drift">
                    <path d="M46 44a10 10 0 1 1-20 0 8 8 0 1 1-16 0c0 10 6 14 10 14h20c8 0 12-6 12-12s-4-10-6-12z" fill="#E5E7EB" />
                </g>
            </svg>
        );
    }

    // 9. Clear (0)
    if (isDay) {
        return (
          <svg className={iconClasses} viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="10" fill="#F5C45E" className="animate-pulse-slow" />
            <g className="animate-sun-spin origin-center">
              {[...Array(8)].map((_, i) => (
                <line 
                  key={i}
                  x1="32" y1="6" x2="32" y2="14" 
                  stroke="#F5C45E" strokeWidth="3" 
                  transform={`rotate(${i * 45} 32 32)`} 
                  {...strokeCap}
                />
              ))}
            </g>
          </svg>
        );
    } else {
        return (
            <svg className={iconClasses} viewBox="0 0 64 64">
                <path d="M36 18a12 12 0 1 0 0 24 10 10 0 1 1 0-24z" fill="#FCD34D" className="drop-shadow-[0_0_8px_rgba(252,211,77,0.6)]" />
                <circle cx="12" cy="18" r="1" fill="white" className="animate-twinkle" />
                <circle cx="52" cy="12" r="1.5" fill="white" className="animate-twinkle" style={{animationDelay: '1s'}} />
                <circle cx="56" cy="48" r="1" fill="white" className="animate-twinkle" style={{animationDelay: '0.5s'}} />
                <circle cx="16" cy="42" r="1" fill="white" className="animate-twinkle" style={{animationDelay: '1.5s'}} />
            </svg>
        );
    }
    return null;
  };

  if (loading) {
     return (
        <div className="flex items-center gap-3 pl-3 pr-3 py-1 rounded-full border border-white/5 bg-brand-dark/50 backdrop-blur-md">
           <div className="h-4 w-8 bg-white/20 rounded animate-pulse"></div>
           <div className="h-6 w-6 bg-white/20 rounded-full animate-pulse"></div>
        </div>
     );
  }

  if (!weather) return null;

  return (
    <div className="relative group cursor-help select-none z-50">
      <div className="flex items-center gap-3 pl-3 pr-3 py-1 rounded-full border border-white/5 bg-brand-dark/50 hover:bg-brand-dark/80 transition-all duration-300 backdrop-blur-md shadow-lg">
        <div className="flex flex-col items-end justify-center -space-y-0.5">
          <span className="text-sm font-bold text-white font-serif leading-tight">{weather.temperature}°C</span>
          <span className="text-[10px] text-brand-gold/90 uppercase font-bold tracking-wider">Orhei</span>
        </div>
        <div className="opacity-100 transform group-hover:scale-110 transition-transform">
          {getWeatherIcon(weather.weatherCode, weather.isDay)}
        </div>
      </div>
      <div className="absolute top-full right-0 mt-2 w-max px-3 py-1.5 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10 shadow-xl transform translate-y-1 group-hover:translate-y-0 z-[100]">
        {getWeatherDescription(weather.weatherCode, weather.isDay)}
      </div>
    </div>
  );
};

export default WeatherWidget;