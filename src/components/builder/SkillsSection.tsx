import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface SkillsSectionProps {
  data: string[];
  onChange: (data: string[]) => void;
}

export function SkillsSection({ data, onChange }: SkillsSectionProps) {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(data.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const suggestedSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'SQL', 'Git',
    'AWS', 'Docker', 'MongoDB', 'Express.js', 'HTML/CSS', 'GraphQL', 'Redux',
    'Vue.js', 'Angular', 'Java', 'C++', 'PHP', 'Ruby', 'Go', 'Rust'
  ];

  const availableSkills = suggestedSkills.filter(skill => !data.includes(skill));

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Skills</h3>
        <p className="text-gray-600 mb-6">
          Add your technical and professional skills. Include both hard skills (programming languages, tools) 
          and soft skills (communication, leadership).
        </p>
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Add a skill..."
        />
        <button
          onClick={addSkill}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {data.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Your Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {data.map((skill) => (
              <div
                key={skill}
                className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
              >
                <span className="text-sm">{skill}</span>
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {availableSkills.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Suggested Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {availableSkills.slice(0, 12).map((skill) => (
              <button
                key={skill}
                onClick={() => onChange([...data, skill])}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}