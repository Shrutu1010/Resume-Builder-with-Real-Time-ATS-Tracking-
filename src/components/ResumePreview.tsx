import React from 'react';
import { Template, ResumeData } from '../types';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { Eye, Gauge, FileDown } from 'lucide-react';

interface ResumePreviewProps {
  template: Template;
  data: ResumeData;
  atsScore: number;
  fullSize?: boolean;
  onDownload: () => void;
}

export function ResumePreview({ template, data, atsScore, fullSize = false, onDownload }: ResumePreviewProps) {
  const renderTemplate = () => {
    const props = { data, template };
    
    switch (template.id) {
      case 'modern-1':
      case 'modern-2':
        return <ModernTemplate {...props} />;
      case 'classic-1':
      case 'classic-2':
        return <ClassicTemplate {...props} />;
      case 'creative-1':
        return <CreativeTemplate {...props} />;
      case 'minimal-1':
        return <MinimalTemplate {...props} />;
      default:
        return <ModernTemplate {...props} />;
    }
  };

  if (fullSize) {
    return (
      <div id="resume-content-to-print" className="bg-white shadow-2xl">
        {renderTemplate()}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </h3>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Template: {template.name}</span>
          <div className="flex items-center space-x-2">
            <Gauge className="h-4 w-4 text-indigo-600" />
            <span className={`font-medium ${
              atsScore >= 80 ? 'text-emerald-600' : atsScore >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              ATS: {atsScore}%
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 overflow-hidden">
        <div className="transform scale-50 origin-top-left w-[200%] h-auto">
          <div id="resume-content-to-print" className="bg-white shadow-sm" style={{ width: '8.5in', minHeight: '11in' }}>
            {renderTemplate()}
          </div>
        </div>
        
        <div className="mt-4">
          <button
            onClick={onDownload}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <FileDown className="h-4 w-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}