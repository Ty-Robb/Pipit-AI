"use client";

import React, { useState, useRef, useEffect } from 'react';
import type { Message, Workflow } from '@/lib/types';
import { aiConsultantGuidance } from '@/ai/flows/ai-consultant';
import { useToast } from '@/hooks/use-toast';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User, Send, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';


interface ChatPanelProps {
    workflow: Workflow | null;
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    onCompleteWorkflow: (insights: string) => void;
}

export function ChatPanel({ workflow, messages, setMessages, onCompleteWorkflow }: ChatPanelProps) {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
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
            const workflowContext = workflow
                ? `The user is currently in the "${workflow.name}" workflow. The steps are: ${workflow.steps.join(', ')}.`
                : 'The user is not in a specific workflow.';
            
            const context = messages.slice(-5).map(m => `${m.role}: ${m.content}`).join('\n');

            const result = await aiConsultantGuidance({ message: input, workflow: workflowContext, context });

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
        <Card className="flex flex-col h-[calc(100vh-2rem)] lg:h-[calc(100vh-3rem)]">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    Chat with Ethan
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
                <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : '')}>
                                {message.role === 'assistant' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={20} /></AvatarFallback>
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
                                    <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={20} /></AvatarFallback>
                                </Avatar>
                                <div className="rounded-lg px-3 py-2 bg-secondary flex items-center">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4 pt-4">
                 {workflow && (
                    <Button variant="outline" size="sm" onClick={() => onCompleteWorkflow(messages.map(m => `${m.role}: ${m.content}`).join('\n\n'))}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Complete Workflow & Generate Insights
                    </Button>
                )}
                 <form onSubmit={handleSendMessage} className="flex w-full items-start space-x-2">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="min-h-1 flex-1"
                        rows={1}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                handleSendMessage(e);
                            }
                        }}
                        disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}
