"use client";

import type { Workflow } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, Circle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface WorkflowPanelProps {
    workflow: Workflow | null;
    workflowOutputs: Record<string, string>;
}

export function WorkflowPanel({ workflow, workflowOutputs }: WorkflowPanelProps) {
    if (!workflow) {
        return (
            <Card>
                <CardContent className="pt-6">
                    <p className="text-muted-foreground">Select a workflow to begin.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">{workflow.name}</CardTitle>
                <CardDescription>{workflow.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <h3 className="font-semibold mb-4 text-sm uppercase text-muted-foreground">Workflow Output</h3>
                <div className="space-y-6">
                    {workflow.steps.map((step, index) => {
                        const isCompleted = !!workflowOutputs[step];
                        return (
                            <div key={index}>
                                <div className="flex items-start gap-4">
                                    {isCompleted ? (
                                        <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    ) : (
                                        <Circle className="h-5 w-5 text-muted-foreground/30 mt-1 flex-shrink-0" />
                                    )}
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-foreground">{step}</h4>
                                        <div className="mt-2 text-sm text-muted-foreground prose prose-sm max-w-none">
                                            {isCompleted ? (
                                                <p className="whitespace-pre-wrap">{workflowOutputs[step]}</p>
                                            ) : (
                                                <p>Output will appear here once this step is completed with Ethan.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {index < workflow.steps.length - 1 && <Separator className="mt-6" />}
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
