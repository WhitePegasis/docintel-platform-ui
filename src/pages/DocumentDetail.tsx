
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, FileText, CheckCircle, Clock, AlertCircle, Minimize2, Maximize2 } from 'lucide-react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

interface PipelineStep {
  id: string;
  name: string;
  status: 'completed' | 'running' | 'failed' | 'pending';
  startTime?: string;
  endTime?: string;
  duration?: string;
  output?: any;
}

const DocumentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLeftPanelMinimized, setIsLeftPanelMinimized] = React.useState(false);

  // Mock document data
  const document = {
    id: id || '1',
    name: 'Contract_Agreement_2024.pdf',
    type: 'Legal Document',
    size: '2.4 MB',
    uploaded: '2024-01-15T10:30:00Z',
    directory: 'Legal Documents',
    status: 'Processed'
  };

  // Mock pipeline data
  const pipelineSteps: PipelineStep[] = [
    {
      id: '1',
      name: 'Document Classification',
      status: 'completed',
      startTime: '2024-01-15T10:32:00Z',
      endTime: '2024-01-15T10:32:15Z',
      duration: '15s',
      output: { type: 'Contract', confidence: 0.94 }
    },
    {
      id: '2',
      name: 'OCR Processing',
      status: 'completed',
      startTime: '2024-01-15T10:32:15Z',
      endTime: '2024-01-15T10:33:45Z',
      duration: '1m 30s',
      output: { pages: 3, wordsExtracted: 1247 }
    },
    {
      id: '3',
      name: 'Text Extraction',
      status: 'completed',
      startTime: '2024-01-15T10:33:45Z',
      endTime: '2024-01-15T10:34:00Z',
      duration: '15s',
      output: { characters: 7832, paragraphs: 12 }
    },
    {
      id: '4',
      name: 'Named Entity Recognition',
      status: 'completed',
      startTime: '2024-01-15T10:34:00Z',
      endTime: '2024-01-15T10:34:30Z',
      duration: '30s',
      output: { entitiesFound: 9, types: ['ORG', 'LOC', 'DATE', 'MONEY'] }
    },
    {
      id: '5',
      name: 'Document Analysis',
      status: 'completed',
      startTime: '2024-01-15T10:34:30Z',
      endTime: '2024-01-15T10:35:00Z',
      duration: '30s',
      output: { keyPhrases: 15, sentiment: 'neutral' }
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'running':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'running':
        return 'bg-blue-100 text-blue-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 ml-64">
          <div className="p-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/documents')}
                  className="p-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-orange-600" />
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900">{document.name}</h1>
                    <p className="text-slate-600">{document.directory} • {document.type} • {document.size}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge className={getStatusColor(document.status.toLowerCase())}>
                  {document.status}
                </Badge>
                <span className="text-sm text-slate-500">
                  Uploaded {new Date(document.uploaded).toLocaleString()}
                </span>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>

            {/* Resizable Layout */}
            <div className="h-[calc(100vh-280px)] border border-slate-200 rounded-lg overflow-hidden">
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel 
                  defaultSize={isLeftPanelMinimized ? 5 : 40} 
                  minSize={5}
                  maxSize={60}
                  className="bg-white"
                >
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b border-slate-200">
                      <h3 className={`font-medium text-slate-900 ${isLeftPanelMinimized ? 'hidden' : ''}`}>
                        Processing Pipeline
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsLeftPanelMinimized(!isLeftPanelMinimized)}
                        className="p-1"
                      >
                        {isLeftPanelMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                      </Button>
                    </div>
                    
                    {!isLeftPanelMinimized && (
                      <div className="flex-1 overflow-auto p-4">
                        <div className="space-y-3">
                          {pipelineSteps.map((step, index) => (
                            <div key={step.id} className="p-3 border border-slate-200 rounded-lg">
                              <div className="flex items-center space-x-3 mb-2">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                                  {index + 1}
                                </div>
                                {getStatusIcon(step.status)}
                                <div className="flex-1">
                                  <h4 className="font-medium text-slate-900 text-sm">{step.name}</h4>
                                  {step.duration && (
                                    <p className="text-xs text-slate-500">{step.duration}</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <Badge className={`text-xs ${getStatusColor(step.status)}`}>
                                  {step.status}
                                </Badge>
                              </div>
                              {step.output && (
                                <div className="mt-2 text-xs text-slate-500">
                                  {Object.entries(step.output).map(([key, value]) => (
                                    <div key={key}>{key}: {typeof value === 'number' ? value.toLocaleString() : String(value)}</div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </ResizablePanel>
                
                <ResizableHandle withHandle />
                
                <ResizablePanel defaultSize={isLeftPanelMinimized ? 95 : 60} className="bg-slate-100">
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white">
                      <h3 className="font-medium text-slate-900">Document Viewer</h3>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Zoom In
                        </Button>
                        <Button variant="outline" size="sm">
                          Zoom Out
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex-1 p-4">
                      <div className="w-full h-full bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-center">
                        <iframe
                          src="/placeholder.pdf"
                          className="w-full h-full rounded-lg"
                          title={document.name}
                        />
                      </div>
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocumentDetail;
