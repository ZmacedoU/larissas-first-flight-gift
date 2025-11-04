# Welcome to Larissa's First Flight Gift 🎁✈️

Um site especial para a primeira viagem internacional da Larissa para Cancún!

---

## 🎯 COMECE AQUI

### 📑 **[INDEX.md](./INDEX.md)** ← ÍNDICE COMPLETO DA DOCUMENTAÇÃO

### ⭐ **[PROJETO_COMPLETO.md](./PROJETO_COMPLETO.md)** ← LEIA PRIMEIRO!

---

## 📚 Documentação Disponível

- **[INDEX.md](./INDEX.md)** - 📑 Índice navegável de toda documentação
- **[PROJETO_COMPLETO.md](./PROJETO_COMPLETO.md)** - ⭐ Sumário e próximos passos
- **[CHECKLIST.md](./CHECKLIST.md)** - ✅ Checklist completo antes de dar o presente
- **[SETUP_FOTOS.md](./SETUP_FOTOS.md)** - 🔧 Guia detalhado de configuração do Supabase
- **[SUPABASE_PERMISSIONS.md](./SUPABASE_PERMISSIONS.md)** - 🔐 Configuração de permissões para deletar fotos
- **[TESTE_DELETE.md](./TESTE_DELETE.md)** - 🧪 Como testar se a exclusão de fotos está funcionando
- **[GIT_INSTRUCTIONS.md](./GIT_INSTRUCTIONS.md)** - 📦 Tutorial completo de Git
- **[GIT_CHEATSHEET.md](./GIT_CHEATSHEET.md)** - ⚡ Cola de comandos Git
- **[RESUMO.md](./RESUMO.md)** - 📝 Resumo executivo do projeto

## ✨ Funcionalidades

- 🗺️ **Mapa de voo interativo** com animação do avião
- 🏖️ **Vista da praia** com temperatura em tempo real de Cancún
- 📸 **Upload de fotos** da viagem em tempo real
- 🖼️ **Galeria estilo polaroid** com todas as fotos
- 📱 **Totalmente responsivo** para mobile e desktop
- 🎨 **Design moderno** com animações suaves

## 🚀 Configuração Rápida

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar Upload de Fotos (Opcional)

Para habilitar o upload de fotos, siga o guia completo em [`SETUP_FOTOS.md`](./SETUP_FOTOS.md)

**Resumo rápido:**
1. Crie conta grátis em [supabase.com](https://supabase.com)
2. Crie um projeto
3. Crie um bucket "photos" como público
4. Copie `.env.example` para `.env`
5. Cole suas credenciais no `.env`
6. Reinicie o servidor

### 3. Iniciar o projeto
```bash
npm run dev
```

## 📅 Cronograma da Viagem

- **04-05/11**: Mapa de ida com avião em loop
- **05/11 12:00 - 12/11 12:00**: Vista da praia de Cancún
- **12-13/11**: Mapa de volta com direção invertida
- **Após 14/11**: Fim da viagem

## 🎯 Como Usar

1. Abra o site no navegador
2. Clique em "Abrir Passagem" na home
3. Veja o mapa do voo com avião animado
4. Envie fotos pela seção de upload
5. Veja as fotos na galeria estilo polaroid

## 📸 Sistema de Fotos

- ✅ Upload gratuito via Supabase
- ✅ 1GB de espaço grátis (~1000 fotos)
- ✅ Fotos aparecem em tempo real
- ✅ Funciona no mobile (pode tirar foto direto)
- ✅ Limite de 5MB por foto

## 🛠️ Tecnologias

- **React** + **TypeScript**
- **Vite** para build rápido
- **Tailwind CSS** para estilização
- **Supabase** para storage de fotos
- **Open-Meteo API** para clima em tempo real
- **Shadcn/ui** para componentes

## Como posso editar este código?

Existem várias maneiras de editar sua aplicação.

**Use o Lovable**

Basta visitar o [Projeto Lovable](https://lovable.dev/projects/88f8d8e9-fd1e-467f-8f22-5445b3d3bb71) e começar a editar.

As alterações feitas pelo Lovable serão comprometidas automaticamente neste repositório.

**Use seu IDE preferido**

Se você quiser trabalhar localmente usando seu próprio IDE, pode clonar este repositório e enviar as alterações. As alterações enviadas também serão refletidas no Lovable.

A única exigência é ter o Node.js e npm instalados - [instalar com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Siga estes passos:

```sh
# Passo 1: Clone o repositório usando a URL Git do projeto.
git clone <YOUR_GIT_URL>

# Passo 2: Navegue até o diretório do projeto.
cd <YOUR_PROJECT_NAME>

# Passo 3: Instale as dependências necessárias.
npm i

# Passo 4: Inicie o servidor de desenvolvimento com recarregamento automático e uma prévia instantânea.
npm run dev
```

**Edite um arquivo diretamente no GitHub**

- Navegue até o(s) arquivo(s) desejado(s).
- Clique no botão "Editar" (ícone de lápis) no canto superior direito da visualização do arquivo.
- Faça suas alterações e confirme as mudanças.

**Use GitHub Codespaces**

- Navegue até a página principal do seu repositório.
- Clique no botão "Code" (botão verde) perto do canto superior direito.
- Selecione a aba "Codespaces".
- Clique em "New codespace" para iniciar um novo ambiente Codespace.
- Edite arquivos diretamente dentro do Codespace e confirme e envie suas alterações assim que terminar.

## Como posso implantar este projeto?

Basta abrir o [Lovable](https://lovable.dev/projects/88f8d8e9-fd1e-467f-8f22-5445b3d3bb71) e clicar em Compartilhar -> Publicar.

## Posso conectar um domínio personalizado ao meu projeto Lovable?

Sim, você pode!

Para conectar um domínio, navegue até Projeto > Configurações > Domínios e clique em Conectar Domínio.

Leia mais aqui: [Configurando um domínio personalizado](https://docs.lovable.dev/features/custom-domain#custom-domain)
