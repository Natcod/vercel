import type { Metadata } from "next";
import "./globals.css";
import { geistSans, geistMono } from "./ui/fonts";

export const metadata: Metadata = {
  title: "Stocks Dashboard",
  description: "A modern stock trading dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
