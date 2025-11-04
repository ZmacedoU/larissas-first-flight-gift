# 🧪 Script de Teste - Permissões do Supabase

Execute este código no console do navegador (F12 > Console) para testar se as permissões estão corretas:

```javascript
// 1. Importar o cliente Supabase
import { supabase } from './src/lib/supabase';

// 2. Testar listagem de fotos
console.log('=== TESTE 1: Listar fotos ===');
const { data: files, error: listError } = await supabase.storage
  .from('photos')
  .list('cancun-trip');

if (listError) {
  console.error('❌ Erro ao listar:', listError);
} else {
  console.log('✅ Fotos listadas:', files);
}

// 3. Testar se consegue deletar (use o nome de uma foto real)
const fotoParaTestar = files[0]?.name; // Pega a primeira foto
if (fotoParaTestar) {
  console.log('=== TESTE 2: Deletar foto ===');
  console.log('Tentando deletar:', fotoParaTestar);
  
  const { error: deleteError } = await supabase.storage
    .from('photos')
    .remove([`cancun-trip/${fotoParaTestar}`]);
  
  if (deleteError) {
    console.error('❌ Erro ao deletar do storage:', deleteError);
    console.error('Detalhes:', deleteError.message);
  } else {
    console.log('✅ Foto deletada do storage!');
  }

  // Testar delete da metadata
  const { error: metadataError } = await supabase
    .from('photo_metadata')
    .delete()
    .eq('file_name', fotoParaTestar);
  
  if (metadataError) {
    console.error('❌ Erro ao deletar metadata:', metadataError);
    console.error('Detalhes:', metadataError.message);
  } else {
    console.log('✅ Metadata deletada!');
  }
}
```

## ⚡ Teste Rápido no App

1. Abra o site no navegador
2. Abra o console (F12)
3. Faça upload de uma foto de teste
4. Clique no "X" para deletar
5. Veja os logs que aparecem no console

### O que você deve ver se estiver funcionando:
```
Tentando deletar foto com ID: guest-1730745600000.jpg
deletePhoto chamado com fileName: guest-1730745600000.jpg
Caminho completo do arquivo: cancun-trip/guest-1730745600000.jpg
Tentando deletar do storage...
Deletado do storage com sucesso!
Tentando deletar metadata da tabela...
Metadata deletada com sucesso!
Resultado da exclusão: {success: true}
Foto deletada com sucesso, removendo da UI
```

### O que você verá se NÃO tiver permissão:
```
Tentando deletar foto com ID: guest-1730745600000.jpg
deletePhoto chamado com fileName: guest-1730745600000.jpg
Caminho completo do arquivo: cancun-trip/guest-1730745600000.jpg
Tentando deletar do storage...
Erro no storage: {message: "new row violates row-level security policy", ...}
```

## 🔧 Se aparecer erro de permissão:

1. Vá para o Supabase Dashboard
2. Siga as instruções do arquivo `SUPABASE_PERMISSIONS.md`
3. Adicione as políticas de DELETE no Storage e na tabela
4. Teste novamente!
