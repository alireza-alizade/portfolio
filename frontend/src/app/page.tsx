import { getProjects, getSkills, getCertificates } from "@/lib/api";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import RevealOnScroll from "@/components/RevealOnScroll";
import FloatingTools from "@/components/FloatingTools";
import { FaMicrosoft } from "react-icons/fa6";
import {
  SiAmazonwebservices,
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiAnsible,
  SiGithubactions,
  SiGitlab,
  SiJenkins,
  SiPrometheus,
  SiGrafana,
  SiLinux,
  SiNginx,
  SiGit,
  SiPython,
  SiPostgresql,
  SiRedis,
  SiArgo,
} from "react-icons/si";

function CertificateIcon({ icon }: { icon: string }) {
  if (!icon) return null;
  const isEmoji = /\p{Emoji}/u.test(icon);
  if (isEmoji) return <span className="text-2xl">{icon}</span>;
  return (
    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">
      {icon.slice(0, 2)}
    </div>
  );
}

export default async function HomePage() {
  let projects: any[] = [];
  let skills: any[] = [];
  let certificates: any[] = [];

  try {
    const [projData, skillData, certData] = await Promise.all([
      getProjects(),
      getSkills(),
      getCertificates(),
    ]);
    projects = projData.results ?? [];
    skills = skillData.results ?? [];
    certificates = certData.results ?? [];
  } catch {
    // offline-safe: sections still render with empty state
  }

  const allSkills = skills.flatMap((cat: any) => cat.skills ?? []);

  const tools = [
    { icon: SiDocker, label: "Docker" },
    { icon: SiKubernetes, label: "Kubernetes" },
    { icon: SiAmazonwebservices, label: "AWS" },
    { icon: SiGooglecloud, label: "GCP" },
    { icon: FaMicrosoft, label: "Azure" },
    { icon: SiTerraform, label: "Terraform" },
    { icon: SiAnsible, label: "Ansible" },
    { icon: SiArgo, label: "ArgoCD" },
    { icon: SiGithubactions, label: "GitHub Actions" },
    { icon: SiGitlab, label: "GitLab CI" },
    { icon: SiJenkins, label: "Jenkins" },
    { icon: SiPrometheus, label: "Prometheus" },
    { icon: SiGrafana, label: "Grafana" },
    { icon: SiLinux, label: "Linux" },
    { icon: SiNginx, label: "Nginx" },
    { icon: SiGit, label: "Git" },
    { icon: SiPython, label: "Python" },
    { icon: SiPostgresql, label: "PostgreSQL" },
    { icon: SiRedis, label: "Redis" },
  ];

  return (
    <div>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] bg-repeat opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-surface/20 to-bg" />
      </div>

      <FloatingTools />

      {/* ─── Hero ─── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center px-6 lg:px-16 xl:px-24"
      >
        <p
          className="text-sm text-fg-secondary mb-4 font-medium tracking-wide uppercase animate-swipe-up"
          style={{ animationDelay: "0ms" }}
        >
          Hello, I&apos;m
        </p>
        <h1
          className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-none animate-swipe-up"
          style={{ animationDelay: "100ms" }}
        >
          Alireza
        </h1>
        <h2
          className="text-2xl sm:text-3xl text-fg-secondary mt-3 font-medium animate-swipe-up"
          style={{ animationDelay: "200ms" }}
        >
          DevOps Engineer
        </h2>
        <p
          className="text-fg-secondary mt-6 max-w-xl text-lg leading-relaxed animate-swipe-up"
          style={{ animationDelay: "300ms" }}
        >
          I build reliable, scalable infrastructure and automate everything that can be
          automated. Expert in CI/CD, containerization, infrastructure as code, and cloud
          platforms.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 mt-10 animate-swipe-up"
          style={{ animationDelay: "400ms" }}
        >
          <a
            href="#projects"
            className="inline-flex items-center px-6 py-3 bg-accent/20 backdrop-blur-md border border-accent/30 text-accent font-medium rounded-xl hover:bg-accent/30 hover:border-accent/50 hover:scale-105 active:scale-95 transition-all text-sm"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-fg-secondary font-medium rounded-xl hover:bg-white/20 hover:border-white/30 hover:text-fg hover:scale-105 active:scale-95 transition-all text-sm"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* ─── Projects ─── */}
      <RevealOnScroll direction="left">
        <section
          id="projects"
        className="relative min-h-screen flex flex-col justify-center px-6 lg:px-16 xl:px-24"
      >
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-xs text-accent font-medium tracking-widest uppercase mb-2">Featured Work</p>
              <h2 className="text-3xl sm:text-4xl font-bold">Projects</h2>
              <p className="text-fg-secondary text-sm mt-2">Some things I&apos;ve built</p>
            </div>
          </div>
          {projects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-xl border border-dashed border-white/10 py-16">
              <p className="text-sm text-fg-muted">Projects coming soon</p>
            </div>
          )}
        </section>
      </RevealOnScroll>

      {/* ─── Certificates ─── */}
      <RevealOnScroll direction="right">
        <section
          id="certificates"
        className="relative min-h-screen flex flex-col justify-center px-6 lg:px-16 xl:px-24"
      >
          <div className="w-full">
            <div className="mb-12">
              <p className="text-xs text-accent font-medium tracking-widest uppercase mb-2">Credentials</p>
              <h2 className="text-3xl sm:text-4xl font-bold">Certificates</h2>
              <p className="text-fg-secondary text-sm mt-2">Professional certifications &amp; achievements</p>
            </div>
            {certificates.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {certificates.map((cert) => (
                  <a
                    key={cert.id}
                    href={cert.url || undefined}
                    target={cert.url ? "_blank" : undefined}
                    rel={cert.url ? "noopener noreferrer" : undefined}
                    className={`flex items-start gap-4 p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all ${
                      cert.url
                        ? "hover:bg-white/10 hover:border-accent/30 hover:-translate-y-0.5"
                        : "cursor-default"
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      <CertificateIcon icon={cert.icon} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-fg truncate">{cert.title}</h3>
                      <p className="text-sm text-fg-secondary mt-0.5">{cert.issuer}</p>
                      <p className="text-xs text-fg-muted mt-1">
                        {new Date(cert.date_obtained).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-xl border border-dashed border-white/10 py-16">
                <p className="text-sm text-fg-muted">Certificates coming soon</p>
              </div>
            )}
          </div>
        </section>
      </RevealOnScroll>

      {/* ─── Expertise (Skills & Tools) ─── */}
      <RevealOnScroll direction="left">
        <section
          id="expertise"
        className="relative min-h-screen flex flex-col justify-center px-6 lg:px-16 xl:px-24"
      >
        <div className="mb-12">
          <p className="text-xs text-accent font-medium tracking-widest uppercase mb-2">Expertise</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Skills &amp; Tools</h2>
            <p className="text-fg-secondary text-sm mt-2">Technologies I work with</p>
          </div>

          {allSkills.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-fg mb-4">My Skills</h3>
              <div className="overflow-hidden">
                <div className="flex gap-3 animate-marquee w-max">
                  {[...allSkills, ...allSkills].map((skill: any, i) => (
                    <span
                      key={`${skill.id}-${i}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-fg-secondary whitespace-nowrap"
                    >
                      {skill.icon && <span>{skill.icon}</span>}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-fg mb-4">Tools</h3>
            <div className="overflow-hidden">
              <div className="flex gap-3 animate-marquee-reverse w-max">
                {[
                  ...tools,
                  ...tools,
                ].map(({ icon: Icon, label }, i) => (
                  <div
                    key={`${label}-${i}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-fg-secondary whitespace-nowrap hover:bg-white/10 hover:border-accent/30 hover:text-fg transition-all group"
                  >
                    <Icon className="w-5 h-5 text-fg-secondary group-hover:text-accent transition-colors" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </section>
      </RevealOnScroll>

      {/* ─── Contact ─── */}
      <RevealOnScroll direction="right">
        <section
          id="contact"
          className="relative min-h-screen flex flex-col justify-center px-6 lg:px-16 xl:px-24"
        >
          <div className="max-w-3xl mx-auto w-full">
            <div className="mb-10">
              <p className="text-xs text-accent font-medium tracking-widest uppercase mb-2">Contact</p>
              <h2 className="text-3xl sm:text-4xl font-bold">Get in Touch</h2>
              <p className="text-fg-secondary text-sm mt-2">
                Have a question or want to work together? Drop me a message.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </RevealOnScroll>
    </div>
  );
}
