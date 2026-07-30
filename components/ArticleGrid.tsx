'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Post } from '@/lib/schema';
import { Clock, Search, ArrowRight, User, Sparkles, Filter, Check } from 'lucide-react';

interface ArticleGridProps {
  posts: Post[];
  categories: string[];
}

export default function ArticleGrid({ posts, categories }: ArticleGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.frontmatter.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.frontmatter.title.toLowerCase().includes(q) ||
        post.frontmatter.description.toLowerCase().includes(q) ||
        post.frontmatter.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, tag, or topic..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Results count pill */}
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5 self-end sm:self-auto">
            <Filter className="w-3.5 h-3.5 text-blue-500" />
            <span>
              Showing <strong className="text-slate-900 dark:text-slate-100">{filteredPosts.length}</strong> of {posts.length} articles
            </span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-sans transition-all flex items-center gap-1.5 border ${
              selectedCategory === 'All'
                ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {selectedCategory === 'All' && <Check className="w-3.5 h-3.5" />}
            All Publications
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-sans transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Posts */}
      {filteredPosts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
          <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-3 animate-bounce" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">No articles found</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search query or category filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            const author =
              typeof post.frontmatter.author === 'string'
                ? { name: post.frontmatter.author, role: 'Author', avatar: '' }
                : post.frontmatter.author;

            return (
              <article
                key={post.slug}
                className="group relative flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 overflow-hidden shadow-lg hover:shadow-2xl hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Featured Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={post.frontmatter.featuredImage}
                    alt={post.frontmatter.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-900/80 text-blue-400 backdrop-blur border border-slate-700/60">
                    {post.frontmatter.category}
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Date & Reading Time */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2 font-mono">
                      <span>{post.frontmatter.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-amber-500 font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readingTimeText}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors line-clamp-2 leading-snug">
                      <Link href={`/posts/${post.slug}`} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {post.frontmatter.title}
                      </Link>
                    </h3>

                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {post.frontmatter.description}
                    </p>
                  </div>

                  {/* Footer Bar */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      {author.avatar ? (
                        <img
                          src={author.avatar}
                          alt={author.name}
                          className="w-6 h-6 rounded-full object-cover border border-slate-700"
                        />
                      ) : (
                        <User className="w-4 h-4 text-slate-400" />
                      )}
                      <span className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">
                        {author.name}
                      </span>
                    </div>

                    <span className="flex items-center gap-1 font-mono text-[11px] text-blue-500 font-bold group-hover:translate-x-1 transition-transform">
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
