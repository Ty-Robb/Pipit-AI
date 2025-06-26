"use client";

import { AppSidebar } from '@/components/app-sidebar';
import { PageHeader } from './page-header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardContent } from './dashboard-content';

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <PageHeader />
        <main className="flex-1 bg-muted/40 p-4 lg:p-6">
          <DashboardContent />
        </main>
      </div>
    </SidebarProvider>
  );
}
