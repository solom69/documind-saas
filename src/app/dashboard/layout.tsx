import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <DashboardSidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}
