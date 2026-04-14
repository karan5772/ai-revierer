import React from "react";
import { GitBranch, Search, Globe } from "lucide-react";

const RepoInput = ({ value, onChange, onAnalyze, isLoading }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 max-w-2xl mx-auto w-full relative">
      <div className="flex items-center space-x-3 mb-6 text-gray-900">
        <div className="p-2.5 bg-gray-100 rounded-xl border border-gray-200">
          <GitBranch size={24} className="text-gray-700" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Repository Analysis
        </h2>
      </div>

      <p className="text-gray-500 mb-8 text-base">
        Enter the URL of a public GitHub repository. Our AI will analyze the
        codebase architecture, review conventions, and recommend structural
        improvements.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 relative z-10">
        <div className="relative grow group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Globe size={18} />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 text-sm font-medium"
            placeholder="https://github.com/username/repository"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <button
          onClick={onAnalyze}
          disabled={isLoading || !value}
          className="relative bg-gray-900 hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-sm flex items-center justify-center space-x-2 whitespace-nowrap"
        >
          <span className="relative z-10 text-base">
            {isLoading ? "Analyzing..." : "Analyze Repo"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default RepoInput;
