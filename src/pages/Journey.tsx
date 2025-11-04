import FlightMap from "@/components/FlightMap";
import PolaroidGallery from "@/components/PolaroidGallery";
import PhotoUpload from "@/components/PhotoUpload";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Journey = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Aventura em Cancún ✈️</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <Home className="w-4 h-4" />
            Voltar
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Flight Map Section */}
        <section className="animate-fade-in-up">
          <FlightMap />
        </section>

        {/* Photo Upload Section */}
        <section className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <PhotoUpload onPhotoUploaded={() => {
            // Reload gallery after upload
            window.location.reload();
          }} />
        </section>

        {/* Polaroid Gallery Section */}
        <section className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <PolaroidGallery />
        </section>
      </main>
    </div>
  );
} 

export default Journey;
