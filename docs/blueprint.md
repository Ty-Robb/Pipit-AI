# Pipit: AI Strategy Wingman - Blueprint

## 1. Vision & Core Features

Pipit is an AI-guided marketing strategy platform where users work with "Ethan," an AI strategic consultant, through conversational workflows to build their marketing strategy.

### Core Features:

-   **AI Consultant (Ethan)**: Provides text-based guidance through structured marketing strategy workflows, adapting based on user input and maintaining context. Built with **Genkit**.
-   **Strategy Workflows**: A series of structured workflows covering Discovery, Go-to-Market, and more.
-   **Website Assessment**: An AI-powered tool to assess websites and generate strategic reports.
-   **Content Creation**: Generates marketing content (text, image concepts, video scripts) informed by the strategy.
-   **Split-Screen UI**: A clear interface with chat on the left and evolving strategic outputs on the right.
-   **Document Handling**: Upload, view, and extract insights from PDF documents.
-   **Authentication**: Secure user authentication and workflow state management using **Firebase**.

## 2. Technical Architecture

The application is a **Next.js** monolith that leverages the **Vercel AI SDK** and **Genkit** for its core AI functionality.

-   **Frontend**: Built with Next.js and React.
-   **UI Components**: Utilizes the **Shadcn UI** library for a consistent and professional look and feel.
-   **AI and Workflows**: Managed directly within the Next.js application using **Genkit** flows located in the `src/ai` directory.
-   **Authentication & Database**: **Firebase** for user authentication and data persistence.

## 3. Style Guidelines

-   **Primary Color**: Amethyst (`#9966CC`) - Conveys creativity and strategic thinking.
-   **Background Color**: Light Gray (`#F0F0F0`) - A clean, neutral backdrop.
-   **Accent Color**: Emerald (`#50C878`) - Emphasizes calls to action and growth.
-   **Fonts**: A professional serif for headlines and 'Inter' (sans-serif) for body text to ensure clarity and modernity.
-   **Icons**: Clear, flat, geometric style for a modern and intuitive interface.

For a detailed look at post-launch features and the long-term vision, please see the [Project Roadmap](docs/roadmap.md).
