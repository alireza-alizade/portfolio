"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  function scrollToSection(href: string) {
    const id = href.replace("/", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleNav(e: React.MouseEvent, link: (typeof links)[0]) {
    if (pathname === "/" && link.href !== "/") {
      e.preventDefault();
      scrollToSection(link.href);
      setMenuOpen(false);
    }
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bg/70 backdrop-blur-xl">
      <nav className="flex items-center justify-between px-6 h-16 max-w-7xl mx-auto">
        <Link href="/" className="text-lg font-bold tracking-tight text-fg no-underline">
          portfolio
        </Link>

        <div className="hidden sm:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link)}
              className={`relative text-sm no-underline px-4 py-2 rounded-xl transition-all ${
                isActive(link.href)
                  ? "text-fg bg-white/15 border border-white/20"
                  : "text-fg-secondary hover:text-fg hover:bg-white/10 hover:border hover:border-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden relative z-50 flex flex-col gap-1.5 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl"
          aria-label="Toggle navigation menu"
        >
          <span className={`block h-0.5 w-5 bg-fg transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-5 bg-fg transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-fg transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-lg sm:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 z-40 h-full w-72 bg-bg/80 backdrop-blur-2xl border-l border-white/10 sm:hidden transform transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col pt-24 px-6 gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link)}
              className={`text-sm no-underline px-4 py-3 rounded-xl transition-all ${
                isActive(link.href)
                  ? "text-fg bg-white/15 border border-white/20"
                  : "text-fg-secondary hover:text-fg hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
