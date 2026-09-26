import { POLICY_REVIEW_NOTICE } from "@/lib/constants";

export function PolicyPage({ title, body }: { title: string; body: string }) {
  const isDraft = body.includes("[Owner review") || body.includes("Draft for owner review");
  return (
    <div className="mx-auto w-full min-w-0 max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-semibold break-words text-white sm:text-4xl">{title}</h1>
      {isDraft && (
        <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          {POLICY_REVIEW_NOTICE}
        </p>
      )}
      <div className="prose-policy mt-8">{body}</div>
    </div>
  );
}
