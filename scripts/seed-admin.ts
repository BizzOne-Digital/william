import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../src/models/User";

async function main() {
  const uri = process.env.MONGODB_URI;
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;
  if (!uri || !email || !password) {
    console.error("Set MONGODB_URI, ADMIN_SEED_EMAIL, and ADMIN_SEED_PASSWORD");
    process.exit(1);
  }
  if (password.length < 12) {
    console.error("ADMIN_SEED_PASSWORD must be at least 12 characters");
    process.exit(1);
  }
  await mongoose.connect(uri);
  const reset = process.argv.includes("--reset");
  const existing = await User.findOne({ email: email.toLowerCase() });
  const passwordHash = await bcrypt.hash(password, 12);
  if (existing) {
    if (!reset) {
      console.log("Admin user already exists for", email);
      console.log("To sync password from ADMIN_SEED_PASSWORD, run: npm run seed:admin -- --reset");
      process.exit(0);
    }
    existing.passwordHash = passwordHash;
    await existing.save();
    console.log("Admin password updated for", email);
    process.exit(0);
  }
  await User.create({ email: email.toLowerCase(), passwordHash, name: "Admin", role: "admin" });
  console.log("Admin user created for", email);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
