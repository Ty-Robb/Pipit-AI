# Pipit: An AI-Powered Strategic Assistant

**For AI Assistants:** This README is your guide to the Pipit project. Start with the "Quick Start for AI Assistants" section below for immediate context.

---

## 🤖 Quick Start for AI Assistants

If you're an AI assistant working on this project, here's what you need to know:

-   **What This Is**: An AI-guided marketing strategy platform featuring conversational workflows.
-   **Core Product**: Users chat with "Ethan," an AI consultant powered by Google's Genkit, to build marketing strategies in a split-screen UI.
-   **Current Phase**: Documentation Completion & Genkit Implementation.
-   **Next Tasks**: Implement the newly documented Genkit flows (e.g., `brand-assessment`, `buying-process`).
-   **Tech Stack**: Next.js, Firebase, Genkit, Vercel AI SDK, Shadcn UI.

### What to Work On Next

1.  **Completed**: Full project documentation design. ✅
2.  **Completed**: Alignment of all workflow documents with the Genkit architecture. ✅
3.  **HIGHEST Priority**: Begin implementation of the stateful Genkit flows as defined in the `docs/strategy-components/workflows/` directory.
4.  **Then**: Integrate these backend flows with the Next.js frontend components.
5.  **Then**: Conduct comprehensive testing of the end-to-end user experience.

---

## 📋 Project Overview

Pipit is an AI-powered strategic assistant designed to help users develop and execute marketing strategies. The core of the product is "Ethan," an AI consultant that guides users through a series of structured, conversational workflows.

### Core Product: Conversational Workflows

-   **22+ Marketing Strategy Workflows**: Covering everything from Vision Statements and Brand Assessments to Pricing Strategy and Competitor Analysis.
-   **AI Consultant "Ethan"**: An adaptive AI built with **Genkit** that guides users through strategic thinking, asks clarifying questions, and helps draft content.
-   **Split-Screen Interface**: The user interacts with Ethan in a chat interface on the left panel, while the right panel dynamically displays visual information—forms, tables, charts, and generated reports—that updates in real-time.
-   **Professional Outputs**: Each workflow results in an actionable report or strategic document that the user can export.

---

## 🏗️ Project Structure

```
pipit/
├── src/
│   ├── ai/               # Core Genkit implementation
│   │   └── flows/        # All stateful Genkit flows are defined here
│   ├── app/              # Next.js 14 frontend (App Router)
│   ├── components/       # React components (built with Shadcn UI)
│   │   ├── panels/       # Components for the right-side visual panel
│   │   └── ui/           # Base Shadcn UI components
│   ├── context/          # React context providers (e.g., AuthContext)
│   └── lib/              # Utility functions, Firebase client, types
├── docs/                 # Comprehensive project documentation
│   ├── features/         # Specs for individual features
│   ├── strategy-components/ # Detailed specs for marketing strategy workflows
│   │   └── workflows/
│   ├── CHECKLIST.md      # Master checklist of all documentation files
│   └── blueprint.md      # High-level project plan and vision
├── README.md             # This file
└── package.json          # Project dependencies and scripts
```

---

## 📚 Documentation Guide

-   **Master Plan**: Start with the [**Project Blueprint**](docs/blueprint.md) for the high-level vision and architecture.
-   **Full Documentation List**: See the [**Documentation Checklist**](docs/CHECKLIST.md) for the status of every specification document.
-   **Workflow Specifications**: The detailed, phased breakdowns for each Genkit flow are located in `docs/strategy-components/workflows/`. These are the blueprints for the current implementation phase.

---

## 🚀 Getting Started

### Prerequisites

-   Node.js
-   npm (or your preferred package manager)
-   Firebase CLI

### Installation

1.  **Clone and install dependencies:**
    ```bash
    git clone <repository-url>
    cd pipit
    npm install
    ```

2.  **Set up environment variables:**
    ```bash
    cp .env.example .env
    # Edit .env with your Firebase project credentials
    ```

### Development

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

2.  **Run Genkit in development mode:**
    In a separate terminal, start the Genkit development UI to inspect and test flows:
    ```bash
    genkit start
    ```
    The Genkit UI will be available at `http://localhost:4000`.

---

## 🛠️ Development Workflow

### The Chat-Driven Workflow Pattern

The application is built on a **"Chat-Driven Workflow"** pattern. This is a split-panel UI where the AI-driven conversation in the left panel drives the state and content of the visual components in the right panel.

-   **AI's Role**: The AI acts as a guide, explaining each step, asking for information, and helping to generate content.
-   **Bidirectional Updates**: The UI is always in sync with the conversation.
    -   **Chat → UI**: User input in the chat updates the Genkit flow's state, which is then reflected in the visual components on the right.
    -   **UI → Chat**: Direct interaction with UI elements (e.g., filling a form) also updates the flow's state, and the AI acknowledges the change to maintain context.

### Making Changes

1.  **Check the Next Task**: Refer to the "What to Work On Next" section above or the project's issue tracker.
2.  **Find the Specification**: Locate the relevant workflow document in `docs/strategy-components/workflows/`.
3.  **Implement the Flow**: Write the stateful Genkit flow in `src/ai/flows/`.
4.  **Build the UI**: Create the corresponding React components in `src/components/panels/`.
5.  **Test**: Use the Genkit Dev UI and the application UI to test the flow end-to-end.

---

## 📊 Current Project Status

### ✅ Completed Features

-   User authentication (Firebase Auth).
-   Core UI layout with split-panel design.
-   A comprehensive suite of 22+ workflow specification documents.
-   Full alignment of all documentation with the target Genkit architecture.
-   Creation of a master [Documentation Checklist](docs/CHECKLIST.md).

### 🚧 In Progress / Next Up

-   **Genkit Flow Implementation**: The primary focus is now on implementing the documented workflows as stateful Genkit flows. This includes:
    -   `brand-assessment.md`
    -   `buying-process.md`
    -   `competitor-analysis.md`
    -   `messaging.md`
    -   `pricing-strategy.md`
    -   `vision-statement.md`
    -   ... and all other documented workflows.
-   **Frontend Integration**: Connecting the implemented Genkit flows to the frontend components.
-   **Comprehensive Testing**: End-to-end testing of each workflow.

---
**Last Updated**: July 3, 2024

**For AI Assistants**: You now have the complete context. Your next task is to begin implementing the Genkit flows based on their specifications in the `docs` folder. Good luck! 🚀
