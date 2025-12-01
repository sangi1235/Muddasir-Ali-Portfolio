import { GoogleGenAI } from "@google/genai";
import { RESUME_DATA } from '../constants';

const apiKey = process.env.API_KEY || '';

// Initialize the client
const ai = new GoogleGenAI({ apiKey });

// Construct the system prompt with the resume data context
const SYSTEM_INSTRUCTION = `
You are an AI assistant for Muddasir Ali's personal portfolio website. 
Your goal is to answer questions about Muddasir based strictly on the provided resume data.

RESUME DATA:
${JSON.stringify(RESUME_DATA, null, 2)}

GUIDELINES:
1. Be professional, friendly, and concise.
2. If asked about contact info, provide the email or phone from the data.
3. If asked about skills, list them clearly.
4. If asked about projects, summarize the key projects listed.
5. If asked something not in the resume, politely say you don't have that information but suggest contacting Muddasir directly.
6. Keep answers relatively short (under 100 words) unless detailed info is requested.
`;

export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
  if (!apiKey) {
    return "I'm sorry, but the AI service is not configured (API Key missing). Please contact the developer.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
};