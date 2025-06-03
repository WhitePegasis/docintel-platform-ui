
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { DocumentUpload } from '@/components/upload/DocumentUpload';

const Upload = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Upload Documents</h1>
              <p className="text-slate-600">Upload and process your documents</p>
            </div>
            
            <DocumentUpload />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Upload;
