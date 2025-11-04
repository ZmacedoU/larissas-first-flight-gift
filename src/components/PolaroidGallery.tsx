import { useState, useRef } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Photo {
  id: string;
  url: string;
  caption: string;
  rotation: number;
}

const PolaroidGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto: Photo = {
          id: Date.now().toString() + Math.random(),
          url: e.target?.result as string,
          caption: '',
          rotation: Math.random() * 8 - 4, // Random rotation between -4 and 4 degrees
        };
        setPhotos((prev) => [...prev, newPhoto]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  const updateCaption = (id: string, caption: string) => {
    setPhotos((prev) =>
      prev.map((photo) => (photo.id === id ? { ...photo, caption } : photo))
    );
  };

  return (
    <div className="w-full py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Quadro de Memórias</h2>
        <p className="text-muted-foreground">Registre os melhores momentos da viagem</p>
      </div>

      <div className="flex flex-wrap gap-6 justify-center items-start mb-8 min-h-[200px]">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="relative bg-white p-3 pb-16 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-polaroid-appear"
            style={{
              transform: `rotate(${photo.rotation}deg)`,
              animationDelay: `${index * 0.1}s`,
              '--rotation': `${photo.rotation}deg`,
            } as React.CSSProperties}
          >
            <button
              onClick={() => removePhoto(photo.id)}
              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow-md hover:scale-110 transition-transform z-10"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="w-64 h-64 bg-muted overflow-hidden">
              <img
                src={photo.url}
                alt="Memória da viagem"
                className="w-full h-full object-cover"
              />
            </div>
            
            <input
              type="text"
              placeholder="Adicione uma legenda..."
              value={photo.caption}
              onChange={(e) => updateCaption(photo.id, e.target.value)}
              className="w-full mt-3 text-center font-handwriting text-sm text-gray-700 bg-transparent border-none focus:outline-none placeholder:text-gray-400"
              style={{ fontFamily: "'Caveat', cursive" }}
            />
          </div>
        ))}

        {/* Add Photo Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-64 h-80 bg-card border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-3 hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
            <Plus className="w-8 h-8 text-primary" />
          </div>
          <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            Adicionar Foto
          </p>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');
      `}</style>
    </div>
  );
};

export default PolaroidGallery;
