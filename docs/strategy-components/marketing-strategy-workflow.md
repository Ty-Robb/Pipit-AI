# Marketing Strategy Workflow

## Overview

The Marketing Strategy Workflow is a comprehensive framework for creating complete marketing strategies through a chat-driven interface with integrated visual components. It follows the 8-section framework shown in the navigation:

1. **Foundations** - Vision, mission, and core values
2. **Market Insights** - Segmentation, analysis, and competitive landscape
3. **Strategy Plan** - Goals, positioning, and unique selling proposition
4. **Tactics** - Channel selection, content strategy, and pricing
5. **Implementation** - Budgeting, resource allocation, and timeline
6. **Performance** - KPIs, metrics, and effectiveness analysis
7. **Risk Management** - SWOT analysis, potential risks, and mitigation
8. **Reporting** - Actual vs. planned performance tracking

This document outlines the architectural approach, UI patterns, and implementation strategy for the workflow.

## Architecture

### Chat-Driven Interface with Visual Components

The Marketing Strategy Workflow uses a split-panel layout similar to the existing Break-Even Analysis and Sales Funnel pages:

```
┌───────────────────────────────────────────────────────────────────┐
│ Header & Navigation                                               │
├─────────────────────────┬─────────────────────────────────────────┤
│                         │                                         │
│                         │                                         │
│                         │                                         │
│                         │                                         │
│                         │                                         │
│     AI Chat             │     Visual Components                   │
│     Interface           │     (Tables, Charts, Forms)             │
│                         │                                         │
│                         │                                         │
│                         │                                         │
│                         │                                         │
│                         │                                         │
├─────────────────────────┴─────────────────────────────────────────┤
│ Footer                                                            │
└───────────────────────────────────────────────────────────────────┘
```

- **Left Panel**: AI chat interface that guides users through the strategy development process
- **Right Panel**: Dynamic visual components that change based on the current workflow section
- **Resizable**: Users can adjust the split between chat and visuals

### Core Components

1. **AI Provider**: Context provider for AI chat capabilities
2. **Page Context**: Manages breadcrumbs, tabs, and page options
3. **Resizable Panel Group**: Enables the split-panel layout
4. **Dynamic Visual Components**: Section-specific visual components

## Implementation Pattern

### Page Structure

Each workflow section follows a consistent pattern:

```typescript
export default function WorkflowSectionPage() {
  const { 
    activePageTab, 
    setBreadcrumbs,
    setPageTabs, 
    setActivePageTab, 
    setPageOptions 
  } = usePageContext();
  
  // State management for section-specific data
  const [sectionData, setSectionData] = useState(defaultData);
  
  // Set up page context
  useEffect(() => {
    setBreadcrumbs([...]);
    setPageTabs([...]);
    // Additional setup
    
    return () => {
      // Cleanup
    };
  }, []);
  
  return (
    <AIProvider tenantId="marketing-strategy">
      <div className="flex flex-1 flex-col overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Left Panel - AI Chat */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
            <ChatInterface />
          </ResizablePanel>
          
          <ResizableHandle />
          
          {/* Right Panel - Visual Components */}
          <ResizablePanel defaultSize={75}>
            <AnimatePresence mode="wait">
              <motion.div>
                {/* Section-specific components */}
              </motion.div>
            </AnimatePresence>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </AIProvider>
  );
}
```

### Data Flow

The workflow uses a bidirectional data flow:

1. **Chat-to-Visuals**: User input in chat updates visual components
2. **Visuals-to-Chat**: Changes in visual components inform chat context
3. **Persistence**: Data is saved to component data store via Workflow API

## Reference Implementations

The Marketing Strategy Workflow builds on existing patterns:

### Break-Even Analysis

The Break-Even Analysis page implements a chat-driven interface with:
- Multiple tabs (Overview, Table View, Volume Analysis)
- Table-based data entry
- Calculated metrics
- Responsive design

### Sales Funnel

The Sales Funnel page demonstrates:
- Real-time calculations based on user inputs
- Visual funnel representation
- Metrics panels
- Single-page interactive dashboard

## Next Steps

See the following documentation for detailed implementation guidance:

- [Chat-Driven Workflow Pattern](./chat-driven-workflow-pattern.md) - Implementation details for the chat interface
- [Visual Components Integration](./visual-components-integration.md) - How visual components work with chat
- [Implementation Tracker](./implementation-tracker.md) - Status of all workflow components

## References

- [Break-Even Analysis Page](../src/app/(frontend)/app/break-even-analysis/page.tsx)
- [Sales Funnel Page](../src/app/(frontend)/app/sales-funnel/page.tsx)
