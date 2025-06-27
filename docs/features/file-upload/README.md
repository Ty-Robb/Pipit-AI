# File Upload and Vector Search

This feature enables users to upload files, extract text content, and perform semantic searches using vector embeddings.

## Documentation

- [File Upload Validation](./validation.md) - Detailed documentation on file validation features, error handling, and security rules

## Components

### Frontend

- **Upload Page**: Located at `/upload`, this page provides a user interface for:
  - Uploading files with progress indication
  - Searching through uploaded files using natural language queries
  - Viewing and managing recently uploaded files

- **useStorage Hook**: A React hook that provides file operations:
  - `uploadFile`: Upload a file to storage
  - `searchFiles`: Search for files using vector similarity
  - `getRecentFiles`: Get a list of recently uploaded files
  - `deleteFile`: Delete a file from storage

### Backend

- **FastAPI Server**: Handles file processing and vector search:
  - Extracts text from uploaded files
  - Generates vector embeddings for semantic search
  - Stores document metadata and embeddings in MongoDB
  - Provides search endpoints for vector similarity queries

- **Firebase Storage**: Used for secure file storage:
  - Stores the original uploaded files
  - Provides secure access to files based on user authentication
  - Handles file deletion and management

## Implementation Details

### Mock Implementation

For development purposes, the current implementation uses mock data:

- The `useStorage` hook provides mock implementations of all file operations
- Mock files are generated with sample content
- Search results are simulated based on the query

### Production Implementation

For production, the mock implementations should be replaced with actual API calls to:

1. Upload files to Firebase Storage
2. Process files through the FastAPI backend
3. Store vector embeddings in MongoDB
4. Perform real semantic searches using vector similarity

## Usage

To use the file upload and search functionality:

1. Navigate to `/upload` in the application
2. Upload files using the file input
3. Search for content using natural language queries
4. View and manage uploaded files in the recent files section

## Future Enhancements

- Add support for more file types (currently supports PDF, text, and documents)
- Implement batch uploading for multiple files
- Add advanced search filters (date range, file type, etc.)
- Improve vector search accuracy with fine-tuned embeddings
- Add file categorization and tagging
- Implement virus scanning for uploaded files
- Add content analysis for sensitive information detection
- Implement user-specific upload quotas
- Add support for resumable uploads for very large files
