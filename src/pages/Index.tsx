
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { RecentDocuments } from '@/components/dashboard/RecentDocuments';
import { QuickActions } from '@/components/dashboard/QuickActions';

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome to Docintel</h1>
              <p className="text-slate-600">Unified document processing and intelligence platform</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <DashboardOverview />
              </div>
              <div>
                <QuickActions />
              </div>
            </div>
            
            <RecentDocuments />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
