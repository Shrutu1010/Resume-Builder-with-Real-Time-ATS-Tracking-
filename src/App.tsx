import React, { useState } from 'react';
import { LoginForm } from './components/auth/LoginForm';
import { Dashboard } from './components/dashboard/Dashboard';
import { Header } from './components/Header';
import { TemplateGallery } from './components/TemplateGallery';
import { ResumeBuilder } from './components/ResumeBuilder';
import { ATSAnalyzer } from './components/ATSAnalyzer';
import { ResumePreview } from './components/ResumePreview';
import { templates } from './data/templates';
import { ResumeData, Template, SavedResume } from './types';
import { generatePDF, generateFilename } from './utils/pdfGenerator';
import { authService } from './utils/auth';
import { storageService } from './utils/storage';

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  certifications: [],
};

function App() {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [currentStep, setCurrentStep] = useState<'dashboard' | 'templates' | 'builder' | 'preview'>('dashboard');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const [atsScore, setAtsScore] = useState<number>(0);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setCurrentStep('dashboard');
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setCurrentStep('dashboard');
    setResumeData(initialResumeData);
    setSelectedTemplate(null);
    setCurrentResumeId(null);
  };

  const handleCreateNew = () => {
    setResumeData(initialResumeData);
    setSelectedTemplate(null);
    setCurrentResumeId(null);
    setCurrentStep('templates');
  };

  const handleLoadResume = (resume: SavedResume) => {
    setResumeData(resume.data);
    const template = templates.find(t => t.id === resume.templateId);
    if (template) {
      setSelectedTemplate(template);
    }
    setCurrentResumeId(resume.id);
    setCurrentStep('builder');
  };

  const handleDownloadPDF = async () => {
    try {
      const filename = generateFilename(resumeData.personalInfo);
      await generatePDF('resume-content-to-print', filename);
    } catch (error) {
      alert('Failed to download PDF. Please try again.');
    }
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setCurrentStep('builder');
  };

  const handleDataChange = (data: ResumeData) => {
    setResumeData(data);
    
    // Auto-save if user is editing an existing resume
    if (user && currentResumeId && selectedTemplate) {
      storageService.updateResume(user.id, currentResumeId, data, selectedTemplate.id);
    }
  };

  const handlePreview = () => {
    setCurrentStep('preview');
  };

  const handleBack = () => {
    if (currentStep === 'preview') {
      setCurrentStep('builder');
    } else if (currentStep === 'builder') {
      // Save resume before going back
      if (user && selectedTemplate) {
        if (currentResumeId) {
          storageService.updateResume(user.id, currentResumeId, resumeData, selectedTemplate.id);
        } else {
          const savedResume = storageService.saveResume(user.id, resumeData, selectedTemplate.id);
          setCurrentResumeId(savedResume.id);
        }
      }
      setCurrentStep('dashboard');
    } else if (currentStep === 'templates') {
      setCurrentStep('dashboard');
    }
  };

  // Show login form if user is not authenticated
  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentStep !== 'dashboard' && <Header />}
      
      <main className="container mx-auto px-4 py-8">
        {currentStep === 'dashboard' && (
          <Dashboard
            user={user}
            onCreateNew={handleCreateNew}
            onLoadResume={handleLoadResume}
            onLogout={handleLogout}
          />
        )}

        {currentStep === 'templates' && (
          <TemplateGallery
            templates={templates}
            onSelectTemplate={handleTemplateSelect}
          />
        )}

        {currentStep === 'builder' && selectedTemplate && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2">
              <ResumeBuilder
                resumeData={resumeData}
                onDataChange={handleDataChange}
                onPreview={handlePreview}
                onBack={handleBack}
                onDownload={handleDownloadPDF}
              />
              <div className="mt-8">
                <ATSAnalyzer
                  resumeData={resumeData}
                  onScoreUpdate={setAtsScore}
                />
              </div>
            </div>
            <div className="xl:col-span-1">
              <div className="sticky top-8">
                <ResumePreview
                  template={selectedTemplate}
                  data={resumeData}
                  atsScore={atsScore}
                  onDownload={handleDownloadPDF}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 'preview' && selectedTemplate && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handleBack}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Back to Dashboard
              </button>
              <button 
                onClick={handleDownloadPDF}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Download PDF
              </button>
            </div>
            <ResumePreview
              template={selectedTemplate}
              data={resumeData}
              atsScore={atsScore}
              fullSize
              onDownload={handleDownloadPDF}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;