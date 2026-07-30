import { Post } from './schema';

export function getArticleJsonLd(post: Post, siteUrl: string) {
  const authorName = typeof post.frontmatter.author === 'string' ? post.frontmatter.author : post.frontmatter.author.name;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image: [post.frontmatter.featuredImage],
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    author: [
      {
        '@type': 'Person',
        name: authorName,
        url: siteUrl,
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: 'The Core Engine',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/posts/${post.slug}`,
    },
    wordCount: post.wordCount,
    keywords: post.frontmatter.tags.join(', '),
  };
}

export function getWebsiteJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'The Core Engine',
    url: siteUrl,
    description: 'High-Performance Technical Blog on Edge Infrastructure, Agentic AI, and Systems Engineering',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}
