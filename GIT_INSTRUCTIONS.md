# 📦 Instruções para Commit no Git

Este guia te mostrará como salvar e enviar suas mudanças para o GitHub usando o Git.

---

## 🚀 Passo a Passo Completo

### 1️⃣ Verificar o Status do Projeto

Primeiro, vamos ver quais arquivos foram modificados ou criados:

```bash
git status
```

Você verá uma lista de arquivos em vermelho (não adicionados) ou verde (já adicionados).

---

### 2️⃣ Adicionar os Arquivos ao Stage

Você tem duas opções:

#### **Opção A: Adicionar TODOS os arquivos** (recomendado)
```bash
git add .
```

#### **Opção B: Adicionar arquivos específicos**
```bash
git add src/components/PolaroidGallery.tsx
git add src/components/PhotoUpload.tsx
git add src/lib/supabase.ts
git add SETUP_FOTOS.md
git add README.md
git add .env.example
```

---

### 3️⃣ Criar um Commit

Agora vamos "empacotar" as mudanças com uma mensagem descritiva:

```bash
git commit -m "Adiciona sistema completo de upload de fotos com Supabase"
```

Ou uma mensagem mais detalhada:

```bash
git commit -m "feat: sistema de fotos com upload, galeria e exclusão

- Integração com Supabase para armazenamento
- Upload de fotos com legendas
- Galeria estilo polaroid com exibição de legendas
- Funcionalidade de exclusão de fotos
- API de clima em tempo real
- Documentação completa de setup"
```

---

### 4️⃣ Enviar para o GitHub

Se é o **primeiro push** deste branch:

```bash
git push -u origin main
```

Ou se o branch já existe:

```bash
git push
```

> **Nota**: Se seu branch principal se chama `master` em vez de `main`, use `master` no lugar.

---

## 🔄 Fluxo Completo (Resumo)

```bash
# 1. Ver o que mudou
git status

# 2. Adicionar tudo
git add .

# 3. Fazer commit
git commit -m "Adiciona sistema de fotos com Supabase"

# 4. Enviar para GitHub
git push
```

---

## 🆕 Se Este é um Novo Projeto (Primeira Vez)

Se você ainda não inicializou o Git ou conectou ao GitHub:

### 1. Inicializar o Git
```bash
git init
```

### 2. Adicionar todos os arquivos
```bash
git add .
```

### 3. Fazer o primeiro commit
```bash
git commit -m "Initial commit: gift website with photo system"
```

### 4. Conectar ao GitHub

Primeiro, crie um repositório no GitHub (https://github.com/new), depois:

```bash
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPO.git
git branch -M main
git push -u origin main
```

Substitua `SEU-USUARIO` e `NOME-DO-REPO` pelos valores reais.

---

## 🔐 Importante: Segurança

**NUNCA** faça commit do arquivo `.env` com suas chaves reais!

Para garantir:

1. Certifique-se de que `.env` está no `.gitignore`:
```bash
echo ".env" >> .gitignore
```

2. Verifique se ele não está sendo rastreado:
```bash
git status
```

Se você ver `.env` na lista, remova-o:
```bash
git rm --cached .env
```

---

## 📝 Boas Práticas para Mensagens de Commit

### Exemplos de boas mensagens:
- ✅ `"Adiciona upload de fotos com Supabase"`
- ✅ `"Corrige bug na exclusão de fotos"`
- ✅ `"Melhora layout da galeria polaroid"`
- ✅ `"Atualiza documentação do setup"`

### Exemplos de mensagens ruins:
- ❌ `"update"` (muito vaga)
- ❌ `"fix"` (não diz o que foi corrigido)
- ❌ `"asdfasdf"` (sem sentido)

---

## 🆘 Comandos Úteis

### Ver histórico de commits
```bash
git log
```

Ou versão mais bonita:
```bash
git log --oneline --graph --all
```

### Ver diferenças antes de fazer commit
```bash
git diff
```

### Desfazer o último commit (mantendo as mudanças)
```bash
git reset --soft HEAD~1
```

### Ver branches existentes
```bash
git branch
```

### Criar e trocar para um novo branch
```bash
git checkout -b nome-do-branch
```

---

## 🎯 Recomendação para Este Projeto

Como este é um presente especial, sugiro fazer um commit bem documentado:

```bash
# Adicionar tudo
git add .

# Commit com mensagem detalhada
git commit -m "🎁 Sistema completo de fotos da viagem para Cancún

Features:
- Upload de fotos via Supabase Storage
- Galeria estilo polaroid com animações
- Legendas personalizadas para cada foto
- Exclusão de fotos com confirmação visual
- API de clima em tempo real de Cancún
- Documentação completa de setup

Tecnologias:
- React + TypeScript
- Supabase (Storage + Database)
- Tailwind CSS + Shadcn/ui
- Vite"

# Enviar para GitHub
git push
```

---

## ❓ Problemas Comuns

### "Permission denied (publickey)"
Configure sua chave SSH ou use HTTPS com token de acesso pessoal.

### "Updates were rejected because the remote contains work"
```bash
git pull --rebase origin main
git push
```

### "fatal: not a git repository"
Você precisa inicializar o git primeiro:
```bash
git init
```

---

## 📚 Recursos Extras

- [GitHub Desktop](https://desktop.github.com/) - Interface gráfica para Git
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)

---

**Feito com ❤️ para Larissa - Boa viagem para Cancún! 🏝️✈️**
