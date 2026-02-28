import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

let ai: GoogleGenAI | null = null;

function getAI() {
  if (!ai) {
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in the environment.");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

export const createChat = () => {
  const genAI = getAI();
  return genAI.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "You are Zarvik, a highly intelligent and helpful personal AI assistant. Your tone is professional yet approachable, efficient, and precise. You should always identify as Zarvik when asked. Your goal is to assist the user with any queries they have, providing clear and concise information.",
    },
  });
};

export const sendMessage = async (chat: Chat, message: string): Promise<string> => {
  try {
    const result = await chat.sendMessage({ message });
    return result.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "An error occurred while communicating with the AI. Please try again.";
  }
};
