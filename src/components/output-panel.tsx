"use client";

import type { PanelView, Workflow } from '@/lib/types';
import { WelcomePanel } from '@/components/panels/welcome-panel';
import { WorkflowPanel } from '@/components/panels/workflow-panel';
import { WebsiteAssessmentPanel } from '@/components/panels/website-assessment-panel';
import { DocumentInsightsPanel } from '@/components/panels/document-insights-panel';
import { ContentGenerationPanel } from '@/components/panels/content-generation-panel';

interface OutputPanelProps {
    view: PanelView;
    workflow: Workflow | null;
    strategicInsights: string | null;
}

export function OutputPanel({ view, workflow, strategicInsights }: OutputPanelProps) {
    const renderContent = () => {
        switch (view) {
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
                return <WelcomePanel />;
        }
    };

    return <div className="h-full">{renderContent()}</div>;
}
