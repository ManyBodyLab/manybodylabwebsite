import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ManyBodyLab - Quantum Many-Body Physics Software",
  description: "Open-source software for quantum many-body physics including Monte-Carlo, exact diagonalization, and tensor network methods",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
