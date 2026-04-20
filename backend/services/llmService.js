import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI();
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

class LLMService {
  async analyzeCode(code, language = "javascript") {
    if (!openai.apiKey) {
      throw new Error("OPENROUTER_API_KEY is not configured");
    }
    if (typeof code !== "string" || !code.trim()) {
      console.error("analyzeCode: code is empty or not a string", code);
      throw new Error("No code provided for analysis");
    }
    if (typeof language !== "string" || !language.trim()) {
      console.error("analyzeCode: language is empty or not a string", language);
      throw new Error("No language provided for analysis");
    }
    console.log(`analyzeCode: language=${language}`);
    const prompt = `Analyze the following code and return ONLY valid JSON matching this schema:\n\n{\n  \"issues\": string[],\n  \"suggestions\": string[],\n  \"security\": string[],\n  \"explanation\": string[],\n  \"complexity\": number,\n  \"score\": number,\n  \"rating\": string\n}\n\nKeep descriptions extremely concise. If syntax issues repeat, mention them only once. Focus mainly on logic. Explain all the structure and functions of code in explanation. The score must be out of 10. Rating must be one of: "Poor", "Fair", "Good", "Excellent". \n\nLanguage: ${language}\n\nCode:\n${code}`;
    try {
      const completion = await groq.chat.completions.create({
        // model: "gpt-4.1-nano",
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 4096,
        response_format: { type: "json_object" },
      });
      const text = completion.choices[0]?.message?.content;
      console.log("LLM Response:", text);
      if (!text) throw new Error("Empty response from LLM");
      return JSON.parse(text);
    } catch (error) {
      console.error("LLM Analysis Error:", error);
      throw new Error("Failed to analyze code with LLM");
    }
  }
}

export const llmService = new LLMService();
