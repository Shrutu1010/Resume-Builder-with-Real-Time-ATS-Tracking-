import React from 'react';
import { ResumeData, Template } from '../../types';

interface MinimalTemplateProps {
  data: ResumeData;
  template: Template;
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  return (
    <div className="p-8 bg-white text-gray-900" style={{ fontFamily: 'system-ui' }}>
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl font-light mb-4 text-gray-900">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="text-gray-600 text-sm space-x-4">
          {[
            data.personalInfo.email,
            data.personalInfo.phone,
            data.personalInfo.location,
            data.personalInfo.website,
            data.personalInfo.linkedin
          ].filter(Boolean).map((item, idx) => (
            <span key={idx}>{item}{idx < 4 ? ' |' : ''}</span>
          ))}
        </div>
      </header>

      {/* Professional Summary */}
      {data.summary && (
        <section className="mb-10">
          <p className="text-gray-700 leading-relaxed text-lg font-light">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-10">
          <h2 className="text-sm font-semibold mb-6 text-gray-900 uppercase tracking-widest">
            Experience
          </h2>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="mb-3">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-medium text-gray-900">{exp.position}</h3>
                    <span className="text-sm text-gray-500">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <p className="text-gray-700">{exp.company}</p>
                    {exp.location && <span className="text-sm text-gray-500">{exp.location}</span>}
                  </div>
                </div>
                {exp.description.filter(desc => desc.trim()).length > 0 && (
                  <ul className="space-y-2 text-gray-700">
                    {exp.description.filter(desc => desc.trim()).map((desc, idx) => (
                      <li key={idx} className="relative pl-4">
                        <span className="absolute left-0 top-2 w-1 h-1 bg-gray-400 rounded-full"></span>
                        {desc}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-10">
          <h2 className="text-sm font-semibold mb-6 text-gray-900 uppercase tracking-widest">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-gray-900">{edu.degree} in {edu.field}</h3>
                  <span className="text-sm text-gray-500">{edu.graduationDate}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="text-gray-700">{edu.institution}</p>
                  <div className="text-right text-sm text-gray-500">
                    {edu.location && <span>{edu.location}</span>}
                    {edu.gpa && edu.location && <span> | </span>}
                    {edu.gpa && <span>GPA: {edu.gpa}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-10">
          <h2 className="text-sm font-semibold mb-6 text-gray-900 uppercase tracking-widest">
            Skills
          </h2>
          <p className="text-gray-700">{data.skills.join(', ')}</p>
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold mb-6 text-gray-900 uppercase tracking-widest">
            Certifications
          </h2>
          <div className="space-y-3">
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium text-gray-900">{cert.name}</h3>
                  <span className="text-sm text-gray-500">{cert.date}</span>
                </div>
                <p className="text-gray-700">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}