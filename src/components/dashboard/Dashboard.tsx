import React, { useState, useEffect } from 'react';
import { Plus, FileText, Calendar, Trash2, Edit, Eye } from 'lucide-react';
import { SavedResume } from '../../types';
import { storageService } from '../../utils/storage';
import { templates } from '../../data/templates';

interface DashboardProps {
  user: any;
  onCreateNew: () => void;
  onLoadResume: (resume: SavedResume) => void;
  onLogout: () => void;
}

export function Dashboard({ user, onCreateNew, onLoadResume, onLogout }: DashboardProps) {
  const [savedResumes, setSavedResumes] = useState<SavedResume[]>([]);

  useEffect(() => {
    const resumes = storageService.getResumes(user.id);
    setSavedResumes(resumes);
  }, [user.id]);

  const handleDeleteResume = (resumeId: string) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      storageService.deleteResume(user.id, resumeId);
      setSavedResumes(prev => prev.filter(r => r.id !== resumeId));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTemplateName = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    return template?.name || 'Unknown Template';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
              <p className="text-gray-600">Manage your resumes and create new ones</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={onCreateNew}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Create New Resume</span>
              </button>
              <button
                onClick={onLogout}
                className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {savedResumes.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <FileText className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No resumes yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Get started by creating your first professional resume. Choose from our collection of ATS-friendly templates.
            </p>
            <button
              onClick={onCreateNew}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors inline-flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Create Your First Resume</span>
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold text-gray-900">Your Resumes ({savedResumes.length})</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedResumes.map((resume) => (
                <div key={resume.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{resume.name}</h3>
                        <p className="text-sm text-gray-600 mb-1">
                          Template: {getTemplateName(resume.templateId)}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Updated {formatDate(resume.updatedAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => onLoadResume(resume)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm transition-colors flex items-center space-x-1"
                          >
                            <Edit className="h-3 w-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => onLoadResume(resume)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-sm transition-colors flex items-center space-x-1"
                          >
                            <Eye className="h-3 w-3" />
                            <span>View</span>
                          </button>
                        </div>
                        <button
                          onClick={() => handleDeleteResume(resume.id)}
                          className="text-red-600 hover:text-red-700 p-1.5 rounded transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}