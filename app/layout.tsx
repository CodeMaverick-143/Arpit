import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Sora, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { siteConfig } from "@/data/navigation";
import { themeInitScript } from "@/lib/themeStore";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { ToastProvider } from "./components/Toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import SpotlightEffect from "./components/SpotlightEffect";
import CustomCursor from "./components/CustomCursor";
import BackToTop from "./components/BackToTop";
import CommandPalette from "./components/CommandPalette";

// On-demand chrome: keep it out of the initial bundle. (CommandPalette stays
// static so ⌘K works the instant the page is interactive.)
const DeveloperMode = dynamic(() => import("./components/DeveloperMode"));

// Only the weights actually used by .heading-display (800) / .heading-section (700)
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800"],
  preload: true,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.title}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Arpit Sarang",
    "Full Stack Developer",
    "Go Engineer",
    "Rust Developer",
    "AI Engineer",
    "Systems Programming",
    "Portfolio",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    description:
      "Building Full-Stack Systems, Developer Tools, and AI-Powered Products",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/fevicon.jpeg",
    shortcut: "/fevicon.jpeg",
    apple: "/fevicon.jpeg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        {/* Applies the stored theme before first paint — avoids a flash */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>
          <ToastProvider>
            <SmoothScroll />
            <SpotlightEffect />
            <CustomCursor />
            <CommandPalette />
            <Navbar />
            <main
              id="main"
              className="flex-1"
              style={{ paddingTop: "var(--nav-height)" }}
            >
              {children}
            </main>
            <Footer />
            <BackToTop />
            <DeveloperMode />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
