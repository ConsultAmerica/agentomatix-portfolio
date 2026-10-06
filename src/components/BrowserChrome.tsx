import type { ReactNode } from "react";

type BrowserChromeProps = {
  url?: string;
  children: ReactNode;
  className?: string;
};

/** Lightweight browser chrome around product screenshots — never crops the UI. */
export function BrowserChrome({ url, children, className }: BrowserChromeProps) {
  return (
    <div
      className={`overflow-hidden rounded-[14px] border border-white/10 bg-[#0c1a32] shadow-[0_20px_48px_-28px_rgba(0,0,0,0.55)] ${className ?? ""}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#122844] px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
        {url ? (
          <span className="ml-2 truncate rounded-md bg-white/5 px-2.5 py-1 text-[11px] tracking-wide text-slate-400">
            {url.replace(/^https?:\/\//, "")}
          </span>
        ) : (
          <span className="ml-2 h-4 flex-1 rounded-sm bg-white/5" aria-hidden="true" />
        )}
      </div>
      <div className="bg-[#0e1f3c]">{children}</div>
    </div>
  );
}
