"use client";

import { useEffect, useState, useRef } from "react";

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    function onScroll() {
      setVisible(false);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const atBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        setVisible(!atBottom);
      }, 500);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-8 left-8 z-40 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <svg
        className="w-5 h-5 text-fg-muted animate-bounce"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  );
}
