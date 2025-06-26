"use client"

import * as React from "react"
import { FileText, BookText, Lightbulb } from "lucide-react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import type { Workflow, PanelView } from "@/lib/types";
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { PipitLogo } from "./icons"

interface AppSidebarProps extends Omit<React.ComponentProps<typeof Sidebar>, 'children'> {
  onWorkflowSelect: (workflow: Workflow) => void;
  activeWorkflow: Workflow | null;
  onPanelChange: (panel: PanelView) => void;
}


export function AppSidebar({ onWorkflowSelect, activeWorkflow, onPanelChange, ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b h-16">
         <a href="/" className="flex h-full items-center gap-2 font-semibold px-4">
          <PipitLogo className="h-8 w-8 text-primary" />
          <span className="text-lg">Pipit AI</span>
        </a>
      </SidebarHeader>
      <SidebarContent className="p-0 flex flex-col">
        <MainNav 
          onWorkflowSelect={onWorkflowSelect}
          activeWorkflow={activeWorkflow}
          className="pt-4"
        />

        <div className="mt-auto px-4 pb-4 space-y-1">
            <Separator className="my-2"/>
            <h3 className="px-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                Tools
            </h3>
            <Button variant="ghost" className="w-full justify-start" onClick={() => onPanelChange('website_assessment')}>
                <BookText className="mr-2 h-4 w-4" />
                Website Assessment
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => onPanelChange('document_insights')}>
                <FileText className="mr-2 h-4 w-4" />
                Document Insights
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => onPanelChange('content_generation')}>
                <Lightbulb className="mr-2 h-4 w-4" />
                Content Generation
            </Button>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <div className="p-2">
            <UserNav />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
