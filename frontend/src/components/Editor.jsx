import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, onChange, language }) => {
  return (
    <div className="h-[500px] border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'Inter', 'JetBrains Mono', monospace",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
          cursorBlinking: "smooth",
          smoothScrolling: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
