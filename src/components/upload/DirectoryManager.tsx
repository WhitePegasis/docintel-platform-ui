
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Folder, Plus, FolderOpen } from 'lucide-react';

interface Directory {
  id: string;
  name: string;
  documentCount: number;
  created: string;
}

interface DirectoryManagerProps {
  onSelectDirectory: (directory: Directory) => void;
  selectedDirectory: Directory | null;
}

export const DirectoryManager = ({ onSelectDirectory, selectedDirectory }: DirectoryManagerProps) => {
  const [directories, setDirectories] = useState<Directory[]>([
    { id: '1', name: 'Legal Documents', documentCount: 12, created: '2024-01-15' },
    { id: '2', name: 'Financial Reports', documentCount: 8, created: '2024-01-14' },
  ]);
  const [newDirectoryName, setNewDirectoryName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const createDirectory = () => {
    if (newDirectoryName.trim()) {
      const newDirectory: Directory = {
        id: Math.random().toString(36).substring(7),
        name: newDirectoryName,
        documentCount: 0,
        created: new Date().toISOString().split('T')[0],
      };
      setDirectories(prev => [...prev, newDirectory]);
      setNewDirectoryName('');
      setIsDialogOpen(false);
    }
  };

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-900">Document Directories</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Directory
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Directory</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Directory name"
                  value={newDirectoryName}
                  onChange={(e) => setNewDirectoryName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && createDirectory()}
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={createDirectory} disabled={!newDirectoryName.trim()}>
                    Create
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {directories.map((directory) => (
            <div
              key={directory.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedDirectory?.id === directory.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
              onClick={() => onSelectDirectory(directory)}
            >
              <div className="flex items-center space-x-3 mb-2">
                {selectedDirectory?.id === directory.id ? (
                  <FolderOpen className="w-6 h-6 text-blue-600" />
                ) : (
                  <Folder className="w-6 h-6 text-slate-400" />
                )}
                <h3 className="font-medium text-slate-900">{directory.name}</h3>
              </div>
              <p className="text-sm text-slate-500">
                {directory.documentCount} documents • Created {directory.created}
              </p>
            </div>
          ))}
        </div>
        
        {selectedDirectory && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              Selected directory: <strong>{selectedDirectory.name}</strong>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
