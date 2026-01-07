import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hire Top 1% Virtual Assistants | Treantly",
  description:
    "Scale your operations with pre-vetted, English-speaking Virtual Assistants. Hire the top 1% of global talent in under 48 hours. No contracts, no hidden fees.",
  keywords: [
    "virtual assistant",
    "remote hiring",
    "offshore talent",
    "VA services",
    "business scaling",
    "operations support",
  ],
  openGraph: {
    title: "Hire Top 1% Virtual Assistants | Treantly",
    description:
      "Scale your operations with pre-vetted, English-speaking Virtual Assistants in under 48 hours.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Top 1% Virtual Assistants | Treantly",
    description:
      "Scale your operations with pre-vetted, English-speaking Virtual Assistants in under 48 hours.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
