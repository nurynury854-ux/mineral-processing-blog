import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Г.Даваацэрэн - Mineral Processing Blog",
  description: "Ашигт малтмалын баяжуулалтын техник, технологийн талаархи мэдээлэл. Mineral Processing Engineering, Comminution Technology, Python Programming.",
  keywords: ["mineral processing", "comminution", "баяжуулалт", "уул уурхай", "Python", "engineering"],
  authors: [{ name: "Г.Даваацэрэн (G.Davaatseren)" }],
  openGraph: {
    title: "Г.Даваацэрэн - Mineral Processing Blog",
    description: "Technical blog about mineral processing engineering and technology",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
