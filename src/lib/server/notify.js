import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

/** Email admin when someone submits an access request. No-op if env is unset. */
export async function notifyAccessRequest({ name, phone, note, adminUrl }) {
  const apiKey = env.RESEND_API_KEY;
  const to = env.ACCESS_REQUEST_NOTIFY_EMAIL;
  if (!apiKey || !to) return;

  const from = env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const noteBlock = note ? `\n\nNote:\n${note}` : '';

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      subject: `Access request from ${name}`,
      text: `${name} requested access to your feed.

Phone: ${phone}${noteBlock}

Review: ${adminUrl}`
    });
  } catch (err) {
    console.error('Failed to send access request notification:', err);
  }
}
