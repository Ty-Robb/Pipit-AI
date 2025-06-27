# Document Export Feature

The Document Export feature allows users to export workflow results as PDF or PowerPoint documents. This feature is integrated into the workflow chat interface, providing a seamless experience for users to download and share their marketing strategy documents.

## Overview

The Document Export feature consists of the following components:

1. **Backend (Genkit Flow)**: A Genkit flow that generates PDF and PowerPoint documents from workflow data.
2. **Frontend Service**: A TypeScript service that communicates with the backend API route that triggers the Genkit flow.
3. **UI Component**: A dropdown menu component that allows users to select the export format.

## Backend Implementation

The backend implementation is a Genkit flow that:

- Is triggered by a Next.js API route.
- Receives the workflow data and desired export format as input.
- Uses libraries like `pdf-lib` for PDF generation and a suitable library for PowerPoint generation (e.g., `pptxgenjs`).
- Creates the document in memory or as a temporary file.
- Uploads the document to Firebase Storage.
- Returns the document URL to the client.

## Frontend Implementation

The frontend implementation includes:

- `document-export-service.ts`: A service that communicates with the backend API route.
- `document-export-dropdown.tsx`: A dropdown menu component that allows users to select the export format.

### Integration with Workflow Chat

The Document Export feature is integrated into the workflow chat interface. The export button appears in the chat header when workflow data is available. Users can click the button to export the workflow data as a PDF or PowerPoint document.

## Usage

To use the Document Export feature:

1. Navigate to a workflow chat.
2. Complete the workflow to generate data.
3. Click the "Export" button in the chat header.
4. Select the desired export format (PDF or PowerPoint).
5. The document will be generated and downloaded.

## Security

The Document Export feature includes the following security measures:

- **Authentication**: Only authenticated users can export documents.
- **Authorization**: Users can only export documents for workflows they have access to.
- **Secure Storage**: Documents are stored in Firebase Storage with appropriate security rules.

## Future Enhancements

Potential future enhancements for the Document Export feature include:

- Additional export formats (e.g., Word, Excel).
- Customizable templates for different workflow types.
- Branding options for documents (e.g., logo, colors).
- Document sharing and collaboration features.
