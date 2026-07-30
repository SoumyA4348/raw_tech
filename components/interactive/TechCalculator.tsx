'use client';

import React, { useState } from 'react';
import { Calculator, Cpu, Zap, DollarSign } from 'lucide-react';

export default function TechCalculator() {
  const [nodes, setNodes] = useState<number>(12);
  const [requestsPerSec, setRequestsPerSec] = useState<number>(5000);
  const [cacheHitRatio, setCacheHitRatio] = useState<number>(85);

  // Math calculation
  const totalMonthlyRequests = requestsPerSec * 60 * 60 * 24 * 30; // approx per month
  const rawCost = (totalMonthlyRequests / 1_000_000) * 0.40; // $0.40 per M req
  const savedCost = rawCost * (cacheHitRatio / 100);
  const netCost = rawCost - savedCost + nodes * 15; // $15 per node
  const latencyMs = Math.max(2, Math.round(45 - (nodes * 1.5) - (cacheHitRatio * 0.2)));

  return (
    <div className="my-8 rounded-xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/5 to-transparent dark:bg-slate-900/90 p-6 shadow-xl backdrop-blur">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Interactive Edge Architecture ROI Calculator
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Estimate monthly cost & latency gains live
            </p>
          </div>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
          Interactive Component
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        {/* Slider 1: Nodes */}
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex justify-between mb-1">
            <span>Edge Nodes</span>
            <span className="font-mono text-emerald-500">{nodes} nodes</span>
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={nodes}
            onChange={(e) => setNodes(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        {/* Slider 2: Requests */}
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex justify-between mb-1">
            <span>Req / Sec</span>
            <span className="font-mono text-emerald-500">{requestsPerSec.toLocaleString()} rps</span>
          </label>
          <input
            type="range"
            min="500"
            max="20000"
            step="500"
            value={requestsPerSec}
            onChange={(e) => setRequestsPerSec(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        {/* Slider 3: Cache Hit Ratio */}
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex justify-between mb-1">
            <span>Edge Cache Hit</span>
            <span className="font-mono text-emerald-500">{cacheHitRatio}%</span>
          </label>
          <input
            type="range"
            min="10"
            max="99"
            value={cacheHitRatio}
            onChange={(e) => setCacheHitRatio(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Output Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Avg Latency
          </div>
          <p className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100">
            {latencyMs} ms
          </p>
        </div>

        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
            Monthly Savings
          </div>
          <p className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            ${Math.round(savedCost).toLocaleString()}
          </p>
        </div>

        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <Cpu className="w-3.5 h-3.5 text-blue-500" />
            Est Net Cost
          </div>
          <p className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100">
            ${Math.round(netCost).toLocaleString()}/mo
          </p>
        </div>
      </div>
    </div>
  );
}
