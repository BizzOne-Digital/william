import { adminSignOut } from "@/app/admin/actions";

export function AdminSignOut() {
  return (
    <form action={adminSignOut} className="lg:mt-4">
      <button
        type="submit"
        className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-300 hover:bg-red-500/10"
      >
        Sign out
      </button>
    </form>
  );
}
