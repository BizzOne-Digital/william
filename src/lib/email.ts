import nodemailer from "nodemailer";
import { BRAND } from "@/lib/constants";

function getTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: { minVersion: "TLSv1.2", servername: host },
  });
}

function getFromAddress(): string {
  if (process.env.EMAIL_FROM?.trim()) return process.env.EMAIL_FROM.trim();
  const user = process.env.SMTP_USER?.trim();
  if (user) return `Intense Dropz <${user}>`;
  return `Intense Dropz <${BRAND.email}>`;
}

function textToHtml(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#111">${escaped.replace(/\n/g, "<br/>")}</body></html>`;
}

export async function sendBusinessEmail(params: {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}) {
  const transport = getTransport();
  const to = process.env.BUSINESS_NOTIFICATION_EMAIL ?? BRAND.email;
  const from = getFromAddress();

  if (!transport) {
    console.info("[email:not configured]", params.subject, params.text);
    return { sent: false as const };
  }

  await transport.sendMail({
    from,
    to,
    replyTo: params.replyTo,
    subject: params.subject,
    text: params.text,
    html: params.html ?? textToHtml(params.text),
  });
  return { sent: true as const };
}

export async function sendCustomerEmail(params: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  const transport = getTransport();
  const from = getFromAddress();
  const replyTo = process.env.SMTP_USER?.trim() ?? BRAND.email;

  if (!transport) {
    console.info("[email:not configured]", params.subject, "→", params.to, params.text);
    return { sent: false as const };
  }

  await transport.sendMail({
    from,
    to: params.to,
    replyTo,
    subject: params.subject,
    text: params.text,
    html: params.html ?? textToHtml(params.text),
  });
  return { sent: true as const };
}
