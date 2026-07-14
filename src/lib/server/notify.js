import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

/** Send a Signal message to ADMIN_PHONE via CallMeBot. No-op if env is unset. */
async function signalNotify(text) {
  const phone = env.ADMIN_PHONE;
  const apiKey = env.CALLMEBOT_SIGNAL_KEY;
  if (!phone || !apiKey) return;

  const url = `https://signal.callmebot.com/signal/send.php?phone=${encodeURIComponent(phone)}&apikey=${encodeURIComponent(apiKey)}&text=${encodeURIComponent(text)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) console.error('CallMeBot Signal error:', res.status, await res.text());
  } catch (err) {
    console.error('Failed to send Signal notification:', err);
  }
}

/** Send a WhatsApp message to ADMIN_PHONE via CallMeBot. No-op if env is unset. */
async function whatsappNotify(text) {
  const phone = env.ADMIN_PHONE;
  const apiKey = env.CALLMEBOT_WHATSAPP_KEY;
  if (!phone || !apiKey) return;

  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apiKey)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) console.error('CallMeBot WhatsApp error:', res.status, await res.text());
  } catch (err) {
    console.error('Failed to send WhatsApp notification:', err);
  }
}

/** Email admin when someone submits an access request. No-op if env is unset. */
export async function notifyAccessRequest({ name, phone, note, adminUrl }) {
  const noteBlock = note ? `\nNote: ${note}` : '';
  const text = `Access request: ${name}\nPhone: ${phone}${noteBlock}\nReview: ${adminUrl}`;
  await Promise.all([signalNotify(text), whatsappNotify(text)]);

  const apiKey = env.RESEND_API_KEY;
  const to = env.ACCESS_REQUEST_NOTIFY_EMAIL;
  if (!apiKey || !to) return;

  const from = env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      subject: `Access request from ${name}`,
      text: `${name} requested access to your feed.

Phone: ${phone}${noteBlock ? `\n\nNote:\n${note}` : ''}

Review: ${adminUrl}`
    });
  } catch (err) {
    console.error('Failed to send access request notification:', err);
  }
}

const POST_TYPE_LABELS = {
  status: 'status',
  reading: 'reading',
  photo: 'photo',
  music: 'music'
};

/** Email admin when someone comments on a post. No-op if env is unset. */
export async function notifyComment({ postType, body, phone }) {
  const label = POST_TYPE_LABELS[postType] || postType;
  const phoneLine = phone ? `\nFrom: ${phone}` : '';
  const text = `New comment on ${label} post:${phoneLine}\n\n${body}`;
  await Promise.all([signalNotify(text), whatsappNotify(text)]);

  const apiKey = env.RESEND_API_KEY;
  const to = env.ACCESS_REQUEST_NOTIFY_EMAIL;
  if (!apiKey || !to) return;

  const from = env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      subject: `New comment on ${label} post`,
      text: `${phoneLine}

${body}`
    });
  } catch (err) {
    console.error('Failed to send comment notification:', err);
  }
}

/** Email admin when someone submits feedback. No-op if env is unset. */
export async function notifyFeedback({ type, body, phone, page }) {
  const phoneLine = phone ? `\nFrom: ${phone}` : '';
  const pageLine = page ? `\nPage: ${page}` : '';
  const text = `Feedback: ${type}${phoneLine}${pageLine}\n\n${body}`;
  await Promise.all([signalNotify(text), whatsappNotify(text)]);

  const apiKey = env.RESEND_API_KEY;
  const to = env.ACCESS_REQUEST_NOTIFY_EMAIL;
  if (!apiKey || !to) return;

  const from = env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      subject: `Feedback: ${type}`,
      text: `${type}${phoneLine}${pageLine}

${body}`
    });
  } catch (err) {
    console.error('Failed to send feedback notification:', err);
  }
}
