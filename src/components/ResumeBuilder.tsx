import React, { useState } from 'react';
import { ResumeData } from '../types';
import { PersonalInfoSection } from './builder/PersonalInfoSection';
import { SummarySection } from './builder/SummarySection';
import { ExperienceSection } from './builder/ExperienceSection';
import { EducationSection } from './builder/EducationSection';
import { SkillsSection } from './builder/SkillsSection';
import { CertificationsSection } from './builder/CertificationsSection';
import { User, FileText, Briefcase, GraduationCap, Award, Settings, FileDown } from 'lucide-react';

interface ResumeBuilderProps {
  resumeData: ResumeData;
  onDataChange: (data: ResumeData) => void;
  onPreview: () => void;
  onBack: () => void;
  onDownload: () => void;
}

const sections = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'summary', label: 'Professional Summary', icon: FileText },
  { id: 'experience', label: 'Work Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Settings },
  { id: 'certifications', label: 'Certifications', icon: Award },
];

export function ResumeBuilder({ resumeData, onDataChange, onPreview, onBack, onDownload }: ResumeBuilderProps) {
  const [activeSection, setActiveSection] = useState('personal');

  const handleDataUpdate = (section: keyof ResumeData, data: any) => {
    onDataChange({ ...resumeData, [section]: data });
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoSection
            data={resumeData.personalInfo}
            onChange={(data) => handleDataUpdate('personalInfo', data)}
          />
        );
      case 'summary':
        return (
          <SummarySection
            data={resumeData.summary}
            onChange={(data) => handleDataUpdate('summary', data)}
          />
        );
      case 'experience':
        return (
          <ExperienceSection
            data={resumeData.experience}
            onChange={(data) => handleDataUpdate('experience', data)}
          />
        );
      case 'education':
        return (
          <EducationSection
            data={resumeData.education}
            onChange={(data) => handleDataUpdate('education', data)}
          />
        );
      case 'skills':
        return (
          <SkillsSection
            data={resumeData.skills}
            onChange={(data) => handleDataUpdate('skills', data)}
          />
        );
      case 'certifications':
        return (
          <CertificationsSection
            data={resumeData.certifications}
            onChange={(data) => handleDataUpdate('certifications', data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between p-6">
          <h2 className="text-2xl font-bold text-gray-900">Build Your Resume</h2>
          <div className="flex space-x-3">
            <button
              onClick={onBack}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to Dashboard
            </button>
            <button
              onClick={onPreview}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Preview Resume
            </button>
            <button
              onClick={onDownload}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <FileDown className="h-4 w-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
        
        <div className="flex overflow-x-auto">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 whitespace-nowrap transition-colors ${
                  activeSection === section.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {renderActiveSection()}
      </div>
    </div>
  );
}