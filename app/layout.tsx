import React from 'react';
import type { Metadata } from 'next';
import { ThemeProvider, ThemeScript } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import ReadingProgress from '@/components/ReadingProgress';
import { getWebsiteJsonLd } from '@/lib/jsonLd';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://core-engine-infra.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'The Core Engine | Infrastructure & MDX Systems',
    template: '%s | The Core Engine',
  },
  description: 'Pre-rendered SSG blog delivering zero-latency insights on Agentic AI, Edge Compute, and High-Performance Distributed Systems.',
  keywords: ['Infrastructure', 'MDX', 'Next.js', 'SSG', 'Agentic AI', 'Shiki', 'Zod', 'Edge Compute'],
  authors: [{ name: 'Core Engine Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'The Core Engine | Infrastructure & MDX Systems',
    description: 'Pre-rendered SSG blog delivering zero-latency technical insights.',
    siteName: 'The Core Engine',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Core Engine',
    description: 'Pre-rendered SSG blog delivering zero-latency technical insights.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getWebsiteJsonLd(siteUrl);

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <ThemeScript />
        {/* Injected Website JSON-LD Structured Data for Google ML Models */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-blue-500/30">
        <ReadingProgress />
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
