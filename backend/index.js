import express from "express";
import cors from "cors";
import analysisRoutes from "./routes/analysisRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

app.use(
  cors({
    origin: "http://localhost:5174",
  }),
);
app.use(express.json());

app.use("/api", analysisRoutes);

app.get("/", (req, res) => {
  res.send("AI Code Review Backend is running.");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
