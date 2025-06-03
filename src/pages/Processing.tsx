
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { PipelineRunner } from '@/components/pipeline/PipelineRunner';

const Processing = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Processing Pipeline</h1>
              <p className="text-slate-600">Configure and run document processing pipelines</p>
            </div>
            
            <PipelineRunner />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Processing;
