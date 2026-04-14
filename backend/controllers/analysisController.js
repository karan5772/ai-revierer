import { llmService } from "../services/llmService.js";

export const analyzeCode = async (req, res) => {
  const { code, language } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  try {
    const result = await llmService.analyzeCode(code, language);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
