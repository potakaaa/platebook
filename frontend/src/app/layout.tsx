import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "./providers";

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
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta property="og:title" content="Platebook" />
        <meta
          property="og:description"
          content="Eat. Cook. PlateBook. Repeat."
        />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta
          name="google-site-verification"
          content="6iSXF_4Q3u3eRTJA1mx2MdDE5CjD0pz5BfxIEu0WfWw"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${poppins.className} antialiased scroll-smooth w-full min-h-screen flex items-center justify-center bg-background overflow-y-auto 
        [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
