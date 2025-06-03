
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Copy } from 'lucide-react';

const mockDocument = {
  id: '1',
  name: 'Contract_Agreement_2024.pdf',
  type: 'Contract',
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

export const DocumentViewer = () => {
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);

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
            } ${selectedEntity === entity.text ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setSelectedEntity(entity.text)}
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">{mockDocument.name}</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <Tabs defaultValue="annotated" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="annotated">Annotated</TabsTrigger>
                <TabsTrigger value="raw">Raw Text</TabsTrigger>
                <TabsTrigger value="entities">Entities</TabsTrigger>
                <TabsTrigger value="metadata">Metadata</TabsTrigger>
              </TabsList>

              <TabsContent value="annotated" className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {highlightText(mockDocument.rawText, mockDocument.entities)}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="raw" className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <pre className="text-sm whitespace-pre-wrap text-slate-700">
                    {mockDocument.rawText}
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="entities" className="space-y-4">
                <div className="space-y-4">
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

      <div className="space-y-4">
        <Card className="border-slate-200">
          <CardContent className="p-4">
            <h3 className="font-medium text-slate-900 mb-3">Classification</h3>
            <div className="space-y-2">
              <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                {mockDocument.classification.type}
              </Badge>
              <p className="text-xs text-slate-500">
                Confidence: {Math.round(mockDocument.classification.confidence * 100)}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-4">
            <h3 className="font-medium text-slate-900 mb-3">Entity Legend</h3>
            <div className="space-y-2">
              {Object.keys(entityGroups).map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded ${getEntityColor(type).split(' ')[0]}`}></div>
                  <span className="text-xs text-slate-600">{type}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
