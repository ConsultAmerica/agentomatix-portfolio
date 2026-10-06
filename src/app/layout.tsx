import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Agentomatix | Digital Product Studio — Consult America",
  description:
    "Agentomatix designs and builds intelligent digital products — AI applications, enterprise platforms and automation systems for real business problems.",
  openGraph: {
    title: "Agentomatix | Digital Product Studio — Consult America",
    description:
      "We design and build intelligent digital products. AI applications, enterprise platforms and automation systems designed around real business problems.",
    type: "website",
    url: "https://agentomatix-portfolio.pages.dev/portfolio/",
    siteName: "Agentomatix",
    images: [
      {
        url: "https://agentomatix-portfolio.pages.dev/consult-america-logo.png",
        width: 512,
        height: 512,
        alt: "Consult America logo",
      },
    ],
  },
  icons: {
    icon: "/consult-america-logo.png",
    apple: "/consult-america-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
