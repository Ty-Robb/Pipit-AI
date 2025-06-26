"use client"

import * as React from "react"
import {
  FileText,
  Lightbulb,
  Search,
} from "lucide-react"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator";
import { MainNav } from "@/components/main-nav";
import { PipitLogo } from "@/components/icons";
import type { PanelView, Workflow } from "@/lib/types"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onWorkflowSelect: (workflow: Workflow) => void
  activeWorkflow: Workflow | null
  onPanelChange: (panel: PanelView) => void
}

export function AppSidebar({
  onWorkflowSelect,
  activeWorkflow,
  onPanelChange,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <PipitLogo className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold font-headline">Pipit AI</span>
                  <span className="truncate text-xs">Strategy Wingman</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="p-0">
        <div className="p-2">
            <h2 className="px-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase">Workflows</h2>
        </div>
        <MainNav activeWorkflow={activeWorkflow} onWorkflowSelect={onWorkflowSelect} />
        
        <Separator className="my-2" />

        <div className="p-2">
            <h2 className="px-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase">Tools</h2>
        </div>
        <div className="px-4">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => onPanelChange('website_assessment')}>
                        <Search />
                        <span>Website Assessment</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => onPanelChange('document_insights')}>
                        <FileText />
                        <span>Document Insights</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => onPanelChange('content_generation')}>
                        <Lightbulb />
                        <span>Content Generation</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
