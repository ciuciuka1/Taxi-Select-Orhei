import React, { useEffect, useState } from 'react';

interface WeatherData {
  temperature: number;
  weatherCode: number;
}

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Orhei Coordinates
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
    const interval = setInterval(fetchWeather, 300000); // 5 mins
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (code: number) => {
    const iconClasses = "w-5 h-5 drop-shadow-sm"; 

    // --- PRIORITY 1: THUNDERSTORM (95-99) ---
    if (code >= 95) {
      return (
        <svg className={iconClasses} viewBox="0 0 64 64">
           <path d="M42 30a10 10 0 1 1-20 0 8 8 0 1 1-16 0c0 8 6 10 10 10h20c8 0 10-4 10-10s-4-10-4-10z" fill="#4B5563" />
           <path d="M30 40 L24 52 H32 L28 64" stroke="#F59E0B" strokeWidth="3" fill="none" className="animate-pulse" />
        </svg>
      )
    }

    // --- PRIORITY 2: SNOW (71-77, 85-86) ---
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
       return (
        <svg className={iconClasses} viewBox="0 0 64 64">
           <path d="M46 40a10 10 0 1 1-20 0 8 8 0 1 1-16 0c0 10 6 14 10 14h20c8 0 12-6 12-12s-4-10-6-12z" fill="#E5E7EB" />
           <circle cx="20" cy="54" r="2" fill="white" className="animate-pulse" />
           <circle cx="32" cy="58" r="2" fill="white" className="animate-pulse" style={{animationDelay: '0.5s'}} />
           <circle cx="44" cy="54" r="2" fill="white" className="animate-pulse" style={{animationDelay: '1s'}} />
        </svg>
       )
    }

    // --- PRIORITY 3: RAIN / DRIZZLE / SHOWERS (51-67, 80-82) ---
    // Critical fix: Range covers ALL rain types properly
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
      return (
        <svg className={iconClasses} viewBox="0 0 64 64">
          <path 
            d="M42 30a10 10 0 1 1-20 0 8 8 0 1 1-16 0c0 8 6 10 10 10h20c8 0 10-4 10-10s-4-10-4-10z" 
            fill="#6B7280" 
          />
          {/* Intense Rain Animation */}
          <g className="animate-rain">
             <line x1="24" y1="44" x2="20" y2="54" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
          </g>
          <g className="animate-rain" style={{ animationDelay: '0.2s' }}>
             <line x1="32" y1="44" x2="28" y2="54" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
          </g>
           <g className="animate-rain" style={{ animationDelay: '0.4s' }}>
             <line x1="40" y1="44" x2="36" y2="54" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      );
    }

    // --- PRIORITY 4: FOG (45, 48) ---
    if (code === 45 || code === 48) {
      return (
        <svg className={iconClasses} viewBox="0 0 64 64">
           <path d="M12 24h40" stroke="#9CA3AF" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
           <path d="M16 36h32" stroke="#9CA3AF" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
           <path d="M12 48h40" stroke="#9CA3AF" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
        </svg>
      )
    }

    // --- PRIORITY 5: CLOUDS (1, 2, 3) ---
    if (code >= 1 && code <= 3) {
      return (
        <svg className={iconClasses} viewBox="0 0 64 64">
          <path 
            d="M46 40a10 10 0 1 1-20 0 8 8 0 1 1-16 0c0 10 6 14 10 14h20c8 0 12-6 12-12s-4-10-6-12z" 
            fill="#9CA3AF" 
            className="animate-cloud-move"
          />
        </svg>
      );
    }

    // --- DEFAULT: SUN/CLEAR (0) ---
    return (
      <svg className={iconClasses} viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="10" fill="#F5C45E" />
        <g className="animate-spin-slow origin-center">
          {[...Array(8)].map((_, i) => (
            <line 
              key={i}
              x1="32" y1="6" x2="32" y2="2" 
              stroke="#F5C45E" strokeWidth="3" strokeLinecap="round"
              transform={`rotate(${i * 45} 32 32)`} 
            />
          ))}
        </g>
      </svg>
    );
  };

  if (loading || !weather) return null;

  return (
    <div className="relative group cursor-default select-none z-50">
      <div className="flex items-center gap-2 pl-3 pr-2 py-0.5 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
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
