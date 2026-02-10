
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is available in the execution environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCourseRecommendations = async (
  interests: string,
  skillLevel: string,
  careerGoals: string
): Promise<string> => {
  const prompt = `
    You are an expert academic advisor for a leading educational institution.
    A prospective student has provided their details. Based on this, recommend 3 suitable courses. For each course, provide a compelling title, a brief 2-3 sentence description, and a list of 3-5 key topics covered.

    Student's Details:
    - Interests: ${interests}
    - Current Skill Level: ${skillLevel}
    - Career Goals: ${careerGoals}

    Present the recommendations in a clear, easy-to-read format with headings and paragraphs. Do not use markdown formatting.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Sorry, I couldn't generate recommendations at this time.";
  } catch (error)
  {
    console.error("Error generating recommendations:", error);
    return "An error occurred while generating recommendations. Please check the console.";
  }
};

export const generateSyllabus = async (
  courseTitle: string,
  objectives: string
): Promise<string> => {
  const prompt = `
    You are an experienced curriculum designer. Create a structured 8-week syllabus outline for the following course.
    The syllabus should include a weekly breakdown with a clear topic for each week and 3-4 bullet points describing the key learning objectives or activities for that week.

    Course Details:
    - Title: ${courseTitle}
    - Core Objectives: ${objectives}

    Format the output clearly with headings for each week (e.g., "Week 1: Introduction to..."). Do not use markdown formatting.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Sorry, I couldn't generate a syllabus at this time.";
  } catch (error) {
    console.error("Error generating syllabus:", error);
    return "An error occurred while generating the syllabus. Please check the console.";
  }
};
