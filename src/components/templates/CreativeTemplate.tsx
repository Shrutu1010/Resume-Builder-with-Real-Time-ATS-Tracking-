import React from 'react';
import { ResumeData, Template } from '../../types';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface CreativeTemplateProps {
  data: ResumeData;
  template: Template;
}

export function CreativeTemplate({ data }: CreativeTemplateProps) {
  return (
    <div className="bg-white" style={{ fontFamily: 'system-ui' }}>
      <div className="flex min-h-full">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gradient-to-b from-indigo-600 to-purple-700 text-white p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4">
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
          </div>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-white">Contact</h2>
            <div className="space-y-3 text-sm">
              {data.personalInfo.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span className="break-all">{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{data.personalInfo.location}</span>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span className="break-all">{data.personalInfo.website}</span>
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-center space-x-2">
                  <Linkedin className="h-4 w-4" />
                  <span className="break-all">{data.personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </section>

          {/* Skills */}
          {data.skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold mb-4 text-white">Skills</h2>
              <div className="space-y-2">
                {data.skills.map((skill, idx) => (
                  <div key={idx} className="bg-white bg-opacity-20 rounded px-3 py-1 text-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-4 text-white">Certifications</h2>
              <div className="space-y-3">
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="text-sm">
                    <h3 className="font-semibold">{cert.name}</h3>
                    <p className="text-gray-200">{cert.issuer}</p>
                    <p className="text-gray-300 text-xs">{cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-8 text-gray-900">
          {/* Professional Summary */}
          {data.summary && (
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-indigo-600 border-b-2 border-indigo-600 pb-2">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{data.summary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-indigo-600 border-b-2 border-indigo-600 pb-2">
                Work Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2 border-indigo-200">
                    <div className="absolute w-3 h-3 bg-indigo-600 rounded-full -left-2 top-1"></div>
                    <div className="mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-indigo-600 font-medium">{exp.company}</p>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        {exp.location && <span>{exp.location}</span>}
                        <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                      </div>
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
            <section>
              <h2 className="text-xl font-bold mb-4 text-indigo-600 border-b-2 border-indigo-600 pb-2">
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                      <p className="text-indigo-600">{edu.institution}</p>
                      {edu.location && <p className="text-gray-600 text-sm">{edu.location}</p>}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{edu.graduationDate}</p>
                      {edu.gpa && <p>GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}