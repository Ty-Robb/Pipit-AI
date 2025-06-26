"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Briefcase } from 'lucide-react';
import type { PanelView } from '@/lib/types';
import { PipitLogo } from '@/components/icons';

interface WelcomePanelProps {
  setActivePanel: (panel: PanelView) => void;
  onStartConversation: (message: string) => void;
}

const actionCards = [
    {
        title: 'Discovery',
        description: 'Begin with foundational workflows to understand your market and brand position.',
        icon: Search,
        action: "I'd like to start with a Discovery workflow.",
        cta: 'Start Discovery'
    },
    {
        title: 'Marketing Strategy',
        description: 'Build a comprehensive go-to-market plan with our guided strategy workflows.',
        icon: Briefcase,
        action: "I'd like to develop a full Marketing Strategy.",
        cta: 'Start Strategy'
    },
];

export function WelcomePanel({ setActivePanel, onStartConversation }: WelcomePanelProps) {
  return (
    <div className="h-full flex flex-col justify-center">
        <div className="text-center mb-10">
            <div className="flex justify-center items-center gap-4 mb-4">
                <PipitLogo className="h-12 w-12 text-primary" />
                <div>
                    <h1 className="font-headline text-4xl font-semibold">Welcome to Pipit AI</h1>
                    <p className="text-muted-foreground">Your AI partner for marketing strategy.</p>
                </div>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
                How would you like to begin? Choose an option below to start a conversation with Ethan, or select a specific workflow from the sidebar.
            </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {actionCards.map((card, index) => (
                <Card key={index} className="flex flex-col hover:border-primary/50 hover:shadow-lg transition-all duration-200">
                    <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                <card.icon className="h-6 w-6" />
                            </div>
                            <CardTitle className="font-semibold text-xl">{card.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardDescription>{card.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Button variant="ghost" className="w-full justify-start text-primary hover:text-primary" onClick={() => onStartConversation(card.action)}>
                            {card.cta}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
  );
}
