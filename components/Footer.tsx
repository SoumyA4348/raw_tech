import React from 'react';
import Link from 'next/link';
import { Cpu, ShieldCheck, Heart, Terminal, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0d1117] text-slate-600 dark:text-slate-400 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-600 text-white">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 dark:text-slate-100 font-sans">
                The Core Engine
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Next-generation technical publication covering distributed systems, edge computing, agentic infrastructure, and high-performance Web architecture.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3 font-mono">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-blue-500 transition-colors">
                  Latest Articles
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-500 transition-colors">
                  Contact Roster
                </Link>
              </li>
            </ul>
          </div>

          {/* Architecture Checklist */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3 font-mono">
              Core Engine Engine
            </h4>
            <ul className="space-y-1.5 text-[11px] font-mono text-slate-500">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>SSG HTML/CSS Export</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Zod Gatekeeper Validated</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>JSON-LD & Dynamic OG</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Shiki Syntax Highlighting</span>
              </li>
            </ul>
          </div>

          {/* Legal Compliance */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3 font-mono">
              Legal Roster ⚖️
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              GDPR & CCPA Compliant. Asynchronous non-blocking AdSense ad placement architecture.
            </p>
            <div className="flex gap-2 text-xs">
              <Link
                href="/privacy"
                className="px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-blue-600 hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-blue-600 hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/contact"
                className="px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-blue-600 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} The Core Engine. Built for extreme performance & instant pre-rendering.</p>
          <div className="flex items-center gap-1">
            <span>Powered by Next.js SSG & MDX</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
