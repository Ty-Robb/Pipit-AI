# Competitor Analysis Agent

## Overview

The Competitor Analysis Agent is a specialized AI consultant that helps businesses analyze their competitors to identify strengths, weaknesses, opportunities, and threats. This agent guides users through a structured process to develop comprehensive competitor analyses that inform strategic decision-making.

## Key Features

- **Competitor Identification & Profiling**: Helps identify primary and secondary competitors and create detailed competitor profiles.
- **Market Positioning Analysis**: Guides users in analyzing how competitors position themselves in the market and identify gaps or opportunities.
- **Product & Service Comparison**: Assists in conducting detailed comparisons of competitor products/services to identify unique selling points and opportunities.
- **Marketing & Communication Analysis**: Helps analyze competitor marketing strategies and tactics across various channels.
- **SWOT Analysis**: Guides users in conducting comprehensive SWOT analyses for key competitors.
- **Competitive Strategy Development**: Helps develop actionable strategies based on competitor analysis findings.

## Web Search Integration

The agent leverages web search capabilities to enhance its guidance with real-time, data-driven insights:

- Researches specific competitors mentioned by the user
- Finds recent news, developments, or announcements about competitors
- Researches industry trends and competitive dynamics
- Finds market share data and competitive positioning information

## Implementation Details

The Competitor Analysis Agent is implemented as a Genkit flow within the Pipit application:

- **Location**: `src/ai/flows/competitor-analysis.ts`
- **Key Components**:
  - A Genkit `flow` that defines the conversational logic.
  - Zod schemas for input and output validation.
  - Tools for web search and data persistence.

## Output Deliverables

The agent helps users create:

1. **Competitor Profiles**: Detailed profiles of key competitors with essential information.
2. **Positioning Map**: Visual representation of how competitors position themselves in the market.
3. **Product/Service Comparison Matrix**: Side-by-side comparison of features, benefits, and limitations.
4. **Marketing Channel Analysis**: An overview of competitor marketing strategies and effectiveness.
5. **SWOT Analysis**: A detailed SWOT analysis for each key competitor.
6. **Competitive Strategy Plan**: Actionable strategies to gain a competitive advantage.

## Six-Phase Framework

The agent guides users through a structured six-phase framework for competitor analysis:

1.  **Phase 1: Competitor Identification & Profiling**: Identify and create detailed profiles of key competitors.
2.  **Phase 2: Market Positioning Analysis**: Analyze how competitors position themselves in the market.
3.  **Phase 3: Product & Service Comparison**: Conduct detailed comparisons of competitor products and services.
4.  **Phase 4: Marketing & Communication Analysis**: Analyze competitor marketing strategies and tactics.
5.  **Phase 5: SWOT Analysis**: Conduct a comprehensive SWOT analysis for each key competitor.
6.  **Phase 6: Competitive Strategy Development**: Develop actionable strategies based on the analysis.

## Integration with Other Flows

The Competitor Analysis Agent is a modular component that can be called from other, more comprehensive flows.

```typescript
// A simplified example of how the competitor analysis flow might be called
import { competitorAnalysisFlow } from './competitor-analysis';
import { runFlow } from '@genkit-ai/flow';

async function runMarketingStrategy() {
    // ... other strategy steps

    const competitorAnalysisResult = await runFlow(competitorAnalysisFlow, {
        industry: 'Software / Technology',
        keyCompetitors: ['Asana', 'Monday.com', 'Trello'],
        // ... other inputs
    });

    // ... continue with the rest of the strategy
}
```
This modular approach allows for a clean separation of concerns and makes the agents reusable and easy to maintain.
