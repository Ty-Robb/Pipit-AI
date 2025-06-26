"use client";

import { useState, useEffect } from 'react';
import type { Workflow } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, Circle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WorkflowPanelProps {
    workflow: Workflow | null;
}

export function WorkflowPanel({ workflow }: WorkflowPanelProps) {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // Reset to the first step whenever a new workflow is selected
        setCurrentStep(0);
    }, [workflow]);


    if (!workflow) {
        return (
            <Card className="h-full flex items-center justify-center">
                <CardContent>
                    <p className="text-muted-foreground">Select a workflow to begin.</p>
                </CardContent>
            </Card>
        );
    }

    const goToNextStep = () => {
        setCurrentStep(prev => Math.min(workflow.steps.length - 1, prev + 1));
    };

    const goToPrevStep = () => {
        setCurrentStep(prev => Math.max(0, prev - 1));
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">{workflow.name}</CardTitle>
                <CardDescription>{workflow.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
                <h3 className="font-semibold mb-4">Workflow Steps:</h3>
                <ul className="space-y-4 flex-grow">
                    {workflow.steps.map((step, index) => {
                        const isCompleted = index < currentStep;
                        const isActive = index === currentStep;
                        return (
                            <li key={index} className="flex items-start gap-3">
                                {isCompleted ? (
                                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                                ) : isActive ? (
                                    <Circle className="h-5 w-5 text-primary mt-0.5 fill-current" />
                                ) : (
                                    <Circle className="h-5 w-5 text-muted-foreground/50 mt-0.5" />
                                )}
                                <span className={cn(
                                    "flex-1",
                                    isActive && "font-semibold text-foreground",
                                    isCompleted && "text-muted-foreground line-through",
                                    !isActive && !isCompleted && "text-muted-foreground"
                                )}>
                                    {step}
                                </span>
                            </li>
                        );
                    })}
                </ul>
                <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Use the chat on the left to work through these steps with Ethan. He will guide you and help you formulate your strategy.</p>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" onClick={goToPrevStep} disabled={currentStep === 0}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous
                    </Button>
                    <Button onClick={goToNextStep} disabled={currentStep === workflow.steps.length - 1}>
                        Next Step
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
