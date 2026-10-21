import { connectDB } from "../src/lib/mongodb";
import SiteSettings from "../src/models/SiteSettings";

async function main() {
  await connectDB();
  const result = await SiteSettings.updateOne(
    { singletonKey: "default" },
    { $set: { taxEnabled: false } },
  );
  console.log("taxEnabled set to false:", result.modifiedCount > 0 ? "updated" : "already off or no doc");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
