"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
    parent?: string;
    pageTitle: string;
}

export function PageHeader({ parent, pageTitle }: PageHeaderProps) {
    return (
        <header className="flex h-16 shrink-0 items-center border-b bg-background px-4 lg:px-6 gap-2">
            <SidebarTrigger />
            <nav className="flex items-center gap-2 text-sm font-medium">
                {parent && (
                    <>
                        <span className="text-muted-foreground">{parent}</span>
                        <ChevronRight className="h-4 w-4" />
                    </>
                )}
                <span className="text-foreground">{pageTitle}</span>
            </nav>
        </header>
    )
}
