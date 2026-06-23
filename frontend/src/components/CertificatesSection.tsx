"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Certificate } from "@/lib/api";
import { FiExternalLink, FiAward } from "react-icons/fi";

interface Props {
  certificates: Certificate[];
}

function CertificateIcon({ icon }: { icon: string }) {
  if (!icon) return null;
  const isEmoji = /\p{Emoji}/u.test(icon);
  if (isEmoji) return <span className="text-xl">{icon}</span>;
  return (
    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent-purple/20 border border-accent/20 flex items-center justify-center text-accent text-sm font-bold">
      {icon.slice(0, 2)}
    </div>
  );
}

export default function CertificatesSection({ certificates }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="certificates" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-accent mb-4">
            <FiAward className="w-3 h-3" />
            Credentials
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Certificates
          </h2>
          <p className="text-fg-secondary text-lg max-w-xl">
            Professional certifications and achievements.
          </p>
        </motion.div>

        {certificates.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <a
                  href={cert.url || undefined}
                  target={cert.url ? "_blank" : undefined}
                  rel={cert.url ? "noopener noreferrer" : undefined}
                  className={`flex items-start gap-4 glass rounded-2xl p-5 transition-all duration-300 ${
                    cert.url
                      ? "hover:bg-surface-hover/60 hover:border-accent/20 hover:-translate-y-0.5 cursor-pointer"
                      : "cursor-default"
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    <CertificateIcon icon={cert.icon} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-sm text-fg truncate group-hover:text-accent transition-colors">
                        {cert.title}
                      </h3>
                      {cert.url && (
                        <FiExternalLink className="w-3.5 h-3.5 text-fg-muted shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <p className="text-xs text-fg-secondary mt-1">{cert.issuer}</p>
                    <p className="text-[11px] text-fg-muted mt-1.5">
                      {new Date(cert.date_obtained).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-2xl glass py-20">
            <p className="text-sm text-fg-muted">Certificates coming soon</p>
          </div>
        )}
      </div>
    </section>
  );
}
