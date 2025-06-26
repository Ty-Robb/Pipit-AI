"use client";

import { useEffect, useState } from 'react';
import type { Message, Workflow, PanelView } from '@/lib/types';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import { PageHeader } from '@/components/page-header';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ChatPanel } from '@/components/chat-panel';
import { StrategicOutputPanel } from '@/components/strategic-output-panel';
import { workflows } from '@/data/workflows';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeWorkflow, setActiveWorkflow] = useState<Workflow | null>(null);
  const [activePanel, setActivePanel] = useState<PanelView>('welcome');
  const [strategicInsights, setStrategicInsights] = useState<string | null>(null);
  const [workflowOutputs, setWorkflowOutputs] = useState<Record<string, string>>({});
  
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user === null) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleWorkflowSelect = (workflow: Workflow) => {
    setActiveWorkflow(workflow);
    setActivePanel('workflow');
    setMessages([]); // Clear chat when selecting a new workflow
    setWorkflowOutputs({}); // Clear outputs for new workflow
  };

  const handlePanelChange = (panel: PanelView) => {
    setActiveWorkflow(null);
    setActivePanel(panel);
    setMessages([]); // Clear chat when selecting a new tool
  };
  
  const startConversation = (messageContent: string) => {
      // When starting a conversation from welcome, let's pick a default workflow.
      // The AI can then guide the user to the correct one.
      if (messageContent.toLowerCase().includes('discovery')) {
        const discoveryWorkflow = workflows.find(wf => wf.category === 'Discovery');
        if(discoveryWorkflow) setActiveWorkflow(discoveryWorkflow);
      } else if (messageContent.toLowerCase().includes('marketing strategy')) {
        const strategyWorkflow = workflows.find(wf => wf.category === 'Go-to-Market' && wf.name === 'Launch Plan');
        if(strategyWorkflow) setActiveWorkflow(strategyWorkflow);
      }

      setActivePanel('workflow');
      
      const userMessage: Message = {
          id: Date.now().toString(),
          role: 'user',
          content: messageContent,
      };
      setMessages([userMessage]);
  };

  const handleStepComplete = (step: string, output: string) => {
    setWorkflowOutputs(prev => ({
      ...prev,
      [step]: output
      }));
  };

  if (loading || !user) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
    );
  }

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
        <div className="flex flex-col h-screen bg-background text-foreground md:rounded-xl overflow-hidden">
          <PageHeader parent={parent} pageTitle={pageTitle} />
          <main className="flex-1 overflow-hidden">
            {activePanel === 'welcome' ? (
              <div className="h-full overflow-y-auto">
                <StrategicOutputPanel
                  activePanel={activePanel}
                  setActivePanel={handlePanelChange}
                  workflow={null}
                  strategicInsights={null}
                  onStartConversation={startConversation}
                />
              </div>
            ) : (
              <ResizablePanelGroup direction="horizontal" className="h-full items-stretch">
                  <ResizablePanel defaultSize={50} minSize={30}>
                      <ChatPanel 
                        messages={messages} 
                        setMessages={setMessages}
                        activeWorkflow={activeWorkflow}
                        onStepComplete={handleStepComplete}
                      />
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={50} minSize={30}>
                      <ScrollArea className="h-full">
                        <div className="p-6">
                            <StrategicOutputPanel
                                activePanel={activePanel}
                                setActivePanel={setActivePanel}
                                workflow={activeWorkflow}
                                strategicInsights={strategicInsights}
                                onStartConversation={startConversation}
                                workflowOutputs={workflowOutputs}
                            />
                        </div>
                      </ScrollArea>
                  </ResizablePanel>
              </ResizablePanelGroup>
            )}
          </main>
        </div>
      </SidebarInset>
    </>
  );
}
