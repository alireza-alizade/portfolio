"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
import type { IconType } from "react-icons";

const tools: { icon: IconType; label: string }[] = [
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

interface Skill {
  id: number;
  name: string;
  icon: string;
  proficiency: number;
}

interface Props {
  allSkills: Skill[];
}

export default function SkillsSection({ allSkills }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="expertise" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-accent mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Expertise
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Skills &amp; Tools
          </h2>
          <p className="text-fg-secondary text-lg max-w-xl">
            Technologies and platforms I work with daily.
          </p>
        </motion.div>

        {allSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <h3 className="text-sm font-semibold text-fg-secondary mb-5 tracking-wide uppercase">
              Proficiencies
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {allSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="group glass rounded-xl px-4 py-3 transition-all duration-300 hover:bg-surface-hover/60 hover:border-accent/20 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-2.5">
                    {skill.icon && <span className="text-base">{skill.icon}</span>}
                    <span className="text-sm text-fg-secondary group-hover:text-fg transition-colors truncate">
                      {skill.name}
                    </span>
                  </div>
                  {skill.proficiency && (
                    <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent-cyan via-accent to-accent-purple transition-all duration-1000"
                        style={{ width: isInView ? `${skill.proficiency}%` : "0%" }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-sm font-semibold text-fg-secondary mb-5 tracking-wide uppercase">
            Tools &amp; Platforms
          </h3>
          <div className="overflow-hidden rounded-2xl glass p-5">
            <div className="flex gap-3 animate-marquee w-max">
              {[...tools, ...tools].map(({ icon: Icon, label }, i) => (
                <div
                  key={`${label}-${i}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-fg-secondary whitespace-nowrap hover:bg-white/[0.06] hover:border-accent/20 hover:text-fg transition-all group"
                >
                  <Icon className="w-4 h-4 text-fg-muted group-hover:text-accent transition-colors" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
