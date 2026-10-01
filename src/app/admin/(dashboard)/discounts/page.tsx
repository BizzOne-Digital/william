import { connectDB } from "@/lib/mongodb";
import DiscountCode from "@/models/DiscountCode";
import { deleteDiscount, saveDiscountForm } from "@/app/admin/actions";

export default async function AdminDiscountsPage() {
  await connectDB();
  const codes = await DiscountCode.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl font-semibold text-white">Discount codes</h1>
      <form action={saveDiscountForm} className="glass-panel grid max-w-2xl gap-3 rounded-2xl p-6 sm:grid-cols-2">
        <input name="code" required placeholder="CODE" className="rounded-xl border border-border bg-surface px-3 py-2 text-sm uppercase sm:col-span-2" />
        <select name="type" className="rounded-xl border border-border bg-surface px-3 py-2 text-sm">
          <option value="percent">Percent</option>
          <option value="fixed">Fixed CAD</option>
        </select>
        <input name="value" type="number" step="0.01" required placeholder="Value" className="rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
        <input name="minOrderCAD" type="number" step="0.01" placeholder="Min order CAD" className="rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
        <input name="maxUses" type="number" placeholder="Max total uses" className="rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
        <input name="maxUsesPerCustomer" type="number" placeholder="Max per customer" className="rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
        <input name="expiresAt" type="date" className="rounded-xl border border-border bg-surface px-3 py-2 text-sm sm:col-span-2" />
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input type="checkbox" name="active" defaultChecked /> Active
        </label>
        <button type="submit" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white sm:col-span-2">
          Create code
        </button>
      </form>
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-surface/80 text-muted">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Uses</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {codes.map((c) => (
              <tr key={String(c._id)} className="border-t border-border/60">
                <td className="px-4 py-3 font-mono">{c.code}</td>
                <td className="px-4 py-3">
                  {c.type} {c.value}
                </td>
                <td className="px-4 py-3">
                  {c.usageCount}
                  {c.maxUses != null ? ` / ${c.maxUses}` : ""}
                </td>
                <td className="px-4 py-3">{c.active ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <form
                    action={async () => {
                      "use server";
                      await deleteDiscount(String(c._id));
                    }}
                  >
                    <button type="submit" className="text-red-300 hover:underline">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
