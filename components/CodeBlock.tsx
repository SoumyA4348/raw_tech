'use client';

import React, { useState } from 'react';
import { Check, Copy, FileCode, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  highlightedHtml?: string;
}

export default function CodeBlock({
  code,
  language = 'typescript',
  filename,
  highlightedHtml,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="my-6 rounded-xl border border-slate-800 bg-[#0d1117] overflow-hidden shadow-2xl group">
      {/* VS Code Style Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-slate-800 text-xs font-mono select-none">
        <div className="flex items-center gap-2 text-slate-400">
          {filename ? (
            <>
              <FileCode className="w-4 h-4 text-blue-400" />
              <span className="font-semibold text-slate-200">{filename}</span>
            </>
          ) : (
            <>
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-400 uppercase tracking-wider text-[10px]">
                {language}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {filename && (
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold hidden sm:inline">
              {language}
            </span>
          )}
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs font-sans border border-slate-700/60"
            title="Copy code to clipboard"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-slate-100 selection:bg-blue-500/30">
        {highlightedHtml ? (
          <div dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
        ) : (
          <pre className="m-0">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
