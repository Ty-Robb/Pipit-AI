
"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarSeparator
} from "@/components/ui/sidebar";
import {
    LayoutGrid,
    History,
    Star,
    Box,
    FileText,
    Settings,
    ChevronDown,
    LifeBuoy,
    MessageSquare,
    MoreHorizontal,
    Plus,
    Hash,
    Briefcase,
    Plane,
} from "lucide-react";
import { PipitLogo } from "@/components/icons";
import { UserNav } from "@/components/user-nav";
import { Button } from "./ui/button";

export function AppSidebar() {
    return (
        <Sidebar variant="sidebar" collapsible="offcanvas">
            <SidebarHeader className="p-4">
                <div className="flex items-center gap-2">
                    <PipitLogo className="h-8 w-8 text-primary" />
                    <div className="flex flex-col">
                        <h2 className="text-base font-semibold">Pipit AI</h2>
                        <p className="text-xs text-muted-foreground">Enterprise</p>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent className="p-4 flex-grow">
                <SidebarMenu>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Dashboard" isActive>
                            <LayoutGrid />
                            Dashboard
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="History">
                            <History />
                            History
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Starred">
                            <Star />
                            Starred
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Models">
                            <Box />
                            Models
                            <SidebarMenuAction>
                                <ChevronDown />
                            </SidebarMenuAction>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Documentation">
                            <FileText />
                            Documentation
                             <SidebarMenuAction>
                                <ChevronDown />
                            </SidebarMenuAction>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Settings">
                            <Settings />
                            Settings
                            <SidebarMenuAction>
                                <ChevronDown />
                            </SidebarMenuAction>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

                <SidebarMenu className="mt-4">
                     <SidebarGroupLabel>Projects</SidebarGroupLabel>
                     <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Hash />
                            Design Engineering
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Briefcase />
                            Sales & Marketing
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Plane />
                            Travel
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                         <SidebarMenuButton>
                            <MoreHorizontal />
                            More
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-4">
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

const SidebarGroupLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="text-xs font-semibold text-muted-foreground px-2 py-1 mb-1">
        {children}
    </div>
)

const SidebarMenuAction = ({ children }: { children: React.ReactNode }) => (
    <div className="ml-auto">{children}</div>
)
