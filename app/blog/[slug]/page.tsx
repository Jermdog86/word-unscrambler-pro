import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/blog";
import { AdPlaceholder } from "@/components/ad-placeholder";

export const revalidate = 3600;

type RouteParams = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found"
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article"
    }
  };
}

export default async function BlogPostPage({ params }: RouteParams) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="space-y-6">
      <article className="rounded-xl border border-border/70 bg-card/40 p-5 sm:p-6">
        <div className="mx-auto max-w-3xl">
          <header className="border-b border-border/70 pb-4">
            <p className="text-xs text-muted-foreground">
              Published {post.publishedAt} • Updated {post.updatedAt ?? post.publishedAt}
            </p>
            <h2 className="mt-2 text-balance text-2xl font-semibold sm:text-3xl">{post.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border px-2 py-1 text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="mt-6 space-y-4 text-sm leading-7 text-foreground/95 sm:text-base">
            {post.content.map((paragraph, index) => (
              <div key={paragraph}>
                <p>{paragraph}</p>
                {/* Ad placement after every 2 paragraphs */}
                {(index + 1) % 2 === 0 && index < post.content.length - 1 && (
                  <div className="my-6 hidden lg:block">
                    <AdPlaceholder format="horizontal" label="Content Recommendation" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* Bottom ad placement */}
      <div className="hidden lg:block">
        <AdPlaceholder format="horizontal" label="Related Content" />
      </div>
    </main>
  );
}
