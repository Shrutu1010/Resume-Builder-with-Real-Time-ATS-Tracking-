import { ResumeData, ATSFeedback } from '../types';

export function analyzeATS(resumeData: ResumeData): ATSFeedback[] {
  const feedback: ATSFeedback[] = [];

  // Contact Information Analysis
  const contactScore = analyzeContactInfo(resumeData);
  feedback.push(contactScore);

  // Content Quality Analysis
  const contentScore = analyzeContent(resumeData);
  feedback.push(contentScore);

  // Keywords Analysis
  const keywordScore = analyzeKeywords(resumeData);
  feedback.push(keywordScore);

  // Formatting Analysis
  const formatScore = analyzeFormatting(resumeData);
  feedback.push(formatScore);

  // Experience Analysis
  const experienceScore = analyzeExperience(resumeData);
  feedback.push(experienceScore);

  return feedback;
}

function analyzeContactInfo(data: ResumeData): ATSFeedback {
  let score = 0;
  const maxScore = 5;
  const feedback: string[] = [];
  const suggestions: string[] = [];

  if (data.personalInfo.fullName) {
    score += 1;
    feedback.push('Full name provided');
  } else {
    suggestions.push('Add your full name');
  }

  if (data.personalInfo.email) {
    score += 1;
    feedback.push('Email address provided');
  } else {
    suggestions.push('Add your email address');
  }

  if (data.personalInfo.phone) {
    score += 1;
    feedback.push('Phone number provided');
  } else {
    suggestions.push('Add your phone number');
  }

  if (data.personalInfo.location) {
    score += 1;
    feedback.push('Location information provided');
  } else {
    suggestions.push('Add your location (City, State)');
  }

  if (data.personalInfo.linkedin) {
    score += 1;
    feedback.push('LinkedIn profile included');
  } else {
    suggestions.push('Consider adding your LinkedIn profile URL');
  }

  return {
    category: 'Contact Information',
    score,
    maxScore,
    feedback,
    suggestions
  };
}

function analyzeContent(data: ResumeData): ATSFeedback {
  let score = 0;
  const maxScore = 4;
  const feedback: string[] = [];
  const suggestions: string[] = [];

  if (data.summary && data.summary.length > 50) {
    score += 1;
    feedback.push('Professional summary included');
  } else if (data.summary) {
    suggestions.push('Expand your professional summary (aim for 2-3 sentences)');
  } else {
    suggestions.push('Add a professional summary section');
  }

  if (data.experience.length > 0) {
    score += 1;
    feedback.push('Work experience included');
  } else {
    suggestions.push('Add your work experience');
  }

  if (data.education.length > 0) {
    score += 1;
    feedback.push('Education information included');
  } else {
    suggestions.push('Add your education background');
  }

  if (data.skills.length >= 5) {
    score += 1;
    feedback.push('Good number of skills listed');
  } else if (data.skills.length > 0) {
    suggestions.push('Add more relevant skills (aim for 8-12)');
  } else {
    suggestions.push('Add your technical and professional skills');
  }

  return {
    category: 'Content Completeness',
    score,
    maxScore,
    feedback,
    suggestions
  };
}

function analyzeKeywords(data: ResumeData): ATSFeedback {
  let score = 0;
  const maxScore = 3;
  const feedback: string[] = [];
  const suggestions: string[] = [];

  // Count action verbs in experience descriptions
  const actionVerbs = [
    'achieved', 'managed', 'led', 'developed', 'implemented', 'created', 'improved',
    'increased', 'decreased', 'built', 'designed', 'launched', 'delivered', 'optimized'
  ];

  let hasActionVerbs = false;
  data.experience.forEach(exp => {
    exp.description.forEach(desc => {
      if (actionVerbs.some(verb => desc.toLowerCase().includes(verb))) {
        hasActionVerbs = true;
      }
    });
  });

  if (hasActionVerbs) {
    score += 1;
    feedback.push('Action verbs found in experience descriptions');
  } else {
    suggestions.push('Use more action verbs in your experience descriptions');
  }

  // Check for quantifiable achievements
  const hasNumbers = data.experience.some(exp =>
    exp.description.some(desc => /\d+/.test(desc))
  );

  if (hasNumbers) {
    score += 1;
    feedback.push('Quantifiable achievements included');
  } else {
    suggestions.push('Add numbers and metrics to quantify your achievements');
  }

  // Check skill variety
  const technicalSkills = ['javascript', 'python', 'java', 'react', 'node', 'sql', 'aws', 'docker'];
  const hasTechnicalSkills = data.skills.some(skill =>
    technicalSkills.some(tech => skill.toLowerCase().includes(tech))
  );

  if (hasTechnicalSkills) {
    score += 1;
    feedback.push('Technical skills included');
  } else {
    suggestions.push('Include relevant technical skills for your industry');
  }

  return {
    category: 'Keywords & Optimization',
    score,
    maxScore,
    feedback,
    suggestions
  };
}

function analyzeFormatting(data: ResumeData): ATSFeedback {
  let score = 2; // Base score for using ATS-friendly template
  const maxScore = 3;
  const feedback: string[] = [
    'Using ATS-friendly template format',
    'Clean, readable structure'
  ];
  const suggestions: string[] = [];

  // Check for consistent date formatting
  const hasConsistentDates = data.experience.every(exp => 
    exp.startDate && (exp.endDate || exp.current)
  ) && data.education.every(edu => edu.graduationDate);

  if (hasConsistentDates) {
    score += 1;
    feedback.push('Consistent date formatting');
  } else {
    suggestions.push('Ensure all dates are properly formatted and complete');
  }

  return {
    category: 'Format & Structure',
    score,
    maxScore,
    feedback,
    suggestions
  };
}

function analyzeExperience(data: ResumeData): ATSFeedback {
  let score = 0;
  const maxScore = 4;
  const feedback: string[] = [];
  const suggestions: string[] = [];

  if (data.experience.length >= 2) {
    score += 1;
    feedback.push('Multiple work experiences included');
  } else if (data.experience.length === 1) {
    suggestions.push('Add more work experience if available');
  } else {
    suggestions.push('Include your work experience');
  }

  // Check for detailed descriptions
  const hasDetailedDescriptions = data.experience.some(exp =>
    exp.description.some(desc => desc.length > 50)
  );

  if (hasDetailedDescriptions) {
    score += 1;
    feedback.push('Detailed job descriptions provided');
  } else {
    suggestions.push('Provide more detailed descriptions of your responsibilities and achievements');
  }

  // Check for recent experience
  const hasRecentExperience = data.experience.some(exp => {
    const year = new Date(exp.startDate + '-01').getFullYear();
    return year >= new Date().getFullYear() - 5;
  });

  if (hasRecentExperience) {
    score += 1;
    feedback.push('Recent work experience included');
  } else {
    suggestions.push('Include more recent work experience if available');
  }

  // Check for career progression
  if (data.experience.length >= 2) {
    score += 1;
    feedback.push('Career progression demonstrated');
  } else {
    suggestions.push('Show career progression through multiple positions');
  }

  return {
    category: 'Experience Quality',
    score,
    maxScore,
    feedback,
    suggestions
  };
}