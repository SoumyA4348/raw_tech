import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const AuthorSchema = z.object({
  name: z.string({ required_error: 'Author name is required' }),
  role: z.string().optional(),
  avatar: z.string().optional(),
  github: z.string().optional(),
  twitter: z.string().optional(),
});

const PostFrontmatterSchema = z.object({
  title: z.string({ required_error: 'Article title is required' }).min(5, 'Title must be at least 5 characters long'),
  description: z.string({ required_error: 'Article description is required' }).min(10, 'Description must be at least 10 characters long'),
  date: z.string({ required_error: 'Article publication date is required' }).regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be formatted as YYYY-MM-DD'),
  author: z.union([z.string(), AuthorSchema]),
  category: z.string({ required_error: 'Category is required' }),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  featuredImage: z.string().optional(),
  draft: z.boolean().optional(),
});

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

console.log('🛡️  [Gatekeeper] Validating MDX Frontmatter metadata with Zod...');

if (!fs.existsSync(POSTS_DIR)) {
  console.error(`❌ Posts directory not found: ${POSTS_DIR}`);
  process.exit(1);
}

const files = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith('.mdx') || file.endsWith('.md'));

let hasErrors = false;
let validatedCount = 0;

for (const file of files) {
  const filePath = path.join(POSTS_DIR, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter } = matter(fileContent);

  const result = PostFrontmatterSchema.safeParse(frontmatter);

  if (!result.success) {
    hasErrors = true;
    console.error(`\n🚨 ZOD VALIDATION FAILED for file: ${file}`);
    result.error.errors.forEach((err) => {
      console.error(`   - Field [${err.path.join('.')}]: ${err.message}`);
    });
  } else {
    validatedCount++;
    console.log(`  ✓ ${file} passed validation (${result.data.title})`);
  }
}

if (hasErrors) {
  console.error('\n❌ BUILD HALTED: Frontmatter validation failed. Fix the metadata errors listed above before building.');
  process.exit(1);
} else {
  console.log(`\n✅ Gatekeeper Verification Passed! Successfully validated ${validatedCount} articles with Zod.\n`);
}
