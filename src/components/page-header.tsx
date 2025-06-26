
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronRight, LayoutGrid } from "lucide-react";

export function PageHeader() {
    return (
        <header className="flex h-16 shrink-0 items-center border-b bg-background px-4 lg:px-6 gap-2">
            <SidebarTrigger />
            <nav className="flex items-center gap-2 text-sm font-medium">
                <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Building Your Application</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">Dashboard</span>
            </nav>
        </header>
    )
}
