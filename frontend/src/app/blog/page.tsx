import { getPosts, getTags } from "@/lib/api";
import BlogCard from "@/components/BlogCard";

export default async function BlogPage() {
  let posts, tags;
  try {
    [posts, tags] = await Promise.all([getPosts(), getTags()]);
  } catch {
    return (
      <div className="flex items-center justify-center min-h-[50vh] px-6">
        <p className="text-fg-secondary">Backend unreachable.</p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-8 lg:px-12 py-16 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Blog</h1>
        <p className="text-fg-secondary text-sm mt-2">Thoughts and write-ups</p>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-fg-muted bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-fg transition-all"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {posts.results.length === 0 ? (
        <p className="text-fg-secondary">No blog posts yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.results.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
