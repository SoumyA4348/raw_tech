'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cpu, Terminal, Search, Clock, ShieldCheck, Flame } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [timeString, setTimeString] = useState<string>('Syncing...');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0d1117]/80 backdrop-blur-md transition-colors">
      {/* Breaking Ticker Header */}
      <div className="w-full bg-slate-900 text-slate-300 py-1 px-4 text-xs font-mono border-b border-slate-800 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-2 truncate">
          <span className="flex items-center gap-1 text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-400/10 text-[10px] uppercase tracking-wider">
            <Flame className="w-3 h-3" /> Live Telemetry
          </span>
          <span className="truncate text-slate-400">
            ⚡ SSG Pages Pre-compiled • Zod Gatekeeper Active • Shiki Highlight Active
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[11px] text-blue-400 font-mono shrink-0">
          <Clock className="w-3.5 h-3.5" />
          <span>{timeString}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-slate-100 font-sans">
                The Core Engine
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                INFRA
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block">
              High-Performance Systems & MDX Pipeline
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Articles
          </Link>
          <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Action Right */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
