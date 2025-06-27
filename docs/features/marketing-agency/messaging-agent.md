# Messaging Agent

The Messaging Agent is a specialized AI agent that helps users evaluate and prioritize key marketing messages for their organization. This document provides an overview of the agent's implementation, capabilities, and integration with the Priority AI platform.

## Overview

The Messaging Agent guides users through a structured process to identify which messages are most effective, credible, and resonant with their target audience. It helps organizations align their communication strategy across all marketing channels and ensures consistency in their messaging.

## Implementation Details

The agent is implemented as part of the workflow agents in the Priority AI platform:

- **Location**: `adk-agents/workflow_agents/sub_agents/messaging_agent/`
- **Key Files**:
  - `__init__.py`: Exports the agent function
  - `agent.py`: Contains the agent implementation
  - `prompt.py`: Contains the conversation guidance
  - `test_messaging_agent.py`: Contains unit tests

## Six-Phase Approach

The agent uses a structured six-phase approach to guide users through the message evaluation and prioritization process:

1. **Phase 1: Introduction**
   - Explain the purpose and value of message mapping
   - Set expectations for the process and outcomes

2. **Phase 2: Message Definition**
   - Define key messages for evaluation
   - Assign short labels to each message for easy reference

3. **Phase 3: Criteria Weighting**
   - Set percentage weights for nine evaluation criteria
   - Customize the importance of each criterion based on business goals

4. **Phase 4: Message Scoring**
   - Score each message against the weighted criteria
   - Create a comprehensive scoring matrix

5. **Phase 5: Results Review**
   - Calculate effectiveness, credibility, and resonance scores
   - Visualize message effectiveness
   - Rank messages based on overall scores

6. **Phase 6: Summary and Next Steps**
   - Summarize findings
   - Provide implementation guidance
   - Suggest next steps for using the prioritized messages

## Web Search Integration

The agent leverages web search capabilities to enhance the message mapping process with real-time, data-driven insights:

- Researches industry-specific messaging examples
- Finds research on criteria weighting best practices
- Researches frameworks for evaluating marketing message effectiveness
- Finds examples of how to visualize message effectiveness

## Output Deliverables

The agent helps users create:

1. **Key Messages Collection**: A set of clearly articulated marketing messages with short labels
2. **Criteria Weighting**: Customized weights for nine evaluation criteria
3. **Scoring Matrix**: Scores for each message against each criterion
4. **Message Analysis**: Calculated effectiveness, credibility, and resonance scores for each message
5. **Prioritized Messages**: Ranked list of messages based on overall scores
6. **Implementation Plan**: Guidance on how to use the prioritized messages

## Integration with Ethan Coordinator

The Messaging Agent is integrated into the Ethan Coordinator workflow in the "Positioning & Messaging" section, following the Brand Assessment and Positioning Statement agents.

```python
# In ethan_coordinator.py
from .sub_agents.messaging_agent.agent import messaging_agent

# ...

ethan_coordinator = LlmAgent(
    # ...
    tools=[
        # ...
        # Positioning & Messaging
        AgentTool(agent=brand_assessment_agent),
        AgentTool(agent=positioning_statement_agent),
        AgentTool(agent=messaging_agent),
        
        # ...
    ],
)
```

## Usage Example

```python
from adk_agents.workflow_agents.sub_agents.messaging_agent import messaging_agent

# Call the agent with user message and optional context
response = messaging_agent(
    user_message="I need help evaluating our marketing messages.",
    conversation_history=[],  # Optional: Previous conversation history
    context="We are a B2B SaaS company in the project management space.",  # Optional: Business context
    market_insights="Our market research shows growing demand for AI-powered project management.",  # Optional: Market insights
    competitor_analysis="Our main competitors focus on enterprise clients, leaving mid-market underserved.",  # Optional: Competitor analysis
    brand_assessment="Our brand is perceived as innovative but not yet well-known.",  # Optional: Brand assessment
    positioning_statement="For mid-market companies who need efficient project management, our solution is the most user-friendly AI-powered platform."  # Optional: Positioning statement
)

# Process the agent's response
print(response.content)
```

## Relationship to UI Workflow

This agent powers the Messaging workflow described in `docs/strategy-components/workflows/marketing-strategy/messaging.md`. While the UI workflow document focuses on the user interface and interaction patterns, this agent provides the AI-powered conversation and analysis capabilities that drive the message mapping process.

## Benefits of Message Mapping

Effective message mapping:

1. Aligns communication strategy across all marketing channels
2. Clarifies key messages and ensures consistency
3. Identifies which messages are most effective with the target audience
4. Provides a framework for evaluating new marketing messages
5. Helps prioritize messaging in different contexts and campaigns
6. Ensures marketing communications are focused and impactful

## Future Enhancements

Potential future enhancements for the Messaging Agent include:

1. Integration with audience segmentation data for targeted messaging
2. Industry-specific message templates and examples
3. A/B testing recommendations for message effectiveness
4. Integration with content creation tools
5. Automated message effectiveness tracking
6. Competitive message analysis
