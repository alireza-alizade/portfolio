"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitContact } from "@/lib/api";
import { FiSend, FiCheck, FiAlertCircle, FiMail, FiUser, FiMessageSquare } from "react-icons/fi";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitContact(form);
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-10 text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-accent-emerald/20 border border-accent-emerald/30 flex items-center justify-center mx-auto mb-5">
          <FiCheck className="w-6 h-6 text-accent-emerald" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
        <p className="text-fg-secondary text-sm max-w-xs mx-auto">
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
      </motion.div>
    );
  }

  const inputClass =
    "w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-fg outline-none transition-all duration-200 placeholder:text-fg-muted focus:border-accent/40 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(59,130,246,0.05)]";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="group">
          <label htmlFor="name" className="block text-xs font-medium text-fg-secondary mb-2">
            Name
          </label>
          <div className="relative">
            <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-muted group-focus-within:text-accent transition-colors" />
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={`${inputClass} pl-10`}
              placeholder="Your name"
            />
          </div>
        </div>
        <div className="group">
          <label htmlFor="email" className="block text-xs font-medium text-fg-secondary mb-2">
            Email
          </label>
          <div className="relative">
            <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-muted group-focus-within:text-accent transition-colors" />
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`${inputClass} pl-10`}
              placeholder="you@example.com"
            />
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-xs font-medium text-fg-secondary mb-2">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          required
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className={inputClass}
          placeholder="What is this about?"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-xs font-medium text-fg-secondary mb-2">
          Message
        </label>
        <div className="relative">
          <FiMessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-fg-muted" />
          <textarea
            id="message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`${inputClass} pl-10 resize-y`}
            placeholder="Your message..."
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-cyan via-accent to-accent-purple text-white font-medium text-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
      >
        <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
        <AnimatePresence mode="wait">
          {status === "sending" ? (
            <motion.span
              key="sending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 flex items-center gap-2"
            >
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </motion.span>
          ) : (
            <motion.span
              key="send"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 flex items-center gap-2"
            >
              <FiSend className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              Send Message
            </motion.span>
          )}
        </AnimatePresence>
      </button>
      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3"
          >
            <FiAlertCircle className="w-4 h-4 shrink-0" />
            Something went wrong. Please try again.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
