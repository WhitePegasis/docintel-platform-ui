
import React, { useState } from 'react';
import { Home, Upload, FileText, Search, BarChart3, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Upload, label: 'Upload', path: '/upload' },
  { icon: FileText, label: 'Documents', path: '/documents' },
  { icon: Search, label: 'Processing', path: '/processing' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
  const location = useLocation();
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <aside className={cn(
      "bg-white border-r border-slate-200 h-screen fixed left-0 top-16 z-40 transition-all duration-300",
      isMinimized ? "w-16" : "w-64"
    )}>
      <div className="p-4">
        {/* Minimize/Maximize Button */}
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2"
          >
            {isMinimized ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={cn(
                "w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors",
                isMinimized ? "justify-center" : "space-x-3",
                location.pathname === item.path
                  ? "bg-orange-50 text-orange-700 border border-orange-200" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
              title={isMinimized ? item.label : undefined}
            >
              <item.icon className="w-5 h-5" />
              {!isMinimized && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};
