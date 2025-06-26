"use client";

import React, { useState, useEffect, useRef } from 'react';
import type { Message, Workflow } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { aiConsultantGuidance } from '@/ai/flows/ai-consultant';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Loader2, Send, Paperclip } from 'lucide-react';
import { AssistantIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card';

interface ChatPanelProps {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    activeWorkflow: Workflow | null;
    onStepComplete: (step: string, output: string) => void;
}

export function ChatPanel({ messages, setMessages, activeWorkflow, onStepComplete }: ChatPanelProps) {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const isSendingInitialMessage = useRef(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    const sendMessage = async (messageContent: string) => {
        if(isLoading) return;

        setIsLoading(true);
        isSendingInitialMessage.current = false;

        try {
            const context = [...messages.slice(-5), { role: 'user', content: messageContent, id: '' }].map(m => `${m.role}: ${m.content}`).join('\n');
            const result = await aiConsultantGuidance({ 
                message: messageContent, 
                context,
                workflow: activeWorkflow?.name
            });
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: result.response,
            };
            setMessages((prev) => [...prev, assistantMessage]);

            // Placeholder for agentic step completion.
            // In a real scenario, the AI response would indicate if a step is complete.
            // For now, we could simulate it.
            // if (result.response.toLowerCase().includes("great, let's move to")) {
            //   const completedStep = activeWorkflow?.steps.find(step => context.toLowerCase().includes(step.toLowerCase()));
            //   if(completedStep) {
            //      onStepComplete(completedStep, "This is a placeholder for the generated output of the completed step.");
            //   }
            // }

        } catch (error) {
            console.error('Error with AI Consultant:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to get a response from Ethan. Please try again.',
            });
            setMessages(prev => prev.slice(0, -1)); // Remove the user message that failed
        } finally {
            setIsLoading(false);
        }
    };
    
    // Effect to send the first message automatically
    useEffect(() => {
        if (messages.length === 1 && messages[0].role === 'user' && !isSendingInitialMessage.current) {
            isSendingInitialMessage.current = true;
            sendMessage(messages[0].content);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

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
    
    if (messages.length === 0) {
        return (
            <div className="flex h-full items-center justify-center p-6">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <div className="flex justify-center mb-4">
                            <Avatar className="h-12 w-12">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                    <AssistantIcon className="h-8 w-8" />
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <CardTitle className="font-headline text-2xl">Chat with Ethan</CardTitle>
                        <CardDescription>Your AI strategy consultant. Select a workflow or tool to start the conversation.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full p-6">
            <div className="flex-1 space-y-4 overflow-y-auto pb-4 pr-4 -mr-4">
                {messages.map((message) => (
                    <div key={message.id} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : '')}>
                        {message.role === 'assistant' && (
                            <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                    <AssistantIcon className="h-5 w-5" />
                                </AvatarFallback>
                            </Avatar>
                        )}
                        <div className={cn("rounded-lg px-3 py-2 max-w-[80%]", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary')}>
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            {message.actions && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {message.actions.map((action, index) => (
                                        <Button key={index} variant="outline" size="sm" onClick={() => handleActionClick(action.value)} disabled={isLoading}>
                                            {action.label}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {message.role === 'user' && (
                            <Avatar className="h-8 w-8">
                                <AvatarFallback><User size={20} /></AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}
                {isLoading && messages.length > 0 && (
                    <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary">
                                <AssistantIcon className="h-5 w-5" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg px-3 py-2 bg-secondary flex items-center">
                            <Loader2 className="h-5 w-5 animate-spin" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="pt-4">
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
                          disabled={isLoading || messages.length === 0}
                      />
                      <Button type="button" variant="ghost" size="icon" disabled={isLoading || messages.length === 0}>
                          <Paperclip className="h-5 w-5 text-muted-foreground" />
                          <span className="sr-only">Attach file</span>
                      </Button>
                      <Button type="submit" size="icon" disabled={isLoading || !input.trim() || messages.length === 0}>
                          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                          <span className="sr-only">Send</span>
                      </Button>
                  </form>
                </div>
              </div>
        </div>
    );
}
