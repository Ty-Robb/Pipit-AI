"use client";

import { useState } from 'react';
import type { Message, Workflow } from '@/lib/types';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import { PageHeader } from '@/components/page-header';
import { ChatPanel } from '@/components/chat-panel';
import { StrategicOutputPanel } from '@/components/strategic-output-panel';

const initialMessages: Message[] = [
  {
    id: 'init',
    role: 'assistant',
    content: "Hello! I'm Ethan, your AI strategy consultant. What would you like to focus on today?",
    actions: [
      { label: '🚀 Discovery', value: "Let's explore Discovery workflows." },
      { label: '💡 Marketing Strategy', value: 'I want to work on some Marketing Strategy workflows.' },
    ]
  }
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [activeWorkflow, setActiveWorkflow] = useState<Workflow | null>(null);

  const handleWorkflowSelect = (workflow: Workflow) => {
    setActiveWorkflow(workflow);
    setMessages([
      {
        id: 'init',
        role: 'assistant',
        content: `Great! Let's start with the "${workflow.name}" workflow.\n\nThe first step is: **${workflow.steps[0]}**.\n\nUse the panel on the right to navigate steps, and let's discuss your approach here.`
      }
    ]);
  };

  return (
    <>
      <AppSidebar onWorkflowSelect={handleWorkflowSelect} activeWorkflow={activeWorkflow} />
      <SidebarInset>
        <div className="flex flex-col h-screen bg-background text-foreground">
          <PageHeader />
          <main className="flex-1 grid md:grid-cols-2 gap-8 p-6 md:p-8 overflow-hidden">
              <ChatPanel messages={messages} setMessages={setMessages} />
              <StrategicOutputPanel workflow={activeWorkflow} />
          </main>
        </div>
      </SidebarInset>
    </>
  );
}
