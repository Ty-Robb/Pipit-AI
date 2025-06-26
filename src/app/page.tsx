"use client";

import { useState } from 'react';
import type { Message } from '@/lib/types';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import { PageHeader } from '@/components/page-header';
import { ChatPanel } from '@/components/chat-panel';
import { StrategicOutputPanel } from '@/components/strategic-output-panel';

const initialMessages: Message[] = [
  {
    id: 'init',
    role: 'assistant',
    content: "Hello! I'm Ethan, your AI strategy consultant. To start, could you tell me a bit about your business and your primary goals? This will help me tailor our conversation.",
  }
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen bg-background text-foreground">
          <PageHeader />
          <main className="flex-1 grid md:grid-cols-2 gap-8 p-6 md:p-8 overflow-hidden">
              <ChatPanel messages={messages} setMessages={setMessages} />
              <StrategicOutputPanel />
          </main>
        </div>
      </SidebarInset>
    </>
  );
}
