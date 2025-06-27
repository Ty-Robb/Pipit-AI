# File Upload Validation

This document describes the file upload validation features implemented in the Pipit application.

## Overview

The file upload validation system provides comprehensive validation for uploaded files, including:

- File type validation
- File size limits
- Error handling with user-friendly messages and suggestions

## File Type Validation

The system validates file types using both MIME types and file extensions. The following file types are supported:

### Documents
- PDF (application/pdf)
- Word documents (.doc, .docx)
- Text files (.txt)
- Markdown files (.md)
- CSV files (.csv)

### Spreadsheets
- Excel files (.xls, .xlsx)

### Presentations
- PowerPoint files (.ppt, .pptx)

## File Size Limits

File size limits are enforced based on the file type, with a general limit of 50MB.

## Error Handling

The system provides detailed error messages and suggestions for common upload issues:

### Error Types

- `FILE_SIZE_EXCEEDED`: File size exceeds the maximum limit
- `INVALID_FILE_TYPE`: File type is not allowed
- `UPLOAD_FAILED`: Upload failed due to a server error

### User-Friendly Error Messages

Each error type has a user-friendly error message and a suggestion for how to resolve the issue. For example:

- For `FILE_SIZE_EXCEEDED`: "File size exceeds the maximum limit of 50MB."
- For `INVALID_FILE_TYPE`: "File type not allowed. Please upload a supported file type."

## Implementation Details

### Frontend

The file upload component in the frontend is responsible for:
- Providing a user interface for selecting and uploading files.
- Performing basic client-side validation for file type and size.
- Displaying progress indicators and error messages.

### Backend (Genkit Flow)

The backend file processing is handled by a Genkit flow:
- A Next.js API route receives the uploaded file and passes it to the flow.
- The Genkit flow performs final validation and then processes the file (e.g., text extraction, embedding generation).
- The flow stores the processed data in Firestore and the original file in Firebase Storage.

This architecture ensures that all file processing logic is centralized within our Genkit framework, providing a secure and maintainable system.
