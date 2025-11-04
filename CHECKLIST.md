# ✅ Checklist Final - Antes de Dar o Presente

## 📋 Configuração do Supabase

- [ ] Criar conta no Supabase (https://supabase.com)
- [ ] Criar novo projeto
- [ ] Copiar URL do projeto
- [ ] Copiar chave ANON
- [ ] Criar bucket "photos" no Storage
- [ ] Tornar bucket público
- [ ] Criar tabela `photo_metadata` (SQL no SETUP_FOTOS.md)
- [ ] Configurar políticas RLS (SQL no SETUP_FOTOS.md)

## 🌤️ Configuração da API de Clima

- [ ] Criar conta no OpenWeatherMap (https://openweathermap.org)
- [ ] Obter API Key gratuita
- [ ] Copiar a chave

## 📝 Configuração Local

- [ ] Criar arquivo `.env` na raiz do projeto
- [ ] Copiar conteúdo do `.env.example`
- [ ] Colar suas chaves reais no `.env`
- [ ] Salvar o arquivo

## 🧪 Teste Local

- [ ] Rodar `bun install` (se ainda não rodou)
- [ ] Rodar `bun run dev`
- [ ] Abrir http://localhost:5173
- [ ] Testar upload de foto
- [ ] Verificar se foto aparece na galeria
- [ ] Testar atualizar galeria
- [ ] Testar excluir foto
- [ ] Ver se clima aparece (13-14/11)

## 💾 Git e GitHub

- [ ] Verificar que `.env` NÃO aparece no `git status`
- [ ] Rodar `git add .`
- [ ] Rodar `git commit -m "Adiciona sistema de fotos"`
- [ ] Rodar `git push`
- [ ] (Se necessário) Criar repositório no GitHub
- [ ] Verificar que código subiu no GitHub

## 🚀 Deploy (Opcional)

### Vercel (Recomendado):
- [ ] Criar conta em https://vercel.com
- [ ] Conectar repositório do GitHub
- [ ] Adicionar variáveis de ambiente no painel
- [ ] Fazer deploy
- [ ] Testar site ao vivo

### Ou Netlify:
- [ ] Criar conta em https://netlify.com
- [ ] Conectar repositório do GitHub
- [ ] Adicionar variáveis de ambiente
- [ ] Fazer deploy
- [ ] Testar site ao vivo

## 🎁 Antes de Dar o Presente

- [ ] Testar em celular (mobile)
- [ ] Testar em computador (desktop)
- [ ] Upload de pelo menos 1 foto de teste
- [ ] Verificar que a data da viagem está correta (13/11)
- [ ] Verificar que o nome "Larissa" aparece corretamente
- [ ] Limpar fotos de teste (se quiser começar vazio)
- [ ] Copiar link do site (se fez deploy)

## 📱 Para Ensinar a Larissa

- [ ] Mostrar onde fazer upload de fotos
- [ ] Explicar como adicionar legendas
- [ ] Mostrar botão de atualizar galeria
- [ ] Explicar como excluir fotos
- [ ] Avisar que funciona offline após carregar

## 🔐 Segurança Final

- [ ] `.env` está no `.gitignore` ✅
- [ ] `.env` NÃO foi commitado no git ✅
- [ ] Chaves reais só estão no `.env` local e no Vercel/Netlify ✅
- [ ] `.env.example` SÓ tem placeholders ✅

---

## 🎯 Quando Estiver Tudo Marcado

**PARABÉNS! 🎉 O presente está pronto para ser dado!**

Link para compartilhar:
- Se local: http://localhost:5173
- Se deploy: https://seu-projeto.vercel.app

---

## 💡 Dicas Finais

1. **Envie o link alguns dias antes da viagem** para ela já conhecer
2. **Mostre como funciona** na prática
3. **Deixe claro que é só dela** e que pode usar à vontade
4. **Explique que as fotos ficam salvas** mesmo depois de fechar
5. **Mencione o clima em tempo real** como um diferencial

---

## 🆘 Se Algo Der Errado

Calma! Problemas comuns:

- **Site não carrega**: Veja se `bun run dev` está rodando
- **Upload não funciona**: Confira o `.env` e as políticas do Supabase
- **Clima não aparece**: Pode ser a data (só mostra 13-14/11) ou a API key
- **Fotos não aparecem**: Aperte o botão "Atualizar fotos"

Documentação detalhada: SETUP_FOTOS.md

---

✨ **Boa sorte e que a Larissa adore o presente!** 🏝️✈️
