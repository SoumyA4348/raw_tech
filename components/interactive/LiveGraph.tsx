'use client';

import React, { useState } from 'react';
import { Activity, BarChart2, TrendingUp, RefreshCw } from 'lucide-react';

interface Dataset {
  label: string;
  path: string;
  dots: number[];
  color: string;
  badge: string;
  desc: string;
}

const DATASETS: Record<string, Dataset> = {
  agentic: {
    label: 'Agentic AI Workloads',
    path: 'M 50 160 Q 250 90 450 30',
    dots: [160, 90, 30],
    color: '#58a6ff',
    badge: '+340% YoY Growth',
    desc: 'Autonomous multi-step execution workloads across distributed edge & cloud nodes.',
  },
  physical: {
    label: 'Physical AI Robotics',
    path: 'M 50 165 Q 250 140 450 60',
    dots: [165, 140, 60],
    color: '#3fb950',
    badge: '+210% YoY Growth',
    desc: 'Real-time telemetry and spatial perception inference for humanoid hardware.',
  },
  edge: {
    label: 'Edge Compute Clusters',
    path: 'M 50 120 Q 250 85 450 50',
    dots: [120, 85, 50],
    color: '#a371f7',
    badge: '+185% YoY Growth',
    desc: 'Zero-latency localized processing replacing legacy centralized cloud data centers.',
  },
};

export default function LiveGraph({ initialTrend = 'agentic' }: { initialTrend?: string }) {
  const [activeTrend, setActiveTrend] = useState<string>(initialTrend);
  const data = DATASETS[activeTrend] || DATASETS.agentic;

  return (
    <div className="my-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 shadow-xl backdrop-blur transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
            <Activity className="w-4 h-4" />
            Interactive MDX Component
          </div>
          <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            Global Compute Infrastructure Growth
          </h4>
        </div>
        <span
          className="self-start sm:self-auto inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
          style={{ backgroundColor: `${data.color}20`, color: data.color }}
        >
          {data.badge}
        </span>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap gap-2 my-4">
        {Object.entries(DATASETS).map(([key, item]) => (
          <button
            key={key}
            onClick={() => setActiveTrend(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all flex items-center gap-1.5 border ${
              activeTrend === key
                ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            {item.label}
          </button>
        ))}
      </div>

      {/* Graph Visualizer */}
      <div className="relative py-4 bg-slate-50 dark:bg-slate-950/60 rounded-lg p-4 border border-slate-200/60 dark:border-slate-800/60">
        <svg viewBox="0 0 500 200" className="w-full h-auto overflow-visible">
          {/* Grid lines */}
          <line x1="50" y1="20" x2="450" y2="20" stroke="currentColor" className="text-slate-300 dark:text-slate-800" strokeDasharray="4" />
          <line x1="50" y1="90" x2="450" y2="90" stroke="currentColor" className="text-slate-300 dark:text-slate-800" strokeDasharray="4" />
          <line x1="50" y1="160" x2="450" y2="160" stroke="currentColor" className="text-slate-300 dark:text-slate-800" />

          {/* Labels */}
          <text x="50" y="182" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 text-[11px] font-mono">2024</text>
          <text x="250" y="182" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 text-[11px] font-mono">2025</text>
          <text x="450" y="182" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 text-[11px] font-mono">2026</text>

          <text x="40" y="25" textAnchor="end" className="fill-slate-500 dark:fill-slate-400 text-[10px] font-mono">100k OPS</text>
          <text x="40" y="95" textAnchor="end" className="fill-slate-500 dark:fill-slate-400 text-[10px] font-mono">50k OPS</text>
          <text x="40" y="165" textAnchor="end" className="fill-slate-500 dark:fill-slate-400 text-[10px] font-mono">10k OPS</text>

          {/* Curve */}
          <path
            d={data.path}
            fill="none"
            stroke={data.color}
            strokeWidth="3.5"
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />

          {/* Dots */}
          <circle cx="50" cy={data.dots[0]} r="5" fill={data.color} className="transition-all duration-500" />
          <circle cx="250" cy={data.dots[1]} r="5" fill={data.color} className="transition-all duration-500" />
          <circle cx="450" cy={data.dots[2]} r="6" fill={data.color} className="transition-all duration-500 ring-4 ring-blue-500/20" />
        </svg>
      </div>

      <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 font-mono flex items-start gap-2">
        <span className="text-blue-500">💡</span> {data.desc}
      </p>
    </div>
  );
}
