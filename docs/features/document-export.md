# Document Export Feature

The Document Export feature allows users to export workflow results as PDF or PowerPoint documents. This feature is integrated into the workflow chat interface, providing a seamless experience for users to download and share their marketing strategy documents.

## Overview

The Document Export feature consists of the following components:

1. **Backend API**: A FastAPI endpoint that generates PDF and PowerPoint documents from workflow data.
2. **Frontend Service**: A TypeScript service that communicates with the backend API.
3. **UI Component**: A dropdown menu component that allows users to select the export format.

## Backend Implementation

The backend implementation includes:

- `DocumentExportService`: A service that generates PDF and PowerPoint documents from workflow data.
- `ExportDocumentRequest` and `ExportDocumentResponse` models: Data models for the API request and response.
- `/api/export/document` endpoint: A FastAPI endpoint that handles document export requests.

### Document Generation

The document generation process involves:

1. Creating a temporary file for the document.
2. Generating the document content based on the workflow type and data.
3. Uploading the document to Firebase Storage.
4. Returning the document URL and metadata to the client.

#### PDF Generation

PDF documents are generated using the ReportLab library. The document includes:

- A title page with the workflow title and generation date.
- Sections for each component of the workflow data.
- Formatted text, tables, and lists as appropriate for the workflow type.

#### PowerPoint Generation

PowerPoint documents are generated using the python-pptx library. The presentation includes:

- A title slide with the workflow title and generation date.
- Slides for each component of the workflow data.
- Formatted text, tables, and charts as appropriate for the workflow type.

## Frontend Implementation

The frontend implementation includes:

- `document-export-service.ts`: A service that communicates with the backend API.
- `document-export-dropdown.tsx`: A dropdown menu component that allows users to select the export format.

### Integration with Workflow Chat

The Document Export feature is integrated into the workflow chat interface. The export button appears in the chat header when workflow data is available. Users can click the button to export the workflow data as a PDF or PowerPoint document.

## Usage

To use the Document Export feature:

1. Navigate to a workflow chat.
2. Complete the workflow to generate data.
3. Click the "Export" button in the chat header.
4. Select the desired export format (PDF or PowerPoint).
5. The document will be generated and opened in a new tab.

## Security

The Document Export feature includes the following security measures:

- Authentication: Only authenticated users can export documents.
- Authorization: Users can only export documents for workflows they have access to.
- Secure Storage: Documents are stored in Firebase Storage with appropriate security rules.

## Future Enhancements

Potential future enhancements for the Document Export feature include:

- Additional export formats (e.g., Word, Excel).
- Customizable templates for different workflow types.
- Branding options for documents (e.g., logo, colors).
- Document sharing and collaboration features.
