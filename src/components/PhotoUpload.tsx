import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { uploadImage } from '@/lib/supabase';

interface PhotoUploadProps {
  onPhotoUploaded?: (url: string) => void;
}

const PhotoUpload = ({ onPhotoUploaded }: PhotoUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadStatus({
        type: 'error',
        message: 'Por favor, selecione apenas arquivos de imagem!'
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadStatus({
        type: 'error',
        message: 'A imagem deve ter no máximo 5MB!'
      });
      return;
    }

    // Store file and show preview
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    setUploadStatus({ type: null, message: '' });
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadStatus({ type: null, message: '' });

    const result = await uploadImage(selectedFile, caption, 'larissa');

    setIsUploading(false);

    if (result.success && result.url) {
      setUploadStatus({
        type: 'success',
        message: 'Foto enviada com sucesso! ✨'
      });
      onPhotoUploaded?.(result.url);
      
      // Clear after 3 seconds
      setTimeout(() => {
        handleClearPreview();
      }, 3000);
    } else {
      setUploadStatus({
        type: 'error',
        message: result.error || 'Erro ao enviar foto. Tente novamente!'
      });
    }
  };

  const handleClearPreview = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    setCaption('');
    setUploadStatus({ type: null, message: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Compartilhe suas fotos</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Envie as melhores fotos da sua viagem! 📸
          </p>
        </div>

        {/* Upload Area */}
        <div className="p-6">
          {!previewUrl ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
            >
              <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-foreground font-medium mb-1">
                Clique para enviar uma foto
              </p>
              <p className="text-sm text-muted-foreground">
                JPG, PNG ou GIF até 5MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              {!isUploading && uploadStatus.type !== 'success' && (
                <button
                  onClick={handleClearPreview}
                  className="absolute top-2 right-2 bg-destructive/90 hover:bg-destructive text-white rounded-full p-2 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                  <div className="text-center text-white">
                    <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin" />
                    <p className="font-medium">Enviando...</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Caption Input - shown when preview exists and not uploading */}
          {previewUrl && uploadStatus.type !== 'success' && !isUploading && (
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Adicione uma legenda (opcional) ✍️
                </label>
                <Textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Descreva este momento especial..."
                  className="resize-none"
                  rows={3}
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {caption.length}/200 caracteres
                </p>
              </div>
              
              <Button
                onClick={handleUpload}
                className="w-full gap-2"
                size="lg"
              >
                <Send className="w-4 h-4" />
                Enviar foto
              </Button>
            </div>
          )}

          {/* Status Messages */}
          {uploadStatus.message && (
            <div
              className={`mt-4 p-3 rounded-lg ${
                uploadStatus.type === 'success'
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}
            >
              <p className="text-sm font-medium">{uploadStatus.message}</p>
            </div>
          )}

          {/* Upload Another Button */}
          {uploadStatus.type === 'success' && (
            <Button
              onClick={() => {
                handleClearPreview();
                fileInputRef.current?.click();
              }}
              className="w-full mt-4"
            >
              Enviar outra foto
            </Button>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground">
          💡 <strong>Dica:</strong> As fotos enviadas aparecerão na galeria da viagem
          para todos verem! Compartilhe os melhores momentos de Cancún! 🌴
        </p>
      </div>
    </div>
  );
};

export default PhotoUpload;
