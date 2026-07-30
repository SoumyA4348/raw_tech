export function calculateReadingTime(text: string): {
  wordCount: number;
  minutes: number;
  text: string;
} {
  // Strip code blocks and HTML/MDX tags for accurate word count calculation
  const cleanText = text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/#+\s/g, '')
    .trim();

  const words = cleanText ? cleanText.split(/\s+/).filter(Boolean).length : 0;
  const wordsPerMinute = 225;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));

  return {
    wordCount: words,
    minutes,
    text: `${minutes} min read`,
  };
}
