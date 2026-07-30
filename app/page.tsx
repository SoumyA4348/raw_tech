import React from 'react';
import Link from 'next/link';
import { getAllPosts, getAllCategories } from '@/lib/mdx';
import ArticleGrid from '@/components/ArticleGrid';
import AdUnit from '@/components/AdUnit';
import { Clock, ShieldCheck, Cpu, Zap, ArrowRight, Activity, Terminal } from 'lucide-react';

export const revalidate = 3600;

export default function HomePage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const featuredPost = posts[0];

  return (
    <div className="space-y-12">
      {/* UI/UX Pro Max Spotlight Hero */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800/80 bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent dark:bg-slate-900/60 p-8 sm:p-14 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-sm">
            <Zap className="w-3.5 h-3.5" /> Static Site Generation (SSG) • Sub-10ms TTFB
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-sans leading-[1.1]">
            The Core Engine{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400">
              (Infrastructure)
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            High-performance engineering publication delivering zero-latency insights on Agentic AI, Edge Computing, and Distributed Systems.
          </p>

          {/* Design System Checklist Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Zod Gatekeeper Validated
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-sm flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-blue-500" /> Interactive MDX Components
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-sm flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500" /> 225 WPM Reading Estimator
            </span>
          </div>
        </div>
      </section>

      {/* Featured Article Banner */}
      {featuredPost && (
        <section className="relative rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent p-6 sm:p-8 backdrop-blur-md overflow-hidden group">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 h-64 rounded-xl overflow-hidden bg-slate-950 border border-slate-700/50">
              <img
                src={featuredPost.frontmatter.featuredImage}
                alt={featuredPost.frontmatter.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-500 uppercase tracking-wider">
                <Activity className="w-4 h-4" /> Featured Publication
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors">
                <Link href={`/posts/${featuredPost.slug}`}>
                  {featuredPost.frontmatter.title}
                </Link>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {featuredPost.frontmatter.description}
              </p>
              <div className="pt-2">
                <Link
                  href={`/posts/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all"
                >
                  Read Featured Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Asynchronous Ad Unit */}
      <AdUnit slotId="homepage-middle-ad" format="banner" />

      {/* Article Grid with Live Search & Category Filter */}
      <ArticleGrid posts={posts} categories={categories} />
    </div>
  );
}
