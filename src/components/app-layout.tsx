"use client";

import { AppSidebar } from '@/components/app-sidebar';
import { PageHeader } from './page-header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardContent } from './dashboard-content';

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col">
        <PageHeader />
        <DashboardContent />
      </main>
    </SidebarProvider>
  );
}
