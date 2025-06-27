# Visual Components Integration

## Overview

This document outlines how visual components are integrated with the chat-driven interface in the marketing strategy workflow. Visual components provide interactive, data-focused interfaces that complement the conversational experience.

## Component Architecture

### Visual Component Hierarchy

```
┌────────────────────────────────────────────┐
│ Container Component                        │
│ ┌──────────────────────────────────────┐   │
│ │ Section Header                       │   │
│ └──────────────────────────────────────┘   │
│ ┌──────────────────────────────────────┐   │
│ │ Interactive Component                │   │
│ │ ┌────────────────┐ ┌──────────────┐  │   │
│ │ │ Input Element  │ │ Visualization│  │   │
│ │ └────────────────┘ └──────────────┘  │   │
│ └──────────────────────────────────────┘   │
│ ┌──────────────────────────────────────┐   │
│ │ Actionable Feedback                  │   │
│ └──────────────────────────────────────┘   │
└────────────────────────────────────────────┘
```

### Component Types

The marketing strategy workflow uses several types of visual components:

1. **Data Input Components**
   - Form inputs (text, number, select, etc.)
   - Tables with editable cells
   - Multi-select fields
   - Rich text editors

2. **Data Visualization Components**
   - Charts (bar, line, pie, etc.)
   - Funnel visualizations
   - Kanban-style boards
   - Matrices and grids

3. **Interactive Analysis Components**
   - Calculators
   - Scenario builders
   - Comparison tools
   - Assessment frameworks

## Integration Patterns

### Component Loading Pattern

Visual components are loaded based on the current workflow context:

```typescript
function WorkflowVisualContainer({ section, step, data }) {
  // Determine which component to render based on section and step
  const getComponent = () => {
    switch(section) {
      case 'foundations':
        return step === 'vision' ? <VisionStatementForm data={data} /> : <MissionStatementForm data={data} />;
      
      case 'marketInsights':
        return <MarketInsightsPanel step={step} data={data} />;
      
      // Additional cases for other sections
      
      default:
        return <PlaceholderComponent />;
    }
  };

  return (
    <div className="visual-container">
      {getComponent()}
    </div>
  );
}
```

### State Synchronization Pattern

Visual components maintain bidirectional state synchronization with the chat interface:

```typescript
function SynchronizedComponent({ initialData, onDataChange }) {
  // Local state for the component
  const [localData, setLocalData] = useState(initialData);
  
  // Update local state when initialData changes (from chat)
  useEffect(() => {
    setLocalData(initialData);
  }, [initialData]);
  
  // Handle local changes and propagate them
  const handleChange = (newData) => {
    setLocalData(newData);
    onDataChange(newData);
  };
  
  // Render the component with local state
  return (
    <InteractiveComponent 
      data={localData} 
      onChange={handleChange} 
    />
  );
}
```

### Progressive Enhancement Pattern

Components progressively enhance as the user completes more of the workflow:

```typescript
function ProgressiveComponent({ progress, data, onChange }) {
  // Determine which features to show based on progress
  const features = {
    showBasic: true,
    showIntermediate: progress >= 30,
    showAdvanced: progress >= 60,
    showExpert: progress >= 90
  };
  
  return (
    <div className="progressive-component">
      {/* Basic features always visible */}
      <BasicFeatures data={data} onChange={onChange} />
      
      {/* Intermediate features */}
      {features.showIntermediate && (
        <IntermediateFeatures data={data} onChange={onChange} />
      )}
      
      {/* Advanced features */}
      {features.showAdvanced && (
        <AdvancedFeatures data={data} onChange={onChange} />
      )}
      
      {/* Expert features */}
      {features.showExpert && (
        <ExpertFeatures data={data} onChange={onChange} />
      )}
    </div>
  );
}
```

## Component Design Patterns

### Input with Instant Visualization

Components that combine input with immediate visual feedback:

```
┌────────────────────────────────────────────────────┐
│ Component Title                                    │
├────────────────────────┬───────────────────────────┤
│                        │                           │
│                        │                           │
│                        │                           │
│    Input Controls      │     Live Visualization    │
│                        │                           │
│                        │                           │
│                        │                           │
├────────────────────────┴───────────────────────────┤
│ Actionable Insights                                │
└────────────────────────────────────────────────────┘
```

### Table with Analysis

Components that present tabular data with analytical tools:

```
┌────────────────────────────────────────────────────┐
│ Component Title                 ┌─────────────────┐│
│                                 │ Summary Metrics ││
├─────────────────────────────────┴─────────────────┤│
│ ┌───────────────────────────────────────────────┐ │
│ │                                               │ │
│ │               Editable Table                  │ │
│ │                                               │ │
│ └───────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────┤
│ ┌───────────────┐ ┌───────────────┐ ┌───────────┐ │
│ │ Analysis 1    │ │ Analysis 2    │ │ Analysis 3│ │
│ └───────────────┘ └───────────────┘ └───────────┘ │
└────────────────────────────────────────────────────┘
```

### Multi-Step Form

Components that guide users through a sequential form:

```
┌────────────────────────────────────────────────────┐
│ Component Title                                    │
├────────────────────────────────────────────────────┤
│ Step 1 of 4: [Step Name]                           │
│ ┌──────────────────────────────────────────────┐   │
│ │                                              │   │
│ │               Step Content                   │   │
│ │                                              │   │
│ └──────────────────────────────────────────────┘   │
│                                                    │
│ ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────┐ │
│ │ Step 1   │  │ Step 2   │  │ Step 3   │  │Step 4│ │
│ └──────────┘  └──────────┘  └──────────┘  └─────┘ │
│                                                    │
│ ┌─────────────┐                   ┌─────────────┐  │
│ │   Previous  │                   │     Next    │  │
│ └─────────────┘                   └─────────────┘  │
└────────────────────────────────────────────────────┘
```

## Responsive Design

### Breakpoint Adaptation

Visual components adapt to different screen sizes:

```typescript
function ResponsiveComponent() {
  // Detect viewport size
  const { width } = useViewport();
  
  // Determine layout based on breakpoints
  const layout = width < 640 ? 'stacked'
               : width < 1024 ? 'side-by-side'
               : 'expanded';
  
  return (
    <div className={`responsive-component layout-${layout}`}>
      {layout === 'stacked' && <StackedLayout />}
      {layout === 'side-by-side' && <SideBySideLayout />}
      {layout === 'expanded' && <ExpandedLayout />}
    </div>
  );
}
```

### Panel Management

In smaller viewports, the split panel layout adapts:

1. **Mobile View**: Full-screen chat with button to switch to full-screen visuals
2. **Tablet View**: Stacked layout with chat above visuals
3. **Desktop View**: Side-by-side split panels

```tsx
function ResponsivePanelManager() {
  const [activePanel, setActivePanel] = useState('chat');
  const { width } = useViewport();
  
  // On mobile, show one panel at a time
  if (width < 768) {
    return (
      <div className="mobile-panels">
        {activePanel === 'chat' ? <ChatPanel /> : <VisualPanel />}
        <PanelToggleButton 
          activePanel={activePanel} 
          onChange={setActivePanel} 
        />
      </div>
    );
  }
  
  // On desktop, show split panels
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <ChatPanel />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <VisualPanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
```

## Accessibility

### Keyboard Navigation

Visual components support full keyboard navigation:

- Tab order follows a logical sequence
- Arrow keys navigate between cells in tables
- Escape key cancels current action
- Enter key confirms actions

### Screen Reader Support

Components include proper ARIA attributes:

```html
<div 
  role="region" 
  aria-labelledby="component-title"
  aria-describedby="component-description"
>
  <h2 id="component-title">Market Segmentation Tool</h2>
  <p id="component-description" className="sr-only">
    Tool for defining market segments with visualization
  </p>
  
  <!-- Component content -->
</div>
```

### Focus Management

Components manage focus appropriately:

```typescript
function FocusManagingComponent() {
  const inputRef = useRef(null);
  
  // Set focus to the input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  // Handle focus after actions
  const handleAction = () => {
    // Perform action
    // ...
    
    // Return focus to appropriate element
    inputRef.current?.focus();
  };
  
  return (
    <div>
      <input ref={inputRef} aria-label="Component input" />
      <button onClick={handleAction}>Perform Action</button>
    </div>
  );
}
```

## Animation and Transitions

### Component Transitions

Components use AnimatePresence from Framer Motion for smooth transitions:

```tsx
function TransitioningComponent({ activeTab }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        {getTabContent(activeTab)}
      </motion.div>
    </AnimatePresence>
  );
}
```

### Data Update Animations

Subtle animations indicate data changes:

```tsx
function AnimatedDataComponent({ data }) {
  return (
    <div>
      {data.map(item => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={item.isUpdated ? 'highlight-update' : ''}
        >
          {item.value}
        </motion.div>
      ))}
    </div>
  );
}
```

## Reference Implementations

### Break-Even Analysis Components

The Break-Even Analysis page implements:

- Table-based input with calculated fields
- Multi-tab interface (Overview, Table View, Volume Analysis)
- Real-time calculations
- Responsive layout

Example from Table View component:

```tsx
function TableView({ tableData, setTableData }) {
  const handleCellChange = (section, id, value) => {
    // Update the specific cell
    const updatedSection = tableData[section].map(item =>
      item.id === id ? { ...item, value } : item
    );
    
    // Update the entire table with the new section
    const updatedTableData = {
      ...tableData,
      [section]: updatedSection
    };
    
    // Recalculate derived values
    const finalTableData = recalculateTableData(updatedTableData);
    
    // Update state
    setTableData(finalTableData);
  };
  
  return (
    <div className="table-view">
      {/* Render each section as a table */}
      {Object.entries(tableData).map(([sectionName, sectionData]) => (
        <Section
          key={sectionName}
          name={sectionName}
          data={sectionData}
          onCellChange={(id, value) => handleCellChange(sectionName, id, value)}
        />
      ))}
    </div>
  );
}
```

### Sales Funnel Components

The Sales Funnel page implements:

- Input forms with real-time updates
- Funnel visualization
- Calculation metrics
- Side-by-side layout

Example from Marketing Funnel Calculator:

```tsx
function MarketingFunnelCalculator({ data }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Marketing Funnel Calculator</CardTitle>
        <CardDescription>
          Visualize your marketing and sales funnel
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative mx-auto max-w-[320px] pt-4">
          {/* Funnel visualization */}
          <FunnelVisualization data={data} />
          
          {/* Metrics labels */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <MetricsLabel 
              label="Prospects" 
              value={data.prospects.toLocaleString()} 
            />
            <MetricsLabel 
              label="Revenue" 
              value={`$${data.revenue.toLocaleString()}`} 
              highlight
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

## Implementation Checklist

- [ ] Define component interfaces and props
- [ ] Create base visual components for each workflow section
- [ ] Implement responsive layouts for all components
- [ ] Add accessibility attributes and keyboard navigation
- [ ] Implement state synchronization with chat interface
- [ ] Add animations and transitions
- [ ] Create connection to WorkflowDataContext
- [ ] Test components across different devices and screen sizes
