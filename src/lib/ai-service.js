import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
const genAi = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || "", // ⛔ Avoid hardcoding keys
});

console.log( process.env.GOOGLE_GENERATIVE_AI_API_KEY)

/**
 * Generates a resume using Gemini from raw user input.
 * @param {object} message - Raw user data (JSON) from the form.
 * @returns {Promise<object>} - Parsed JSON resume object.
 */
const aiResponse = async (message) => {
  try {
    const prompt = `
You are a professional AI resume builder agent with expertise in creating ATS-friendly resumes.

Analyze the provided user data and generate a polished, professional resume in JSON format that matches the exact structure below.

IMPORTANT RULES:
1. Only return valid JSON with no extra text or explanation
2. If a field is empty or not provided, omit it from the JSON entirely
3. Enhance and improve the provided information professionally
4. Use action verbs and quantifiable achievements where possible
5. Ensure all text is professional and error-free
6. If job description is provided, tailor the resume to match relevant keywords

REQUIRED JSON STRUCTURE:
{
  "summary": "Professional summary (2-3 sentences)",
  "skills": {
    "languages": ["JavaScript", "Python"],
    "tools": ["Git", "Docker"],
    "technologies": ["React", "Node.js"]
  },
  "experience": [
    {
      "role": "Job Title",
      "company": "Company Name",
      "duration": "Start - End Date",
      "location": "City, State (if provided)",
      "responsibilities": ["Achievement 1", "Achievement 2"],
      "certificate": "Certificate name (if applicable)",
      "projectLink": "Project URL (if applicable)"
    }
  ],
  "projects": [
    {
      "title": "Project Name",
      "technologies": "Tech stack used",
      "description": ["Feature 1", "Feature 2"],
      "link": "Project URL (if provided)",
      "documentation": "Documentation URL (if provided)"
    }
  ],
  "education": [
    {
      "degree": "Degree Name",
      "institution": "Institution Name",
      "duration": "Start - End Year",
      "location": "City, State (if provided)",
      "cgpa": "GPA (if provided)"
    }
  ],
  "achievements": ["Achievement 1", "Achievement 2"],
  "contact": {
    "fullName": "Full Name",
    "email": "email@example.com (if provided)",
    "phone": "Phone number (if provided)",
    "linkedin": "LinkedIn URL (if provided)",
    "github": "GitHub URL (if provided)"
  }
}

User data:
${JSON.stringify(message, null, 2)}`;

    const response = await genAi.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    const rawText = response.text || "";

    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No valid JSON found in AI response");

    const parsed = JSON.parse(jsonMatch[0]);
    console.log(parsed);
    return parsed;
  } catch (error) {
    console.error("AI Resume Error:", error.message);
    throw new Error("❌ Failed to generate resume using AI.");
  }
};

export default aiResponse;
