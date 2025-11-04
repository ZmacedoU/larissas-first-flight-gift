# 📸 Sistema de Upload de Fotos - Guia de Configuração

## 🎯 Visão Geral

O sistema permite que a Larissa envie fotos da viagem diretamente pelo site, e elas aparecem automaticamente na galeria para todos verem!

## 🆓 Solução 100% Gratuita - Supabase

**Plano Grátis inclui:**
- ✅ 1GB de armazenamento
- ✅ ~1000 fotos (assumindo 1MB cada)
- ✅ Sem limite de downloads
- ✅ Sem cartão de crédito necessário
- ✅ Upload rápido via CDN global

## 🚀 Passo a Passo para Configurar

### 1. Criar Conta no Supabase (2 minutos)

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Entre com GitHub, Google ou Email
4. É grátis, não precisa de cartão de crédito!

### 2. Criar Projeto (2 minutos)

1. Clique em "New Project"
2. Escolha um nome: `larissa-cancun-trip` (ou qualquer nome)
3. Crie uma senha forte (anote ela!)
4. Escolha a região mais próxima (ex: South America - São Paulo)
5. Clique em "Create new project"
6. Aguarde ~2 minutos enquanto o projeto é criado ☕

### 3. Obter as Credenciais (1 minuto)

1. No menu lateral, clique em **⚙️ Settings**
2. Clique em **API**
3. Você verá duas informações importantes:

   **Project URL** (algo como):
   ```
   https://xyzabc123.supabase.co
   ```

   **anon public** (uma chave longa que começa com `eyJ...`):
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. **Copie ambas!**

### 4. Criar o Bucket de Storage (2 minutos)

1. No menu lateral, clique em **🗄️ Storage**
2. Clique em **"Create a new bucket"**
3. Nome: `photos`
4. **IMPORTANTE:** Marque "Public bucket" ✅
5. Clique em "Create bucket"

### 5. Criar Tabela para Legendas (2 minutos)

Agora vamos criar uma tabela para salvar as legendas das fotos:

1. No menu lateral, clique em **🗄️ Database** (ou **Table Editor**)
2. Clique em **"Create a new table"**
3. Preencha:
   - **Name:** `photo_metadata`
   - Deixe as opções padrão marcadas
4. Clique em **"Save"**

5. Adicione as colunas necessárias:
   - Clique em **"Add Column"** para cada coluna abaixo:
   
   **Coluna 1:**
   - Name: `file_path`
   - Type: `text`
   - Default value: deixe vazio
   
   **Coluna 2:**
   - Name: `file_name`
   - Type: `text`
   
   **Coluna 3:**
   - Name: `caption`
   - Type: `text`
   
   **Coluna 4:**
   - Name: `uploaded_at`
   - Type: `timestamp with time zone`
   - Default value: `now()`

6. Clique em **"Save"**

### 6. Configurar Permissões da Tabela (1 minuto)

1. Com a tabela `photo_metadata` selecionada, clique em **"RLS disabled"**
2. Clique em **"Enable RLS"**
3. Clique em **"New Policy"**
4. Escolha **"For full customization"**
5. Preencha:
   - **Policy name:** `Allow Public Access`
   - **Allowed operations:** Marque `SELECT` e `INSERT` ✅
   - **Target roles:** `public` e `anon`
   - **USING expression:** `true`
6. Salve

### 7. Configurar Permissões do Storage (2 minutos)

Agora vamos permitir que qualquer pessoa faça upload:

1. Volte para **Storage** e clique no bucket **"photos"**
2. Vá na aba **"Policies"**
3. Clique em **"New Policy"**
4. Clique em **"For full customization"**
5. Preencha:
   - **Policy name:** `Allow Public Uploads`
   - **Allowed operations:** Marque `SELECT` e `INSERT` ✅
   - **Target roles:** `public` e `anon`
   - **USING expression:** Deixe em branco ou coloque `true`
6. Clique em **"Review"** e depois **"Save policy"**

7. Crie outra policy para permitir leitura:
   - Clique em **"New Policy"** novamente
   - **Policy name:** `Allow Public Downloads`
   - **Allowed operations:** Marque `SELECT` ✅
   - **Target roles:** `public` e `anon`
   - **USING expression:** `true`
   - Salve

### 8. Configurar o Projeto (1 minuto)

1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   copy .env.example .env
   ```

2. Abra o arquivo `.env` e cole suas credenciais:
   ```env
   VITE_SUPABASE_URL=https://xyzabc123.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Reinicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

## ✅ Testar o Sistema

1. Abra o site no navegador
2. Vá para a página "Aventura em Cancún"
3. Você verá a seção **"Compartilhe suas fotos"**
4. Clique e selecione uma foto
5. A foto será enviada automaticamente!
6. Clique em "Atualizar fotos" na galeria para ver todas as fotos

## 🎨 Como Funciona

```
📱 Usuário seleciona foto
    ↓
📤 Upload para Supabase Storage
    ↓
☁️ Foto armazenada na nuvem
    ↓
🌐 URL pública gerada
    ↓
🖼️ Foto aparece na galeria
```

## 📊 Monitorar Uso

1. No Supabase, vá em **Storage > photos**
2. Você verá todas as fotos na pasta `cancun-trip/`
3. Pode ver quantos MB está usando
4. Pode deletar fotos se necessário

## 🔒 Segurança

- ✅ Limite de 5MB por foto
- ✅ Apenas imagens são aceitas (JPG, PNG, GIF)
- ✅ Cada foto tem nome único com timestamp
- ✅ As chaves da API são públicas por design (modo anon)

## 🆘 Problemas Comuns

### Erro "Invalid API Key"
- ✅ Verifique se copiou a chave `anon` correta
- ✅ Reinicie o servidor após editar `.env`

### Erro "Storage bucket not found"
- ✅ Certifique-se de que o bucket se chama exatamente `photos`
- ✅ Verifique se o bucket foi criado

### Upload não funciona
- ✅ Verifique as policies do bucket
- ✅ Certifique-se de que marcou "Public bucket"
- ✅ Verifique o console do navegador (F12) para erros

### Fotos não aparecem na galeria
- ✅ Clique em "Atualizar fotos"
- ✅ Verifique se as fotos estão em `cancun-trip/` no Supabase

## 💡 Dicas

1. **Compartilhe o link:** Envie o link do site para a Larissa pelo WhatsApp
2. **Mobile-friendly:** Funciona perfeitamente no celular
3. **Câmera direta:** No mobile, pode tirar foto direto da câmera
4. **Tempo real:** As fotos aparecem para todos instantaneamente

## 🎉 Pronto!

Agora a Larissa pode enviar fotos de Cancún diretamente do celular, e todos podem ver a galeria em tempo real! 📸🌴

---

**Precisa de ajuda?** Qualquer dúvida, é só me avisar! 😊
