import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PipitLogo } from '@/components/icons';
import { FileText, BrainCircuit, BotMessageSquare, PenSquare } from 'lucide-react';

export function WelcomePanel() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex flex-col items-center text-center space-y-4">
          <PipitLogo className="h-16 w-16 text-primary" />
          <CardTitle className="font-headline text-3xl">Welcome to Pipit AI: Your Strategy Wingman</CardTitle>
          <p className="text-muted-foreground max-w-2xl">
            Select a workflow from the left sidebar to begin, or use one of our powerful AI tools to gain insights and accelerate your marketing strategy.
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-secondary/50 p-6 rounded-lg">
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><BotMessageSquare className="text-primary" />AI-Powered Guidance</h3>
          <p className="text-sm text-muted-foreground">Ethan, your AI consultant, will guide you through structured marketing workflows, providing expert advice and feedback every step of the way.</p>
        </div>
        <div className="bg-secondary/50 p-6 rounded-lg">
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><FileText className="text-primary" />Strategy Workflows</h3>
          <p className="text-sm text-muted-foreground">Access over 20 proven workflows covering everything from market discovery to performance measurement.</p>
        </div>
        <div className="bg-secondary/50 p-6 rounded-lg">
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><BrainCircuit className="text-primary" />Insight Tools</h3>
          <p className="text-sm text-muted-foreground">Assess competitor websites and extract key information from documents to inform your strategy.</p>
        </div>
        <div className="bg-secondary/50 p-6 rounded-lg">
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <PenSquare className="h-5 w-5 text-primary" />
            Content Generation
          </h3>
          <p className="text-sm text-muted-foreground">Turn your strategic insights into ready-to-use marketing content, from blog posts to social media snippets.</p>
        </div>
      </CardContent>
    </Card>
  );
}
