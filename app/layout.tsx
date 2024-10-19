import type { Metadata } from "next";

import { Poppins } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Kwik Task",
  description: "A to-do app created using Next.js, Tailwind and PostgreSQL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased dark`}
        suppressHydrationWarning={true}
      >
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
