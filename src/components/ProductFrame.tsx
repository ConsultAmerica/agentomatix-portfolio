type ProductFrameProps = {
  src: string;
  alt: string;
  className?: string;
  url?: string;
};

/**
 * Editorial product screenshot stage — navy field + browser chrome.
 * Screenshots always use contain / intrinsic height — never cover-cropped.
 */
export function ProductFrame({ src, alt, className, url }: ProductFrameProps) {
  return (
    <div
      className={`relative flex w-full items-start justify-center overflow-hidden bg-[#0e1f3c] p-3 sm:p-4 ${className ?? ""}`}
    >
      <div className="relative w-full overflow-hidden rounded-[10px] border border-white/12 bg-[#0c1a32] shadow-[0_20px_48px_-24px_rgba(0,0,0,0.65)]">
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#122844] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          {url ? (
            <span className="ml-2 truncate rounded-sm bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
              {url.replace(/^https?:\/\//, "")}
            </span>
          ) : (
            <span className="ml-2 h-4 flex-1 rounded-sm bg-white/5" />
          )}
        </div>
        <div className="bg-[#0c1a32] p-1.5 sm:p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="h-auto w-full object-contain object-top"
          />
        </div>
      </div>
    </div>
  );
}
