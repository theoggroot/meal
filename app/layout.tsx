import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VibeMeal AI",
  description: "Mood-driven meal generator powered by Minimax",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
