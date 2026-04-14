import express from "express";
import { analyzeCode } from "../controllers/analysisController.js";
import { analyzeRepo } from "../controllers/repoController.js";

const router = express.Router();

router.post("/analyze", analyzeCode);
router.post("/repo-analysis", analyzeRepo);

export default router;
