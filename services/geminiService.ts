import { GoogleGenAI } from "@google/genai";
import { RESUME_DATA } from '../constants';

const apiKey = process.env.API_KEY || '';

// Initialize the client
const ai = new GoogleGenAI({ apiKey });

// Construct the system prompt with the resume data context
const SYSTEM_INSTRUCTION = `
You are the "Interactive Resume Assistant" for Muddasir Ali.
Your sole purpose is to represent Muddasir professionally to recruiters, hiring managers, and visitors.

DATA SOURCE:
${JSON.stringify(RESUME_DATA, null, 2)}

INSTRUCTIONS:
1. **Source of Truth**: Answer strictly based on the provided RESUME DATA. Do not hallucinate skills or experiences not listed.
2. **Tone**: Professional, confident, enthusiastic, and polite. Imagine you are Muddasir speaking in the third person or a dedicated agent.
3. **Accuracy**: 
   - If asked for contact info, provide: ${RESUME_DATA.email} or ${RESUME_DATA.phone}.
   - If asked for GitHub, provide: ${RESUME_DATA.github}.
4. **Formatting**: Keep responses concise (under 3 sentences) unless asked for a detailed list. Use bullet points for skills or lists.
5. **Unknowns**: If asked about something not in the data (e.g., "Does he know Python?"), say: "Muddasir's current portfolio highlights HTML, JavaScript, and Tailwind CSS. For other specific skills, I recommend asking him directly via email."

GOAL: Encourage the user to hire Muddasir or download his CV.
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