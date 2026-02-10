
import React, { useState } from 'react';
import { Tool } from './types';
import CourseAdvisor from './components/CourseAdvisor';
import SyllabusGenerator from './components/SyllabusGenerator';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>(Tool.COURSE_ADVISOR);

  const renderTool = () => {
    switch (activeTool) {
      case Tool.COURSE_ADVISOR:
        return <CourseAdvisor />;
      case Tool.SYLLABUS_GENERATOR:
        return <SyllabusGenerator />;
      default:
        return <CourseAdvisor />;
    }
  };

  const TabButton: React.FC<{ tool: Tool; label: string }> = ({ tool, label }) => (
    <button
      onClick={() => setActiveTool(tool)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
        activeTool === tool
          ? 'bg-blue-700 text-white shadow-md'
          : 'bg-white text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
             <h1 className="text-2xl font-bold text-gray-900">
              AI Course Companion
            </h1>
            <span className="text-sm text-gray-500">Your Institution's Assistant</span>
          </div>
          <nav className="flex space-x-2 pb-3">
            <TabButton tool={Tool.COURSE_ADVISOR} label="AI Course Advisor" />
            <TabButton tool={Tool.SYLLABUS_GENERATOR} label="Syllabus Generator" />
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTool()}
      </main>
      <footer className="text-center py-4 text-xs text-gray-500">
        <p>AI-powered tools for modern education.</p>
      </footer>
    </div>
  );
};

export default App;
