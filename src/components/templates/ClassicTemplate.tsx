import React from 'react';
import { ResumeData, Template } from '../../types';

interface ClassicTemplateProps {
  data: ResumeData;
  template: Template;
}

export function ClassicTemplate({ data }: ClassicTemplateProps) {
  return (
    <div className="p-8 bg-white text-gray-900" style={{ fontFamily: 'Times, serif' }}>
      {/* Header */}
      <header className="text-center mb-8 pb-4 border-b border-gray-300">
        <h1 className="text-3xl font-bold mb-3 text-gray-900">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="text-sm text-gray-600 space-y-1">
          {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
          {data.personalInfo.linkedin && <p>{data.personalInfo.linkedin}</p>}
        </div>
      </header>

      {/* Professional Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-900 uppercase tracking-wider">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-4 text-gray-900 uppercase tracking-wider">
            Professional Experience
          </h2>
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-bold text-gray-900">{exp.position}</h3>
                    <span className="text-sm text-gray-600">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-base italic text-gray-700">{exp.company}</p>
                  {exp.location && <p className="text-sm text-gray-600">{exp.location}</p>}
                </div>
                {exp.description.filter(desc => desc.trim()).length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    {exp.description.filter(desc => desc.trim()).map((desc, idx) => (
                      <li key={idx}>{desc}</li>
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
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-4 text-gray-900 uppercase tracking-wider">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="italic text-gray-700">{edu.field}</p>
                    <p className="text-gray-700">{edu.institution}</p>
                    {edu.location && <p className="text-sm text-gray-600">{edu.location}</p>}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{edu.graduationDate}</p>
                    {edu.gpa && <p>GPA: {edu.gpa}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-900 uppercase tracking-wider">
            Skills
          </h2>
          <p className="text-gray-700">
            {data.skills.join(' • ')}
          </p>
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-4 text-gray-900 uppercase tracking-wider">
            Certifications
          </h2>
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-bold text-gray-900">{cert.name}</h3>
                    <p className="text-gray-700">{cert.issuer}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{cert.date}</p>
                    {cert.expiryDate && <p>Expires: {cert.expiryDate}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}