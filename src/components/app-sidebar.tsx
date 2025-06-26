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
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    LayoutGrid,
    Box,
    FileText,
    Settings,
    ChevronRight,
    LifeBuoy,
    MessageSquare,
    Hash,
    Clock,
    Send,
    MoreHorizontal,
    ChevronDown,
} from "lucide-react";
import { PipitLogo } from "@/components/icons";
import { UserNav } from "@/components/user-nav";
import { cn } from "@/lib/utils";


const SidebarGroupLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="px-2 py-1 mb-1 text-xs font-semibold text-muted-foreground">
        {children}
    </div>
)

const SidebarMenuAction = ({ children }: { children: React.ReactNode }) => (
    <div className="ml-auto">{children}</div>
)


export function AppSidebar() {
    const [isPlaygroundOpen, setIsPlaygroundOpen] = React.useState(true);
    
    return (
        <Sidebar variant="sidebar" collapsible="icon">
            <SidebarHeader className="p-4">
                <div className="flex items-center gap-2">
                    <PipitLogo className="w-8 h-8 text-primary" />
                    <div className="flex flex-col">
                        <h2 className="text-base font-semibold">Acme Inc</h2>
                        <p className="text-xs text-muted-foreground">Enterprise</p>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent className="flex-grow p-2">
                <SidebarMenu>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                     <Collapsible open={isPlaygroundOpen} onOpenChange={setIsPlaygroundOpen} className="w-full">
                        <SidebarMenuItem className="p-0">
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton variant="ghost" className="justify-between w-full hover:bg-accent" isActive={isPlaygroundOpen}>
                                    <div className="flex items-center gap-2">
                                        <LayoutGrid/>
                                        Playground
                                    </div>
                                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isPlaygroundOpen && "rotate-180")} />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                        </SidebarMenuItem>
                        <CollapsibleContent>
                            <SidebarMenu className="py-1 pl-7">
                                <SidebarMenuItem>
                                    <SidebarMenuButton size="sm" variant="ghost" className="w-full h-auto p-1 font-normal justify-start">History</SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton size="sm" variant="ghost" className="w-full h-auto p-1 font-normal justify-start">Starred</SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton size="sm" variant="ghost" className="w-full h-auto p-1 font-normal justify-start">Settings</SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </CollapsibleContent>
                    </Collapsible>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Models">
                            <Box />
                            Models
                            <SidebarMenuAction>
                                <ChevronRight />
                            </SidebarMenuAction>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Documentation">
                            <FileText />
                            Documentation
                             <SidebarMenuAction>
                                <ChevronRight />
                            </SidebarMenuAction>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Settings">
                            <Settings />
                            Settings
                            <SidebarMenuAction>
                                <ChevronRight />
                            </SidebarMenuAction>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

                <div className="mt-4">
                     <SidebarGroupLabel>Projects</SidebarGroupLabel>
                     <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Design Engineering">
                                <Hash />
                                Design Engineering
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Sales & Marketing">
                                <Clock />
                                Sales & Marketing
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Travel">
                                <Send />
                                Travel
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                            <SidebarMenuButton tooltip="More">
                                <MoreHorizontal />
                                More
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                     </SidebarMenu>
                </div>
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
