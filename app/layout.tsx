import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FloatingIcons from "@/components/floating/FloatingIcons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Video Editor Portfolio Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          relative overflow-x-hidden
          ${geistSans.variable}
          ${geistMono.variable}
          ${spaceGrotesk.variable}
          antialiased
        `}
      >
        {/* ================= BACKGROUND (TOÀN TRANG – KHÔNG ĂN FOOTER) ================= */}
        <FloatingIcons />

        {/* ================= HEADER ================= */}
        <Header />

        {/* ================= MAIN CONTENT ================= */}
        <main
          id="home"
          className="
            relative z-10
            pt-16
            font-[var(--font-space-grotesk)]
          "
        >
          {children}
        </main>

        {/* ================= FOOTER (KHÔNG CÓ BACKGROUND ICON) ================= */}
        <footer className="relative z-20 bg-white">
        <Footer/>
        </footer>
      </body>
    </html>
  );
}
