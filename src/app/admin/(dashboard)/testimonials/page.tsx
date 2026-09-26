import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { deleteTestimonial, saveTestimonialForm } from "@/app/admin/actions";

export default async function AdminTestimonialsPage() {
  await connectDB();
  const items = await Testimonial.find().sort({ displayOrder: 1 }).lean();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-white">Testimonials</h1>
        <p className="mt-2 text-sm text-muted">
          Nothing appears on the site until published. Do not add fabricated reviews.
        </p>
      </div>
      <form action={saveTestimonialForm} className="glass-panel max-w-xl space-y-3 rounded-2xl p-6">
        <h2 className="font-semibold text-white">Add testimonial</h2>
        <input name="authorName" required placeholder="Author name" className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
        <input name="authorLocation" placeholder="Location (optional)" className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
        <textarea name="content" required rows={3} placeholder="Content" className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" /> Publish on homepage
        </label>
        <button type="submit" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-slate-950">
          Save
        </button>
      </form>
      <ul className="space-y-4">
        {items.map((t) => (
          <li key={String(t._id)} className="glass-panel rounded-2xl p-4 text-sm">
            <p className="text-white">&ldquo;{t.content}&rdquo;</p>
            <p className="mt-2 text-muted">
              — {t.authorName} · {t.published ? "Published" : "Draft"}
            </p>
            <form
              action={async () => {
                "use server";
                await deleteTestimonial(String(t._id));
              }}
              className="mt-2"
            >
              <button type="submit" className="text-red-300 hover:underline">
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
