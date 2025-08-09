import React from 'react';
import { Template } from '../types';
import { CheckCircle, Palette, Users, Star } from 'lucide-react';

interface TemplateGalleryProps {
  templates: Template[];
  onSelectTemplate: (template: Template) => void;
}

const categoryIcons = {
  modern: <Palette className="h-5 w-5" />,
  classic: <Users className="h-5 w-5" />,
  creative: <Star className="h-5 w-5" />,
  minimal: <CheckCircle className="h-5 w-5" />,
};

export function TemplateGallery({ templates, onSelectTemplate }: TemplateGalleryProps) {
  const categories = Array.from(new Set(templates.map(t => t.category)));

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Resume Template
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select from our collection of professionally designed, ATS-friendly templates. 
          Each template is crafted to help you stand out while passing automated screening systems.
        </p>
      </div>

      {categories.map(category => (
        <div key={category} className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="text-indigo-600">
              {categoryIcons[category]}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 capitalize">
              {category} Templates
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates
              .filter(template => template.category === category)
              .map(template => (
                <div
                  key={template.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => onSelectTemplate(template)}
                >
                  <div 
                    className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden"
                    style={{ backgroundColor: template.color }}
                  >
                    <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 relative overflow-hidden">
                          <div className="absolute top-3 left-3 right-3 h-2 bg-gray-300 rounded"></div>
                          <div className="absolute top-7 left-3 right-8 h-1.5 bg-gray-300 rounded"></div>
                          <div className="absolute top-12 left-3 right-3 h-6 bg-gray-400 rounded"></div>
                          <div className="absolute bottom-8 left-3 right-3 space-y-1">
                            <div className="h-1 bg-gray-300 rounded"></div>
                            <div className="h-1 bg-gray-300 rounded w-4/5"></div>
                            <div className="h-1 bg-gray-300 rounded w-3/5"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {template.name}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">
                      {template.description}
                    </p>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                      Use This Template
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}