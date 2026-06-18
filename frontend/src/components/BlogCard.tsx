import type { PostListItem } from "@/lib/api";

export default function BlogCard({ post }: { post: PostListItem }) {
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <article className="group border border-white/10 rounded-xl p-6 hover:border-white/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 transition-all">
      {date && <p className="text-xs text-fg-muted mb-2">{date}</p>}
      <h2 className="text-lg font-semibold">
        <a
          href={`/blog/${post.slug}`}
          className="text-fg no-underline hover:text-accent transition-colors"
        >
          {post.title}
        </a>
      </h2>
      {post.excerpt && (
        <p className="text-fg-secondary text-sm mt-2 line-clamp-2">{post.excerpt}</p>
      )}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-fg-muted bg-white/5 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-lg"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
