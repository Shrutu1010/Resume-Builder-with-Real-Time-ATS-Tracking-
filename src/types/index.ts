export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  graduationDate: string;
  gpa?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  certifications: Certification[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'modern' | 'classic' | 'creative' | 'minimal';
  color: string;
}

export interface ATSFeedback {
  category: string;
  score: number;
  maxScore: number;
  feedback: string[];
  suggestions: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface SavedResume {
  id: string;
  userId: string;
  name: string;
  data: ResumeData;
  templateId: string;
  createdAt: string;
  updatedAt: string;
}