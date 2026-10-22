// Função serverless da Vercel: recebe o briefing e envia por e-mail via Resend.
// Variáveis de ambiente (configure no painel da Vercel):
//   RESEND_API_KEY  -> chave da API do Resend
//   TO_EMAIL        -> e-mail que vai receber as respostas
//   FROM_EMAIL      -> (opcional) remetente. Padrão: "Briefing <onboarding@resend.dev>"

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const clip = (s, n) => String(s ?? '').slice(0, n);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body;
  if (!body || typeof body !== 'object') return res.status(400).json({ ok: false });

  // Honeypot: robôs preenchem, pessoas não. Responde "ok" sem enviar nada.
  if (body.website) return res.status(200).json({ ok: true });

  const { RESEND_API_KEY, TO_EMAIL } = process.env;
  const FROM_EMAIL = process.env.FROM_EMAIL || 'Briefing <onboarding@resend.dev>';
  if (!RESEND_API_KEY || !TO_EMAIL) {
    console.error('Variáveis RESEND_API_KEY e/ou TO_EMAIL não configuradas.');
    return res.status(500).json({ ok: false });
  }

  const nome = clip(body.nome, 200).trim();
  const email = clip(body.email, 200).trim();
  if (!nome || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ ok: false });

  const sections = (Array.isArray(body.sections) ? body.sections : []).slice(0, 20).map((s) => ({
    title: clip(s && s.title, 200),
    items: (Array.isArray(s && s.items) ? s.items : []).slice(0, 60).map((i) => ({
      pergunta: clip(i && i.pergunta, 400),
      resposta: clip(i && i.resposta, 5000),
    })),
  }));

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#23246C;max-width:680px;margin:0 auto;background:#F7F2EC;padding:28px;border-top:5px solid #EBBE21">
    <h1 style="font-size:22px;margin:0 0 4px;color:#23246C">Novo briefing de marca pessoal</h1>
    <p style="margin:0 0 24px;color:#6E6FA0">De <strong style="color:#23246C">${esc(nome)}</strong> · <a href="mailto:${esc(email)}" style="color:#23246C">${esc(email)}</a></p>
    ${sections
      .map(
        (s) => `
      <h2 style="font-size:15px;text-transform:uppercase;letter-spacing:.08em;color:#C99E12;border-bottom:1px solid #E2DACE;padding-bottom:6px;margin:28px 0 12px">${esc(s.title)}</h2>
      ${s.items
        .map(
          (i) => `
        <p style="margin:0 0 2px;font-size:13px;color:#6E6FA0">${esc(i.pergunta)}</p>
        <p style="margin:0 0 14px;font-size:15px;color:#23246C;white-space:pre-wrap">${esc(i.resposta)}</p>`
        )
        .join('')}`
      )
      .join('')}
  </div>`;

  const text =
    `Novo briefing de marca pessoal\nDe: ${nome} <${email}>\n\n` +
    sections
      .map((s) => `== ${s.title} ==\n` + s.items.map((i) => `${i.pergunta}\n${i.resposta}\n`).join('\n'))
      .join('\n');

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL.split(',').map((e) => e.trim()).filter(Boolean),
        reply_to: email,
        subject: `Novo briefing: ${nome}`,
        html,
        text,
      }),
    });
    if (!r.ok) {
      console.error('Resend error', r.status, await r.text());
      return res.status(502).json({ ok: false });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(502).json({ ok: false });
  }
};

function safeParse(s) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
