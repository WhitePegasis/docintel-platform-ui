
import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { DirectoryManager } from '@/components/upload/DirectoryManager';
import { DocumentUpload } from '@/components/upload/DocumentUpload';

interface Directory {
  id: string;
  name: string;
  documentCount: number;
  created: string;
}

const Upload = () => {
  const [selectedDirectory, setSelectedDirectory] = useState<Directory | null>(null);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Upload Documents</h1>
              <p className="text-slate-600">Create directories and upload your documents</p>
            </div>
            
            <div className="space-y-6">
              <DirectoryManager 
                onSelectDirectory={setSelectedDirectory}
                selectedDirectory={selectedDirectory}
              />
              <DocumentUpload selectedDirectory={selectedDirectory} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Upload;
