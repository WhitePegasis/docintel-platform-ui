
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Play, FileText, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const QuickActions = () => {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button asChild className="w-full justify-start bg-orange-600 hover:bg-orange-700" size="lg">
          <Link to="/upload">
            <Upload className="w-4 h-4 mr-2" />
            Upload Documents
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start border-slate-200" size="lg">
          <Link to="/processing">
            <Play className="w-4 h-4 mr-2" />
            Run Pipeline
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start border-slate-200" size="lg">
          <Link to="/documents">
            <FileText className="w-4 h-4 mr-2" />
            View Documents
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start border-slate-200" size="lg">
          <Link to="/analytics">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Analytics
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
