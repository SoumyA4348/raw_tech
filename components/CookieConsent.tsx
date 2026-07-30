'use client';

import React, { useState, useEffect } from 'react';
import { Cookie, Shield, Check, Settings, X } from 'lucide-react';
import Link from 'next/link';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Delay display slightly for smooth page entry
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const consentData = { essential: true, analytics: true, marketing: true, timestamp: new Date().toISOString() };
    localStorage.setItem('cookie_consent', JSON.stringify(consentData));
    setVisible(false);
  };

  const handleRejectNonEssential = () => {
    const consentData = { essential: true, analytics: false, marketing: false, timestamp: new Date().toISOString() };
    localStorage.setItem('cookie_consent', JSON.stringify(consentData));
    setVisible(false);
  };

  const handleSavePreferences = () => {
    const consentData = { ...preferences, essential: true, timestamp: new Date().toISOString() };
    localStorage.setItem('cookie_consent', JSON.stringify(consentData));
    setShowPreferences(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-5 shadow-2xl backdrop-blur-md transition-all animate-in slide-in-from-bottom duration-300"
    >
      {!showPreferences ? (
        <div>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 shrink-0 mt-0.5">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                Privacy & Cookie Compliance (GDPR/CCPA)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                We use cookies to analyze site traffic, personalize content, and serve asynchronous ad units. Read our{' '}
                <Link href="/privacy" className="text-blue-500 hover:underline">
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={handleAcceptAll}
              className="flex-1 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-md shadow-blue-500/20"
            >
              Accept All
            </button>
            <button
              onClick={handleRejectNonEssential}
              className="py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs transition-colors"
            >
              Essential Only
            </button>
            <button
              onClick={() => setShowPreferences(true)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              title="Customize Preferences"
              aria-label="Customize Cookie Preferences"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-slate-100">
              <Shield className="w-4 h-4 text-blue-500" />
              Cookie Preferences
            </div>
            <button
              onClick={() => setShowPreferences(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 my-4 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Strictly Essential</span>
                <p className="text-[11px] text-slate-500">Core engine navigation & theme state</p>
              </div>
              <input type="checkbox" checked disabled className="accent-blue-500 cursor-not-allowed" />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Analytics Data</span>
                <p className="text-[11px] text-slate-500">Traffic performance statistics</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                className="accent-blue-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">AdSense & Monetization</span>
                <p className="text-[11px] text-slate-500">Async ad units & partner offers</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                className="accent-blue-500 cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={handleSavePreferences}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" /> Save Selected Preferences
          </button>
        </div>
      )}
    </div>
  );
}
