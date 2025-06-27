# Campaign Planning Agent

The Campaign Planning Agent is a specialized AI agent that helps users develop comprehensive marketing campaigns aligned with their business goals and marketing strategy. This document provides an overview of the agent's implementation, capabilities, and integration with the Priority AI platform.

## Overview

The Campaign Planning Agent guides users through a structured process to plan, execute, and measure marketing campaigns that deliver measurable results. It helps marketing teams define campaign objectives, identify target audiences, develop campaign themes and messaging, create a campaign calendar, plan campaign execution across channels, and set up campaign measurement and optimization.

## Implementation Details

The agent is implemented as part of the workflow agents in the Priority AI platform:

- **Location**: `adk-agents/workflow_agents/sub_agents/campaign_planning_agent/`
- **Key Files**:
  - `__init__.py`: Exports the agent function
  - `agent.py`: Contains the agent implementation
  - `prompt.py`: Contains the conversation guidance
  - `test_campaign_planning_agent.py`: Contains unit tests

## Six-Phase Approach

The agent uses a structured six-phase approach to guide users through the campaign planning process:

1. **Phase 1: Campaign Objectives & KPIs**
   - Introduce the purpose of the campaign planning process
   - Discuss the importance of aligning campaigns with business and marketing goals
   - Help the user define specific, measurable campaign objectives
   - Guide the user in setting SMART goals for the campaign
   - Help the user establish key performance indicators (KPIs) for each objective
   - Ensure objectives are tied to business outcomes
   - Validate that the objectives are realistic and achievable

2. **Phase 2: Target Audience & Insights**
   - Review existing persona information or help create simplified audience profiles
   - Guide the user in identifying primary and secondary target audiences
   - Help the user understand audience pain points, motivations, and decision-making factors
   - Discuss audience media consumption habits and preferred channels
   - Identify key audience insights that can inform campaign messaging and creative
   - Discuss how to tailor campaign elements to different audience segments
   - Help the user prioritize audience segments based on business impact

3. **Phase 3: Campaign Theme & Messaging**
   - Guide the user in developing a compelling campaign theme
   - Help the user craft key messages that address audience pain points
   - Ensure campaign messaging aligns with the brand's positioning
   - Discuss how to adapt messaging for different audience segments and channels
   - Help the user develop a messaging hierarchy
   - Guide the user in creating a campaign brief
   - Discuss how to maintain message consistency across all campaign touchpoints

4. **Phase 4: Campaign Calendar & Timeline**
   - Help the user establish a realistic campaign timeline with key milestones
   - Guide the user in creating a campaign calendar that outlines all activities
   - Discuss how to sequence campaign activities for maximum impact
   - Help the user plan for pre-launch, launch, and post-launch phases
   - Guide the user in allocating sufficient time for content creation and distribution
   - Discuss how to coordinate campaign activities across different channels and teams
   - Help the user build in buffer time for unexpected delays or changes

5. **Phase 5: Channel Strategy & Execution Plan**
   - Review the user's channel strategy and discuss how to leverage it for the campaign
   - Help the user select the most appropriate channels based on objectives and audience
   - Guide the user in developing channel-specific execution plans
   - Discuss how different channels can work together to amplify campaign impact
   - Help the user allocate budget across channels based on expected performance
   - Guide the user in developing a content plan for each channel
   - Discuss how to maintain creative and messaging consistency across channels

6. **Phase 6: Measurement & Optimization**
   - Help the user establish a measurement framework for the campaign
   - Guide the user in setting up tracking for all campaign KPIs
   - Discuss how to measure campaign performance across different channels
   - Help the user plan for regular campaign performance reviews
   - Guide the user in developing an optimization strategy based on performance data
   - Discuss A/B testing opportunities to improve campaign performance
   - Help the user plan for post-campaign analysis and reporting

## Web Search Integration

The agent leverages web search capabilities to enhance the campaign planning process with real-time, data-driven insights:

- Researches industry-specific campaign benchmarks and best practices
- Finds statistics on campaign performance and ROI for relevant industries
- Researches audience behavior and preferences related to campaign themes
- Finds examples of successful campaigns in similar industries
- Researches channel-specific campaign tactics and best practices
- Finds tools and resources for campaign planning, execution, and measurement

## Output Deliverables

The agent helps users create:

1. **Campaign Objectives & KPIs**: Defined objectives with clear success metrics
2. **Target Audience Profiles**: Detailed understanding of campaign audiences
3. **Campaign Theme & Messaging**: Compelling campaign concept and key messages
4. **Campaign Calendar**: Timeline with key milestones and activities
5. **Channel Execution Plan**: Detailed plan for campaign execution across channels
6. **Measurement Framework**: Plan for tracking, analyzing, and optimizing campaign performance

## Integration with Ethan Coordinator

The Campaign Planning Agent is integrated into the Ethan Coordinator workflow in the "Tactics" section, following the Channel Strategy agent.

```python
# In ethan_coordinator.py
from .sub_agents.campaign_planning_agent.agent import campaign_planning_agent

# ...

ethan_coordinator = LlmAgent(
    # ...
    tools=[
        # ...
        # Section 4: Tactics
        AgentTool(agent=tactics_agent),
        AgentTool(agent=marketing_budget_agent),
        AgentTool(agent=content_strategy_agent),
        AgentTool(agent=channel_strategy_agent),
        AgentTool(agent=campaign_planning_agent),
        
        # ...
    ],
)
```

## Usage Example

```python
from adk_agents.workflow_agents.sub_agents.campaign_planning_agent import campaign_planning_agent

# Call the agent with user message and optional context
response = campaign_planning_agent(
    user_message="I need help planning a product launch campaign for our new software.",
    conversation_history=[],  # Optional: Previous conversation history
    context="We are a B2B SaaS company in the project management space.",  # Optional: Business context
    market_insights="Our market research shows growing demand for AI-powered project management.",  # Optional: Market insights
    competitor_analysis="Our main competitors focus on enterprise clients, leaving mid-market underserved.",  # Optional: Competitor analysis
    brand_assessment="Our brand is perceived as innovative but not yet well-known.",  # Optional: Brand assessment
    positioning_statement="For mid-market companies who need efficient project management, our solution is the most user-friendly AI-powered platform.",  # Optional: Positioning statement
    messaging="Our key messages focus on ease of use, AI-powered automation, and affordability.",  # Optional: Messaging
    marketing_budget="We have allocated 60% to digital channels and 40% to events and partnerships.",  # Optional: Marketing budget
    content_strategy="Our content focuses on educational resources about AI in project management.",  # Optional: Content strategy
    channel_strategy="We prioritize LinkedIn, industry publications, email marketing, and webinars.",  # Optional: Channel strategy
    personas="We have three primary personas: Technical Project Managers, Department Heads, and C-Suite Executives.",  # Optional: Personas
    customer_journey="Our customers typically spend 2-3 months researching solutions before making a decision."  # Optional: Customer journey
)

# Process the agent's response
print(response.content)
```

## Relationship to UI Workflow

This agent powers the Campaign Planning workflow described in `docs/strategy-components/workflows/marketing-strategy/campaign-planning.md`. While the UI workflow document focuses on the user interface and interaction patterns, this agent provides the AI-powered conversation and analysis capabilities that drive the campaign planning process.

## Benefits of a Well-Defined Campaign Plan

A comprehensive campaign plan:

1. Aligns campaign activities with business objectives
2. Ensures consistent messaging across all campaign touchpoints
3. Coordinates activities across channels for maximum impact
4. Establishes clear timelines and responsibilities
5. Enables measurement and optimization of campaign performance
6. Facilitates efficient resource allocation
7. Creates a foundation for campaign success and ROI

## Future Enhancements

Potential future enhancements for the Campaign Planning Agent include:

1. Integration with marketing automation platforms
2. AI-powered campaign performance prediction
3. Automated campaign calendar generation
4. Creative concept generation
5. Campaign budget optimization
6. Competitive campaign analysis
7. Campaign ROI calculator
