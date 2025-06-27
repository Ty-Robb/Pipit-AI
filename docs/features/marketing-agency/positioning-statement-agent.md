# Positioning Statement Agent

The Positioning Statement Agent is a specialized AI agent that helps users create a clear, concise statement that defines their brand's unique value proposition in the market. This document provides an overview of the agent's implementation, capabilities, and integration with the Pipit platform.

## Overview

The Positioning Statement Agent guides users through a structured process to articulate what they offer, who they offer it to, and what makes them different from competitors. This positioning statement serves as a foundational element that ensures internal alignment and guides all marketing and product development efforts.

## Implementation Details

The agent is implemented as a Genkit flow within the Pipit application:

- **Location**: `src/ai/flows/positioning-statement.ts`
- **Key Components**:
  - A Genkit `flow` that defines the conversational logic.
  - Zod schemas for input and output validation.
  - Tools for web search and data persistence.

## Two-Phase Approach

The agent uses a structured two-phase approach to guide users through the positioning statement development process:

1. **Phase 1: Defining Key Criteria**
   - Gather the essential components needed for a strong positioning statement.
   - Uses a table-based approach to collect key positioning components.
   - Provides examples and guidance for each component.

2. **Phase 2: Drafting the Statement**
   - Use the gathered components to craft a complete, impactful positioning statement.
   - Follows a template-based approach for consistent structure.
   - Offers refinement opportunities and best practices.

## Web Search Integration

The agent leverages web search capabilities to enhance the positioning statement development with real-time, data-driven insights:

- Researches industry-specific target market definitions and trends.
- Finds examples of effective positioning against similar competitors.
- Researches unique value propositions in the user's industry.
- Finds best practices and templates for positioning statements.

## Output Deliverables

The agent helps users create:

1. **Key Criteria Table**: Structured breakdown of positioning components:
   - For: Ideal market segment
   - Product is: Concise product description
   - Ideal for: Best use or application
   - Better than: Primary competitor or competing approach
   - Because: Differentiation and superiority

2. **Complete Positioning Statement**: A comprehensive statement following a clear template.

## Integration with Other Flows

The Positioning Statement Agent is designed to be a modular component that can be called from other, more comprehensive flows, such as the main "Marketing Strategy Workflow."

```typescript
// A simplified example of how the positioning statement flow might be called
import { positioningStatementFlow } from './positioning-statement';
import { runFlow } from '@genkit-ai/flow';

async function runMarketingStrategy() {
    // ... other strategy steps

    const positioningResult = await runFlow(positioningStatementFlow, {
        brandAssessment: 'Our brand is perceived as innovative but not yet well-known.',
        // ... other inputs
    });

    // ... continue with the rest of the strategy
}
```

This modular approach allows for a clean separation of concerns and makes the agents reusable and easy to maintain.
