"use client";

import React, { useEffect, useRef } from 'react';
import type { Message } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Loader2 } from 'lucide-react';
import { AssistantIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

interface ChatPanelProps {
    messages: Message[];
    isLoading: boolean;
    handleActionClick: (value: string) => void;
    className?: string;
}

export function ChatPanel({ messages, isLoading, handleActionClick, className }: ChatPanelProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className={cn("w-full max-w-4xl space-y-4 pt-4", className)}>
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
            <div ref={messagesEndRef} />
        </div>
    );
}
