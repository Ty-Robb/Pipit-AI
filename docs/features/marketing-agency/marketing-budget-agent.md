# Marketing Budget Agent

The Marketing Budget Agent is a specialized AI agent that helps users define, allocate, and manage their marketing financial resources. This document provides an overview of the agent's implementation, capabilities, and integration with the Priority AI platform.

## Overview

The Marketing Budget Agent guides users through a structured process to establish a comprehensive budget framework that aligns with their strategic goals. It helps marketing teams establish their total annual marketing budget, break it down into appropriate categories, and ensure financial resources are allocated optimally.

## Implementation Details

The agent is implemented as part of the workflow agents in the Priority AI platform:

- **Location**: `adk-agents/workflow_agents/sub_agents/marketing_budget_agent/`
- **Key Files**:
  - `__init__.py`: Exports the agent function
  - `agent.py`: Contains the agent implementation
  - `prompt.py`: Contains the conversation guidance
  - `test_marketing_budget_agent.py`: Contains unit tests

## Four-Phase Approach

The agent uses a structured four-phase approach to guide users through the marketing budget development process:

1. **Phase 1: Introduction & Total Annual Marketing Budget Definition**
   - Introduce the purpose of the marketing budget setup process
   - Request the total annual marketing budget
   - Provide industry context on typical marketing budget ranges
   - Clarify currency and validate input

2. **Phase 2: Budget Category Allocation**
   - Present common marketing budget categories based on industry standards
   - Guide the user through allocating funds to each category
   - Provide real-time feedback on remaining budget
   - Allow for adding, removing, or updating categories

3. **Phase 3: Budget Balancing & Adjustment**
   - Check if the allocated amount matches the total budget
   - Offer assistance in balancing the budget if there's a discrepancy
   - Suggest redistribution methods
   - Allow for manual adjustments

4. **Phase 4: Review & Confirmation**
   - Present a summary of the budget allocation
   - Ask for confirmation
   - Explain next steps and integration with other parts of the platform
   - Suggest exporting options

## Web Search Integration

The agent leverages web search capabilities to enhance the budget development process with real-time, data-driven insights:

- Researches industry-specific budget allocation benchmarks based on company size and sector
- Finds recent statistics on marketing budget trends
- Researches best practices for budget allocation across different marketing channels
- Finds examples of successful marketing budget structures for similar businesses
- Researches ROI metrics for different marketing categories to inform allocation decisions

## Output Deliverables

The agent helps users create:

1. **Total Annual Marketing Budget**: Defined amount and currency
2. **Budget Category Allocation**: List of categories with allocated amounts and percentages
3. **Visual Representation**: Description of budget allocation visualization
4. **Allocation Rationale**: Summary of key allocation decisions and rationale
5. **Optimization Recommendations**: Suggestions for tracking and optimizing the budget over time

## Integration with Ethan Coordinator

The Marketing Budget Agent is integrated into the Ethan Coordinator workflow in the "Tactics" section, following the Strategy Plan agent.

```python
# In ethan_coordinator.py
from .sub_agents.marketing_budget_agent.agent import marketing_budget_agent

# ...

ethan_coordinator = LlmAgent(
    # ...
    tools=[
        # ...
        # Section 4: Tactics
        AgentTool(agent=tactics_agent),
        AgentTool(agent=marketing_budget_agent),
        
        # ...
    ],
)
```

## Usage Example

```python
from adk_agents.workflow_agents.sub_agents.marketing_budget_agent import marketing_budget_agent

# Call the agent with user message and optional context
response = marketing_budget_agent(
    user_message="I need help creating a marketing budget for my software company.",
    conversation_history=[],  # Optional: Previous conversation history
    context="We are a B2B SaaS company in the project management space.",  # Optional: Business context
    market_insights="Our market research shows growing demand for AI-powered project management.",  # Optional: Market insights
    competitor_analysis="Our main competitors focus on enterprise clients, leaving mid-market underserved.",  # Optional: Competitor analysis
    brand_assessment="Our brand is perceived as innovative but not yet well-known.",  # Optional: Brand assessment
    positioning_statement="For mid-market companies who need efficient project management, our solution is the most user-friendly AI-powered platform.",  # Optional: Positioning statement
    messaging="Our key messages focus on ease of use, AI-powered automation, and affordability."  # Optional: Messaging
)

# Process the agent's response
print(response.content)
```

## Relationship to UI Workflow

This agent powers the Marketing Budget workflow described in `docs/strategy-components/workflows/marketing-strategy/marketing-budget.md`. While the UI workflow document focuses on the user interface and interaction patterns, this agent provides the AI-powered conversation and analysis capabilities that drive the budget development process.

## Benefits of a Well-Defined Marketing Budget

A comprehensive marketing budget:

1. Provides a clear financial roadmap for marketing activities
2. Ensures resources are allocated in alignment with strategic priorities
3. Enables accurate tracking of expenditures and ROI
4. Facilitates budget optimization over time
5. Helps prevent overspending or underspending in key areas
6. Provides accountability and transparency in marketing resource allocation

## Future Enhancements

Potential future enhancements for the Marketing Budget Agent include:

1. Integration with financial planning tools and systems
2. Historical budget data analysis for trend identification
3. Automated ROI calculation based on budget allocation
4. Seasonal budget adjustment recommendations
5. Competitive budget analysis
6. Integration with marketing performance metrics
