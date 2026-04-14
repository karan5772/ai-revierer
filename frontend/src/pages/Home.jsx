import React, { useState } from "react";
import CodeEditor from "../components/Editor";
import ResultsPanel from "../components/ResultsPanel";
import RepoInput from "../components/RepoInput";
import { analyzeCode, analyzeRepo } from "../services/api";
import {
  Code2,
  GitBranch,
  Layout,
  Terminal,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const Home = () => {
  const [activeTab, setActiveTab] = useState("code");
  const [code, setCode] = useState(
    '// Paste your code here to analyze\nfunction example() {\n  console.log("Hello World");\n}',
  );
  const [language, setLanguage] = useState("javascript");
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyzeCode = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeCode(code, language);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to analyze code");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeRepo = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeRepo(repoUrl);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to analyze repository");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-12 px-4 shadow-inner font-sans">
      <div
        className={`mx-auto relative z-10 transition-all duration-500 ease-in-out ${result ? "max-w-7xl" : "max-w-5xl"}`}
      >
        <header className="mb-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold tracking-tight text-gray-900 mb-3"
          >
            Code & Repository Analyzer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg"
          >
            Professional AI-assisted code review and architectural analysis.
          </motion.p>
        </header>

        <div
          className={`grid gap-8 transition-all duration-500 ${result ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1"}`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col ${result ? "lg:col-span-8" : "col-span-1"}`}
          >
            <div className="flex justify-center mb-8">
              <div className="flex p-1 bg-gray-100 rounded-xl border border-gray-200">
                <button
                  className={`flex items-center px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                    activeTab === "code"
                      ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("code")}
                >
                  <Code2 className="mr-2" size={18} /> Code Analysis
                </button>
                <button
                  className={`flex items-center px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                    activeTab === "repo"
                      ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("repo")}
                >
                  <GitBranch className="mr-2" size={18} /> Repo Analysis
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "code" ? (
                <motion.div
                  key="code-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 flex-grow flex flex-col"
                >
                  <div className="flex items-center space-x-4">
                    <label className="font-semibold text-gray-700 flex items-center">
                      <Terminal size={16} className="mr-2 text-gray-500" />{" "}
                      Language
                    </label>
                    <select
                      className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="typescript">TypeScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="c++">C++</option>
                      <option value="c#">C#</option>
                      <option value="go">Go</option>
                      <option value="php">PHP</option>
                      <option value="ruby">Ruby</option>
                    </select>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm flex-grow min-h-[400px]">
                    <CodeEditor
                      code={code}
                      onChange={setCode}
                      language={language}
                    />
                  </div>

                  <button
                    className="w-full relative group overflow-hidden bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
                    onClick={handleAnalyzeCode}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <Layout size={20} />
                    )}
                    <span className="text-lg">Analyze Code</span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="repo-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <RepoInput
                    value={repoUrl}
                    onChange={setRepoUrl}
                    onAnalyze={handleAnalyzeRepo}
                    isLoading={loading}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-medium flex items-center"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 mr-3" />
                {error}
              </motion.div>
            )}
          </motion.div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-4 flex flex-col space-y-6 lg:sticky lg:top-8 self-start"
              >
                <ResultsPanel result={result} type="stats" />

                <button
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3.5 rounded-xl border border-gray-200 shadow-sm transition-all flex items-center justify-center space-x-2 mt-auto"
                  onClick={() => setResult(null)}
                >
                  <RefreshCw size={20} className="text-gray-500" />
                  <span>Start New Analysis</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <ResultsPanel result={result} type="details" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
