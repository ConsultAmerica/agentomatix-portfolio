"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";

const navLinks = [
  { href: "/portfolio/#stories", label: "Work" },
  { href: "/portfolio/#work", label: "Products" },
  { href: "/portfolio/#contact", label: "Contact" },
];

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
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        scrolled || open
          ? "border-[#d5dde6] bg-white/95 shadow-sm backdrop-blur-md"
          : "border-[#d5dde6] bg-white backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Link
          href="/portfolio/"
          className="min-w-0 text-[22px] sm:text-[26px] lg:text-[28px]"
          aria-label="Agentomatix home"
        >
          <Wordmark tone="light" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-[#55657a] transition-colors hover:text-[#0f2a4a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#d5dde6] text-[#0f2a4a]"
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

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-[#d5dde6] bg-white px-5 py-4 sm:px-8 md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-3 text-base font-medium text-[#0f2a4a]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
