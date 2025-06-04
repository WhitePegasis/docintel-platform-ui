
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Download, FileText, CheckCircle, Clock, AlertCircle, Copy } from 'lucide-react';

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

  // Mock document content
  const mockDocument = {
    rawText: `AGREEMENT FOR PROFESSIONAL SERVICES

This Agreement is entered into on January 15, 2024, between TechCorp Inc., a corporation organized under the laws of California ("Company"), and John Smith Consulting LLC, a limited liability company organized under the laws of Delaware ("Consultant").

1. SCOPE OF WORK
Consultant agrees to provide software development consulting services to Company for the period beginning February 1, 2024, and ending December 31, 2024.

2. COMPENSATION
Company agrees to pay Consultant $150 per hour for services rendered under this Agreement. Payment shall be made within 30 days of receipt of invoice.

3. CONFIDENTIALITY
Both parties acknowledge that they may have access to confidential information and agree to maintain such information in strict confidence.`,
    entities: [
      { text: 'TechCorp Inc.', type: 'ORG', start: 95, end: 108, confidence: 0.95 },
      { text: 'California', type: 'LOC', start: 155, end: 165, confidence: 0.92 },
      { text: 'John Smith Consulting LLC', type: 'ORG', start: 188, end: 213, confidence: 0.98 },
      { text: 'Delaware', type: 'LOC', start: 275, end: 283, confidence: 0.89 },
      { text: 'January 15, 2024', type: 'DATE', start: 65, end: 81, confidence: 0.99 },
      { text: 'February 1, 2024', type: 'DATE', start: 450, end: 466, confidence: 0.97 },
      { text: 'December 31, 2024', type: 'DATE', start: 485, end: 503, confidence: 0.96 },
      { text: '$150', type: 'MONEY', start: 590, end: 594, confidence: 0.94 },
      { text: '30 days', type: 'DATE', start: 670, end: 677, confidence: 0.91 },
    ],
    classification: {
      type: 'Contract',
      confidence: 0.94,
      subtypes: ['Service Agreement', 'Consulting Agreement'],
    },
    metadata: {
      pages: 3,
      words: 1247,
      characters: 7832,
      uploadedAt: '2024-01-20T10:30:00Z',
      processedAt: '2024-01-20T10:32:15Z',
    },
  };

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

  const highlightText = (text: string, entities: any[]) => {
    let lastIndex = 0;
    const parts = [];

    entities
      .sort((a, b) => a.start - b.start)
      .forEach((entity, index) => {
        // Add text before entity
        if (entity.start > lastIndex) {
          parts.push(text.slice(lastIndex, entity.start));
        }

        // Add highlighted entity
        parts.push(
          <span
            key={index}
            className={`px-1 py-0.5 rounded cursor-pointer transition-colors ${
              getEntityColor(entity.type)
            }`}
            title={`${entity.type} (${Math.round(entity.confidence * 100)}%)`}
          >
            {entity.text}
          </span>
        );

        lastIndex = entity.end;
      });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  const getEntityColor = (type: string) => {
    const colors = {
      ORG: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      LOC: 'bg-green-100 text-green-800 hover:bg-green-200',
      DATE: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
      MONEY: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      PERSON: 'bg-pink-100 text-pink-800 hover:bg-pink-200',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  };

  const entityGroups = mockDocument.entities.reduce((acc, entity) => {
    if (!acc[entity.type]) acc[entity.type] = [];
    acc[entity.type].push(entity);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
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

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* PDF Viewer - Left Side */}
              <div>
                <Card className="border-slate-200 h-[800px]">
                  <CardHeader>
                    <CardTitle className="text-slate-900">Document Viewer</CardTitle>
                  </CardHeader>
                  <CardContent className="h-full p-6">
                    <div className="w-full h-full bg-slate-100 rounded-lg flex items-center justify-center">
                      <iframe
                        src="/placeholder.pdf"
                        className="w-full h-full rounded-lg"
                        title="PDF Document"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tabbed Details - Right Side */}
              <div>
                <Card className="border-slate-200">
                  <CardContent className="p-6">
                    <Tabs defaultValue="pipeline" className="w-full">
                      <TabsList className="grid w-full grid-cols-5 mb-4">
                        <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
                        <TabsTrigger value="annotated">Annotated</TabsTrigger>
                        <TabsTrigger value="raw">Raw Text</TabsTrigger>
                        <TabsTrigger value="entities">Entities</TabsTrigger>
                        <TabsTrigger value="metadata">Metadata</TabsTrigger>
                      </TabsList>

                      <TabsContent value="pipeline" className="space-y-4">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-slate-900">Processing Pipeline</h3>
                          {pipelineSteps.map((step, index) => (
                            <div key={step.id} className="flex items-center space-x-4 p-4 border border-slate-200 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-medium">
                                  {index + 1}
                                </div>
                                {getStatusIcon(step.status)}
                                <div>
                                  <h4 className="font-medium text-slate-900">{step.name}</h4>
                                  {step.duration && (
                                    <p className="text-sm text-slate-500">Duration: {step.duration}</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex-1" />
                              <div className="text-right">
                                <Badge className={getStatusColor(step.status)}>
                                  {step.status}
                                </Badge>
                                {step.output && (
                                  <div className="mt-1 text-xs text-slate-500">
                                    {Object.entries(step.output).map(([key, value]) => (
                                      <div key={key}>{key}: {typeof value === 'number' ? value.toLocaleString() : String(value)}</div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="annotated" className="space-y-4">
                        <div className="bg-slate-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                          <div className="text-sm leading-relaxed whitespace-pre-wrap">
                            {highlightText(mockDocument.rawText, mockDocument.entities)}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="raw" className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-slate-900">Raw Text</h3>
                          <Button variant="outline" size="sm">
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </Button>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                          <pre className="text-sm whitespace-pre-wrap text-slate-700">
                            {mockDocument.rawText}
                          </pre>
                        </div>
                      </TabsContent>

                      <TabsContent value="entities" className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900">Named Entities</h3>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          {Object.entries(entityGroups).map(([type, entities]) => (
                            <div key={type} className="border border-slate-200 rounded-lg p-4">
                              <h4 className="font-medium text-slate-900 mb-3">{type}</h4>
                              <div className="flex flex-wrap gap-2">
                                {entities.map((entity, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className={getEntityColor(entity.type)}
                                  >
                                    {entity.text} ({Math.round(entity.confidence * 100)}%)
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="metadata" className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900">Document Metadata</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div>
                              <span className="text-sm font-medium text-slate-600">Classification:</span>
                              <div className="mt-1">
                                <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                                  {mockDocument.classification.type} ({Math.round(mockDocument.classification.confidence * 100)}%)
                                </Badge>
                              </div>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-slate-600">Pages:</span>
                              <p className="text-sm text-slate-900">{mockDocument.metadata.pages}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-slate-600">Words:</span>
                              <p className="text-sm text-slate-900">{mockDocument.metadata.words.toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <span className="text-sm font-medium text-slate-600">Characters:</span>
                              <p className="text-sm text-slate-900">{mockDocument.metadata.characters.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-slate-600">Uploaded:</span>
                              <p className="text-sm text-slate-900">{new Date(mockDocument.metadata.uploadedAt).toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-slate-600">Processed:</span>
              <p className="text-sm text-slate-900">{new Date(mockDocument.metadata.processedAt).toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocumentDetail;
