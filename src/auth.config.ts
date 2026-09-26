import type { NextAuthConfig } from "next-auth";

/** Edge-safe auth config (middleware). No Mongoose/bcrypt here. */
export const authConfig = {
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 },
  pages: { signIn: "/admin/login" },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "admin";
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        (session.user as { role?: string }).role = (token.role as string) ?? "admin";
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
