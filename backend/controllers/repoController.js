import { repoService } from "../services/repoService.js";

export const analyzeRepo = async (req, res) => {
  const { repoUrl } = req.body;

  if (!repoUrl) {
    return res.status(400).json({ error: "Repository URL is required" });
  }

  if (!repoUrl.startsWith("https://github.com/")) {
    return res
      .status(400)
      .json({ error: "Only GitHub repositories are supported" });
  }

  try {
    const result = await repoService.analyzeRepo(repoUrl);
    res.json(result);
  } catch (error) {
    console.error("Repo analysis error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
