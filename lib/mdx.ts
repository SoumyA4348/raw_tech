import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostFrontmatterSchema, Post } from './schema';
import { calculateReadingTime } from './readingTime';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

export function extractHeadings(content: string): { id: string; text: string; depth: number }[] {
  const headingLines = content.match(/^#{2,3}\s+.+$/gm) || [];
  return headingLines.map((line) => {
    const depth = line.startsWith('###') ? 3 : 2;
    const text = line.replace(/^#{2,3}\s+/, '').trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    return { id, text, depth };
  });
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith('.mdx') || file.endsWith('.md'));
}

export function getPostBySlug(slugWithExt: string): Post | null {
  try {
    const realSlug = slugWithExt.replace(/\.mdx$/, '').replace(/\.md$/, '');
    const fullPath = fs.existsSync(path.join(POSTS_DIR, `${realSlug}.mdx`))
      ? path.join(POSTS_DIR, `${realSlug}.mdx`)
      : path.join(POSTS_DIR, `${realSlug}.md`);

    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Zod Gatekeeper validation
    const parsedFrontmatter = PostFrontmatterSchema.parse(data);
    const readingTime = calculateReadingTime(content);
    const headings = extractHeadings(content);

    return {
      slug: realSlug,
      frontmatter: parsedFrontmatter,
      content,
      readingTimeMinutes: readingTime.minutes,
      readingTimeText: readingTime.text,
      wordCount: readingTime.wordCount,
      headings,
    };
  } catch (error) {
    console.error(`Error loading post by slug ${slugWithExt}:`, error);
    return null;
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null && !post.frontmatter.draft)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  return posts;
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((post) => post.frontmatter.category));
  return Array.from(categories);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags);
}
