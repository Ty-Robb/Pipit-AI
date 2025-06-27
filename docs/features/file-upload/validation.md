# File Upload Validation

This document describes the file upload validation features implemented in the Priority AI application.

## Overview

The file upload validation system provides comprehensive validation for uploaded files, including:

- File type validation
- File size limits
- Error handling with user-friendly messages and suggestions
- Progress indicators for large file uploads

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

File size limits are enforced based on the file type:

- Documents: 25MB
- Spreadsheets: 20MB
- Presentations: 30MB
- Default (other files): 50MB

## Error Handling

The system provides detailed error messages and suggestions for common upload issues:

### Error Types

- `FILE_SIZE_EXCEEDED`: File size exceeds the maximum limit
- `INVALID_FILE_TYPE`: File type is not allowed
- `INVALID_FILENAME`: Filename contains invalid characters
- `EMPTY_FILE`: File is empty
- `UPLOAD_FAILED`: Upload failed due to a server error
- `UPLOAD_CANCELED`: Upload was canceled by the user
- `NETWORK_ERROR`: Network error during upload
- `PERMISSION_DENIED`: User does not have permission to upload
- `AUTHENTICATION_REQUIRED`: User must be logged in to upload
- `PROCESSING_FAILED`: File processing failed
- `QUOTA_EXCEEDED`: Storage quota exceeded
- `UNKNOWN_ERROR`: Unknown error

### User-Friendly Error Messages

Each error type has a user-friendly error message and a suggestion for how to resolve the issue. For example:

- For `FILE_SIZE_EXCEEDED`: "File size exceeds the maximum limit of 25MB" with the suggestion "Try compressing the file or splitting it into smaller parts."
- For `INVALID_FILE_TYPE`: "File type not allowed. Allowed types: pdf, doc, docx, txt, md, csv" with the suggestion "Please convert your file to one of the supported formats."

## Progress Indicators

The system provides progress indicators for large file uploads:

- Progress percentage display
- Color-coded progress bar (blue → yellow → green)
- Status messages during upload and processing

## Implementation Details

### File Validator

The file validator is implemented in `packages/firebase-client/src/utils/file-validator.ts` and provides the following functions:

- `validateFile`: Validates a file against size and type constraints
- `getFileSizeLimit`: Gets the appropriate file size limit based on file type
- `getFileTypeRequirementsText`: Gets a user-friendly description of file type requirements
- `getFileSizeLimitsText`: Gets a user-friendly description of file size limits

### Error Handler

The error handler is implemented in `packages/firebase-client/src/utils/error-handler.ts` and provides the following functions:

- `handleUploadError`: Converts various error types to a standardized format
- `getUserFriendlyErrorMessage`: Gets a user-friendly error message
- `getErrorWithSuggestions`: Gets a user-friendly error message with suggestions

### Storage Service

The storage service is implemented in `packages/firebase-client/src/storage.ts` and provides the following methods:

- `uploadFile`: Uploads a file to Firebase Storage with validation
- `getFileTypeRequirements`: Gets file type requirements as a user-friendly string
- `getFileSizeLimits`: Gets file size limits as a user-friendly string
- `getErrorWithSuggestions`: Gets detailed error information with suggestions

### UI Components

The UI components for file upload validation are implemented in:

- `packages/ui/src/components/drag-drop-zone.tsx`: Drag and drop zone with validation
- `packages/ui/src/components/progress-bar.tsx`: Progress bar for upload progress
- `apps/app/components/upload/upload-component.tsx`: Main upload component with validation UI

## Usage Example

```tsx
import { useStorage } from "../../hooks/use-storage";
import { DragDropZone, ProgressBar } from "@workspace/ui";
import { 
  VECTORIZABLE_FILE_TYPES, 
  VECTORIZABLE_FILE_EXTENSIONS 
} from "@workspace/firebase-client";

function UploadComponent() {
  const { uploadFile, uploadProgress, uploadError } = useStorage();
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const handleFilesDrop = (files: File[]) => {
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setUploadStatus('uploading');
      try {
        await uploadFile(file);
        setUploadStatus('success');
      } catch (error) {
        setUploadStatus('error');
      }
    }
  };

  return (
    <div>
      <DragDropZone
        onFilesDrop={handleFilesDrop}
        maxSize={50 * 1024 * 1024}
        acceptedFileTypes={VECTORIZABLE_FILE_TYPES}
        acceptedFileExtensions={VECTORIZABLE_FILE_EXTENSIONS}
        multiple={false}
      />
      
      {file && (
        <div>
          <p>{file.name}</p>
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
      
      {uploadStatus === 'uploading' && (
        <div>
          <p>Uploading... {uploadProgress}%</p>
          <ProgressBar progress={uploadProgress} />
        </div>
      )}
      
      {uploadStatus === 'error' && (
        <div>
          <p>Error: {uploadError}</p>
        </div>
      )}
    </div>
  );
}
