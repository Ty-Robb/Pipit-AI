"use client";

import React, { useState, useRef, useEffect } from 'react';
import type { Message } from '@/lib/types';
import { aiConsultantGuidance } from '@/ai/flows/ai-consultant';
import { useToast } from '@/hooks/use-toast';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Send, Loader2, Paperclip } from 'lucide-react';
import { AssistantIcon } from '@/components/icons';
import { cn } from '@/lib/utils';


interface ChatPanelProps {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function ChatPanel({ messages, setMessages }: ChatPanelProps) {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (viewportRef.current) {
            viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const context = messages.slice(-5).map(m => `${m.role}: ${m.content}`).join('\n');

            const result = await aiConsultantGuidance({ message: input, context });

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
    };

    return (
        <div className="flex flex-col h-full">
            <ScrollArea className="flex-grow pr-4 -mr-4" viewportRef={viewportRef}>
                <div className="space-y-4">
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
                            </div>
                            {message.role === 'user' && (
                                 <Avatar className="h-8 w-8">
                                    <AvatarFallback><User size={20} /></AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                     {isLoading && (
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
                </div>
            </ScrollArea>
             <div className="mt-4 p-1 bg-muted/30 rounded-lg border">
                <form onSubmit={handleSendMessage} className="flex w-full items-center">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
                        rows={1}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage(e);
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
    );
}
