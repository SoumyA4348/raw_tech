import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/mdx';

export const runtime = 'nodejs';
export const alt = 'The Core Engine Article Preview';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  const title = post ? post.frontmatter.title : 'The Core Engine';
  const category = post ? post.frontmatter.category : 'Infrastructure';
  const authorName = post
    ? typeof post.frontmatter.author === 'string'
      ? post.frontmatter.author
      : post.frontmatter.author.name
    : 'Core Team';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#0d1117',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          backgroundImage: 'radial-gradient(circle at 100% 0%, #1d4ed8 0%, #0d1117 50%)',
          color: '#ffffff',
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              padding: '10px 20px',
              borderRadius: '20px',
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              color: '#58a6ff',
              fontSize: '20px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {category}
          </div>
          <span style={{ color: '#8b949e', fontSize: '20px' }}>•</span>
          <span style={{ color: '#8b949e', fontSize: '20px', fontWeight: 600 }}>
            The Core Engine (Infrastructure)
          </span>
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '-1.5px',
            maxWidth: '1000px',
            marginTop: '30px',
            marginBottom: '30px',
            color: '#f0f6fc',
          }}
        >
          {title}
        </div>

        {/* Bottom Footer info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: '30px',
            borderTop: '1px solid #30363d',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 700,
                color: '#ffffff',
              }}
            >
              {authorName.charAt(0)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '22px', fontWeight: 700, color: '#f0f6fc' }}>
                {authorName}
              </span>
              <span style={{ fontSize: '16px', color: '#8b949e' }}>
                Core Systems Engineer
              </span>
            </div>
          </div>

          <div
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#58a6ff',
              letterSpacing: '0.5px',
            }}
          >
            core-engine.infra ⚡
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
