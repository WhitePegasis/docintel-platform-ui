
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, Trash2 } from 'lucide-react';

const Documents = () => {
  const documents = [
    { id: 1, name: 'Contract_2024.pdf', type: 'Legal Document', size: '2.4 MB', uploaded: '2024-01-15', status: 'Processed' },
    { id: 2, name: 'Invoice_Q1.pdf', type: 'Invoice', size: '1.8 MB', uploaded: '2024-01-14', status: 'Processing' },
    { id: 3, name: 'Report_Annual.docx', type: 'Report', size: '3.2 MB', uploaded: '2024-01-13', status: 'Processed' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Documents</h1>
              <p className="text-slate-600">Manage your uploaded documents</p>
            </div>
            
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-900">Document Library</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <FileText className="w-8 h-8 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-slate-900">{doc.name}</h4>
                          <p className="text-sm text-slate-500">{doc.type} • {doc.size} • Uploaded {doc.uploaded}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          doc.status === 'Processed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {doc.status}
                        </span>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Documents;
