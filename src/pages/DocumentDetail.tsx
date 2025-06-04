
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Download, FileText, CheckCircle, Clock, AlertCircle, Minimize2, Maximize2, Copy } from 'lucide-react';
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
  const [isRightPanelMinimized, setIsRightPanelMinimized] = React.useState(false);

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
      output: { 
        type: 'Contract', 
        confidence: 0.94,
        subtypes: ['Service Agreement', 'Consulting Agreement'],
        classification_details: 'Identified as a professional services contract based on language patterns and document structure.'
      }
    },
    {
      id: '2',
      name: 'OCR Processing',
      status: 'completed',
      startTime: '2024-01-15T10:32:15Z',
      endTime: '2024-01-15T10:33:45Z',
      duration: '1m 30s',
      output: { 
        pages: 3, 
        wordsExtracted: 1247,
        confidence: 0.98,
        text_preview: 'AGREEMENT FOR PROFESSIONAL SERVICES\n\nThis Agreement is entered into on January 15, 2024...',
        quality_metrics: {
          clarity: 0.95,
          completeness: 0.97
        }
      }
    },
    {
      id: '3',
      name: 'Text Extraction',
      status: 'completed',
      startTime: '2024-01-15T10:33:45Z',
      endTime: '2024-01-15T10:34:00Z',
      duration: '15s',
      output: { 
        characters: 7832, 
        paragraphs: 12,
        sections: ['Header', 'Scope of Work', 'Compensation', 'Confidentiality', 'Termination'],
        structure_analysis: 'Well-formatted legal document with clear section divisions'
      }
    },
    {
      id: '4',
      name: 'Named Entity Recognition',
      status: 'completed',
      startTime: '2024-01-15T10:34:00Z',
      endTime: '2024-01-15T10:34:30Z',
      duration: '30s',
      output: { 
        entitiesFound: 9, 
        types: ['ORG', 'LOC', 'DATE', 'MONEY'],
        entities: [
          { text: 'TechCorp Inc.', type: 'ORG', confidence: 0.95 },
          { text: 'California', type: 'LOC', confidence: 0.92 },
          { text: 'John Smith Consulting LLC', type: 'ORG', confidence: 0.98 },
          { text: 'January 15, 2024', type: 'DATE', confidence: 0.99 },
          { text: '$150', type: 'MONEY', confidence: 0.94 }
        ]
      }
    },
    {
      id: '5',
      name: 'Document Analysis',
      status: 'completed',
      startTime: '2024-01-15T10:34:30Z',
      endTime: '2024-01-15T10:35:00Z',
      duration: '30s',
      output: { 
        keyPhrases: 15, 
        sentiment: 'neutral',
        risk_score: 0.2,
        compliance_check: 'Passed',
        key_terms: ['Professional Services', 'Confidentiality', 'Payment Terms', 'Termination Clause']
      }
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'running':
        return <Clock className="w-4 h-4 text-orange-600" />;
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
        return 'bg-orange-100 text-orange-700';
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
                  defaultSize={isRightPanelMinimized ? 95 : 60} 
                  minSize={40}
                  maxSize={95}
                  className="bg-slate-100"
                >
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
                
                <ResizableHandle withHandle />
                
                <ResizablePanel 
                  defaultSize={isRightPanelMinimized ? 5 : 40} 
                  minSize={5}
                  maxSize={60}
                  className="bg-white"
                >
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b border-slate-200">
                      <h3 className={`font-medium text-slate-900 ${isRightPanelMinimized ? 'hidden' : ''}`}>
                        Processing Details
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsRightPanelMinimized(!isRightPanelMinimized)}
                        className="p-1"
                      >
                        {isRightPanelMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                      </Button>
                    </div>
                    
                    {!isRightPanelMinimized && (
                      <div className="flex-1 overflow-auto">
                        <Tabs defaultValue="overview" className="h-full">
                          <TabsList className="grid w-full grid-cols-3 m-4 mb-0">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
                            <TabsTrigger value="outputs">Outputs</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="overview" className="p-4 space-y-4">
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Document Status</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-xs text-slate-600">Total Steps:</span>
                                  <span className="text-xs font-medium">{pipelineSteps.length}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs text-slate-600">Completed:</span>
                                  <span className="text-xs font-medium text-green-600">
                                    {pipelineSteps.filter(s => s.status === 'completed').length}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs text-slate-600">Processing Time:</span>
                                  <span className="text-xs font-medium">2m 45s</span>
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Quick Stats</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-xs text-slate-600">Pages:</span>
                                  <span className="text-xs font-medium">3</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs text-slate-600">Words:</span>
                                  <span className="text-xs font-medium">1,247</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs text-slate-600">Entities:</span>
                                  <span className="text-xs font-medium">9</span>
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                          
                          <TabsContent value="pipeline" className="p-4">
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
                                </div>
                              ))}
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="outputs" className="p-4">
                            <Tabs defaultValue="step1" orientation="vertical" className="h-full">
                              <TabsList className="grid grid-cols-1 h-auto mb-4">
                                {pipelineSteps.map((step, index) => (
                                  <TabsTrigger 
                                    key={step.id} 
                                    value={`step${index + 1}`}
                                    className="text-xs justify-start"
                                  >
                                    {step.name}
                                  </TabsTrigger>
                                ))}
                              </TabsList>
                              
                              {pipelineSteps.map((step, index) => (
                                <TabsContent 
                                  key={step.id} 
                                  value={`step${index + 1}`}
                                  className="space-y-3 mt-0"
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium text-slate-900 text-sm">{step.name}</h4>
                                    <Button variant="outline" size="sm">
                                      <Copy className="w-3 h-3 mr-1" />
                                      Copy
                                    </Button>
                                  </div>
                                  
                                  {step.output && (
                                    <div className="bg-slate-50 p-3 rounded-lg">
                                      <pre className="text-xs text-slate-700 whitespace-pre-wrap">
                                        {JSON.stringify(step.output, null, 2)}
                                      </pre>
                                    </div>
                                  )}
                                </TabsContent>
                              ))}
                            </Tabs>
                          </TabsContent>
                        </Tabs>
                      )}
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
