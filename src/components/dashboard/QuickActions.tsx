
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Play, FileText, BarChart3 } from 'lucide-react';

export const QuickActions = () => {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700" size="lg">
          <Upload className="w-4 h-4 mr-2" />
          Upload Documents
        </Button>
        <Button variant="outline" className="w-full justify-start border-slate-200" size="lg">
          <Play className="w-4 h-4 mr-2" />
          Run Pipeline
        </Button>
        <Button variant="outline" className="w-full justify-start border-slate-200" size="lg">
          <FileText className="w-4 h-4 mr-2" />
          Create Template
        </Button>
        <Button variant="outline" className="w-full justify-start border-slate-200" size="lg">
          <BarChart3 className="w-4 h-4 mr-2" />
          View Analytics
        </Button>
      </CardContent>
    </Card>
  );
};
