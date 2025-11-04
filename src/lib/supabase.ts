import { createClient } from '@supabase/supabase-js';

// INSTRUÇÕES PARA CONFIGURAR:
// 1. Acesse https://supabase.com e crie uma conta grátis
// 2. Crie um novo projeto
// 3. Vá em Settings > API
// 4. Copie a URL e a anon key
// 5. Substitua os valores abaixo

// Para desenvolvimento/teste, você pode usar estas credenciais temporárias
// ou substituir pelas suas próprias
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://eyajgdweeejcjprtkzad.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5YWpnZHdlZWVqY2pwcnRremFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyMzAwNDAsImV4cCI6MjA3NzgwNjA0MH0.MM5Fokk503W_9oX1h6xbRmPRzBw2WqIHh6911zAl6R0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Função helper para fazer upload de imagem com legenda
export async function uploadImage(file: File, caption: string = '', userId: string = 'guest') {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `cancun-trip/${fileName}`;

    const { data, error } = await supabase.storage
      .from('photos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type
      });

    if (error) throw error;

    // Save metadata (caption) to database
    if (caption) {
      const { error: metadataError } = await supabase
        .from('photo_metadata')
        .insert({
          file_path: filePath,
          file_name: fileName,
          caption: caption,
          uploaded_at: new Date().toISOString()
        });

      if (metadataError) {
        console.error('Error saving metadata:', metadataError);
        // Don't fail the upload if metadata save fails
      }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('photos')
      .getPublicUrl(filePath);

    return {
      success: true,
      url: urlData.publicUrl,
      path: filePath
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao fazer upload'
    };
  }
}

// Função para listar todas as fotos com suas legendas
export async function listPhotos() {
  try {
    // Get files from storage
    const { data: files, error: storageError } = await supabase.storage
      .from('photos')
      .list('cancun-trip', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (storageError) throw storageError;

    // Get metadata (captions) from database
    const { data: metadata, error: metadataError } = await supabase
      .from('photo_metadata')
      .select('*')
      .order('uploaded_at', { ascending: false });

    // Create a map of file paths to captions
    const captionMap = new Map(
      metadata?.map(m => [m.file_name, m.caption]) || []
    );

    // Get public URLs and merge with captions
    const photos = files.map((file) => {
      const { data: urlData } = supabase.storage
        .from('photos')
        .getPublicUrl(`cancun-trip/${file.name}`);
      
      return {
        name: file.name,
        url: urlData.publicUrl,
        createdAt: file.created_at,
        caption: captionMap.get(file.name) || ''
      };
    });

    return { success: true, photos };
  } catch (error) {
    console.error('Error listing photos:', error);
    return { success: false, photos: [] };
  }
}

// Função para deletar uma foto
export async function deletePhoto(fileName: string) {
  try {
    console.log('deletePhoto chamado com fileName:', fileName);
    const filePath = `cancun-trip/${fileName}`;
    console.log('Caminho completo do arquivo:', filePath);
    
    // Delete from storage
    console.log('Tentando deletar do storage...');
    const { error: storageError } = await supabase.storage
      .from('photos')
      .remove([filePath]);

    if (storageError) {
      console.error('Erro no storage:', storageError);
      throw storageError;
    }
    console.log('Deletado do storage com sucesso!');

    // Delete metadata from database
    console.log('Tentando deletar metadata da tabela...');
    const { error: metadataError } = await supabase
      .from('photo_metadata')
      .delete()
      .eq('file_name', fileName);

    if (metadataError) {
      console.error('Erro ao deletar metadata:', metadataError);
      // Don't fail the delete if metadata deletion fails
    } else {
      console.log('Metadata deletada com sucesso!');
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting photo:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao deletar'
    };
  }
}
