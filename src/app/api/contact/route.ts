import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import ContactSubmission from "@/models/ContactSubmission";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIpHash, isHoneypotFilled } from "@/lib/form-utils";
import { sendBusinessEmail } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  subject: z.string().max(160).optional(),
  message: z.string().min(10).max(5000),
  website: z.string().optional(),
});

export async function POST(req: Request) {
  const ipHash = await getClientIpHash();
  const rl = rateLimit(`contact:${ipHash ?? "anon"}`, 5, 15 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  const json = await req.json();
  const parsed = schema.safeParse(json);
  if (!parsed.success || isHoneypotFilled(parsed.data?.website)) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  await connectDB();
  const doc = await ContactSubmission.create({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    subject: parsed.data.subject,
    message: parsed.data.message,
    ipHash,
  });

  await sendBusinessEmail({
    subject: `Contact form — ${parsed.data.name}`,
    text: `From: ${parsed.data.name} <${parsed.data.email}>\nPhone: ${parsed.data.phone ?? "—"}\nSubject: ${parsed.data.subject ?? "—"}\n\n${parsed.data.message}`,
  });

  return NextResponse.json({ ok: true, id: String(doc._id) });
}
