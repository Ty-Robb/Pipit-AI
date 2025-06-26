"use client";

import { workflowCategories, workflows } from "@/data/workflows";
import type { Workflow } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";

interface MainNavProps {
  activeWorkflow: Workflow | null;
  onWorkflowSelect: (workflow: Workflow) => void;
  className?: string;
}

export function MainNav({
  activeWorkflow,
  onWorkflowSelect,
  className,
}: MainNavProps) {
  return (
    <ScrollArea className={cn("flex-grow", className)}>
      <Accordion type="multiple" defaultValue={workflowCategories.slice(0,3)} className="px-4">
        {workflowCategories.map((category) => {
          const categoryWorkflows = workflows.filter(
            (wf) => wf.category === category
          );
          if (categoryWorkflows.length === 0) return null;

          return (
            <AccordionItem value={category} key={category}>
              <AccordionTrigger className="text-sm font-medium hover:no-underline">
                {category}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-1">
                  {categoryWorkflows.map((workflow) => (
                    <button
                      key={workflow.id}
                      onClick={() => onWorkflowSelect(workflow)}
                      className={cn(
                        "flex items-center gap-3 rounded-md p-2 text-left text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground",
                        activeWorkflow?.id === workflow.id &&
                          "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                      )}
                    >
                      <FileText className="h-4 w-4" />
                      <span>{workflow.name}</span>
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </ScrollArea>
  );
}
