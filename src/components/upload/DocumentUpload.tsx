
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadedFile {
  file: File;
  id: string;
  progress: number;
}

interface Directory {
  id: string;
  name: string;
  documentCount: number;
  created: string;
}

interface DocumentUploadProps {
  selectedDirectory: Directory | null;
}

export const DocumentUpload = ({ selectedDirectory }: DocumentUploadProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!selectedDirectory) return;
    
    const newFiles = acceptedFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substring(7),
      progress: 0,
    }));
    
    setUploadedFiles((prev) => [...prev, ...newFiles]);
    
    // Simulate upload progress
    newFiles.forEach((uploadFile) => {
      const interval = setInterval(() => {
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id
              ? { ...f, progress: Math.min(f.progress + 10, 100) }
              : f
          )
        );
      }, 200);
      
      setTimeout(() => clearInterval(interval), 2000);
    });
  }, [selectedDirectory]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    multiple: true,
    disabled: !selectedDirectory,
  });

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  if (!selectedDirectory) {
    return (
      <Card className="border-slate-200">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            Select a Directory
          </h3>
          <p className="text-slate-600">
            Please select or create a directory above to upload documents
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-slate-900 mb-1">
              Upload to: {selectedDirectory.name}
            </h3>
            <p className="text-sm text-slate-500">
              Documents will be added to this directory
            </p>
          </div>
          
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragActive
                ? "border-blue-400 bg-blue-50"
                : "border-slate-300 hover:border-slate-400"
            )}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              {isDragActive ? "Drop files here" : "Upload documents"}
            </h3>
            <p className="text-slate-600 mb-4">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-sm text-slate-500">
              Supports PDF, DOC, DOCX, TXT, and image files up to 10MB
            </p>
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <Card className="border-slate-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-slate-900 mb-4">Uploaded Files</h3>
            <div className="space-y-3">
              {uploadedFiles.map((uploadFile) => (
                <div key={uploadFile.id} className="flex items-center space-x-4 p-3 border border-slate-200 rounded-lg">
                  <FileText className="w-5 h-5 text-slate-400" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-900">
                        {uploadFile.file.name}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(uploadFile.id)}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadFile.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">
                        {uploadFile.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
