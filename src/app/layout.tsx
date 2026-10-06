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
  title: "Agentomatix | Digital Product Studio",
  description:
    "Agentomatix designs and builds intelligent digital products — AI applications, enterprise platforms and automation systems for real business problems.",
  openGraph: {
    title: "Agentomatix | Digital Product Studio",
    description:
      "We design and build intelligent digital products. AI applications, enterprise platforms and automation systems designed around real business problems.",
    type: "website",
    url: "https://agentomatic-portfolio.vercel.app/portfolio/",
    siteName: "Agentomatix",
    images: [
      {
        url: "https://agentomatic-portfolio.vercel.app/agentomatix-mark.svg",
        width: 64,
        height: 64,
        alt: "Agentomatix",
      },
    ],
  },
  icons: {
    icon: "/agentomatix-mark.svg",
    apple: "/agentomatix-mark.svg",
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
