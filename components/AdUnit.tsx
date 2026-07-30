'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';

interface AdUnitProps {
  slotId?: string;
  format?: 'banner' | 'sidebar' | 'inline';
}

export default function AdUnit({ slotId = 'ad-default', format = 'banner' }: AdUnitProps) {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Non-blocking asynchronous loading using IntersectionObserver and requestIdleCallback
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Schedule non-blocking async payload
            const scheduleTask = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
            scheduleTask(() => {
              // Simulate async non-blocking ad script execution without blocking main thread
              setLoaded(true);
            });
            observer.disconnect();
          }
        });
      },
      { rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const formatStyles = {
    banner: 'w-full h-32 my-8',
    sidebar: 'w-full h-64 my-6',
    inline: 'w-full h-24 my-6',
  };

  return (
    <aside
      ref={containerRef}
      aria-label="Sponsored advertisement"
      className={`relative rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden backdrop-blur ${formatStyles[format]}`}
    >
      <div className="absolute top-2 right-3 flex items-center gap-1 text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500">
        <Sparkles className="w-3 h-3 text-amber-500" />
        Sponsored Ad
      </div>

      {!loaded ? (
        <div className="w-full h-full flex items-center justify-center p-4 animate-pulse">
          <div className="w-full max-w-sm space-y-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mx-auto" />
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mx-auto" />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center group cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-all">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Vercel Enterprise Edge Network
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
            Deploy your static MDX blog to 300+ global edge locations with sub-10ms global TTFB.
          </p>
          <span className="mt-2 text-[11px] font-mono font-semibold text-blue-600 dark:text-blue-400 underline decoration-blue-500/30">
            Start Free Trial →
          </span>
        </div>
      )}
    </aside>
  );
}
