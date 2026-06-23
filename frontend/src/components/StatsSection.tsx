"use client";

import { useEffect, useRef, useState } from "react";
import { FiServer, FiCloud, FiShield, FiCode } from "react-icons/fi";

const stats = [
  { icon: FiServer, value: 50, suffix: "+", label: "Infrastructure Deployments", prefix: "" },
  { icon: FiCloud, value: 8, suffix: "+", label: "Cloud Platforms", prefix: "" },
  { icon: FiShield, value: 99.9, suffix: "%", label: "Uptime Achieved", prefix: "" },
  { icon: FiCode, value: 15, suffix: "+", label: "CI/CD Pipelines", prefix: "" },
];

function AnimatedCounter({ target, suffix, prefix }: { target: number; suffix: string; prefix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / (duration / (1000 / steps));
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(current);
            }
          }, 1000 / steps);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref}>
      {prefix}{count.toLocaleString("en-US", { maximumFractionDigits: 1 })}{suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative glass rounded-2xl p-6 hover:bg-surface-hover/60 hover:border-accent/20 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/20 group-hover:border-accent/30 transition-all">
                  <stat.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="text-3xl font-bold text-fg tabular-nums">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <p className="text-sm text-fg-secondary mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
