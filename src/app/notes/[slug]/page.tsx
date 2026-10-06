import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { getNote, notes } from "@/data/notes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return { title: "Note not found" };

  return {
    title: `${note.title} | Agentomatix`,
    description: note.excerpt,
  };
}

export default async function NotePage({ params }: PageProps) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  return (
    <main className="bg-background text-foreground">
      <SiteHeader />

      <article className="px-5 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="mx-auto max-w-2xl pb-20 sm:pb-28">
          <Link
            href="/portfolio/"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            ← Back to portfolio
          </Link>

          <p className="mt-10 text-[13px] text-muted">{note.readTime}</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {note.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{note.excerpt}</p>

          <div className="mt-12 space-y-6 border-t border-border pt-10">
            {note.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-[17px] leading-relaxed text-foreground/85">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      <footer className="border-t border-border px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold tracking-tight text-foreground">
            Consult America / Agentomatix
          </p>
          <p className="text-sm text-muted">© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </main>
  );
}
