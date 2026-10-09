/**
 * Agentomatix wordmark: "Agento" + "matix" in brand blue, optionally with the
 * rule and "Automate with intelligent agents" tagline underneath.
 * "Agento" is navy on light surfaces and near-white on the site's navy bands.
 */
export function Wordmark({
  tone = "dark",
  tagline = false,
  className = "",
}: {
  /** Surface the mark sits on. */
  tone?: "dark" | "light";
  tagline?: boolean;
  className?: string;
}) {
  const agento = tone === "light" ? "text-[#0f2a4a]" : "text-foreground";
  const sub = tone === "light" ? "text-[#55657a] border-[#d5dde6]" : "text-muted border-border";

  return (
    <span className={`inline-flex flex-col ${className}`}>
      <span className="font-bold leading-none tracking-[-0.03em]">
        <span className={agento}>Agento</span>
        <span className="text-[#1e7fe0]">matix</span>
      </span>
      {tagline && (
        <span
          className={`mt-2 border-t pt-2 text-[0.235em] font-medium uppercase leading-none tracking-[0.3em] ${sub}`}
        >
          Automate with intelligent agents
        </span>
      )}
    </span>
  );
}
