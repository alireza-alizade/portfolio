"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Project } from "@/lib/api";
import { FiExternalLink, FiGithub } from "react-icons/fi";

interface Props {
  projects: Project[];
}

export default function ProjectsSection({ projects }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-32 px-6">
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
            Featured Work
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Projects
          </h2>
          <p className="text-fg-secondary text-lg max-w-xl">
            Infrastructure and software projects I&apos;ve architected and built.
          </p>
        </motion.div>

        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative rounded-2xl overflow-hidden ${
                  i === 0 ? "lg:col-span-2 lg:row-span-1" : ""
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/[0.03] via-transparent to-accent-purple/[0.03] group-hover:from-accent-cyan/[0.06] group-hover:to-accent-purple/[0.06] transition-all duration-500" />
                <div className="relative glass rounded-2xl p-7 h-full flex flex-col transition-all duration-300 group-hover:bg-surface-hover/60 group-hover:border-accent/20 group-hover:shadow-lg group-hover:shadow-accent/5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-fg group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="text-[10px] font-medium text-accent px-2 py-0.5 rounded-full border border-accent/30 bg-accent/10 shrink-0 ml-3">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-fg-secondary leading-relaxed line-clamp-2 mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech_stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] text-fg-muted px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mt-auto pt-3 border-t border-white/5">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-fg-secondary hover:text-accent transition-colors"
                      >
                        <FiGithub className="w-3.5 h-3.5" />
                        Source
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-fg-secondary hover:text-accent transition-colors"
                      >
                        <FiExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-2xl glass py-20">
            <p className="text-sm text-fg-muted">Projects coming soon</p>
          </div>
        )}
      </div>
    </section>
  );
}
