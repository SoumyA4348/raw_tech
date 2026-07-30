import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Core Engine',
  description: 'Comprehensive Privacy Policy compliant with European Union (GDPR) and California (CCPA) regulations.',
};

export default function PrivacyPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-16 text-slate-800 dark:text-slate-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Legal Roster & Compliance
        </span>
      </div>

      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-2">
        Privacy Policy & Data Security
      </h1>
      <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-8">
        Last Updated: July 29, 2026 • GDPR & CCPA Compliant
      </p>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
        <section className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
            1. Overview & Commitment
          </h2>
          <p>
            At <strong>The Core Engine</strong>, we respect your privacy. All article pages are pre-built via Static Site Generation (SSG), ensuring no personal server logs or IP tracing occurs during standard page downloads.
          </p>
        </section>

        <section className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
            2. Asynchronous Ad Units & Monetization
          </h2>
          <p>
            To support open-access engineering publications, we integrate asynchronous non-blocking ad units (AdSense / ethical developer sponsorship). Ad units execute strictly client-side and only after user consent is granted via our Cookie Consent Manager.
          </p>
        </section>

        <section className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
            3. User Rights under GDPR & CCPA
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Right of Access:</strong> You may request copies of personal data.</li>
            <li><strong>Right to Erasure:</strong> You may request data deletion at any time.</li>
            <li><strong>Do Not Sell My Info (CCPA):</strong> We do not sell personal identification to third parties.</li>
          </ul>
        </section>

        <section className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
            4. Contact Data Protection Officer
          </h2>
          <p>
            If you have questions regarding data security, reach out via our{' '}
            <a href="/contact" className="text-blue-500 underline">
              Contact Roster
            </a>.
          </p>
        </section>
      </div>
    </article>
  );
}
