"use client";

import { useState, useRef, useEffect } from 'react';
import type { Message, Workflow, PanelView } from '@/lib/types';
import { aiConsultantGuidance } from '@/ai/flows/ai-consultant';
import { useToast } from '@/hooks/use-toast';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import { PageHeader } from '@/components/page-header';
import { ChatPanel } from '@/components/chat-panel';
import { StrategicOutputPanel } from '@/components/strategic-output-panel';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Loader2, Paperclip } from 'lucide-react';

const initialMessages: Message[] = [];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [activeWorkflow, setActiveWorkflow] = useState<Workflow | null>(null);
  const [activePanel, setActivePanel] = useState<PanelView>('welcome');
  const [strategicInsights, setStrategicInsights] = useState<string | null>(null);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleWorkflowSelect = (workflow: Workflow) => {
    setActiveWorkflow(workflow);
    setActivePanel('workflow');
    setMessages([]); // Show the workflow panel, don't start a chat
  };

  const handlePanelChange = (panel: PanelView) => {
    setActiveWorkflow(null);
    setActivePanel(panel);
    setMessages([]); // Show the selected tool panel
  };

  const sendMessage = async (messageContent: string) => {
      setIsLoading(true);

      try {
          const context = [...messages.slice(-5), { role: 'user', content: messageContent, id: '' }].map(m => `${m.role}: ${m.content}`).join('\n');
          const result = await aiConsultantGuidance({ message: messageContent, context });
          const assistantMessage: Message = {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: result.response,
          };
          setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
          console.error('Error with AI Consultant:', error);
          toast({
              variant: 'destructive',
              title: 'Error',
              description: 'Failed to get a response from Ethan. Please try again.',
          });
          setMessages(prev => prev.slice(0, -1));
      } finally {
          setIsLoading(false);
      }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || isLoading) return;

      const userMessage: Message = {
          id: Date.now().toString(),
          role: 'user',
          content: input,
      };

      setMessages((prev) => [...prev, userMessage]);
      const messageToSend = input;
      setInput('');
      await sendMessage(messageToSend);
  };
  
  const handleActionClick = async (value: string) => {
      if (isLoading) return;
      const updatedMessages = messages.map(m => ({ ...m, actions: undefined }));
      const userMessage: Message = {
          id: Date.now().toString(),
          role: 'user',
          content: value,
      };
      setMessages([...updatedMessages, userMessage]);
      await sendMessage(value);
  }

  const showChat = messages.length > 0;

  return (
    <>
      <AppSidebar onWorkflowSelect={handleWorkflowSelect} activeWorkflow={activeWorkflow} />
      <SidebarInset>
        <div className="flex flex-col h-screen bg-background text-foreground">
          <PageHeader />
          <main className="flex-1 flex flex-col p-6 md:p-8 overflow-hidden">
              <div className="flex-1 flex items-center justify-center overflow-y-auto pb-8">
                 {showChat ? (
                    <ChatPanel messages={messages} isLoading={isLoading} handleActionClick={handleActionClick} />
                 ) : (
                    <StrategicOutputPanel
                        activePanel={activePanel}
                        setActivePanel={handlePanelChange}
                        workflow={activeWorkflow}
                        strategicInsights={strategicInsights}
                    />
                 )}
              </div>
              <div className="pt-4 max-w-4xl w-full mx-auto">
                <div className="p-1 bg-background border rounded-lg shadow-sm">
                  <form onSubmit={handleFormSubmit} className="flex w-full items-center">
                      <Textarea
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
                          rows={1}
                          onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  handleFormSubmit(e);
                              }
                          }}
                          disabled={isLoading}
                      />
                      <Button type="button" variant="ghost" size="icon" disabled={isLoading}>
                          <Paperclip className="h-5 w-5 text-muted-foreground" />
                          <span className="sr-only">Attach file</span>
                      </Button>
                      <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                          <span className="sr-only">Send</span>
                      </Button>
                  </form>
                </div>
              </div>
          </main>
        </div>
      </SidebarInset>
    </>
  );
}
