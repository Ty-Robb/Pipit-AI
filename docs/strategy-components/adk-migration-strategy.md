# Genkit Quick Start

This document provides a quick start guide for developing AI-powered workflows using Genkit within the Pipit application.

## Overview

We use a "Genkit-native" approach, where all AI logic is implemented as Genkit `flows` directly within our Next.js application. This provides a simple, maintainable, and highly integrated architecture.

## Core Concepts

-   **Flows**: A `flow` is a function that defines a specific AI-powered workflow. It can call other flows, use tools, and interact with language models.
-   **Tools**: A `tool` is a function that a `flow` can call to perform a specific action, such as searching the web, reading a file, or interacting with a database.
-   **Models**: We use the `@genkit-ai/google-vertexai` package to interact with Google's Vertex AI models, including Gemini.

## Getting Started

### 1. Create a New Flow

Create a new file in `src/ai/flows` (e.g., `src/ai/flows/my-new-flow.ts`).

```typescript
// src/ai/flows/my-new-flow.ts
import { defineFlow } from '@genkit-ai/flow';
import { geminiPro } from 'genkitx-vertexai';
import { z } from 'zod';

export const myNewFlow = defineFlow(
  {
    name: 'myNewFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (prompt) => {
    const llmResponse = await generate({
      model: geminiPro,
      prompt: prompt,
    });

    return llmResponse.text();
  }
);
```

### 2. Create a New Tool

Create a new file in `src/ai/tools` (e.g., `src/ai/tools/my-new-tool.ts`).

```typescript
// src/ai/tools/my-new-tool.ts
import { defineTool } from '@genkit-ai/tool';
import { z } from 'zod';

export const myNewTool = defineTool(
  {
    name: 'myNewTool',
    description: 'A tool that does something useful.',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (input) => {
    // ... do something useful ...
    return `You said: ${input}`;
  }
);
```

### 3. Use the Tool in a Flow

You can now use your new tool within any of your flows.

```typescript
// src/ai/flows/my-new-flow.ts
import { myNewTool } from '../tools/my-new-tool';

// ... (previous flow definition)

export const myNewFlowWithTool = defineFlow(
    // ...
    async (prompt) => {
        const toolResult = await runTool(myNewTool, prompt);
        return `The tool said: ${toolResult}`;
    }
);
```

## Running Flows Locally

You can use the Genkit developer UI to test your flows locally.

```bash
genkit start
```

This will start a local server with a UI where you can select a flow, provide input, and see the results.

This guide provides a basic overview of how to get started with Genkit in our project. For more detailed information, please refer to the official [Genkit documentation](https://firebase.google.com/docs/genkit).
