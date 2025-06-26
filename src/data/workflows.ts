import type { Workflow } from '@/lib/types';

export const workflowCategories = [
  'Discovery',
  'Foundation',
  'Analysis',
  'Customer Understanding',
  'Positioning',
  'Go-to-Market',
  'Operations',
  'Measurement',
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
  // Foundation
  {
    id: 'wf_003',
    name: 'Mission & Vision Statement',
    category: 'Foundation',
    description: 'Craft compelling mission and vision statements.',
    steps: ['Define Core Purpose (Mission)', 'Envision Future State (Vision)', 'Refine and Finalize Statements'],
  },
  {
    id: 'wf_004',
    name: 'Core Value Proposition',
    category: 'Foundation',
    description: 'Clearly articulate the unique value you offer.',
    steps: ['Identify Customer Pains & Gains', 'Map Your Solutions', 'Define Your Unique Differentiators', 'Craft Value Proposition Statement'],
  },
  {
    id: 'wf_005',
    name: 'Business Goals & Objectives',
    category: 'Foundation',
    description: 'Define clear, measurable business goals that marketing will support.',
    steps: ['Review Overall Business Strategy', 'Set SMART Marketing Goals', 'Align Marketing Objectives with Sales', 'Establish Key Results'],
  },
  {
    id: 'wf_006',
    name: 'Brand Identity & Guidelines',
    category: 'Foundation',
    description: 'Develop a consistent and recognizable brand look, feel, and voice.',
    steps: ['Define Brand Archetype', 'Develop Visual Identity (Logo, Colors, Fonts)', 'Establish Tone of Voice', 'Create Brand Style Guide'],
  },
  // Analysis
  {
    id: 'wf_007',
    name: 'SWOT Analysis',
    category: 'Analysis',
    description: 'Analyze strengths, weaknesses, opportunities, and threats.',
    steps: ['Identify Strengths', 'Identify Weaknesses', 'Identify Opportunities', 'Identify Threats', 'Develop Strategic Actions'],
  },
  {
    id: 'wf_008',
    name: 'Competitor Analysis',
    category: 'Analysis',
    description: 'Deep dive into your competitive landscape.',
    steps: ['Identify Key Competitors', 'Analyze Competitor Products/Services', 'Evaluate Competitor Marketing & Sales', 'Benchmark Against Competitors'],
  },
  {
    id: 'wf_009',
    name: 'PESTLE Analysis',
    category: 'Analysis',
    description: 'Analyze Political, Economic, Social, Technological, Legal, and Environmental factors.',
    steps: ['Analyze Political Factors', 'Analyze Economic Factors', 'Analyze Social Factors', 'Analyze Technological Factors', 'Analyze Legal & Environmental Factors', 'Summarize Impact on Business'],
  },
  // Customer Understanding
  {
    id: 'wf_010',
    name: 'Ideal Customer Profile (ICP)',
    category: 'Customer Understanding',
    description: 'Define the perfect customer for your business.',
    steps: ['Analyze Best Current Customers', 'Identify Key Firmographics/Demographics', 'Detail Pain Points & Challenges', 'Create ICP Document'],
  },
  {
    id: 'wf_011',
    name: 'User Persona Development',
    category: 'Customer Understanding',
    description: 'Create detailed personas for your target users.',
    steps: ['Conduct User Research', 'Segment Your Audience', 'Develop Persona Profiles', 'Validate Personas'],
  },
  {
    id: 'wf_012',
    name: 'Customer Journey Mapping',
    category: 'Customer Understanding',
    description: 'Visualize the customer experience across all touchpoints.',
    steps: ['Define Stages of the Journey', 'Identify Customer Touchpoints', 'Map Customer Thoughts & Feelings', 'Identify Pain Points & Opportunities'],
  },
  // Positioning
  {
    id: 'wf_013',
    name: 'Brand Positioning Statement',
    category: 'Positioning',
    description: "Define your brand's unique place in the market.",
    steps: ['Define Target Audience', 'Define Frame of Reference', 'Articulate Point of Difference', 'Craft Positioning Statement'],
  },
  {
    id: 'wf_014',
    name: 'Brand Messaging Framework',
    category: 'Positioning',
    description: 'Create consistent, compelling messages for different audiences.',
    steps: ['Define Core Message', 'Develop Key Messaging Pillars', 'Tailor Messages for Audience Segments', 'Create an Elevator Pitch'],
  },
  // Go-to-Market
  {
    id: 'wf_015',
    name: 'Launch Plan',
    category: 'Go-to-Market',
    description: 'Create a comprehensive plan for a new product launch.',
    steps: ['Set Launch Goals', 'Define Target Audience & Messaging', 'Select Marketing Channels', 'Create Timeline & Budget', 'Define Success Metrics'],
  },
  {
    id: 'wf_016',
    name: 'Content Marketing Strategy',
    category: 'Go-to-Market',
    description: 'Plan, create, and distribute valuable content to attract your audience.',
    steps: ['Define Content Goals', 'Identify Content Pillars & Themes', 'Create Content Calendar', 'Plan Content Distribution'],
  },
  {
    id: 'wf_017',
    name: 'Social Media Strategy',
    category: 'Go-to-Market',
    description: 'Define goals, tactics, and content for your social media channels.',
    steps: ['Select Relevant Platforms', 'Define Content Strategy for Each Platform', 'Set Engagement Goals', 'Plan Community Management'],
  },
  {
    id: 'wf_018',
    name: 'SEO Strategy',
    category: 'Go-to-Market',
    description: 'Improve organic visibility on search engines.',
    steps: ['Conduct Keyword Research', 'Perform On-Page SEO Audit', 'Plan Technical SEO Fixes', 'Develop a Content & Link Building Plan'],
  },
  // Operations
  {
    id: 'wf_019',
    name: 'Marketing Budget Allocation',
    category: 'Operations',
    description: 'Plan and allocate your marketing spend effectively for maximum ROI.',
    steps: ['Set Overall Marketing Budget', 'Allocate by Channel/Initiative', 'Create a Forecast Model', 'Plan for Contingencies'],
  },
  {
    id: 'wf_020',
    name: 'Marketing Technology (MarTech) Stack Audit',
    category: 'Operations',
    description: 'Evaluate your current marketing tools and identify gaps or redundancies.',
    steps: ['List All Current Tools', 'Map Tools to Marketing Funnel', 'Assess Tool Utilization & ROI', 'Identify Gaps and Recommend Changes'],
  },
  // Measurement
  {
    id: 'wf_021',
    name: 'Key Performance Indicator (KPI) Framework',
    category: 'Measurement',
    description: 'Define the key metrics to track marketing success and business impact.',
    steps: ['Align KPIs with Business Goals', 'Define Primary & Secondary KPIs', 'Set Baselines and Targets', 'Establish Reporting Cadence'],
  },
  {
    id: 'wf_022',
    name: 'Marketing Analytics & Reporting Setup',
    category: 'Measurement',
    description: 'Set up the systems to track, analyze, and report on marketing performance.',
    steps: ['Identify Data Sources', 'Choose Analytics & BI Tools', 'Design Dashboards', 'Define Reporting Process'],
  },
];
