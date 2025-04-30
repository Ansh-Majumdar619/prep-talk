import type { Metadata } from "next";
import localFont from "next/font/local";  // Import next/font/local
import "./globals.css";
import { Toaster } from "sonner";

const customFont = localFont({
  src: "../fonts/gattefont.otf",  
  variable: "--font-sans",     
  display: "swap",               
});

export const metadata: Metadata = {
  title: "PrepTalk",
  description: "An AI-powered platform for preparing for mock interviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${customFont.variable} dark`}>
      <body className="font-custom antialiased pattern">
        {children}
        <Toaster />
      </body>
    </html>
  );
}