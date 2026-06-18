"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ className, children, ...props }) {
          const isInline = !className;
          if (isInline) {
            return (
              <code
                className="text-accent text-sm px-1 py-0.5 bg-surface rounded"
                {...props}
              >
                {children}
              </code>
            );
          }
          return (
            <pre className="bg-surface border border-border rounded-lg p-4 overflow-x-auto my-6 text-sm">
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          );
        },
        a({ href, children }) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover"
            >
              {children}
            </a>
          );
        },
        h1({ children }) {
          return <h1 className="text-2xl font-bold mt-10 mb-4">{children}</h1>;
        },
        h2({ children }) {
          return <h2 className="text-xl font-bold mt-8 mb-3">{children}</h2>;
        },
        h3({ children }) {
          return (
            <h3 className="text-lg font-semibold mt-6 mb-2 text-fg">{children}</h3>
          );
        },
        p({ children }) {
          return (
            <p className="text-fg-secondary leading-relaxed mb-5">{children}</p>
          );
        },
        ul({ children }) {
          return <ul className="space-y-2 mb-5">{children}</ul>;
        },
        li({ children }) {
          return <li className="text-fg-secondary">{children}</li>;
        },
        blockquote({ children }) {
          return (
            <blockquote className="border-l-2 border-accent pl-4 my-6 text-fg-muted italic">
              {children}
            </blockquote>
          );
        },
        hr() {
          return <hr className="border-border my-10" />;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
