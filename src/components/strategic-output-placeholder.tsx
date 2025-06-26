
import { Bot } from 'lucide-react';

export function StrategicOutputPlaceholder() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-4">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
            <Bot className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-1">Strategic Output</h3>
        <p className="text-muted-foreground text-sm">
            Your generated reports will appear here.
        </p>
        <p className="text-muted-foreground text-sm">
            Chat with Ethan to gather insights, then generate a report.
        </p>
    </div>
  );
}
