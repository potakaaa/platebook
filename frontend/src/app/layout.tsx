import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "400", "600", "800"],
  style: ["normal", "italic"],
});
export const metadata: Metadata = {
  title: "PlateBook - Share & Discover Delicious Recipes",
  description:
    "Eat. Cook. PlateBook. Repeat. Join PlateBook, the ultimate social platform for food lovers. Share, save, and explore recipes, engage with a community of home cooks and foodies, and get AI-powered meal suggestions.",
  keywords: [
    "recipes",
    "food",
    "cooking",
    "PlateBook",
    "meal ideas",
    "AI meal suggestions",
    "recipe sharing",
    "food lovers",
    "home cooking",
    "culinary community",
    "Eat Cook PlateBook Repeat",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} antialiased w-full min-h-screen flex items-center justify-center bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
