
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const documents = [
  {
    id: 1,
    name: 'Contract_Agreement_2024.pdf',
    type: 'Contract',
    status: 'completed',
    uploadedAt: '2 hours ago',
    confidence: 95,
  },
  {
    id: 2,
    name: 'Invoice_INV-001.pdf',
    type: 'Invoice',
    status: 'processing',
    uploadedAt: '4 hours ago',
    confidence: null,
  },
  {
    id: 3,
    name: 'Legal_Document_Draft.docx',
    type: 'Legal',
    status: 'failed',
    uploadedAt: '1 day ago',
    confidence: null,
  },
  {
    id: 4,
    name: 'Financial_Report_Q4.pdf',
    type: 'Report',
    status: 'completed',
    uploadedAt: '2 days ago',
    confidence: 89,
  },
  {
    id: 5,
    name: 'Meeting_Notes_Jan.txt',
    type: 'Notes',
    status: 'completed',
    uploadedAt: '3 days ago',
    confidence: 92,
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'processing':
      return <Clock className="w-4 h-4 text-orange-600" />;
    case 'failed':
      return <AlertTriangle className="w-4 h-4 text-red-600" />;
    default:
      return <FileText className="w-4 h-4 text-slate-400" />;
  }
};

const getStatusBadge = (status: string) => {
  const variants = {
    completed: 'bg-green-50 text-green-700 border-green-200',
    processing: 'bg-orange-50 text-orange-700 border-orange-200',
    failed: 'bg-red-50 text-red-700 border-red-200',
  };
  
  return (
    <Badge variant="outline" className={variants[status as keyof typeof variants]}>
      {status}
    </Badge>
  );
};

export const RecentDocuments = () => {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Recent Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center space-x-4">
                {getStatusIcon(doc.status)}
                <div>
                  <h4 className="text-sm font-medium text-slate-900">{doc.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-slate-500">{doc.type}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">{doc.uploadedAt}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {doc.confidence && (
                  <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded">
                    {doc.confidence}% confidence
                  </span>
                )}
                {getStatusBadge(doc.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
