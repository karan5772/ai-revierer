import React from "react";
import { GitBranch, Globe } from "lucide-react";

const RepoInput = ({ value, onChange, onAnalyze, isLoading }) => {
  return (
    <div className="bg-surface-dark p-8 rounded-2xl border border-border-dark w-full relative">
      <div className="flex items-center space-x-3 mb-6 text-text-primary">
        <div className="p-2.5 bg-surface-black border border-border-mid rounded-xl">
          <GitBranch size={24} className="text-text-secondary" />
        </div>
        <h2 className="text-2xl font-normal tracking-[-0.16px] text-text-primary">
          Repository Analysis
        </h2>
      </div>

      <p className="text-text-muted mb-8 text-base leading-relaxed">
        Enter the URL of a public GitHub repository. Our AI will analyze the
        codebase architecture, review conventions, and recommend structural
        improvements.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full">
        <div className="relative grow group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
            <Globe size={18} />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-3 bg-surface-black border border-border-dark rounded-[11px] text-text-primary focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition-all placeholder:text-text-muted text-sm font-medium"
            placeholder="https://github.com/username/repository"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <button
          onClick={onAnalyze}
          disabled={isLoading || !value}
          className="relative bg-text-primary hover:bg-white hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-surface-black px-8 py-3 rounded-full font-medium transition-all flex items-center justify-center space-x-2 whitespace-nowrap"
        >
          <span className="relative z-10 text-sm">
            {isLoading ? "Analyzing..." : "Analyze Repo"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default RepoInput;
