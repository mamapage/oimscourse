
import React, { useState } from 'react';
import { generateSyllabus } from '../services/geminiService';
import ClipboardIcon from './icons/ClipboardIcon';

const SyllabusGenerator: React.FC = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [objectives, setObjectives] = useState('');
  const [syllabus, setSyllabus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle || !objectives) {
      alert('Please fill in all fields.');
      return;
    }
    setIsLoading(true);
    setSyllabus('');
    try {
      const result = await generateSyllabus(courseTitle, objectives);
      setSyllabus(result);
    } catch (error) {
      console.error(error);
      setSyllabus('Failed to generate syllabus. See console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(syllabus);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md transition-all duration-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Syllabus Generator</h2>
      <p className="text-sm text-gray-500 mb-6">For instructors and curriculum designers. Enter a course title and objectives to generate a structured 8-week syllabus outline.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="courseTitle" className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
          <input
            type="text"
            id="courseTitle"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="e.g., Introduction to Python Programming"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>
        <div>
          <label htmlFor="objectives" className="block text-sm font-medium text-gray-700 mb-1">Core Learning Objectives</label>
          <textarea
            id="objectives"
            value={objectives}
            onChange={(e) => setObjectives(e.target.value)}
            placeholder="e.g., Understand basic data types, write functions, work with lists and dictionaries"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>
        <div className="flex justify-end">
            <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition"
            >
                {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                </>
                ) : (
                'Generate Syllabus'
                )}
            </button>
        </div>
      </form>

      {syllabus && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Generated Syllabus Outline</h3>
            <button
              onClick={handleCopy}
              className="flex items-center px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              <ClipboardIcon className="h-4 w-4 mr-1.5" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="prose prose-sm max-w-none p-4 bg-gray-50 rounded-md text-gray-700 whitespace-pre-wrap">
            {syllabus}
          </div>
        </div>
      )}
    </div>
  );
};

export default SyllabusGenerator;
