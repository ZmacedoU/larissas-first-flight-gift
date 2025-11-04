# ⚡ Comandos Práticos - Cola de Git

## 🎯 Fluxo Básico (Copie e Cole)

```bash
# Ver o que mudou
git status

# Adicionar tudo
git add .

# Fazer commit
git commit -m "Adiciona sistema de fotos com Supabase"

# Enviar para GitHub
git push
```

---

## 🔥 Comandos Úteis do Dia a Dia

### Ver histórico
```bash
git log --oneline
```

### Ver diferenças
```bash
git diff
```

### Desfazer último commit (mantém mudanças)
```bash
git reset --soft HEAD~1
```

### Ver branches
```bash
git branch
```

### Criar branch novo
```bash
git checkout -b feature/nova-funcionalidade
```

### Voltar para main
```bash
git checkout main
```

### Atualizar com GitHub
```bash
git pull
```

---

## 📦 Para Este Projeto Especificamente

### Commit detalhado (recomendado)
```bash
git add .
git commit -m "🎁 Sistema completo de fotos da viagem

- Upload de fotos com legendas
- Galeria polaroid interativa
- Exclusão de fotos
- Clima em tempo real
- Documentação completa"
git push
```

### Commit rápido
```bash
git add . && git commit -m "Adiciona sistema de fotos" && git push
```

---

## 🆕 Se é a Primeira Vez

```bash
# 1. Inicializar Git
git init

# 2. Adicionar tudo
git add .

# 3. Primeiro commit
git commit -m "Initial commit: gift website"

# 4. Conectar ao GitHub (crie o repo no GitHub antes)
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPO.git
git branch -M main
git push -u origin main
```

---

## 🔒 Segurança - Antes do Primeiro Commit

```bash
# Certifique-se de que .env não está sendo rastreado
git status

# Se .env aparecer, remova:
git rm --cached .env

# Adicione ao .gitignore se ainda não estiver
echo ".env" >> .gitignore

# Agora pode commitar
git add .
git commit -m "Initial commit"
```

---

## 🆘 Problemas Comuns

### "nothing to commit"
```bash
# Veja se você salvou os arquivos no editor!
# Ou se já commitou tudo
git status
```

### "fatal: not a git repository"
```bash
# Você precisa inicializar
git init
```

### "Updates were rejected"
```bash
# Alguém atualizou o repo antes de você
git pull --rebase origin main
git push
```

### Esqueci a mensagem do commit
```bash
# Editor abrirá, digite a mensagem, salve e feche
git commit
```

---

## 📱 GitHub Desktop (Alternativa Visual)

Se preferir não usar comandos, baixe:
https://desktop.github.com/

É uma interface gráfica muito mais fácil! 😊

---

**💡 Dica**: Salve este arquivo! Você vai usar várias vezes. 
