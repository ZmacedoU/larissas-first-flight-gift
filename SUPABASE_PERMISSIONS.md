# 🔐 Configuração de Permissões do Supabase

## ⚠️ IMPORTANTE: Configure as permissões para permitir exclusão de fotos!

### 1. Permissões do Storage (Bucket 'photos')

Acesse: **Storage > photos > Policies**

Você precisa de **TRÊS** políticas:

#### Política 1: Upload (já deve existir)
```sql
CREATE POLICY "Allow public uploads"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'photos');
```

#### Política 2: Leitura (já deve existir)
```sql
CREATE POLICY "Allow public reads"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'photos');
```

#### ✅ Política 3: DELETAR (ADICIONE ESTA!)
```sql
CREATE POLICY "Allow public deletes"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'photos');
```

### 2. Permissões da Tabela 'photo_metadata'

Acesse: **Table Editor > photo_metadata > RLS (Row Level Security)**

Você precisa de **TRÊS** políticas:

#### Política 1: Inserir (já deve existir)
```sql
CREATE POLICY "Enable insert for all users"
ON public.photo_metadata
FOR INSERT
TO public
WITH CHECK (true);
```

#### Política 2: Ler (já deve existir)
```sql
CREATE POLICY "Enable read for all users"
ON public.photo_metadata
FOR SELECT
TO public
USING (true);
```

#### ✅ Política 3: DELETAR (ADICIONE ESTA!)
```sql
CREATE POLICY "Enable delete for all users"
ON public.photo_metadata
FOR DELETE
TO public
USING (true);
```

---

## 🛠️ Como Adicionar as Políticas de DELETE

### Para o Storage:

1. Acesse **Storage** no Supabase Dashboard
2. Clique no bucket **photos**
3. Vá na aba **Policies**
4. Clique em **New Policy**
5. Selecione **For full customization**
6. Configure assim:
   - **Policy name**: `Allow public deletes`
   - **Allowed operation**: `DELETE`
   - **Target roles**: `public`
   - **USING expression**: `bucket_id = 'photos'`
7. Clique em **Review** e depois **Save policy**

### Para a Tabela photo_metadata:

1. Acesse **Table Editor** no Supabase Dashboard
2. Selecione a tabela **photo_metadata**
3. Clique no botão **RLS** (Row Level Security) ou vá em **Policies**
4. Clique em **New Policy**
5. Selecione **For full customization**
6. Configure assim:
   - **Policy name**: `Enable delete for all users`
   - **Allowed operation**: `DELETE`
   - **Target roles**: `public`
   - **USING expression**: `true`
7. Clique em **Review** e depois **Save policy**

---

## 🧪 Testando as Permissões

Depois de adicionar as políticas, teste assim:

1. Abra o console do navegador (F12)
2. Faça upload de uma foto de teste
3. Tente deletar a foto clicando no "X"
4. Veja os logs no console:
   - Se aparecer erros de permissão, as policies não foram configuradas corretamente
   - Se aparecer "Deletado do storage com sucesso!" e "Metadata deletada com sucesso!", está tudo certo!

---

## 🔍 Verificando se as Políticas Existem

### No Supabase SQL Editor:

```sql
-- Ver políticas do storage
SELECT * FROM pg_policies WHERE tablename = 'objects';

-- Ver políticas da tabela photo_metadata
SELECT * FROM pg_policies WHERE tablename = 'photo_metadata';
```

Você deve ver 3 políticas para cada (INSERT, SELECT, DELETE).

---

## 🆘 Problemas Comuns

### Erro: "new row violates row-level security policy"
- **Solução**: Adicione a política de DELETE na tabela photo_metadata

### Erro: "permission denied for bucket"
- **Solução**: Adicione a política de DELETE no bucket photos do Storage

### A foto não some da tela
- **Solução**: Verifique o console do navegador (F12) para ver qual erro específico está ocorrendo

---

## 📞 Suporte

Se após configurar tudo ainda não funcionar:
1. Abra o console do navegador (F12)
2. Tente deletar uma foto
3. Copie TODOS os logs que aparecerem
4. Me envie os logs para eu te ajudar!
