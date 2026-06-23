"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiChevronRight } from "react-icons/fi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#expertise", label: "Expertise" },
  { href: "#contact", label: "Contact" },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
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

  useEffect(() => {
    history.scrollRestoration = "manual";
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    const hash = window.location.hash;
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
          html.style.scrollBehavior = prevBehavior;
        }, 100);
        return;
      }
    }
    html.style.scrollBehavior = prevBehavior;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function handleNav(e: React.MouseEvent, href: string) {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setMenuOpen(false);
    }
  }

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
        <nav className="glass rounded-2xl px-5 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-base font-bold tracking-tight text-fg no-underline flex items-center gap-2"
          >
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-cyan via-accent to-accent-purple flex items-center justify-center text-[10px] font-bold text-white">
              A
            </span>
            <span className="hidden sm:inline">alireza</span>
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = link.href === "/"
                ? pathname === "/" && activeSection === ""
                : activeSection === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className={`relative text-sm no-underline px-3.5 py-2 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "text-fg bg-white/10 border border-white/10"
                      : "text-fg-secondary hover:text-fg hover:bg-white/5"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                  )}
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-50 flex flex-col gap-1 p-2 rounded-xl text-fg-secondary hover:text-fg hover:bg-white/5 transition-all"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-xl md:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-black/70 backdrop-blur-2xl border-l border-border md:hidden transform transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col pt-24 px-5 gap-1.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="flex items-center justify-between text-sm no-underline px-4 py-3 rounded-xl text-fg-secondary hover:text-fg hover:bg-white/5 transition-all group"
            >
              <span>{link.label}</span>
              <FiChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
