import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import Footer from "@/components/footer";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: "Mustafa Pinjari | Business Analyst & Technical BA Portfolio",
    template: `%s | ${DATA.name}`,
  },
  description:
    "Business Analyst & Technical Product Builder based in Pune, India. Specializing in requirements engineering (BRD/FRD), user stories with Gherkin acceptance criteria, SQL diagnostics, BPMN process workflows, and Agile delivery.",
  keywords: [
    "Mustafa Pinjari",
    "Mustafa Pinjari Business Analyst",
    "Business Analyst portfolio",
    "Technical Business Analyst",
    "Entry-Level Business Analyst",
    "Junior Business Analyst India",
    "Business Analyst Pune",
    "Requirements Engineering",
    "BRD FRD examples",
    "User Stories Gherkin",
    "SQL for Business Analysts",
    "Process Mapping BPMN",
    "Agile Scrum BA",
  ],
  authors: [{ name: DATA.name, url: DATA.url }],
  creator: DATA.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mustafa Pinjari | Business Analyst & Technical BA Portfolio",
    description:
      "Business Analyst with expertise in requirements engineering, process analysis, SQL diagnostics, API workflows, Agile delivery, and AI products. Explore real-world documentation and technical case studies.",
    url: DATA.url,
    siteName: "Mustafa Pinjari Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${DATA.url}/me.png`,
        width: 800,
        height: 800,
        alt: "Mustafa Pinjari — Business Analyst Portfolio",
      },
    ],
  },
  twitter: {
    title: "Mustafa Pinjari | Business Analyst & Technical BA Portfolio",
    description:
      "Business Analyst with expertise in requirements engineering, process analysis, SQL diagnostics, API workflows, Agile delivery, and AI products.",
    card: "summary_large_image",
    images: [`${DATA.url}/me.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable,
          plusJakartaSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <div className="absolute inset-0 top-0 left-0 right-0 h-[100px] overflow-hidden z-0">
              <FlickeringGrid
                className="h-full w-full"
                squareSize={2}
                gridGap={2}
                style={{
                  maskImage: "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
                }}
              />
            </div>
            <div className="relative z-10 max-w-5xl mx-auto py-12 pb-12 sm:pt-24 sm:pb-16 px-6">
              {children}
            </div>
            <Footer />
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
