import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "",
  description: ""
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-CR" data-theme="dark" className="bg-background text-foreground" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
