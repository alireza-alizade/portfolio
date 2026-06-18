import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";

export const metadata: Metadata = {
  title: "portfolio — devops engineer",
  description: "modern portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-bg text-fg">
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#8b5cf6]/10 blur-[120px] animate-fade-in" />
          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#3b82f6]/8 blur-[100px] animate-fade-in" style={{ animationDelay: "500ms" }} />
        </div>
        <NavBar />
        <ScrollIndicator />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
