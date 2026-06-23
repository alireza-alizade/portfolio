import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";

export const metadata: Metadata = {
  title: "Alireza — DevOps Engineer",
  description: "Infrastructure architect & DevOps engineer. Building reliable, scalable systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: "history.scrollRestoration='manual'" }} />
      </head>
      <body className="min-h-screen flex flex-col bg-bg text-fg antialiased">
        {/* Background effects */}
        <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-accent-cyan/5 blur-[200px] animate-pulse-soft" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-purple/5 blur-[150px] animate-pulse-soft" style={{ animationDelay: "3s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-accent/5 blur-[250px] animate-pulse-soft" style={{ animationDelay: "1.5s" }} />
        </div>

        {/* Grid overlay */}
        <div
          className="fixed inset-0 -z-20 pointer-events-none opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Noise overlay */}
        <div className="noise-overlay" />

        <NavBar />
        <ScrollIndicator />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
