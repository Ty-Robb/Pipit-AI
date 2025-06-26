"use client";

import React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarSeparator
} from "@/components/ui/sidebar";
import {
    LifeBuoy,
    MessageSquare,
} from "lucide-react";
import { PipitLogo } from "@/components/icons";
import { UserNav } from "@/components/user-nav";
import { MainNav } from "@/components/main-nav";
import type { Workflow } from "@/lib/types";

interface AppSidebarProps {
    onWorkflowSelect: (workflow: Workflow) => void;
    activeWorkflow: Workflow | null;
}

export function AppSidebar({ onWorkflowSelect, activeWorkflow }: AppSidebarProps) {
    
    return (
        <Sidebar variant="sidebar" collapsible="icon">
            <SidebarHeader className="p-4">
                <div className="flex items-center gap-2">
                    <PipitLogo className="w-8 h-8 text-primary" />
                    <div className="flex flex-col">
                        <h2 className="text-base font-semibold">Pipit AI</h2>
                        <p className="text-xs text-muted-foreground">Strategy Wingman</p>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent className="flex-grow p-0">
                <MainNav activeWorkflow={activeWorkflow} onWorkflowSelect={onWorkflowSelect} className="pt-4" />
            </SidebarContent>
            <SidebarFooter className="p-2">
                <SidebarMenu>
                     <SidebarMenuItem>
                        <SidebarMenuButton>
                            <LifeBuoy />
                            Support
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton>
                            <MessageSquare />
                            Feedback
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarSeparator className="my-2" />
                <UserNav />
            </SidebarFooter>
        </Sidebar>
    );
}
