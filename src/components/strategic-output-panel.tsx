"use client";

import type { Workflow } from '@/lib/types';
import { WelcomePanel } from '@/components/panels/welcome-panel';
import { WorkflowPanel } from '@/components/panels/workflow-panel';

interface StrategicOutputPanelProps {
  workflow: Workflow | null;
}

export function StrategicOutputPanel({ workflow }: StrategicOutputPanelProps) {
  if (workflow) {
    return <WorkflowPanel workflow={workflow} />;
  }
  return <WelcomePanel />;
}
