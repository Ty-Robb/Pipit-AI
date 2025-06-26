
"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, Grid2x2 } from "lucide-react";

export function PageHeader() {
    return (
        <header className="flex h-16 items-center justify-between border-b px-4 lg:px-6 bg-background">
            <nav className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Button variant="ghost" size="sm" className="gap-2 text-foreground">
                    <Grid2x2 className="h-4 w-4" />
                    Building Your Application
                </Button>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">Dashboard</span>
            </nav>
        </header>
    )
}
