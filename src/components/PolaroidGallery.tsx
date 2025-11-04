import { useState, useRef, useEffect } from 'react';
import { Plus, X, RefreshCw, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { listPhotos, deletePhoto } from '@/lib/supabase';

interface Photo {
  id: string;
  url: string;
  caption: string;
  rotation: number;
  name?: string;
}

const PolaroidGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingPhotoId, setDeletingPhotoId] = useState<string | null>(null);

  // Load photos from Supabase on component mount
  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    setIsLoading(true);
    const result = await listPhotos();
    
    if (result.success) {
      const loadedPhotos: Photo[] = result.photos.map((photo) => ({
        id: photo.name,
        url: photo.url,
        caption: photo.caption || '', // Use caption from database
        rotation: Math.random() * 8 - 4,
        name: photo.name
      }));
      setPhotos(loadedPhotos);
    }
    
    setIsLoading(false);
  };

  const removePhoto = async (id: string) => {
    console.log('Tentando deletar foto com ID:', id);
    setDeletingPhotoId(id);
    
    const result = await deletePhoto(id);
    console.log('Resultado da exclusão:', result);
    
    if (result.success) {
      console.log('Foto deletada com sucesso, removendo da UI');
      setPhotos((prev) => prev.filter((photo) => photo.id !== id));
    } else {
      console.error('Erro ao deletar:', result.error);
      alert('Erro ao deletar foto: ' + result.error);
    }
    
    setDeletingPhotoId(null);
  };

  return (
    <div className="w-full py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Quadro de Memórias</h2>
        <p className="text-muted-foreground">Fotos da viagem em tempo real</p>
        
        {/* Refresh Button */}
        <Button
          onClick={loadPhotos}
          variant="outline"
          size="sm"
          className="mt-4"
          disabled={isLoading}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Carregando...' : 'Atualizar fotos'}
        </Button>
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
              disabled={deletingPhotoId === photo.id}
              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow-md hover:scale-110 transition-transform z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deletingPhotoId === photo.id ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <X className="w-4 h-4" />
              )}
            </button>
            
            <div className="w-64 h-64 bg-muted overflow-hidden">
              <img
                src={photo.url}
                alt="Memória da viagem"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Display caption (read-only) */}
            {photo.caption && (
              <p
                className="w-full mt-3 text-center font-handwriting text-sm text-gray-700"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                {photo.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      {photos.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <ImageIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">
            Ainda não há fotos. Use a seção acima para enviar a primeira! 📸
          </p>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');
      `}</style>
    </div>
  );
};

export default PolaroidGallery;
