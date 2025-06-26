"use client";

import React, { useState } from 'react';
import type { PanelView, Workflow, Message } from '@/lib/types';
import { PipitLogo } from '@/components/icons';
import { MainNav } from '@/components/main-nav';
import { UserNav } from '@/components/user-nav';
import { ChatPanel } from '@/components/chat-panel';
import { OutputPanel } from '@/components/output-panel';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { BrainCircuit, FileText } from 'lucide-react';


export function AppLayout() {
  const [activeWorkflow, setActiveWorkflow] = useState<Workflow | null>(null);
  const [activeView, setActiveView] = useState<PanelView>('welcome');
  const [messages, setMessages] = useState<Message[]>([]);
  const [strategicInsights, setStrategicInsights] = useState<string | null>(null);

  const handleWorkflowSelect = (workflow: Workflow) => {
    setActiveWorkflow(workflow);
    setActiveView('workflow');
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: `Let's get started on the "${workflow.name}" workflow. I'll guide you through the steps. Are you ready to begin?`,
      },
    ]);
    setStrategicInsights(null);
  };
  
  const handleViewChange = (view: PanelView) => {
    setActiveView(view);
    if(view !== 'workflow') {
      setActiveWorkflow(null);
    }
  }
  
  const handleCompleteWorkflow = (insights: string) => {
    setStrategicInsights(insights);
    setMessages(prev => [...prev, {id: Date.now().toString(), role: 'assistant', content: "Great job completing the workflow! I've summarized the key strategic insights. We can now move on to generating marketing content."}]);
    setActiveView('content_generation');
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
      <div className="hidden border-r bg-card md:flex md:flex-col">
        <header className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <PipitLogo className="h-8 w-8 text-primary" />
            <h1 className="text-lg font-semibold font-headline text-primary">Pipit AI</h1>
          </div>
          <UserNav />
        </header>
        <MainNav
          activeWorkflow={activeWorkflow}
          onWorkflowSelect={handleWorkflowSelect}
          className="py-4"
        />
        <Separator />
        <div className="p-4 space-y-2">
            <Button variant={activeView === 'website_assessment' ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => handleViewChange('website_assessment')}>
                <BrainCircuit className="mr-2 h-4 w-4" /> Website Assessment
            </Button>
            <Button variant={activeView === 'document_insights' ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={() => handleViewChange('document_insights')}>
                <FileText className="mr-2 h-4 w-4" /> Document Insights
            </Button>
        </div>
      </div>
      <div className="flex flex-col bg-muted/40">
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 lg:p-6">
          <ChatPanel 
            workflow={activeWorkflow}
            messages={messages}
            setMessages={setMessages}
            onCompleteWorkflow={handleCompleteWorkflow}
          />
          <OutputPanel 
            view={activeView}
            workflow={activeWorkflow}
            strategicInsights={strategicInsights}
          />
        </main>
      </div>
    </div>
  );
}
