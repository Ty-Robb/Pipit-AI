"use client";

import React, { useState } from 'react';
import type { Message, Workflow, PanelView } from '@/lib/types';
import { ChatPanel } from '@/components/chat-panel';
import { OutputPanel } from '@/components/output-panel';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { PageHeader } from './page-header';

export function AppLayout() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: "Hello! I'm Ethan, your AI strategy consultant. To start, could you tell me a bit about your business and your primary goals? This will help me tailor our conversation.",
    }
  ]);
  const [activeWorkflow, setActiveWorkflow] = useState<Workflow | null>(null);
  const [activePanel, setActivePanel] = useState<PanelView>('welcome');
  const [strategicInsights, setStrategicInsights] = useState<string | null>(null);


  const handleWorkflowSelect = (workflow: Workflow) => {
    setActiveWorkflow(workflow);
    setActivePanel('workflow');
    setMessages([
        {
          id: '0',
          role: 'assistant',
          content: `Great! We're starting the "${workflow.name}" workflow. The first step is: ${workflow.steps[0]}. How would you like to approach this?`,
        }
    ]);
  };

  const handlePanelChange = (panel: PanelView) => {
    setActivePanel(panel);
    setActiveWorkflow(null);
  }

  return (
    <SidebarProvider>
      <AppSidebar 
        activeWorkflow={activeWorkflow}
        onWorkflowSelect={handleWorkflowSelect}
      />
      <main className="flex flex-1 flex-col">
        <PageHeader />
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 lg:p-6 bg-muted/40">
          <ChatPanel 
            messages={messages}
            setMessages={setMessages}
          />
          <OutputPanel 
            activePanel={activePanel}
            workflow={activeWorkflow}
            strategicInsights={strategicInsights}
          />
        </div>
      </main>
    </SidebarProvider>
  );
}
