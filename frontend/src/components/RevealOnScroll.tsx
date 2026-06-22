"use client";

import { useRef, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
}

export default function RevealOnScroll({ children, className = "", direction = "up" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hiddenClass = direction === "up"
    ? "opacity-0 translate-y-12"
    : direction === "left"
      ? "opacity-0 -translate-x-16"
      : "opacity-0 translate-x-16";

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-x-0 translate-y-0" : hiddenClass
      } ${className}`}
    >
      {children}
    </div>
  );
}
