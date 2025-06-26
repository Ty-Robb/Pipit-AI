import type { Workflow } from '@/lib/types';

export const workflowCategories = [
  'Discovery',
  'Marketing Strategy',
];

export const workflows: Workflow[] = [
  // Discovery
  {
    id: 'wf_001',
    name: 'Market Opportunity Analysis',
    category: 'Discovery',
    description: 'Identify and evaluate potential market opportunities.',
    steps: ['Define Market Scope', 'Analyze Market Size & Growth', 'Assess Competitive Landscape', 'Identify Unmet Needs', 'Summarize Findings'],
  },
  {
    id: 'wf_002',
    name: 'Initial Brand Audit',
    category: 'Discovery',
    description: "A quick check-up on your brand's current standing.",
    steps: ['Review Brand Assets', 'Analyze Online Presence', 'Gauge Audience Perception', 'Initial Competitor Comparison'],
  },
  // Marketing Strategy
  {
    id: 'wf_003',
    name: 'Mission & Vision Statement',
    category: 'Marketing Strategy',
    description: 'Craft compelling mission and vision statements.',
    steps: ['Define Core Purpose (Mission)', 'Envision Future State (Vision)', 'Refine and Finalize Statements'],
  },
  {
    id: 'wf_004',
    name: 'Core Value Proposition',
    category: 'Marketing Strategy',
    description: 'Clearly articulate the unique value you offer.',
    steps: ['Identify Customer Pains & Gains', 'Map Your Solutions', 'Define Your Unique Differentiators', 'Craft Value Proposition Statement'],
  },
  {
    id: 'wf_005',
    name: 'SWOT Analysis',
    category: 'Marketing Strategy',
    description: 'Analyze strengths, weaknesses, opportunities, and threats.',
    steps: ['Identify Strengths', 'Identify Weaknesses', 'Identify Opportunities', 'Identify Threats', 'Develop Strategic Actions'],
  },
  {
    id: 'wf_006',
    name: 'Competitor Analysis',
    category: 'Marketing Strategy',
    description: 'Deep dive into your competitive landscape.',
    steps: ['Identify Key Competitors', 'Analyze Competitor Products/Services', 'Evaluate Competitor Marketing & Sales', 'Benchmark Against Competitors'],
  },
  {
    id: 'wf_007',
    name: 'Ideal Customer Profile (ICP)',
    category: 'Marketing Strategy',
    description: 'Define the perfect customer for your business.',
    steps: ['Analyze Best Current Customers', 'Identify Key Firmographics/Demographics', 'Detail Pain Points & Challenges', 'Create ICP Document'],
  },
  {
    id: 'wf_008',
    name: 'User Persona Development',
    category: 'Marketing Strategy',
    description: 'Create detailed personas for your target users.',
    steps: ['Conduct User Research', 'Segment Your Audience', 'Develop Persona Profiles', 'Validate Personas'],
  },
  {
    id: 'wf_009',
    name: 'Brand Positioning Statement',
    category: 'Marketing Strategy',
    description: "Define your brand's unique place in the market.",
    steps: ['Define Target Audience', 'Define Frame of Reference', 'Articulate Point of Difference', 'Craft Positioning Statement'],
  },
  {
    id: 'wf_010',
    name: 'Launch Plan',
    category: 'Marketing Strategy',
    description: 'Create a comprehensive plan for a new product launch.',
    steps: ['Set Launch Goals', 'Define Target Audience & Messaging', 'Select Marketing Channels', 'Create Timeline & Budget', 'Define Success Metrics'],
  },
];
