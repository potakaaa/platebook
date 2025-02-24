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
        className={`${poppins.className} antialiased w-full min-h-screen flex items-center justify-center bg-background overflow-y-auto 
        [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
