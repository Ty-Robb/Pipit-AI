# Discovery Workflow Migration Guide: From Legacy to Genkit

This guide outlines the migration from the legacy `discovery.md` and `discovery-improved.md` specifications to a formal, stateful Genkit flow.

## Key Improvements with Genkit

### 1. Architecture & State Management
- **Centralized Logic**: The entire workflow is now encapsulated in a single Genkit flow, simplifying orchestration and making the business logic easier to follow.
- **Built-in State Management**: Genkit's stateful flows handle the persistence and updates of the workflow's state, eliminating the need for custom state management code.
- **Type Safety with Zod**: The flow's state, inputs, and outputs are defined with Zod schemas, ensuring end-to-end type safety and reducing runtime errors.

### 2. Observability & Debugging
- **Automatic Tracing**: Genkit provides built-in tracing for all flow executions, including model interactions and tool usage. This is invaluable for debugging and performance analysis.
- **Development UI**: The Genkit development UI allows for easy testing and inspection of flows and their states, speeding up the development cycle.

### 3. Modularity & Reusability
- **Tools**: External actions (e.g., database operations, API calls) are implemented as reusable Genkit tools, which can be easily tested in isolation and used across multiple flows.
- **Structured Prompts**: Prompts are now more structured and can be managed as separate assets, making them easier to version and update.

## Implementation Checklist for Genkit Migration

### Phase 1: Define the Genkit Flow
- [ ] Define the main Genkit flow for the Strategic Discovery Process.
- [ ] Create the Zod schema for the flow's state, based on the structure in `discovery-improved.md`.
- [ ] Implement the conversational logic for each phase of the workflow within the flow.

### Phase 2: Frontend Integration
- [ ] Update the frontend to invoke the Genkit flow instead of the legacy backend.
- [ ] Ensure the frontend can handle the state object returned by the flow and render the UI accordingly.
- [ ] Implement the bidirectional updates between the chat and the visual components by sending user input to the flow and receiving the updated state.

### Phase 3: Tools & External Actions
- [ ] If applicable, create Genkit tools for any external actions, such as saving the final report to a database.
- [ ] Ensure the flow can correctly call these tools and handle their responses.

### Phase 4: Testing & Deployment
- [ ] Use the Genkit development UI to test the flow with various inputs and scenarios.
- [ ] Write unit tests for any complex logic within the flow and for the tools.
- [ ] Deploy the Genkit flow and the updated frontend to your hosting environment.

## Data Migration to the Zod Schema

The primary data migration task is to convert any existing data from the old, flat structure to the new nested structure defined by the Zod schema.

### Old Structure → New Zod Schema Mapping

```javascript
// Old structure (flat)
const oldData = {
  Q1_clarity_on_value_prop: true,
  Q1_unique_value_proposition: "...",
  // ...
};

// New Zod schema (nested)
const NewStateSchema = z.object({
  assessment_questions: z.object({
    Q1_unique_value_proposition: z.object({
      has_clarity: z.boolean(),
      value_proposition: z.string(),
      specific_capabilities: z.string(),
    }),
    // ...
  }),
  // ...
});
```

### Migration Script Example

```javascript
import { NewStateSchema } from './schemas'; // Assuming you have your Zod schema in a separate file

function migrateToGenkitState(oldData) {
  const newState = {
    // ... (map all the fields as in the previous migration guide) ...
  };

  // Validate the new state against the Zod schema
  try {
    NewStateSchema.parse(newState);
    return newState;
  } catch (error) {
    console.error("Data migration failed:", error);
    return null;
  }
}
```

## Testing in the Genkit Environment

- **Unit Testing**: Write tests for individual tools and any complex data transformation functions.
- **Integration Testing with Dev UI**: Use the Genkit development UI to run the entire flow, inspect the state at each step, and test different conversational paths.
- **End-to-End Testing**: Conduct tests from the frontend to the Genkit flow and back, ensuring the entire system works as expected.

## Rollout Strategy

The rollout strategy remains similar, but with the added benefit of Genkit's observability features.

- **Phase 1: Staging**: Deploy the Genkit flow to a staging environment and conduct thorough testing.
- **Phase 2: Production with Feature Flag**: Deploy to production with a feature flag, allowing you to gradually roll out the new Genkit-powered workflow.
- **Phase 3: Full Rollout**: Once you're confident in the new system, roll it out to all users and deprecate the old system.

## Monitoring with Genkit Tracing

Leverage Genkit's built-in tracing to monitor the performance and behavior of your flow in production.

- **Track Errors**: The trace data will show any errors that occur during the flow's execution.
- **Monitor Latency**: Analyze the duration of each step in the flow, including model calls and tool executions.
- **Analyze Prompts and Outputs**: Inspect the exact prompts sent to the model and the responses received, which can help you identify areas for improvement.
