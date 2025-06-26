"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Globe, Sparkles } from 'lucide-react';
import type { PanelView } from '@/lib/types';
import { PipitLogo } from '@/components/icons';

interface WelcomePanelProps {
  setActivePanel: (panel: PanelView) => void;
}

const actionCards = [
    {
        title: 'Website Assessment',
        description: 'Analyze a URL for strategic insights.',
        icon: Globe,
        panel: 'website_assessment' as PanelView,
        cta: 'Assess Website'
    },
    {
        title: 'Document Insights',
        description: 'Extract key information from a PDF.',
        icon: FileText,
        panel: 'document_insights' as PanelView,
        cta: 'Analyze Document'
    },
    {
        title: 'Content Generation',
        description: 'Brainstorm marketing ideas from insights.',
        icon: Sparkles,
        panel: 'content_generation' as PanelView,
        cta: 'Generate Content'
    },
];

export function WelcomePanel({ setActivePanel }: WelcomePanelProps) {
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
                Select a standalone tool below to get started immediately, or choose a guided workflow from the sidebar to develop a comprehensive strategy.
            </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {actionCards.map((card) => (
                <Card key={card.panel} className="flex flex-col hover:border-primary/50 hover:shadow-lg transition-all duration-200">
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
                        <Button variant="ghost" className="w-full justify-start text-primary hover:text-primary" onClick={() => setActivePanel(card.panel)}>
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
