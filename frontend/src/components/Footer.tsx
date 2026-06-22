export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-fg-muted">
          &copy; {new Date().getFullYear()} &mdash; built with Next.js + Django
        </p>
        <div className="flex items-center gap-2">
          <a href="#projects" className="text-sm text-fg-muted hover:text-fg px-3 py-1.5 rounded-xl hover:bg-white/10 transition-all no-underline">
            Projects
          </a>
          <a href="#expertise" className="text-sm text-fg-muted hover:text-fg px-3 py-1.5 rounded-xl hover:bg-white/10 transition-all no-underline">
            Expertise
          </a>
          <a href="#contact" className="text-sm text-fg-muted hover:text-fg px-3 py-1.5 rounded-xl hover:bg-white/10 transition-all no-underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
