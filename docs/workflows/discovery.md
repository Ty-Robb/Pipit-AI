# Strategic Discovery Process

A conversational workflow that helps organizations explore their strategic landscape through guided questions and AI assistance.

## Overview

-   **Duration**: 30-45 minutes
-   **AI Guide**: Ethan, your strategic consultant
-   **Output**: Strategic Discovery Report with actionable insights

## Workflow Structure

### 1. Introduction & Context

The workflow begins with Ethan introducing himself and explaining the discovery process:

-   Confirms organization name
-   Explains the conversational approach
-   Sets expectations for the discovery process
-   Highlights benefits and outcomes

**Data Captured**: `company_name` (Organization name for the review)

### 2. Business Context Collection

Ethan gathers essential context about your organization through natural conversation.

**Topics Covered**:

-   Strategic experience level
-   Industry and business model
-   Company size and team size
-   Growth stage
-   Key business challenges

**Data Structure**:

```json
{
  "business_context": {
    "industry": "string",
    "company_size": "1-10" | "11-50" | "51-200" | "200+",
    "business_model": "B2B" | "B2C" | "B2B2C" | "Marketplace" | "Other",
    "growth_stage": "Startup" | "Growth" | "Scale" | "Mature",
    "team_size": "number",
    "key_challenges": "string",
    "strategic_experience_level": "beginner" | "intermediate" | "advanced" | "expert"
  }
}
```

### 3. Strategic Assessment Questions

The assessment is organized into three core components:

**Component 1: Building the Strategy**

-   **Q1. Unique Value Proposition & Capabilities**: Explores what makes the organization unique and identifies specific capabilities needed.
-   **Q2. Strategy vs. Execution Approach**: Determines if strategy considers execution capabilities and aligns with them.
-   **Q3. Disruption & Core Strengths**: Assesses proactive vs. reactive market approach and identifies core strengths.

**Component 2: Translating Strategy into Operations**

-   **Q4. Following Through & Communication**: Evaluates strategy execution processes and communication effectiveness.
-   **Q5. Visible Programs & Capabilities**: Reviews formal capability-building programs and identifies gaps.
-   **Q6. Building Connections & Resource Allocation**: Assesses strategy-budget alignment and connection to personal goals.
-   **Q8. Cross-Functional Collaboration**: Evaluates collaboration across teams.
-   **Q9. Tracking Performance & Capabilities**: Reviews performance measurement systems.
-   **Q10. Management Team Engagement**: Evaluates leadership involvement in execution.

**Component 3: Executing for Impact**

-   **Q7. Employee Motivation for Strategy**: Assesses daily connection to strategic goals.

### 4. Strategic Action Planning

Based on assessment results, Ethan helps prioritize and plan.

**Action Item Structure**:

```json
{
  "action_items": [
    {
      "related_priority_area": "string",
      "description": "string",
      "responsible_party": "string",
      "target_date": "string"
    }
  ]
}
```

### 5. Strategic Discovery Report

The workflow concludes with a comprehensive report including an Executive Summary, Strengths Analysis, Gap Analysis, Recommended Workflows, and a 90-day action plan.

## Key Features

-   **Adaptive Questioning**: Questions adapt based on team size and user responses.
-   **Visual Components**: Real-time form updates, progress tracking, and an interactive report preview.
-   **AI Capabilities**: Natural language processing, intelligent follow-ups, and contextual recommendations.
-   **Data Output**: The complete workflow data includes business context, assessment responses, strategic gaps and strengths, action items, and recommended next workflows.
-   **Integration Points**: Connects to the user profile and feeds into other marketing strategy workflows.
