
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const stats = [
  {
    title: 'Total Documents',
    value: '1,247',
    change: '+12%',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Processing',
    value: '23',
    change: '+5%',
    icon: Clock,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    title: 'Completed',
    value: '1,198',
    change: '+8%',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Failed',
    value: '26',
    change: '-3%',
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
];

export const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900">Processing Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-900">OCR Pipeline</span>
              </div>
              <span className="text-xs text-slate-500">Running on 3 documents</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-slate-900">NER Analysis</span>
              </div>
              <span className="text-xs text-slate-500">Completed 12 documents</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium text-slate-900">Classification</span>
              </div>
              <span className="text-xs text-slate-500">Queued: 8 documents</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
