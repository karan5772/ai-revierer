import React, { useState, useEffect } from "react";
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
  Sun,
  Moon,
  Shield,
  Zap,
  Search,
} from "lucide-react";

// Optional: if you need these brand icons, you can use simple inline SVGs
const Github = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinelinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.6a5.44 5.44 0 0 0-1.5-3.78c.15-.38.65-1.8-.15-3.73 0 0-1.2-.38-3.9 1.5a13.38 13.38 0 0 0-7 0C6.2 1.6 5 2 5 2c-.8 1.93-.3 3.35-.15 3.73A5.44 5.44 0 0 0 3 9.46c0 5.07 3 6.26 6 6.6a4.8 4.8 0 0 0-1 3.24v4"></path>
  </svg>
);
const Twitter = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinelinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);
const Linkedin = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinelinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
import { motion, AnimatePresence } from "motion/react";

const SkeletonResults = () => {
  return (
    <div className="w-full space-y-6 animate-pulse opacity-60">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 bg-surface-black rounded-2xl border border-border-dark h-[140px] flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-border-dark"></div>
              <div className="w-16 h-4 bg-border-dark rounded"></div>
            </div>
            <div className="w-24 h-8 bg-border-dark rounded mt-2"></div>
          </div>
        ))}
      </div>
      <div className="p-6 bg-surface-black rounded-2xl border border-border-dark h-[200px] flex flex-col space-y-4">
        <div className="flex justify-between">
          <div className="w-32 h-6 bg-border-dark rounded"></div>
          <div className="w-8 h-6 bg-border-dark rounded-full"></div>
        </div>
        <div className="w-full h-4 bg-border-dark rounded"></div>
        <div className="w-[80%] h-4 bg-border-dark rounded"></div>
        <div className="w-[90%] h-4 bg-border-dark rounded"></div>
      </div>
    </div>
  );
};

const NavBar = ({ isDark, toggleTheme }) => (
  <nav className="w-full border-b border-border-dark bg-surface-dark/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-green to-emerald-400 flex items-center justify-center shadow-lg shadow-brand-green/20">
          <GitBranch size={16} className="text-white" />
        </div>
        <span className="font-bold text-lg text-text-primary tracking-[-0.16px]">
          Supareview
        </span>
      </div>
      <div className="flex items-center space-x-6">
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-text-secondary hover:text-brand-link transition-colors"
        >
          Documentation
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-text-secondary hover:text-brand-link transition-colors"
        >
          Pricing
        </a>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-surface-black border border-border-dark text-text-muted hover:text-brand-green hover:border-brand-border transition-colors duration-300 shadow-sm"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="bg-brand-green hover:bg-emerald-400 text-white px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all shadow-md shadow-brand-green/20"
        >
          Start Reviewing
        </a>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="w-full border-t border-border-dark bg-surface-black py-12 mt-auto">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center space-x-2 mb-4 md:mb-0">
        <GitBranch size={18} className="text-brand-green" />
        <span className="font-medium text-text-secondary text-sm">
          © 2026 Supareview. Open Source.
        </span>
      </div>
      <div className="flex space-x-6">
        <a
          href="https://github.com"
          className="text-text-muted hover:text-text-primary transition-colors"
        >
          <Github size={20} />
        </a>
        <a
          href="https://twitter.com"
          className="text-text-muted hover:text-text-primary transition-colors"
        >
          <Twitter size={20} />
        </a>
        <a
          href="https://linkedin.com"
          className="text-text-muted hover:text-text-primary transition-colors"
        >
          <Linkedin size={20} />
        </a>
      </div>
    </div>
  </footer>
);

const Home = () => {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState("repo");
  const [code, setCode] = useState(
    '// Paste your code here to analyze\nfunction example() {\n  console.log("Hello World");\n}',
  );
  const [language, setLanguage] = useState("javascript");
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleAnalyzeCode = async () => {
    setResult(null);
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
    setResult(null);
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
    <div className="min-h-screen bg-surface-dark text-text-primary font-sans flex flex-col transition-colors duration-300">
      <NavBar isDark={isDark} toggleTheme={toggleTheme} />
      <div className="flex-grow flex flex-col py-16 px-4 relative overflow-hidden">
        {/* Background glow effects for vibrancy */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-green/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="mx-auto w-full max-w-5xl relative z-10 transition-all duration-500 ease-in-out">
          <header className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-2 bg-brand-green/10 text-brand-green px-4 py-1.5 rounded-full border border-brand-green/20 mb-6 font-medium text-sm shadow-sm"
            >
              <Zap size={16} fill="currentColor" />
              <span>AI-Powered Code Reviewer</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[56px] md:text-[72px] leading-[1.05] font-extrabold tracking-tight text-text-primary mb-6"
            >
              Bulletproof your code <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-400">
                in seconds.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8"
            >
              Supareview instantly analyzes your repositories or code snippets
              to find bugs, assess complexity, and enforce security practices
              before you merge.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10 text-left"
            >
              <div className="bg-surface-black/50 backdrop-blur-sm p-4 rounded-xl border border-border-dark flex items-start space-x-3">
                <Search className="text-brand-green mt-0.5" size={20} />
                <div>
                  <h3 className="font-bold text-text-primary text-sm mb-1">
                    Deep Analysis
                  </h3>
                  <p className="text-xs text-text-muted">
                    Uncovers hidden bugs and logic flaws across your entire
                    codebase.
                  </p>
                </div>
              </div>
              <div className="bg-surface-black/50 backdrop-blur-sm p-4 rounded-xl border border-border-dark flex items-start space-x-3">
                <Shield className="text-blue-500 mt-0.5" size={20} />
                <div>
                  <h3 className="font-bold text-text-primary text-sm mb-1">
                    Security Guardian
                  </h3>
                  <p className="text-xs text-text-muted">
                    Flags vulnerabilities & ensures standard security practices.
                  </p>
                </div>
              </div>
              <div className="bg-surface-black/50 backdrop-blur-sm p-4 rounded-xl border border-border-dark flex items-start space-x-3">
                <Terminal className="text-purple-500 mt-0.5" size={20} />
                <div>
                  <h3 className="font-bold text-text-primary text-sm mb-1">
                    Instant Feedback
                  </h3>
                  <p className="text-xs text-text-muted">
                    Get actionable suggestions and complex code explanations
                    instantly.
                  </p>
                </div>
              </div>
            </motion.div>
          </header>

          <div className="w-full flex flex-col mb-12">
            <div className="flex justify-center mb-8">
              <div className="flex p-1 bg-surface-black rounded-[9999px] border border-border-dark">
                <button
                  className={`flex items-center px-6 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                    activeTab === "repo"
                      ? "bg-surface-dark text-text-primary border border-border-mid"
                      : "text-text-muted hover:text-text-primary border border-transparent"
                  }`}
                  onClick={() => {
                    setActiveTab("repo");
                    setResult(null);
                    setError(null);
                  }}
                >
                  <GitBranch className="mr-2" size={16} /> Repo Analysis
                </button>
                <button
                  className={`flex items-center px-6 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                    activeTab === "code"
                      ? "bg-surface-dark text-text-primary border border-border-mid"
                      : "text-text-muted hover:text-text-primary border border-transparent"
                  }`}
                  onClick={() => {
                    setActiveTab("code");
                    setResult(null);
                    setError(null);
                  }}
                >
                  <Code2 className="mr-2" size={16} /> Snippet Analysis
                </button>
              </div>
            </div>

            <div className="w-full max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                {activeTab === "repo" ? (
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
                ) : (
                  <motion.div
                    key="code-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-surface-black rounded-2xl border border-border-dark p-6"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <label className="font-medium text-text-secondary text-sm flex items-center">
                        <Terminal size={14} className="mr-2 text-text-muted" />{" "}
                        LANGUAGE
                      </label>
                      <select
                        className="bg-surface-dark border border-border-mid rounded-md px-3 py-1.5 text-text-primary text-sm focus:border-brand-green outline-none transition-all"
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

                    <div className="rounded-xl overflow-hidden border border-border-dark flex-grow min-h-[300px] mb-4">
                      <CodeEditor
                        code={code}
                        onChange={setCode}
                        language={language}
                      />
                    </div>

                    <button
                      className="w-full bg-text-primary hover:bg-white text-surface-black font-medium py-3 rounded-full transition-all flex items-center justify-center space-x-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleAnalyzeCode}
                      disabled={loading || !code.trim()}
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <Layout size={16} />
                      )}
                      <span>
                        {loading ? "Analyzing..." : "Analyze Snippet"}
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-red-950/30 border border-red-900/50 text-red-400 rounded-xl text-sm flex items-center justify-center max-w-2xl mx-auto"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
                  {error}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Results Container - Expands width outside the main constraint for a full immersive display */}
        <div className="w-full max-w-[1400px] mx-auto transition-all duration-500 ease-in-out">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8"
            >
              <SkeletonResults />
            </motion.div>
          ) : (
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start"
                >
                  <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-6">
                    <ResultsPanel result={result} type="stats" />
                    <button
                      className="w-full bg-surface-black hover:bg-border-subtle text-text-secondary font-medium py-3 px-4 rounded-full border border-border-dark transition-all flex items-center justify-center space-x-2 text-sm"
                      onClick={() => setResult(null)}
                    >
                      <RefreshCw size={16} className="text-text-muted" />
                      <span>Clear Results</span>
                    </button>
                  </div>

                  <div className="lg:col-span-9">
                    <ResultsPanel result={result} type="details" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
