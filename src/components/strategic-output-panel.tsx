"use client";

import type { Workflow, PanelView } from '@/lib/types';
import { WelcomePanel } from '@/components/panels/welcome-panel';
import { WorkflowPanel } from '@/components/panels/workflow-panel';
import { WebsiteAssessmentPanel } from '@/components/panels/website-assessment-panel';
import { DocumentInsightsPanel } from '@/components/panels/document-insights-panel';
import { ContentGenerationPanel } from '@/components/panels/content-generation-panel';

interface StrategicOutputPanelProps {
  activePanel: PanelView;
  setActivePanel: (panel: PanelView) => void;
  workflow: Workflow | null;
  strategicInsights: string | null;
}

export function StrategicOutputPanel({ activePanel, setActivePanel, workflow, strategicInsights }: StrategicOutputPanelProps) {
    switch (activePanel) {
        case 'workflow':
            return <WorkflowPanel workflow={workflow} />;
        case 'website_assessment':
            return <WebsiteAssessmentPanel />;
        case 'document_insights':
            return <DocumentInsightsPanel />;
        case 'content_generation':
            return <ContentGenerationPanel strategicInsights={strategicInsights} />;
        case 'welcome':
        default:
            return <WelcomePanel setActivePanel={setActivePanel} />;
    }
}
