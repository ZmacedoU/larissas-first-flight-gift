import { Plane, MapPin, ArrowLeftRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const FlightMap = () => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [weatherCondition, setWeatherCondition] = useState<string>('');
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  
  // Determine which flight to show based on current date
  const currentDate = new Date();
  
  // Define specific date and time boundaries
  const flightDepartureTime = new Date('2025-11-05T01:40:00'); // Decolagem ida
  const beachViewStart = new Date('2025-11-05T12:00:00'); // Meio-dia do dia 5
  const beachViewEnd = new Date('2025-11-12T12:00:00'); // Meio-dia do dia 12
  const returnFlightTime = new Date('2025-11-12T11:50:00'); // Decolagem volta
  const tripEnd = new Date('2025-11-14T00:00:00'); // Fim da viagem
  
  // Show outbound flight map before beach view
  const showOutboundMap = currentDate >= new Date(2025, 10, 4) && currentDate < beachViewStart;
  
  // Show beach view between specific times
  const showBeachPeriod = currentDate >= beachViewStart && currentDate < beachViewEnd;
  
  // Show return flight map on or after return date
  const showReturnMap = currentDate >= beachViewEnd && currentDate < tripEnd;
  
  // Debug
  console.log('Current Date:', currentDate);
  console.log('Show Outbound Map:', showOutboundMap);
  console.log('Show Beach Period:', showBeachPeriod);
  console.log('Show Return Map:', showReturnMap);
  
  // Fetch real Cancun weather from OpenWeather API
  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoadingWeather(true);
      try {
        // Using OpenWeather API - você pode substituir pela sua chave API
        // Por enquanto, usando uma API pública gratuita
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=21.1619&longitude=-86.8515&current_weather=true&temperature_unit=celsius'
        );
        const data = await response.json();
        
        if (data.current_weather) {
          setTemperature(Math.round(data.current_weather.temperature));
          
          // Map weather codes to conditions
          const weatherCode = data.current_weather.weathercode;
          if (weatherCode === 0) setWeatherCondition('☀️');
          else if (weatherCode <= 3) setWeatherCondition('⛅');
          else if (weatherCode <= 67) setWeatherCondition('🌧️');
          else if (weatherCode <= 77) setWeatherCondition('❄️');
          else setWeatherCondition('⛈️');
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
        // Fallback to default values
        setTemperature(28);
        setWeatherCondition('☀️');
      } finally {
        setIsLoadingWeather(false);
      }
    };
    
    if (showBeachPeriod) {
      fetchWeather();
      // Refresh weather every 30 minutes
      const interval = setInterval(fetchWeather, 30 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [showBeachPeriod]);
  
  // Beach View Component
  const BeachView = () => (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg animate-fade-in">
      {/* Beach Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://cdn.sanity.io/images/nxpteyfv/goguides/bf85d8a3a9e93c97238e881055b467e96e1d1eb0-1600x1066.jpg')",
        }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-8">
        {/* Top Section - Weather */}
        <div className="flex justify-end">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl">
            {isLoadingWeather ? (
              <div className="flex items-center gap-3">
                <div className="text-4xl animate-pulse">⏳</div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">Carregando...</p>
                  <p className="text-sm text-gray-600">Cancún</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="text-4xl">{weatherCondition || '☀️'}</div>
                <div>
                  <p className="text-3xl font-bold text-gray-800">
                    {temperature ? `${temperature}°C` : '--°C'}
                  </p>
                  <p className="text-sm text-gray-600">Cancún agora</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Bottom Section - Message */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl px-8 py-6 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            🎉 Bem-vinda a Cancún!
          </h2>
          <p className="text-gray-600">
            Aproveite cada momento dessa aventura incrível! 🌴🌊
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Show Beach View during specific period */}
      {showBeachPeriod && <BeachView />}
      
      {/* Show outbound flight map */}
      {showOutboundMap && !showBeachPeriod && (
      <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-sky/20 via-background to-ocean/20">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Flight Route Container */}
        <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
          {/* Origin - São Paulo */}
          <div className="absolute left-4 md:left-16 top-1/2 -translate-y-1/2 animate-fade-in">
            <div className="relative">
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse shadow-lg" />
              <div className="absolute -bottom-16 md:-bottom-20 left-1/2 -translate-x-1/2 w-20 md:w-32 text-center">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-1 text-primary" />
                <p className="font-bold text-foreground text-xs md:text-sm">GRU</p>
                <p className="text-[10px] md:text-xs text-muted-foreground hidden md:block">São Paulo</p>
                <p className="text-[10px] md:text-xs font-semibold text-primary mt-0.5 md:mt-1">01:40</p>
                <p className="text-[8px] md:text-[10px] text-muted-foreground">05/11</p>
              </div>
            </div>
          </div>

          {/* Destination - Cancún */}
          <div className="absolute right-4 md:right-16 top-1/2 -translate-y-1/2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <div className="w-4 h-4 bg-accent rounded-full animate-pulse shadow-lg" style={{ animationDelay: "0.5s" }} />
              <div className="absolute -bottom-16 md:-bottom-20 left-1/2 -translate-x-1/2 w-20 md:w-32 text-center">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-1 text-accent" />
                <p className="font-bold text-foreground text-xs md:text-sm">CUN</p>
                <p className="text-[10px] md:text-xs text-muted-foreground hidden md:block">Cancún</p>
                <p className="text-[10px] md:text-xs font-semibold text-accent mt-0.5 md:mt-1">10:12</p>
                <p className="text-[8px] md:text-[10px] text-muted-foreground">05/11</p>
              </div>
            </div>
          </div>

          {/* Flight Path */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="none" style={{ pointerEvents: 'none' }}>
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
              </linearGradient>
              
              {/* Path definition for plane animation */}
              <path
                id="flightPathOutbound"
                d="M 100 250 Q 400 100, 700 250"
                fill="none"
              />
            </defs>
            
            {/* Curved flight path - Always left to right (SP to Cancun) */}
            <path
              d="M 100 250 Q 400 100, 700 250"
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="4"
              strokeDasharray="12,8"
              className="animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            />
            
            {/* Shadow path for depth */}
            <path
              d="M 100 252 Q 400 102, 700 252"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeOpacity="0.2"
              strokeDasharray="12,8"
              className="animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            />
            
            {/* Animated Plane following the path */}
            <g className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                rotate="auto"
                path="M 100 250 Q 400 100, 700 250"
              >
                <mpath href="#flightPathOutbound" />
              </animateMotion>
              <foreignObject x="-20" y="-20" width="40" height="40">
                <div className="flex items-center justify-center w-full h-full">
                  <div className="text-2xl md:text-3xl" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
                    ✈️
                  </div>
                </div>
              </foreignObject>
            </g>
          </svg>
        </div>

        {/* Info Card - Ida */}
        <div className="absolute top-4 left-4 right-4 md:left-4 md:right-auto bg-card/95 backdrop-blur-sm px-3 md:px-4 py-2 md:py-3 rounded-lg shadow-md border border-border animate-fade-in">
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <Plane className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="font-semibold text-foreground text-sm md:text-base">Voo de Ida</span>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">GRU → CUN</p>
          <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 md:mt-1">Duração: 9h 30min</p>
          <p className="text-[10px] md:text-xs text-primary font-semibold mt-0.5 md:mt-1">05 de Novembro</p>
        </div>
      </div>
      )}

      {/* Return Flight - Volta */}
      {showReturnMap && (
      <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-accent/20 via-background to-sunset/20">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-accent"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid2)" />
          </svg>
        </div>

        {/* Flight Route Container */}
        <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
          {/* Origin - Cancún (RIGHT SIDE for return flight) */}
          <div className="absolute right-4 md:right-16 top-1/2 -translate-y-1/2 animate-fade-in">
            <div className="relative">
              <div className="w-4 h-4 bg-accent rounded-full animate-pulse shadow-lg" />
              <div className="absolute -bottom-16 md:-bottom-20 left-1/2 -translate-x-1/2 w-20 md:w-32 text-center">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-1 text-accent" />
                <p className="font-bold text-foreground text-xs md:text-sm">CUN</p>
                <p className="text-[10px] md:text-xs text-muted-foreground hidden md:block">Cancún</p>
                <p className="text-[10px] md:text-xs font-semibold text-accent mt-0.5 md:mt-1">11:50</p>
                <p className="text-[8px] md:text-[10px] text-muted-foreground">12/11</p>
              </div>
            </div>
          </div>

          {/* Destination - São Paulo (LEFT SIDE for return flight) */}
          <div className="absolute left-4 md:left-16 top-1/2 -translate-y-1/2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse shadow-lg" style={{ animationDelay: "0.5s" }} />
              <div className="absolute -bottom-16 md:-bottom-20 left-1/2 -translate-x-1/2 w-20 md:w-32 text-center">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-1 text-primary" />
                <p className="font-bold text-foreground text-xs md:text-sm">GRU</p>
                <p className="text-[10px] md:text-xs text-muted-foreground hidden md:block">São Paulo</p>
                <p className="text-[10px] md:text-xs font-semibold text-primary mt-0.5 md:mt-1">12:10</p>
                <p className="text-[8px] md:text-[10px] text-muted-foreground">13/11</p>
              </div>
            </div>
          </div>

          {/* Flight Path */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="none" style={{ pointerEvents: 'none' }}>
            <defs>
              <linearGradient id="pathGradientReturn" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              </linearGradient>
              
              {/* Path definition for plane animation - RIGHT TO LEFT */}
              <path
                id="flightPathReturn"
                d="M 700 250 Q 400 400, 100 250"
                fill="none"
              />
            </defs>
            
            {/* Curved flight path - RIGHT TO LEFT (Cancun to SP) */}
            <path
              d="M 700 250 Q 400 400, 100 250"
              fill="none"
              stroke="url(#pathGradientReturn)"
              strokeWidth="4"
              strokeDasharray="12,8"
              className="animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            />
            
            {/* Shadow path for depth */}
            <path
              d="M 700 248 Q 400 398, 100 248"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="2"
              strokeOpacity="0.2"
              strokeDasharray="12,8"
              className="animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            />
            
            {/* Animated Plane following the path - RIGHT TO LEFT */}
            <g className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                rotate="auto"
                path="M 700 250 Q 400 400, 100 250"
              >
                <mpath href="#flightPathReturn" />
              </animateMotion>
              <foreignObject x="-20" y="-20" width="40" height="40">
                <div className="flex items-center justify-center w-full h-full">
                  <div className="text-2xl md:text-3xl" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
                    ✈️
                  </div>
                </div>
              </foreignObject>
            </g>
          </svg>
        </div>

        {/* Info Card - Volta */}
        <div className="absolute top-4 left-4 right-4 md:left-4 md:right-auto bg-card/95 backdrop-blur-sm px-3 md:px-4 py-2 md:py-3 rounded-lg shadow-md border border-border animate-fade-in">
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <Plane className="w-4 h-4 md:w-5 md:h-5 text-accent transform scale-x-[-1]" />
            <span className="font-semibold text-foreground text-sm md:text-base">Voo de Volta</span>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">CUN → GRU</p>
          <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 md:mt-1">Duração: 9h 20min</p>
          <p className="text-[10px] md:text-xs text-accent font-semibold mt-0.5 md:mt-1">12 de Novembro</p>
        </div>
      </div>
      )}
    </div>
  );
};

export default FlightMap;
