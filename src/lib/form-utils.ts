import { createHash } from "crypto";
import { headers } from "next/headers";

export async function getClientIpHash(): Promise<string | undefined> {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown";
  const salt = process.env.FORM_IP_SALT ?? "change-me";
  return createHash("sha256").update(`${ip}:${salt}`).digest("hex");
}

export function isHoneypotFilled(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}
