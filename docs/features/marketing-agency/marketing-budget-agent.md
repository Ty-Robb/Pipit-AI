# Marketing Budget Agent

The Marketing Budget Agent is a specialized AI agent that helps users define, allocate, and manage their marketing financial resources. This document provides an overview of the agent's implementation, capabilities, and integration with the Pipit platform.

## Overview

The Marketing Budget Agent guides users through a structured process to establish a comprehensive budget framework that aligns with their strategic goals. It helps marketing teams establish their total annual marketing budget, break it down into appropriate categories, and ensure financial resources are allocated optimally.

## Implementation Details

The agent is implemented as a Genkit flow within the Pipit application:

- **Location**: `src/ai/flows/marketing-budget.ts`
- **Key Components**:
  - A Genkit `flow` that defines the conversational logic.
  - Zod schemas for input and output validation.
  - Tools for web search and data persistence.

## Four-Phase Approach

The agent uses a structured four-phase approach to guide users through the marketing budget development process:

1.  **Phase 1: Introduction & Total Annual Marketing Budget Definition**: Establish the total annual marketing budget with industry context.
2.  **Phase 2: Budget Category Allocation**: Allocate funds to common marketing budget categories.
3.  **Phase 3: Budget Balancing & Adjustment**: Balance the budget and make adjustments as needed.
4.  **Phase 4: Review & Confirmation**: Review the budget allocation and confirm the final plan.

## Web Search Integration

The agent leverages web search capabilities to enhance the budget development process with real-time, data-driven insights:

- Researches industry-specific budget allocation benchmarks.
- Finds recent statistics on marketing budget trends.
- Researches best practices for budget allocation across different marketing channels.
- Finds examples of successful marketing budget structures for similar businesses.

## Output Deliverables

The agent helps users create:

1.  **Total Annual Marketing Budget**: A defined amount and currency.
2.  **Budget Category Allocation**: A list of categories with allocated amounts and percentages.
3.  **Visual Representation**: A description of the budget allocation visualization.
4.  **Allocation Rationale**: A summary of key allocation decisions and their rationale.
5.  **Optimization Recommendations**: Suggestions for tracking and optimizing the budget over time.

## Integration with Other Flows

The Marketing Budget Agent is a modular component that can be called from other, more comprehensive flows.

```typescript
// A simplified example of how the marketing budget flow might be called
import { marketingBudgetFlow } from './marketing-budget';
import { runFlow } from '@genkit-ai/flow';

async function runMarketingStrategy() {
    // ... other strategy steps

    const budgetResult = await runFlow(marketingBudgetFlow, {
        positioningStatement: 'For mid-market companies who need efficient project management...',
        // ... other inputs
    });

    // ... continue with the rest of the strategy
}
```
This modular approach allows for a clean separation of concerns and makes the agents reusable and easy to maintain.
