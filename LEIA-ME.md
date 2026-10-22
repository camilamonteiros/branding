# Briefing de marca pessoal — como publicar

O site é o `index.html`. Quando alguém envia, a função `api/enviar.js` manda as respostas para o seu e-mail pelo **Resend**. Você só precisa colar **duas informações em um único arquivo**, sem mexer em variáveis da Vercel.

## 1. Pegar a chave do Resend
1. Crie a conta em https://resend.com **com o e-mail em que quer receber as respostas**.
2. No menu, vá em **API Keys → Create API Key** (permissão "Sending access"). Copie a chave (começa com `re_`).

## 2. Colar no arquivo `api/enviar.js`
Abra `api/enviar.js` em qualquer editor de texto. No topo estão as duas linhas:

```js
const RESEND_API_KEY = "COLE_AQUI_A_CHAVE_DO_RESEND";
const TO_EMAIL       = "COLE_AQUI_SEU_EMAIL";
```

Troque pelo que você copiou, mantendo as aspas. O e-mail precisa ser **o mesmo da conta do Resend**. Salve.

> **Importante:** cole a chave só neste arquivo, nunca no `index.html`. E publique arrastando a pasta na Vercel (passo 3), sem colocar em um repositório público do GitHub, senão a chave fica visível para qualquer pessoa.

## 3. Publicar na Vercel
Em https://vercel.com/new, arraste a pasta inteira `briefing-marca-pessoal` e clique em **Deploy**. O link gerado é o que você compartilha.

## Testar
Abra o link, preencha com dados de teste e envie. O e-mail chega por blocos, e ao clicar em **Responder** você responde direto para quem preencheu.

## Plano B (ainda mais simples)
Se o Resend continuar dando trabalho, no começo do `<script>` do `index.html` troque `const ENVIO = "resend";` por `"web3forms"` e cole a chave do https://web3forms.com na linha logo abaixo. Nesse modo a pasta `api` nem é usada.

## Identidade visual
Usa o **Camila Monteiro Design System** (navy #23246C, dourado #EBBE21, Sora + Fraunces, script vermelho nos floreios, papel, borboleta e rosa). Fontes e imagens ficam em `assets/`.

## Editar perguntas
Todas ficam na lista `SECTIONS`, no começo do `<script>` do `index.html`. O e-mail acompanha automaticamente.

## Observações
- A página tem `noindex`: só quem recebe o link acessa.
- Sem domínio próprio verificado, o Resend só entrega para o e-mail da sua própria conta (o que resolve o seu caso).
- O formulário não recebe anexos; o campo de materiais pede links (Drive, Dropbox etc.).
