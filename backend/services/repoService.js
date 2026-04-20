import simpleGit from "simple-git";
import path from "path";
import fs from "fs-extra";
import { llmService } from "./llmService.js";
import { v4 as uuidv4 } from "uuid";

import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function generateRepoSummary(explanation) {
  try {
    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "user",
          content: `Here is the explanation of codes in different files in a repo, explain the structure and functions of code in simple terms in markdown as if you are explaining the entire repo and it's working. Please provide a JSON object with a "summary" key.\n\n explanation: \n\n ${JSON.stringify(explanation)}`,
        },
      ],
      response_format: { type: "json_object" },
    });
    console.log("Test LLM Response for global summary generated.");
    const parsed = JSON.parse(response.choices[0]?.message?.content || "{}");
    return parsed.summary || parsed;
  } catch (err) {
    console.error("Failed to generate combined summary:", err);
    return "Failed to generate repo summary.";
  }
}

class RepoService {
  constructor() {
    this.git = simpleGit();
  }

  async analyzeRepo(repoUrl) {
    const tempDir = path.join(process.cwd(), "..", "temp", uuidv4());
    console.log(`[RepoService] Temp dir: ${tempDir}`);
    try {
      await fs.ensureDir(tempDir);
      console.log(`[RepoService] Cloning repo: ${repoUrl}`);
      await this.git.clone(repoUrl, tempDir, ["--depth", "1"]);
      console.log(`[RepoService] Clone complete.`);
      let files = await this.getFiles(tempDir);
      const excludePatterns = [
        /[/\\]prisma([/\\]|$)/i,
        /[/\\]frontend([/\\]|$)/i,
        /[/\\]node_modules([/\\]|$)/i,
        /[/\\]dist([/\\]|$)/i,
        /[/\\]build([/\\]|$)/i,
        /[/\\]\.git([/\\]|$)/i,
        /[/\\]\.next([/\\]|$)/i,
        /[/\\]\.vscode([/\\]|$)/i,
        /[/\\]coverage([/\\]|$)/i,
        /[/\\]public([/\\]|$)/i,
        /[/\\]test([/\\]|$)/i,
        /[/\\]__tests__([/\\]|$)/i,
        /[/\\]docs([/\\]|$)/i,
        /package(-lock)?\.json$/i,
        /\.env$/i,
        /\.DS_Store$/i,
        /README\.md$/i,
      ];
      files = files.filter((f) => !excludePatterns.some((rx) => rx.test(f)));
      console.log(
        `[RepoService] Files found (excluded non-source): ${files.length}`,
      );
      const codeFiles = files
        .filter((file) =>
          [".js", ".ts", ".jsx", ".tsx", ".py", ".md"].includes(
            path.extname(file),
          ),
        )
        .slice(0, 20);
      console.log(`[RepoService] Code files to analyze: ${codeFiles.length}`);
      if (codeFiles.length === 0) {
        throw new Error("No supported code files found in repository");
      }
      const results = [];
      const extToLang = {
        js: "javascript",
        jsx: "javascript",
        ts: "typescript",
        tsx: "typescript",
        py: "python",
        md: "markdown",
      };
      for (const file of codeFiles) {
        // console.log(`[RepoService] Reading file: ${file}`);
        const content = await fs.readFile(file, "utf-8");
        const lines = content.split("\n").slice(0, 500).join("\n");
        const ext = path.extname(file).slice(1);
        const language = extToLang[ext] || ext;
        const relativePath = path.relative(tempDir, file);
        try {
          console.log(`[RepoService] Analyzing file: ${relativePath}`);
          const result = await llmService.analyzeCode(lines, language);

          const formatItem = (item) => `${relativePath}::${item}`;
          if (Array.isArray(result.issues))
            result.issues = result.issues.map(formatItem);
          if (Array.isArray(result.suggestions))
            result.suggestions = result.suggestions.map(formatItem);
          if (Array.isArray(result.security))
            result.security = result.security.map(formatItem);
          if (Array.isArray(result.explanation))
            result.explanation = result.explanation.map(formatItem);
          results.push(result);
          console.log(`[RepoService] Analysis complete for: ${relativePath}`);
        } catch (err) {
          console.warn(
            `[RepoService] Failed to analyze file ${relativePath}:`,
            err,
          );
        }
      }
      if (results.length === 0) {
        throw new Error("Failed to analyze any files in the repository");
      }
      console.log(`[RepoService] Aggregating results.`);

      const aggregate = await this.aggregateResults(results);
      return aggregate;
    } finally {
      await fs
        .remove(tempDir)
        .then(() => console.log(`[RepoService] Temp dir cleaned up`))
        .catch((err) => console.error("Cleanup error:", err));
    }
  }

  async getFiles(dir) {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? this.getFiles(res) : res;
      }),
    );
    return Array.prototype.concat(...files);
  }

  async aggregateResults(results) {
    const totalFiles = results.length;
    const issues = Array.from(new Set(results.flatMap((r) => r.issues || [])));
    const suggestions = Array.from(
      new Set(results.flatMap((r) => r.suggestions || [])),
    );
    const security = Array.from(
      new Set(results.flatMap((r) => r.security || [])),
    );
    const explanation = Array.from(
      new Set(results.flatMap((r) => r.explanation || [])),
    );

    console.log(`[RepoService] Generating combined repo explanation...`);
    const combinedExplanation = await generateRepoSummary(explanation);

    const avgComplexity =
      results.reduce((acc, r) => acc + (r.complexity || 0), 0) / totalFiles;
    const avgScore =
      results.reduce((acc, r) => acc + (r.score || 0), 0) / totalFiles;
    let rating = "Poor";
    if (avgScore >= 0 && avgScore < 3) rating = "Poor";
    else if (avgScore >= 3 && avgScore < 5) rating = "Fair";
    else if (avgScore >= 5 && avgScore < 7.5) rating = "Good";
    else if (avgScore >= 7.5) rating = "Excellent";
    return {
      totalFiles,
      issues,
      suggestions,
      security,
      explanation,
      combinedExplanation,
      complexity: Math.round(avgComplexity * 10) / 10,
      score: Math.round(avgScore),
      rating,
    };
  }
}

export const repoService = new RepoService();
