import React from 'react';
import { FileText, Target, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ResumeBuilder Pro</h1>
              <p className="text-sm text-gray-600">Create ATS-optimized resumes</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Target className="h-4 w-4 text-emerald-600" />
              <span>ATS Optimized</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span>Professional Templates</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}