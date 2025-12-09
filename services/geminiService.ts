import { GoogleGenAI } from "@google/genai";

// Initialize the client outside the function if possible, or inside if key might change (here strictly env)
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTagline = async (jobTitle: string, company: string): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("API Key is missing. Returning fallback.");
    return "Innovating Digital Experiences";
  }

  try {
    const prompt = `Write a professional, catchy, and short (under 10 words) tagline for a business card. 
    The person is a "${jobTitle}" working at "${company}". 
    The tone should be modern, sleek, and tech-forward. 
    Return ONLY the tagline string, no quotes.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    return response.text ? response.text.trim() : "Building the Future of Web";
  } catch (error) {
    console.error("Error generating tagline:", error);
    return "Excellence in Every Pixel"; // Fallback on error
  }
};