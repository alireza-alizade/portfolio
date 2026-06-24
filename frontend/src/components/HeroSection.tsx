"use client";

import { FiArrowRight, FiDownload } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent-cyan/5 blur-[150px] animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-purple/5 blur-[120px] animate-pulse-soft" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[180px] animate-pulse-soft" style={{ animationDelay: "1s" }} />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Floating dots */}
        <div className="absolute top-[20%] right-[15%] w-2 h-2 rounded-full bg-accent-cyan/40 animate-float-slow" />
        <div className="absolute top-[30%] left-[10%] w-1.5 h-1.5 rounded-full bg-accent-purple/40 animate-float-medium" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-[25%] right-[25%] w-2.5 h-2.5 rounded-full bg-accent/30 animate-float-fast" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[60%] left-[20%] w-1 h-1 rounded-full bg-accent-emerald/40 animate-float-slow" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-fg-secondary mb-8 animate-blur-in">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
          Available for opportunities
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.9] mb-6 animate-blur-in">
          <span className="text-fg">Hi, I'm </span>
          <span className="gradient-text">Alireza</span>
        </h1>

        <h2 className="text-xl sm:text-2xl text-fg-secondary font-medium mb-4 animate-blur-in" style={{ animationDelay: "150ms" }}>
          DevOps Engineer &amp; Infrastructure Architect
        </h2>

        <p className="text-fg-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10 animate-blur-in" style={{ animationDelay: "300ms" }}>
          I architect reliable, scalable infrastructure and automate
          everything that can be automated. Specializing in CI/CD, containerization,
          infrastructure as code, and multi-cloud platforms.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-blur-in" style={{ animationDelay: "450ms" }}>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-surface text-fg font-semibold text-sm border border-border hover:bg-surface-hover hover:border-accent/30 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            View My Work
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl glass text-fg-secondary font-medium text-sm hover:text-fg hover:bg-surface-hover/80 hover:border-accent/30 transition-all duration-300 active:scale-95"
          >
            Get in Touch
            <FiDownload className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
