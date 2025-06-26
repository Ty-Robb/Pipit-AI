"use client";

import { useState } from 'react';
import type { Message, Workflow, PanelView } from '@/lib/types';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import { PageHeader } from '@/components/page-header';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ChatPanel } from '@/components/chat-panel';
import { StrategicOutputPanel } from '@/components/strategic-output-panel';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeWorkflow, setActiveWorkflow] = useState<Workflow | null>(null);
  const [activePanel, setActivePanel] = useState<PanelView>('welcome');
  const [strategicInsights, setStrategicInsights] = useState<string | null>(null);
  
  const handleWorkflowSelect = (workflow: Workflow) => {
    setActiveWorkflow(workflow);
    setActivePanel('workflow');
    setMessages([]); // Clear chat when selecting a new workflow
  };

  const handlePanelChange = (panel: PanelView) => {
    setActiveWorkflow(null);
    setActivePanel(panel);
    setMessages([]); // Clear chat when selecting a new tool
  };
  
  const startConversation = (messageContent: string) => {
      const userMessage: Message = {
          id: Date.now().toString(),
          role: 'user',
          content: messageContent,
      };
      setMessages([userMessage]);
  };

  // Logic for dynamic breadcrumbs
  let pageTitle = "Dashboard";
  let parent;

  if (activeWorkflow) {
    parent = activeWorkflow.category;
    pageTitle = activeWorkflow.name;
  } else {
    switch(activePanel) {
      case 'website_assessment':
        parent = 'Tools';
        pageTitle = 'Website Assessment';
        break;
      case 'document_insights':
        parent = 'Tools';
        pageTitle = 'Document Insights';
        break;
      case 'content_generation':
        parent = 'Tools';
        pageTitle = 'Content Generation';
        break;
      case 'welcome':
      default:
        parent = undefined;
        pageTitle = 'Dashboard';
        break;
    }
  }

  return (
    <>
      <AppSidebar 
        onWorkflowSelect={handleWorkflowSelect} 
        activeWorkflow={activeWorkflow}
        onPanelChange={handlePanelChange}
      />
      <SidebarInset>
        <div className="flex flex-col h-full bg-background text-foreground md:rounded-xl overflow-hidden">
          <PageHeader parent={parent} pageTitle={pageTitle} />
          <main className="flex-1 overflow-hidden">
             <ResizablePanelGroup direction="horizontal" className="h-full items-start">
                <ResizablePanel defaultSize={50} minSize={30}>
                    <ChatPanel messages={messages} setMessages={setMessages} />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50} minSize={30}>
                    <div className="h-full p-6 overflow-y-auto">
                        <StrategicOutputPanel
                            activePanel={activePanel}
                            setActivePanel={handlePanelChange}
                            workflow={activeWorkflow}
                            strategicInsights={strategicInsights}
                            onStartConversation={startConversation}
                        />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
          </main>
        </div>
      </SidebarInset>
    </>
  );
}
