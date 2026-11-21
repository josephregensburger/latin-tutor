import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lingua — Latin translation tutor",
  description: "A calm, step-by-step workspace for learning to translate Latin.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
