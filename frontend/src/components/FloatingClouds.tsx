"use client";

import { useEffect, useRef } from "react";

const clouds = [
  { x: "8%", y: "15%", size: "w-28 h-28", speed: 0.2 },
  { x: "78%", y: "10%", size: "w-36 h-36", speed: 0.15 },
  { x: "12%", y: "60%", size: "w-32 h-32", speed: 0.25 },
  { x: "82%", y: "55%", size: "w-24 h-24", speed: 0.2 },
  { x: "45%", y: "35%", size: "w-40 h-40", speed: 0.1 },
];

export default function FloatingClouds() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll<HTMLElement>("[data-cloud]");
    if (!els?.length) return;

    let raf: number;
    let scrollY = 0;

    const onScroll = () => { scrollY = window.scrollY; };

    const animate = () => {
      els.forEach((el) => {
        const speed = parseFloat(el.dataset.speed ?? "0.2");
        const baseRotate = parseFloat(el.dataset.rotate ?? "0");
        const wobble = Math.sin(Date.now() / 2500 + baseRotate) * 2;
        const ty = -scrollY * speed + Math.sin(Date.now() / 3500 + baseRotate) * 6;
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
      className="fixed inset-0 -z-[4] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {clouds.map((cloud, i) => (
        <div
          key={`cloud-${i}`}
          data-cloud
          data-speed={cloud.speed}
          data-rotate={0}
          className="absolute"
          style={{ left: cloud.x, top: cloud.y }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className={`${cloud.size} object-cover opacity-25 rounded-full`}
          >
            <source src="/clouds.mp4" type="video/mp4" />
          </video>
        </div>
      ))}

    </div>
  );
}
