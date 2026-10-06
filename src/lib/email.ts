import nodemailer from "nodemailer";
import { BRAND } from "@/lib/constants";

function getTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });
}

export async function sendBusinessEmail(params: {
  subject: string;
  text: string;
  html?: string;
}) {
  const transport = getTransport();
  const to = process.env.BUSINESS_NOTIFICATION_EMAIL ?? BRAND.email;
  const from = process.env.EMAIL_FROM ?? `Intense Dropz <noreply@${BRAND.url.replace(/^https?:\/\//, "")}>`;

  if (!transport) {
    console.info("[email:not configured]", params.subject, params.text);
    return { sent: false as const };
  }

  await transport.sendMail({
    from,
    to,
    subject: params.subject,
    text: params.text,
    html: params.html ?? params.text.replace(/\n/g, "<br/>"),
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
  const from = process.env.EMAIL_FROM ?? `Intense Dropz <noreply@${BRAND.url.replace(/^https?:\/\//, "")}>`;

  if (!transport) {
    console.info("[email:not configured]", params.subject, "→", params.to, params.text);
    return { sent: false as const };
  }

  await transport.sendMail({
    from,
    to: params.to,
    subject: params.subject,
    text: params.text,
    html: params.html ?? params.text.replace(/\n/g, "<br/>"),
  });
  return { sent: true as const };
}
