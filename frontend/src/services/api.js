import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3004/api",
});

export const analyzeCode = async (code, language) => {
  const response = await api.post("/analyze", { code, language });
  return response.data;
};

export const analyzeRepo = async (repoUrl) => {
  const response = await api.post("/repo-analysis", { repoUrl });
  return response.data;
};
