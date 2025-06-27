Workflow Step Document Name: Core Values Worksheet Workflow Step Name: Define Your Company's Core Values

I. Purpose & Introduction
The goal is to transform the "Core Values Worksheet" into an engaging, efficient, and interactive experience that helps users identify, document, and communicate their company's core values. This step leverages pre-existing company and team information to streamline the process.

AI Chat (Left Panel):

Initial Greeting & Purpose: The AI will initiate the conversation, referencing the user's company and explaining the importance of defining core values.
"Hello there! Welcome to the 'Define Your Company's Core Values' module. This is a crucial step in shaping your company's identity, guiding decisions, and fostering a strong culture."
"Together, we'll identify the foundational beliefs that truly drive [onboarding_company_name] forward."
"Having clearly defined core values helps to unite your team, guide decision-making, and ensure continuity even as your company evolves. We'll work through understanding, documenting, and preparing to communicate these."
"Would you like a quick overview of why core values are so important, or shall we jump right into defining them for [onboarding_company_name]?" (Offers "brief overview" or "let's begin").
Benefits Highlighted (if user chooses "brief overview"):
"Excellent choice! Understanding the 'why' makes the 'what' more impactful. Core values can:"
"Shape your company's unique culture and character."
"Provide a thread of continuity for your organization through change."
"Guide employee behavior and organizational decision-making effectively."
"Ready to begin defining them for [onboarding_company_name]?"
Visual Components (Right Panel):

Initial State:
A clean title card: "Define Your Company's Core Values"
Below the title, a brief, engaging overview statement, similar to the AI's introduction, but concise.
"Why are Core Values Important?" section with 3-4 bullet points corresponding to the AI's explanation.
Button: "Start Defining Values" (active when AI is ready, or user clicks "let's begin").

## shadcn/ui Component Mapping

The Core Values workflow utilizes these specific shadcn/ui components:

| UI Element | shadcn/ui Component | Usage |
|------------|---------------------|-------|
| Main Container | `<Card>` | Primary container for each section of the workflow |
| Section Headers | `<CardHeader>`, `<CardTitle>` | Headers for each section (Introduction, Values List, etc.) |
| Content Areas | `<CardContent>` | Content containers for value descriptions and examples |
| Action Buttons | `<Button variant="default">` | Primary actions like "Start Defining Values" |
| Secondary Actions | `<Button variant="outline">` | Secondary actions like "View Examples" |
| Value List | `<Accordion>` | Collapsible list of core values |
| Value Items | `<AccordionItem>` | Individual core value entries |
| Rich Text Input | `<Editor>` | For entering value descriptions |
| Value Tags | `<Badge>` | For displaying personal values |
| Example Preview | `<HoverCard>` | For previewing company examples |
| Introduction Text | `<CardDescription>` | For explanatory text |
| Value Prioritization | `<DragDropContext>` from dnd-kit | For reordering values |
| Dialog | `<Dialog>` | For editing individual values |
| Score Input | `<Slider>` | For scoring aggregated values |
| Team Members Table | `<Table>` | For displaying stakeholders and their values |

II. Deconstruction into Interactive Phases
Phase 1: Understanding Core Values (Optional Context & Exploration)
This phase integrates the "Core Values Example" section from the document. The AI offers this as an optional exploratory step.

A. AI Chat Guidance & Data Collection (Left Panel):

Prompt: "To help inspire you, we can also explore how some well-known companies articulate their core values. Would you like to see examples from companies like Nike, Amazon, or Google?" (The AI will pull from the reference_company_core_values data you provided).
Input Handling: User responds "Yes," "No," or natural language variants.
Looping/Iteration: If "Yes," AI can present one example, then ask, "Would you like to see another example, or are you ready to proceed?"
B. Corresponding Visual Component(s) (Right Panel):

Component Choice: A collapsible/expandable section or carousel for each company example.
Component Structure:
Initially hidden (or minimal preview).
When AI prompts/user requests, content appears.
Each example (e.g., Nike, Amazon) would be a card or section with:
Company Name & short description.
Bulleted list of their core values, as provided in the reference_company_core_values data.
Small "Read More" button if the full detailed description is too long for initial display.
Interaction: If user navigates examples visually, AI can acknowledge ("Seeing some inspiration from Nike, are we?").
C. Data Captured in this Phase:

preferences_explored_examples: boolean (to record if user chose to view examples).
preferences_example_companies: Array (names of companies viewed).

## Example Code Snippets

### Company Examples Component

```tsx
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface CompanyExample {
  name: string;
  description: string;
  values: {
    name: string;
    description: string;
  }[];
}

interface CompanyExamplesProps {
  examples: CompanyExample[];
  onViewExample: (companyName: string) => void;
}

export function CompanyExamples({ examples, onViewExample }: CompanyExamplesProps) {
  const [activeTab, setActiveTab] = useState(examples[0]?.name || '');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onViewExample(value);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Company Core Values Examples</CardTitle>
        <CardDescription>
          Explore how successful companies articulate their core values
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="w-full">
            {examples.map((example) => (
              <TabsTrigger key={example.name} value={example.name} className="flex-1">
                {example.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {examples.map((example) => (
            <TabsContent key={example.name} value={example.name}>
              <Card>
                <CardHeader>
                  <CardTitle>{example.name}</CardTitle>
                  <CardDescription>{example.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {example.values.map((value, index) => (
                      <AccordionItem key={index} value={`value-${index}`}>
                        <AccordionTrigger>{value.name}</AccordionTrigger>
                        <AccordionContent>{value.description}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
```

Phase 2: Identifying Key Stakeholders and Their Personal Values
This combines "Document your Organization's Core Values" steps related to name, position, and personal values. It critically leverages onboarding_team_members.

A. AI Chat Guidance & Data Collection (Left Panel):

Initial Prompt: "Great! Let's start by identifying the key leaders who will contribute to defining [onboarding_company_name]'s core values. This usually includes executives or founders."
Information Check & Confirmation (Leveraging onboarding_team_members):
if onboarding_team_members is available and not empty:
"From your onboarding, I have the following team members listed as potential stakeholders for this exercise:"
AI will list: "[member1.name] ([member1.position]), [member2.name] ([member2.position]), etc."
"Is this list accurate, or do you need to add, remove, or update any of these individuals for our core values discussion?"
User Input Handling:
"Yes, that's correct": AI confirms and proceeds with the listed members.
"No, I need to update": AI prompts "Okay, how would you like to update the list? You can tell me 'add [name] as [position]', 'remove [name]', or 'change [name]'s position to [new position]'."
AI manages the updates in the chat.
if onboarding_team_members is not available or empty:
"To begin, please provide the name and position of the first leader. For example: 'John Doe, CEO'."
Looping for New Entries/Updates:
If user wants to add, AI guides: "Please tell me the name and position for the next person."
AI confirms each addition: "Okay, I've added [Name] as [Position]. Would you like to add another leader, or are we ready to move on to collecting their personal values?"
Guidance for Personal Values:
"Excellent. Now, for each leader, we'll gather their key personal values. These are the fundamental beliefs that guide their own lives and decisions."
"For example, 'integrity,' 'innovation,' 'community,' 'courage,' 'learning.' You don't need a long list, just the most significant ones for each person."
"Let's start with [Name of First Leader]. What are their primary personal core values?"
Input Handling: Free text, ideally comma-separated. AI can parse. "You can list several, separated by commas if you like."
Looping: After receiving values for one leader: "Thank you for [leader's name]'s values. Now let's move to [Name of Next Leader]. What are their personal core values?" This continues until all confirmed leaders have entered their values.
Review: "We've collected personal values for everyone. Take a look at the summary on the right. Is anything missing or needs adjustment?"
B. Corresponding Visual Component(s) (Right Panel):

Component Choice: A dynamic, editable table.
Component Structure:
Table Title: "Leadership Team & Personal Values"
Columns: Name (text input), Position (text input), Personal Core Values (rich text/tag input, allowing multiple comma-separated entries that convert to visual tags).
Pre-population & Chat-to-Visual Update:
Initial state will populate with onboarding_team_members data.
As user confirms/updates in chat, the table updates in real-time.
When personal values are entered in chat, they instantly appear in the table for corresponding Name and Position.
Visual-to-Chat Update (Bidirectional Flow):
Users can directly edit Name, Position, or add/edit Personal Core Values in the table.
If a user edits the table directly (e.g., types 'Leadership' into a 'Values' cell for 'John Doe'), the AI detects this change and acknowledges (with nuanced timing to avoid over-interruption): "I see you've updated John Doe's personal values. Is there anything else for John, or shall we move on?" This keeps the chat in sync.
"Add Row" button below the table for users to manually add new members if preferred over chat.
C. Data Captured in this Phase:

workflow_core_values_data.stakeholders_and_values: Array<{ name: string, position: string, personal_values: string[] }>
name: string
position: string
personal_values: Array (parsed from user input)

### Team Values Component Code Example

```tsx
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, X } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  personalValues: string[];
}

interface TeamValuesTableProps {
  initialMembers: TeamMember[];
  onUpdate: (members: TeamMember[]) => void;
}

export function TeamValuesTable({ initialMembers, onUpdate }: TeamValuesTableProps) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [newValue, setNewValue] = useState<{ memberId: string; value: string }>({ memberId: '', value: '' });
  
  useEffect(() => {
    onUpdate(members);
  }, [members, onUpdate]);
  
  const addMember = () => {
    const newMember: TeamMember = {
      id: `member-${Date.now()}`,
      name: '',
      position: '',
      personalValues: []
    };
    setMembers([...members, newMember]);
  };
  
  const updateMember = (id: string, field: keyof TeamMember, value: any) => {
    setMembers(members.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };
  
  const addValueToMember = (memberId: string, value: string) => {
    if (!value.trim()) return;
    
    setMembers(members.map(member => 
      member.id === memberId 
        ? { ...member, personalValues: [...member.personalValues, value.trim()] } 
        : member
    ));
    setNewValue({ memberId: '', value: '' });
  };
  
  const removeValueFromMember = (memberId: string, valueIndex: number) => {
    setMembers(members.map(member => 
      member.id === memberId 
        ? { 
            ...member, 
            personalValues: member.personalValues.filter((_, i) => i !== valueIndex) 
          } 
        : member
    ));
  };
  
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Personal Values</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <Input 
                  value={member.name} 
                  onChange={(e) => updateMember(member.id, 'name', e.target.value)}
                  placeholder="Enter name"
                />
              </TableCell>
              <TableCell>
                <Input 
                  value={member.position} 
                  onChange={(e) => updateMember(member.id, 'position', e.target.value)}
                  placeholder="Enter position"
                />
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2 mb-2">
                  {member.personalValues.map((value, i) => (
                    <Badge key={i} className="flex items-center gap-1">
                      {value}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeValueFromMember(member.id, i)}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add value..."
                    value={newValue.memberId === member.id ? newValue.value : ''}
                    onChange={(e) => setNewValue({ memberId: member.id, value: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addValueToMember(member.id, newValue.value);
                      }
                    }}
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => addValueToMember(member.id, newValue.value)}
                  >
                    Add
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button 
        variant="outline" 
        className="mt-4"
        onClick={addMember}
      >
        <PlusCircle className="h-4 w-4 mr-2" /> Add Team Member
      </Button>
    </>
  );
}
```

Phase 3: Scoring Aggregated Core Values
This phase takes the individual personal values and prepares them for company-level scoring.

A. AI Chat Guidance & Data Collection (Left Panel):

AI-Assisted Action (Aggregation): "Now that we have everyone's personal values, I've compiled a unique list of all the values mentioned across your leadership team. This helps us see the common themes."
AI will list unique values from workflow_core_values_data.stakeholders_and_values.personal_values:
"For example: Integrity, Respect, Loyalty, Innovation, etc."
Explanation of Scoring: "Our next step is to score these aggregated values. We'll use a scale of 1 to 10, where 10 means 'highly reflective of our company' and 1 means 'not very reflective'."
Prompt for Scoring: "Let's start with 'Integrity' (or the highest frequency value). On a scale of 1-10, how strongly does 'Integrity' resonate as a core value for [onboarding_company_name]?"
Input Handling: Numerical input (1-10). AI can handle "7" or "score 7".
Error Handling: If input is out of range: "Please provide a score between 1 and 10." If non-numeric: "Please enter a number between 1 and 10 for the score."
Looping: AI iterates through each unique value, prompting for a score. "Thank you. How about 'Innovation'? What score would you give it?"
Confirm/Review: "We've now scored all the identified values. Please review the 'Compiled Values Scores' table on the right. Does everything look correct, or would you like to adjust any scores?"
B. Corresponding Visual Component(s) (Right Panel):

Component Choice: A data table with input fields.
Component Structure:
Table Title: "Compiled Values Scores"
Columns: Core Value (pre-filled, non-editable), Score (1-10) (numerical input field).
Pre-population & Chat-to-Visual Update:
The Core Value column is automatically populated with the unique, aggregated values identified by the AI.
As the user enters scores in the chat, these immediately populate the Score column in the table.
Visual-to-Chat Update (Bidirectional Flow):
User can directly edit score in the table.
AI detects direct score change and may acknowledge: "I see you've changed the score for [Value] to [New Score]. Is that correct?"
C. Data Captured in this Phase:

workflow_core_values_data.compiled_scores: Array<{ value: string, score: number }>

## Integration with Existing Patterns

The Core Values component integrates with the established split-panel patterns used in the Break-Even Analysis and Sales Funnel pages:

### 1. Resizable Split Panel Layout

```tsx
<ResizablePanelGroup direction="horizontal" className="flex-1">
  {/* Left Panel - AI Chat Interface */}
  <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
    <div className="h-full p-4">
      <CoreValuesChatInterface 
        companyName={companyName}
        onExampleRequest={handleExampleRequest}
        onValueSubmit={handleValueSubmit}
      />
    </div>
  </ResizablePanel>
  
  <ResizableHandle />
  
  {/* Right Panel - Core Values Interface */}
  <ResizablePanel defaultSize={75}>
    <div className="h-full overflow-auto py-6 px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPhase}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.15 }}
          className="h-full"
        >
          {currentPhase === 'introduction' && <CoreValuesIntroduction onStart={startProcess} />}
          {currentPhase === 'examples' && <CompanyExamples examples={examples} onViewExample={handleViewExample} />}
          {currentPhase === 'stakeholders' && <TeamValuesTable initialMembers={teamMembers} onUpdate={handleTeamUpdate} />}
          {currentPhase === 'scoring' && <ValuesScoring values={aggregatedValues} onScoreChange={handleScoreChange} />}
          {currentPhase === 'statement' && <CoreValuesStatement initialStatement={statement} onUpdate={handleStatementUpdate} />}
        </motion.div>
      </AnimatePresence>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>
```

### 2. Page Context Integration

Similar to the Break-Even Analysis page, the Core Values workflow integrates with the PageContext for consistent navigation:

```tsx
useEffect(() => {
  setBreadcrumbs([
    { label: "Strategy", href: "/app/strategy" },
    { label: "Core Values", href: "/app/strategy/core-values" }
  ]);
  
  setPageTabs([
    { id: 'introduction', label: 'Introduction' },
    { id: 'stakeholders', label: 'Team Values' },
    { id: 'scoring', label: 'Value Scoring' },
    { id: 'statement', label: 'Values Statement' }
  ]);
  
  setActivePageTab('introduction');
  
  return () => {
    setBreadcrumbs([]);
    setPageTabs(null);
    setActivePageTab(null);
  };
}, [setBreadcrumbs, setPageTabs, setActivePageTab]);
```

### 3. Chat-to-Visual Coordination

Following the pattern from Sales Funnel, bi-directional updates keep chat and visuals synchronized:

```tsx
// Update visuals when chat provides new data
function handleChatValueUpdate(newValue: CoreValue) {
  setValues(prevValues => {
    const existingIndex = prevValues.findIndex(v => v.id === newValue.id);
    if (existingIndex >= 0) {
      return [
        ...prevValues.slice(0, existingIndex),
        newValue,
        ...prevValues.slice(existingIndex + 1)
      ];
    } else {
      return [...prevValues, newValue];
    }
  });
}

// Update chat context when visual components change
function handleVisualValueUpdate(updatedValue: CoreValue) {
  setValues(prevValues => {
    const existingIndex = prevValues.findIndex(v => v.id === updatedValue.id);
    if (existingIndex >= 0) {
      return [
        ...prevValues.slice(0, existingIndex),
        updatedValue,
        ...prevValues.slice(existingIndex + 1)
      ];
    } else {
      return [...prevValues, updatedValue];
    }
  });
  
  // Notify chat of the update
  chatContext.updateContext({
    type: 'VALUE_UPDATE',
    data: updatedValue
  });
}
```

Phase 4: Drafting the Company Core Values Statement
This phase utilizes the aggregated and scored values to help the user articulate their company's core values.

A. AI Chat Guidance & Data Collection (Left Panel):

AI-Assisted Action (Drafting offer): "Based on the scores and your company's description, we can now start formulating [onboarding_company_name]'s official core values statement. Would you like me to draft a preliminary statement using the top 3-5 highest-scoring values and incorporating the essence of your company?"
If user accepts AI draft:
"Great! Here's a starting point, incorporating your top values like 'Integrity', 'Excellence', and 'Innovation', and reflecting your company's focus on [mention key theme from company_description if available]:"
AI generates text, attempting to weave top values with the company's self-description.
Example AI draft (enhanced): "At [onboarding_company_name], a company dedicated to [key phrase from company_description], we are committed to [highest_scoring_value_1] as the foundation of all we do. We relentlessly pursue [highest_scoring_value_2] in our work and foster a spirit of [highest_scoring_value_3] to drive our future and deliver on our promise of [another aspect from company_description or mission if known]."
"This draft is now in the rich text editor on the right. You can refine it there. What are your initial thoughts? Do you want to add more detail to any value, or perhaps phrase it differently?"
If AI drafting fails or user declines: "No problem. You can compose your statement directly in the editor on the right. Let me know if you'd like any suggestions as you write."
Input Handling: Free text for feedback and adjustments.
Iterative Refinement: AI can guide and refine based on user input: "How would you like to elaborate on 'Innovation'?" or "What impact do you want this statement to have internally?"
AI offers to help articulate each value: "Would you like to elaborate on what 'Integrity' means for [onboarding_company_name] specifically? Perhaps a short clause or description for each value in the statement?"
Confirmation: "Once you're happy with the statement, let me know. We can make sure it's ready for communication."
B. Corresponding Visual Component(s) (Right Panel):

Component Choice: A Rich Text Editor (RTE) with pre-filled content (if AI drafted).
Component Structure:
Title: "Draft Your Company's Core Values Statement"
Content: The RTE will display the AI-generated draft instantly. It features standard formatting options (bold, italics, lists, etc.).
Suggestions/Pre-fill: If AI offers specific elaborations, these can appear as suggested text in the RTE or as prompts within the AI chat.
Pre-population & Chat-to-Visual Update: The RTE is populated by the AI's generated content.
Visual-to-Chat Update (Bidirectional Flow): Any manual edits in the RTE are instantly reflected. AI monitors significant changes. "I see you've made some great edits to the statement. It looks much more tailored now!"
C. Data Captured in this Phase:

workflow_core_values_data.company_core_values_statement: string (final rich text HTML/Markdown from RTE after user confirmation).

## Value Change History

The Core Values system includes a robust change tracking mechanism that enables users to view the evolution of their company's values over time.

### 1. Change History Data Structure

```typescript
interface ValueChangeHistoryEntry {
  timestamp: Date;
  userId: string;
  userName: string;
  changeType: 'creation' | 'update' | 'deletion';
  valueId?: string;
  valueName?: string;
  field?: 'title' | 'description' | 'priority' | 'examples';
  previousValue?: any;
  newValue?: any;
}

interface CoreValuesHistory {
  entries: ValueChangeHistoryEntry[];
  hasUnseenChanges: boolean;
  lastViewedTimestamp: Date | null;
}
```

### 2. History Tracking Component

The History View allows users to:
- Filter changes by date range, user, or value
- View detailed before/after comparisons
- Restore previous versions of values or the entire statement
- Track which changes are new since their last view

The component UI includes:
- Timeline visualization of changes
- Color-coded change types (green for additions, yellow for updates, red for deletions)
- Detailed diffs for text changes
- User attribution for each change
- Date and time information

### 3. Change Recording Mechanism

Changes are automatically recorded by:
1. Intercepting all data mutations through the workflow context
2. Comparing old and new values to determine change type
3. Creating history entries with relevant metadata
4. Storing the history alongside the core values data

### 4. History Visualization Example

```tsx
import { useState } from 'react';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, Edit, Plus, Trash, Undo } from 'lucide-react';

export function ValueChangeHistory({ history, onRestoreVersion }) {
  const [filter, setFilter] = useState('all');
  
  const getChangeTypeIcon = (type) => {
    switch (type) {
      case 'creation': return <Plus className="h-4 w-4 text-green-500" />;
      case 'update': return <Edit className="h-4 w-4 text-amber-500" />;
      case 'deletion': return <Trash className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };
  
  const getChangeTypeLabel = (type) => {
    switch (type) {
      case 'creation': return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Added</Badge>;
      case 'update': return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Updated</Badge>;
      case 'deletion': return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Removed</Badge>;
      default: return null;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Value Change History</CardTitle>
        <CardDescription>Track the evolution of your company's core values</CardDescription>
        <TabsList>
          <TabsTrigger value="all" onClick={() => setFilter('all')}>All Changes</TabsTrigger>
          <TabsTrigger value="values" onClick={() => setFilter('values')}>By Value</TabsTrigger>
          <TabsTrigger value="users" onClick={() => setFilter('users')}>By User</TabsTrigger>
        </TabsList>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {history.entries
            .filter(entry => filter === 'all' || 
                   (filter === 'values' && entry.valueId) ||
                   (filter === 'users' && entry.userId))
            .map((entry, i) => (
              <div key={i} className="mb-6 relative pl-6 border-l-2 border-slate-200">
                <div className="absolute -left-2 top-0">
                  {getChangeTypeIcon(entry.changeType)}
                </div>
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <div className="font-medium">
                      {entry.valueName || 'Core Values Statement'} {getChangeTypeLabel(entry.changeType)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {entry.field && `Field: ${entry.field}`}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => onRestoreVersion(entry)}>
                    <Undo className="h-4 w-4
