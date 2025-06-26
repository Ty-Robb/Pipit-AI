"use client";

import { useState } from 'react';
import type { Workflow, PanelView, Message } from '@/lib/types';
import { AppSidebar } from '@/components/app-sidebar';
import { MainNav } from '@/components/main-nav';
import { OutputPanel } from '@/components/output-panel';
import { ChatPanel } from '@/components/chat-panel';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { cn } from '@/lib/utils';
import { SidebarProvider } from '@/components/ui/sidebar';

const initialMessages: Message[] = [
  {
    id: 'init',
    role: 'assistant',
    content: "Hello! I'm Ethan, your AI marketing consultant. Would you like to start with Discovery or jump into building your Marketing Strategy?",
  }
];

export function AppLayout() {
  const [activeWorkflow, setActiveWorkflow] = useState<Workflow | null>(null);
  const [activePanel, setActivePanel] = useState<PanelView>('welcome');
  const [strategicInsights, setStrategicInsights] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleWorkflowSelect = (workflow: Workflow) => {
    setActiveWorkflow(workflow);
    setActivePanel('workflow');
  };

  return (
    <SidebarProvider>
      <div className={cn("flex h-screen w-full bg-background text-foreground")}>
        <AppSidebar />
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full max-h-screen"
        >
          <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
            <div className="flex flex-col h-full">
              <div className="flex h-[60px] items-center border-b px-6">
                <h2 className="text-lg font-semibold">Pipit AI</h2>
              </div>
              <MainNav activeWorkflow={activeWorkflow} onWorkflowSelect={handleWorkflowSelect} className="h-full" />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="flex flex-col h-full p-4">
              <OutputPanel activePanel={activePanel} workflow={activeWorkflow} strategicInsights={strategicInsights} />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
            <div className="h-full p-4">
              <ChatPanel messages={messages} setMessages={setMessages} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </SidebarProvider>
  );
}
