import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";

import DashboardSidebar from "./_components/common/dashboard-sidebar";
import Header from "./_components/common/header";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-sidebar">
      <SidebarProvider>
        <DashboardSidebar variant="inset" />
        <main className="flex flex-col flex-1 bg-background rounded-l-lg shadow-md overflow-hidden m-2">
          <Header />
          <Separator />
          <section className="overflow-auto flex-1">
            <div className="h-full container py-4">{children}</div>
          </section>
        </main>
      </SidebarProvider>
    </div>
  );
}
