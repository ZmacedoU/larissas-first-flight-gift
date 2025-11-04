import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BoardingPass from "@/components/BoardingPass";
import { Plane } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isTearing, setIsTearing] = useState(false);

  const handleTicketClick = () => {
    setIsTearing(true);
    setTimeout(() => {
      navigate("/journey");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-light via-background to-cloud flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-sky/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-sunset/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <Plane className="absolute top-1/4 right-1/4 w-8 h-8 text-sky/20 animate-plane-flight" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Uma Jornada Inesquecível
          </h1>
          <p className="text-xl text-muted-foreground">
            Para Larissa, em sua primeira aventura internacional 🌎
          </p>
        </div>

        <div className={`relative ${isTearing ? 'ticket-tear-animation' : ''}`}>
          <BoardingPass onClick={handleTicketClick} />
          
          {/* Tear effect overlay */}
          {isTearing && (
            <>
              <div className="absolute inset-0 pointer-events-none">
                <div className="tear-top" />
                <div className="tear-bottom" />
              </div>
            </>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          Um presente especial para uma viagem ainda mais especial ✨
        </p>
      </div>
    </div>
  );
};

export default Index;
