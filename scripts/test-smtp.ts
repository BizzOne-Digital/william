/**
 * Verify SMTP credentials. Usage: npm run test:smtp
 * Optional: TEST_EMAIL_TO=you@example.com npm run test:smtp
 */
import nodemailer from "nodemailer";
import { BRAND } from "../src/lib/constants";

async function main() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  if (!host || !user || !pass) {
    console.error("Missing SMTP_HOST, SMTP_USER, or SMTP_PASS in .env.local");
    process.exit(1);
  }

  const to =
    process.env.TEST_EMAIL_TO?.trim() ||
    process.env.BUSINESS_NOTIFICATION_EMAIL?.trim() ||
    user;

  const from = process.env.EMAIL_FROM ?? `Intense Dropz <${user}>`;

  const transport = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: { minVersion: "TLSv1.2", servername: host },
  });

  console.log(`Verifying SMTP ${host}:${port} as ${user}…`);
  await transport.verify();
  console.log("SMTP connection OK.");

  const info = await transport.sendMail({
    from,
    to,
    subject: `${BRAND.name} — SMTP test`,
    text: `This is a test message from the ${BRAND.name} site SMTP setup (${new Date().toISOString()}).`,
    html: `<p>This is a test message from the <strong>${BRAND.name}</strong> site SMTP setup.</p><p><small>${new Date().toISOString()}</small></p>`,
  });

  console.log("Test email sent:", info.messageId);
  console.log("Delivered to:", to);
}

main().catch((err) => {
  console.error("SMTP test failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
