export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-width min-h-screen overflow-x-clip bg-background text-foreground">{children}</div>
  );
}
