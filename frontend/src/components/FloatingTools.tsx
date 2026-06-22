"use client";

import { useEffect, useRef } from "react";
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

const tiles: {
  icon: IconType;
  label: string;
  x: string;
  y: string;
  rotate: number;
  size: "sm" | "md" | "lg";
  speed: number;
  animDelay: string;
  animDuration: string;
}[] = [
  { icon: SiDocker, label: "Docker", x: "5%", y: "8%", rotate: -12, size: "lg", speed: 0.3, animDelay: "0s", animDuration: "6s" },
  { icon: SiKubernetes, label: "K8s", x: "85%", y: "5%", rotate: 8, size: "lg", speed: 0.2, animDelay: "1s", animDuration: "7s" },
  { icon: SiAmazonwebservices, label: "AWS", x: "15%", y: "22%", rotate: -5, size: "md", speed: 0.4, animDelay: "0.5s", animDuration: "5.5s" },
  { icon: SiGooglecloud, label: "GCP", x: "78%", y: "18%", rotate: 15, size: "md", speed: 0.25, animDelay: "2s", animDuration: "6.5s" },
  { icon: FaMicrosoft, label: "Azure", x: "92%", y: "35%", rotate: -8, size: "md", speed: 0.35, animDelay: "1.5s", animDuration: "5s" },
  { icon: SiTerraform, label: "Terraform", x: "8%", y: "42%", rotate: 10, size: "sm", speed: 0.45, animDelay: "0.3s", animDuration: "7.5s" },
  { icon: SiAnsible, label: "Ansible", x: "70%", y: "48%", rotate: -18, size: "sm", speed: 0.3, animDelay: "2.5s", animDuration: "6s" },
  { icon: SiArgo, label: "ArgoCD", x: "25%", y: "55%", rotate: 6, size: "sm", speed: 0.5, animDelay: "1.2s", animDuration: "5.5s" },
  { icon: SiGithubactions, label: "GH Actions", x: "88%", y: "60%", rotate: -10, size: "lg", speed: 0.2, animDelay: "0.8s", animDuration: "7s" },
  { icon: SiGitlab, label: "GitLab", x: "3%", y: "68%", rotate: 14, size: "md", speed: 0.35, animDelay: "3s", animDuration: "6.5s" },
  { icon: SiJenkins, label: "Jenkins", x: "60%", y: "12%", rotate: -7, size: "sm", speed: 0.4, animDelay: "1.8s", animDuration: "5s" },
  { icon: SiPrometheus, label: "Prometheus", x: "50%", y: "72%", rotate: 9, size: "md", speed: 0.25, animDelay: "0.6s", animDuration: "7.5s" },
  { icon: SiGrafana, label: "Grafana", x: "18%", y: "78%", rotate: -14, size: "lg", speed: 0.3, animDelay: "2.2s", animDuration: "6s" },
  { icon: SiLinux, label: "Linux", x: "95%", y: "82%", rotate: 5, size: "sm", speed: 0.45, animDelay: "1s", animDuration: "5.5s" },
  { icon: SiNginx, label: "Nginx", x: "40%", y: "88%", rotate: -9, size: "md", speed: 0.35, animDelay: "0.4s", animDuration: "7s" },
  { icon: SiGit, label: "Git", x: "72%", y: "90%", rotate: 12, size: "sm", speed: 0.5, animDelay: "2.8s", animDuration: "6.5s" },
  { icon: SiPython, label: "Python", x: "30%", y: "35%", rotate: -6, size: "lg", speed: 0.2, animDelay: "1.5s", animDuration: "5s" },
  { icon: SiPostgresql, label: "PostgreSQL", x: "55%", y: "55%", rotate: 11, size: "md", speed: 0.3, animDelay: "0.9s", animDuration: "7.5s" },
  { icon: SiRedis, label: "Redis", x: "42%", y: "15%", rotate: -16, size: "sm", speed: 0.4, animDelay: "2.1s", animDuration: "6s" },
];

const sizeMap = {
  sm: "w-10 h-10",
  md: "w-12 h-12",
  lg: "w-14 h-14",
};

const iconSizeMap = {
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-7 h-7",
};

export default function FloatingTools() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll<HTMLElement>("data-tile");
    if (!els?.length) return;

    let raf: number;
    let scrollY = 0;

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const animate = () => {
      els.forEach((el) => {
        const speed = parseFloat(el.dataset.speed ?? "0.3");
        const baseRotate = parseFloat(el.dataset.rotate ?? "0");
        const wobble = Math.sin(Date.now() / 2000 + baseRotate) * 3;
        const ty = -scrollY * speed + Math.sin(Date.now() / 3000 + baseRotate) * 8;
        el.style.transform = `translateY(${ty}px) rotate(${baseRotate + wobble}deg)`;
      });
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-[5] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {tiles.map((tile, i) => {
        const Icon = tile.icon;
        return (
          <div
            key={`${tile.label}-${i}`}
            data-tile
            data-speed={tile.speed}
            data-rotate={tile.rotate}
            className="absolute"
            style={{
              left: tile.x,
              top: tile.y,
              transform: `rotate(${tile.rotate}deg)`,
              animationDelay: tile.animDelay,
              animationDuration: tile.animDuration,
            }}
          >
            <div
              className={`${sizeMap[tile.size]} rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] flex items-center justify-center animate-float-${i % 3}`}
              style={{ animationDelay: tile.animDelay, animationDuration: tile.animDuration }}
            >
              <Icon className={`${iconSizeMap[tile.size]} text-white/20`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
