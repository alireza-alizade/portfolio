import { getSkills } from "@/lib/api";

export default async function SkillsPage() {
  let categories;
  try {
    const data = await getSkills();
    categories = data.results;
  } catch {
    return (
      <div className="flex items-center justify-center min-h-[50vh] px-6">
        <p className="text-fg-secondary">Backend unreachable.</p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-8 lg:px-12 py-16 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Skills</h1>
        <p className="text-fg-secondary text-sm mt-2">
          Technologies and tools I use
        </p>
      </div>
      {categories.length === 0 ? (
        <p className="text-fg-secondary">No skills configured yet.</p>
      ) : (
        <div className="grid gap-10 md:grid-cols-2">
          {categories.map((cat) => (
            <div key={cat.id}>
              <h2 className="text-lg font-semibold mb-4">{cat.name}</h2>
              <div className="space-y-3">
                {cat.skills.map((skill) => (
                  <div key={skill.id} className="border border-white/10 rounded-xl p-4 hover:border-white/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/5 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">
                        {skill.icon && <span className="mr-2">{skill.icon}</span>}
                        {skill.name}
                      </p>
                      <span className="text-xs text-fg-muted">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
