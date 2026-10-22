# Briefing de marca pessoal: como publicar (versão WhatsApp + PDF)

Não precisa de Resend, e-mail nem chave nenhuma. Quando a cliente clica em **Enviar briefing**, o próprio site gera um **PDF** com as respostas e abre o WhatsApp para ela mandar o arquivo para você.

## 1. Colocar seu número
Abra o `index.html` em um editor de texto, procure por `WHATSAPP_NUMERO` e troque pelo seu número com 55 + DDD, só números:

```js
const WHATSAPP_NUMERO = "5585999999999";
```

## 2. Publicar
Pode ser em qualquer hospedagem de site estático (Vercel, Netlify, GitHub Pages). Na Vercel: https://vercel.com/drop, arraste a pasta e pronto. A pasta `api` não é usada nesse modo.

## Como funciona para a cliente
- **Celular:** aparece a tela de compartilhar com o PDF já anexado. Ela escolhe o WhatsApp e a sua conversa e envia.
- **Computador:** o PDF baixa e o WhatsApp abre na sua conversa; ela só precisa anexar o arquivo.

Limite: o site não consegue enviar sozinho. A cliente precisa tocar em enviar no WhatsApp.

## Outros modos (opcional)
No começo do `<script>`, `ENVIO` aceita `"whatsapp"`, `"resend"` ou `"web3forms"`.

## Editar perguntas
Ficam na lista `SECTIONS` no `index.html`. O PDF acompanha automaticamente.
