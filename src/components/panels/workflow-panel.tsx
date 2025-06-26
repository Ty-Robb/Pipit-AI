import type { Workflow } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

interface WorkflowPanelProps {
    workflow: Workflow | null;
}

export function WorkflowPanel({ workflow }: WorkflowPanelProps) {
    if (!workflow) {
        return (
            <Card className="h-full flex items-center justify-center">
                <CardContent>
                    <p className="text-muted-foreground">Select a workflow to begin.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">{workflow.name}</CardTitle>
                <CardDescription>{workflow.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <h3 className="font-semibold mb-4">Workflow Steps:</h3>
                <ul className="space-y-3">
                    {workflow.steps.map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-accent mt-0.5" />
                            <span className="flex-1">{step}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Use the chat on the left to work through these steps with Ethan. He will guide you and help you formulate your strategy.</p>
                </div>
            </CardContent>
        </Card>
    );
}
