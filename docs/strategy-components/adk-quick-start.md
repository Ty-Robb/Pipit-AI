# Genkit Quick Start

This document provides a quick start guide for developing AI-powered workflows using Genkit within the Pipit application.

## The "Genkit-Native" Approach

### Why This Works

1.  **Simplicity**: We have one codebase, one deployment process, and one language (TypeScript) to manage.
2.  **Seamless Integration**: There are no network calls between our frontend and our AI "backend." We can directly call our Genkit flows from our Next.js API routes.
3.  **Developer Experience**: Our team can stay in a single context (TypeScript) without needing to switch between languages and environments.

## Minimal First Steps

### Day 1: Create a New Flow

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

### Day 2: Run and Test the Flow

You can use the Genkit developer UI to test your flows locally.

```bash
genkit start
```

This will start a local server with a UI where you can select your new flow, provide input, and see the results.

### Day 3: Connect from the Frontend

Create a Next.js API route to trigger your new flow.

```typescript
// src/app/api/my-new-flow/route.ts
import { myNewFlow } from '@/ai/flows/my-new-flow';
import { runFlow } from '@genkit-ai/flow';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    const result = await runFlow(myNewFlow, prompt);
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to run flow' }, { status: 500 });
  }
}
```

## Your Custom Extensions

Once you have the basic flow working, you can extend it by adding tools.

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

You can then use this tool in your flow:

```typescript
// src/ai/flows/my-new-flow.ts
import { myNewTool } from '../tools/my-new-tool';
// ... (rest of the file)
```

This approach allows us to build and iterate on our AI features quickly and efficiently, all within a single, consistent codebase.
