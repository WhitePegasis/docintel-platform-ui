
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, Trash2, Folder, ArrowLeft } from 'lucide-react';

interface Directory {
  id: string;
  name: string;
  documentCount: number;
  created: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploaded: string;
  status: string;
  directoryId: string;
}

const Documents = () => {
  const navigate = useNavigate();
  const [selectedDirectory, setSelectedDirectory] = useState<Directory | null>(null);

  const directories: Directory[] = [
    { id: '1', name: 'Legal Documents', documentCount: 12, created: '2024-01-15' },
    { id: '2', name: 'Financial Reports', documentCount: 8, created: '2024-01-14' },
    { id: '3', name: 'Marketing Materials', documentCount: 5, created: '2024-01-13' },
  ];

  const documents: Document[] = [
    { id: '1', name: 'Contract_2024.pdf', type: 'Legal Document', size: '2.4 MB', uploaded: '2024-01-15', status: 'Processed', directoryId: '1' },
    { id: '2', name: 'Invoice_Q1.pdf', type: 'Invoice', size: '1.8 MB', uploaded: '2024-01-14', status: 'Processing', directoryId: '2' },
    { id: '3', name: 'Report_Annual.docx', type: 'Report', size: '3.2 MB', uploaded: '2024-01-13', status: 'Processed', directoryId: '2' },
    { id: '4', name: 'Agreement_Service.pdf', type: 'Legal Document', size: '1.5 MB', uploaded: '2024-01-12', status: 'Processed', directoryId: '1' },
  ];

  const filteredDocuments = selectedDirectory 
    ? documents.filter(doc => doc.directoryId === selectedDirectory.id)
    : [];

  const handleViewDocument = (documentId: string) => {
    navigate(`/documents/${documentId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-2">
                {selectedDirectory && (
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedDirectory(null)}
                    className="p-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                )}
                <h1 className="text-3xl font-bold text-slate-900">
                  {selectedDirectory ? selectedDirectory.name : 'Documents'}
                </h1>
              </div>
              <p className="text-slate-600">
                {selectedDirectory 
                  ? 'View and manage documents in this directory' 
                  : 'Browse your document directories'
                }
              </p>
            </div>
            
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-900">
                  {selectedDirectory ? 'Documents' : 'Document Directories'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!selectedDirectory ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {directories.map((directory) => (
                      <div
                        key={directory.id}
                        className="p-4 border border-slate-200 rounded-lg cursor-pointer transition-all hover:border-slate-300 hover:bg-slate-50"
                        onClick={() => setSelectedDirectory(directory)}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <Folder className="w-6 h-6 text-blue-600" />
                          <h3 className="font-medium text-slate-900">{directory.name}</h3>
                        </div>
                        <p className="text-sm text-slate-500">
                          {directory.documentCount} documents • Created {directory.created}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredDocuments.map((doc) => (
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
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewDocument(doc.id)}
                          >
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
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Documents;
