# 🎁 Script de Commit Automático (PowerShell)
# Execute este arquivo para fazer commit de tudo de uma vez!

Write-Host "🔍 Verificando status do Git..." -ForegroundColor Cyan
git status

Write-Host ""
Write-Host "📦 Adicionando todos os arquivos..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "💾 Fazendo commit..." -ForegroundColor Green
git commit -m "🎁 Sistema completo de upload de fotos com Supabase

Features implementadas:
- Upload de fotos com preview e legendas
- Galeria polaroid animada e interativa
- Exclusão de fotos com loading visual
- Clima em tempo real de Cancún
- Animações de voo (ida e volta)
- Documentação completa e detalhada
- Design mobile-first responsive

Tech Stack:
- React 18 + TypeScript + Vite
- Supabase (Storage + PostgreSQL)
- OpenWeatherMap API
- Tailwind CSS + Shadcn/ui
- Bun package manager

Novos arquivos:
- src/lib/supabase.ts
- src/components/PhotoUpload.tsx
- SETUP_FOTOS.md
- GIT_INSTRUCTIONS.md
- GIT_CHEATSHEET.md
- CHECKLIST.md
- RESUMO.md
- PROJETO_COMPLETO.md
- .env.example

Arquivos modificados:
- src/components/PolaroidGallery.tsx
- src/pages/Journey.tsx
- src/components/FlightMap.tsx
- .gitignore
- README.md
- package.json"

Write-Host ""
Write-Host "🚀 Enviando para GitHub..." -ForegroundColor Magenta
git push

Write-Host ""
Write-Host "✅ Pronto! Commit feito com sucesso!" -ForegroundColor Green
Write-Host "🎉 Verifique no GitHub: https://github.com" -ForegroundColor Cyan
