
import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Header = () => {
  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 fixed w-full top-0 z-50">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="text-xl font-bold text-slate-900">Docintel</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 max-w-md w-full mx-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input 
            placeholder="Search documents..." 
            className="pl-10 bg-slate-50 border-slate-200"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </Button>
        <Button variant="ghost" size="sm">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};
