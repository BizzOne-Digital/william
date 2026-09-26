import { AdminNavLinks } from "@/components/admin/AdminNavLinks";
import { AdminSignOut } from "@/components/admin/AdminSignOut";
import { requireAdmin } from "@/lib/admin-auth";
import { Logo } from "@/components/brand/Logo";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  return (
    <div className="mx-auto flex min-h-screen w-full min-w-0 max-w-7xl flex-col overflow-x-clip lg:flex-row">
      <aside className="w-full min-w-0 lg:w-56 lg:shrink-0">
        <div className="hidden p-4 lg:block">
          <Logo compact />
        </div>
        <AdminNavLinks />
        <div className="hidden px-3 lg:block">
          <AdminSignOut />
        </div>
      </aside>
      <div className="min-w-0 flex-1 p-4 sm:p-6">{children}</div>
    </div>
  );
}
