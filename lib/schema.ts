import { z } from 'zod';

export const AuthorSchema = z.object({
  name: z.string({ required_error: 'Author name is required' }),
  role: z.string().default('Core Infrastructure Engineer'),
  avatar: z.string().default('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'),
  github: z.string().optional(),
  twitter: z.string().optional(),
});

export const PostFrontmatterSchema = z.object({
  title: z.string({ required_error: 'Article title is required' }).min(5, 'Title must be at least 5 characters long'),
  description: z.string({ required_error: 'Article description is required' }).min(10, 'Description must be at least 10 characters long'),
  date: z.string({ required_error: 'Article publication date is required' }).regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be formatted as YYYY-MM-DD'),
  author: z.union([z.string(), AuthorSchema]).transform((val) => {
    if (typeof val === 'string') {
      return {
        name: val,
        role: 'Core Systems Architect',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      };
    }
    return val;
  }),
  category: z.string({ required_error: 'Category is required' }),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  featuredImage: z.string().optional().default('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80'),
  draft: z.boolean().optional().default(false),
  canonicalUrl: z.string().optional(),
});

export type Author = z.infer<typeof AuthorSchema>;
export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>;

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTimeMinutes: number;
  readingTimeText: string;
  wordCount: number;
  headings: { id: string; text: string; depth: number }[];
}
