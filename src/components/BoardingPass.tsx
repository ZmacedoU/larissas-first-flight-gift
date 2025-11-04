import { Plane } from "lucide-react";
import { Card } from "@/components/ui/card";

interface BoardingPassProps {
  onClick?: () => void;
}

const BoardingPass = ({ onClick }: BoardingPassProps) => {
  return (
    <Card 
      onClick={onClick}
      className="relative overflow-hidden bg-card hover:shadow-2xl transition-all duration-500 cursor-pointer max-w-2xl mx-auto hover:scale-105"
      style={{ boxShadow: "var(--shadow-ticket)" }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-ocean p-6 text-primary-foreground">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Plane className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">Primeira Viagem Internacional</h2>
              <p className="text-sm opacity-90">Boarding Pass</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Passenger Info */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Passageira</p>
          <p className="text-2xl font-bold text-foreground">Larissa</p>
        </div>

        {/* Flight Details */}
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Origem</p>
              <p className="text-3xl font-bold text-foreground">GRU</p>
              <p className="text-sm text-muted-foreground">São Paulo, Brasil</p>
              <p className="text-lg font-semibold text-foreground mt-2">01:00 AM</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Destino</p>
              <p className="text-3xl font-bold text-foreground">CUN</p>
              <p className="text-sm text-muted-foreground">Cancún, México</p>
              <p className="text-lg font-semibold text-foreground mt-2">10:12 AM</p>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Data</p>
            <p className="text-sm font-semibold text-foreground">Em Breve</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Portão</p>
            <p className="text-sm font-semibold text-foreground">--</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Assento</p>
            <p className="text-sm font-semibold text-foreground">--</p>
          </div>
        </div>

        {/* Barcode */}
        <div className="pt-4">
          <div className="h-16 bg-gradient-to-r from-muted via-border to-muted rounded flex items-center justify-center">
            <div className="flex gap-[2px] h-12">
              {Array.from({ length: 40 }).map((_, i) => (
                <div 
                  key={i} 
                  className="w-[3px] bg-foreground/80"
                  style={{ height: `${Math.random() * 60 + 40}%` }}
                />
              ))}
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2 font-mono">LARISSA-2024-CUN</p>
        </div>

        {/* Footer Message */}
        <div className="text-center pt-4">
          <p className="text-primary font-semibold">✨ Clique para iniciar a jornada ✨</p>
        </div>
      </div>

      {/* Decorative tear line */}
      <div className="absolute left-0 right-0 h-6" style={{ top: "calc(100% - 120px)" }}>
        <div className="flex justify-between px-2">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-background" />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default BoardingPass;
