import { ResumeData, SavedResume } from '../types';

class StorageService {
  private getStorageKey(userId: string): string {
    return `resumeBuilder_resumes_${userId}`;
  }

  saveResume(userId: string, resumeData: ResumeData, templateId: string, name?: string): SavedResume {
    const resumes = this.getResumes(userId);
    
    const savedResume: SavedResume = {
      id: Date.now().toString(),
      userId,
      name: name || `Resume ${resumes.length + 1}`,
      data: resumeData,
      templateId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    resumes.push(savedResume);
    localStorage.setItem(this.getStorageKey(userId), JSON.stringify(resumes));
    
    return savedResume;
  }

  updateResume(userId: string, resumeId: string, resumeData: ResumeData, templateId: string): SavedResume | null {
    const resumes = this.getResumes(userId);
    const resumeIndex = resumes.findIndex(r => r.id === resumeId);
    
    if (resumeIndex === -1) {
      return null;
    }

    resumes[resumeIndex] = {
      ...resumes[resumeIndex],
      data: resumeData,
      templateId,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(this.getStorageKey(userId), JSON.stringify(resumes));
    return resumes[resumeIndex];
  }

  getResumes(userId: string): SavedResume[] {
    const saved = localStorage.getItem(this.getStorageKey(userId));
    return saved ? JSON.parse(saved) : [];
  }

  deleteResume(userId: string, resumeId: string): boolean {
    const resumes = this.getResumes(userId);
    const filteredResumes = resumes.filter(r => r.id !== resumeId);
    
    if (filteredResumes.length === resumes.length) {
      return false; // Resume not found
    }

    localStorage.setItem(this.getStorageKey(userId), JSON.stringify(filteredResumes));
    return true;
  }

  getResumeById(userId: string, resumeId: string): SavedResume | null {
    const resumes = this.getResumes(userId);
    return resumes.find(r => r.id === resumeId) || null;
  }
}

export const storageService = new StorageService();