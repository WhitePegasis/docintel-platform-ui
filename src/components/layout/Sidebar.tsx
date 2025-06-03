
import React from 'react';
import { Home, Upload, FileText, Search, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: Upload, label: 'Upload', active: false },
  { icon: FileText, label: 'Documents', active: false },
  { icon: Search, label: 'Processing', active: false },
  { icon: BarChart3, label: 'Analytics', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-16 z-40">
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors",
              item.active 
                ? "bg-blue-50 text-blue-700 border border-blue-200" 
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};
