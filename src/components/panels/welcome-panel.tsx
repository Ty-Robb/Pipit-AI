import { Card } from '@/components/ui/card';
import { PipitLogo } from '@/components/icons';

export function WelcomePanel() {
  return (
    <Card className="h-full flex flex-col items-center justify-center text-center border-dashed shadow-none bg-muted/20">
      <div className="flex flex-col items-center text-center space-y-4 opacity-50">
          <PipitLogo className="h-24 w-24 text-primary" />
          <p className="text-muted-foreground font-headline text-2xl">
            Pipit AI
          </p>
        </div>
    </Card>
  );
}
