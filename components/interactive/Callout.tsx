'use client';

import React from 'react';
import { Info, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'danger';
  title?: string;
  children: React.ReactNode;
}

export default function Callout({ type = 'info', title, children }: CalloutProps) {
  const configs = {
    info: {
      border: 'border-blue-500/40',
      bg: 'bg-blue-500/10 text-blue-900 dark:text-blue-200',
      icon: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
      defaultTitle: 'Engineering Note',
    },
    warning: {
      border: 'border-amber-500/40',
      bg: 'bg-amber-500/10 text-amber-900 dark:text-amber-200',
      icon: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
      defaultTitle: 'Architectural Consideration',
    },
    success: {
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-500/10 text-emerald-900 dark:text-emerald-200',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
      defaultTitle: 'Production Benchmark',
    },
    danger: {
      border: 'border-rose-500/40',
      bg: 'bg-rose-500/10 text-rose-900 dark:text-rose-200',
      icon: <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />,
      defaultTitle: 'Critical Warning',
    },
  };

  const config = configs[type] || configs.info;

  return (
    <div className={`my-6 rounded-xl border p-4 ${config.border} ${config.bg} backdrop-blur`}>
      <div className="flex items-start gap-3">
        {config.icon}
        <div className="flex-1">
          <p className="font-bold text-sm mb-1">{title || config.defaultTitle}</p>
          <div className="text-sm leading-relaxed opacity-90">{children}</div>
        </div>
      </div>
    </div>
  );
}
