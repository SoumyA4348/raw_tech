import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getPostSlugs } from '@/lib/mdx';
import { getArticleJsonLd } from '@/lib/jsonLd';
import TableOfContents from '@/components/TableOfContents';
import CodeBlock from '@/components/CodeBlock';
import LiveGraph from '@/components/interactive/LiveGraph';
import TechCalculator from '@/components/interactive/TechCalculator';
import Callout from '@/components/interactive/Callout';
import AdUnit from '@/components/AdUnit';
import { Clock, Calendar, Tag, ArrowLeft, Share2, User } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, '').replace(/\.md$/, ''),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://core-engine-infra.vercel.app';
  const authorName = typeof post.frontmatter.author === 'string' ? post.frontmatter.author : post.frontmatter.author.name;

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    authors: [{ name: authorName }],
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      authors: [authorName],
      tags: post.frontmatter.tags,
      images: [
        {
          url: `${siteUrl}/posts/${post.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: [`${siteUrl}/posts/${post.slug}/opengraph-image`],
    },
  };
}

export default function PostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://core-engine-infra.vercel.app';
  const jsonLd = getArticleJsonLd(post, siteUrl);
  const author =
    typeof post.frontmatter.author === 'string'
      ? { name: post.frontmatter.author, role: 'Core Architect', avatar: '' }
      : post.frontmatter.author;

  // Custom MDX component dictionary for interactive elements
  const mdxComponents = {
    LiveGraph,
    TechCalculator,
    Callout,
    // Custom CodeBlock handler for markdown fenced code blocks
    pre: (props: any) => {
      const codeElement = props.children;
      const code = codeElement?.props?.children || '';
      const className = codeElement?.props?.className || '';
      const language = className.replace(/language-/, '') || 'typescript';
      // Support extracting filename from codeblock meta props
      const filename = codeElement?.props?.filename || props.filename;

      return <CodeBlock code={typeof code === 'string' ? code.trim() : ''} language={language} filename={filename} />;
    },
    h2: (props: any) => {
      const text = props.children;
      const id = typeof text === 'string'
        ? text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
        : '';
      return (
        <h2 id={id} className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-12 mb-4 scroll-mt-24 pb-2 border-b border-slate-200 dark:border-slate-800">
          {props.children}
        </h2>
      );
    },
    h3: (props: any) => {
      const text = props.children;
      const id = typeof text === 'string'
        ? text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
        : '';
      return (
        <h3 id={id} className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mt-8 mb-3 scroll-mt-24">
          {props.children}
        </h3>
      );
    },
  };

  return (
    <>
      {/* Injected Article JSON-LD Structured Data for Google Search ML */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-500 hover:text-blue-400 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Content */}
          <article className="lg:col-span-8 space-y-8">
            {/* Article Header */}
            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  {post.frontmatter.category}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-mono text-amber-500 font-semibold px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readingTimeText} ({post.wordCount.toLocaleString()} words @ 225 WPM)
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
                {post.frontmatter.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {post.frontmatter.description}
              </p>

              {/* Author & Date Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-3">
                  {author.avatar ? (
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-blue-500/30"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {author.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      {author.name}
                    </div>
                    <div className="text-[11px] text-slate-500">{author.role}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Published {post.frontmatter.date}
                  </span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl max-h-[420px]">
              <img
                src={post.frontmatter.featuredImage}
                alt={post.frontmatter.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* MDX Content Pipeline Body */}
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-base leading-relaxed space-y-6">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>

            {/* Tags */}
            <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400 mr-1" />
                {post.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Asynchronous Ad Unit */}
            <AdUnit slotId="article-bottom-ad" format="banner" />
          </article>

          {/* Sticky Sidebar: Table of Contents & Ad Unit */}
          <aside className="lg:col-span-4 space-y-6">
            <TableOfContents headings={post.headings} />
            <AdUnit slotId="sidebar-ad" format="sidebar" />
          </aside>
        </div>
      </div>
    </>
  );
}
