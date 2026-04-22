import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedBlogPosts, getUpcomingBlogPosts } from "@/lib/blog";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Word Game Blog - Strategy, Training, and Unscrambling Guides",
  description:
    "Read practical word game strategy guides and training posts published on a regular schedule for Scrabble, Wordle, and anagram improvement.",
  alternates: {
    canonical: "/blog"
  }
};

export default function BlogIndexPage() {
  const posts = getPublishedBlogPosts();
  const upcoming = getUpcomingBlogPosts();

  return (
    <main className="space-y-6">
      <section className="rounded-xl border border-border/70 bg-card/40 p-5 sm:p-6">
        <h2 className="text-2xl font-semibold sm:text-3xl">Word Game Blog</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          We publish practical guides on a regular schedule. Older entries remain available as an evergreen library so players can
          train with proven methods.
        </p>
      </section>

      <section className="grid gap-4">
        {posts.map((post) => (
          <article key={post.slug} className="rounded-xl border border-border/70 bg-card/40 p-5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>Published {post.publishedAt}</span>
              <span>•</span>
              <span>By {post.author}</span>
            </div>
            <h3 className="mt-2 text-xl font-semibold">
              <Link className="underline-offset-4 hover:underline" href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border px-2 py-1 text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-border/70 bg-card/30 p-5">
        <h3 className="text-lg font-semibold">Scheduled Publishing Queue</h3>
        {upcoming.length ? (
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {upcoming.slice(0, 6).map((post) => (
              <li key={post.slug}>
                {post.publishedAt}: {post.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            All queued posts are currently published. Add more entries in the content queue to continue automatic rollouts.
          </p>
        )}
      </section>
    </main>
  );
}
