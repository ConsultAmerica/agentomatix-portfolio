import { redirect } from "next/navigation";
import { getProject, projects } from "@/data/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/**
 * Case studies are retired: every product link goes straight to the live
 * product. Old /portfolio/<slug>/ URLs redirect there (or home if a product
 * has no live site).
 */
export default async function CaseStudyRedirect({ params }: PageProps) {
  const { slug } = await params;
  redirect(getProject(slug)?.liveUrl ?? "/portfolio/");
}
