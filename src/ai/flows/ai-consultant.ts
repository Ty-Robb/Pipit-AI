// src/ai/flows/ai-consultant.ts
'use server';

/**
 * @fileOverview A marketing strategy AI consultant named Ethan.
 *
 * - aiConsultantGuidance - A function that handles the interaction with the AI consultant.
 * - AiConsultantGuidanceInput - The input type for the aiConsultantGuidance function.
 * - AiConsultantGuidanceOutput - The return type for the aiConsultantGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiConsultantGuidanceInputSchema = z.object({
  message: z.string().describe('The user message to the AI consultant.'),
  workflow: z.string().optional().describe('The current marketing strategy workflow.'),
  context: z.string().optional().describe('The context of the conversation.'),
});
export type AiConsultantGuidanceInput = z.infer<typeof AiConsultantGuidanceInputSchema>;

const AiConsultantGuidanceOutputSchema = z.object({
  response: z.string().describe('The AI consultant response.'),
  updatedContext: z.string().optional().describe('The updated context of the conversation.'),
});
export type AiConsultantGuidanceOutput = z.infer<typeof AiConsultantGuidanceOutputSchema>;

export async function aiConsultantGuidance(input: AiConsultantGuidanceInput): Promise<AiConsultantGuidanceOutput> {
  return aiConsultantGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiConsultantGuidancePrompt',
  input: {schema: AiConsultantGuidanceInputSchema},
  output: {schema: AiConsultantGuidanceOutputSchema},
  prompt: `You are Ethan, an AI Consultant specializing in marketing strategy.

  Your primary goal is to guide the user through marketing strategy workflows, providing personalized recommendations, and answering their questions.
  Maintain context across interactions, adapting your guidance based on the current workflow and user input.

  Current Workflow: {{workflow}}
  Context: {{context}}

  User Message: {{message}}

  Response:`,
});

const aiConsultantGuidanceFlow = ai.defineFlow(
  {
    name: 'aiConsultantGuidanceFlow',
    inputSchema: AiConsultantGuidanceInputSchema,
    outputSchema: AiConsultantGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      response: output!.response,
      updatedContext: 'This is a placeholder for updated context.', // Replace with actual context update logic
    };
  }
);
