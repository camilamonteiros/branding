# Briefing de marca pessoal — como publicar

O formulário é uma página única (`index.html`) e uma função (`api/enviar.js`) que manda as respostas para o seu e-mail usando o Resend (gratuito até 100 e-mails/dia).

## 1. Criar a chave do Resend (2 min)
1. Crie uma conta em https://resend.com **com o mesmo e-mail em que quer receber as respostas**.
2. Vá em **API Keys → Create API Key** e copie a chave (começa com `re_`).

> Sem domínio próprio verificado, o Resend só entrega para o e-mail da sua própria conta. Para a sua necessidade (receber as respostas), isso basta. Se quiser mandar de um endereço seu (ex.: contato@seudominio.com), verifique o domínio em **Domains** e use a variável `FROM_EMAIL`.

## 2. Publicar na Vercel
**Pelo painel (sem terminal):**
1. Suba esta pasta para um repositório no GitHub.
2. Na Vercel: **Add New → Project**, importe o repositório e clique em **Deploy**.

**Pelo terminal:**
```bash
npm i -g vercel
cd briefing-marca-pessoal
vercel
```

## 3. Configurar as variáveis de ambiente
Na Vercel: **Project → Settings → Environment Variables**

| Nome | Valor |
|---|---|
| `RESEND_API_KEY` | a chave `re_...` do passo 1 |
| `TO_EMAIL` | e-mail que vai receber as respostas (pode separar vários por vírgula) |
| `FROM_EMAIL` | *(opcional)* ex.: `Briefing <contato@seudominio.com>` |

Depois de salvar, faça um **Redeploy** para as variáveis valerem.

## 4. Testar
Abra o link da Vercel, preencha com dados de teste e envie. O e-mail chega organizado por blocos, e ao clicar em **Responder** você responde direto para quem preencheu.

## Identidade visual
A página usa o **Camila Monteiro Design System**: navy #23246C, dourado #EBBE21, Sora + Fraunces itálico, script Cedarville em vermelho só nos floreios, papel texturizado, borboleta e rosa de colagem, brilho de 4 pontas e botão pílula. Fontes e imagens ficam em `assets/` (as imagens já estão otimizadas para web). Os tokens ficam no começo do `<style>` do `index.html`.

## Editar perguntas
Todas as perguntas ficam na lista `SECTIONS`, no começo do `<script>` do `index.html`. Para adicionar, remover ou reordenar, basta alterar essa lista (o e-mail acompanha automaticamente).

## Observações
- A página tem `noindex` (não aparece no Google); só quem receber o link acessa.
- Há um campo escondido anti-spam (honeypot). Se começar a receber spam, dá para adicionar o reCAPTCHA/Turnstile depois.
- Arquivos não são enviados pelo formulário; o campo de materiais pede links (Drive, Dropbox etc.).
