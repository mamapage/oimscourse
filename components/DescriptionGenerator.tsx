
import React, { useState } from 'react';
import { getCourseRecommendations } from '../services/geminiService';

const CourseAdvisor: React.FC = () => {
  const [interests, setInterests] = useState('');
  const [skillLevel, setSkillLevel] = useState('Beginner');
  const [careerGoals, setCareerGoals] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!interests || !careerGoals) {
      alert('Please fill in your interests and career goals.');
      return;
    }
    setIsLoading(true);
    setRecommendations('');
    try {
      const result = await getCourseRecommendations(interests, skillLevel, careerGoals);
      setRecommendations(result);
    } catch (error) {
      console.error(error);
      setRecommendations('Failed to get recommendations. See console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md transition-all duration-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Course Advisor</h2>
      <p className="text-sm text-gray-500 mb-6">Not sure where to start? Tell us about your goals, and our AI advisor will suggest the perfect courses for you.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">Your Interests</label>
          <input
            type="text"
            id="interests"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g., Web development, data science, digital art"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>
        <div>
          <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700 mb-1">Current Skill Level</label>
          <select
            id="skillLevel"
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition bg-white"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        <div>
          <label htmlFor="careerGoals" className="block text-sm font-medium text-gray-700 mb-1">Career Goals</label>
          <textarea
            id="careerGoals"
            value={careerGoals}
            onChange={(e) => setCareerGoals(e.target.value)}
            placeholder="e.g., Become a full-stack developer, start my own online business"
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
                    Finding Courses...
                </>
                ) : (
                'Get Recommendations'
                )}
            </button>
        </div>
      </form>

      {recommendations && (
        <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Recommended Courses</h3>
          <div className="prose prose-sm max-w-none p-4 bg-gray-50 rounded-md text-gray-700 whitespace-pre-wrap">
            {recommendations}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseAdvisor;
