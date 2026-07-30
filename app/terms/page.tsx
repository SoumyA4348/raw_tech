import React from 'react';
import { Metadata } from 'next';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | The Core Engine',
  description: 'Terms of Service and code license agreements for The Core Engine engineering publication.',
};

export default function TermsPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-16 text-slate-800 dark:text-slate-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
          <FileText className="w-6 h-6" />
        </div>
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Legal Roster & Terms
        </span>
      </div>

      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-2">
        Terms of Service
      </h1>
      <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-8">
        Effective Date: July 29, 2026
      </p>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
        <section className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing <strong>The Core Engine</strong> website or copying code blocks from our MDX articles, you agree to comply with these Terms of Service.
          </p>
        </section>

        <section className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
            2. Code License & Snippet Usage
          </h2>
          <p>
            All code snippets, algorithms, and interactive benchmark components featured in our articles are released under the MIT Open Source License unless explicitly stated otherwise. You are free to copy, modify, and integrate them into your production applications.
          </p>
        </section>

        <section className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
            3. Disclaimer of Liability
          </h2>
          <p>
            Content is provided for educational and technical research purposes. While code examples are tested against Zod frontmatter gates and Shiki highlighters, we provide no warranties regarding zero-downtime application guarantees.
          </p>
        </section>
      </div>
    </article>
  );
}
