# PowerPoint Generation Feature

## Overview

Pipit will support PowerPoint presentation generation as a key output format for marketing strategies and workflows. This feature will allow users to:

1. **Upload existing PowerPoint files** for analysis and reference.
2. **Generate new presentations** from workflow outputs.
3. **Export marketing strategies** as professional slide decks.

## Technology Stack

- **PptxGenJS**: A JavaScript library for creating PowerPoint presentations.
- **Firebase Storage**: To store uploaded and generated PPTX files.
- **Genkit Flows**: To handle the logic for presentation generation.

## Implementation Plan

### Phase 1: File Upload Support
- Add PPTX to the list of supported file types for upload.
- Implement PPTX content extraction for vector search.
- Update the file upload UI to accept .pptx files.

### Phase 2: Basic Generation
- Create PowerPoint templates for each workflow type.
- Implement a Genkit flow that generates slides from workflow outputs.
- Add an "Export as PowerPoint" button to the workflow results UI.

### Phase 3: Advanced Features
- Implement custom branding/themes for presentations.
- Add dynamic chart and graph generation.
- Introduce multi-language support.

## Use Cases

### 1. Marketing Strategy Presentation
After completing the Marketing Strategy workflow, users can export:
- Executive summary slide
- Vision & Mission slides
- SWOT analysis matrix
- Target audience personas
- Marketing tactics timeline
- Budget breakdown charts

### 2. Campaign Pitch Deck
From the Campaign Planning workflow:
- Campaign overview
- Creative concepts
- Media plan
- Timeline and milestones
- Expected ROI projections

## Technical Architecture

The presentation generation will be handled by a Genkit flow.

```typescript
// A simplified example of a Genkit flow for PowerPoint generation
import { defineFlow } from '@genkit-ai/flow';
import PptxGenJS from 'pptxgenjs';
import { z } from 'zod';

export const generatePowerpointFlow = defineFlow(
  {
    name: 'generatePowerpointFlow',
    inputSchema: z.object({
      strategyData: z.any(), // Zod schema for your strategy data
    }),
    outputSchema: z.string(), // URL of the generated presentation
  },
  async (input) => {
    const pptx = new PptxGenJS();

    // Add a title slide
    const titleSlide = pptx.addSlide();
    titleSlide.addText('Marketing Strategy', { x: 1, y: 1, fontSize: 36 });

    // Add a SWOT analysis slide
    const swotSlide = pptx.addSlide();
    // ... add shapes and text for the SWOT matrix ...

    // Save the presentation to a buffer
    const pptxBuffer = await pptx.write();

    // Upload the buffer to Firebase Storage
    // const storageUrl = await uploadToFirebase(pptxBuffer, 'strategy.pptx');

    return "storageUrl"; // Return the public URL
  }
);
```

This architecture keeps the presentation generation logic within our Genkit framework, ensuring a consistent and maintainable codebase.
