import { Plane, MapPin } from 'lucide-react';

const FlightMap = () => {
  return (
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
      <div className="relative w-full h-full flex items-center justify-center p-12">
        {/* Origin - São Paulo */}
        <div className="absolute left-16 top-1/2 -translate-y-1/2 animate-fade-in">
          <div className="relative">
            <div className="w-4 h-4 bg-primary rounded-full animate-pulse shadow-lg" />
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-32 text-center">
              <MapPin className="w-5 h-5 mx-auto mb-1 text-primary" />
              <p className="font-bold text-foreground text-sm">GRU</p>
              <p className="text-xs text-muted-foreground">São Paulo</p>
              <p className="text-xs font-semibold text-primary mt-1">01:40 AM</p>
            </div>
          </div>
        </div>

        {/* Destination - Cancún */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="relative">
            <div className="w-4 h-4 bg-accent rounded-full animate-pulse shadow-lg" style={{ animationDelay: "0.5s" }} />
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-32 text-center">
              <MapPin className="w-5 h-5 mx-auto mb-1 text-accent" />
              <p className="font-bold text-foreground text-sm">CUN</p>
              <p className="text-xs text-muted-foreground">Cancún</p>
              <p className="text-xs font-semibold text-accent mt-1">10:12 AM</p>
            </div>
          </div>
        </div>

        {/* Flight Path */}
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          
          {/* Curved flight path */}
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
        </svg>

        {/* Animated Plane */}
        <div className="absolute left-16 top-1/2 -translate-y-1/2">
          <div className="animate-plane-flight">
            <Plane className="w-8 h-8 text-primary transform rotate-45" />
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-md border border-border animate-fade-in">
        <div className="flex items-center gap-2 mb-2">
          <Plane className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground">Rota de Voo</span>
        </div>
        <p className="text-sm text-muted-foreground">GRU → CUN</p>
        <p className="text-xs text-muted-foreground mt-1">Duração: 9h 30min</p>
        <p className="text-xs text-primary font-semibold mt-1">05 de Novembro</p>
      </div>
    </div>
  );
};

export default FlightMap;
