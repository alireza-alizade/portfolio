import type { Project } from "@/lib/api";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group border border-white/10 rounded-xl p-6 hover:border-white/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-fg">
            {project.title}
          </h3>
          <p className="text-fg-secondary text-sm mt-2 line-clamp-2">{project.description}</p>
        </div>
        {project.featured && (
          <span className="text-xs text-accent shrink-0 mt-1">Featured</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {project.tech_stack.map((tech) => (
          <span
            key={tech}
            className="text-xs text-fg-muted bg-white/5 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-lg"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
