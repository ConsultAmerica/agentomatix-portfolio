import Link from "next/link";
import { Wordmark } from "./Wordmark";

const footerLinks = [
  { href: "/portfolio/#stories", label: "Work" },
  { href: "/portfolio/#work", label: "Products" },
  { href: "/portfolio/#contact", label: "Contact" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Wordmark tagline className="text-[30px] sm:text-[34px]" />
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">© {year} Agentomatix</p>
        <Link
          href="/portfolio/#top"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          Back to top ↑
        </Link>
      </div>
    </footer>
  );
}
