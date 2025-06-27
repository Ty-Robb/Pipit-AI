# Positioning Statement Agent

The Positioning Statement Agent is a specialized AI agent that helps users create a clear, concise statement that defines their brand's unique value proposition in the market. This document provides an overview of the agent's implementation, capabilities, and integration with the Priority AI platform.

## Overview

The Positioning Statement Agent guides users through a structured process to articulate what they offer, who they offer it to, and what makes them different from competitors. This positioning statement serves as a foundational element that ensures internal alignment and guides all marketing and product development efforts.

## Implementation Details

The agent is implemented as part of the workflow agents in the Priority AI platform:

- **Location**: `adk-agents/workflow_agents/sub_agents/positioning_statement_agent/`
- **Key Files**:
  - `__init__.py`: Exports the agent function
  - `agent.py`: Contains the agent implementation
  - `prompt.py`: Contains the conversation guidance
  - `test_positioning_statement_agent.py`: Contains unit tests

## Two-Phase Approach

The agent uses a structured two-phase approach to guide users through the positioning statement development process:

1. **Phase 1: Defining Key Criteria**
   - Gather the essential components needed for a strong positioning statement
   - Uses a table-based approach to collect key positioning components
   - Provides examples and guidance for each component

2. **Phase 2: Drafting the Statement**
   - Use the gathered components to craft a complete, impactful positioning statement
   - Follows a template-based approach for consistent structure
   - Offers refinement opportunities and best practices

## Web Search Integration

The agent leverages web search capabilities to enhance the positioning statement development with real-time, data-driven insights:

- Researches industry-specific target market definitions and trends
- Finds examples of effective positioning against similar competitors
- Researches unique value propositions in the user's industry
- Finds best practices and templates for positioning statements

## Output Deliverables

The agent helps users create:

1. **Key Criteria Table**: Structured breakdown of positioning components
   - For: Ideal market segment
   - Product is: Concise product description
   - Ideal for: Best use or application
   - Better than: Primary competitor or competing approach
   - Because: Differentiation and superiority

2. **Complete Positioning Statement**: A comprehensive statement following this template:
   ```
   For [target market description] who want/need [primary benefit], our [product/service name] is the [unique differentiator]. Unlike our competitors, we [unlike competitors]. This allows us to provide [allows us to provide]. As a result, our clients are able to [client result].
   ```

## Integration with Ethan Coordinator

The Positioning Statement Agent is integrated into the Ethan Coordinator workflow in the "Positioning & Messaging" section, following the Brand Assessment agent.

```python
# In ethan_coordinator.py
from .sub_agents.positioning_statement_agent.agent import positioning_statement_agent

# ...

ethan_coordinator = LlmAgent(
    # ...
    tools=[
        # ...
        # Positioning & Messaging
        AgentTool(agent=brand_assessment_agent),
        AgentTool(agent=positioning_statement_agent),
        
        # ...
    ],
)
```

## Usage Example

```python
from adk_agents.workflow_agents.sub_agents.positioning_statement_agent import positioning_statement_agent

# Call the agent with user message and optional context
response = positioning_statement_agent(
    user_message="I need help creating a positioning statement for my business.",
    conversation_history=[],  # Optional: Previous conversation history
    context="We are a B2B SaaS company in the project management space.",  # Optional: Business context
    market_insights="Our market research shows growing demand for AI-powered project management.",  # Optional: Market insights
    competitor_analysis="Our main competitors focus on enterprise clients, leaving mid-market underserved.",  # Optional: Competitor analysis
    brand_assessment="Our brand is perceived as innovative but not yet well-known."  # Optional: Brand assessment
)

# Process the agent's response
print(response.content)
```

## Relationship to UI Workflow

This agent powers the Positioning Statement workflow described in `docs/strategy-components/workflows/marketing-strategy/positioning-statement.md`. While the UI workflow document focuses on the user interface and interaction patterns, this agent provides the AI-powered conversation and analysis capabilities that drive the positioning statement development process.

## Benefits of a Strong Positioning Statement

A well-crafted positioning statement:

1. Provides clarity and focus for all marketing efforts
2. Ensures consistent messaging across all channels
3. Differentiates the brand from competitors
4. Guides product development decisions
5. Aligns internal teams around a common understanding
6. Serves as a foundation for marketing strategy

## Future Enhancements

Potential future enhancements for the Positioning Statement Agent include:

1. Integration with competitor analysis data for more targeted positioning
2. Industry-specific positioning templates and examples
3. Automated evaluation of positioning statement effectiveness
4. Visualization tools for positioning maps
5. Integration with messaging and content development tools
