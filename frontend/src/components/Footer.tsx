import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-cyan via-accent to-accent-purple flex items-center justify-center text-[10px] font-bold text-white">
              A
            </span>
            <span className="text-sm text-fg-muted">
              &copy; {new Date().getFullYear()} Alireza. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="#projects"
              className="text-xs text-fg-muted hover:text-fg-secondary transition-colors no-underline"
            >
              Projects
            </Link>
            <Link
              href="#expertise"
              className="text-xs text-fg-muted hover:text-fg-secondary transition-colors no-underline"
            >
              Expertise
            </Link>
            <Link
              href="#contact"
              className="text-xs text-fg-muted hover:text-fg-secondary transition-colors no-underline"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
