import { getProjects, getSkills, getCertificates } from "@/lib/api";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificatesSection from "@/components/CertificatesSection";
import SkillsSection from "@/components/SkillsSection";
import ContactForm from "@/components/ContactForm";
import FloatingTools from "@/components/FloatingTools";
import FloatingClouds from "@/components/FloatingClouds";

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

  return (
    <div>
      <FloatingTools />

      <FloatingClouds />

      <HeroSection />

      <StatsSection />

      <ProjectsSection projects={projects} />

      <CertificatesSection certificates={certificates} />

      <SkillsSection allSkills={allSkills} />

      {/* Contact */}
      <section id="contact" className="relative py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-accent mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Contact
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Get in Touch
            </h2>
            <p className="text-fg-secondary text-lg">
              Have a question or want to work together? Drop me a message.
            </p>
          </div>
          <div className="glass rounded-2xl p-8">
            <ContactForm />
          </div>
        </div>
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
      </section>
    </div>
  );
}
