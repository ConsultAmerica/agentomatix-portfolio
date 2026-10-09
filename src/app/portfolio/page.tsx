import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SelectedProducts } from "@/components/SelectedProducts";
import { MoreWorkTable } from "@/components/MoreWorkTable";
import { getMoreWorkProjects, getSelectedProducts } from "@/data/projects";
import { Hero } from "@/components/home/Hero";
import { StackMarquee } from "@/components/home/StackMarquee";
import { Vaults } from "@/components/home/Vaults";
import { ProcessShowcase } from "@/components/home/ProcessShowcase";
import { CtaBand } from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "Agentomatix | Digital Product Studio",
  description:
    "We design and build intelligent digital products. AI applications, enterprise platforms and automation systems designed around real business problems.",
  openGraph: {
    title: "Agentomatix | Digital Product Studio",
    description:
      "We design and build intelligent digital products. AI applications, enterprise platforms and automation systems designed around real business problems.",
    type: "website",
    url: "https://agentomatix.com/portfolio/",
    siteName: "Agentomatix",
  },
};

export default function PortfolioPage() {
  const selectedProducts = getSelectedProducts();
  const moreWork = getMoreWorkProjects();

  return (
    <main id="top" className="relative bg-white text-foreground">
      <SiteHeader />

      <Hero />
      <StackMarquee />
      <Vaults />

      <SelectedProducts projects={selectedProducts} />

      <MoreWorkTable projects={moreWork} />

      <ProcessShowcase />
      <CtaBand />

      <SiteFooter />
    </main>
  );
}
