import blogData from "@/content/blog-posts.json";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt?: string;
  coverHint: string;
};

type BackdatedPostInput = Omit<BlogPost, "author"> & {
  author?: string;
};

type ScheduledDraftInput = Omit<BlogPost, "author" | "publishedAt"> & {
  author?: string;
};

type BlogDataInput = {
  schedule: {
    author: string;
    cadenceDays: number;
    queueStartDate: string;
  };
  backdatedPosts: BackdatedPostInput[];
  scheduledDrafts: ScheduledDraftInput[];
};

const blogConfig = blogData as BlogDataInput;

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function toIsoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function withAuthors<T extends { author?: string }>(posts: T[]): Array<T & { author: string }> {
  return posts.map((post) => ({
    ...post,
    author: post.author ?? blogConfig.schedule.author
  }));
}

function buildScheduledPosts(): BlogPost[] {
  const { cadenceDays, queueStartDate } = blogConfig.schedule;
  const queueStart = new Date(`${queueStartDate}T00:00:00.000Z`);

  const backdated = withAuthors(blogConfig.backdatedPosts).map((post) => ({
    ...post
  }));

  const scheduled = withAuthors(blogConfig.scheduledDrafts).map((draft, index) => ({
    ...draft,
    publishedAt: toIsoDay(addDays(queueStart, index * cadenceDays))
  }));

  return [...backdated, ...scheduled].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

const allScheduledPosts = buildScheduledPosts();

function getPublishedPosts(today = new Date()): BlogPost[] {
  const todayIso = toIsoDay(today);
  return allScheduledPosts.filter((post) => post.publishedAt <= todayIso);
}

function getPostsFromLastSixMonths(today = new Date()): BlogPost[] {
  const sixMonthsAgo = new Date(today);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const sixMonthsAgoIso = toIsoDay(sixMonthsAgo);
  
  return getPublishedPosts(today).filter((post) => post.publishedAt >= sixMonthsAgoIso);
}

export function getPublishedBlogPosts(today = new Date()): BlogPost[] {
  return getPublishedPosts(today);
}

export function getPublishedBlogPostsLastSixMonths(today = new Date()): BlogPost[] {
  return getPostsFromLastSixMonths(today);
}

export function getUpcomingBlogPosts(today = new Date()): BlogPost[] {
  const todayIso = toIsoDay(today);
  return allScheduledPosts.filter((post) => post.publishedAt > todayIso);
}

export function getBlogPostBySlug(slug: string, today = new Date()): BlogPost | undefined {
  return getPublishedPosts(today).find((post) => post.slug === slug);
}

export function getAllBlogSlugs(today = new Date()): string[] {
  return getPublishedPosts(today).map((post) => post.slug);
}

export function getLatestBlogPosts(limit = 4, today = new Date()): BlogPost[] {
  return getPublishedPosts(today).slice(0, limit);
}
