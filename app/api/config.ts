import { GoogleGenerativeAI } from "@google/generative-ai";

export const genAI = new GoogleGenerativeAI(process.env.gemini || "");
export const model = genAI.getGenerativeModel({ model: "gemini-pro" });
