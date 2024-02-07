import type { Metadata } from "next";
import { Rubik } from "next/font/google";

import { cn } from "@/lib/utils";

import "./globals.css";

const rubik = Rubik({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "Prompt Savvy",
  description: "Created by Salman Majid",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("antialiased", rubik.variable)}>
        <main className="h-full w-full min-h-screen flex flex-col">{children}</main>
      </body>
    </html>
  );
}
