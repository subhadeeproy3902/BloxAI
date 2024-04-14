import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import { ThemeProvider } from "next-themes";
const poppins = Poppins({ weight: ["400", "700", "600"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blox AI",
  description:
    "Blox AI: Draw anything, receive explanations, and choose automatic or personalized documentation. Explore, learn, and document ideas effortlessly on our platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ConvexClientProvider>
          <ThemeProvider attribute="class"> {children}</ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
