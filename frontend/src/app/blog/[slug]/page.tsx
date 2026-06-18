import { getPost, getPosts } from "@/lib/api";
import { notFound } from "next/navigation";
import MarkdownContent from "./MarkdownContent";

export async function generateStaticParams() {
  try {
    const data = await getPosts();
    return data.results.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  let post;
  try {
    post = await getPost(slug);
  } catch {
    notFound();
  }

  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article className="px-6 md:px-8 lg:px-12 py-16 max-w-3xl mx-auto">
      <a
        href="/blog"
        className="inline-flex items-center px-3 py-1.5 text-sm text-fg-muted bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:text-fg hover:border-white/20 transition-all no-underline mb-6"
      >
        &larr; Back to Blog
      </a>
      <div className="mb-10">
        {date && <p className="text-sm text-fg-muted mb-2">{date}</p>}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{post.title}</h1>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-fg-muted bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-fg transition-all"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <MarkdownContent content={post.content_markdown} />
    </article>
  );
}
