import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { authConfig } from "@/auth.config";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { rateLimit } from "@/lib/rate-limit";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const rl = rateLimit(`admin-login:${parsed.data.email.toLowerCase()}`, 8, 15 * 60 * 1000);
        if (!rl.ok) return null;
        await connectDB();
        const user = await User.findOne({ email: parsed.data.email.toLowerCase() });
        if (!user) return null;
        const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
        if (!valid) return null;
        return {
          id: String(user._id),
          email: user.email,
          name: user.name ?? "Admin",
          role: user.role,
        };
      },
    }),
  ],
});
