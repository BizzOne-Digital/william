"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Search } from "lucide-react";

export function ShopFilters({
  categories,
  initial,
}: {
  categories: string[];
  initial: { q: string; category: string; sort: string };
}) {
  const router = useRouter();
  const [q, setQ] = useState(initial.q);
  const [category, setCategory] = useState(initial.category);
  const [sort, setSort] = useState(initial.sort);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (category) params.set("category", category);
    if (sort && sort !== "featured") params.set("sort", sort);
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <form
      onSubmit={submit}
      className="glass-panel grid w-full min-w-0 grid-cols-1 gap-3 rounded-2xl p-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-[1fr_auto_auto_auto]"
    >
      <label className="relative block">
        <span className="sr-only">Search products</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search published products"
          className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-3 text-sm outline-none focus:border-accent"
        />
      </label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full min-w-0 rounded-xl border border-border bg-surface px-3 py-2.5 text-sm"
        aria-label="Category"
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="w-full min-w-0 rounded-xl border border-border bg-surface px-3 py-2.5 text-sm"
        aria-label="Sort"
      >
        <option value="featured">Featured</option>
        <option value="newest">Newest</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
      </select>
      <button
        type="submit"
        className="w-full rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-slate-950 hover:brightness-110 sm:w-auto lg:w-auto"
      >
        Apply
      </button>
    </form>
  );
}
