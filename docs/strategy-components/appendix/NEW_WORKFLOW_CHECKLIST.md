# Checklist for Creating New Workflow Specification Documents

## Purpose

This document provides a checklist and standard operating procedure for creating new specification documents for interactive, chat-driven workflow components within the `docs/strategy-components/workflows/` directory. Its goal is to ensure consistency, quality, and completeness, aligning with established patterns and facilitating easier development and maintenance.

## Audience

This checklist is intended for developers, designers, product managers, and anyone involved in the ideation and specification of new strategy workflow components.

## Key Reference Documents

Before and during the creation of a new workflow specification, consult these key documents:

1.  **[`docs/strategy-components/implementation-tracker.md`](docs/strategy-components/implementation-tracker.md):**
    *   Check the priority of the new component.
    *   Understand its place within the broader strategy framework.
    *   Identify any existing related components or dependencies.
2.  **[`docs/strategy-components/chat-driven-workflow-pattern.md`](docs/strategy-components/chat-driven-workflow-pattern.md):**
    *   This is the foundational pattern document. Ensure your new specification adheres to its Core Principles, Architecture, Conversation Flow, Implementation Patterns, and UX Patterns.
3.  **[`docs/strategy-components/workflows/marketing-strategy/_data-flow-appendix.md`](docs/strategy-components/workflows/marketing-strategy/data-flow-appendix.md):**
    *   Understand how data flows between existing components.
    *   Plan the data inputs required for your new component and the data outputs it will produce. This appendix will need to be updated once your new spec is defined.
4.  **Existing High-Quality Examples:**
    *   Refer to well-defined specifications like:
        *   [`docs/strategy-components/workflows/marketing-strategy/core-values.md`](docs/strategy-components/workflows/marketing-strategy/core-values.md)
        *   [`docs/strategy-components/workflows/marketing-strategy/market-segmentation.md`](docs/strategy-components/workflows/marketing-strategy/market-segmentation.md)
        *   [`docs/strategy-components/workflows/marketing-strategy/brand-assessment.md`](docs/strategy-components/workflows/marketing-strategy/brand-assessment.md)
    *   These serve as benchmarks for structure, detail, and clarity.

## Checklist for New Workflow Specification Document

### 1. Initial Planning & Setup
*   [ ] **Consult Implementation Tracker:** Verify priority and context.
*   [ ] **Define Core Goal:** Clearly articulate what the workflow helps the user achieve.
*   [ ] **Outline User Flow:** Sketch out the main steps/phases the user will go through.
*   [ ] **Identify Key Data Inputs:** What information does this workflow need to start or function (from onboarding, user input, or other workflows)?
*   [ ] **Identify Key Data Outputs:** What are the primary data artifacts this workflow will produce?

### 2. Document Structure & Core Content
*   [ ] **Title:** Clear and descriptive (e.g., "Specification for Interactive [Workflow Name] Workflow").
*   [ ] **Goal / Purpose Section:**
    *   Clearly state the objective of the workflow.
    *   Mention alignment with `chat-driven-workflow-pattern.md`.
*   [ ] **Core Principles & Context Section:**
    *   List key principles guiding the design (User-Centricity, Split-Panel UI, Phased Progression, Bidirectional Data Flow, AI as Guide).
    *   Specify any pre-existing onboarding data or context it relies on.
*   [ ] **Overall Data Structure & `WorkflowDataContext` Section:**
    *   Define the JSON structure for the data specific to this workflow that will be stored (e.g., within `WorkflowDataContext.[workflowName]_data`).
    *   Detail all fields, their types, and example values or sources.
*   [ ] **`shadcn/ui` Component Mapping Section:**
    *   Create a table mapping descriptive UI elements in your workflow to specific `shadcn/ui` components (and their intended usage).
*   [ ] **Phased Breakdown Section:**
    *   Divide the workflow into logical, sequential phases.
    *   For each phase:
        *   [ ] **A. AI Chat Guidance & Data Collection (Left Panel):**
            *   Detail AI's initial prompts, explanations, and questions.
            *   Specify expected user input types.
            *   Describe NLU considerations for interpreting user responses.
            *   Outline AI's confirmation messages and error handling logic.
            *   Detail any specific AI-driven assistance, actions, or pre-fill logic (e.g., data fetching, suggestions, calculations) initiated from chat.
            *   Explain how AI uses context (e.g., `onboarding_company_name`, previous answers).
        *   [ ] **B. Corresponding Visual Component(s) (Right Panel):**
            *   Describe the UI elements visible in the right panel for this phase.
            *   Explain how these components display data from the `WorkflowDataContext`.
            *   Detail how users interact with these visual components.
            *   Outline error handling and user feedback for interactions within the visual components.
        *   [ ] **C. Data Captured in this Phase:**
            *   List the specific pieces of data collected or modified in this phase and where they are stored in the `WorkflowDataContext`.
        *   [ ] **D. Conceptual `tsx` Code Examples (Optional but Recommended):**
            *   Note where `tsx` snippets for key visual components should be included in the actual specification document to illustrate structure and props.
        *   [ ] **E. Transition Logic:**
            *   Explain the conditions or user actions that trigger a move to the next phase.
        *   [ ] **F. Key Decisions & Rationale (Optional):**
            *   Document any significant design decisions made for this phase and the reasons behind them.

### 3. Data Flow & Integration
*   [ ] **Update `_data-flow-appendix.md`:**
    *   Once your new spec's data inputs/outputs are clear, add/update a section for your workflow in the relevant `_data-flow-appendix.md` document (consult "Key Reference Documents" for examples of where this might be located, typically within the specific workflow category or a central appendix).
*   [ ] **Integration Patterns Section (within your new spec):**
    *   Include a section demonstrating alignment with established integration patterns.
    *   Provide conceptual `tsx` examples for key layout components (e.g., `ResizablePanelGroup`) and any complex interactive elements in the actual specification document.
    *   Briefly explain the Chat-to-Visual and Visual-to-Chat coordination, referencing the `WorkflowDataContext` as the single source of truth.
    *   Describe how this workflow integrates with or depends on other workflows, if applicable.

### 4. Visualization & AI Capabilities
*   [ ] **Mermaid Workflow Sequence Diagram Section:**
    *   Create a Mermaid diagram illustrating the overall flow of your workflow, or key complex interactions within it, in the actual specification document.
*   [ ] **Key AI Capabilities Section (Optional but Recommended):**
    *   List the specific AI capabilities leveraged in your workflow (e.g., NLU, context retention, summarization, personalization, intelligent defaults, recommendation generation) in the actual specification document.

### 5. Cross-Cutting Concerns
*   [ ] **Accessibility (a11y) Considerations:**
    *   Briefly note any specific accessibility requirements or considerations for the workflow (e.g., keyboard navigation, screen reader compatibility, color contrast).
*   [ ] **Performance Considerations:**
    *   Identify any potential performance bottlenecks or requirements (e.g., handling large datasets, real-time updates, API response times).
*   [ ] **Security Considerations:**
    *   Outline any security aspects, especially if handling sensitive data, user authentication, or external API calls.
*   [ ] **Internationalization & Localization (i18n/l10n) (If Applicable):**
    *   Note any considerations if the workflow needs to support multiple languages or regions.

### 6. Final Review & Updates
*   [ ] **Self-Review against Benchmarks:** Compare your draft against high-quality examples.
*   [ ] **Clarity and Completeness:** Ensure all aspects are clearly explained.
*   [ ] **Consistency:** Check for consistent terminology and formatting.
*   [ ] **Peer Review:** Has the specification been reviewed by at least one other team member (developer, designer, or PM)?
*   [ ] **Stakeholder Alignment:** Have key stakeholders (e.g., Product, Design, Engineering lead) reviewed and agreed on the core aspects of the specification?
*   [ ] **Update Implementation Tracker:** Once the specification is complete, update its status in [`docs/strategy-components/implementation-tracker.md`](docs/strategy-components/implementation-tracker.md).

By following this checklist, we can maintain a high standard for our workflow specification documents.