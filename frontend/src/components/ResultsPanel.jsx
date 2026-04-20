import React from "react";
import {
  AlertCircle,
  Lightbulb,
  ShieldAlert,
  Activity,
  Award,
  CheckCircle2,
  Info,
} from "lucide-react";
import { motion } from "motion/react";

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

const ResultsPanel = ({ result, type }) => {
  if (!result) return null;

  if (type === "stats") {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center space-x-5"
        >
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600 border border-blue-100">
            <Award size={26} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
              Score
            </p>
            <p className="text-3xl font-extrabold text-gray-900">
              {result.score}/10
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center space-x-5"
        >
          <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 border border-indigo-100">
            <Activity size={26} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
              Complexity
            </p>
            <p className="text-3xl font-extrabold text-gray-900">
              {result.complexity}/10
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center space-x-5"
        >
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 border border-emerald-100">
            <CheckCircle2 size={26} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
              Rating
            </p>
            <p className="text-3xl font-extrabold text-gray-900">
              {result.rating}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (type === "details") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col"
        >
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
            <div className="flex items-center text-gray-900">
              <div className="p-2 bg-red-50 rounded-lg mr-3 text-red-600">
                <AlertCircle size={20} />
              </div>
              <span className="font-semibold text-lg">Issues</span>
            </div>
            <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full">
              {result.issues?.length || 0}
            </span>
          </div>
          <div className="space-y-4 overflow-y-auto pr-2 max-h-[300px] text-sm">
            {result.issues && result.issues.length > 0 ? (
              Object.entries(groupItemsByFile(result.issues)).map(
                ([file, items], fileIdx) => (
                  <div
                    key={fileIdx}
                    className="mb-4 last:mb-0 border-b border-gray-50 pb-3 last:border-0 last:pb-0"
                  >
                    <div
                      className="text-xs font-mono text-gray-500 mb-2 truncate font-semibold bg-gray-50 py-1 px-2 rounded-md"
                      title={file}
                    >
                      {file}
                    </div>
                    <ul className="space-y-2 text-gray-600 pl-1">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-red-500 mr-2 mt-0.5">•</span>
                          <span>{item.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              )
            ) : (
              <div className="text-gray-400 italic">No issues detected.</div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col"
        >
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
            <div className="flex items-center text-gray-900">
              <div className="p-2 bg-amber-50 rounded-lg mr-3 text-amber-600">
                <Lightbulb size={20} />
              </div>
              <span className="font-semibold text-lg">Suggestions</span>
            </div>
            <span className="bg-amber-50 text-amber-600 text-xs font-bold px-2.5 py-1 rounded-full">
              {result.suggestions?.length || 0}
            </span>
          </div>
          <div className="space-y-4 overflow-y-auto pr-2 max-h-[300px] text-sm">
            {result.suggestions && result.suggestions.length > 0 ? (
              Object.entries(groupItemsByFile(result.suggestions)).map(
                ([file, items], fileIdx) => (
                  <div
                    key={fileIdx}
                    className="mb-4 last:mb-0 border-b border-gray-50 pb-3 last:border-0 last:pb-0"
                  >
                    <div
                      className="text-xs font-mono text-gray-500 mb-2 truncate font-semibold bg-gray-50 py-1 px-2 rounded-md"
                      title={file}
                    >
                      {file}
                    </div>
                    <ul className="space-y-2 text-gray-600 pl-1">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-amber-500 mr-2 mt-0.5">•</span>
                          <span>{item.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              )
            ) : (
              <div className="text-gray-400 italic">
                No suggestions available.
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col"
        >
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
            <div className="flex items-center text-gray-900">
              <div className="p-2 bg-indigo-50 rounded-lg mr-3 text-indigo-600">
                <ShieldAlert size={20} />
              </div>
              <span className="font-semibold text-lg">Security</span>
            </div>
            <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-2.5 py-1 rounded-full">
              {result.security?.length || 0}
            </span>
          </div>
          <div className="space-y-4 overflow-y-auto pr-2 max-h-[300px] text-sm">
            {result.security && result.security.length > 0 ? (
              Object.entries(groupItemsByFile(result.security)).map(
                ([file, items], fileIdx) => (
                  <div
                    key={fileIdx}
                    className="mb-4 last:mb-0 border-b border-gray-50 pb-3 last:border-0 last:pb-0"
                  >
                    <div
                      className="text-xs font-mono text-gray-500 mb-2 truncate font-semibold bg-gray-50 py-1 px-2 rounded-md"
                      title={file}
                    >
                      {file}
                    </div>
                    <ul className="space-y-2 text-gray-600 pl-1">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-indigo-500 mr-2 mt-0.5">•</span>
                          <span>{item.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              )
            ) : (
              <div className="text-emerald-600 font-medium flex items-center">
                <CheckCircle2 size={16} className="mr-1.5" /> Secure
              </div>
            )}
          </div>
        </motion.div>

        {result.explanation && result.explanation.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col md:col-span-3"
          >
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
              <div className="flex items-center text-gray-900">
                <div className="p-2 bg-blue-50 rounded-lg mr-3 text-blue-600">
                  <Info size={20} />
                </div>
                <span className="font-semibold text-lg">Code Explanation</span>
              </div>
              <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-full">
                {result.explanation.length}
              </span>
            </div>
            <div className="space-y-4 overflow-y-auto pr-2 max-h-[300px] text-sm">
              {Object.entries(groupItemsByFile(result.explanation)).map(
                ([file, items], fileIdx) => (
                  <div
                    key={fileIdx}
                    className="mb-4 last:mb-0 border-b border-gray-50 pb-3 last:border-0 last:pb-0"
                  >
                    <div
                      className="text-xs font-mono text-gray-500 mb-2 truncate font-semibold bg-gray-50 py-1 px-2 rounded-md"
                      title={file}
                    >
                      {file}
                    </div>
                    <ul className="space-y-2 text-gray-600 pl-1">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-blue-500 mr-2 mt-0.5">•</span>
                          <span className="whitespace-pre-wrap">
                            {item.desc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              )}
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  return null;
};

export default ResultsPanel;
