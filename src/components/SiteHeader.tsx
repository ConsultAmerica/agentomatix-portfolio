"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";
import { CONTACT_URL } from "@/data/contact";

const navLinks = [
  { href: "/portfolio/#vaults", label: "Capabilities" },
  { href: "/portfolio/#stories", label: "Work" },
  { href: "/portfolio/#process", label: "Process" },
  { href: "/portfolio/#contact", label: "Contact" },
];

/**
 * Floating glass pill header: white surface so the wordmark shows in its
 * original navy + blue, condensing slightly once the page scrolls.
 */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`mx-auto max-w-6xl rounded-full border transition-all duration-300 ${
          scrolled || open
            ? "border-[#0f2a4a]/10 bg-white/90 shadow-[0_12px_40px_-18px_rgba(15,42,74,0.35)] backdrop-blur-xl"
            : "border-[#0f2a4a]/[0.07] bg-white/80 shadow-[0_8px_30px_-20px_rgba(15,42,74,0.25)] backdrop-blur-md"
        }`}
      >
        <div
          className={`flex items-center justify-between gap-4 pl-5 pr-2 transition-[height] duration-300 sm:pl-6 ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
          <Link
            href="/portfolio/"
            className="min-w-0 text-[22px] sm:text-[24px]"
            aria-label="Agentomatix home"
          >
            <Wordmark tone="light" />
          </Link>

          <nav
            className="hidden items-center gap-0.5 rounded-full bg-[#0f2a4a]/[0.04] p-1 lg:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-1.5 text-[14px] text-[#3b4c63] transition-colors hover:bg-white hover:text-[#0f2a4a] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e7fe0]/40"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden items-center gap-2 rounded-full bg-[#0f2a4a] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#1e7fe0] sm:inline-flex"
            >
              Start a project
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0f2a4a]/10 text-[#0f2a4a] lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? (
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M2 5.75A.75.75 0 012.75 5h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 5.75zm0 4.5A.75.75 0 012.75 10h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10.25zm0 4.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="mx-auto mt-2 max-w-6xl rounded-3xl border border-[#0f2a4a]/10 bg-white p-3 shadow-[0_20px_50px_-24px_rgba(15,42,74,0.45)] lg:hidden"
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-2xl px-4 py-3 text-base font-medium text-[#0f2a4a] hover:bg-[#0f2a4a]/[0.04]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-2xl bg-[#0f2a4a] px-4 py-3 text-center text-base font-medium text-white"
              onClick={() => setOpen(false)}
            >
              Start a project ↗
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
