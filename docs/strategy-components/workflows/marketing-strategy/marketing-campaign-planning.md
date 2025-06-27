# Marketing Campaign Planning Workflow

## 1. Overview & Purpose

This AI-powered conversational workflow transforms a static marketing campaign planning checklist into a dynamic, interactive experience that guides users through comprehensively planning their marketing campaigns. By leveraging a split-panel layout with an AI chat interface on the left and visual components on the right, the tool enables real-time data collection, display, and updates to create a complete campaign plan.

The workflow helps marketing teams define all critical aspects of a campaign, including objectives, target audience, budget, team responsibilities, and a detailed schedule of touchpoints. It ensures all necessary components are considered, resulting in a comprehensive and actionable campaign roadmap that aligns with broader marketing strategy goals and optimizes resource utilization.

## 2. Target User & Context

**User:** Marketing managers, campaign coordinators, and marketing directors responsible for planning and executing marketing campaigns across multiple channels.

**Context:** This workflow serves as a central planning hub within the broader marketing strategy framework. It leverages data from other components like customer personas, brand assessment, and messaging, and produces outputs that can feed into tactical execution tools and performance measurement frameworks.

The primary user need is efficiency and thoroughness in campaign planning. By pre-filling information when possible and providing a structured approach, the tool reduces planning time while ensuring no critical aspects are overlooked. Marketing teams often struggle with campaign consistency and alignment with broader strategic goals - this tool addresses these challenges by providing a standardized planning framework that integrates with other marketing strategy elements.

## 3. Core Conversational Flow

### General Principle

As the AI guides the user through defining campaign elements, the right visual panel will dynamically display this information in structured forms and tables. This follows the **Visual Augmentation** and **Bidirectional Updates** principles from the Chat-Driven Workflow Pattern, where changes in either panel are reflected in the other in real-time.

### Phase 1: Basic Campaign Information

**AI Chat Guidance & Data Collection (Left Panel):**
"Let's begin with the foundational details of your campaign. We'll start with the campaign name, timeframe, a high-level overview, and your primary objective."

The AI leverages existing data: "First, could you confirm the company name for this campaign? I have it as '[onboarding_company_name]' from your onboarding. Is this correct?"

The AI then collects:
- Campaign Name: "What is the name of this marketing campaign? For example, 'New SaaS Product Launch' or 'Spring Cleaning Campaign'."
- Campaign Timeframe: "What is the timeframe for this campaign? (e.g., 'Q1', 'Mar-Apr 2025', or specific dates like 'March 1st - April 30th')."
- Campaign Overview: "Can you provide a high-level overview of this campaign? Describe what you plan to use, how many touchpoints, and the main objectives."
- Marketing Campaign Objective: "Based on our high-level overview, what is the primary marketing objective for this campaign? This should be a specific goal like 'increase sales,' 'generate leads,' 'build brand awareness,' or 'grow digital presence'."

The AI offers assistance: "Would you like me to suggest some common marketing objectives typically related to '[Campaign Overview input]'? For example, if your overview mentions 'new product', I might suggest 'Product Launch Awareness' or 'Initial Sales Generation'."

**Visual Components (Right Panel):**
- A simple form with text input fields and potentially a dropdown
- Fields include:
  - Company Name (pre-filled if available)
  - Campaign Name
  - Campaign Timeframe
  - Overview (large text area)
  - Marketing Campaign Objective (dropdown with common objectives, allowing custom input)

**Data Captured in this Phase:**
```typescript
campaign_company_name: string
campaign_name: string
campaign_timeframe: string
campaign_overview: string
campaign_objective: string
```

### Phase 2: Campaign Goals & Strategy

**AI Chat Guidance & Data Collection (Left Panel):**
"Now let's refine your campaign's financial targets and its desired outcomes."

The AI collects:
- Campaign Budget: "What is the allocated budget for this campaign? This helps ensure we're aligning resources strategically."
- Success Goals: "What are the key success goals (KPIs) for this campaign? How will you measure its success beyond the primary objective? For example, if your objective is 'Generate Leads', your KPIs might include 'Number of qualified leads', 'Cost per lead', or 'Lead-to-opportunity conversion rate'."
- Channels: "Which channels will you primarily use for this campaign? You can select multiple, such as 'PPC', 'Webinar', 'Email', 'Social Media', or 'Community'."
- Campaign Theme: "What is the main idea behind this campaign? Consider seasonality, trending topics, or any unique angles that draw interest. For example, 'Sustainable Solutions', 'Digital Transformation', or 'Customer Success Stories'."
- Key Message: "What is the core key message you want to convey in this campaign? This should be a concise statement that drives each touchpoint. For example, 'Simplify Your Workflow with Our AI-Powered Solution' or 'Reduce Costs While Improving Quality'."

The AI offers assistance: "Would you like me to suggest common success goals related to [campaign_objective]? For instance, if your objective is 'Generate Leads,' common KPIs include 'Number of MQLs (Marketing Qualified Leads),' 'Cost per MQL,' or 'Lead Conversion Rate'."

**Visual Components (Right Panel):**
- A form with text inputs, multi-select dropdowns, and text areas
- Fields include:
  - Campaign Budget (currency input)
  - Success Goal(s) (multi-line text area or tag input)
  - Channels (multi-select dropdown with pre-defined options)
  - Campaign Theme (text input)
  - Key Message (text area)

**Data Captured in this Phase:**
```typescript
campaign_budget: number
campaign_success_goals: Array<string>
campaign_channels: Array<string>
campaign_theme: string
campaign_key_message: string
```

### Phase 3: Target Audience Definition

**AI Chat Guidance & Data Collection (Left Panel):**
"Understanding your target audience is crucial for campaign success. Let's define who you're trying to reach."

The AI collects:
- Personas: "Which personas are you targeting with this campaign? These should align with your existing buyer personas. For example, 'Technical Decision Maker', 'Financial Controller', or 'Operations Manager'."
- Buying Stage: "At which buying stage are you primarily targeting these personas? For example, 'Awareness' (they're just learning about solutions), 'Consideration' (they're evaluating options), or 'Decision' (they're ready to purchase)."
- Target Audience Size: "What is the estimated size of your target audience? This helps set realistic expectations for campaign reach and conversion rates."
- Target Audience Location: "What is the primary geographic location of your target audience? This informs regional messaging considerations and channel selection."

The AI may integrate with existing data: "I notice from your personas work that you've defined a 'Senior IT Director' persona. Would you like to target this persona in this campaign?"

**Visual Components (Right Panel):**
- A form with dropdowns and text inputs
- Fields include:
  - Persona(s) (multi-select dropdown, potentially pre-populated from existing persona work)
  - Buying Stage (dropdown)
  - Target Audience Size (number input)
  - Target Audience Location (text input)

**Data Captured in this Phase:**
```typescript
campaign_personas: Array<string>
campaign_buying_stage: string
target_audience_size: number
target_audience_location: string
```

### Phase 4: Project Team Members

**AI Chat Guidance & Data Collection (Left Panel):**
"Every successful campaign relies on a strong team. Now, let's identify the key individuals responsible for different aspects of this campaign."

The AI leverages existing data: "From your onboarding, I have a list of team members. For key roles like Campaign Manager, Executive Sponsor, and others, I can pre-fill with appropriate individuals from your onboarding_team_members list, or you can specify new ones."

For each role (Campaign Manager, Executive Sponsor, Marketing Operations, Technical Support, Design/Creative, Sales Enablement), the AI may suggest: "From your onboarding, I see [suggested_name] as a potential fit for [role] based on their position as [position]. Is this correct, or would you like to assign someone else?"

The AI explains role importance: "The Executive Sponsor provides high-level oversight and ensures alignment with business goals, while the Campaign Manager handles day-to-day execution. Having these roles clearly defined helps ensure accountability."

**Visual Components (Right Panel):**
- A table with two columns: Role | Team Member Name (Position)
- Pre-populated with suggestions from onboarding_team_members where possible
- Text input fields for each role
- Optional tooltip or info icon explaining each role's responsibilities

**Data Captured in this Phase:**
```typescript
project_team_members: {
  campaign_manager: {name: string, position?: string}
  executive_sponsor: {name: string, position?: string}
  marketing_operations: {name: string, position?: string}
  technical_support: {name: string, position?: string}
  design_creative: {name: string, position?: string}
  sales_enablement: {name: string, position?: string}
}
```

### Phase 5: Campaign Schedule

**AI Chat Guidance & Data Collection (Left Panel):**
"Finally, let's map out your campaign's schedule and touchpoints. We'll outline key dates, channels, messages, and landing pages for each interaction."

The AI asks: "How many distinct touchpoints or key interactions do you plan for this campaign? A typical multi-channel campaign might have 5-10 touchpoints over its duration."

The AI provides guidance: "When planning touchpoints, consider the buyer's journey. Early touchpoints should focus on awareness and education, while later ones can be more direct with calls to action."

For each touchpoint, the AI collects:
- "For Touchpoint [X]: What is the Date and the primary Channel? For example, 'March 5 - Email' or 'April 10 - LinkedIn'."
- "What is the main Message/Offer for this touchpoint? This should align with your key campaign message but be specific to this interaction. For example, 'Introductory Webinar Invitation' or 'Case Study Download'."
- "What is the Landing Page associated with this touchpoint? This could be a dedicated campaign page, webinar registration page, or content download page."
- "Is there a Link to MAP (Marketing Automation Platform) for this touchpoint? This helps with tracking and automation setup."

After several touchpoints, the AI might suggest: "I notice your touchpoints are focused on [observed channels]. Have you considered including [alternative channel] as part of this campaign? This could help reach audiences who prefer different engagement methods."

**Visual Components (Right Panel):**
- A dynamic, editable table with columns:
  - Touchpoint
  - Date
  - Channel
  - Message/Offer
  - Landing Page
  - Link to MAP
- Add Row Button: "+ Add Touchpoint" at the bottom of the table
- Edit/Delete Icons for each row
- Optional visual timeline view showing touchpoints in chronological order

**Data Captured in this Phase:**
```typescript
campaign_schedule: Array<{
  touchpoint_number: number
  date: string
  channel: string
  message_offer: string
  landing_page: string
  link_to_map?: string
}>
```

### AI-Assisted Actions

During the workflow, the AI may offer assistance:

**Suggesting Objectives/Goals:**
"Based on your campaign overview which mentions 'product launch' and 'educational content', here are some common objectives that might be relevant: 'Product Awareness', 'Market Education', 'Early Adoption', and 'Thought Leadership Positioning'."

**Checking Channel-Audience Alignment:**
"I notice you're targeting the 'Technical Decision Maker' persona but haven't included any technical webinars or developer community channels. Would you like to add these to better reach this audience?"

**Identifying Gaps in Touchpoint Schedule:**
"I notice there's a three-week gap between your email touchpoint on March 15 and your next interaction on April 5. Would you like to add an intermediate touchpoint to maintain engagement during this period?"

**Drafting Initial Content:**
"Based on the information we've gathered, particularly your campaign overview, theme, and key message, would you like me to help you draft a preliminary campaign brief or a more detailed messaging statement for [campaign_name]?"

If the user accepts, the AI generates a brief and displays it in the chat and potentially in a rich text editor in the right panel.

### Concluding the Workflow

**AI Chat Guidance & Data Collection (Left Panel):**
"We've now covered all the essential elements for your [campaign_name] marketing campaign! Take a moment to review all the details in the right panel."

"You've successfully completed the Marketing Campaign Planning Checklist. This plan provides a solid foundation for your [campaign_name] campaign. You can now use this detailed information to:
- Share with your team members ([list names of key team members]).
- Build out your creative assets based on the campaign theme and key message.
- Set up tracking and analytics for your defined success metrics.
- Create your marketing automation workflows aligned with your touchpoint schedule.
- Move forward with execution."

"Would you like to export this plan in a specific format, or consider it finalized for now? We can also save it to your project dashboard for easy access."

**Visual Components (Right Panel):**
- A comprehensive summary of all the data gathered throughout the interaction
- Clearly delineated sections for:
  - Campaign Details (Overview, Objective, Budget, Success Goals)
  - Strategy (Channels, Theme, Key Message)
  - Audience (Personas, Buying Stage, Size, Location)
  - Team (Table of Roles and Members)
  - Schedule (Table of Touchpoints)
- Action buttons: "Export PDF", "Save & Close", "Edit Plan"
- Optional visual scorecard showing campaign "readiness" based on completeness of different sections

## 4. Visual Components

### shadcn/ui Component Mapping

| UI Element | shadcn/ui Component | Usage |
|------------|---------------------|-------|
| Main Container | `<ResizablePanelGroup>` | Split-panel layout for chat and visual components |
| Campaign Details Form | `<Form>` with `<FormField>` | Basic campaign information collection |
| Company Name Input | `<Input>` | Single-line text input with placeholder="Your company name" |
| Campaign Timeframe | `<DateRangePicker>` | Date range selection with customizable presets for quarters |
| Campaign Overview | `<Textarea>` | Multi-line text input with character counter |
| Objective Selection | `<Select>` with `<Command>` | Searchable dropdown with common marketing objectives |
| Budget Input | `<Input type="number">` | Numeric input with currency formatting and tooltip for budget guidance |
| Success Goals | `<TagInput>` | Multiple goal entries with suggestions and auto-complete |
| Channels Selection | `<MultiSelect>` | Multiple channel selection with categorized options |
| Theme Input | `<Input>` | Text input with character limit and suggestion dropdown |
| Key Message Editor | `<Textarea>` | Rich text area with character counter and formatting options |
| Persona Selection | `<MultiSelect>` with `<Avatar>` | Multi-select with persona avatars and descriptions |
| Buying Stage | `<Tabs>` or `<ToggleGroup>` | Visual selection of funnel stage |
| Team Member Table | `<Table>` with `<ComboBox>` | Role assignment table with searchable team member dropdown |
| Campaign Schedule | `<Table>` with inline editing | Dynamic touchpoint management with drag-to-reorder |
| Schedule Timeline | `<ScrollArea>` with custom components | Visual timeline representation of touchpoints |
| Schedule Date Selection | `<DatePicker>` with `<Popover>` | Date selection with calendar overlay |
| Action Buttons | `<Button>` with variants | Primary and secondary actions with appropriate styling |
| Export Options | `<DropdownMenu>` | Export format options with icons |
| Campaign Brief | `<Card>` with `<CardContent>` | AI-generated campaign brief display with copy option |
| Summary View | `<Tabs>` with `<Accordion>` | Organized expandable sections of campaign data |
| Notification | `<Toast>` | Success/error messages for actions like saving |
| Confirmation Dialog | `<AlertDialog>` | Confirmation for actions like deleting touchpoints |

### Example Campaign Planning Component (Conceptual)

```tsx
import { useState, useEffect } from "react";
import { 
  ResizablePanelGroup, ResizablePanel,
  Form, FormField, FormItem, FormLabel, FormControl, FormDescription,
  Input, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
  DateRangePicker, MultiSelect, Button,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  Card, CardHeader, CardTitle, CardContent,
  Tabs, TabsContent, TabsList, TabsTrigger,
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
  Avatar, AvatarFallback, AvatarImage,
  Popover, PopoverContent, PopoverTrigger,
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem,
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  Toast, ToastAction, ToastDescription, ToastProvider, ToastTitle, ToastViewport
} from "@/components/ui";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, Calendar as CalendarIcon, X, Plus, Save, FileDown, Trash2, Edit, Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface TeamMember {
  id: string;
  name: string;
  position?: string;
  email?: string;
  avatar?: string;
}

interface TouchPoint {
  id: string;
  touchpoint_number: number;
  date: string;
  channel: string;
  message_offer: string;
  landing_page: string;
  link_to_map?: string;
}

interface CampaignPlanData {
  campaign_company_name: string;
  campaign_name: string;
  campaign_timeframe: string;
  campaign_overview: string;
  campaign_objective: string;
  campaign_budget: number;
  campaign_success_goals: string[];
  campaign_channels: string[];
  campaign_theme: string;
  campaign_key_message: string;
  campaign_personas: string[];
  campaign_buying_stage: string;
  target_audience_size: number;
  target_audience_location: string;
  project_team_members: {
    campaign_manager: TeamMember;
    executive_sponsor: TeamMember;
    marketing_operations: TeamMember;
    technical_support: TeamMember;
    design_creative: TeamMember;
    sales_enablement: TeamMember;
  };
  campaign_schedule: TouchPoint[];
  ai_generated_brief?: string;
  status: 'in_progress' | 'completed';
  last_updated_at: string;
}

const CHANNEL_OPTIONS = [
  { category: "Digital", options: [
    { value: "email", label: "Email" },
    { value: "social", label: "Social Media" },
    { value: "ppc", label: "PPC/Paid Ads" },
    { value: "seo", label: "SEO/Organic Search" },
    { value: "content", label: "Content Marketing" }
  ]},
  { category: "Events", options: [
    { value: "webinar", label: "Webinar" },
    { value: "in_person", label: "In-Person Event" },
    { value: "conference", label: "Conference" },
    { value: "roadshow", label: "Roadshow" }
  ]},
  { category: "Other", options: [
    { value: "pr", label: "PR" },
    { value: "direct", label: "Direct Mail" },
    { value: "partner", label: "Partner Marketing" },
    { value: "influencer", label: "Influencer Marketing" }
  ]}
];

const PERSONA_OPTIONS = [
  { value: "decision_maker", label: "Decision Maker", description: "Final purchase authority" },
  { value: "end_user", label: "End User", description: "Day-to-day product user" },
  { value: "technical", label: "Technical Evaluator", description: "Technical assessment role" },
  { value: "influencer", label: "Influencer", description: "Recommends solutions" },
  { value: "finance", label: "Finance", description: "Budget approval" }
];

const BUYING_STAGE_OPTIONS = [
  { value: "awareness", label: "Awareness", description: "Learning about solutions" },
  { value: "consideration", label: "Consideration", description: "Evaluating options" },
  { value: "decision", label: "Decision", description: "Ready to purchase" },
  { value: "retention", label: "Retention", description: "Existing customers" }
];

const OBJECTIVE_OPTIONS = [
  { value: "lead_generation", label: "Lead Generation" },
  { value: "brand_awareness", label: "Brand Awareness" },
  { value: "product_launch", label: "Product Launch" },
  { value: "customer_retention", label: "Customer Retention" },
  { value: "sales_conversion", label: "Sales Conversion" },
  { value: "thought_leadership", label: "Thought Leadership" },
  { value: "custom", label: "Custom Objective" }
];

interface CampaignPlanningProps {
  initialData?: Partial<CampaignPlanData>;
  onboardingCompanyName?: string;
  onboardingTeamMembers?: TeamMember[];
  availablePersonas?: Array<{id: string, name: string, description: string}>;
  onUpdate: (data: CampaignPlanData) => void;
  onRequestAIAssistance: (task: string, context: any) => Promise<string>;
}

export function CampaignPlanning({
  initialData = {},
  onboardingCompanyName,
  onboardingTeamMembers = [],
  availablePersonas = [],
  onUpdate,
  onRequestAIAssistance
}: CampaignPlanningProps) {
  const [activeTab, setActiveTab] = useState("basics");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [toast, setToast] = useState<{open: boolean, title: string, description: string}>({
    open: false,
    title: "",
    description: ""
  });
  
  // Initialize campaign data
  const [campaignData, setCampaignData] = useState<CampaignPlanData>({
    campaign_company_name: initialData.campaign_company_name || onboardingCompanyName || "",
    campaign_name: initialData.campaign_name || "",
    campaign_timeframe: initialData.campaign_timeframe || "",
    campaign_overview: initialData.campaign_overview || "",
    campaign_objective: initialData.campaign_objective || "",
    campaign_budget: initialData.campaign_budget || 0,
    campaign_success_goals: initialData.campaign_success_goals || [],
    campaign_channels: initialData.campaign_channels || [],
    campaign_theme: initialData.campaign_theme || "",
    campaign_key_message: initialData.campaign_key_message || "",
    campaign_personas: initialData.campaign_personas || [],
    campaign_buying_stage: initialData.campaign_buying_stage || "",
    target_audience_size: initialData.target_audience_size || 0,
    target_audience_location: initialData.target_audience_location || "",
    project_team_members: initialData.project_team_members || {
      campaign_manager: { id: "", name: "" },
      executive_sponsor: { id: "", name: "" },
      marketing_operations: { id: "", name: "" },
      technical_support: { id: "", name: "" },
      design_creative: { id: "", name: "" },
      sales_enablement: { id: "", name: "" }
    },
    campaign_schedule: initialData.campaign_schedule || [],
    ai_generated_brief: initialData.ai_generated_brief || "",
    status: initialData.status || 'in_progress',
    last_updated_at: initialData.last_updated_at || new Date().toISOString()
  });
  
  // Dialog state for confirmations
  const [dialogState, setDialogState] = useState({
    open: false,
    title: "",
    description: "",
    action: () => {},
    actionLabel: "Confirm"
  });
  
  // Pre-fill team members from onboarding data if available
  useEffect(() => {
    if (onboardingTeamMembers.length > 0 && !initialData.project_team_members) {
      // More sophisticated role matching based on position keywords
      const suggestedTeam = {
        campaign_manager: onboardingTeamMembers.find(m => 
          m.position?.toLowerCase().includes("market") && 
          (m.position?.toLowerCase().includes("manager") || m.position?.toLowerCase().includes("director"))
        ) || { id: "", name: "" },
        executive_sponsor: onboardingTeamMembers.find(m => 
          m.position?.toLowerCase().includes("ceo") || 
          m.position?.toLowerCase().includes("cmo") ||
          m.position?.toLowerCase().includes("vp")
        ) || { id: "", name: "" },
        marketing_operations: onboardingTeamMembers.find(m => 
          m.position?.toLowerCase().includes("operations") || 
          m.position?.toLowerCase().includes("coordinator")
        ) || { id: "", name: "" },
        technical_support: onboardingTeamMembers.find(m => 
          m.position?.toLowerCase().includes("tech") || 
          m.position?.toLowerCase().includes("it") ||
          m.position?.toLowerCase().includes("engineer")
        ) || { id: "", name: "" },
        design_creative: onboardingTeamMembers.find(m => 
          m.position?.toLowerCase().includes("design") || 
          m.position?.toLowerCase().includes("creative") ||
          m.position?.toLowerCase().includes("art")
        ) || { id: "", name: "" },
        sales_enablement: onboardingTeamMembers.find(m => 
          m.position?.toLowerCase().includes("sales") || 
          m.position?.toLowerCase().includes("revenue")
        ) || { id: "", name: "" }
      };
      
      setCampaignData(prevData => ({
        ...prevData,
        project_team_members: suggestedTeam
      }));
    }
  }, [onboardingTeamMembers, initialData.project_team_members]);
  
  // Update timeframe when date range changes
  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      const formattedRange = `${format(dateRange.from, 'MMM d, yyyy')} - ${format(dateRange.to, 'MMM d, yyyy')}`;
      setCampaignData(prevData => ({
        ...prevData,
        campaign_timeframe: formattedRange
      }));
    }
  }, [dateRange]);
  
  // Update parent component with changes
  useEffect(() => {
    const updatedData = {
      ...campaignData,
      last_updated_at: new Date().toISOString()
    };
    onUpdate(updatedData);
  }, [campaignData, onUpdate]);
  
  // Handle campaign basics updates
  const updateBasics = (field: keyof CampaignPlanData, value: any) => {
    setCampaignData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
  
  // Handle team member updates
  const updateTeamMember = (role: string, teamMember: TeamMember) => {
    setCampaignData(prevData => ({
      ...prevData,
      project_team_members: {
        ...prevData.project_team_members,
        [role]: teamMember
      }
    }));
  };
  
  // Handle touchpoint operations
  const addTouchpoint = () => {
    const newTouchpoint: TouchPoint = {
      id: `touchpoint-${Date.now()}`,
      touchpoint_number: campaignData.campaign_schedule.length + 1,
      date: "",
      channel: "",
      message_offer: "",
      landing_page: "",
    };
    
    setCampaignData(prevData => ({
      ...prevData,
      campaign_schedule: [...prevData.campaign_schedule, newTouchpoint]
    }));
    
    setToast({
      open: true,
      title: "Touchpoint added",
      description: "New touchpoint has been added to your campaign schedule."
    });
  };
  
  const updateTouchpoint = (id: string, field: keyof TouchPoint, value: any) => {
    setCampaignData(prevData => {
      const updatedSchedule = prevData.campaign_schedule.map(touchpoint => 
        touchpoint.id === id ? { ...touchpoint, [field]: value } : touchpoint
      );
      return {
        ...prevData,
        campaign_schedule: updatedSchedule
      };
    });
  };
  
  const deleteTouchpoint = (id: string) => {
    setDialogState({
      open: true,
      title: "Delete Touchpoint",
      description: "Are you sure you want to delete this touchpoint? This action cannot be undone.",
      action: () => {
        setCampaignData(prevData => {
          const filteredSchedule = prevData.campaign_schedule.filter(touchpoint => touchpoint.id !== id);
          // Renumber remaining touchpoints
          const renumberedSchedule = filteredSchedule.map((tp, i) => ({
            ...tp,
            touchpoint_number: i + 1
          }));
          return {
            ...prevData,
            campaign_schedule: renumberedSchedule
          };
        });
        
        setToast({
          open: true,
          title: "Touchpoint deleted",
          description: "The touchpoint has been removed from your campaign schedule."
        });
      },
      actionLabel: "Delete"
    });
  };
  
  // Generate AI campaign brief
  const generateCampaignBrief = async () => {
    try {
      const brief = await onRequestAIAssistance("generate_campaign_brief", {
        campaign_name: campaignData.campaign_name,
        campaign_overview: campaignData.campaign_overview,
        campaign_objective: campaignData.campaign_objective,
        campaign_theme: campaignData.campaign_theme,
        campaign_key_message: campaignData.campaign_key_message,
        campaign_channels: campaignData.campaign_channels,
        campaign_personas: campaignData.campaign_personas,
        campaign_buying_stage: campaignData.campaign_buying_stage
      });
      
      setCampaignData(prevData => ({
        ...prevData,
        ai_generated_brief: brief
      }));
      
      setToast({
        open: true,
        title: "Brief generated",
        description: "AI has generated a campaign brief based on your inputs."
      });
    } catch (error) {
      setToast({
        open: true,
        title: "Error",
        description: "Failed to generate campaign brief. Please try again."
      });
    }
  };
  
  // Export campaign plan
  const exportCampaignPlan = (format: 'pdf' | 'csv' | 'json') => {
    // Implementation would depend on export functionality
    setToast({
      open: true,
      title: "Export initiated",
      description: `Your campaign plan is being exported in ${format.toUpperCase()} format.`
    });
  };
  
  // Mark campaign as complete
  const completeCampaign = () => {
    setCampaignData(prevData => ({
      ...prevData,
