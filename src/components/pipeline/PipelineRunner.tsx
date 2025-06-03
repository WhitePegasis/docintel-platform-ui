
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Play, Clock, CheckCircle, AlertCircle, Folder } from 'lucide-react';

interface PipelineStep {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  status: 'idle' | 'running' | 'completed' | 'error';
  dependencies?: string[];
}

interface Directory {
  id: string;
  name: string;
  documentCount: number;
}

const initialSteps: PipelineStep[] = [
  {
    id: 'classification',
    name: 'Document Classification',
    description: 'Automatically classify documents by type',
    enabled: true,
    status: 'idle',
  },
  {
    id: 'ocr',
    name: 'OCR (Text Extraction)',
    description: 'Extract text from images and scanned documents',
    enabled: true,
    status: 'idle',
    dependencies: ['classification'],
  },
  {
    id: 'ner',
    name: 'Named Entity Recognition',
    description: 'Identify and extract entities like names, dates, locations',
    enabled: true,
    status: 'idle',
    dependencies: ['ocr'],
  },
  {
    id: 'analysis',
    name: 'Document Analysis',
    description: 'Advanced analysis and insights extraction',
    enabled: false,
    status: 'idle',
    dependencies: ['ner'],
  },
];

const availableDirectories: Directory[] = [
  { id: '1', name: 'Legal Documents', documentCount: 12 },
  { id: '2', name: 'Financial Reports', documentCount: 8 },
  { id: '3', name: 'Contracts', documentCount: 15 },
];

export const PipelineRunner = () => {
  const [steps, setSteps] = useState<PipelineStep[]>(initialSteps);
  const [selectedDirectories, setSelectedDirectories] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const toggleStep = (stepId: string) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === stepId ? { ...step, enabled: !step.enabled } : step
      )
    );
  };

  const toggleDirectory = (directoryId: string) => {
    setSelectedDirectories((prev) =>
      prev.includes(directoryId)
        ? prev.filter((id) => id !== directoryId)
        : [...prev, directoryId]
    );
  };

  const runPipeline = async () => {
    if (selectedDirectories.length === 0) return;
    
    setIsRunning(true);
    const enabledSteps = steps.filter((step) => step.enabled);
    
    for (const step of enabledSteps) {
      setSteps((prev) =>
        prev.map((s) => (s.id === step.id ? { ...s, status: 'running' } : s))
      );
      
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setSteps((prev) =>
        prev.map((s) => (s.id === step.id ? { ...s, status: 'completed' } : s))
      );
    }
    
    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Clock className="w-4 h-4 text-orange-600 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      idle: 'bg-slate-50 text-slate-700 border-slate-200',
      running: 'bg-orange-50 text-orange-700 border-orange-200',
      completed: 'bg-green-50 text-green-700 border-green-200',
      error: 'bg-red-50 text-red-700 border-red-200',
    };
    
    return (
      <Badge variant="outline" className={variants[status as keyof typeof variants]}>
        {status}
      </Badge>
    );
  };

  const canRunPipeline = selectedDirectories.length > 0 && steps.some((s) => s.enabled) && !isRunning;

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900">Select Directories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {availableDirectories.map((directory) => (
              <div key={directory.id} className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg">
                <Checkbox
                  id={directory.id}
                  checked={selectedDirectories.includes(directory.id)}
                  onCheckedChange={() => toggleDirectory(directory.id)}
                  disabled={isRunning}
                />
                <Folder className="w-5 h-5 text-slate-400" />
                <div className="flex-1">
                  <label
                    htmlFor={directory.id}
                    className="text-sm font-medium text-slate-900 cursor-pointer"
                  >
                    {directory.name}
                  </label>
                  <p className="text-xs text-slate-500">{directory.documentCount} documents</p>
                </div>
              </div>
            ))}
          </div>
          
          {selectedDirectories.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                Selected {selectedDirectories.length} directories for processing
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-900">Pipeline Configuration</CardTitle>
            <Button
              onClick={runPipeline}
              disabled={!canRunPipeline}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Play className="w-4 h-4 mr-2" />
              {isRunning ? 'Running...' : 'Run Pipeline'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="p-4 border border-slate-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Switch
                    checked={step.enabled}
                    onCheckedChange={() => toggleStep(step.id)}
                    disabled={isRunning}
                  />
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">{step.name}</h4>
                    <p className="text-xs text-slate-500">{step.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(step.status)}
                  {getStatusBadge(step.status)}
                </div>
              </div>
              
              {step.dependencies && (
                <div className="text-xs text-slate-500">
                  Dependencies: {step.dependencies.join(', ')}
                </div>
              )}
              
              {index < steps.length - 1 && step.enabled && (
                <div className="flex justify-center mt-3">
                  <div className="w-px h-4 bg-slate-300"></div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
