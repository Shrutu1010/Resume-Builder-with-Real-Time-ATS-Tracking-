import React from 'react';

interface SummarySectionProps {
  data: string;
  onChange: (data: string) => void;
}

export function SummarySection({ data, onChange }: SummarySectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Summary</h3>
        <p className="text-gray-600 mb-6">
          Write a compelling 2-3 sentence summary that highlights your key qualifications, 
          experience, and career objectives. This section appears at the top of your resume.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Summary
        </label>
        <textarea
          value={data}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Experienced software engineer with 5+ years of experience in full-stack development. Proven track record of delivering scalable web applications and leading cross-functional teams. Passionate about clean code and user-centered design."
        />
        <p className="text-sm text-gray-500 mt-2">
          Tip: Include relevant keywords from the job description to improve ATS compatibility.
        </p>
      </div>
    </div>
  );
}