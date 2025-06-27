# Messaging Agent

The Messaging Agent is a specialized AI agent that helps users evaluate and prioritize key marketing messages for their organization. This document provides an overview of the agent's implementation, capabilities, and integration with the Pipit platform.

## Overview

The Messaging Agent guides users through a structured process to identify which messages are most effective, credible, and resonant with their target audience. It helps organizations align their communication strategy across all marketing channels and ensures consistency in their messaging.

## Implementation Details

The agent is implemented as a Genkit flow within the Pipit application:

- **Location**: `src/ai/flows/messaging.ts`
- **Key Components**:
  - A Genkit `flow` that defines the conversational logic.
  - Zod schemas for input and output validation.
  - Tools for web search and data persistence.

## Six-Phase Approach

The agent uses a structured six-phase approach to guide users through the message evaluation and prioritization process:

1.  **Phase 1: Introduction**: Explain the purpose and value of message mapping.
2.  **Phase 2: Message Definition**: Define key messages for evaluation.
3.  **Phase 3: Criteria Weighting**: Set percentage weights for nine evaluation criteria.
4.  **Phase 4: Message Scoring**: Score each message against the weighted criteria.
5.  **Phase 5: Results Review**: Calculate and visualize message effectiveness, credibility, and resonance scores.
6.  **Phase 6: Summary and Next Steps**: Summarize findings and provide implementation guidance.

## Web Search Integration

The agent leverages web search capabilities to enhance the message mapping process with real-time, data-driven insights:

- Researches industry-specific messaging examples.
- Finds research on criteria weighting best practices.
- Researches frameworks for evaluating marketing message effectiveness.

## Output Deliverables

The agent helps users create:

1.  **Key Messages Collection**: A set of clearly articulated marketing messages.
2.  **Criteria Weighting**: Customized weights for nine evaluation criteria.
3.  **Scoring Matrix**: Scores for each message against each criterion.
4.  **Message Analysis**: Calculated effectiveness, credibility, and resonance scores for each message.
5.  **Prioritized Messages**: A ranked list of messages based on overall scores.
6.  **Implementation Plan**: Guidance on how to use the prioritized messages.

## Integration with Other Flows

The Messaging Agent is a modular component that can be called from other, more comprehensive flows.

```typescript
// A simplified example of how the messaging flow might be called
import { messagingFlow } from './messaging';
import { runFlow } from '@genkit-ai/flow';

async function runMarketingStrategy() {
    // ... other strategy steps

    const messagingResult = await runFlow(messagingFlow, {
        positioningStatement: 'For mid-market companies who need efficient project management...',
        // ... other inputs
    });

    // ... continue with the rest of the strategy
}
```
This modular approach allows for a clean separation of concerns and makes the agents reusable and easy to maintain.
