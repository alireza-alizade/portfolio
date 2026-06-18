import { getProject, getProjects } from "@/lib/api";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const data = await getProjects();
    return data.results.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  let project;
  try {
    project = await getProject(slug);
  } catch {
    notFound();
  }

  return (
    <article className="px-6 md:px-8 lg:px-12 py-16 max-w-4xl mx-auto">
      <div className="mb-8">
        <a
          href="/projects"
          className="inline-flex items-center px-3 py-1.5 text-sm text-fg-muted bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:text-fg hover:border-white/20 transition-all no-underline mb-4"
        >
          &larr; Back to Projects
        </a>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">{project.title}</h1>
        {project.featured && (
          <span className="text-xs text-accent mt-2 inline-block">Featured</span>
        )}
      </div>

      <p className="text-lg text-fg-secondary leading-relaxed">{project.description}</p>

      {project.content && (
        <div className="mt-8 text-fg-secondary leading-relaxed whitespace-pre-wrap">
          {project.content}
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-fg-muted uppercase tracking-wider mb-3">
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.tech_stack.map((tech) => (
            <span
              key={tech}
              className="text-sm text-fg bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-xl"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 flex gap-4">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium rounded-xl hover:bg-white/20 hover:border-white/30 hover:text-fg hover:scale-105 active:scale-95 transition-all"
          >
            GitHub
          </a>
        )}
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 bg-accent/20 backdrop-blur-md border border-accent/30 text-accent text-sm font-medium rounded-xl hover:bg-accent/30 hover:border-accent/50 hover:scale-105 active:scale-95 transition-all"
          >
            Live Site
          </a>
        )}
      </div>
    </article>
  );
}
