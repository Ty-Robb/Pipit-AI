# File Upload and Vector Search

This feature enables users to upload files, from which the system can extract text content and perform semantic searches using vector embeddings.

## Documentation

- [File Upload Validation](./validation.md) - Detailed documentation on file validation features, error handling, and security rules.

## Components

### Frontend

- **Upload Component**: A React component that provides a user interface for uploading files and viewing upload progress.
- **Search Component**: A component that allows users to search through their uploaded files using natural language queries.
- **useStorage Hook**: A React hook that provides an interface to the file operations API.

### Backend (Genkit Flows)

- **File Processing Flow**: A Genkit flow (`src/ai/flows/process-file.ts`) that is triggered when a file is uploaded. This flow:
  - Extracts text from the uploaded file (PDF, TXT, DOCX).
  - Generates vector embeddings for the extracted text content.
  - Stores the document metadata and embeddings in **Firestore**.
- **File Search Flow**: A Genkit flow (`src/ai/flows/search-files.ts`) that:
  - Takes a user's natural language query as input.
  - Generates an embedding for the query.
  - Performs a vector similarity search against the embeddings stored in Firestore.
  - Returns a list of relevant files.

### Storage

- **Firebase Storage**: Used for secure file storage.
  - Stores the original uploaded files.
  - Provides secure access to files based on user authentication.

## Implementation Details

The file upload and search functionality is implemented as follows:

1. The user uploads a file through the frontend UI.
2. The file is sent to a Next.js API route that uploads it to Firebase Storage.
3. The upload triggers the `process-file` Genkit flow.
4. This flow extracts the text, generates embeddings, and stores the data in Firestore.
5. When a user performs a search, the frontend calls another API route.
6. This route invokes the `search-files` Genkit flow, which performs the vector search and returns the results.

This architecture keeps the AI-related processing within our Genkit framework, ensuring a consistent and maintainable codebase.
