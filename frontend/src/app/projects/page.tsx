import { getProjects } from "@/lib/api";
import ProjectCard from "@/components/ProjectCard";

export default async function ProjectsPage() {
  let projects;
  try {
    const data = await getProjects();
    projects = data.results;
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
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Projects</h1>
        <p className="text-fg-secondary text-sm mt-2">
          Things I&apos;ve built and worked on
        </p>
      </div>
      {projects.length === 0 ? (
        <p className="text-fg-secondary">No projects yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
