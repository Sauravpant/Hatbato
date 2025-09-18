import { GoogleGenerativeAI } from "@google/generative-ai";
import { AppError } from "./app-error";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const contentPrompt = process.env.CONTENT_MODERATION_PROMPT;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function checkContent(content: string): Promise<boolean> {
  const prompt = `${contentPrompt} Text: "${content}"`;

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
  });

  //Check if the content is inappropriate

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    console.log(result.response);
    const answer = response.text().trim().toUpperCase();
    return answer === "YES"; //Returnn true if the content is inappropriate
  } catch (error: any) {
    throw new AppError(500, "Something went wrong", error);
  }
}
export default checkContent;
