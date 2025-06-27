// src/ai/flows/vision-statement.ts
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VisionStatementInputSchema = z.object({
  industry: z.string().describe('The user's industry'),
  goals: z.string().describe('The user's long-term goals for the company'),
});
export type VisionStatementInput = z.infer<typeof VisionStatementInputSchema>;

const VisionStatementOutputSchema = z.object({
  option1: z.string().describe('The first vision statement option'),
  option2: z.string().describe('The second vision statement option'),
  option3: z.string().describe('The third vision statement option'),
});
export type VisionStatementOutput = z.infer<typeof VisionStatementOutputSchema>;

export async function visionStatement(input: VisionStatementInput): Promise<VisionStatementOutput> {
  return visionStatementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'visionStatementPrompt',
  input: {schema: VisionStatementInputSchema},
  output: {schema: VisionStatementOutputSchema},
  prompt: `
    You are a marketing strategy expert. Your task is to generate three distinct vision statement options for a company based on their industry and goals.

    Industry: {{industry}}
    Goals: {{goals}}

    Generate three vision statements that are:
    - Aspirational and forward-looking
    - Clear and concise
    - Reflective of the company's long-term ambitions
  `,
});

const visionStatementFlow = ai.defineFlow(
  {
    name: 'visionStatementFlow',
    inputSchema: VisionStatementInputSchema,
    outputSchema: VisionStatementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
