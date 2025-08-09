import React, { useEffect } from 'react';
import { ResumeData, ATSFeedback } from '../types';
import { analyzeATS } from '../utils/atsAnalyzer';
import { Target, CheckCircle, AlertTriangle, XCircle, TrendingUp } from 'lucide-react';

interface ATSAnalyzerProps {
  resumeData: ResumeData;
  onScoreUpdate: (score: number) => void;
}

export function ATSAnalyzer({ resumeData, onScoreUpdate }: ATSAnalyzerProps) {
  const analysis = analyzeATS(resumeData);
  const overallScore = Math.round(
    analysis.reduce((sum, item) => sum + (item.score / item.maxScore), 0) / analysis.length * 100
  );

  useEffect(() => {
    onScoreUpdate(overallScore);
  }, [overallScore, onScoreUpdate]);

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-emerald-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return <CheckCircle className="h-5 w-5 text-emerald-600" />;
    if (percentage >= 60) return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    return <XCircle className="h-5 w-5 text-red-600" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <Target className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">ATS Compatibility Score</h3>
          <p className="text-gray-600 text-sm">How well your resume works with applicant tracking systems</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Score</span>
          <span className={`text-2xl font-bold ${overallScore >= 80 ? 'text-emerald-600' : overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
            {overallScore}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              overallScore >= 80 ? 'bg-emerald-500' : overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${overallScore}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-4">
        {analysis.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getScoreIcon(item.score, item.maxScore)}
                <h4 className="font-medium text-gray-900">{item.category}</h4>
              </div>
              <span className={`font-semibold ${getScoreColor(item.score, item.maxScore)}`}>
                {item.score}/{item.maxScore}
              </span>
            </div>

            {item.feedback.length > 0 && (
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-700 mb-1">Status:</p>
                <ul className="space-y-1">
                  {item.feedback.map((feedback, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start space-x-2">
                      <span className="text-emerald-600 mt-1">✓</span>
                      <span>{feedback}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.suggestions.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Suggestions:</p>
                <ul className="space-y-1">
                  {item.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start space-x-2">
                      <span className="text-blue-600 mt-1">→</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h5 className="font-medium text-blue-900 mb-1">Pro Tip</h5>
            <p className="text-sm text-blue-800">
              Aim for a score of 80% or higher for the best ATS compatibility. 
              Focus on the suggestions above to improve your score.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}