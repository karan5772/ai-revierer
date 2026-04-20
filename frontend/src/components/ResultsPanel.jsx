import React from "react";
import {
  AlertCircle,
  Lightbulb,
  ShieldAlert,
  Activity,
  Award,
  CheckCircle2,
  Info,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { motion } from "motion/react";
import { Streamdown } from "streamdown";

const groupItemsByFile = (items) => {
  if (!items || items.length === 0) return {};
  return items.reduce((acc, item) => {
    const parts = item.includes("::") ? item.split("::") : ["", item];
    const file = (parts.length > 1 ? parts[0] : "") || "General";
    const desc = parts.length > 1 ? parts.slice(1).join("::") : item;
    if (!acc[file]) acc[file] = [];
    acc[file].push({ desc, original: item });
    return acc;
  }, {});
};

const DirectorySection = ({
  grouped,
  icon,
  colorClass,
  borderClass,
  label,
}) => {
  const [openFiles, setOpenFiles] = React.useState({});
  const toggleFile = (file) => {
    setOpenFiles((prev) => ({ ...prev, [file]: !prev[file] }));
  };

  return (
    <div className="bg-surface-black rounded-2xl border border-border-dark h-full flex flex-col p-6">
      <div className="flex items-center text-text-primary mb-4 pb-4 border-b border-border-dark">
        <div className={`p-2 rounded-lg mr-3  border ${borderClass}`}>
          {icon}
        </div>
        <span className="font-semibold text-lg tracking-[-0.16px]">
          {label}
        </span>
      </div>
      <div className="overflow-y-auto pr-2 max-h-[300px] text-sm">
        {Object.entries(grouped).length === 0 ? (
          <div className="text-text-muted italic">
            No {label.toLowerCase()} detected.
          </div>
        ) : (
          <ul className="space-y-3">
            {Object.entries(grouped).map(([file, items], idx) => (
              <li key={file} className="overflow-hidden">
                <div
                  className="flex items-center cursor-pointer select-none group py-1"
                  onClick={() => toggleFile(file)}
                >
                  <span className="mr-2 transition-transform duration-200 text-text-muted group-hover:text-text-primary">
                    {openFiles[file] ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </span>
                  <span
                    className="text-[13px] font-mono text-text-secondary truncate bg-surface-dark border border-border-subtle py-1 px-2 rounded-md transition-colors group-hover:text-text-primary group-hover:border-border-mid"
                    title={file}
                  >
                    {file}
                  </span>
                  <span className="ml-2 text-xs font-mono text-text-muted bg-surface-dark px-1.5 rounded-full">
                    {items.length}
                  </span>
                </div>
                {openFiles[file] && (
                  <ul className="space-y-2 mt-2 ml-6 border-l border-border-dark pl-4 pb-2">
                    {items.map((item, i) => (
                      <li key={i} className="flex items-start text-[14px]">
                        <span className={`mr-2 mt-[4px] `}>•</span>
                        <span className="whitespace-pre-wrap text-text-secondary leading-relaxed">
                          {item.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const ResultsPanel = ({ result, type }) => {
  if (!result) return null;

  if (type === "stats") {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-surface-black rounded-2xl border border-border-dark flex items-center space-x-5 shadow-sm"
        >
          <div className="p-3 bg-brand-green/10 rounded-xl text-brand-green border border-border-subtle">
            <Award size={26} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xs text-text-muted font-semibold uppercase tracking-[1.2px] mb-1 font-mono">
              Score
            </p>
            <p className="text-3xl font-normal text-text-primary tracking-tight">
              {result.score}/10
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-surface-black rounded-2xl border border-border-dark flex items-center space-x-5 shadow-sm"
        >
          <div className="p-3 bg-surface-dark rounded-xl text-text-secondary border border-border-subtle">
            <Activity size={26} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xs text-text-muted font-semibold uppercase tracking-[1.2px] mb-1 font-mono">
              Complexity
            </p>
            <p className="text-3xl font-normal text-text-primary tracking-tight">
              {result.complexity}/10
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-surface-black rounded-2xl border border-border-dark flex items-center space-x-5 shadow-sm"
        >
          <div className="p-3 bg-surface-dark rounded-xl text-text-secondary border border-border-subtle">
            <CheckCircle2 size={26} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xs text-text-muted font-semibold uppercase tracking-[1.2px] mb-1 font-mono">
              Rating
            </p>
            <p className="text-3xl font-normal text-text-primary tracking-tight">
              {result.rating}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (type === "details") {
    return (
      <div className="grid grid-cols-1 gap-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <DirectorySection
              grouped={groupItemsByFile(result.issues)}
              icon={<AlertCircle size={20} strokeWidth={1.5} />}
              colorClass="text-red-400 bg-red-950/20"
              borderClass="border-red-900/30"
              label="Issues"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <DirectorySection
              grouped={groupItemsByFile(result.suggestions)}
              icon={<Lightbulb size={20} strokeWidth={1.5} />}
              colorClass="text-yellow-400 bg-yellow-950/20"
              borderClass="border-yellow-900/30"
              label="Suggestions"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <DirectorySection
              grouped={groupItemsByFile(result.security)}
              icon={<ShieldAlert size={20} strokeWidth={1.5} />}
              colorClass="text-indigo-400 bg-indigo-950/20"
              borderClass="border-indigo-900/30"
              label="Security"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {result.explanation && result.explanation.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <DirectorySection
                grouped={groupItemsByFile(result.explanation)}
                icon={<Info size={20} strokeWidth={1.5} />}
                colorClass="text-text-secondary bg-surface-dark"
                borderClass="border-border-subtle"
                label="Snippet Explanations"
              />
            </motion.div>
          )}

          {result.combinedExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-surface-black rounded-2xl border border-border-dark h-full flex flex-col p-6"
            >
              <div className="flex items-center mb-4 border-b border-border-dark pb-4">
                <div className="p-2 bg-brand-green/10 border border-brand-green/20 rounded-lg mr-3 text-brand-green">
                  <Info size={20} strokeWidth={1.5} />
                </div>
                <span className="font-semibold text-lg tracking-[-0.16px]">
                  Repository Explanation
                </span>
              </div>
              <div className="overflow-y-auto pr-2 max-h-[300px] text-[15px] whitespace-pre-wrap text-text-secondary leading-relaxed">
                <Streamdown shikiTheme={["github-light", "github-light"]}>
                  {result.combinedExplanation}
                </Streamdown>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default ResultsPanel;
