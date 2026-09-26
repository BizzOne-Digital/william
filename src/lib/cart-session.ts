import { cookies } from "next/headers";
import { randomUUID } from "crypto";

export const CART_COOKIE = "idz_cart_session";

export async function getOrCreateCartSessionId(): Promise<string> {
  const jar = await cookies();
  const existing = jar.get(CART_COOKIE)?.value;
  if (existing) return existing;
  const id = randomUUID();
  jar.set(CART_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return id;
}

export async function getCartSessionId(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(CART_COOKIE)?.value ?? null;
}
